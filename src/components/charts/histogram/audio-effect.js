export default function audioEffect (canvas, analyser) {

  var rectWidth = 5, rectHeight = 4,  gap = 2; // 矩形块长、宽、间距

  var capStyle = '#fff';
  var cwidth = canvas.width;
  var cheight = canvas.height - gap;

  var meterNum = Math.floor(cwidth / (rectWidth + gap)); // 频谱条数量
  var meterLen = Math.floor(cheight / (rectHeight + gap)); // 每条包含方块的数量

  const alphaArray = [0.8, 0.6, 0.3, 0.2] // 色块alpha
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2276fe';

  function getGlobalAlpha (y, value, c, r) {
    var _alphaIndex = 0;
    // 能量覆盖范围
    if (y > (cheight - value)) {
      if (value > (cheight / 2)) {
        _alphaIndex = 0
      }
      else if (value > (cheight / 3)) {
        _alphaIndex = 1
      } else {
        _alphaIndex = 2
      }
    }
    else {
      _alphaIndex = 3;
    }

    // 最底层一行，始终最亮
    if (r === meterLen - 1) {
      return alphaArray[0]
    }

    return alphaArray[_alphaIndex]
  }
  var drawMeter = function () {
    var array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    var step = Math.round(array.length / meterNum * 0.2); // 计算采样步长
    ctx.clearRect(0, 0, cwidth, cheight);
    // 列扫描
    for (var c = 0; c < meterNum; c++) {
      var value = array[c * step] / 5; //获取当前能量值
      //开始绘制频谱条
      for (var r = 0; r < meterLen; r++) {
        var x = c * (rectWidth + gap)
        var y = r * (rectHeight + gap)
        ctx.globalAlpha = getGlobalAlpha(y, value, c, r)
        ctx.fillRect(x, y, rectWidth, rectHeight);
      }

      // 单个条
      // var x = c * (rectWidth + gap)
      // var y = cheight - value
      // ctx.fillRect(x, y, rectWidth, value);
    }
    requestAnimationFrame(drawMeter);
  }
  drawMeter()
  // requestAnimationFrame(drawMeter);
}
