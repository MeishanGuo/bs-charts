
<template>
  <div class="text-slider-up-wrap">
    <ul class="slider-box">
      <li
        v-for = 'str in dataset'
        class='slider-item'
      >{{str}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'bs-chart-text-slider',
    props: {
      dataset: Array
    },
    methods: {
      setFirstActiveItem () {
        if (this.dataset.length) {
          this.activeItem = this.$el.querySelector('.slider-item')
          this.activeItem.classList.add('text-show')
        }
      },
      getNextActiveItem () {
        var nextSiblings = this.activeItem.nextElementSibling
        if (!nextSiblings) {
          nextSiblings = this.$el.querySelector('.slider-item')
        }
        return nextSiblings
      },
      reginsterScroll () {
        setInterval(() => {
          if (this.dataset.length > 1) {
            this.scroll()
          }
        }, 4000)
      },
      scroll () {
        if (!this.activeItem) {
          this.setFirstActiveItem()
        }
        this.activeItem.classList.remove('text-show')
        this.activeItem.classList.add('text-hide')

        var nextSibling = this.getNextActiveItem()
        nextSibling.classList.remove('text-hide')
        nextSibling.classList.add('text-show')

        this.activeItem = nextSibling
      }
    },
    mounted () {
      this.setFirstActiveItem()
      this.reginsterScroll()
    }
  }
</script>

<style>
  .text-slider-up-wrap {
    height: 24px;
  }
  .text-slider-up-wrap .slider-box {
    position: relative;
    width: 100%;
    height: 24px;
  }
  .text-slider-up-wrap ul li.slider-item {
    color: #CEEAFF;
    font-size: 16px;
    display: block;
    height: 24px;
    line-height: 24px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 0;
    opacity: 0;
  }

  .text-slider-up-wrap .text-show {
    animation: textSliderShow 0.6s linear forwards;
  }

  .text-slider-up-wrap .text-hide {
    animation: textSliderHide 0.6s linear forwards;
  }

  @keyframes textSliderShow {
    from {
      top: 24px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  @keyframes textSliderHide {
    from {
      top: 0;
      opacity: 1;
    }
    to {
      top: -24px;
      opacity: 0;
    }
  }

</style>