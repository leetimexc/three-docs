import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

// 创建一个GUI控制面板，用于演示不同渲染器设置的效果
const gui = new GUI()

// 1.创建场景
const scene = new THREE.Scene()

// 2.创建几何体和材质
const geometry = new THREE.TorusKnotGeometry(50, 18, 128, 16) // 使用复杂几何体更容易看出锯齿效果
const material = new THREE.MeshPhongMaterial({
    color: 0x1565c0,
    shininess: 100,
    specular: 0xffffff,
})

// 3.创建网格
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 4.添加光源
// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

// 点光源
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.set(0, 100, 50)
scene.add(pointLight)

// 5.创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 50, 150)
scene.add(camera)

// 6.创建渲染器
// 初始不开启抗锯齿
let renderer = new THREE.WebGLRenderer({
    antialias: false, // 默认关闭抗锯齿
})
renderer.setSize(window.innerWidth, window.innerHeight)

// 设置背景颜色
renderer.setClearColor(0x444444, 1)

// 添加到DOM
document.body.appendChild(renderer.domElement)

// 7.添加相机控件
let controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', function () {
    renderer.render(scene, camera) // 执行渲染操作
}) // 监听鼠标、键盘事件

// 8.创建GUI控制面板
const rendererSettings = {
    antialias: false,
    useDevicePixelRatio: false,
    rotationSpeed: 0.01
}

// 添加GUI控制
gui.add(rendererSettings, 'antialias').name('启用抗锯齿').onChange(value => {
    // 由于无法直接修改renderer的antialias属性，需要重新创建渲染器
    document.body.removeChild(renderer.domElement)

    renderer = new THREE.WebGLRenderer({
        antialias: value
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x444444, 1)

    if (rendererSettings.useDevicePixelRatio) {
        renderer.setPixelRatio(window.devicePixelRatio)
    } else {
        renderer.setPixelRatio(1)
    }

    document.body.appendChild(renderer.domElement)

    // 重新绑定控制器
    controls.dispose()
    controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', function () {
        renderer.render(scene, camera)
    })
})

gui.add(rendererSettings, 'useDevicePixelRatio').name('使用设备像素比').onChange(value => {
    if (value) {
        // 获取屏幕对应的设备像素比，解决渲染模糊问题
        renderer.setPixelRatio(window.devicePixelRatio)
        console.log('当前设备像素比:', window.devicePixelRatio)
    } else {
        renderer.setPixelRatio(1)
    }
})

gui.add(rendererSettings, 'rotationSpeed', 0, 0.05).name('旋转速度')

// 添加设备像素比显示
const pixelRatioFolder = gui.addFolder('设备信息')
pixelRatioFolder.add({ 'devicePixelRatio': window.devicePixelRatio }, 'devicePixelRatio').name('设备像素比').disable()

// 9.添加窗口大小变化监听
window.addEventListener('resize', () => {
    // 更新相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    // 更新渲染器尺寸
    renderer.setSize(window.innerWidth, window.innerHeight)
})

// 10.添加渲染循环
function render() {
    // 旋转物体以便更好地观察锯齿效果
    mesh.rotation.x += rendererSettings.rotationSpeed
    mesh.rotation.y += rendererSettings.rotationSpeed

    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()