'use client';

/**
 * VideoPlayerWidget — Componente compartido GSAP/ReactPlayer
 *
 * Props:
 *   url         — URL directa del video (YouTube, Facebook, Instagram)
 *   platform    — 'youtube' | 'facebook' | 'instagram'
 *   aspectRatio — '16:9' | '9:16' | '1:1'
 *   title       — Texto accesible para el reproductor
 *   thumbnail   — URL opcional de imagen de vista previa (Sanity CDN)
 */

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Carga diferida — evita SSR mismatch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false }) as any;

/* ─── Helpers ─── */

type Platform = 'youtube' | 'facebook' | 'instagram';
type AspectRatio = '16:9' | '9:16' | '1:1';

function getAspectClass(ratio: AspectRatio): string {
    switch (ratio) {
        case '9:16': return 'aspect-[9/16]';
        case '1:1':  return 'aspect-square';
        default:     return 'aspect-video';      // 16:9
    }
}

function getMaxWidthClass(ratio: AspectRatio): string {
    switch (ratio) {
        case '9:16': return 'max-w-[320px]';
        case '1:1':  return 'max-w-[440px]';
        default:     return 'max-w-full';
    }
}

function getPlatformLabel(platform: Platform): string {
    const map = { youtube: 'YouTube', facebook: 'Facebook', instagram: 'Instagram' };
    return map[platform] || platform;
}

function getPlatformGradient(platform: Platform): string {
    switch (platform) {
        case 'youtube':   return 'from-red-600 to-red-700';
        case 'facebook':  return 'from-blue-600 to-blue-700';
        case 'instagram': return 'from-rose-500 via-fuchsia-500 to-amber-400';
        default:          return 'from-slate-600 to-slate-700';
    }
}

/** Configuración ReactPlayer limpia por plataforma */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPlayerConfig(platform: Platform): any {
    switch (platform) {
        case 'youtube':
            return {
                youtube: {
                    modestbranding: 1 as const,
                    rel: 0 as const,
                    showinfo: 0 as const,
                    controls: 1 as const,
                },
            };
        case 'facebook':
            return {
                facebook: {
                    width: '100%',
                    allowfullscreen: true,
                    show_text: false,
                },
            };
        default:
            return {};
    }
}

/* ─── Component ─── */

interface VideoPlayerWidgetProps {
    url: string;
    platform: Platform;
    aspectRatio: AspectRatio;
    title: string;
    thumbnail?: string;
    /** Clase extra para el contenedor raíz (ej. rounded-2xl) */
    className?: string;
}

export default function VideoPlayerWidget({
    url,
    platform,
    aspectRatio,
    title,
    thumbnail,
    className = '',
}: VideoPlayerWidgetProps) {
    const [isReady, setIsReady] = useState(false);

    // Facebook y Instagram usan iframe nativo — más confiable que SDK
    const useIframe = platform === 'instagram' || platform === 'facebook';

    // Facebook: embed URL oficial
    const facebookEmbedUrl = platform === 'facebook'
        ? `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=false&allowfullscreen=true`
        : '';

    // Instagram: construir URL de embed nativo
    const instagramEmbedUrl = platform === 'instagram'
        ? `${url.replace(/\/$/, '')}/embed/`
        : '';

    const iframeSrc = platform === 'facebook' ? facebookEmbedUrl : instagramEmbedUrl;

    return (
        <div className={`${getMaxWidthClass(aspectRatio)} mx-auto w-full ${className}`}>
            {/* Contenedor con relación de aspecto dinámica */}
            <div className={`relative ${getAspectClass(aspectRatio)} w-full overflow-hidden rounded-[1.5rem] bg-[#141318] shadow-2xl ring-1 ring-white/8`}>

                {/* ─── Skeleton de carga (pointer-events-none — nunca bloquea el player) ─── */}
                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#141318] z-10 pointer-events-none transition-opacity duration-500 ${isReady || useIframe ? 'opacity-0' : 'opacity-100'}`}
                >
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover opacity-50"
                        />
                    ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${getPlatformGradient(platform)} opacity-15`} />
                    )}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center animate-pulse">
                            <span className="material-symbols-outlined text-white text-2xl ml-0.5">play_arrow</span>
                        </div>
                        <span className="text-white/50 text-xs uppercase tracking-[0.2em]">
                            {getPlatformLabel(platform)}
                        </span>
                    </div>
                </div>

                {/* ─── Facebook / Instagram → iframe nativo ─── */}
                {useIframe ? (
                    <iframe
                        src={iframeSrc}
                        title={title}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                        scrolling="no"
                    />
                ) : (
                    /* ─── YouTube vía ReactPlayer ─── */
                    <ReactPlayer
                        url={url}
                        width="100%"
                        height="100%"
                        className="absolute top-0 left-0"
                        controls={true}
                        onReady={() => setIsReady(true)}
                        config={getPlayerConfig(platform)}
                        playsinline
                    />
                )}
            </div>

            {/* Indicador de plataforma */}
            <div className="mt-3 flex items-center gap-2 px-1">
                <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${getPlatformGradient(platform)} text-white`}>
                    {getPlatformLabel(platform)}
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                    {aspectRatio === '9:16' ? 'Vertical' : aspectRatio === '1:1' ? 'Cuadrado' : 'Horizontal'}
                </span>
            </div>
        </div>
    );
}
