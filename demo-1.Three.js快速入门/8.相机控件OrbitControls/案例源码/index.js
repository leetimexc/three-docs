import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1.创建场景
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);

// 3.创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4.添加相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件