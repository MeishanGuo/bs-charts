

import ThreeDScene from './index.js'

/**
* 扩展shapes,来创建几何图形
*/

let AudioVis = new ThreeDScene()

AudioVis.cubes = {};
AudioVis.shapes = function () {};

AudioVis.shapes = function() {
    this.shapeList.forEach((circle, i) => {
      let count = circle.count
      var delte = 2 * Math.PI / count
      for (var j = 0; j < count; j++) {
        var shape = this.shape(circle)
        shape.position.x = circle.radius * Math.cos(delte * j)
        shape.position.y = circle.radius * Math.sin(delte * j)
        shape.rotation.z = delte * j
        this.scene.add(shape);
        this.cubes['cube_' + i + '_' + j] = shape
      }
    })
};

/**
* 图形基类
*/
AudioVis.shape = function (config) {
  var geometry = new THREE.PlaneGeometry(config.width, config.height, 1, 1);
  var material = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: config.opacity !== undefined ? config.opacity : 1
  });
  return new THREE.Mesh(geometry, material);
}

/**
* 扩展渲染函数，实现动效
*/
AudioVis.render = function() {
    // Apply spectrum.
  var total = this._getShapeTotal()
  this.shapeList.forEach((circle, i) => {
    let count = circle.count
    var delte = 2 * Math.PI / count
    for (var j = 0; j < count; j++) {
      var range = this.equalizer.getSpectrumByPercentage(j / total) * circle.range || 1
      var shape = this.cubes['cube_' + i + '_' + j]
      shape.scale.x = range
      shape.position.x = (circle.radius + circle.width * shape.scale.x / 2) * Math.cos(delte * j)
      shape.position.y = (circle.radius + circle.width * shape.scale.x / 2) * Math.sin(delte * j)
    }
  })
 
  // Render scene.
  this.renderer.render(this.scene, this.camera);
  // Request new frame.
  requestAnimationFrame(this.render.bind(this));
}

/**
* 获得节点总数量
*/
AudioVis._getShapeTotal = function () {
  var _total = 0
  this.shapeList.forEach(circle => {
    _total += circle.count
  })
  return _total
}
/**
* 音响效果配置
*/
function getAudioAniConfig () {
  return {
    width: 239,
    height: 239,
    shapeList: [
      {
        count: 100,
        radius: 110,
        range: 0.02,
        type: 'plane',
        color: '#fff',
        opacity: 0.3,
        width: 2,
        height: 2
      },
      {
        count: 100,
        radius: 105,
        range: 0.01,
        type: 'plane',
        color: '#fff',
        opacity: 0.3,
        width: 1,
        height: 1
      },
      {
        count: 100,
        radius: 102,
        range: 0.02,
        type: 'plane',
        color: '#fff',
        opacity: 0.3,
        width: 1,
        height: 1
      },
      {
        count: 100,
        radius: 98,
        range: 0.01,
        type: 'plane',
        color: '#fff',
        opacity: 0.3,
        width: 1.4,
        height: 1.4
      }
    ]
  }
}

export default function createAudioForPie (config) {
  var _container = config.container || document.body
  var _audioUrl = config.audioUrl


  var audioAniConfig = getAudioAniConfig()

  AudioVis.shapeList = audioAniConfig.shapeList || []
  AudioVis.init(_container, audioAniConfig)
  AudioVis.equalizer.play(_audioUrl, function () {})
}


