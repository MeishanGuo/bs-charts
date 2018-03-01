
<template>
  <div class='world-geo-canvas-wrap'>
    <div class="earch-stage" ref='earchStage'></div>
    <div class="background-stage background-fog" ref='backgroundFogStage'></div>
    <div class="background-stage background-stars" ref='backgroundStarStage'></div>
  </div>
</template>

<script>
  import Globe from  '@plugins/globe'
  import fogGenerator from '@plugins/fog-generator'
  import starrySkyGenerator from '@plugins/starry-sky-generator'
  import staticPath from '@utils/static-path'
  export default {
    name: 'bs-chart-world-map',
    props: {
      dataset: Array
    },
    watch: {
      dataset () {
        this.globe.createHotPots(this.dataset)
        this.globe.createFlyCurves(this.dataset)
      }
    },
    mounted () {
      this.globe = new Globe(this.$refs.earchStage, this.dataset)
      this.globe.init()
      this.globe.animate()
      // 创建雾化背景
      fogGenerator({
        container: this.$refs.backgroundFogStage,
        url: staticPath.smokeBg
      })
      // 创建星空背景
      starrySkyGenerator({
        container: this.$refs.backgroundStarStage,
        starscolor: 230,
        starsamount: 100,
        starsradius: 2,
        movrange: 1,
        speed: 100000,
        trailing: 0.5})
    }
  }
</script>

<style scope>
.world-geo-canvas-wrap {
  width:100%;
  height: 100%;
  position: relative;
}
.earch-stage {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 6;
  left: 0;
  top: 0;
}
.background-stage {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.background-stars {
  z-index: 4;
}
.background-fog {
  z-index: 5;
}
</style>