
export default {
  type: 'bs-chart-layout-card',
  attributes: {
    props: {
      title: '友盟用户世界大图',
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
        }
      ]
    }
  ]
}
