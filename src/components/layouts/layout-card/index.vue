<template>
  <div class="layour-card" :style="styles">
    <div class="card-title" ref='title'>
      <template  v-if='typeof title == "string"'>
        <span :style="getFontStyle()" class="title-text">{{ title }}</span>
      </template>
      <template v-else>
        <span 
          v-for='(t, i) in title' 
          :class='getTitleClass(i)'>
           {{ t }}
        </span>
      </template>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="shadow-bg"></div>
  </div>
</template>
<script> 
  export default {
    name: 'bs-chart-layout-card',
    props: {
      title: [String, Array],
      styles: Object,
      currentTitleIndex: Number
    },
    watch: {
      currentTitleIndex () {
        this.switchTitle()
      }
    },
    mounted () {
      this.createBorder()
    },
    methods: {
      getTitleClass (index) {
        var cls = {
           'mutile-title': true,
           'title-text': true
        }
        cls['title-index_' + index] = true
        // 默认第一个为当前高亮标题
        if (index == 0) {
          cls['current-title'] = true
        }
        return cls
      },

      createBorder () {
        const bgWidth = this.$el.offsetWidth
        const bgHeight = this.$el.offsetHeight
        let svg = this.$d3.select(this.$el.querySelector('.shadow-bg')).append('svg')
          .attr('width', bgWidth)
          .attr('height', bgHeight)
          .style('position', 'absolute')
          .style('left', 0)
          .style('top', 0)
          .style('z-index', 2)

        // 折角长度
        const angleLen = 20
        // 边框线缩进长度
        const borderPadding = 2
        // 卡片标题长度（会根据标题字数自适应）
        const titleLen = this.getTitleTextLen(this.title)

        this.$refs.title.style.width = titleLen + 'px'
        const titleBgLen = titleLen + 95 + 15
        const points = [
          [borderPadding, angleLen + borderPadding],
          [angleLen, borderPadding],
          [titleBgLen, borderPadding],
          [titleBgLen + angleLen, angleLen + borderPadding],
          [bgWidth - angleLen - borderPadding , angleLen + borderPadding],
          [bgWidth - borderPadding, angleLen * 2],
          [bgWidth - borderPadding, bgHeight - angleLen],
          [bgWidth - angleLen , bgHeight - borderPadding],
          [angleLen, bgHeight - borderPadding],
          [borderPadding, bgHeight - angleLen],
          [borderPadding, angleLen + borderPadding]
        ]
        // 创建曲线
        const pathId = 'border_' + Math.random().toString(36).substr(2)
        svg.append('path').attr('d', () => {
            let d = ''
            points.forEach((p, i) => {
              let quote = (i == 0) ? 'M' : ' '
              d += (quote + p[0] + ',' + p[1])
            })
            return d
          })
          .attr('stroke', '#132E69')
          .attr('stroke-width', 2)
          .attr('fill', 'none')
          .attr('id', pathId)
        /**
        * 开始
        * 线框上面的光束效果，因为整体页面的性能问题，暂时关闭该特效
        */
        const maskId = Math.random().toString(36).substr(2, 6) // 产生唯一id,防止不同卡共用蒙版
        svg.append('path').attr('d', () => {
            let d = ''
            points.forEach((p, i) => {
              let quote = (i == 0) ? 'M' : ' '
              d += (quote + p[0] + ',' + p[1])
            })
            return d
          })
          .attr('stroke', '#1161cc')
          .attr('stroke-width', 2)
          .attr('id', pathId)
          .attr('mask', 'url(#' + maskId + ')')

        // 创建曲线上的光束动效
        var defs = svg.append('defs')
        var radialGradient = defs.append('radialGradient')
                                .attr('cx', "50%")
                                .attr('cy', "50%")
                                .attr('r', "50%")
                                .attr('fx', "50%")
                                .attr('fy', "50%")
                                .attr('id', 'radialGradient')
        radialGradient.append('stop')
          .attr('offset', "0%")
          .attr('stop-color', '#ffffff')
          .attr('stop-opacity', '1')

        radialGradient.append('stop')
          .attr('offset', "100%")
          .attr('stop-color', '#ffffff')
          .attr('stop-opacity', '0')

        var mask = defs.append('mask')
          .attr('id', maskId)
        mask.append('ellipse')
          .attr('cx',"0")
          .attr('cy',"0")
          .attr('rx',"60")
          .attr('ry',"2")
          .attr('fill', 'url(#radialGradient)')
          .append('animateMotion')
          .attr('dur', '6s') 
          .attr('rotate', 'auto')
          .attr('repeatCount', 'indefinite')
          .append('mpath')
          .attr('xlink:href', '#' + pathId)
        /**
        * 结束
        * 线框上面的光束效果，因为整体页面的性能问题，暂时关闭该特效
        */
      },
      getFontStyle () {
        const fontSize = this.styles && this.styles.fontSize || 14
        return {
          'font-size': fontSize + 'px'
        }
      },
      // 根据标题字符个数和字号大小，确定标题的长度
      getTitleTextLen () {
        let titles = typeof this.title == 'string' ? [this.title] :  this.title
        let lengths = titles.map(title => {
          return title.length
        })
        const fontSize = this.styles && this.styles.fontSize || 14
        return Math.max(...lengths) * fontSize
      },
      switchTitle () {
        // 不为0 且未定义
        if (this.currentTitleIndex !== 0 && !this.currentTitleIndex) {
          return
        }
        // 如果title为字符串，或者title为数据，但是长度小于2，则不提供标题切换功能
        if (typeof this.title == 'string' || (typeof this.title == 'object' && this.title.length < 2)) {
          return
        }
        // index大于title的长度
        if (this.title.length <= this.currentTitleIndex) {
          return
        }

        // 获得当前激活的title,删除高亮样式，并添加消失动效。
        var currentTitle = this.$el.querySelector('.current-title') || this.$el.querySelector('.mutile-title') // 获取当前激活的title,如果没有，这取第一个
        currentTitle.classList.remove('current-title')
        currentTitle.classList.add('pre-title')
        // 获得即将高亮的title, 删除
        var needActiveTitle = this.$el.querySelector('.title-index_' + this.currentTitleIndex)
        needActiveTitle.classList.remove('pre-title')
        needActiveTitle.classList.add('current-title')
      }
    }
  }
</script>

<style>
  .layour-card {
    width: 100%;
    height: 100%;
    padding: 38px 10px 15px 10px;
    box-sizing: border-box;
    position: relative;
    margin-top: 5px;
  }
  .card-title {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    padding: 0 37px;
    position: absolute;
    left: 20px;
    top: 10px;
    color: #EDE8FF;
    text-align: center;
    display: inline-block;
  }
  .card-title:before, .card-title:after {
    display: block;
    width: 32px;
    height: 20px;
    content: '';
    position: absolute;
    top: 0;
    background-repeat: no-repeat;
    background-position: 0 6px;
  }
  .card-title:before {
    left: 0;
    background-image: url('./card-title-left.svg');
  }
  .card-title:after {
    right: 0;
    background-image: url('./card-title-right.svg');
  }
  .card-content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  /** 头部动效处理 **/
  .mutile-title {
    display: block;
    clip-path: polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%);
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .pre-title {
    animation: titleHide 1s linear forwards;
  }
  .current-title {
    animation: titleShow 1s linear 0.2s forwards;
  }

  @keyframes titleShow {
    from {
      clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%);
    }
    to {
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
    }
  }
  @keyframes titleHide {
    from {
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%);
    }
    to {
      clip-path: polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%);
    }
  }
</style>



