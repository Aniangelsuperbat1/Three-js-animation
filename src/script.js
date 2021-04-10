import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
// import { ObjectControls } from "threeJS-object-controls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
// import { Scene, WebGLRenderer } from "three";

// Textures
const newTexture = new THREE.TextureLoader().load(
  "/textures/2_no_clouds_4k.jpg"
);

const newTexture2 = new THREE.TextureLoader().load(
  "/textures/elev_bump_4k.jpg"
);

const newTexture3 = new THREE.TextureLoader().load("/textures/water_4k.png");

const newTexture4 = new THREE.TextureLoader().load(
  "/textures/fair_clouds_4k.png"
);

const newTexture5 = new THREE.TextureLoader().load(
  "/textures/galaxy_starfield.png"
);

const newTexture6 = new THREE.TextureLoader().load("/textures/moon_texture.jpg")

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(1, 64, 64);

// Materials

const material = new THREE.MeshPhongMaterial();
material.color = new THREE.Color(0x292929);
material.bumpMap = newTexture2;
material.map = newTexture;
material.bumpScale = 0.1;
material.specularMap = newTexture3;
material.map = newTexture4;
material.transparent = true;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// New Sphere
const geometry1 = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material1 = new THREE.MeshPhongMaterial();
material1.color = new THREE.Color(0x292929);
material1.map = newTexture;
material1.bumpMap = newTexture2;
material1.bumpScale = 0.05;
material1.specularMap = newTexture3;

// Mesh
const sphere1 = new THREE.Mesh(geometry1, material1);
sphere1.position.y = 0;
sphere1.position.x = 0;
sphere1.position.z = 0;

scene.add(sphere1);

gui.add(sphere1.position, "x").min(0).max(10).step(0.01);
gui.add(sphere1.position, "y").min(0).max(10).step(0.01);
gui.add(sphere1.position, "z").min(0).max(10).step(0.01);

// scene.background = newTexture5;

// New Sphere 
const starGeometry = new THREE.SphereGeometry(2, 50, 50);
const starMaterial = new THREE.MeshPhongMaterial();
starMaterial.map = newTexture5
starMaterial.side = THREE.DoubleSide;
starMaterial.shininess = 0
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

scene.add(new THREE.AmbientLight(0x333333));

// New Sphere 
const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMaterial = new THREE.MeshPhongMaterial();
moonMaterial.map = newTexture6
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
// moon.position.set(35, 0, 0);
scene.add(moon);

const light = new THREE.DirectionalLight(0xffffff, 7);
light.position.set(5, 3, 5);
scene.add(light);

// //Light 1

// const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// //Light 2
// const newPointLight = new THREE.PointLight(0xffffff);
// newPointLight.position.set(10, 50, 50);
// newPointLight.intensity = 10;
// scene.add(newPointLight);

// const light2 = gui.addFolder("Light 2");

// light2.add(newPointLight.position, "x").min(-3).max(3).step(0.01);
// light2.add(newPointLight.position, "y").min(-6).max(6).step(0.01);
// light2.add(newPointLight.position, "z").min(-3).max(3).step(0.01);
// light2.add(newPointLight, "intensity").min(-6).max(10).step(0.01);

// const light2Color = { color: 0xff0000 };
// light2.addColor(light2Color, "color").onChange(() => {
//   newPointLight.color.set(light2Color.color);
// });

// const lightHelper = new THREE.PointLightHelper(newPointLight, 1);
// scene.add(lightHelper);

// // Light 3

// const newPointLight2 = new THREE.PointLight(0xff0000, 2);
// newPointLight2.position.set(1, 1, 1);
// newPointLight2.intensity = 10;
// scene.add(newPointLight2);

// const light3 = gui.addFolder("Light 3");

// light3.add(newPointLight2.position, "x").min(-3).max(3).step(0.01);
// light3.add(newPointLight2.position, "y").min(-6).max(6).step(0.01);
// light3.add(newPointLight2.position, "z").min(-3).max(3).step(0.01);
// light3.add(newPointLight, "intensity").min(0).max(10).step(0.01);

// const light3Color = { color: 0xff0000 };
// light3.addColor(light3Color, "color").onChange(() => {
//   newPointLight2.color.set(light3Color.color);
// });

// // Light helper

// const lightHelper2 = new THREE.PointLightHelper(newPointLight2, 1);
// scene.add(lightHelper2);

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

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

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

const r = 35;
const theta = 0;
const dTheta = (2 * Math.PI) / 1000;

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;
  // sphere.rotation.x = 0.5 * elapsedTime;

  sphere1.rotation.y = 0.5 * elapsedTime;
  // sphere1.rotation.x = 1 * elapsedTime;

  starField.rotation.y = .1 * elapsedTime;

  moon.rotation.y = 0.1 * elapsedTime;

  // theta += dTheta;
  // moon.position.x = r * Math.cos(theta);
  // moon.position.z = r * Math.sin(theta);

  // Update Orbital Controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);
};

animate();
