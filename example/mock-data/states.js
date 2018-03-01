// 组件props
import card from './props/card'
import diagram1 from './props/diagram1'
import diagram2 from './props/diagram2'
import diagram3 from './props/diagram3'
import diagram4 from './props/diagram4'
import diagram5 from './props/diagram5'
import diagram6 from './props/diagram6'
import diagramVerticle from './props/diagram-verticle'
import chinaHotCity from './props/china-hot-city'
import topological from './props/topological'
import browersList from './props/browersList'

import table1 from './props/table1'
import table2 from './props/table2'
import table3 from './props/table3'

// export default  {
//   type: 'bs-chart-layout-card',
//   name: 'mutilTitleCard',
//   attributes: {
//     props: {
//       title: ['功能访问次数监控', '用户访问次数监控'],
//       currentTitleIndex: 0,
//       height:'156px'
//     },
//     slot: 'center-bottom-right'
//   },
//   children: [{
//     type: 'china-map-layout',
//     children: [
//       {
//         type: 'bs-chart-china-map',
//         name: 'provinceCountList',
//         attributes: {
//           props: {
//             citys: chinaHotCity
//           },
//           slot: 'main'
//         }
//       },
//       {
//         type: 'date-tool',
//         attributes: {
//           props: {},
//           slot: 'right-top'
//         }
//       },
//       {
//         type: 'scale-tool',
//         attributes: {
//           props: {},
//           slot: 'left-bottom'
//         }
//       },
//       {
//         type: 'number-with-bg',
//         name: 'tenantCount',
//         attributes: {
//           props: {
//             label: '',
//             count: 872999
//           },
//           slot: 'left-top'
//         }
//       }
//     ]
//   }]
// }

