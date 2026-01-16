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
}

interface BlogPostsListProps {
    posts: BlogPost[];
}

export default function BlogPostsList({ posts }: BlogPostsListProps) {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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

    if (!posts || posts.length === 0) {
        return (
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
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div
                        key={post._id}
                        onClick={() => setSelectedPost(post)}
                        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                        {/* Image */}
                        {post.mainImage && (
                            <div className="relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
                                <Image
                                    src={post.mainImage}
                                    alt={post.title}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            <h2 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2 group-hover:text-primary-blue transition-colors">
                                {post.title}
                            </h2>
                            {post.excerpt && (
                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            )}
                            {post.publishedAt && (
                                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            )}
                            <div className="text-primary-blue text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                Leer más <span className="text-lg">→</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto relative animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors shadow-lg"
                        >
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">close</span>
                        </button>

                        {/* Header Image */}
                        {selectedPost.mainImage && (
                            <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gray-200 dark:bg-slate-800 flex items-center justify-center">
                                <Image
                                    src={selectedPost.mainImage}
                                    alt={selectedPost.title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        )}

                        <div className="p-8 md:p-12">
                            {/* Title and Meta */}
                            <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-black text-navy-text dark:text-white font-heading mb-4">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                    {selectedPost.author && (
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-primary-blue text-base">person</span>
                                            <span>{selectedPost.author}</span>
                                        </div>
                                    )}
                                    {selectedPost.publishedAt && (
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-secondary-blue text-base">calendar_today</span>
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
                                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary-blue p-6 rounded-r-lg mb-8">
                                    <p className="text-lg text-gray-700 dark:text-gray-300 italic">
                                        {selectedPost.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            {selectedPost.content && (
                                <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-gray-300">
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

