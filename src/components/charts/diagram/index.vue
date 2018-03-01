<!-- 曲线图 -->
<template>
  <div class="diagram-container">
    <div class="diagram-head">
      <div v-for='(data, i) in dataset' class="mark">
        <span class="color-gradient" :style="{
          background: 'linear-gradient(to right, ' + data.colors[0] + ', ' + data.colors[1] + ')'
          }"></span>
        <label :style='{color: data.colors[0]}'>{{data.label}}</label>
      </div>
      <div class="diagram-axisy-title" v-if='axisTitle.y && dataset.length'>{{"(" + axisTitle.y + ")"}}</div>
    </div>
    <div class="diagram-content" ref='diagramContent'></div>
  </div>
</template>
<script>
  import { gradientCreate } from '@src/utils/element-create'
  import mixins from '@src/mixins/diagram.js'
  import { getRandomKey } from '@src/utils'
  export default {
    name: 'bs-chart-diagram',
    mixins: [mixins],
    created () {
      // 当前表格唯一key,用于解决蒙版id在body中重复引起的闪烁bug
      this.key = getRandomKey()
    },
    methods: {
      createDiagram () {
        var container = this.$refs.diagramContent
        // 清空容器，表格积累
        container.innerHTML = ''
        var width = container.offsetWidth, height = container.offsetHeight
        var margin = {top: 20, right: 20, bottom: 30, left: 40};
        var svg = this.$d3.select(container)
                    .append('svg')
                    .style('width', width )
                    .style('height', height)

        var g = svg.append('g').attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        this.defs_g = g.append('g').attr('clsss', 'defs_g')

        // 比例尺
        this.scaleWidth = width - margin.left - margin.right
        this.scaleHeight = height - margin.top - margin.bottom

        // 创建比例尺
        this.createAxisScale()
        // 创建坐标系
        this.createAxis(g)
        // 切割动效clipPath
        this.createClipAnimation(this.scaleWidth, this.scaleHeight, g)
        // 创建线
        this.createCurve()
        // 画关键点
        this.createMainPoints()
        // 画虚线下的面积
        if (this.isArea) {
          this.createAreaUnderCurve()
        }
        // 折线渐变
        this.createLineGradient()
      },
      /**
      * 创建比例尺
      */
      createAxisScale () {
        var xAxisLen = this.dataset[0].points.length - 1
        this.xScale = this.$d3.scaleLinear()
          .domain([0, xAxisLen])
          .range([0, this.scaleWidth])

        var yMax = 10
        var yMin = 0
        let yDomain = this.getYDemain(this.dataset)
        this.yScale = this.$d3.scaleLinear()
          .domain([0, yDomain.max]) // 确保Y轴数据从零开始
          .range([this.scaleHeight, 0])
      },
      /**
      * 获得坐标系Y轴的值域
      */
      getYDemain (dataset) {
        let array = []
        dataset.map(data => {
          data.points.map(p => {
            array.push(p[1])
          })
        })
        // 真实值
        let max = this.$d3.max(array)
        let min = this.$d3.min(array)
        // 如果最大值与最小值相同，则将最大值加5，保证坐标系的兼容性
        if (max == min) {
          max = min + 5
        }
        return {
          max: max,
          min: min
        }
      },
      /**
      * 创建坐标系
      */
      createAxis (group) {
        let pointsSymbol = this.dataset[0].points
        var xAxis = this.$d3.axisBottom(this.xScale)
                      .ticks(this.axisXLength || pointsSymbol.length)

        let yAxis = this.$d3.axisLeft(this.yScale)
                            .ticks(4)

        group.append("g")
            .attr('class', 'axis-x')
            .attr("transform", "translate(0," + this.scaleHeight + ")")
            .call((g) => {
              g.call(xAxis)
              var text = g.selectAll('text')
                .attr('stroke', '#8788A1')
                .attr('fill', 'none')
                .style('font-size', 12)
                .style('font-weight', 100)
                .text((d) =>{
                  return pointsSymbol[d][0]
                })
              if (this.axisXBaseLine) {
                g.selectAll(".tick:not(:first-of-type) line")
                  .attr('y2', - this.scaleHeight)
                  .attr('stroke-width', 1)
                  .attr("stroke", "rgba(60, 61, 82, 0.3)")
                }
            });
        group.append("g")
            .attr('class', 'axis-y')
            .call((g) => {
              g.call(yAxis)
              if(this.axisYBaseLine) {
                g.selectAll(".tick:not(:first-of-type) line")
                  .attr('x2', this.scaleWidth)
                  .attr('stroke-width', 1)
                  .attr("stroke", "rgba(60, 61, 82, 0.3)")
                  .attr("stroke-dasharray", "2,2");
                }
            });
      },
      /**
      * 创建线
      */
      createCurve () {
        var lineGenerator = this.$d3.line()
                              .x((d, i) => {
                                return this.xScale(i)
                              })
                              .y((d) => {
                                return this.yScale(d[1])
                              })
                              .curve(this.$d3[this.type])

        this.dataset.forEach((data) => {
          this.data_g.append('path')
              .attr('class', 'line-path')
              .attr('d', lineGenerator(data.points))
              .attr('fill', 'none')
              .attr('stroke', 'url(#' + this.getIdByColors(data.colors) + ')')
              .attr('stroke-width', 2)
        })
      },
      /**
      * 创建面
      */
      createAreaUnderCurve () {
        var areaPath = this.$d3.area()
                        .x((d, i) => {
                          return this.xScale(i)
                        })
                        .y0((d, i) => {
                          return this.yScale(0)
                        })
                        .y1((d, i) => {
                          return this.yScale(d[1])
                        })
                        .curve(this.$d3[this.type || 'diagramCardinal'])

        this.dataset.forEach((data) => {
          this.data_g.append('path')
            .attr('d', areaPath(data.points))
            .attr('fill', 'url(#' + this.getIdByColors(data.colors) + ')')
            .attr('opacity', 0.1)
        })
      },
      /**
      * 创建关键点
      */
      createMainPoints () {
        // 关键点渐变
        this.dataset.forEach((data) => {
          const id = 'main_points_id_' + data.colors[0]
          gradientCreate({
            type: 'radialGradient',
            id: id,
            container: this.defs_g,
            attrs: {},
            stops: [
              { offset: '0%', 'stop-color': data.colors[0], 'stop-opacity': 1 },
              { offset: '40%', 'stop-color': data.colors[0], 'stop-opacity': 1 },
              { offset: '41%', 'stop-color': data.colors[0], 'stop-opacity': 0.3 },
              { offset: '100%', 'stop-color': data.colors[0], 'stop-opacity': 0.3 }
            ]
          })
          data.points.forEach((point,i) => {
             this.data_g.append('circle')
              .attr('cx', this.xScale(i))
              .attr('cy', this.yScale(point[1]))
              .attr('r', '5px')
              .attr('fill', 'url(#' + id + ')')
          })
        })
      },
      /**
      * 创建线、线下面积的渐变
      */
      createLineGradient () {
        this.dataset.forEach(data => {
          gradientCreate({
            type: 'linearGradient',
            id: this.getIdByColors(data.colors),
            container: this.defs_g,
            attrs: {
              x1: '50%',
              y1: '0%',
              x2: '50%',
              y2: '100%'
            },
            stops: [
              {'offset': '0%', 'stop-color': data.colors[0] },
              {'offset': '100%', 'stop-color': data.colors[1]}
            ]
          })
        })
      },
      /**
      * 创建切割动效
      */
      createClipAnimation (width, height, container) {
        this.defs_g.append('clipPath')
              .attr('id', 'my-clip-path')
              .append('rect')
              .attr('x', -5)
              .attr('y', -5)
              .attr('width', width + 10)
              .attr('height', height + 10)
              .append('animate')
              .attr('id', 'op')
              .attr('attributeName', 'width')
              .attr('from', "0")
              .attr('to', width)
              .attr('dur', '3s')
              .attr('begin', () => {
                return 'op.end+3s'
              })

        this.data_g = container.append('g')
                      .attr('class', 'data_g')
                      .attr('clip-path', 'url(#my-clip-path)')
      },
      getIdByColors (colors) {
        var id = this.key
        colors.forEach(c => {
          id += c.replace('#', '_')
        })
        return id
      }
    },
    watch: {
      dataset () {
        if (this.dataset.length) {
          this.createDiagram()
        }
      }
    },
    mounted () {
      if (this.dataset.length) {
        this.createDiagram()
      }
    }
  }