export default {
    type: 'bs-chart-page-layout',
    children: [
      // 头部组件
      {
        type: 'bs-chart-page-header',
        name: 'pageTitle',
        attributes: {
          props: {
            styles: {
              width: '100%',
              height: '370px'
            },
            title: '北京北森云技术股份有限公司鹰眼感知监控'
          },
          slot: 'page-title'
        }
      },
      // 左侧图表
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '全国热度分布',
            styles: {
              width: '100%',
              height: '410px',
                fontSize: 18
            }
          },
          slot: 'left',
        },
        children: [{
          type: 'china-map-layout',
          children: [{
            type: 'bs-chart-china-map',
            name: 'provinceCountList',
            attributes: {
              props: {
                citys: chinaHotCity
              },
              slot: 'main'
            }
          }, {
            type: 'date-tool',
            attributes: {
              props: {},
              slot: 'right-top'
            }
          }, {
            type: 'number-with-bg',
            name: 'tenantCount',
            attributes: {
              props: {
                label: '',
                count: 872
              },
              slot: 'left-top'
            }
          }, {
            type: 'scale-tool',
            attributes: {
              props: {},
              slot: 'left-bottom'
            }
          }]
        }]
      }, 
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '产品可用性监控',
            styles: {
              width: '100%',
              height: '292px'
            }
          },
          slot: 'left'
        },
        children: [{
          type: 'bs-chart-pie',
          name: 'invocationSummary',
          attributes: {
            props: {
              percentage: 99.99
            }
          }
        }]
      },
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: 'SAAS服务可用性监控',
            styles: {
              width: '100%',
              height: '230px'
            }
          },
          slot: 'left'
        },
        children: [{
          name: 'invocationServices',
          type: 'bs-chart-topological',
          attributes: {
            props: {
              nodes: topological.nodes,
              links: topological.links
            }
          }
        }]
      },
      // 中间图表
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '网络攻击世界防御地图',
            styles: {
              fontSize: 20
            }
          },
          slot: 'center-top'
        },
        children: [
          {
            type: 'world-map-layout',
            children: [
              {
                type: 'bs-chart-world-map',
                name: 'worldSecurityAttachCountData',
                attributes: {
                  props: {
                    dataset: [{"lat":39.89945,"lng":116.4096,"count":222881},{"lat":38.907192,"lng":-77.03687,"count":269},{"lat":22.396428,"lng":114.109497,"count":110},{"lat":23.69781,"lng":120.960515,"count":27},{"lat":35.689487,"lng":139.6917,"count":9},{"lat":65.723741,"lng":22.183173,"count":11},{"lat":51.50735,"lng":-0.127758,"count":19},{"lat":50.850339,"lng":4.35171,"count":7},{"lat":52.520006,"lng":13.404954,"count":3},{"lat":13.75633,"lng":100.501765,"count":9},{"lat":22.198745,"lng":113.543873,"count":5},{"lat":-35.281999,"lng":149.128684,"count":6},{"lat":14.59951,"lng":120.984219,"count":2},{"lat":3.139003,"lng":101.686855,"count":6},{"lat":4.771983,"lng":8.500288,"count":1},{"lat":1.352083,"lng":103.819836,"count":1},{"lat":48.856614,"lng":2.352221,"count":1},{"lat":53.510403,"lng":6.074183,"count":1},{"lat":23.471668,"lng":11.999506,"count":1}]
                  },
                  slot: 'main'
                }
              },
              {
                type: 'bs-chart-text-slider',
                name: 'latestAttachData',
                attributes: {
                  props: {
                    dataset: [
                      '恭喜手机尾号为1982的用户，获得IphoneX一台',
                      '恭喜手机尾号为2172的用户，获得Mac Book一台',
                      '恭喜手机尾号为7114的用户，获得小米吸尘器一台',
                      '恭喜手机尾号为1982的用户，获得IphoneX一台',
                      '恭喜手机尾号为1982的用户，获得Mac Book一台',
                    ]
                  },
                  slot: 'bottom'
                }
              }
            ]
          }
        ]
      },
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '终端访问次数监控'
          },
          slot: 'center-bottom-left'
        },
        children: [{
          name: 'userAgentCount',
          type: 'bs-chart-histogram',
          attributes: {
            props: {
              leftData: browersList,
              rightData: [{
                text: 'ios',
                count: 738475
              }, {
                text: 'android',
                count: 345893
              }]
            }
          }
        }]
      },
      {
        type: 'bs-chart-layout-card',
        name: 'mutilTitleCard',
        attributes: {
          props: {
            title: ['功能访问次数监控', '用户访问次数监控', '账号登录实时预警'],
            currentTitleIndex: 0
          },
          slot: 'center-bottom-right'
        },
        children: [{
          name: 'compoundTable',
          type: 'bs-chart-data-grid-slider',
          attributes: {
            props: {
              dataset: [{
                tableName: 'labelCount',
                hasHeader: true,
                rows: table1
              }, {
                tableName: 'userCount',
                hasHeader: true,
                rows: table2
              }, {
                tableName: 'userLoginIllegalData ',
                hasHeader: true,
                rows: table3
              }]
            },
            events: {
              tableSwitchFinished: {
                type: 'changeCardTitle',
                params: {
                  target: 'mutilTitleCard'
                }
              }
            }
          }
        }]
      },
      // 右侧图表
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '用户实时操作行为',
            styles: {
              width: '100%',
              height: '208px'
            }
          },
          slot: 'right'
        },
        children: [{
          name: 'splashViewData',
          type: 'bs-chart-text-printer',
          attributes: {
            props: {
              msgList: [{"time":"16:43","text":"李** 正在使用 \"组织员工-目标管理首页\""},{"time":"16:43","text":"李** 正在使用 \"假勤-我的考勤\""},{"time":"16:43","text":"李** 正在使用 \"假勤-我的考勤\""},{"time":"16:43","text":"李** 正在使用 \"假勤-我的考勤\""},{"time":"16:43","text":"李** 正在使用 \"假勤-我的考勤\""},{"time":"16:43","text":"李** 正在使用 \"假勤-我的考勤\""}]
            }
          }
        }]
      },
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '近7日网络攻击监控',
            styles: {
              width: '100%',
              height: '240px'
            }
          },
          slot: 'right'
        },
        children: [{
          type: 'bs-chart-diagram',
          name: 'netAttachCountData',
          attributes: {
            props: diagram1
          }
        }]
      },
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '客户网络速度监控（最近24小时）',
            styles: {
              width: '100%',
              height: '240px'
            }
          },
          slot: 'right'
        },
        children: [{
          type: 'bs-chart-diagram',
          name: 'averageNewWorkTime',
          attributes: {
            props: diagram2
          }
        }]
      },
      {
        type: 'bs-chart-layout-card',
        attributes: {
          props: {
            title: '功能平均响应时间（最近24小时）',
            styles: {
              width: '100%',
              height: '240px'
            }
          },
          slot: 'right'
        },
        children: [{
          name: 'averageResponseTime',
          type: 'bs-chart-diagram',
          attributes: {
            props: diagram3
          }
        }]
      },
      // 底部组件
      {
        type: 'bs-chart-page-footer',
        name: 'pageFooter',
        attributes: {
          props: {
            text: ''
          },
          slot: 'page-footer'
        }
      }
    ]
}
