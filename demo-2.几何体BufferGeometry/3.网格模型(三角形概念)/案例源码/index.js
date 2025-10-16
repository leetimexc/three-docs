import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// 1.创建场景对象Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x888888);

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);


// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4.创建材质
// =====================================核心区域======================================
// const material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff, //材质颜色
//     side: THREE.FrontSide, //默认只有正面可见
// });

// const material = new THREE.MeshBasicMaterial({
//     color: 0x0000ff, //材质颜色
//     side: THREE.DoubleSide, //两面可见
// });

const material = new THREE.MeshBasicMaterial({
    side: THREE.BackSide, //设置只有背面可见
});
// =====================================核心区域======================================

// 5. 创建几何体
const geometry = new THREE.BufferGeometry();
// 三角形顶点坐标
const vertices = new Float32Array([
    0, 0, 0, // 顶点1
    50, 0, 0, // 顶点2
    0, 50, 0, // 顶点3

    0, 0, 0, // 顶点4
    0, 0, 50, // 顶点5
    50, 0, 0, // 顶点6
]);
// 创建顶点属性
const attribute = new THREE.BufferAttribute(vertices, 3); // 3个为一组，表示一个顶点坐标
// 设置几何体的位置属性
geometry.attributes.position = attribute;

// 6. 创建网格模型
const mesh = new THREE.Mesh(geometry, material);
// 添加到场景
scene.add(mesh);

// 7. 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果

// 8. 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 9. 添加GUI控制面板
const gui = new GUI();
// 材质颜色控制
const materialFolder = gui.addFolder('材质属性');
const materialParams = {
    color: 0x0000ff,
    wireframe: false,
    side: 'FrontSide'
};

materialFolder.addColor(materialParams, 'color').onChange((value) => {
    material.color.set(value);
});
materialFolder.add(materialParams, 'wireframe').onChange((value) => {
    material.wireframe = value;
});
materialFolder.add(materialParams, 'side', ['FrontSide', 'BackSide', 'DoubleSide']).onChange((value) => {
    switch (value) {
        case 'FrontSide':
            material.side = THREE.FrontSide;
            break;
        case 'BackSide':
            material.side = THREE.BackSide;
            break;
        case 'DoubleSide':
            material.side = THREE.DoubleSide;
            break;
    }
});
materialFolder.open();

// 10. 添加渲染循环
function animate() {
    requestAnimationFrame(animate);

    // 更新控制器
    controls.update();

    // 渲染场景
    renderer.render(scene, camera);
}

// 启动动画循环
animate();

// 11. 监听窗口变化，更新渲染尺寸
window.addEventListener('resize', () => {
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // 更新渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight);
});


// 创建立方体
const cubeGeometry = new THREE.BoxGeometry(50, 50, 50);
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    flatShading: true // 平面着色，显示多边形面
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, 120, 0); // 放在左侧
scene.add(cube);

// 创建低多边形球体
const lowPolySphereGeometry = new THREE.IcosahedronGeometry(40, 1); // 二十面体细分1次
const lowPolySphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    flatShading: true
});
const lowPolySphere = new THREE.Mesh(lowPolySphereGeometry, lowPolySphereMaterial);
lowPolySphere.position.set(0, 0, 120); // 放在中间
scene.add(lowPolySphere);

// 创建高多边形球体
const highPolySphereGeometry = new THREE.SphereGeometry(40, 32, 32); // 更多的分段
const highPolySphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    flatShading: true
});
const highPolySphere = new THREE.Mesh(highPolySphereGeometry, highPolySphereMaterial);
highPolySphere.position.set(120, 0, 0); // 放在右侧
scene.add(highPolySphere);

// 添加灯光以便更好地显示几何体
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);