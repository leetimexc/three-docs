import * as THREE from 'three'
// 1.创建场景
const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(100, 60, 20)
const material = new THREE.MeshLambertMaterial()
const mesh = new THREE.Mesh(geometry, material)
// 设置模型mesh的xyz坐标
mesh.position.set(0, 0, 0);
scene.add(mesh)

//点光源：两个参数分别表示光源颜色和光照强度
// 参数1：0xffffff是纯白光,表示光源颜色
// 参数2：1.0,表示光照强度，可以根据需要调整
const pointLight = new THREE.PointLight(0xffffff, 1.0)
pointLight.intensity = 1.0;//光照强度
pointLight.decay = 0.0;//设置光源不随距离衰减
// 你可以对比不同光照强度明暗差异(传播同样距离)
// pointLight.intensity = 10000.0;//光照强度
// pointLight.intensity = 50000.0;//光照强度
pointLight.position.set(400, 200, 300);
scene.add(pointLight)

// 2.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
scene.add(camera)

// 3.创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)
