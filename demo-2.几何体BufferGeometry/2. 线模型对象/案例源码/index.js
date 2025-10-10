import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// 线模型对象

// 1. 创建场景
const scene = new THREE.Scene();

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. 创建线模型对象
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

// 线材质对象
const material = new THREE.LineBasicMaterial({
    color: 0xff0000 //线条颜色
});

// =====================================核心区域======================================
// 创建线模型对象
const line = new THREE.Line(geometry, material);
// 闭合线条
// const line = new THREE.LineLoop(geometry, material);

//非连续的线条
// const line = new THREE.LineSegments(geometry, material);

// =====================================核心区域======================================

// 5. 添加线模型对象到场景中
scene.add(line);

// 6. 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果

// 7. 添加坐标轴辅助
// const axesHelper = new THREE.AxesHelper(50);
// scene.add(axesHelper);

// 8. 添加GUI
const gui = new GUI();
const lineFolder = gui.addFolder('线条属性');
lineFolder.addColor({ color: 0xff0000 }, 'color').onChange((value) => {
    material.color.set(value);
});
lineFolder.open();

// 9. 添加渲染循环
function animate() {
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update();

    // 渲染场景
    renderer.render(scene, camera);
}

// 启动动画循环
animate();

// 监听窗口变化，更新渲染尺寸
window.addEventListener('resize', () => {
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 更新渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
});
