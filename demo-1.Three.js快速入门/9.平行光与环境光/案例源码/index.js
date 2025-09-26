import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1.环境
const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,  //设置材质颜色
    transparent: true, //开启透明
    opacity: 0.5,//设置透明度
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 2.相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
camera.position.set(200, 200, 200)
camera.lookAt(0, 0, 0)
scene.add(camera)

// 光源辅助观察
const pointLight = new THREE.PointLight(0xff0000, 1.0);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
pointLight.position.set(100, 60, 50);
// 改变点光源位置，使用OrbitControls辅助观察
// pointLight.position.set(-400, -200, -300);
scene.add(pointLightHelper);

//环境光:没有特定方向，整体改变场景的光照明暗
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(80, 100, 50);
// 方向光指向对象网格模型mesh，可以不设置，默认的位置是0,0,0
directionalLight.target = mesh;
scene.add(directionalLight);

// DirectionalLightHelper：可视化平行光
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000);
scene.add(dirLightHelper);

directionalLight.position.set(100, 0, 0);
directionalLight.position.set(0, 100, 0);
directionalLight.position.set(100, 100, 100);
directionalLight.position.set(100, 60, 50);

// 3.渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

// 4.添加相机控件
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件