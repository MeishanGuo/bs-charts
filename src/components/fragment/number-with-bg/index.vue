<template>
  <div class="number-with-bg">
    <div class="left">{{lable}}</div>
    <div class="right">
      <bs-numbers :count='count' length=8></bs-numbers>
    </div>
  </div>
</template>

<script>
  import { countUpAnimate } from '@utils/animate'
  export default {
    name: 'number-with-bg',
    props: {
      lable: {
        type: String,
        default: '当前实时访问次数'
      },
      count: {
        type: Number,
        default: 0
      }
    }
  }
</script>

<style>
  .number-with-bg {
    width: 330px;
    height: 80px;
  }
  .number-with-bg .left {
    float: left;
    width: 90px;
    color: #fff;
    font-size: 20px;
    line-height: 30px;
    height: 100%;
    overflow: hidden;
    padding-top: 8px;
    box-sizing: border-box;
  }
  .number-with-bg .right {
    float: left;
    width: 250px;
    height: 100%;
    color: #FFC003;
    font-size: 36px;
    text-align: center;
    line-height: 88px;
    background-image: url('./mesh-bg.svg');
    background-size: cover;
    margin-left: -20px;
  }
  
</style>