'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    author?: string;
    publishedAt?: string;
    mainImage?: string;
    content?: any;
    category?: string;
}

interface BlogPostsListProps {
    posts: BlogPost[];
}

export default function BlogPostsList({ posts }: BlogPostsListProps) {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [mounted, setMounted] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('todos');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close modal on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setSelectedPost(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedPost) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedPost]);

    // Get unique categories
    const categories = ['todos', ...new Set(posts.filter(p => p.category).map(p => p.category!))];

    // Filter posts by category
    const filteredPosts = selectedCategory === 'todos'
        ? posts
        : posts.filter(p => p.category === selectedCategory);

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full size-24 flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <span className="material-symbols-outlined text-5xl text-blue-500">article</span>
                </div>
                <h3 className="text-navy-text dark:text-white font-heading text-2xl font-bold mb-3">
                    Próximamente
                </h3>
                <p className="text-slate-600 dark:text-gray-400 font-body text-lg max-w-md mx-auto">
                    Estamos preparando contenido valioso para ti. Vuelve pronto para descubrir guías y recursos académicos.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Category Filter */}
            {categories.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                                }`}
                        >
                            {cat === 'todos' ? '📚 Todos' : cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, idx) => (
                    <div
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className="group bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
                        style={{
                            animationDelay: `${idx * 0.1}s`,
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`
                        }}
                    >
                        {/* Image */}
                        {post.mainImage && (
                            <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                                <Image
                                    src={post.mainImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Category Badge */}
                                {post.category && (
                                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-blue-600 dark:text-blue-400">
                                        {post.category}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="p-6">
                            <h2 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                {post.title}
                            </h2>
                            {post.excerpt && (
                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm mb-4 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                {post.publishedAt && (
                                    <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                )}
                                <div className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Leer más <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
                    <div
                        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-y-auto relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-4 right-4 z-10 p-3 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-all shadow-lg hover:scale-110"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">close</span>
                        </button>

                        {/* Header Image */}
                        {selectedPost.mainImage && (
                            <div className="relative w-full h-64 md:h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                                <Image
                                    src={selectedPost.mainImage}
                                    alt={selectedPost.title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent to-transparent"></div>
                            </div>
                        )}

                        <div className="p-8 md:p-12 -mt-16 relative z-10">
                            {/* Title and Meta */}
                            <div className="mb-8">
                                {selectedPost.category && (
                                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg shadow-blue-500/30">
                                        {selectedPost.category}
                                    </span>
                                )}
                                <h1 className="text-3xl md:text-4xl font-black text-navy-text dark:text-white font-heading mb-4">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    {selectedPost.author && (
                                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                                            <span className="material-symbols-outlined text-blue-500 text-base">person</span>
                                            <span>{selectedPost.author}</span>
                                        </div>
                                    )}
                                    {selectedPost.publishedAt && (
                                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                                            <span className="material-symbols-outlined text-blue-500 text-base">calendar_today</span>
                                            <span>
                                                {new Date(selectedPost.publishedAt).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Excerpt */}
                            {selectedPost.excerpt && (
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
                                    <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
                                        {selectedPost.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            {selectedPost.content && (
                                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-gray-300 prose-headings:text-navy-text dark:prose-headings:text-white prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                                    <PortableText value={selectedPost.content} />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedPost(null)}></div>
                </div>
            )}
        </>
    );
}
