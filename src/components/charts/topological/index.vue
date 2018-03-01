<template>
  <div class = "topological-wrap">
    <div ref = "graph" class = "topological-box"> </div>
    <div style='display'>
      <svg>
          <defs>
            <!-- production -->
            <linearGradient x1="46.67629%" y1="78.9060125%" x2="45.3981074%" y2="-33.4535256%" id="icon-production-gradient">
              <stop stop-color="#2477D3" offset="0%"></stop>
              <stop stop-color="#DE93EF" offset="100%"></stop>
            </linearGradient>
            <path d="M17,22.9260856 L29.1956531,27.8043469 L29.1956531,40 L17,35.1217388 L17,22.9260856 Z M41.8791323,22.9260856 L41.8791323,35.1217388 L29.6834792,40 L29.6834792,27.8043469 L41.8791323,22.9260856 Z M29.3579715,20 L41.7159429,22.601449 L29.3579715,27.1542024 L17,22.601449 L29.3579715,20 Z" id="icon-production" fill="url(#icon-production-gradient)"></path>
            <!-- appEntrance-->
            <linearGradient x1="46.67629%" y1="78.9060125%" x2="45.3981074%" y2="-33.4535256%" id="icon-app-gradient">
              <stop stop-color="#2477D3" offset="0%"></stop>
              <stop stop-color="#DE93EF" offset="100%"></stop>
            </linearGradient>
            <g id="icon-appEntrance" transform="translate(15.000000, 22.000000)">
              <rect id="Rectangle-4" fill="url(#icon-app-gradient)" x="0" y="0" width="30" height="15" rx="3"></rect>
              <circle id="Oval-8" fill="#FFFFFF" cx="6" cy="8" r="3"></circle>
            </g>
            <!--service-->
            <linearGradient x1="46.67629%" y1="78.9060125%" x2="45.3981074%" y2="-33.4535256%" id="service-gradient-1">
              <stop stop-color="#2477D3" offset="0%"></stop>
              <stop stop-color="#DE93EF" stop-opacity="0" offset="100%"></stop>
            </linearGradient>
            <linearGradient x1="97.0770109%" y1="6.08851441%" x2="34.3695712%" y2="74.3440222%" id="service-gradient-2">
              <stop stop-color="#F1E7FF" offset="0%"></stop>
              <stop stop-color="#FEFBFF" stop-opacity="0" offset="100%"></stop>
            </linearGradient>
            <path d="M38.7719867,14.9229323 C38.9319457,14.7736947 39.0726262,14.5078907 38.9584843,14.2723987 C38.8443425,14.0369068 38.4934716,13.9130563 38.3586425,14.0701405 C35.8343698,17.0110722 32.3359008,19.850739 22,24 C32.3359008,20.8623318 36.2067989,17.3161858 38.7719867,14.9229323 Z" id="service-path-3"></path>
            <filter x="-2.9%" y="-5.0%" width="105.9%" height="110.0%" filterUnits="objectBoundingBox" id="filter-4">
              <feGaussianBlur stdDeviation="0.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
              <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
              <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
              <feColorMatrix values="0 0 0 0 0   0 0 0 0 0.79296875   0 0 0 0 1  0 0 0 0.5 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
            </filter>
            <linearGradient x1="50%" y1="100%" x2="50%" y2="50%" id="service-gradient-5">
              <stop stop-color="#4894FF" offset="0%"></stop>
              <stop stop-color="#201A95" offset="100%"></stop>
            </linearGradient>
            <ellipse id="service-path-6" cx="8.66969309" cy="8.67145201" rx="8.66969309" ry="8.67145201"></ellipse>
            <linearGradient x1="50%" y1="50%" x2="50%" y2="100%" id="service-gradient-8">
              <stop stop-color="#4894FF" offset="0%"></stop>
              <stop stop-color="#201A95" offset="100%"></stop>
            </linearGradient>
            <g id="icon-service" transform="translate(8.000000, 15.000000)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Group-40-Copy-2" transform="translate(7.000000, 0.000000)" fill="#191655" opacity="0.5">
                  <ellipse id="Oval" cx="13.7858824" cy="13.7886792" rx="13.7858824" ry="13.7886792"></ellipse>
              </g>
              <ellipse id="Oval-7" stroke="url(#service-gradient-1)" transform="translate(21.500000, 15.500000) rotate(-20.000000) translate(-21.500000, -15.500000) " cx="21.5" cy="15.5" rx="19.5" ry="7.5"></ellipse>
              <g id="Oval-7" fill-rule="nonzero">
                  <use fill="url(#service-gradient-2)" fill-rule="evenodd" xlink:href="#service-path-3"></use>
                  <use fill="black" fill-opacity="1" filter="url(#filter-4)" xlink:href="#service-path-3"></use>
              </g>
              <g id="Oval-3" opacity="0.899999976" transform="translate(12.000000, 5.000000)">
                <mask id="servive-mask-7" fill="white">
                  <use xlink:href="#service-path-6"></use>
                </mask>
                <use id="Mask" fill="url(#service-gradient-5)" xlink:href="#service-path-6"></use>
                <ellipse fill="url(#service-gradient-8)" mask="url(#servive-mask-7)" cx="9.06091807" cy="5.52711963" rx="7.02099028" ry="7.02241471"></ellipse>
              </g>
            </g>
            <!-- memory -->
            <filter x="-44.8%" y="-61.6%" width="189.6%" height="272.4%" filterUnits="objectBoundingBox" id="memory-filter">
              <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0.0262331329   0 0 0 0 0.10533149   0 0 0 0 0.246332908  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <ellipse id="memory-path-1" cx="7.81442052" cy="16.060888" rx="7.81442052" ry="4.06088798"></ellipse>
            <ellipse id="memory-path-2" cx="7.81442052" cy="10.060888" rx="7.81442052" ry="4.06088798"></ellipse>
            <ellipse id="memory-path-3" cx="7.81442052" cy="4.06088798" rx="7.81442052" ry="4.06088798"></ellipse>
            <g id="icon-memory" transform="translate(22.000000, 19.000000)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <use fill="black" fill-opacity="1" filter="url(#memory-filter)" xlink:href="#memory-path-1"></use>
              <use fill="#4387EC" fill-rule="evenodd" xlink:href="#memory-path-1"></use>
              <use fill="black" fill-opacity="1" filter="url(#memory-filter)" xlink:href="#memory-path-2"></use>
              <use fill="#4387EC" fill-rule="evenodd" xlink:href="#memory-path-2"></use>
              <use fill="black" fill-opacity="1" filter="url(#memory-filter)" xlink:href="#memory-path-3"></use>
              <use fill="#4387EC" fill-rule="evenodd" xlink:href="#memory-path-3"></use>
            </g>
            <!-- cloud -->
              <path fill="#4287EC"  fill-rule="nonzero" stroke="none" stroke-width="1" d="M35.4261957,37 L22.464762,36.9963876 C20.5545329,36.9711892 19,35.301311 19,33.2678181 C19,31.4665734 20.2073769,29.9244492 21.8720181,29.5987203 L22.3529126,29.5033012 L22.4240518,28.9886725 C22.6475849,27.3403803 23.4248928,25.8269787 24.611956,24.7238882 C25.8109553,23.6117008 27.3487882,22.9992201 28.9403383,23.0000007 C31.10113,23.0000007 33.0858148,24.1084658 34.3118471,25.9439839 C32.86394,26.2426642 31.5498543,27.1046079 30.6574633,28.3804749 C30.432272,28.7007412 30.4948712,29.1542242 30.7996589,29.3936089 C31.10113,29.6311435 31.5278824,29.564447 31.7530737,29.2441807 C32.6268922,27.9953623 33.9663492,27.2773842 35.4261128,27.2773842 C37.9475754,27.2773842 40,29.4566049 40,32.1378551 C40.0000829,34.8190172 37.9476583,37 35.4261957,37 L35.4261957,37 Z" id="icon-cloud"></path>
            <!-- hotpot -->
            <g id="lineHotPot" transform="translate(-185.000000, -949.000000)" fill="#FECD03">
              <path d="M182.386709,954.441798 C182.637295,949.157512 182.820609,946.32898 183.272849,945.413937 C183.725089,944.498894 183.215137,943.659374 182.386709,943.659374 C181.558282,943.659374 181.169324,944.51138 181.41196,945.234501 C181.654596,945.957622 182.392974,949.052193 182.386709,954.441798 Z" transform="translate(182.391212, 949.050586) rotate(90) scale(2) translate(-182.391212, -949.050586)"></path>
            </g>
          </defs>
      </svg>
    </div>
  </div>
</template>

<script>
  const NODERADIUS = 30 // 节点占位半径
  export default {
    name: 'bs-chart-topological',
    props: {
      nodes: Array,
      links: Array
    },
    data () {
      return {
        // 组件内的全局变量
        svg: null,
        width: 0,
        height: 0,
        _nodes: [],
        _links: []
      }
    },
    mounted () {
      this.createSvg()
      this.dataTransf()

      this.drawNodes()
      this.drawLinks()
    },
    watch: {
      nodes () {
        this.dataTransf()
        this.removeDes()
        this.drawNodes()
        this.drawLinks()
      }
    },
    methods: {
      /**
      * 转成内部状态，防止修改state中的数据引发多余的渲染，同时这里可以在外部做渲染优化（如果最新请求的数据没有更新，则不修改store，不更新视图）
      */
      dataTransf () {
        this._nodes = JSON.parse(JSON.stringify(this.nodes))
        this._links = JSON.parse(JSON.stringify(this.links))
      },
      // 创建svg容器
      createSvg () {
        // 如果没有节点，返回
        let container = this.$refs.graph
        this.width = container.clientWidth
        this.height = container.clientHeight // 这里减去20，防止文本过长，会在底部超出容器
        this.svg = this.$d3.select(container).append('svg')
        this.svg
          .attr('width', this.width)
          .attr('height', this.height)
          .attr('xmlns', 'http://www.w3.org/2000/svg')
          .attr('version', '1.1')
          .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')

        this.linksGroup = this.svg.append('g').attr('class', 'links-group')
        this.nodesGroup = this.svg.append('g').attr('class', 'nodes-group')
      },
      /**
      * 绘制节点
      */
      drawNodes () {
        if (!this._nodes.length) return
        var _nodes = this.setNodePosition(this._nodes);
        // 遍历各级
        _nodes.forEach(levelNodes => {
          // 遍历各级中的节点
          levelNodes.forEach(node => {
            this._addText(this.nodesGroup, node.label, node.x, node.y)
            this._addIcon(this.nodesGroup, node.type, node.x, node.y)
          })
        })
      },
      /**
      * 绘制连线
      */
      drawLinks () {
        this._links.forEach((link,index) => {
          let linkAnchor = this._getLinkAnchor(link)
          let lineId = 'link-' + index
          // 添加连线
          this.linksGroup.append('path')
            .attr('d', () => {
              return 'M' + linkAnchor.start.x + ' ' + linkAnchor.start.y + ' L' + linkAnchor.end.x + ' ' + linkAnchor.end.y 
            })
            .attr('id', lineId)
            .attr('stroke', 'rgba(49,129,231, 0.5)')
            .attr('stroke-width', 1)
          // 添加连线上的热点
          this.linksGroup.append('use')
              .attr('xlink:href', '#lineHotPot')
              .attr('transform', () => {
                const rotate = Math.atan2( (linkAnchor.start.y - linkAnchor.end.y), (linkAnchor.start.x - linkAnchor.end.x)) * 180 / Math.PI + 180
                return 'rotate(' + rotate +')'
              })
              .append('animateMotion')
              .attr('dur', '3s')
              .attr('repeatCount', 'indefinite')
              .append('mpath')
              .attr('xlink:href', '#' + lineId)
        })
      },
      /**
      * 获得连线起始点的锚点坐标
      */
      _getLinkAnchor (link) {
        // 起点: link[0]; 起点所在的级数：link[0][0], 起点所在级数中的序数：link[0][1]
        var start = this._nodes[link[0][0] - 1][link[0][1] - 1]
        var end = this._nodes[link[1][0] - 1][link[1][1] - 1]
        // 起始点之间的距离
        var distance = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
        // 直线之间的夹角
        var delta = Math.asin((end.y - start.y) / distance)

        var startXextra = NODERADIUS * Math.cos(delta)
        var startYExtra = NODERADIUS * Math.sin(delta)
        return {
          start: {
            x: start.x + startXextra,
            y: start.y + startYExtra
          },
          end: {
            x: end.x - startXextra,
            y: end.y - startYExtra
          }
        }
      },
      /**
      * 添加文本
      */
      _addText (container, str, x, y) {
        let fontSize = 12
        let _x = Math.floor(x - this._getStringLenth(str) * fontSize / 4 + 2) // 适当的偏移
        let _y = Math.floor(y + 20)
        container.append('text')
          .attr('x', _x)
          .attr('y', _y)
          .style('font-size', fontSize)
          // .attr('stroke', 'rgba(217, 237, 255, 0.6)')
          .attr('stroke', '#8d9bb4')
          .append('tspan')
          .text(str)
      },
      /**
      * 添加图标
      */
      _addIcon (container, type, x, y) {
        let transform = this._getIconTransformByType(type)
        let _x = x + transform.x
        let _y = y + transform.y
        let _type = '#icon-' + type || 'service'
        container.append('use')
          .attr('xlink:href', _type)
          .attr('x', _x)
          .attr('y', _y)
      },
      /**
      * 计算出节点的位置
      */
      setNodePosition (nodes) {
        nodes.forEach((level, i) => {
          level.forEach((node, j) => {
            // 五个参数分别是：容器的宽度、 总级数、 当前级数、当前级中节点个数、当前级数当前节点的序数
            node.x = this._getNodeTranslateX(this.width, nodes.length, i, level.length, j)
            // 五个参数分别是：容器的宽度、当前级中节点个数、当前级数当前节点的序数
            node.y = this._getNodeTranslateY(this.height, level.length, j)
          })
        })
        return nodes
      },
      /**
      * 获得节点x的偏移量
      */
      _getNodeTranslateX(width, levelLen, LevelIndex, nodeLen, nodeIndex) {
        // 单级节点所占的宽度
        var singleLevelWidth = width / levelLen
        // 单级节点的中心
        var levelCenter = singleLevelWidth / 2
        // 该级左边的宽度
        var translateX = singleLevelWidth * LevelIndex
        var offset = this._getOffSetX(nodeLen, nodeIndex)
        return translateX + levelCenter + offset - 25 // 将整体向左平移10px,确保左右侧节点文本显示完整
      },
      /**
      * 获得节点y的偏移量
      */
      _getNodeTranslateY(height, nodeLen, nodeIndex) {
        // 标准默认偏移量
        var singleLevelHeight = height / nodeLen
        var levelCenter = singleLevelHeight / 2
        var translateY = singleLevelHeight * nodeIndex

        // 分成两列
        if (nodeLen > 4 && nodeLen < 9) {
          var maxRow = Math.ceil(nodeLen / 2) // 向上取整，得到当前最大的行数
          var currentRow = (nodeLen % 2 && nodeIndex % 2) ? (maxRow - 1) : maxRow // 奇数个节点、且为奇数节点，这当前列少一行
          singleLevelHeight = height / currentRow
          levelCenter = singleLevelHeight / 2
          translateY = singleLevelHeight * Math.floor(nodeIndex / 2) // 向下取整，获得当前节点Y轴的整数个单位偏移量
        }

        return translateY + levelCenter
      },
      /**
      * 获得节点相对于中心的x偏移量
      */
      _getOffSetX (length, index) {
        // 小于5个节点，纵向一列
        if (length < 5) {
          return 0
        }
        // 5-8个节点，纵向两列
        else if (length < 9) {
          // 奇数右偏一个半径
          if (index % 2) {
            return -NODERADIUS
          }
          // 偶数坐偏一个半径
          else {
            return NODERADIUS
          }
        }
        // 9-12个节点，纵向三列
        else if (length < 13) {
          // 0、3、6、9 左偏 1.5个半径
          if (index % 3) {
            return -NODERADIUS * 1.5
          }
          // 1、4、7、10 不偏
          else if (index % 3) {
            return 0
          }
          // 2、5、7、11 右偏 1.5个半径
          else {
            return NODERADIUS * 1.5
          }
        }
      },
      /**
      * 获得字符串的字符数
      */
      _getStringLenth (str) {
        return str.replace(/[^x00-xff]/g,"01").length;
      },
      /**
      * 获得节点图表相对于中心的偏移量
      */
      _getIconTransformByType (type) {
        // production | service | cloud | cloud2 |  | dataBase
        let transform = {x: 14, y: -20}
        switch (type) {
          case 'production': transform = {x: -30, y: -34}; break;
          case 'appEntrance': transform = {x: -30, y: -34}; break;
          case 'service': transform = {x: -28, y: -34}; break;
          case 'memory': transform = {x: -30, y: -34}; break;
          case 'cloud': transform = {x: -30, y: -34}; break;
        }
        return transform
      },
      removeDes () {
        var nodes = this.$d3.select('.nodes-group')
        var links = this.$d3.select('.links-group')
        if(nodes) {
          nodes.html('')
        }
        if(links) {
          links.html('')
        }
      }
    }
  } 
</script>

<style scope>
  body {
    background: #000;
  }
  .topological-wrap, .topological-box{
    width: 100%;
    height: 100%;
  }
  .topological-box text {
    font-weight: lighter;
    font-family: 'none';
    fill: none;
  }
</style>