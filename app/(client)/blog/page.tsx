import Image from "next/image";
import Link from "next/link";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    date: string;
    author: string;
    tags: string[];
    slug: string;
}

// Temporary editorial mock dataset matching the layout styles of Screenshot (1319).jpg
const mockPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Other O",
        excerpt: "'The Other O' with its palette of soft pastels and ecru; stripes and checks in varying measures and minimalistic peasant embroidery is a collection for the rustic sophisticate who can effortlessly blend old-world elegance with new-age consciousness.",
        imageUrl: "/images/blog/blog5.jpg", // placeholder until you have your images
        date: "November 20, 2021",
        author: "Shalini James",
        tags: ["Organic Cotton"],
        slug: "the-other-o"
    },
    {
        id: "2",
        title: "September in Sambalpur",
        excerpt: "Often in the shadow of her more famous cousin from Pochampally, the Sambalpuri Ikat of Odisha is strikingly different. The curvilinear motifs and hazy outlines depicted in this handloom weave have profound symbolism and cultural significance. A collection of contemporary garments revisit this craft.",
        imageUrl: "/images/blog/blog4.jpg",
        date: "September 01, 2021",
        author: "Shalini James",
        tags: ["Handloom"],
        slug: "september-in-sambalpur"
    },
    {
        id: "3",
        title: "Print Lounge",
        excerpt: "Breathe. Pray. Love. In Print Lounge. A curation of fluid, breathable silhouettes adorned with bespoke motifs celebrating natural dyes and effortless structural lines for everyday comfort.",
        imageUrl: "/images/blog/blog3.jpg",
        date: "August 20, 2021",
        author: "Shalini James",
        tags: ["Kaftan"],
        slug: "print-lounge"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Subtle Breadcrumb/Page indicator tracking the screen title */}
                <div className="text-center mb-16">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-shop-orange block mb-2">
                        The Journal
                    </span >
                    <h1 className="text-3xl font-black text-shop-dark uppercase tracking-tight">
                        Editorial Stories
                    </h1>
                    <div className="w-12 h-[1px] bg-gray-200 mx-auto mt-4" />
                </div>

                {/* 3-Column Image-First Editorial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {mockPosts.map((post) => (
                        <article key={post.id} className="group flex flex-col h-full">

                            {/* 1. Portrait Image Frame (Aspect ratio mimicking the tall 3:4 styling) */}
                            <Link href={`/blog/${post.slug}`} className="relative aspect-3/4 w-full bg-shop-gray-light overflow-hidden rounded-xl mb-6 block">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    sizes="(max-w-768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-101"
                                    priority={post.id === "1"}
                                />
                            </Link>

                            {/* 2. Text Meta Details Cluster */}
                            <div className="flex flex-col flex-grow">
                                <h2 className="text-lg font-bold text-shop-dark hover:text-shop-orange transition-colors duration-200 leading-snug mb-3">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p className="text-xs text-shop-gray-dark font-light leading-relaxed mb-6 flex-grow line-clamp-4">
                                    {post.excerpt}
                                </p>

                                {/* Footer Subtext String Block */}
                                <div className="mt-auto space-y-1 pt-4 border-t border-gray-150/50">
                                    <p className="text-[10px] text-shop-gray-dark font-medium uppercase tracking-wider">
                                        {post.date} — <span className="text-shop-dark font-semibold">{post.author}</span>
                                    </p>
                                    {post.tags.length > 0 && (
                                        <p className="text-[10px] text-shop-orange font-medium uppercase tracking-widest">
                                            Tags: {post.tags.join(", ")}
                                        </p>
                                    )}
                                </div>
                            </div>

                        </article>
                    ))}
                </div>

            </div>
        </div>
    );
}