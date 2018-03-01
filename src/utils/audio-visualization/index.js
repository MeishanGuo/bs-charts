

//backup -------------------

/**
* 音频可视化基类，要想实现动效，需要扩展该类的shapes方法
*/
import Equalizer from './equalizer.js'

/**
 * 3D scene.
 */
var ThreeDScene = new Function();
/**
 * Private attributes.
 */
ThreeDScene.prototype.scene = {};
ThreeDScene.prototype.camera = {};
ThreeDScene.prototype.renderer = {};
/**
 * Init scene and start animation.
 */
ThreeDScene.prototype.init = function init(container, config) {

    this.width = config.width ||  container.offsetWidth || document.clientWidth
    this.height = config.height ||  container.offsetHeight || document.clientHeight
    this.container = container || document.body

    this.scene = new THREE.Scene();
    this.camera();
    this.renderer();
    this.shapes();
    this.equalizer();
    this.render(container);
};
/**
 * Init camera.
 */
ThreeDScene.prototype.camera = function() {
    this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 10000);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 300;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.scene.position);
};
/**
 * Renderer.
 */
ThreeDScene.prototype.renderer = function() {
    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);
};

/**
* Equalizer
*/
ThreeDScene.prototype.equalizer = function() {
    this.equalizer = new Equalizer();
}

export default ThreeDScene