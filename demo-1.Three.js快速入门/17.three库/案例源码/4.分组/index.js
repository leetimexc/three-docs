import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const gui = new GUI(); //创建GUI对象 
// gui.close();//关闭菜单

//创建一个对象，对象属性的值可以被GUI库创建的交互界面改变
const obj = {
    color: 0x00ffff,// 材质颜色
    specular: 0x111111,// 材质高光颜色
};

const material = new THREE.MeshPhongMaterial({
    color: obj.color,
    specular: obj.specular,
});
// 材质颜色color
gui.addColor(obj, 'color').onChange(function (value) {
    material.color.set(value);
});
// 材质高光颜色specular
gui.addColor(obj, 'specular').onChange(function (value) {
    material.specular.set(value);
});

const directionalLight = new THREE.DirectionalLight(0xffffff);
const ambient = new THREE.AmbientLight(0xffffff);
// 环境光强度
gui.add(ambient, 'intensity', 0, 2);
// 平行光强度
gui.add(directionalLight, 'intensity', 0, 2);
// 平行光位置
gui.add(directionalLight.position, 'x', -400, 400);
gui.add(directionalLight.position, 'y', -400, 400);
gui.add(directionalLight.position, 'z', -400, 400);

// 创建材质子菜单
const matFolder = gui.addFolder('材质');
matFolder.close();
// 材质颜色color
matFolder.addColor(obj, 'color').onChange(function (value) {
    material.color.set(value);
});
// 材质高光颜色specular
matFolder.addColor(obj, 'specular').onChange(function (value) {
    material.specular.set(value);
})

// 环境光子菜单
const ambientFolder = gui.addFolder('环境光');
// 环境光强度
ambientFolder.add(ambient, 'intensity', 0, 2);

// 平行光子菜单
const dirFolder = gui.addFolder('平行光');
// 平行光强度
dirFolder.add(directionalLight, 'intensity', 0, 2);
// 平行光位置
dirFolder.add(directionalLight.position, 'x', -400, 400);
dirFolder.add(directionalLight.position, 'y', -400, 400);
dirFolder.add(directionalLight.position, 'z', -400, 400);



// 平行光子菜单
const dirFolder1 = gui.addFolder('平行光');
dirFolder1.close();//关闭菜单
// 平行光强度
dirFolder1.add(directionalLight, 'intensity', 0, 2);
const dirFolder2 = dirFolder1.addFolder('位置');//子菜单的子菜单
dirFolder2.close();//关闭菜单
// 平行光位置
dirFolder2.add(directionalLight.position, 'x', -400, 400);
dirFolder2.add(directionalLight.position, 'y', -400, 400);
dirFolder2.add(directionalLight.position, 'z', -400, 400);