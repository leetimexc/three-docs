import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//引入性能监视器stats.js
import Stats from 'three/addons/libs/stats.module.js';

//创建stats对象
const stats = new Stats();
// stats.domElement显示：渲染帧率  刷新频率,一秒渲染次数 
// stats.setMode(0);//默认模式
// //stats.domElement显示：渲染周期 渲染一帧多长时间(单位：毫秒ms)
stats.setMode(1);

//stats.domElement:web页面上输出计算结果,一个div元素，
document.body.appendChild(stats.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 将相机位置后移，这样才能看到场景中的物体
camera.position.z = 300;

// 添加光源，否则MeshLambertMaterial材质无法正常显示
const ambientLight = new THREE.AmbientLight(0x404040); // 添加环境光
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 添加平行光
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 添加轨道控制器
const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true; // 启用阻尼效果
controls.dampingFactor = 0.05;

// 性能测试
const num = 1000; //控制长方体模型数量
for (let i = 0; i < num; i++) {
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff
    });
    const mesh = new THREE.Mesh(geometry, material);
    // 随机生成长方体xyz坐标
    const x = (Math.random() - 0.5) * 200
    const y = (Math.random() - 0.5) * 200
    const z = (Math.random() - 0.5) * 200
    mesh.position.set(x, y, z)
    scene.add(mesh); // 模型对象插入场景中
}

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 渲染函数
function render() {
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
    stats.update();
    controls.update(); // 更新控制器
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
}
render();
