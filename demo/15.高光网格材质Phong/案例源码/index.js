import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1.创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333); // 设置深色背景，更容易看清材质差异

// 创建几何体 - 使用球体更容易观察材质效果
const geometry = new THREE.SphereGeometry(50, 32, 32);

// 2.创建三种不同的材质

// 基础网格材质 MeshBasicMaterial - 不受光照影响
const basicMaterial = new THREE.MeshBasicMaterial({
    color: 0x4287f5, // 蓝色
    side: THREE.FrontSide,
});

// 漫反射网格材质 MeshLambertMaterial - 只反应漫反射，没有镜面高光
const lambertMaterial = new THREE.MeshLambertMaterial({
    color: 0xf54242, // 红色
    side: THREE.FrontSide,
    emissive: 0x000000, // 自发光颜色
});

// 高光网格材质 MeshPhongMaterial - 有镜面高光效果
const phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x42f54e, // 绿色
    side: THREE.FrontSide,
    shininess: 100, // 高光亮度，默认30
    specular: 0xffffff, // 高光颜色
});

// 3.创建三个网格并排放置
const meshBasic = new THREE.Mesh(geometry, basicMaterial);
meshBasic.position.x = -120; // 左侧
scene.add(meshBasic);

const meshLambert = new THREE.Mesh(geometry, lambertMaterial);
meshLambert.position.x = 0; // 中间
scene.add(meshLambert);

const meshPhong = new THREE.Mesh(geometry, phongMaterial);
meshPhong.position.x = 120; // 右侧
scene.add(meshPhong);

// 添加文字标签
const createLabel = (text, position) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.font = '24px Arial';
    context.fillText(text, 10, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.position.y -= 80;
    sprite.scale.set(50, 25, 1);
    scene.add(sprite);
};

createLabel('Basic', meshBasic.position);
createLabel('Lambert', meshLambert.position);
createLabel('Phong', meshPhong.position);

// 灯光设置 - 使用多种光源以突显材质差异
// 环境光 - 提供基础照明
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// 平行光 - 模拟太阳光，产生方向性阴影
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// 点光源 - 从一个点向各个方向发射的光源，产生明显的高光
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 150, 100);
scene.add(pointLight);

// 添加光源可视化球体
const lightSphereGeometry = new THREE.SphereGeometry(5, 16, 16);
const lightSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const lightSphere = new THREE.Mesh(lightSphereGeometry, lightSphereMaterial);
lightSphere.position.copy(pointLight.position);
scene.add(lightSphere);

// 添加帮助网格显示坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);

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
    // 添加旋转动画，更好地观察材质在不同角度下的表现
    meshBasic.rotation.y += 0.01;
    meshLambert.rotation.y += 0.01;
    meshPhong.rotation.y += 0.01;

    // 移动点光源，产生动态光照效果
    const time = Date.now() * 0.001;
    pointLight.position.x = Math.sin(time) * 100;
    pointLight.position.z = Math.cos(time) * 100;

    // 更新光源可视化球体位置
    lightSphere.position.copy(pointLight.position);

    renderer.render(scene, camera)
    requestAnimationFrame(render)
}
render()