
export default function userLoginIllegalData (origin) {
  var dataset = (origin || []).map(item => {
    return Object.keys(item).map(key => {
      return item[key]
    })
  })
  if (!dataset.length) {
    dataset = [
      ['暂无预警信息']
    ]
  }
  return dataset
}