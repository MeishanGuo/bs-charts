<template>
  <li class="text-item clearfix">
    <label>{{time}}</label>
    <span>{{textReal}}</span>
  </li>
</template>
<script> 
  export default {
    name: 'bs-chart-printer-item',
    props: {
      time: String,
      text: String
    },
    data () {
      return {
        textReal: '',
      }
    },
    methods: {
      textPrint () {
        var str = this.text
        var strLen = str.length
        var step = 1
        var s = setInterval(() => {
          step ++
          this.textReal = str.substr(0, step)
          if (step >= strLen) {
            clearInterval(s)
            this.$emit('printFinished')
          }
        },50)
      }
    },
    mounted () {
      this.textPrint()
    }
  }
</script>
