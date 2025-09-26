import * as THREE from 'three'

// 1. 创建场景
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100,100,100); // 长方体几何模型
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000 //红色材质
})

// 创建网络模型
const mesh = new THREE.Mesh(geometry,material)
mesh.position.set(0,10,0);
scene.add(mesh)

// 定义相机输出画布的尺寸 （单位：像素px)
const width = 800 // 画布宽度
const height = 500 // 画布高度

// 设置相机的四个参数
// 创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera(30,width/height,0.1,3000)
// 设置相机的位置
camera.position.set(200,200,200)

// 设置相机的观察目标
camera.lookAt(0,0,0) // 坐标原点
// camera.lookAt(mesh.position) // 指向网格模型

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width,height)
renderer.render(scene,camera)
document.body.appendChild(renderer.domElement)
