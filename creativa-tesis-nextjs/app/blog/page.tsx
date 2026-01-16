import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/sanity/queries';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Blog y Recursos - Creativa Tesis',
    description:
        'Artículos, guías y recursos académicos para apoyar tu investigación y proceso de titulación.',
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[1024px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Blog y Recursos
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Guías prácticas, consejos académicos y recursos para ayudarte en tu proceso de investigación.
                    </p>
                </div>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className="bg-white dark:bg-slate-900 rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow"
                            >
                                <div className="p-6">
                                    <h2 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="text-slate-600 dark:text-gray-400 font-body text-sm mb-4">
                                            {post.excerpt}
                                        </p>
                                    )}
                                    <div className="text-primary-blue text-sm font-medium">
                                        Leer más →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-slate-100 dark:bg-slate-800 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-4xl text-slate-400">article</span>
                        </div>
                        <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                            Próximamente
                        </h3>
                        <p className="text-slate-600 dark:text-gray-400 font-body">
                            Estamos preparando contenido valioso para ti. Vuelve pronto.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
