import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// 创建场景
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial();
material.color = new THREE.Color(0x00ff00);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 创建相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// 添加轨道控制器
let controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera) // 执行渲染操作
}) // 监听鼠标、键盘事件