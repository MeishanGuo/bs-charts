
export default function labelCount (origin) {
  var dataset = (origin || []).map(item => {
    return Object.keys(item).map(key => {
      return item[key]
    })
  })
  if (!dataset.length) {
    dataset = [
      ['暂无数据']
    ]
  }
  return dataset
}
