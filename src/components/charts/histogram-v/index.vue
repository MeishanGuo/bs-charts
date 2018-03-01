<!-- 柱状图 -->
<template>
  <div class="histogram-container">
    <div class="histogram-head">
      <div class="histogram-axisy-title" v-if='axisTitle.y && dataset.length'>{{"(" + axisTitle.y + ")"}}</div>
    </div>
    <div class="histogram-content" ref='histogramContent'></div>
  </div>
</template>
<script>
import { gradientCreate } from "@src/utils/element-create";
import mixins from "@src/mixins/diagram.js";
import { getRandomKey } from "@src/utils";
export default {
  name: "bs-chart-histogram-verical",
  mixins: [mixins],
  created() {
    // 当前表格唯一key,用于解决蒙版id在body中重复引起的闪烁bug
    this.key = getRandomKey();
  },
  methods: {
    createDiagram() {
      var container = this.$refs.histogramContent;
      // 清空容器，表格积累
      container.innerHTML = "";
      var width = container.offsetWidth,
        height = container.offsetHeight;
      var margin = { top: 20, right: 20, bottom: 30, left: 40 };
      var svg = this.$d3
        .select(container)
        .append("svg")
        .style("width", width)
        .style("height", height);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      this.data_g = g.append("g").attr("clsss", "data_g");
      // 比例尺
      this.scaleWidth = width - margin.left - margin.right;
      this.scaleHeight = height - margin.top - margin.bottom;

      // 创建比例尺
      this.createAxisScale();
      // 创建坐标系
      this.createAxis(g);
      // 创建直方图
      this.createVericalHistogram();
      // 创建渐变
      this.createLineGradient();
    },
    /**
     * 创建比例尺
     */
    createAxisScale() {
      var xAxisLen = this.dataset[0].points.length - 1;
      this.xScale = this.$d3
        .scaleLinear()
        .domain([0, xAxisLen])
        .range([20, this.scaleWidth -20]);

      let yDomain = this.getYDemain(this.dataset);
      this.yScale = this.$d3
        .scaleLinear()
        .domain([0, yDomain.max]) // 确保Y轴数据从零开始
        .range([this.scaleHeight, 0]);
    },
    /**
     * 获得坐标系Y轴的值域
     */
    getYDemain(dataset) {
      let array = [];
      dataset.map(data => {
        data.points.map(p => {
          array.push(p[1]);
        });
      });
      // 真实值
      let max = this.$d3.max(array);
      let min = this.$d3.min(array);
      // 如果最大值与最小值相同，则将最大值加5，保证坐标系的兼容性
      if (max == min) {
        max = min + 5;
      }
      return {
        max: max,
        min: min
      };
    },
    /**
     * 创建坐标系
     */
    createAxis(group) {
      let pointsSymbol = this.dataset[0].points;
      var xAxis = this.$d3.axisBottom(this.xScale).ticks(pointsSymbol.length - 1);
      let yAxis = this.$d3.axisLeft(this.yScale).ticks(4); // Y轴分为4个梯度

      group
        .append("g")
        .attr("class", "axis-x")
        .attr("transform", "translate(0," + this.scaleHeight + ")")
        .call(g => {
          g.call(xAxis)          
          var text = g
            .selectAll("text")
            .attr("stroke", "#8788A1")
            .attr("fill", "none")
            .style("font-size", 12)
            .style("font-weight", 100)
            .text(d => {
              return pointsSymbol[d][0];
            });
        });
      group
        .append("g")
        .attr("class", "axis-y")
        .call(g => {
          // g.call(yAxis)
          if (this.axisYBaseLine) {
            g
              .selectAll(".tick:not(:first-of-type) line")
              .attr("x2", this.scaleWidth)
              .attr("stroke-width", 1)
              .attr("stroke", "rgba(60, 61, 82, 0.3)")
              .attr("stroke-dasharray", "2,2");
          }
          g.select(".domain").remove();
        });
    },
    /**
     * 创建直方图
     */
    createVericalHistogram() {
      let rectStep = 30;
      let rectWidth = 35;
      let yDomain = this.getYDemain(this.dataset);

      this.dataset.forEach((data, i) => {
        data.points.forEach((d, item) => {
          //初始化
          let recty = this.yScale(d[1]);
          let rectx = this.xScale(item);
          let colors = this.getcolors(d[1], data);
          let hei = this.yScale(0) - this.yScale(d[1]);

          // 背景柱子
          this.data_g
            .append("rect")
            .attr("x", rectx - rectStep / 2)
            .attr("y", this.yScale(yDomain.max))
            .attr("width", rectStep)
            .attr("height", this.yScale(0))
            .attr("fill", colors[0])
            .attr("fill-opacity", 0.1);

          //前景柱子
          var rect = this.data_g
            .append("rect")
            .attr("x", rectx - rectStep / 2)
            .attr("y", recty)
            .attr("width", rectStep)
            .attr("height", hei)
            .attr("fill", "url(#" + this.getIdByColors(colors) + ")");

          //创建动画
          rect
            .append("animate")
            .attr("attributeName", "height")
            .attr("from", 0)
            .attr("to", hei)
            .attr("dur", "3s");
          rect
            .append("animate")
            .attr("attributeName", "y")
            .attr("from", this.yScale(0))
            .attr("to", recty)
            .attr("dur", "3s");

          //创建文字
          var text = this.data_g
            .append("text")
            .attr("stroke", "#FFE300")
            .style("font-size", 12)
            .style("font-weight", 100)
            .attr("text-anchor", "middle")
            .attr("x", rectx)
            .attr("y", recty - 10)
            .text(d1 => {
              return d[1];
            });
          text
            .append("animate")
            .attr("attributeName", "y")
            .attr("from", this.yScale(0))
            .attr("to", recty - 10)
            .attr("dur", "3s");
        });
      });
    },
    /**
     * 创建渐变
     */
    createLineGradient() {
      this.dataset.forEach(data => {
        data.points.forEach((d, item) => {
          var colors = this.getcolors(d[1], data);
          gradientCreate({
            type: "linearGradient",
            id: this.getIdByColors(colors),
            container: this.data_g,
            attrs: {
              x1: "0%",
              y1: "0%",
              x2: "0%",
              y2: "100%"
            },
            stops: [
              { offset: "0%", "stop-color": colors[0] },
              { offset: "100%", "stop-color": colors[1] }
            ]
          });
        });
      });
    },
    getIdByColors(colors) {
      var id = this.key;
      colors.forEach(c => {
        id += c.replace("#", "_");
      });
      return id;
    },
    getcolors(hei, data) {
      let yDomain = this.getYDemain(this.dataset);
      let avg = yDomain.max / 2;
      let colors;
      if (hei > avg) {
        colors = data.maxcolors;
      } else {
        colors = data.mincolors;
      }
      return colors;
    }
  },
  watch: {
    dataset() {
      if (this.dataset.length) {
        this.createDiagram();
      }
    }
  },
  mounted() {
    if (this.dataset.length) {
      this.createDiagram();
    }
  }
};
</script>

<style scope>
.histogram-container {
  width: 100%;
  height: 100%;
  position: relative;
  vertical-align: middle;
  box-sizing: border-box;
  padding: 20px 0 0 0;
  margin: 0 auto;
}
/** 
  * 头部mark标记样式
  */
.histogram-head {
  height: 30px;
  width: 100%;
  position: absolute;
  top: -10px;
  right: -8px;
  padding-left: 30px;
  box-sizing: border-box;
}
.histogram-head .mark {
  float: right;
  margin-right: 15px;
}
.histogram-head .color-gradient {
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
.histogram-axisy-title {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  position: absolute;
  left: 6px;
  bottom: -16px;
}
/**
  * 图表样式
  */
.histogram-content {
  height: 100%;
}
.tick text {
  stroke: #8788a1;
  opacity: 0.3;
  font-weight: lighter;
  font-family: "";
}
.domain {
  stroke: rgba(136, 136, 161, 0.3);
}
</style>