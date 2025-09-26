import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const gui = new GUI();
const obj = {
    x: 30,
    scale: 0,
    bool: false,
};
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
// 参数3、参数4数据类型：数字(拖动条)
gui.add(obj, 'x', 0, 180).onChange(function (value) {
    mesh.position.x = value;
});

// 参数3数据类型：数组(下拉菜单)
gui.add(obj, 'scale', [-100, 0, 100]).name('y坐标').onChange(function (value) {
    mesh.position.y = value;
});

// 参数3数据类型：对象(下拉菜单)
gui.add(obj, 'scale', {
    left: -100,
    center: 0,
    right: 100
    // 左: -100,//可以用中文
    // 中: 0,
    // 右: 100
}).name('位置选择').onChange(function (value) {
    mesh.position.x = value;
});

// 改变的obj属性数据类型是布尔值，交互界面是单选框
gui.add(obj, 'bool').name('是否旋转');
gui.add(obj, 'bool').onChange(function (value) {
    // 点击单选框，控制台打印obj.bool变化
    console.log('obj.bool', value);
});

gui.add(obj, 'bool').name('旋转动画');
// 渲染循环
function render() {
    // 当gui界面设置obj.bool为true,mesh执行旋转动画
    if (obj.bool) mesh.rotateY(0.01);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();