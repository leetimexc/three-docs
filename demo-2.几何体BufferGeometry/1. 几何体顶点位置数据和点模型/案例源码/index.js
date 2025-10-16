import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);
const attribue = new THREE.BufferAttribute(vertices, 3);
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 为每个顶点设置颜色
const colors = new Float32Array([
    1, 0, 0, // 顶点1颜色 - 红色
    0, 1, 0, // 顶点2颜色 - 绿色
    0, 0, 1, // 顶点3颜色 - 蓝色
    1, 1, 0, // 顶点4颜色 - 黄色
    1, 0, 1, // 顶点5颜色 - 紫色
    0, 1, 1, // 顶点6颜色 - 青色
]);
// 设置几何体attributes属性的颜色属性
geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

// 点渲染模式
const material = new THREE.PointsMaterial({
    // color属性会覆盖顶点颜色，所以注释掉
    // color: 0xffff00,
    size: 10.0, //点对象像素尺寸
    side: THREE.DoubleSide, // 双面可见
    vertexColors: true // 使用顶点颜色
});

const points = new THREE.Points(geometry, material); //点模型对象
scene.add(points);


// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 200);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 添加坐标轴辅助
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 渲染函数
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();