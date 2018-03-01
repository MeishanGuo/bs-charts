<template>
  <div class="card-layout-for-world-map">
    <div class="main">
      <slot name="main"></slot>
    </div>
    <div class="bottom">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'world-map-layout'
  }
</script>

<style>
  .card-layout-for-world-map {
    position: relative;
    width: 100%;
    height: 100%
  }
  .main {
    width: 100%;
    height: 100%;
  }
  .bottom {
    position: absolute;
    bottom: 20px;
    width: 80%;
    height: 30px;
    z-index: 99;
    left: 10%;
  }
</style>
