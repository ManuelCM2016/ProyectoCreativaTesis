import type { Metadata } from 'next';
import { getBlogPostBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        return {
            title: 'Post no encontrado',
        };
    }

    return {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt || '',
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getBlogPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                    {post.title}
                </h1>
                {post.publishedAt && (
                    <p className="text-slate-500 font-body text-sm mb-8">
                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                )}
                {post.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <PortableText value={post.content} />
                    </div>
                )}
            </div>
        </article>
    );
}
