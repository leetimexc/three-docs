import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 创建场景
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100);

// 添加光源，否则MeshLambertMaterial材质无法正常显示
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//材质对象Material
const material = new THREE.MeshLambertMaterial({
    color: 0x00ffff, //设置材质颜色
    transparent: true,//开启透明
    opacity: 0.5,//设置透明度
});
// for循环创建一列模型
// for (let i = 0; i < 10; i++) {
//     const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
//     // 沿着x轴分布
//     mesh.position.set(i * 200, 0, 0);
//     scene.add(mesh); //网格模型添加到场景中
// }
// 双层for循环创建阵列模型
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        // 在XOZ平面上分布
        mesh.position.set(i * 200, 0, j * 200);
        scene.add(mesh); //网格模型添加到场景中  
    }
}
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 8000);
// camera.position.z = 5;
// camera.position.set(0, 0, 5);
// camera.position.set(800, 800, 800);
// camera.lookAt(0, 0, 0);
camera.position.set(2000, 2000, 2000);
// camera.lookAt(0, 0, 0);
// 改变相机观察目标点
camera.lookAt(1000, 0, 1000);
scene.add(camera);

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果
controls.target.set(1000, 0, 1000);
controls.update();//update()函数内会执行camera.lookAt(controls.targe)

// 5. 添加渲染循环
function animate() {
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update();

    // 渲染场景
    renderer.render(scene, camera);
}

// 启动渲染循环
animate();