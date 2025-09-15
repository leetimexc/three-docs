import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 创建场景
const scene = new THREE.Scene();
// 创建材质
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
scene.add(camera);
// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4.添加相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼
controls.dampingFactor = 0.05; // 阻尼惯性

// 相机控件OrbitControls就不用再通过事件change执行渲染了
// controls.addEventListener('change', function () {
//     renderer.render(scene, camera); //执行渲染操作
// });//监听鼠标、键盘事件

// 5.初始渲染一次，确保页面加载后立即显示场景
// renderer.render(scene, camera);

// 5.创建时钟
const clock = new THREE.Clock();
// 6.渲染函数
function render() {
    const spt = clock.getDelta() * 1000;//毫秒
    console.log('两帧渲染时间间隔(毫秒)', spt);
    console.log('帧率FPS', 1000 / spt);
    renderer.render(scene, camera); //执行渲染操作
    mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();