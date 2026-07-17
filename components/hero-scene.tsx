"use client";

// HeroScene disabled for load performance — all Three.js/lil-gui bundles excluded.
// To restore: uncomment everything below the stub, remove the stub export, restore
// the imports, and uncomment HeroScene in hero.tsx.
//
// import GUI from 'lil-gui'
// import { useEffect, useRef } from 'react'
// import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { chromaticAberration } from 'three/examples/jsm/tsl/display/ChromaticAberrationNode.js'
// import { pass, renderOutput, uniform } from 'three/tsl'
// import * as THREE from 'three/webgpu'

export function HeroScene() {
  return null;
}

// --- Original implementation ---
//
// export function HeroScene() {
//   const mountRef = useRef<HTMLDivElement>(null)
//
//   useEffect(() => {
//     const mount = mountRef.current
//     if (!mount) return
//
//     let frameId: number
//     let renderer: THREE.WebGPURenderer
//
//     async function init() {
//       renderer = new THREE.WebGPURenderer({ antialias: true })
//       renderer.setPixelRatio(window.devicePixelRatio)
//       renderer.setSize(mount!.clientWidth, mount!.clientHeight)
//       renderer.setClearColor(0x000000, 1)
//       mount!.appendChild(renderer.domElement)
//
//       await renderer.init()
//
//       const scene = new THREE.Scene()
//       const camera = new THREE.PerspectiveCamera(60, mount!.clientWidth / mount!.clientHeight, 0.1, 100)
//       camera.position.set(0, 0, 3)
//
//       const pmrem = new THREE.PMREMGenerator(renderer)
//       scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
//       scene.environmentIntensity = 2.5
//       pmrem.dispose()
//
//       let model: THREE.Group | null = null
//       new GLTFLoader().load('/logo.glb', (gltf) => {
//         model = gltf.scene
//         model.position.set(0, 0.25, 0)
//         model.scale.set(3, 3, 3)
//         scene.add(model)
//       })
//
//       // Post-processing
//       const renderPipeline = new THREE.RenderPipeline(renderer)
//       renderPipeline.outputColorTransform = false
//
//       const scenePass = pass(scene, camera)
//       const outputPass = renderOutput(scenePass)
//       const caStrength = uniform(1.23)
//       const caCenter = uniform(new THREE.Vector2(1, 0.68))
//       const caScale = uniform(0.5)
//       const caPass = chromaticAberration(outputPass, caStrength, caCenter, caScale)
//       renderPipeline.outputNode = caPass
//
//       // GUI
//       const params = { strength: 1.23, centerX: 1, centerY: 0.68, scale: 0.5 }
//       const gui = new GUI({ title: 'Chromatic Aberration', closeFolders: true })
//       const folder = gui.addFolder('Static Parameters')
//       folder.add(params, 'strength', 0, 3, 0.01).name('Strength').onChange((v: number) => { caStrength.value = v })
//       folder.add(params, 'centerX', -1, 1, 0.01).name('Center X').onChange((v: number) => { caCenter.value.x = v })
//       folder.add(params, 'centerY', -1, 1, 0.01).name('Center Y').onChange((v: number) => { caCenter.value.y = v })
//       folder.add(params, 'scale', 0.5, 2, 0.01).name('Scale').onChange((v: number) => { caScale.value = v })
//       gui.close()
//
//       caStrength.value = params.strength
//
//       const onResize = () => {
//         camera.aspect = mount!.clientWidth / mount!.clientHeight
//         camera.updateProjectionMatrix()
//         renderer.setSize(mount!.clientWidth, mount!.clientHeight)
//       }
//       window.addEventListener('resize', onResize)
//
//       const startTime = performance.now()
//
//       const animate = () => {
//         frameId = requestAnimationFrame(animate)
//         const t = (performance.now() - startTime) / 1000
//         if (model) model.rotation.y = Math.sin(t * 0.5) * 0.4
//         renderPipeline.render()
//       }
//       animate()
//
//       ;(mount as any)._cleanup = () => {
//         cancelAnimationFrame(frameId)
//         window.removeEventListener('resize', onResize)
//         gui.destroy()
//         renderer.dispose()
//         if (mount!.contains(renderer.domElement)) mount!.removeChild(renderer.domElement)
//       }
//     }
//
//     init()
//
//     return () => {
//       ;(mount as any)._cleanup?.()
//     }
//   }, [])
//
//   return <div ref={mountRef} className="absolute inset-0" />
// }
