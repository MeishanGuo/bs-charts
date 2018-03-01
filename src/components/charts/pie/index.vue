<template>
  <div class="pie-wrap">
    <div class="pie-bg" ref='pieBg'>
      <div class="percentage-box">
        <!-- <span class="num">{{percentage + '%'}}</span> -->
        <span class="num">
          <bs-numbers :count='percentage' suffix="%" decimal='2'></bs-numbers>
        </span>
        <span class="text">成功率</span>
      </div>
    </div>
    <audio :src='bgAudioUrl' ref="audio" style="display:none;"></audio>
  </div>
</template>
<script>
  const CIRCLED = 'M357.25,112.5 C357.25,54.7834255 313.669868,6.54865321 256.732216,0.405877409 C313.362985,7.01844619 356.75,55.039476 356.75,112.5 C356.75,174.493963 306.493963,224.75 244.5,224.75 C306.770106,225.25 357.25,174.770106 357.25,112.5 Z M131.75,112.5 C131.75,150.097454 150.289401,184.565131 180.693658,205.471442 C180.807429,205.549672 180.963076,205.52086 181.041306,205.40709 C150.706953,184.245447 132.25,149.931055 132.25,112.5 C132.25,59.9803365 168.610337,14.8142418 219.101822,3.13540729 C168.272128,14.3792697 131.75,59.7463373 131.75,112.5 Z'
  const LEFTETPOINTS = '0 113.574771 11.1631326 113.574771 14.4559708 102.479193 18.2196555 157 18.9201011 113.50035 33.1041067 113.50035 38.7343194 68 38.2695076 124.312092 42.3963265 113.076326 50.7410359 113.076326 55.0543793 103.13167 55.914604 118.9642 58.7841715 112.041362 64.7795781 112.041362 67.8221793 141.967058 70.9951657 87.5068256 75.6770049 113.28055 82.0002413 113.574771 86.0970756 125.180908 88.2726249 96.622472 91.1140289 113.413815 108 113.574771'
  const RIGHTETPOINTS = '380 113.574771 390.879957 113.574771 394.089265 102.479193 397.757476 157 398.440154 113.50035 412.264353 113.50035 417.751744 68 417.298723 124.312092 421.320856 113.076326 429.453885 113.076326 433.657812 103.13167 434.496215 118.9642 437.29299 112.041362 443.136311 112.041362 446.10173 141.967058 449.194227 87.5068256 453.757302 113.28055 459.920136 113.574771 463.913046 125.180908 466.033408 96.622472 468.802734 113.413815 488 113.28055'
  const DASHARRAY1 = [5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,265,5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
  const DASHARRAY2 = [3,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,266,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1]

  import { createCircleByPath } from  '@utils/element-create'
  import { getRandomKey } from '@utils'
  import createAudioForPie from '@utils/audio-visualization/audio-for-pie.js'
  import staticPath from '@utils/static-path'

  export default {
    name: 'bs-chart-pie',
    props: {
      percentage: {
        type: [Number, String],
        default: '100%'
      },
      bgAudioUrl: {
        type: String,
        default: staticPath.audioPath
      }
    },
    data () {
      return {
        width: 490,
        height: 225
      }
    },
    watch: {
      percentage () {
        this.updatePercentage()
      }
    },
    mounted () {
      this.createSvgMode()
      this.createAudioVisiable()
    },
    methods: {
      /**
      * 初始化音频可视化模块
      */
      createAudioVisiable () {
        // 通过标签下载audio文件，避免js请求出现跨域问题
        var audioUrl = this.$refs.audio.src
        createAudioForPie({
          container: this.$refs.pieBg,
          audioUrl: audioUrl
        })
      },
      createSvg () {
        const width = this.width, height = this.height;
        const centerX = width/2, centerY = height/2
        var svg = this.$d3.select(this.$refs.pieBg).append('svg')
              .attr('preserveAspectRatio', 'xMidYMid slice')
              .attr('viewBox', '0 0 ' + width + ' ' + height)
              .style('width', '100%')
              .style('height', '100%')
        return svg
      },
      /**
      * 创建svg元素
      */
      createSvgMode () {
        var svg = this.createSvg()
        var center = this.getCenter()
        this.svg = svg; // 添加全局索引，用于更新失败率占比
        this.createCircle_1(svg, center)
        this.createCircle_2(svg, center)
        this.createCircle_3(svg, center)

        this.createCircle_4(svg, center)
        this.createCircle_5(svg, center)
        this.createCircle_6(svg, center)
        this.createCircle_7(svg, center)
        this.createCenterBg(svg, center)
        // 创建左右侧四个半圆弧
        this.createHalfCircles(svg, center)
        this.addLightToHalfCircle(svg, center)

        this.createEt(svg)
      },
      /**
      * 环1
      */
      createCircle_1 (container, center) {
        container.append('path')
          .attr('d', CIRCLED)
          .attr('fill', '#1A7CF9')
          .attr('fill-role', 'nonzero')
      },
      /**
      * 环2（成功的圆环）
      */
      createCircle_2 (container, center) {
        container.append('circle')
          .attr('stroke', '#23C4F6')
          .attr('stroke-width', 4)
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', 85)
          .attr('fill', 'none')
      },
      /**
      * 环3（失败的圆环）
      */
      createCircle_3 (container, center) {
        let circleR = 85
        let circleLength = 2 * Math.PI * circleR
        container.append('circle')
          .attr('class', 'faild-percentage-circle')
          .attr('stroke', '#E43804')
          .attr('stroke-width', 4)
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', 85)
          .attr('fill', 'none')
          .attr('stroke-dasharray', () => {
            let failPathLen = (100 - this.percentage) / 100 * circleLength
            let successPathLen = circleLength - failPathLen
            return failPathLen + ',' + successPathLen
          })
          .append('animateTransform')
          .attr('attributeName', "transform")
          .attr('attributeType', "XML")
          .attr('type', "rotate")
          .attr('from', "0 " + center.x + ' ' + center.y)
          .attr('to', "360 " + center.x + ' ' + center.y)
          .attr('dur', "2s")
          .attr('repeatCount', "indefinite")
      },
      /**
      * 环4
      */
      createCircle_4 (container, center) {
        var radius = 79
        var circleLength = 2 * Math.PI * radius
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', radius)
          .attr('stroke-dasharray', () => {
            return circleLength / 2 + ',' + circleLength / 2
          })
          .attr('fill', 'none')
          .attr('stroke-width', 4)
          .attr('stroke', '#1C3279')
          .append('animateTransform')
          .attr('attributeName', "transform")
          .attr('attributeType', "XML")
          .attr('type', "rotate")
          .attr('from', "0 " + center.x + ' ' + center.y)
          .attr('to', "360 " + center.x + ' ' + center.y)
          .attr('dur', "4s")
          .attr('repeatCount', "indefinite")
      },
      /**
      * 环5
      */
      createCircle_5 (container, center) {
        var radius = 74
        var circleLength = 2 * Math.PI * radius
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', radius)
          .attr('stroke-dasharray', () => {
            return circleLength / 2 + ',' + circleLength / 2
          })
          .attr('fill', 'none')
          .attr('stroke-width', 2)
          .attr('stroke', '#4932D8')
          .append('animateTransform')
          .attr('attributeName', "transform")
          .attr('attributeType', "XML")
          .attr('type', "rotate")
          .attr('from', "180 " + center.x + ' ' + center.y)
          .attr('to', "-180 " + center.x + ' ' + center.y)
          .attr('dur', "4s")
          .attr('repeatCount', "indefinite")
      },
      /**
      * 环6
      */
      createCircle_6 (container, center) {
        var radius = 70
        var circleLength = 2 * Math.PI * radius
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', radius)
          .attr('stroke-dasharray', () => {
            return circleLength / 5 * 3 + ',' + circleLength / 5 * 2
          })
          .attr('fill', 'none')
          .attr('stroke-width', 1)
          .attr('stroke', '#4932D8')
          .append('animateTransform')
          .attr('attributeName', "transform")
          .attr('attributeType', "XML")
          .attr('type', "rotate")
          .attr('from', "-90 " + center.x + ' ' + center.y)
          .attr('to', "270 " + center.x + ' ' + center.y)
          .attr('dur', "4s")
          .attr('repeatCount', "indefinite")
      },
      /**
      * 环7 (中心放大的圆环)
      */
      createCircle_7 (container, center) {
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('class', 'scale-circle')
          .attr('r', 108)
          .attr('fill', 'none')
          .attr('stroke-width', 1)
          .attr('stroke', '#4a33d7')
      },
      /**
      * 创建心率
      */
      createEt (container) {
          this.createEtLeft(container)
          this.createEtRight(container)
      },
      /**
      * 创建左侧心率
      */
      createEtLeft (container) {
        var defs = container.append('defs')
        // 创建渐变
        const gradientId = 'leftETgradient-' + getRandomKey(4)
        let leftGradient = defs.append('linearGradient')
          .attr('id', gradientId)
        leftGradient.append('stop').attr('stop-color', '#1A7CF9').attr('offset', '0%')
        leftGradient.append('stop').attr('stop-color', '#4932D8').attr('offset', '100%')

        // 创建真实路径
        var leftElectrocardiogram_g = container.append('g')
        leftElectrocardiogram_g.append('polyline')
          .attr('points', LEFTETPOINTS)
          .attr('fill', 'none')
          .attr('stroke', '#2d3987')
          .attr('stroke-width', 1)
        // 动效路径
        leftElectrocardiogram_g.append('polyline')
          .attr('points', LEFTETPOINTS)
          .attr('fill', 'none')
          .attr('stroke', 'url(#' + gradientId + ')')
          .attr('stroke-width', 1)
          .attr('class', 'left-et-animation')
      },
      createEtRight (container) {
        var defs = container.append('defs')
        // 右侧的心率图
        const rightETgradient = 'rightETgradient'
        let rightGradient = defs.append('linearGradient')
          .attr('id', rightETgradient)
        rightGradient.append('stop').attr('stop-color', '#01C3FF').attr('offset', '0%')
        rightGradient.append('stop').attr('stop-color', '#00FFF6').attr('offset', '100%')
        var rightElectrocardiogram_g = container.append('g')
        rightElectrocardiogram_g.append('polyline')
          .attr('points', RIGHTETPOINTS)
          .attr('fill', 'none')
          .attr('stroke', '#008fa2')
          .attr('stroke-width', 1)

        rightElectrocardiogram_g.append('polyline')
          .attr('points', RIGHTETPOINTS)
          .attr('fill', 'none')
          .attr('stroke', 'url(#' + rightETgradient + ')')
          .attr('stroke-width', 1)
          .attr('class', 'right-et-animation')
      },
      /**
      * 中间的渐变阴影
      */
      createCenterBg (container, center) {
        var defs = container.append('defs')
        // 创建渐变
        var gradientId = 'gradient-' + Math.random().toString(36).substr(2, 6)
        var radialGradient = defs.append('radialGradient')
                                  .attr('cx', '50%')
                                  .attr('cy', '1.88337054%')
                                  .attr('fx', '50%')
                                  .attr('fy', '1.88337054%')
                                  .attr('r', '98.1166295%')
                                  .attr('id', gradientId)
        var gradientConfig = [
          {
            stopColor: "#1438A8",
            offset: "0%"
          },
          {
            stopColor: "#226BD9",
            offset: "47.438074%"
          },
          {
            stopColor: "#0D1145",
            offset: "82.4746356%"
          },
          {
            stopColor: "#0B0F3B",
            offset: "100%"
          }
        ]
        gradientConfig.forEach(stop => {
          radialGradient.append('stop')
            .attr('stop-color', stop.stopColor)
            .attr('offset', stop.offset)
        })
        // 创建高斯模糊
        var filterId = 'filter-' + Math.random().toString(36).substr(2, 6)
        var filter = defs.append('fill')
            .attr('x', "-1.7%")
            .attr('y', "-1.7%")
            .attr('width', "103.4%")
            .attr('height', "103.4%")
            .attr('filterUnits', "objectBoundingBox")
            .attr('id', filterId)

        filter.append('feGaussianBlur')
          .attr('stdDeviation', '1 0')
          .attr('in', 'SourceGraphic')
        // 创建图形
        var group = container.append('g')
          .attr('transform', 'translate(-208, -86)')
          .attr('stroke', 'none')
          .attr('fill', 'node')
        container.append('circle')
          .attr('fill', 'url(#' + gradientId + ')')
          .attr('filter', 'url(#' + filterId + ')')
          .attr('opacity', 0.5)
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', 70)
      },
      /**
      * 左右两侧的半圆
      */
      createHalfCircles (container, center) {
        // 内侧虚线圆弧
        const lRhinR = 130
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', lRhinR)
          .attr('fill', 'none')
          .attr('stroke-width',1)
          .attr('stroke', '#1a7cf9')
          .attr('stroke-dasharray', DASHARRAY2)

        const lCrudeR = 136
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', lCrudeR)
          .attr('fill', 'none')
          .attr('stroke-width',2)
          .attr('stroke', '#1A7CF9')
          .attr('stroke-dasharray', DASHARRAY1)
          // 添加扫光动效
      },
      addLightToHalfCircle (container, center) {
        const lCrudeR = 136
        // 外侧光照圆弧
        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', lCrudeR)
          .attr('fill', 'none')
          .attr('stroke-width',2)
          .attr('stroke', '#fff')
          .attr('stroke-dasharray', DASHARRAY1)
          .attr('mask', 'url(#mask-id-1)')

        container.append('circle')
          .attr('cx', center.x)
          .attr('cy', center.y)
          .attr('r', lCrudeR)
          .attr('fill', 'none')
          .attr('stroke-width',2)
          .attr('stroke', '#fff')
          .attr('stroke-dasharray', DASHARRAY1)
          .attr('mask', 'url(#mask-id-2)')

        // 左侧蒙版移动的路径
        var referencePath_left = 'path_left_' + Math.random().toString(36).substr(2, 6)
        var leftOptions = {
            id: referencePath_left,
            centerX: center.x,
            centerY: center.y,
            radius: lCrudeR,
            startAngle: 270,
            endAngle: 90,
            stroke: 'none',
            sweepFlag: 1 // 0-顺时针,1-逆时针
        }
        createCircleByPath(container, leftOptions)
        
        // 右侧侧蒙版移动的路径
        var referencePath_right = 'path_right_' + Math.random().toString(36).substr(2, 6)
        var leftOptions = {
            id: referencePath_right,
            centerX: center.x,
            centerY: center.y,
            radius: lCrudeR,
            startAngle: 90,
            endAngle: 270,
            stroke: 'none',
            sweepFlag: 1 // 0-顺时针,1-逆时针
        }
        createCircleByPath(container, leftOptions)

        // 创建通用渐变
        var defs = container.append('defs')
        var gradientId = 'radialGradient_' + getRandomKey(4)
        var radialGradient = defs.append('radialGradient')
        radialGradient
          .attr('cx', '50%')
          .attr('cy', '50%')
          .attr('r', "50%")
          .attr('fx', "50%")
          .attr('fy', "50%")
          .attr('id', gradientId)

        radialGradient.append('stop')
          .attr('offset', "0%")
          .attr('stop-color', '#ffffff')
          .attr('stop-opacity', '1')
        radialGradient.append('stop')
          .attr('offset', "100%")
          .attr('stop-color', '#ffffff')
          .attr('stop-opacity', '0')

        // 左侧蒙版
        var mask = defs.append('mask')
          .attr('id', 'mask-id-1')
        mask.append('circle')
          .attr('cx',"0")
          .attr('cy',"0")
          .attr('r',"80")
          .attr('fill', 'url(#' + gradientId + ')')
          .append('animateMotion')
          .attr('dur', '2s') 
          .attr('rotate', 'auto')
          .attr('repeatCount', 'indefinite')
          .append('mpath')
          .attr('xlink:href', '#' + referencePath_left)

        // 右侧蒙版
        var mask = defs.append('mask')
          .attr('id', 'mask-id-2')
        mask.append('circle')
          .attr('cx',"0")
          .attr('cy',"0")
          .attr('r',"80")
          .attr('fill', 'url(#' + gradientId + ')')
          .append('animateMotion')
          .attr('dur', '2s') 
          .attr('rotate', 'auto')
          .attr('repeatCount', 'indefinite')
          .append('mpath')
          .attr('xlink:href', '#' + referencePath_right)
      },
      /**
      * 获得容器中心位置
      */
      getCenter () {
        return {
          x: this.width / 2,
          y: this.height / 2
        }
      },
      /**
      * 更新失败率占比
      */
      updatePercentage () {
        var faildCircle = this.$el.querySelector('.faild-percentage-circle')
        if (faildCircle) {
          faildCircle.remove()
        }
        this.createCircle_4(this.svg, this.getCenter())
      } 
    }
  }
</script>

<style scope>
  .pie-wrap {
    width: 100%;
    height: 100%;
  }
  .pie-bg {
    width: 100%;
    height: 100%;
    position: relative;
    transform: scale(0.9);
  }
  .pie-wrap canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -1px;
    left: 50%;
    z-index: -1;
    transform: translateX(-50%);
  }
  .percentage-box {
    width: 176px;
    text-align:center;
    position: absolute;
    top: 92px;
    left: 50%;
    margin-left: -88px;
  }
  .percentage-box span {
    display: block;
  }
  .percentage-box span.num {
    font-size: 35px;
  }
  .percentage-box span.num .span-text {
    color: #00ffff;
  }
  .percentage-box span.text {
    font-size: 16px;
    color: #23C4F6;
    line-height:24px;
    margin-top: 10px;
  }

  circle.scale-circle {
    transform-origin: center;
    animation: centerScaleAni 10s infinite;
  }

  @keyframes centerScaleAni {
    from {
      transform: scale(0);
    }
    30% {
      transform: scale(1);
    }
    to {
      transform: scale(1);
    }
  }

  /** 左侧 心率 动效 clip-path **/
  .left-et-animation {
    animation: etLeftAnimation 4s ease 0s infinite;
  }

  .right-et-animation {
    animation: etLeftAnimation 4s ease 1s infinite;
  }

  @keyframes etLeftAnimation {
    from {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
    }
    40% {
      clip-path: polygon(100% 0%, 110% 0%, 110% 100%, 100% 100%)
    }
    41% {
      clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)
    }
    50% {
      clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)
    }
    to{
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)
    }
  }

</style>