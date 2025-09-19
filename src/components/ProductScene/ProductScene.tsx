'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import styles from './ProductScene.module.css';

export default function ProductScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  

  useEffect(() => {
    if (!mountRef.current) return;

    // setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Append renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // basic rotating cube as placeholder

    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Load GLTF model - now using the imported GLTFLoader
    const loader = new GLTFLoader();
    
    loader.load('./3dModels/test1.gltf', 
      function (gltf: any) {
        console.log('GLTF loaded:', gltf);
        
        gltf.scene.traverse((child: any) => {
          if (child.isMesh) {
            console.log(child.name, child.material);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Add the model to the scene
        scene.add(gltf.scene);

        // animation loop
        const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);
        gltf.scene.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      };
      animate();
      
      },
      function (progress: any) {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '% loaded');
      },
      function (error: any) {
        console.error('Error loading GLTF:', error);
      }
    );


    // handle window resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // dispose of Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section className={styles.scene}>
      <div ref={mountRef} className={styles.canvas} />
    </section>
  );
}