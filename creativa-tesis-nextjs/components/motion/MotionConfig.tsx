/**
 * Motion Config - Global Animation Variants
 * Provides reusable animation configurations for consistency
 */

import { Variants } from 'framer-motion';
import { durations, easings, distances } from '@/lib/motion/tokens';

export const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: durations.normal / 1000,
            ease: easings.smooth,
        },
    },
};

export const fadeUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: distances.medium,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.normal / 1000,
            ease: easings.softOut,
        },
    },
};

export const blurInVariants: Variants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: durations.slow / 1000,
            ease: easings.smooth,
        },
    },
};

export const scaleInVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: durations.normal / 1000,
            ease: easings.softOut,
        },
    },
};

export const slideUpVariants: Variants = {
    hidden: {
        opacity: 0,
        y: distances.large,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.slow / 1000,
            ease: easings.softOut,
        },
    },
};

// Container variants for stagger effects
export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItemVariants: Variants = {
    hidden: {
        opacity: 0,
        y: distances.small,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: durations.normal / 1000,
            ease: easings.softOut,
        },
    },
};
