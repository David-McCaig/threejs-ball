import * as Three from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//scene
const scene = new Three.Scene();

//create sphere
const geometry = new Three.SphereGeometry(3, 64, 64);
const material = new Three.MeshStandardMaterial({
  color: "#00ff83",
});

//sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const mesh = new Three.Mesh(geometry, material);
scene.add(mesh);

//light

const light = new Three.PointLight(0xffffff, 10, 100);
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new Three.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

//Render

const canvas = document.querySelector(".webgl");
const renderer = new Three.WebGLRenderer({ canvas });
renderer.setPixelRatio(2)
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

//resize

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();
