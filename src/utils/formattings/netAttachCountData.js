
import { getColor, getDiagramDefaultProps } from '@utils/theme'
import { sortLinesByValue, timeFormat } from '@utils'

export default function netAttachCountData (origin) {
  // 如果有数据
  var _dataset = []
  if (origin && origin.length) {
     origin[0].AttackList.forEach((line, i) => {
      _dataset.push({
        label: line.AttachTypeString,
        points: origin.map((p,j) => {
          return [p.Time, p.AttackList[i].TotalCount]
        })
      })
    })
  }

  _dataset = sortLinesByValue(_dataset)
  _dataset.forEach((line,i) => {
    line.colors = getColor(i)
  })
  let _props = getDiagramDefaultProps()
  _props.dataset = _dataset
  return _props
}
