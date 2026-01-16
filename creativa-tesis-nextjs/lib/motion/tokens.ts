/**
 * Motion Tokens - Central Animation Configuration
 * All animation values in one place for easy customization
 */

export const intensity = {
    subtle: 0.5,
    normal: 1.0,
    bold: 1.5,
} as const;

export const durations = {
    fast: 200 * intensity.normal,
    normal: 400 * intensity.normal,
    slow: 600 * intensity.normal,
    verySlow: 800 * intensity.normal,
} as const;

export const easings = {
    // Custom cubic-bezier curves for smooth, professional motion
    smooth: [0.43, 0.13, 0.23, 0.96] as const,
    softOut: [0.16, 1, 0.3, 1] as const,
    snappy: [0.34, 1.56, 0.64, 1] as const,
    elastic: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const spring = {
    soft: {
        type: 'spring' as const,
        stiffness: 80 * intensity.normal,
        damping: 20,
        mass: 1,
    },
    medium: {
        type: 'spring' as const,
        stiffness: 120 * intensity.normal,
        damping: 14,
        mass: 0.8,
    },
    snappy: {
        type: 'spring' as const,
        stiffness: 200 * intensity.normal,
        damping: 20,
        mass: 0.5,
    },
} as const;

export const stagger = {
    fast: 0.05 * intensity.normal,
    normal: 0.1 * intensity.normal,
    slow: 0.15 * intensity.normal,
} as const;

export const distances = {
    micro: 2 * intensity.normal,
    small: 8 * intensity.normal,
    medium: 16 * intensity.normal,
    large: 24 * intensity.normal,
} as const;

export const opacity = {
    subtle: 0.4,
    medium: 0.6,
    strong: 0.8,
} as const;

// Glow effect parameters
export const glow = {
    size: 8 * intensity.normal,
    opacity: 0.15 * intensity.normal,
    spread: 0,
} as const;
