
import { getColor, getDiagramDefaultProps } from '@utils/theme'
import { sortLinesByValue, timeFormat } from '@utils'

export default function averageResponseTime (origin) {
  let _dataset = Object.keys(origin).map((k,i) => {
    return {
      label: k,
      points: Object.keys(origin[k]).map(p => {
        var key = timeFormat(p)
        var val = origin[k][p]
        return [key, val]
      })
    }
  })

  _dataset = sortLinesByValue(_dataset)
  _dataset.forEach((line,i) => {
    line.colors = getColor(i)
  })
  let _props = getDiagramDefaultProps()
  _props.dataset = _dataset
  return _props
}

