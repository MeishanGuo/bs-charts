<template>
  <div class="histogram-wrap clearfix">
    <div class="left-part">
      <ul class='list' ref="list">
        <li v-for='(item, i) in leftData'>
          <label class="item-label">{{item.label}}</label>
          <div class='rect-box'>
            <span class="shadow-box" :style="{width: item.count / maxCount * 100 + '%'}">
              <span class="shadow" :key="Math.random()">
                <label class="item-count">{{item.count}}</label>
              </span>
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right-part">
      <div class="right-top" ref="rightTop">
        <span class="count" ref='rightDataTop'>
          <bs-numbers :count='rightData[0].count'></bs-numbers>
        </span>
        <span class="text">{{rightData[0].text}}</span>
      </div>
      <div class="right-bottom" ref="rightBottom">
        <span class="count" ref='rightDataBottom'>
          <bs-numbers :count='rightData[1].count'></bs-numbers>
        </span>
        <span class="text">{{rightData[1].text}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { countUpAnimate } from '@utils/animate'
  import staticPath from '@utils/static-path'
  import Visualizer from '@utils/audio-vis'
  import audioEffect from './audio-effect.js'
  export default {
    name: 'bs-chart-histogram',
    props: {
      leftData: {
        type: Array,
        default () {
          return []
        }
      },
      rightData: {
        type: Array,
        default () {
          return [{
              text: 'ios',
              count: 0
            }, {
              text: 'android',
              count: 0
            }]
        }
      }
    },
    computed: {
      maxCount () {
        return Math.max(...this.leftData.map(item => {
          return item.count
        }))
      }
    },
    mounted () {
      this.createAudioVisiable()
    },
    methods: {
      createAudioVisiable () {
        var visTop = new Visualizer()
        visTop.config({
          audioUrl: staticPath.audioPath,
          container: this.$refs.rightTop,
          draw: audioEffect
        })


        var visBottom = new Visualizer()
        visBottom.config({
          audioUrl: staticPath.audioPath,
          container: this.$refs.rightBottom,
          draw: audioEffect
        })
      }
    }
  }
</script>

<style scope>
  /* 容器 */
  .histogram-wrap {
    height: 100%;
  }
  .histogram-wrap .left-part,
  .histogram-wrap .left-part {
    width: 65%;
    float: left;
    border-right: 15px solid transparent;
    box-sizing: border-box;
    height: 100%;
    overflow: hidden;
  }
  /* 左侧柱状图 */
  .list li {
    display: block;
    position: relative;
    padding-left: 54px;
    height: 24px;
  }
  .item-label {
    width: 55px;
    display: block;
    float: left;
    text-align: right;
    position: absolute;
    left: 0;
    font-size: 12px;
    color: #8788A1;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rect-box {
    margin-left: 5px; /* 左侧间距 */
    padding-right: 70px; /* 右侧跟随文字所占的空间 */
    width: 100%;
    border-bottom: 1px solid rgba(34, 118, 253, 0.2);
    box-sizing: border-box;
    height: 23px;
    position: relative;
  }
  .rect-box:before {
    display: block;
    content: '';
    width: 100%;
    height: 7px;
    left: 0;
    bottom: 0;
    position: absolute;
    background: rgba(34, 118, 254, 0.1);
  }
  .rect-box label {
    color: #F5F8FA;
    font-size: 12px;
    position: absolute;
    right: -75px;
    display: block;
    top: -10px;
    width: 70px;
  }
  .rect-box .shadow-box {
    display: inline-block;
    height: 7px;
    margin-top: 15px;
    position: relative;
  }
  .rect-box .shadow {
    background: #2276FE;
    position: relative;
    display: block;
    height: 100%;
    animation: rectShadowSpread 2s ease forwards;    
  }
  @keyframes rectShadowSpread {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  /* 右侧图 */
  .histogram-wrap .right-part {
    width: 35%;
    float: right;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .right-part .right-top,
  .right-part .right-bottom{
    width: 100%;
    height: 50%;
    position: relative;
    box-sizing: content-box;
  }

  .right-part .right-top canvas,
  .right-part .right-bottom canvas{
    position: absolute;
    left: 0;
    top: 0;
  }
  .right-part .right-bottom {
    border-top: 4px solid transparent;
  }
  .right-part .right-top {
    border-bottom: 4px solid transparent;
  }
  .right-part .count,
  .right-part .text{
    color: #FEC003;
    text-align: center;
    display:block;
    position: relative;
    z-index: 2;
  }
  .right-part .count {
    padding-top: 16px;
  }
  .right-part .count .bs-numbers span {
    font-size: 24px;
    padding: 0 2px;
  }
  .right-part .text {
    font-size: 14px;
    line-height: 28px;
  }
</style>