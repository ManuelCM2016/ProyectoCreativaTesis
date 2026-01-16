import type { Metadata } from 'next';
import { getSuccessCaseBySlug } from '@/lib/sanity/queries';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const successCase = await getSuccessCaseBySlug(params.slug);

    if (!successCase) {
        return {
            title: 'Caso no encontrado',
        };
    }

    return {
        title: successCase.seoTitle || successCase.title,
        description: successCase.seoDescription || successCase.quote || '',
    };
}

export default async function SuccessCasePage({ params }: { params: { slug: string } }) {
    const successCase = await getSuccessCaseBySlug(params.slug);

    if (!successCase) {
        notFound();
    }

    return (
        <article className="w-full px-4 md:px-20 py-16 bg-background-light dark:bg-background-dark">
            <div className="max-w-[800px] mx-auto">
                <h1 className="text-navy-text font-heading text-4xl md:text-5xl font-black mb-6 dark:text-white">
                    {successCase.title}
                </h1>

                {successCase.personName && (
                    <div className="flex items-center gap-4 mb-8">
                        {successCase.avatar && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image src={successCase.avatar} alt={successCase.personName} fill className="object-cover" />
                            </div>
                        )}
                        <div>
                            <p className="text-navy-text dark:text-white font-bold font-heading">{successCase.personName}</p>
                            {successCase.career && (
                                <p className="text-slate-600 dark:text-gray-400 font-body text-sm">{successCase.career}</p>
                            )}
                        </div>
                    </div>
                )}

                {successCase.quote && (
                    <blockquote className="text-slate-600 dark:text-gray-300 font-body text-lg italic border-l-4 border-primary-blue pl-6 my-8">
                        "{successCase.quote}"
                    </blockquote>
                )}

                {successCase.resultsBadges && successCase.resultsBadges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {successCase.resultsBadges.map((badge: string, idx: number) => (
                            <span
                                key={idx}
                                className="bg-secondary-blue/10 text-navy-text dark:text-white px-4 py-2 rounded-full text-sm font-medium"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>
                )}

                {successCase.content && (
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <PortableText value={successCase.content} />
                    </div>
                )}
            </div>
        </article>
    );
}
