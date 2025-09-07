import * as THREE from 'three'

// 1. 创建场景
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000 //红色材质
})

// 创建网络模型
const mesh = new THREE.Mesh(geometry,material)
mesh.position.set(0,10,0);
scene.add(mesh)

// 创建一个透视投影相机对象
const camera = new THREE.PerspectiveCamera()
// 设置相机的位置
camera.position.set(200,200,200)

// 设置相机的观察目标
camera.lookAt(0,0,0) // 坐标原点
