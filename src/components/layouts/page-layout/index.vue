<template>
  <div class="page-layout">
    <div class="layout-wrap" ref='layoutWrap'>
      <div class="page-title">
        <slot name='page-title'></slot>
      </div>
      <div class="page-content clearfix">
          <div class="left">
            <slot name="left"></slot>
          </div>
          <div class="center">
            <div class="center-top">
              <slot name="center-top"></slot>
            </div>
            <div class="center-bottom">
              <div class="center-bottom-left">
                <slot name="center-bottom-left"></slot>
              </div>
              <div class="center-bottom-right">
                <slot name="center-bottom-right"></slot>
              </div>
            </div>
          </div>
          <div class="right">
            <slot name="right"></slot>
          </div>
      </div>
      <div class="page-footer">
        <slot name='page-footer'></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bs-chart-page-layout',
    methods: {
      setLayoutSize () {
        const default_w = 1920
        const default_h = 1080
        const window_w = document.body.offsetWidth
        const window_h = document.body.offsetHeight

        const scaleX = window_w / default_w
        const scaleY = window_h / default_h
        const scaleRatio = Math.min(scaleX, scaleY).toFixed(2) // 保留两位小数，防止页面页面在缩放时出现模糊的问题。
        const scale = 'scale(' + scaleRatio + ')'

        const realWidth = default_w * scaleRatio
        const translateX = Math.floor((window_w - realWidth) / 2) / scaleRatio
        const translate = 'translate(' + translateX + 'px, 0)'

        this.$refs.layoutWrap.style.transform = scale + ' ' + translate
      }
    },
    mounted () {
      this.setLayoutSize()
      window.addEventListener('resize', () => {
        this.setLayoutSize()
      })
    }
  }
</script>

<style>
  html, body, div, span, ul, li, table, tbody, thead, tr, th, td {
    margin: 0;
    padding: 0;
    outline: 0;
  }
  body,text{
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: content-box;
    font-family: "PingFang SC-Regular","Helvetica Neue",Tahoma,Verdana,"Hiragino Sans GB","Microsoft YaHei",STHeitiSC,sans-serif;
  }

  ul, li {
    list-style: none;
  }
  .clearfix:before,.clearfix:after{
    content:" ";
    display:table;
  }
  .clearfix:after{
    clear:both;
  }

  html,body{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .page-layout {
    background: #020934;
    background: -webkit-radial-gradient(top left, circle, #250050, #0b1b31);
    overflow: hidden;
    height: 100%;
    position: relative;
  }
  .layout-wrap {
    width: 1920px;
    height: 1105px;
    transform-origin: left top;
    padding: 10px;
   /* border-left: 1px dashed #122d68;
    border-right: 1px dashed #122d68;*/
  }
  .page-content {
    margin-top: 10px;
  }
  .page-content .left,
  .page-content .center,
  .page-content .right {
    float: left;
    height: 100%;
  }
  .left {
    width: 560px;
  }
  .center , .right {
    margin-left: 5px;
  }
  .center {
    width: 885px;
  }
  .center-top {
    height: 717px;
  }
  .center-bottom {
    height: 220px;
  }
  .center-bottom-left{
    width: 470px;
    height: 100%;
    float: left;
  }
  .center-bottom-right {
    width: 410px;
    height: 100%;
    float: right;
  }
  .right {
    width: 465px;
  }
  .page-footer {
    height: 30px;
    width: 100%;
  }
</style>