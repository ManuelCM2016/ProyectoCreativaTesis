'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface SceneShellProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}

/**
 * SceneShell - Reusable R3F Canvas wrapper with performance settings
 * Handles SSR, errors, and reduced motion gracefully
 */
export function SceneShell({ children, fallback, className = '' }: SceneShellProps) {
    const shouldReduceMotion = useReducedMotion();

    // Fallback gradient when 3D is disabled
    const defaultFallback = (
        <div className={`absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-secondary-blue/10 blur-3xl ${className}`} />
    );

    // If reduced motion is active, show fallback
    if (shouldReduceMotion) {
        return fallback || defaultFallback;
    }

    return (
        <div className={`absolute inset-0 ${className}`}>
            <Suspense fallback={fallback || defaultFallback}>
                <Canvas
                    dpr={[1, 1.5]} // Limit DPR for performance
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    gl={{
                        antialias: false, // Save performance
                        alpha: true,
                        powerPreference: 'high-performance',
                    }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none', // Don't interfere with page interaction
                    }}
                >
                    {children}
                </Canvas>
            </Suspense>
        </div>
    );
}
