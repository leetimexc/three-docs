import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


// 几何体顶点索引数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    80, 0, 0, //顶点2坐标
    80, 80, 0, //顶点3坐标
    // 0, 0, 0, //顶点4坐标   和顶点1位置相同
    // 80, 80, 0, //顶点5坐标  和顶点3位置相同
    0, 80, 0, //顶点6坐标  // 改成4坐标
]);

// 创建几何体对象
const geometry = new THREE.BufferGeometry();
// 设置几何体顶点位置数据
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
    // 下面索引值对应顶点位置数据中的顶点坐标
    0, 1, 2, // 第一个三角形：顶点1, 顶点2, 顶点3
    0, 2, 3, // 第二个三角形：顶点1, 顶点3, 顶点4
])
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组


console.log('xxxx', geometry)
// 创建材质对象
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, // 蓝色
    side: THREE.DoubleSide, // 双面可见
    wireframe: false // 设置为true可以查看三角形结构
});

// 创建网格模型对象
const mesh = new THREE.Mesh(geometry, material);

// 创建场景
const scene = new THREE.Scene();
// 将网格模型添加到场景中
scene.add(mesh);
// 添加坐标轴辅助器
scene.add(new THREE.AxesHelper(100));

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 设置相机位置
camera.position.set(0, 0, 150);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// 添加矩形的边框
const edgesGeometry = new THREE.BufferGeometry();
const edgesVertices = new Float32Array([
    0, 0, 0,    // 左下角
    80, 0, 0,   // 右下角
    80, 0, 0,   // 右下角
    80, 80, 0,  // 右上角
    80, 80, 0,  // 右上角
    0, 80, 0,   // 左上角
    0, 80, 0,   // 左上角
    0, 0, 0     // 左下角
]);
edgesGeometry.setAttribute('position', new THREE.BufferAttribute(edgesVertices, 3));
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // 绿色线
const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
scene.add(edges);

// 添加对角线
const diagonalGeometry = new THREE.BufferGeometry();
const diagonalVertices = new Float32Array([
    0, 0, 0,    // 起点（左下角）
    80, 80, 0   // 终点（右上角）
]);
diagonalGeometry.setAttribute('position', new THREE.BufferAttribute(diagonalVertices, 3));
const diagonalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // 红色线
const diagonalLine = new THREE.Line(diagonalGeometry, diagonalMaterial);
scene.add(diagonalLine);

// 添加GUI控制面板
const gui = new GUI();
const materialFolder = gui.addFolder('材质属性');
const materialParams = {
    color: 0x0000ff,
    wireframe: false,
    side: 'DoubleSide'
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

// 实现渲染循环
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