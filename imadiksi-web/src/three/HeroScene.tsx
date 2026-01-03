import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";


function NetworkShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.8}>
                <icosahedronGeometry args={[1, 2]} />
                <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.15} />
            </mesh>
            <mesh scale={1.8}>
                <icosahedronGeometry args={[1, 2]} />
                <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
            </mesh>
        </Float>
    );
}

function SceneContent() {
    return (
        <>
            <color attach="background" args={['transparent']} />
            <ambientLight intensity={0.5} />
            <NetworkShape />
            <Sparkles count={80} scale={6} size={2} speed={0.4} opacity={0.5} color="#93c5fd" />
        </>
    );
}

export function HeroScene({ className }: { className?: string }) {
    // Basic fallback for WebGL enabled check could be added here

    return (
        <div className={className}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]} // Optimization
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <SceneContent />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        maxPolarAngle={Math.PI / 1.5}
                        minPolarAngle={Math.PI / 3}
                        autoRotate
                        autoRotateSpeed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
