import * as THREE from 'three'
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 实例化一个gui对象
const gui = new GUI();
//改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

// .add()方法
//创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
    x: 30,
};
// gui增加交互界面，用来改变obj对应属性
gui.add(obj, 'x', 0, 100);

setInterval(function () {
    console.log('x', obj.x);
}, 10)

const obj1 = {
    x1: 30,
    y1: 60,
    z1: 300,
};
// gui界面上增加交互界面，改变obj对应属性
gui.add(obj1, 'x1', 0, 100);
gui.add(obj1, 'y1', 0, 50);
gui.add(obj1, 'z1', 0, 60);

// gui改变threejs光照强度测试
// 光照强度属性.intensity
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1); // 设置背景色
document.body.appendChild(renderer.domElement);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果

// 添加几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// 添加一个平面作为地面，更好地展示光照效果
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    side: THREE.DoubleSide, //两面可见
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// 添加环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
// 添加平行光，更好地展示阴影效果
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 创建光照控制文件夹
const lightFolder = gui.addFolder('光照控制');

// 环境光强度控制
lightFolder.add(ambient, 'intensity', 0, 2.0).name('环境光强度');
// 平行光强度控制
lightFolder.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度');

// 创建几何体控制文件夹
const cubeFolder = gui.addFolder('立方体控制');

// 控制立方体旋转
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('X轴旋转');
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('Y轴旋转');
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('Z轴旋转');


// 控制立方体位置
const cubePosition = {
    x: 0,
    y: 0,
    z: 0
};

// 更新立方体位置的函数
function updateCubePosition() {
    cube.position.set(cubePosition.x, cubePosition.y, cubePosition.z);
}

cubeFolder.add(cubePosition, 'x', -3, 3).onChange(updateCubePosition).name('X位置');
cubeFolder.add(cubePosition, 'y', -3, 3).onChange(updateCubePosition).name('Y位置');
cubeFolder.add(cubePosition, 'z', -3, 3).onChange(updateCubePosition).name('Z位置');

// 自适应窗口大小变化
window.addEventListener('resize', () => {
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 更新渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// 动画循环
function animate() {
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update();

    // 渲染场景
    renderer.render(scene, camera);
}

// 启动动画循环
animate();

console.log('ambient.intensity', ambient.intensity);
// 通过GUI改变mesh.position对象的xyz属性
gui.add(ambient, 'intensity', 0, 2.0);


// gui改变threejs模型位置测试
gui.add(cube.position, 'x', 0, 180);
gui.add(cube.position, 'y', 0, 180);
gui.add(cube.position, 'z', 0, 180);