import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 颜色命名
// .name()方法
const gui = new GUI();//创建GUI对象 
const ambient = new THREE.AmbientLight(0xffffff);
const directionalLight = new THREE.DirectionalLight(0xffffff);
gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度');
gui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度');
// 步长.step()方法
gui.add(ambient, 'intensity', 0, 2.0).name('环境光强度步长').step(0.1);
// .onChange()方法
const obj = {
    x: 30,
};
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
// 当obj的x属性变化的时候，就把此时obj.x的值value赋值给mesh的x坐标
gui.add(obj, 'x', 0, 180).onChange(function (value) {
    mesh.position.x = value;
    console.log(value)
    // 你可以写任何你想跟着obj.x同步变化的代码
    // 比如mesh.position.y = value;
});
// .addColor()颜色值改变
const objColor = {
    color: 0x00ffff,
};
// .addColor()生成颜色值改变的交互界面
gui.addColor(objColor, 'color').onChange(function (value) {
    mesh.material.color.set(value);
    console.log('color', value)
});