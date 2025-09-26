import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
// const width = 800; //宽度
// const height = 500; //高度

// 全屏渲染
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度

// 1.创建场景对象Scene
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00
});
scene.background = new THREE.Color(0x0000ff);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
// 2.创建相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);

/**
 * 创建渲染器对象
 */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
renderer.render(scene, camera); //执行渲染操作
//three.js执行渲染命令会输出一个canvas画布，也就是一个HTML元素，你可以插入到web页面中
// document.body.appendChild(renderer.domElement);
// document.getElementById('webgl').appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);


// canvas画布宽高度动态变化
// onresize 事件会在窗口被调整大小时发生
window.onresize = function () {
    // 重置渲染器输出画布canvas尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
};