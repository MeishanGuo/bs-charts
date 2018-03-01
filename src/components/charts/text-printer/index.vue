<template>
  <div class="text-printer-wrap">
    <div v-if="!list.length" class="empty-holder">暂无用户操作</div>
    <ul class="text-list" ref="textprinter">
      <bs-chart-printer-item v-for="(item, index) in list" :key="item.key" :text="item.text" :time="item.time" @printFinished="delayAddItem"></bs-chart-printer-item>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'bs-chart-text-printer',
    props: {
      msgList: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      this.getMsgListCopyed()
      return {
        list: []
      }
    },
    methods: {
      delayAddItem () {
        setTimeout(() => {
          this.addItem()
        }, 3000)
      },
      addItem () {
        if (this._msgList.length && this._msgList.length > this.list.length) {
          // 保证数据不重复添加
          var item = this._msgList[this.list.length] // 取下一个数据
          item.key = Math.random()
          this.list.unshift(item)
        }
      },
      getMsgListCopyed () {
        this.list = []
        this._msgList = JSON.parse(JSON.stringify(this.msgList))
      }
    },
    beforMount () {
      this.getMsgListCopyed()
    },
    watch: {
      msgList () {
        this.getMsgListCopyed()
        this.addItem()
      }
    },
    mounted () {
      this.getMsgListCopyed()
      this.addItem()
    }
  } 
</script>

<style>
  .text-printer-wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  .text-printer-wrap .text-item {
    display: block;
    min-height: 24px;
    height: auto;
    padding-left: 75px;
    position: relative;
    margin-top: 6px;
  }
  .text-printer-wrap .text-item label,
  .text-printer-wrap .text-item span {
    display: block;
    float: left;
  }
  .text-printer-wrap .text-item label {
    width: 65px;
    height: 100%;
    text-indent: 24px;
    color: rgba(255,255,255,0.4);
    position: absolute;
    left: 0;
    font-size: 12px;
    line-height: 20px;
  }
  .text-printer-wrap .text-item label:after,
  .text-printer-wrap .text-item label:before {
    display: block;
    position: absolute;
    content: ' ';
  }
  .text-printer-wrap .text-item:last-child label:after {
    display: none;
  }
  .text-printer-wrap .text-item label:after {
    width: 1px;
    height: 100%;
    left: 9px;
    top: 15px;
    background: rgba(49, 191, 255,0.3);
    animation: lineSpread 1s ease forwards; 
  }
  .text-printer-wrap .text-item label:before {
    width: 8px;
    height: 8px;
    background-image: repeating-radial-gradient(rgba(49, 191, 255,0.3) -200%, rgba(49, 191, 255,1) 35%);
    border-radius: 5px;
    left: 5px;
    top: 6px;
  }
  .empty-holder {
    font-size: 14px;
    color: rgba(255,255,255,0.6);
    text-align: center;
  }
  .text-printer-wrap .text-item span {
    color: rgba(255,255,255, 0.8);
    font-size: 12px;
    line-height: 20px;
  }
  @keyframes lineSpread  {
    from { height: 0; }
    to { height: 100%; }
  }
  
</style>