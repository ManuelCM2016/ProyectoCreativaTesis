import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/sanity/queries';
import BlogPostsList from './BlogPostsList';

export const metadata: Metadata = {
    title: 'Blog y Recursos - Creativa Tesis',
    description:
        'Artículos, guías y recursos académicos para apoyar tu investigación y proceso de titulación.',
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="w-full px-4 md:px-20 py-16 ">
            <div className="max-w-[1024px] mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-4 dark:text-white">
                        Blog y Recursos
                    </h1>
                    <p className="text-slate-600 font-body text-lg max-w-2xl mx-auto dark:text-gray-300">
                        Guías prácticas, consejos académicos y recursos para ayudarte en tu proceso de investigación.
                    </p>
                </div>

                <BlogPostsList posts={posts} />
            </div>
        </div>
    );
}

