<template>
  <div class="card-layout-for-china-map-wrap">
    <div class="main">
      <slot name='main'> </slot>
    </div>
    <div class="left-top">
      <slot name='left-top'></slot>
    </div>
    <div class="right-top">
      <slot name='right-top'></slot>
    </div>
    <div class="left-bottom">
      <slot name='left-bottom'></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'china-map-layout'
  }
</script>

<style>
  .card-layout-for-china-map-wrap {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .card-layout-for-china-map-wrap .main{
    width: 470px;
    height: 200px;
    position: relative;
    left: 120px;
    top: 50px;
  }
  .card-layout-for-china-map-wrap .left-top {
    position: absolute;
    top: 10px;
    left: 12px;
  }
  .card-layout-for-china-map-wrap .right-top {
    position: absolute;
    top: -7px;
    right: 23px;
  }
  .card-layout-for-china-map-wrap .left-bottom {
    position: absolute;
    bottom: 10px;
    left: 40px;
  }
</style>