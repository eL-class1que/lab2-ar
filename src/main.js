import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer;
let boxMesh, sphereMesh, cylinderMesh;
let controls;

init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // Створюємо сцену
  scene = new THREE.Scene();

  // Камера
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

  // Об'єкт рендерингу
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  container.appendChild(renderer.domElement);

  // Світло
  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(3, 3, 3);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 10, 10);
  pointLight.position.set(-2, 2, 2);
  scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  // 1. Створюємо куб
  const boxGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x87CEEB,
    transparent: true,
    opacity: 0.5,
    roughness: 0.4,
    metalness: 0.8,
    reflectivity: 1.0,
    transmission: 0.8,
  });
  boxMesh = new THREE.Mesh(boxGeometry, glassMaterial);
  boxMesh.position.x = -1.5;
  scene.add(boxMesh);

  // 2. Створюємо сферу
  const sphereGeometry = new THREE.SphereGeometry(0.6, 32, 32);
  const emissiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xff4500,
    emissive: 0xff4500,
    emissiveIntensity: 3,
    metalness: 0.5,
    roughness: 0.2,
  });
  sphereMesh = new THREE.Mesh(sphereGeometry, emissiveMaterial);
  scene.add(sphereMesh);

  // 3. Створюємо циліндр
  const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 1, 32);
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    metalness: 1,
    roughness: 0.3,
  });
  cylinderMesh = new THREE.Mesh(cylinderGeometry, goldMaterial);
  cylinderMesh.position.x = 1.5;
  scene.add(cylinderMesh);

  // Позиція для камери
  camera.position.z = 3;

  // Контролери для 360 огляду на вебсторінці, але не під час AR-сеансу
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  document.body.appendChild(ARButton.createButton(renderer));

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
  controls.update();
}

function render() {
  rotateObjects();
  renderer.render(scene, camera);
}

function rotateObjects() {
  boxMesh.rotation.y += 0.01;
  sphereMesh.rotation.x += 0.01;
  cylinderMesh.rotation.x += 0.01;
}
