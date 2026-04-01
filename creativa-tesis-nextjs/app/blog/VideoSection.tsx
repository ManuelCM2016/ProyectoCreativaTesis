'use client';

import VideoPlayerWidget from '@/components/shared/VideoPlayerWidget';

type Platform = 'youtube' | 'facebook' | 'instagram';
type AspectRatio = '16:9' | '9:16' | '1:1';

interface Video {
    _id: string;
    title: string;
    description?: string;
    platform: Platform;
    videoUrl: string;
    /** Nuevo campo Sanity: '16:9' | '9:16' | '1:1' */
    aspectRatio?: AspectRatio;
    /** Legado — campo anterior, mantenido para retrocompatibilidad */
    orientation?: 'horizontal' | 'vertical' | 'square';
    thumbnail?: string;
}

interface VideoSectionProps {
    videos: Video[];
}

/** Convierte el campo legado "orientation" al nuevo "aspectRatio" si es necesario */
function resolveAspectRatio(video: Video): AspectRatio {
    if (video.aspectRatio) return video.aspectRatio;
    // Retrocompatibilidad con documentos Sanity que aún tengan "orientation"
    switch (video.orientation) {
        case 'vertical': return '9:16';
        case 'square':   return '1:1';
        default:         return '16:9';
    }
}

export default function VideoSection({ videos }: VideoSectionProps) {
    if (!videos || videos.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-[#365571]/10 flex items-center justify-center mx-auto mb-5">
                    <span className="material-symbols-outlined text-3xl text-[#365571]/50">videocam_off</span>
                </div>
                <h3 className="text-[#141318] font-bold text-xl mb-2" style={{ fontFamily: '"Questrial", sans-serif' }}>
                    Próximamente
                </h3>
                <p className="text-[#141318]/50 text-sm" style={{ fontFamily: '"Inter", sans-serif' }}>
                    Pronto tendremos videos educativos para ti.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {videos.map((video) => {
                const ratio = resolveAspectRatio(video);

                return (
                    <div key={video._id} className="flex flex-col gap-3">
                        {/* Reproductor */}
                        <VideoPlayerWidget
                            url={video.videoUrl}
                            platform={video.platform}
                            aspectRatio={ratio}
                            title={video.title}
                            thumbnail={video.thumbnail}
                        />

                        {/* Info del video */}
                        <div className="px-1">
                            <h3
                                className="text-[#141318] font-bold text-base leading-snug line-clamp-2"
                                style={{ fontFamily: '"Questrial", sans-serif' }}
                            >
                                {video.title}
                            </h3>
                            {video.description && (
                                <p
                                    className="text-[#141318]/50 text-sm mt-1.5 leading-relaxed line-clamp-2"
                                    style={{ fontFamily: '"Inter", sans-serif' }}
                                >
                                    {video.description}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
