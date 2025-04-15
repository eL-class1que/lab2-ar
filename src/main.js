import * as THREE from 'three';

// Створюємо сцену
const scene = new THREE.Scene();

// Камера
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

// Рендерер з підтримкою WebXR
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
document.body.appendChild(renderer.domElement);

// Додаткове освітлення
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
light.position.set(0.5, 1, 0.25);
scene.add(light);

// 📦 Box
const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-0.4, 0, -1);
scene.add(box);

// 🟠 Sphere
const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 0, -1);
scene.add(sphere);

// 🛢️ Cylinder
const cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 32);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.set(0.4, 0, -1);
scene.add(cylinder);

// Анімація
function animate() {
  box.rotation.y += 0.02;
  sphere.rotation.x += 0.015;
  cylinder.rotation.x += 0.01;
  cylinder.rotation.z += 0.02;
}

// Рендер-цикл
renderer.setAnimationLoop(() => {
  animate();
  renderer.render(scene, camera);
});

// Кнопка AR
document.body.appendChild(ARButton());

// ======= AR Button ===========
function ARButton() {
  const button = document.createElement('button');
  button.textContent = 'Enter AR';
  button.style.position = 'absolute';
  button.style.bottom = '20px';
  button.style.left = '50%';
  button.style.transform = 'translateX(-50%)';
  button.style.padding = '12px 24px';
  button.style.fontSize = '16px';
  button.style.borderRadius = '10px';
  button.style.border = 'none';
  button.style.background = '#008cff';
  button.style.color = '#fff';
  button.style.cursor = 'pointer';
  button.style.zIndex = '999';

  if (navigator.xr) {
    navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
      if (supported) {
        button.addEventListener('click', () => {
          navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test'],
            optionalFeatures: ['dom-overlay'],
            domOverlay: { root: document.body }
          }).then((session) => {
            renderer.xr.setSession(session);
          });
        });
      } else {
        button.textContent = 'AR not supported';
        button.disabled = true;
      }
    });
  } else {
    button.textContent = 'WebXR not available';
    button.disabled = true;
  }

  return button;
}
