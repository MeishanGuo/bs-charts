
export default function userCount (origin) {
  var dataset = (origin || []).map(item => {
    return Object.keys(item).map(key => {
      return item[key]
    })
  })
  if (!dataset.length) {
    dataset = [
      ['暂无用户访问']
    ]
  }
  return dataset
}