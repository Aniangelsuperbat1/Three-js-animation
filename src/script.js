import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Textures
const newTexture = new THREE.TextureLoader();
const textureLoad = newTexture.load('/textures/NormalMap(2).jpg');

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2
material.metalness = .1
material.color = new THREE.Color(0x292929);
material.normalMap = textureLoad;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light 1

// const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);



//Light 2
const newPointLight = new THREE.PointLight(0xff0000, 2);
newPointLight.position.set(1,1,1)
newPointLight.intensity = 10
scene.add(newPointLight);

const light2 = gui.addFolder("Light 2") 

light2.add(newPointLight.position, "x").min(-3).max(3).step(0.01);
light2.add(newPointLight.position, "y").min(-6).max(6).step(0.01);
light2.add(newPointLight.position, "z").min(-3).max(3).step(0.01);
light2.add(newPointLight, "intensity").min(-6).max(10).step(0.01);

const lightHelper = new THREE.PointLightHelper(newPointLight, 1)
scene.add(lightHelper)

// Light 3

const newPointLight2 = new THREE.PointLight(0xff0000, 2);
newPointLight2.position.set(1, 1, 1);
newPointLight2.intensity = 10;
scene.add(newPointLight2);

const light3 = gui.addFolder("Light 3"); 

light3.add(newPointLight2.position, "x").min(-3).max(3).step(0.01);
light3.add(newPointLight2.position, "y").min(-6).max(6).step(0.01);
light3.add(newPointLight2.position, "z").min(-3).max(3).step(0.01);
light3.add(newPointLight, "intensity").min(0).max(10).step(0.01);

const light3Color = {color : 0xff0000}
light3.addColor(light3Color, "color").onChange(() => {
    newPointLight2.color.set(light3Color.color)
})


const lightHelper2 = new THREE.PointLightHelper(newPointLight2, 1);
scene.add(lightHelper2);

// Light helper


/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.rotation.x = 0.5 * elapsedTime;

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
