'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import type { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import styles from './ProductScene.module.css';

interface ProductSceneProps {
    config: {
      flavour: string;
      shape: string;
      color: string;
    };
  }

export default function ProductScene({ config }: ProductSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);

  // initialize scene once
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
    camera.position.z = 3;
    cameraRef.current = camera;

    // setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // environment map
    const createEnvironmentMap = () => {
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
      const cubeCamera = new THREE.CubeCamera(0.1, 1000, cubeRenderTarget);
      
      // gradient environment for color enhancement
      const envScene = new THREE.Scene();
      const envGeometry = new THREE.SphereGeometry(500, 32, 32);
      const envMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0.2, 0, 0.4),
        side: THREE.BackSide
      });
      const envMesh = new THREE.Mesh(envGeometry, envMaterial);
      envScene.add(envMesh);
      
      cubeCamera.update(renderer, envScene);
      return cubeRenderTarget.texture;
    };
    
    const envMap = createEnvironmentMap();
    scene.environment = envMap;

    // Append renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.8);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Start animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate current model if it exists
      if (currentModelRef.current) {
        currentModelRef.current.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    };
    animate();

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

  // load model when config changes
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;
    const loader = new GLTFLoader();
    const modelFilename = `${config.flavour}-${config.shape}-${config.color}`;
    
    // Remove existing model
    if (currentModelRef.current) {
      scene.remove(currentModelRef.current);
      // Dispose of old model resources
      currentModelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (child.material instanceof THREE.Material) {
            child.material.dispose();
          }
        }
      });
      currentModelRef.current = null;
    }

    console.log('Loading model:', modelFilename);

    loader.load(`./3dModels/${modelFilename}.gltf`, 
      function (gltf: GLTF) {
        console.log('GLTF loaded:', gltf);
        
        gltf.scene.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            console.log(child.name, child.material);
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Add the new model to the scene
        scene.add(gltf.scene);
        currentModelRef.current = gltf.scene;
      },
      function (progress: ProgressEvent<EventTarget>) {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '% loaded');
      },
      function (error: unknown) {
        console.error('Error loading GLTF:', error);
      }
    );
  }, [config]);

  return (
    <section className={styles.scene}>
      <div ref={mountRef} className={styles.canvas} />
    </section>
  );
}