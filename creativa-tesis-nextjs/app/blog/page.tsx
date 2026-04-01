import type { Metadata } from 'next';
import { getBlogPosts, getVideos, getSocialFlyers } from '@/lib/sanity/queries';

// ── Nuevos componentes Premium ──────────────────────────────────────────────
import BlogHero from '@/components/blog/BlogHero';
import InsightsRadar from '@/components/blog/InsightsRadar';
import PremiumAssetsVault from '@/components/blog/PremiumAssetsVault';
import EditorialFAQ from '@/components/blog/EditorialFAQ';
import BlogCTA from '@/components/blog/BlogCTA';
import BlogPostsSection from '@/components/blog/BlogPostsSection';
import VideoSectionWrapper from '@/components/blog/VideoSectionWrapper';
import VitrinaSocial from '@/components/blog/VitrinaSocial';

export const metadata: Metadata = {
    title: 'Centro de Recursos Académicos — Creativa Tesis',
    description:
        'Guías estructuradas, plantillas de descarga, tutoriales en video y píldoras de sabiduría académica para dominar cada etapa de tu tesis.',
};

export default async function BlogPage() {
    const [posts, videos, socialFlyers] = await Promise.all([
        getBlogPosts(),
        getVideos(),
        getSocialFlyers(),
    ]);

    return (
        <>
            {/* 1. Hero — Imagen equipo + parallax scroll */}
            <BlogHero postCount={posts.length} videoCount={videos.length} />

            {/* 2. Insights Radar — Lista editorial con accordion */}
            <InsightsRadar />

            {/* 3. Blog de Investigación — Aurora cursor bg */}
            <BlogPostsSection posts={posts} />

            {/* 4. Aprende en Video — Cinematic diagonal lines */}
            <VideoSectionWrapper videos={videos} />

            {/* 5. Vitrina Social — Galería de flyers de RRSS */}
            <VitrinaSocial flyers={socialFlyers} />

            {/* 6. Recursos Descargables Premium */}
            <PremiumAssetsVault />

            {/* 7. FAQ Editorial */}
            <EditorialFAQ />

            {/* 8. CTA Final */}
            <BlogCTA />
        </>
    );
}
