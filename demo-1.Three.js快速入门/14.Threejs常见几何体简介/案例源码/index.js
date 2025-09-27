import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 1.创建场景
const scene = new THREE.Scene()


/* 这个demo的几何体核心部分 */
//BoxGeometry：长方体
// const geometry = new THREE.BoxGeometry(100, 100, 100)
// SphereGeometry：球体
// const geometry = new THREE.SphereGeometry(50);
// CylinderGeometry：圆柱
const geometry = new THREE.CylinderGeometry(50, 50, 100);
// PlaneGeometry：矩形平面
// const geometry = new THREE.PlaneGeometry(100, 50);
// CircleGeometry：圆形平面
// const geometry = new THREE.CircleGeometry(50);
/* 这个demo的几何体核心部分结束部分 */


// 2.创建材质
const material = new THREE.MeshBasicMaterial({
    color: 'blue',
    // wireframe: true,
    // 对于矩形平面PlaneGeometry、圆形平面如果你想看到两面，可以设置side: THREE.DoubleSide
    side: THREE.FrontSide, //默认只有正面可见
    // side: THREE.DoubleSide, //两面可见
})
const mesh = new THREE.Mesh(geometry, material)
// 3.创建网格
scene.add(mesh)
// 4.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置 - 增加y轴高度（上下方向）
camera.position.set(0, 100, 200) // x, y, z坐标
scene.add(camera)
// 5.创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
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