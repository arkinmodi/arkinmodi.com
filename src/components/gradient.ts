import * as THREE from "three";
import vertex from "~/components/shaders/vertex.glsl?raw";
import fragment from "~/components/shaders/fragment.glsl?raw";

const canvas = document.querySelector("#gradient") as HTMLCanvasElement;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 0.5);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0xffffff, 0.5);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const colours = ["#E4FBFF", "#DEECFF", "#C6CFFF", "#E8D3FF", "#B9F3FC"].map(
  (c) => new THREE.Color(c),
);

const planeMaterial = new THREE.ShaderMaterial({
  fragmentShader: fragment,
  side: THREE.DoubleSide,
  uniforms: {
    time: { value: 0 },
    resolution: { value: new THREE.Vector4() },
    uColours: { value: colours },
  },
  vertexShader: vertex,
});

const planeGeometry = new THREE.PlaneGeometry(3, 3, 100, 100);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let resizeTimeout: number | undefined;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(handleResize, 100);
});

let time = planeMaterial.uniforms.time!.value;
function animate() {
  time += 0.0001;
  planeMaterial.uniforms.time!.value = time;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
