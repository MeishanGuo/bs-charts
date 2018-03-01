<template>
  <div class="data-grid-slider-wrap">
    <!--前景-->
    <div class="slider-box" ref="sliderBox">
      <template v-for="(data, i) in dataset" tag="div" >
        <table :class="getTableClass(i)" :tabelIndex='i'>
          <tbody>
            <tr v-for='row in data.rows'>
              <td v-for='text in row'>
                <span class="text-inner">{{ text }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
    <!--背景-->
    <div class="shadow">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
  const SCROLL_DELAY = 5000 // 表格内滚屏的时间间隔
  export default {
    name: 'bs-chart-data-grid-slider',
    props: {
      dataset: Array
    },
    data () {
      return  {
        maxLeng: 0,
        currentTable: null
      }
    },
    computed: {
      containerHeight () {
        return this.$el.clientHeight
      },
      tableRowHeight () {
        return this.$el.querySelector('tr') && this.$el.querySelector('tr').offsetHeight || 27
      },
      currentTableLen () {
        let tabelIndex = Number(this.currentTable.getAttribute('tabelIndex'))
        let tableLength = this.dataset[tabelIndex] && this.dataset[tabelIndex].rows.length || 0
        return tableLength
      }
    },
    methods: {
      getTableClass (index) {
        return 'front tables-wrap ' + index + (index == 0 ? ' current-table': '')
      },
      /**
      * 滚屏类方法 - 开始
      */
      registerTableScroll () {
        var scrollConfig = this.getScrollConfig()
        // 如果有多个表格，则注册表格切换动效
        this.registerTableSwitch((scrollConfig.length + 1) * SCROLL_DELAY + 5 * 1000) // 表格切换完后再加5秒延时
        scrollConfig.forEach((s) => {
          var timer = setTimeout(() => {
            this.currentTable.style.top = '-' + s.top + 'px'
            clearTimeout(timer)
          }, s.delay)
        })
      },
      getScrollConfig () {
        var scrollTimes = Math.ceil(this.currentTableLen / this.maxLeng)
        // 如果需要滚屏
        if (scrollTimes > 1) {
          var scrolls = []
          for(var i = 2; i <= scrollTimes; i++ ) {
            // 滚动的高度
            var currentTop =  ((i - 2) || 0) * this.maxLeng * this.tableRowHeight
            // 需要滚动的个数：当有下下屏，这滚动一整屏，否则反动到表格的底部
            var scrollNum = i * this.maxLeng < this.currentTableLen ? this.maxLeng : (i * this.maxLeng - this.currentTableLen)
            // 总共要滚动的高度
            var scrollTop = this.tableRowHeight * scrollNum + currentTop
            // 当前滚动的高度
            scrolls.push({
              time: i,
              top: scrollTop,
              delay: SCROLL_DELAY * ( i - 1)
            })
          }
          return scrolls
        }
        return []
      },
      /* 滚屏类方法 - 结束 */
      /* 设置容器的高度， 保证能装下整数条数据 */
      setContailerHeght () {
        this.maxLeng = 0
        while (this.tableRowHeight * this.maxLeng < this.containerHeight) {
          this.maxLeng ++
        }
        this.maxLeng --
        this.$refs.sliderBox.style.height = this.maxLeng * this.tableRowHeight + 'px'
      },
      /* 表格切换类方法 - 开始 */
      registerTableSwitch (delay) {
          if (this.dataset.length > 1) {
            var timer = setTimeout(() => {
              this.tableSwitch()
            }, delay || 3000)
          }
      },
      tableSwitch () {
        let nextSibling = this.currentTable.nextSibling || this.$el.querySelector('.tables-wrap') // 取下一个表格，如果没有，则取第一个表格
        // 当前激活的表格
        nextSibling.style.top = '0px'
        var timer = setTimeout(() => {
          this.currentTable.classList.remove('current-table')
          this.currentTable.classList.add('pre-table')
          // 将要激活的表格
          nextSibling.classList.add('current-table')
          nextSibling.classList.remove('pre-table')

          this.currentTable = nextSibling
          this.registerTableScroll() // 调用scroll
          // 抛出表格切换成功事件，表格名称跑出
          this.$emit('tableSwitchFinished', this.getCurrentTableInfo())
        }, 2000)
      },
      getCurrentTableInfo () {
        var index = Number(this.currentTable.getAttribute('tabelIndex')) || 0
        var name = this.dataset[index].name
        return { index, name }
      },
      /* 表格切换类方法 - 结束 */

      /**
      * 根据数据量和表格高度，重置表格背景斑马线
      */
      setBgShadow () {
        // todo ..
      }
    },
    mounted () {
      // 初始化当前激活的table
      this.currentTable = this.$el.querySelector('.tables-wrap')
      this.setContailerHeght()
      this.registerTableScroll()
      this.setBgShadow()
    }
  }
</script>

<style scope>
  .data-grid-slider-wrap {
    font-size: 12px;
    position: relative;
    height: 100%;
    overflow: hidden;
    margin-top: 5px;
  }
  .data-grid-slider-wrap .front {
    z-index: 3;
    position: absolute;
    top: 0px;
    transition: top 2s, background 2s;
    -webkit-transition: top 2s;
  }
  .data-grid-slider-wrap table {
    width: 100%;
    color: #CCE2FF;
    font-size: 14px;
    font-weight: normal;
    border: none;
  }
  .data-grid-slider-wrap table thead {
    text-align: left;
  }
  .slider-box {
    overflow: hidden;
    position: relative;
  }
  .data-grid-slider-wrap table {
    border: none;
    border-collapse: collapse;
  }
  .data-grid-slider-wrap table tr {
    height: 27px;
  }
  .data-grid-slider-wrap table tr td{
    border: none;
    clip-path: polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%);
  }
  .data-grid-slider-wrap table tr td:nth-child(1) {
    padding-left: 30px;
  }
  /** 条纹背景 **/
  .data-grid-slider-wrap .shadow {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
  }
  .data-grid-slider-wrap .shadow span  {
    display: block;
    height: 25px;
    position: relative;
  }
  .data-grid-slider-wrap .shadow span, tr {
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
  }
  .data-grid-slider-wrap .shadow span:nth-child(odd){
    background: rgba(75,79,106,0.5);
    background-clip: content-box;
    padding: 0 20px;
  }
  .data-grid-slider-wrap .shadow span:nth-child(odd):before, .shadow span:nth-child(odd):after{
    display: block;
    content: '';
    width: 20px;
    height: 25px;
    position: absolute;
    top: 0;
  }
  .data-grid-slider-wrap .shadow span:nth-child(odd):before {
    left: 0;
    background: linear-gradient(to right,  rgba(75,79,106,0),rgba(75,79,106,0.5));
  }
  .data-grid-slider-wrap .shadow span:nth-child(odd):after {
    right: 0;
    background: linear-gradient(to right, rgba(75,79,106,0.5), rgba(75,79,106,0));
  }
  /** 动效处理 **/
  .tables-wrap span {
    display: block;
    text-overflow: clip;
    white-space: nowrap;
    width: 100%;
    height: 25px;
    line-height: 25px;
  }
  /* 当前要显示的table */
  .current-table td {
    animation: textShow 1s linear 0s forwards;
  }
  /* 当前要隐藏的table */
  .pre-table td {
    animation: textHide 1s linear 0s forwards;
  }

  /**
  * IE 不支持
  **/
  @keyframes textShow {
    from {
      clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)
    }
    30% {
      clip-path: polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)
    }
    to{
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)
    }
  }

  @keyframes textHide {
    from {
      clip-path: polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)
    }
    to{
      clip-path: polygon(100% 0%, 100% 100%, 100% 100%, 100% 0%)
    }
  }
  /** 表格内滚动 **/
</style>

