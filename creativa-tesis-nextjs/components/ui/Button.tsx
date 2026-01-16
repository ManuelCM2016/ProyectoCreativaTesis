'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { spring, distances } from '@/lib/motion/tokens';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export default function Button({
    variant = 'primary',
    children,
    className = '',
    ...props
}: ButtonProps & HTMLMotionProps<'button'>) {
    const shouldReduceMotion = useReducedMotion();

    const baseStyles =
        'flex items-center justify-center rounded-lg px-6 font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2 dark:focus:ring-offset-slate-900';

    const variantStyles = {
        primary:
            'h-12 bg-primary-blue text-white shadow-subtle hover:shadow-md',
        secondary:
            'h-12 bg-white border border-slate-200 text-navy-text dark:bg-background-dark dark:border-gray-700 dark:text-white shadow-subtle hover:shadow-md',
        ghost:
            'h-12 bg-transparent border border-white/30 text-white backdrop-blur-sm',
    };

    return (
        <motion.button
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
            whileHover={
                !shouldReduceMotion
                    ? {
                        y: -distances.micro,
                        scale: 1.02,
                        boxShadow: '0 8px 16px rgba(59, 130, 246, 0.15)',
                        transition: spring.soft,
                    }
                    : undefined
            }
            whileTap={
                !shouldReduceMotion
                    ? {
                        scale: 0.98,
                        transition: spring.snappy,
                    }
                    : undefined
            }
            {...props}
        >
            {children}
        </motion.button>
    );
}
