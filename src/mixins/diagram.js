/**
* create by gms_smg@163.com
* props for vue-chart-diagram
*/

export default {
  props: {
    // 线类型: curveCardinal || curveLinear || curveStepBefore || curveStepAfter || curveBasis || curveBasisOpen ||  curveBasisClosed ||  curveBundle || curveCardinal || curveCardinalOpen || curveCardinalClosed || curveNatural     
    type: {
      type: String,
      default: 'curveCardinal'
    },
    axisXBaseLine: { // 是否显示x轴参照线
      type: Boolean,
      default: false
    },
    axisYBaseLine: { // 是否显示y轴参照线
      type: Boolean,
      default: false
    },
    axisXLength: { // x轴关键点个数
      type: Number,
      default: 10
    },
    axisYLength: { // x轴关键点个数
      type: Number,
      default: 6
    },
    axisTitle: {
      type: Object,
      default () {
        return {
          x: '',
          y: ''
        }
      }
    },
    dataset: { // 数据集合
      type: Array,
      default: function () {
        return []
      }
    },
    isArea: { // 线下面是否有面积阴影
      type: Boolean,
      default: true
    },
    animate: { // 是否执行动画
      type: Object,
      default () {
        return {
          hasAnimate: true,
          loop: true,
          delay: 3000
        }
      }
    }
  }
}