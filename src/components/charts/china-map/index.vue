<template>
  <div class='geo-wrap'>
    <img src="//eagleeye.italent.cn/Images/south-china-sea.svg" style="display:none;" ref='southChinaSea'>
  </div>
</template>

<script>
  const chinaGeoJson = require('@static/china-geo.json')
  import { getChinaMapStepInfo, getTextAttrs, getAllThemeColors } from '@utils/theme'

  export default {
    name: 'bs-chart-china-map',
    props: {
      citys: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        mapId: Math.random().toString(36).substr(2, 6), // 随机数
        allLevels: [],
        activePointsLevel: 0
      }
    },
    watch: {
      citys () {
        this.allLevels = this.getAllPotLevels()
        this.addData()
      }
    },
    mounted () {
      this.allLevels = this.getAllPotLevels()
      this.mapInit()
    },
    methods: {
      /**
      * 初始化地图
      */
      mapInit () {
        this.chinaGeoChart = this.createSvg()
        this.createChinaMap(this.chinaGeoChart)
        this.createDefs(this.chinaGeoChart)
        if (this.citys.length) {
          this.addData()
        }
      },
      addData () {
        var dataGroup = this.$el.querySelector('.hot-top-group')
        if (dataGroup) {
          dataGroup.remove()
        }
        this.createHotPots(this.chinaGeoChart)
      },
      /**
      * 创建图表容器（刷新时不再重新创建）
      */
      createSvg () {
        return this.$d3.select(this.$el).append('svg')
            .attr('id', 'china-geo-map')
            .attr('preserveAspectRatio', 'xMidYMid slice')
            .attr('viewBox', '0 0 430 326')
            .style('transform', 'rotateX(20deg) translateY(-15px) translateX(-20px)')
            .attr('width', 430)
            .attr('height', 326)
      },
      /**
      * 画地图（刷新时不再重新创建）
      */
      createChinaMap (container) {
        var proj = this.$d3.geoMercator().center([107, 34]).translate([235, 194]).scale(400)
        var path = this.$d3.geoPath().projection(proj)
        // 地图阴影
        container.append('g')
          .attr('transform', 'translate(1, 8)')
          .attr('class', 'china-geo-shadow')
          .selectAll('path')
          .data(chinaGeoJson.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('stroke-width', 0)
          .attr('fill', '#191958')
        // 真实地图
        container.append('g').attr('class', 'china-geo')
          .selectAll('path')
          .data(chinaGeoJson.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('stroke', '#134eff')
          .attr('stroke-width', '0.5px')
          .attr('fill', (d, i) => {
            return this.getFillColorByProvince(d, i)
          })
        // 南海
        var southseaUrl = this.$refs.southChinaSea.src
        container.append('image')
          .attr('xlink:href', southseaUrl)
          .attr('width', '25px')
          .attr('height', '34px')
          .attr('x', 380)
          .attr('y', 230)
      },
      createHotPots (container) {
        var proj = this.$d3.geoMercator().center([107, 34]).translate([235, 194]).scale(400)
        var group = container.append('g').attr('class', 'hot-top-group')

        // 将不同类型放在不同的分组，来控制各类型之间的层级
        var breathingLampGroup = group.append('g').attr('class', 'breathing-lamp') // 呼吸灯
        var hotPotGroup = group.append('g').attr('class', 'static-hot-pot') // 热点
        var popBallGroup = group.append('g').attr('class', 'pop-ball') // 气球

        this.citys.forEach((point) => {
          point.position = proj([point.log, point.lat]) // 将笛卡尔坐标赋值到热点中
          this.createHotPot(hotPotGroup, point)
          this.createBreathingLamp(breathingLampGroup, point)
          this.createPopBall(popBallGroup, point)
        })
        this.registerPopAnimation()
      },
      /**
      * 创建呼吸灯
      */
      createBreathingLamp (container, point) {
        const haloRadius = getChinaMapStepInfo(point.value).r / 2
        const color = getChinaMapStepInfo(point.value).color
        const Lightid = this.getCatStepIdByValue(color[0], 'light')
          // svg中不支持内阴影
          // 在svg中使用switch + foreignObject专属标签，来实现灯光动效
        for (var i = 0; i < 3; i++) {
          container
            .append('switch')
            .append('foreignObject')
            .attr('x', point.position[0] - haloRadius)
            .attr('y', point.position[1] - haloRadius)
            .style('width', haloRadius * 2 + 'px')
            .style('height', haloRadius * 2 + 'px')
            .attr('class', 'hot-pot scale-index-' + i)
            .style('box-shadow', '0 1px 20px 0 ' + color[0] + ' inset')
            .style('transform-origin', (point.position[0] ) + 'px ' +  (point.position[1]) + 'px')
        }
      },
      /**
      *  创建静态热点
      */
      createHotPot (container, point) {
        var r0 = getChinaMapStepInfo(point.value).r0 / 2
        container.append('circle')
          .attr('cx',point.position[0])
          .attr('cy',point.position[1])
          .attr('r', r0)
          .attr('fill', 'url(#' + this.getCatStepIdByValue(getChinaMapStepInfo(point.value).color[0], 'fixed-point') + ')')
      },
       /**
       * 创建弹出气球
       */
      createPopBall (container, point) {
        const pointInfo = getChinaMapStepInfo(point.value)
        const color = pointInfo.color[0]
        const balloonId = this.getCatStepIdByValue(color, 'balloon')
        var balloonGroup = container
                            .append('g')
                            .attr('transform', 'translate(' + point.position[0] + ', ' + point.position[1] + ')') // 这里做弹出动效
                            .append('g')
                            .attr('class', () => {
                              var cls = 'balloon-g balloon-scale-' + pointInfo.level
                              cls += (pointInfo.level == this.allLevels[this.activePointsLevel]) ? ' balloon-show' : '' // 默认第一级首次出现气泡
                              return cls
                            }) // 这里做弹出动效
        // 气球
        balloonGroup
          .append('path')
          .attr('d', () => {
            return 'M14,43 C14,31.4135519 18.0743336,28.256058 19.7898691,27.1576192 C24.7170894,24.0027734 28,19.3143472 28,13.7488772 C28,6.15558198 21.7319865,0 14,0 C6.2680135,0 0,6.15558198 0,13.7488772 C0,18.7870757 3.07440869,23.134543 6.8750288,26.473578 C8.85170263,28.2101849 13.2253483,31.4135519 14,43 Z'
          })
          .attr('transform', 'translate(-14, -43)')
          .attr('fill', 'url(#' + balloonId + ')')
        // 气球下的点坐标
        balloonGroup
          .append('ellipse')
          .attr('fill', '#FDAF92')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('rx', 2)
          .attr('ry', 1)
        // 气球上的文字
        const textAttrs = getTextAttrs(point.name)
        textAttrs.forEach((tAttr) => {
          balloonGroup
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dx', tAttr.dx)
            .attr('dy', tAttr.dy)
            .attr('textLength', tAttr.textLength)
            .style('font-size', tAttr.fontSize)
            .text(tAttr.name)
        })
      },
      /**
      * 渐变、滤镜、mark等所有的defs分组 （刷新时不再重新创建）
      */
      createDefs (container) {
        var defsGroup = container.append('g').attr('class', 'defs-group')
        /*
        * 根据value创建渐变背景
        **/
        var defs = defsGroup.append("defs")
        const allColors = getAllThemeColors()

        allColors.forEach((color, i) => {
          var potRadialGradient = defs.append('radialGradient')
            .attr('id', this.getCatStepIdByValue(color[0], 'fixed-point'))
            .attr('cx', '0.5')
            .attr('cy', '0.5')
            .attr('r', '0.4')
          potRadialGradient.append('stop')
            .attr('offset','0%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','1')
          potRadialGradient.append('stop')
            .attr('offset','40%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','0.8')
          potRadialGradient.append('stop')
            .attr('offset','100%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','0')

          // 创建荧光灯渐变
          const Lightid = this.getCatStepIdByValue(color[0], 'light')
          var lightRadialGradient = defs.append('radialGradient')
            .attr('id', Lightid)
            .attr('cx', '0.5')
            .attr('cy', '0.5')
            .attr('r', '0.4')
          lightRadialGradient.append('stop')
            .attr('offset','0%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','0')
          lightRadialGradient.append('stop')
            .attr('offset','20%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','0')
          lightRadialGradient.append('stop')
            .attr('offset','100%')
            .attr('stop-color', color[0])
            .attr('stop-opacity','1')

          // 创建气球渐变（线性渐变）

          const balloonId = this.getCatStepIdByValue(color[0], 'balloon')
          var balloonLinearGradient = defs.append('linearGradient')
            .attr('id', balloonId)
            .attr('x1', '0.5')
            .attr('y1', '0.0')
            .attr('x2', '0.5')
            .attr('y2', '1.0')
            .attr('r', '0.4')
          balloonLinearGradient.append('stop')
            .attr('offset','0%')
            .attr('stop-color', color[1])
          balloonLinearGradient.append('stop')
            .attr('offset','100%')
            .attr('stop-color', color[0])
        })
      },
      /**
      * 注册气球弹出动效
      */
      registerPopAnimation () {
        var slef = this
        this.resetActivePointsLevel()
        // 每次注册，将之前的循环销毁
        clearInterval(this.popLoop)
        this.popLoop = setInterval(() => {
          var currentPops = slef.$el.querySelectorAll('.balloon-show')
          if (currentPops) {
            for(var i = 0; i < currentPops.length; i++) {
              currentPops[i].classList.remove('balloon-show')
              currentPops[i].classList.add('balloon-hide')
            }
          }
          var nextActivePops = slef.$el.querySelectorAll('.balloon-scale-' + slef.allLevels[slef.activePointsLevel])
          for(var i = 0; i < nextActivePops.length; i++) {
            nextActivePops[i].classList.remove('balloon-hide')
            nextActivePops[i].classList.add('balloon-show')
          }
          slef.resetActivePointsLevel()
        }, 10 * 1000)
      },
      // 根据热点的热力值，获得/生成指定渐变、蒙版等的专有id。
      // 防止多地图出现id覆盖问题
      getCatStepIdByValue (color, type) {
        // chartId_cat_color
        return this.mapId + '_' + type + color.replace('#', '_')
      },
      getAllPotLevels () {
        const allLevels = this.$d3.set(this.citys.map((p) => {
          return getChinaMapStepInfo(p.value).level
        })).values()
        return allLevels || []
      },
      /**
      * 重置当前激活热点
      */
      resetActivePointsLevel () {
        const len = this.allLevels.length
        if (this.activePointsLevel < len-1) {
          this.activePointsLevel++
        } else {
          this.activePointsLevel = 0
        }
      },
      /**
      * 根据不同的省份，显示不同的填充色
      */
      getFillColorByProvince(province, i) {
        var fill = ['#1e307a', '#233687', '#1e2c7e', '#19256f', '#00004a']
        // 宁夏、北京、天津使用深色，其余随机分配
        if (province.id == 'ning_xia' || province.id == 'bei_jing' || province.id == 'tian_jin') {
          return fill[4]
        }
        var colorIndx = i < 3 ? i : i % 3
        return fill[colorIndx]
      }
    }
  }
</script>
<style>
  .geo-wrap {
    margin: 0 auto;
  }
  .southsea-group line, .southsea-group path{
    stroke: rgba(255,255,255,0.3);
    fill:rgba(14, 2, 2, 0.3);
  }
  .hot-pot {
    display: block;
    border-radius: 50%;
    transform: scale(0);
  }
  /**
  * 呼吸灯动效
  */
  .scale-index-0{
    animation: lightScaleAni 2.6s linear 0s infinite;
  }
  .scale-index-1{
    animation: lightScaleAni 2.6s linear 1s infinite;
  }
  .scale-index-2{
    animation: lightScaleAni 2.6s linear 2s infinite;
  }

  @keyframes lightScaleAni {
    from {
      transform: scale(0);
      opacity: 1;
    }
    80% {
      transform: scale(0.8);
      opacity: 1;
    }
    to {
      transform: scale(1);
      opacity: 0;
    }
  }
  /**
  * 气球动效
  */
  .balloon-g {
    /* transform-origin: bottom center; */
    transform: scale(0);
  }
  .balloon-show {
    animation: balloonScaleShow 1.6s ease 0s forwards;
  }

  .balloon-hide {
    animation: balloonScaleHide 1.6s ease 0s forwards;
  }

  @keyframes balloonScaleShow {
    from  {
      transform: scale(0)
    }
    65% {
      transform: scale(1.1)
    }
    75% {
      transform: scale(0.95)
    }
    85% {
      transform: scale(1.05)
    }
    to {
      transform: scale(1)
    }
  }

  @keyframes balloonScaleHide {
    from  {
      transform: scale(1)
    }
    to {
      transform: scale(0)
    }
  }
</style>