'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * BrandOrb - Animated 3D shape for background decoration
 * Organic floating motion with gradient material
 */
export function BrandOrb() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slow rotation for subtle movement
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.5}
            floatingRange={[-0.5, 0.5]}
        >
            <mesh ref={meshRef} position={[2, 0, 0]}>
                <icosahedronGeometry args={[1.2, 1]} />
                <MeshDistortMaterial
                    color="#3b82f6"
                    attach="material"
                    distort={0.3}
                    speed={1.5}
                    roughness={0.4}
                    metalness={0.1}
                    emissive="#60a5fa"
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Ambient and point lights for subtle glow */}
            <ambientLight intensity={0.3} />
            <pointLight position={[2, 2, 2]} intensity={0.5} color="#60a5fa" />
            <pointLight position={[-2, -2, -2]} intensity={0.3} color="#93c5fd" />
        </Float>
    );
}
