'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInVariants } from '@/components/motion/MotionConfig';

interface BadgeProps {
    children: ReactNode;
    icon?: string;
    className?: string;
    enableShimmer?: boolean;
}

export default function Badge({ children, icon, className = '', enableShimmer = false }: BadgeProps) {
    const shouldReduceMotion = useReducedMotion();

    const shimmerClass = enableShimmer
        ? 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:animate-shimmer'
        : '';

    return (
        <motion.span
            className={`inline-flex w-fit items-center gap-2 rounded-full border border-secondary-blue/30 bg-secondary-blue/10 px-3 py-1 text-sm font-body text-navy-text dark:text-blue-200 ${shimmerClass} ${className}`}
            initial={!shouldReduceMotion ? 'hidden' : undefined}
            animate={!shouldReduceMotion ? 'visible' : undefined}
            variants={fadeInVariants}
        >
            {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
            <span>{children}</span>
        </motion.span>
    );
}
