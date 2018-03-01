<template>
  <div class="page-header">
    <div class="header-left" ref='headLeft'></div>
    <div class="header-center" ref='headCenter' :style="{'background-image': 'url(' + require('./center-bg-data.js').default.data + ')'}">
      {{ title }}
    </div>
    <div class="header-right" ref='headRight'></div>
    <div class="logo-wrap">
      <img src="./eagle-logo.svg" class="eagle-logo">
      <span class="eagle-text">北京北森云计算鹰眼监控系统</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bs-chart-page-header',
    props: {
      title: {
        type: String,
        default: '鹰眼感知监控'
      }
    },
    mounted () {
      this.setHeadSize()
    },
    watch: {
      title () {
        this.setHeadSize()
      }
    },
    methods: {
      setHeadSize () {
        var headWidth = this.$el.offsetWidth
        var textWidth = this.title.length * 45 + 240
        var sideWidth = (headWidth - textWidth) / 2
        this.$refs.headCenter.style.width = textWidth + 'px'
        this.$refs.headLeft.style.width = sideWidth + 'px'
        this.$refs.headRight.style.width = sideWidth + 'px'
      }
    }
  }
</script>
<style>
  .page-header{
    overflow: hidden;
    position: relative;
  }
  .header-left {
    background-image: url('./left.svg');
    background-size: 100% 70px;
    width: 30%;
    height: 70px;
    float: left;
  }

  .header-right {
    background-image: url('./right.svg');
    background-size: 100% 70px;
    width: 30%;
    height: 70px;
    float: right;
    background-repeat: no-repeat;
  }
  .header-center {
    width: 40%;
    position: relative;
    height: 66px;
    margin-top: 9px;
    background-repeat: no-repeat;
    background-size: 100% 63px;
    float: left;
    color: #fff;
    font-size: 45px;
    font-weight: normal;
    text-align: center;
    line-height: 70px;
    border-left: 120px solid transparent;
    border-right: 120px solid transparent;
    box-sizing: border-box;
  }
  .header-center:after, .header-center:before {
    display: block;
    height: 80px;
    width: 120px;
    content: '';
    position: absolute;
    top: -7px;
    background-size: 125px 79px;
    background-repeat: no-repeat;
  }
  .header-center:before{
    left: -119px;
    background-image: url(./center-left.svg);
  }

  .header-center:after{
    right: -119px;
    background-image: url(./center-right.svg);
  }
  .page-header .logo-wrap {
    position: absolute;
    left: 30px;
    top: 30px;
    width: 360px;
    height: 48px;
  }
  .page-header .eagle-text {
    position: absolute;
    left: 80px;
    top: 20px;
    color: rgba(255,255,255,0.25);
    font-size: 16px;
  }
  .page-header .eagle-logo {
    opacity: 0.85
  }
</style>