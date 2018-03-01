<!--作为组件预览的布局组件，不会打包到BSCharts中 -->

<template>
  <div class="play-layout">
    <div class="page-layout">
      <div class="layout-wrap" ref='layoutWrap'>
        <div class="page-title">
          <slot name='page-header'></slot>
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
  </div>
</template>
<script>
  export default {
    name: 'play-layout'
  }
</script>

<style scope>
  html, body, div, span, ul, li, label, table, tbody, thead, th, td, tr {
    margin: 0;
    padding: 0;
  }
  html,body{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .page-layout {
    background: #020934;
    background: -webkit-radial-gradient(top left, circle, #020043, #010430, #000527, #020B3C);
    height: 100%;
    position: relative;
  }
  .layout-wrap {
    width: 1920px;
    height: 100%;
    transform-origin: left top;
    padding: 10px;
    border-left: 1px dashed #122d68;
    border-right: 1px dashed #122d68;
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
    width: 440px;
  }
  .page-footer {
    height: 30px;
    width: 100%;
  }
</style>