</script>

<style>
  .diagram-container {
    width: 100%;
    height: 100%;
    position: relative;
    vertical-align: middle;
    box-sizing: border-box;
    padding:20px 0 0 0;
    margin: 0 auto;
  }
  /** 
  * 头部mark标记样式
  */
  .diagram-head {
    height: 30px;
    width: 100%;
    position: absolute;
    top: -10px;
    right: -8px;
    padding-left: 30px;
    box-sizing: border-box;
  }
  .diagram-head .mark{
    float: right;
    margin-right: 15px;
  }
  .diagram-head .color-gradient {
    display: inline-block;
    width: 6px;
    height: 2px;
    border-radius: 2px;
    margin-bottom: 4px;
    margin-right: 0;
  }
  .mark label {
    font-size: 12px;
    display: inline-block;
  }
  .diagram-axisy-title {
    color: rgba(255,255,255,0.3);
    font-size: 12px;
    position: absolute;
    left: 6px;
    bottom: -16px;
  }
  /**
  * 图表样式
  */
  .diagram-content {
    height: 100%;
  }
  .tick text{
    stroke: #8788A1;
    opacity: 0.3;
    font-weight: lighter;
    font-family: ''
  }
  .domain {
    stroke: rgba(136,136,161, 0.3);
  }
  .axis-y .domain {
  }
  
</style>