import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();
//类型化数组创建顶点数据
const vertices = new Float32Array([
    0, 0, 0, //顶点1坐标
    50, 0, 0, //顶点2坐标
    0, 100, 0, //顶点3坐标
    0, 0, 10, //顶点4坐标
    0, 0, 100, //顶点5坐标
    50, 0, 10, //顶点6坐标
]);

//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);

// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 点渲染模式
const material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 20.0, //增加点对象像素尺寸，使其更容易看到
    side: THREE.DoubleSide // 双面可见
});


const points = new THREE.Points(geometry, material); //点模型对象

//创建场景对象
const scene = new THREE.Scene();
scene.add(points); //将点模型添加到场景中

// 创建面模型，需要添加索引来定义三角形
const indices = new Uint16Array([0, 1, 2, 0, 3, 4, 0, 4, 5, 0, 5, 1]);
geometry.setIndex(new THREE.BufferAttribute(indices, 1));
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


// 创建相机对象
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.add(camera);

// 调整相机位置，以便能看到所有点
camera.position.set(50, 50, 150);
camera.position.z = 5;

camera.lookAt(scene.position);

// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);

// 6.添加相机控件
const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
})//监听鼠标、键盘事件

// 7.添加渲染循环
function render() {
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()
