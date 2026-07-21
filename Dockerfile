# ============================================
# STAGE 1: DEPENDENCIES
# ============================================
FROM node:20-alpine AS deps

# Required for node-gyp and native modules (sharp)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package files only (better layer caching)
COPY package.json package-lock.json* ./

# Clean install - respects package-lock.json
RUN npm ci --only=production=false

# ============================================
# STAGE 2: BUILDER
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# ✅ NEXT_PUBLIC_ vars → needed at BUILD TIME (baked into JS bundle)
# These are NOT secret - safe to be in build args
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL

# Map to ENV for Next.js compiler
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL

# ✅ Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application
RUN npm run build

# ============================================
# STAGE 3: RUNNER (Production)
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# ✅ Security: non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# ✅ RUNTIME secrets injected here via Kubernetes secrets
# NOT baked into image - passed at container startup
# CLERK_SECRET_KEY → from K8s secret
# STRIPE_SECRET_KEY → from K8s secret

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]