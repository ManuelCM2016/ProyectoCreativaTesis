'use client';

/**
 * Glass Card - Card with glassmorphism effect and depth
 * Implements the "Glass + Depth" visual signature
 */
interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    enableHover?: boolean;
}

export function GlassCard({ children, className = '', enableHover = true }: GlassCardProps) {
    const hoverClasses = enableHover
        ? 'hover:shadow-2xl hover:[transform:perspective(1000px)_rotateX(2deg)_rotateY(-2deg)] transition-all duration-300'
        : '';

    return (
        <div
            className={`
        relative overflow-hidden rounded-xl
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-md
        border border-slate-200/50 dark:border-slate-700/50
        shadow-lg
        ${hoverClasses}
        ${className}
      `}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </div>
    );
}

/**
 * GlowCard - Card with animated glow edge
 * Implements the "Soft Glow Edge" visual signature
 */
interface GlowCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowCard({ children, className = '', glowColor = '#3b82f6' }: GlowCardProps) {
    return (
        <div className={`relative group ${className}`}>
            {/* Animated glow border */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `linear-gradient(45deg, ${glowColor}40, ${glowColor}10)`,
                    filter: 'blur(8px)',
                }}
            />

            {/* Card content */}
            <div className="relative bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                {children}
            </div>
        </div>
    );
}
