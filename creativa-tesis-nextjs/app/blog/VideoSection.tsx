'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Video {
    _id: string;
    title: string;
    description?: string;
    platform: 'youtube' | 'facebook' | 'tiktok';
    videoUrl: string;
    orientation: 'horizontal' | 'vertical' | 'square';
    thumbnail?: string;
}

interface VideoSectionProps {
    videos: Video[];
}

// Función para extraer el ID/embed URL de cada plataforma
function getEmbedUrl(video: Video): string {
    const url = video.videoUrl;

    if (video.platform === 'youtube') {
        // Soporta youtube.com/watch?v=, youtu.be/, youtube.com/embed/
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = match && match[2].length === 11 ? match[2] : null;
        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    if (video.platform === 'facebook') {
        // Facebook video embed
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;
    }

    if (video.platform === 'tiktok') {
        // Extraer ID de TikTok (formato: tiktok.com/@user/video/[ID])
        const tiktokMatch = url.match(/video\/(\d+)/);
        const videoId = tiktokMatch ? tiktokMatch[1] : '';
        return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : '';
    }

    return '';
}

// Función para obtener dimensiones según orientación
function getAspectRatio(orientation: string): string {
    switch (orientation) {
        case 'vertical':
            return 'aspect-[9/16]';
        case 'square':
            return 'aspect-square';
        default:
            return 'aspect-video';
    }
}

function getContainerWidth(orientation: string): string {
    switch (orientation) {
        case 'vertical':
            return 'max-w-[320px]';
        case 'square':
            return 'max-w-[400px]';
        default:
            return 'max-w-full';
    }
}

function getPlatformIcon(platform: string): string {
    switch (platform) {
        case 'youtube':
            return '📺';
        case 'facebook':
            return '📘';
        case 'tiktok':
            return '🎵';
        default:
            return '🎬';
    }
}

function getPlatformColor(platform: string): string {
    switch (platform) {
        case 'youtube':
            return 'from-red-500 to-red-600';
        case 'facebook':
            return 'from-blue-600 to-blue-700';
        case 'tiktok':
            return 'from-pink-500 via-purple-500 to-cyan-500';
        default:
            return 'from-gray-500 to-gray-600';
    }
}

export default function VideoSection({ videos }: VideoSectionProps) {
    const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

    if (!videos || videos.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full size-20 flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl text-purple-500">videocam</span>
                </div>
                <h3 className="text-navy-text dark:text-white font-heading text-xl font-bold mb-2">
                    Próximamente
                </h3>
                <p className="text-slate-600 dark:text-gray-400">
                    Pronto tendremos videos educativos para ti.
                </p>
            </div>
        );
    }

    const handleLoadVideo = (videoId: string) => {
        setLoadedVideos(prev => new Set([...prev, videoId]));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => {
                const embedUrl = getEmbedUrl(video);
                const isLoaded = loadedVideos.has(video._id);

                return (
                    <div
                        key={video._id}
                        className={`group ${getContainerWidth(video.orientation)} mx-auto w-full`}
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
                            {/* Video Container */}
                            <div className={`relative ${getAspectRatio(video.orientation)} bg-slate-900 overflow-hidden`}>
                                {!isLoaded ? (
                                    // Thumbnail/Preview
                                    <button
                                        onClick={() => handleLoadVideo(video._id)}
                                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 group cursor-pointer"
                                    >
                                        {video.thumbnail ? (
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                                            />
                                        ) : (
                                            <div className={`absolute inset-0 bg-gradient-to-br ${getPlatformColor(video.platform)} opacity-20`}></div>
                                        )}
                                        <div className="relative z-10 flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                                                <span className="material-symbols-outlined text-white text-3xl ml-1">play_arrow</span>
                                            </div>
                                            <span className="mt-3 text-white/80 text-sm font-medium">
                                                {getPlatformIcon(video.platform)} Ver en {video.platform.charAt(0).toUpperCase() + video.platform.slice(1)}
                                            </span>
                                        </div>
                                    </button>
                                ) : (
                                    // Iframe embed
                                    <iframe
                                        src={embedUrl}
                                        title={video.title}
                                        className="absolute inset-0 w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                )}
                            </div>

                            {/* Video Info */}
                            <div className="p-4">
                                <div className="flex items-start gap-3">
                                    <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getPlatformColor(video.platform)} text-white`}>
                                        {getPlatformIcon(video.platform)} {video.platform.toUpperCase()}
                                    </span>
                                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs text-slate-600 dark:text-gray-400">
                                        {video.orientation === 'vertical' ? '↕️ Vertical' : video.orientation === 'square' ? '⬜ Cuadrado' : '↔️ Horizontal'}
                                    </span>
                                </div>
                                <h3 className="text-navy-text dark:text-white font-bold text-lg mt-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {video.title}
                                </h3>
                                {video.description && (
                                    <p className="text-slate-600 dark:text-gray-400 text-sm mt-2 line-clamp-2">
                                        {video.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
