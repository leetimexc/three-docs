import * as THREE from 'three'

// 1. 创建场景
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100, 60, 20)
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,  //设置材质颜色
    transparent: true, //开启透明
    opacity: 0.5,//设置透明度
})
const mesh = new THREE.Mesh(geometry, material)
// 设置模型mesh的xyz坐标
mesh.position.set(0, 0, 0);
scene.add(mesh)

// 2. 创建相机
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
scene.add(camera)

// 辅助观察坐标系
const axesHelper = new THREE.AxesHelper(120)
scene.add(axesHelper)

// 3. 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)