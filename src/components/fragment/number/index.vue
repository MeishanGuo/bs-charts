<template>
  <div class="bs-numbers">
    <span :style="innerstyles" v-for="(num, index) in innerCount" :class="getNumberClass(num, index)"></span>
  </div>
</template>

<script>
  import { countUpAnimate } from '@utils/animate'
  export default {
    name: 'bs-numbers',
    props: {
      count: {
        type: [Number, String],
        default: 0
      },
      animate: {
        type: Boolean,
        default: true
      },
      suffix: {
        type: String,
        dafault: ''
      },
      styles: {
        type: Object,
        default () {
          return {}
        }
      },
      decimal: {
        type: [Number, String],
        default: 0
      },
      // 数据长度
      length: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        innerCount: 0
      }
    },
    watch: {
      count () {
        this.setInnerCount()
      }
    },
    created () {
      // 将外部状态转化成内部状态
      this.setInnerCount()
    },
    mounted () {
      // 如果当前count有定义且非零、且开启动效，则执行动效
      if (this.count && this.animate) {
        this.countAnimate()
      }
    },
    methods: {
      setInnerCount () {
        this.innerCount = this.count.toString() // 将数字转化成字符串，防止在数字在 for in 里面按照数字大小循环
      },
      countAnimate () {
        countUpAnimate(null, this.count, 0, 1000, Number(this.decimal), Number(this.length), (n) => {
          this.innerCount = n + (this.suffix || '')
        })
      },
      getNumberClass (num, index) {
        // 设置显示数字
        let cls = 'span-text '
        if (num === '.') {
          cls += 'icon-point'
        }else if (num === '%') {
           cls += 'icon-percentage'
        } else {
          cls += 'icon-' + num
        }
        // 设置透明度
        // if(Number(this.length) && (Number(this.length) - this.count.toString().length) > index) {
        //   cls += ' opacity-num'
        // }
        return cls
      }
    },
    computed: {
      innerstyles () {
        const defaultStyles = {}
        return Object.assign({}, defaultStyles, this.styles)
      }
    }
  }
</script>

<style>
  .bs-numbers span {
    display: inline-block;
    padding: 0 2px;
  }
  .bs-numbers span.icon-point{
    transform: scale(0.4) translate(0,12px);
  }
  .bs-numbers .opacity-num {
    opacity: 0.4
  }
</style>