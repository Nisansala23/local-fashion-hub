# --- STAGE 1: DEPENDENCIES ---
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package management descriptors
COPY package.json package-lock.json* ./
RUN npm ci

# --- STAGE 2: BUILDER ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 📥 Capture the secure variables passed from the GitHub Actions workflow
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG STRIPE_SECRET_KEY
ARG NEXT_PUBLIC_BASE_URL

# ⚙️ Map them into the compiling environment for Next.js build-time validation
ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- STAGE 3: RUNNER ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-privileged system group and user for execution safety
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy essential public assets and build files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]