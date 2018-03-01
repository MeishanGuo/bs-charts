<template>
  <div class="date-tool">
    <span class="date">{{time}}</span>
  </div>
</template>
<script>
  export default {
    name: 'date-tool',
    data () {
      return {
        time: this.getTime()
      }
    },
    methods: {
      getTime () {
        var date = new Date()
        // 星期
        var weekMap = ['日','一','二','三','四','五','六'];  
        var week = '周' + weekMap[date.getDay()];
        var hour_24 = date.getHours()
        var hour_12 = hour_24 // 默认值
        var dayHalf = '上午' // 默认值
        if (hour_24 > 12) {
          hour_12 = hour_24 - 12
          dayHalf = '下午'
        }
        var hour = date.getHours() <= 12 ? date.getHours() : (date.getHours() - 12)
        var minutes = this.timeFormate(date.getMinutes())
        return "当前时间: " + week + dayHalf + hour_12 + ':' + minutes
      },
      timeFormate (d) {
        var _d = Number(d)
        return _d < 10 ? '0' + _d : _d 
      },
      timeUpdate () {
        setInterval(() => {
          this.time = this.getTime()
        }, 1000 * 60)
      }
    },
    mounted () {
      this.timeUpdate()
    }
  }
</script>

<style scope>
  .date-tool {
    width: 150px;
    height: 20px;
  }
  .date-tool .date{
    float: left;
    height: 20px;
    display: inline-block;
    color: #ACC3FF;
    font-size: 12px;
    line-height: 20px;
    text-indent: 4px;
    text-align: right;
    width: 100%;
  }
</style>
