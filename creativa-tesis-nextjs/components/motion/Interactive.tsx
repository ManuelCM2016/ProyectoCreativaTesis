'use client';

import { motion, MotionProps } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { spring, distances, glow } from '@/lib/motion/tokens';

interface InteractiveProps extends Omit<MotionProps, 'whileHover' | 'whileTap'> {
    children: React.ReactNode;
    enableHover?: boolean;
    enableTap?: boolean;
    enableGlow?: boolean;
    className?: string;
}

/**
 * Interactive - Wrapper for hover and tap animations
 * Adds subtle lift, scale, and glow effects
 */
export function Interactive({
    children,
    enableHover = true,
    enableTap = true,
    enableGlow = false,
    className,
    ...motionProps
}: InteractiveProps) {
    const shouldReduceMotion = useReducedMotion();

    const hoverAnimation = enableHover && !shouldReduceMotion
        ? {
            y: -distances.micro,
            scale: 1.01,
            transition: spring.soft,
        }
        : {};

    const tapAnimation = enableTap && !shouldReduceMotion
        ? {
            scale: 0.98,
            transition: spring.snappy,
        }
        : {};

    const glowStyle = enableGlow
        ? {
            boxShadow: `0 0 ${glow.size}px ${glow.size / 2}px rgba(59, 130, 246, ${glow.opacity})`,
        }
        : {};

    return (
        <motion.div
            className={className}
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
            style={enableGlow ? glowStyle : undefined}
            {...motionProps}
        >
            {children}
        </motion.div>
    );
}

/**
 * MagneticButton - Button with magnetic hover effect (desktop only)
 * Subtly follows the cursor on hover
 */
interface MagneticButtonProps {
    children: React.ReactNode;
    strength?: number;
    className?: string;
}

export function MagneticButton({ children, strength = 0.3, className }: MagneticButtonProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.button
            className={className}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={spring.soft}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * strength;
                const y = (e.clientY - rect.top - rect.height / 2) * strength;
                e.currentTarget.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
            }}
        >
            {children}
        </motion.button>
    );
}
