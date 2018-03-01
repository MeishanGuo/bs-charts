<!---
 比例尺
 暂时用图来实现、后期实现动态比例尺
-->
<template>
  <div class="scale-tool">
    <img src="./scale-v2.svg">
  </div>
</template>
<script>
  export default {
    name: 'scale-tool'
  }
</script>

<style>
  .scale-tool img{
    width: 45px;
    height: auto;
    display: block;
  }
</style>