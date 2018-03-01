<template>
  <div class="page-footer-wrap">
    <div class="text-outer">
      <span class="corp-right">Directed By NatureDesign</span>
      <span class="text-wrap">
        <span>{{text || '鹰眼监控感知大屏欢迎您！'}}</span>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'bs-chart-page-footer',
    props: {
      text: {
        type: String,
        default: '鹰眼监控感知大屏欢迎您！'
      }
    }
  }
</script>
<style type="text/css">
  .page-footer-wrap{
    text-align: center;
  }
  .page-footer-wrap .text-wrap {
    display: block;
    width: 890px;
    height: 20px;
    margin-left: 550px;
    overflow: hidden;
  }
  .page-footer-wrap .text-wrap span{
    animation: textAni 12s linear infinite;
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
    color: #cde3ff;
    opacity: 0.45;
  }
  .text-outer {
    overflow: hidden;
    text-align: right;
    color: rgba(93, 104, 166, 0.3);
    font-size: 12px;
  }
  .text-outer .corp-right {
    float: right;
    color: #cde3ff;
    opacity: 0.3;
    margin-right: 27px;
    line-height: 20px;
  }

  @keyframes textAni {
    from {
      transform: translate(900px, 0);
    }
    to {
      transform: translate(-900px, 0);
    }
  }
</style>