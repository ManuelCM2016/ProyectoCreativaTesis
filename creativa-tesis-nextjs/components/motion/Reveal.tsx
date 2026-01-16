'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import {
    fadeUpVariants,
    blurInVariants,
    scaleInVariants,
    staggerContainerVariants,
    staggerItemVariants,
} from './MotionConfig';

interface RevealProps {
    children: React.ReactNode;
    variant?: 'fade-up' | 'blur-in' | 'scale-in' | 'stagger';
    delay?: number;
    once?: boolean;
    amount?: number;
    className?: string;
}

const variantMap: Record<string, Variants> = {
    'fade-up': fadeUpVariants,
    'blur-in': blurInVariants,
    'scale-in': scaleInVariants,
    stagger: staggerContainerVariants,
};

/**
 * Reveal - Scroll-triggered animation wrapper
 * Animates children when they enter the viewport
 */
export function Reveal({
    children,
    variant = 'fade-up',
    delay = 0,
    once = true,
    amount = 0.3,
    className,
}: RevealProps) {
    const shouldReduceMotion = useReducedMotion();

    // If reduced motion is enabled, render without animation
    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    const selectedVariant = variantMap[variant] || fadeUpVariants;

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
            variants={selectedVariant}
            transition={{ delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * RevealStagger - Special case for staggered list animations
 */
interface RevealStaggerProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
}

export function RevealStagger({ children, staggerDelay = 0.1, className }: RevealStaggerProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainerVariants}
            transition={{ staggerChildren: staggerDelay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * RevealItem - Individual item in a staggered list
 */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div variants={staggerItemVariants} className={className}>
            {children}
        </motion.div>
    );
}
