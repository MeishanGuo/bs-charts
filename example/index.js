import Vue from 'vue'

import VueD3 from 'vue-d3'
Vue.use(VueD3)

import mockStates from './mock-data/states.js'

import BSCharts from '@src/index.js'

Vue.use(BSCharts, {})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render (h) {
    return this.renderComponents(h, mockStates)
  },
  methods: {
    renderComponents (h, cmps) {
      let subCmps = (cmps.children || []).map(child => {
        return this.renderComponents(h, child)
      })
      let attr = this.getCmpAttrs(cmps.attributes)
      return h(cmps.type, attr, subCmps)
    },
    getCmpAttrs (attr = {}) {
      let _attr = {
        props: attr.props || {},
        on: this.bindEvents(attr.events),
      }
      if (attr.slot) {
        _attr.slot = attr.slot // slot=''会影响页面渲染
      }
      return _attr
    },
    bindEvents (events = {}) {
      let self = this
      var _events = {}
      Object.keys(events).forEach(eventName => {
        _events[eventName] = function (paylaod) {
          self.$store.dispatch(events[eventName].type, {
            data: paylaod, // 通过emit传出来的数据
            params: events[eventName].params // 配置事件时定制的参数
          })
        }
      })
      return _events
    }
  }
})
