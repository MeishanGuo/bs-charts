export default function invocationServices (origin = []) {
  let _nodes = []
  let _links = []

  origin.forEach((node) => {
    // // 生成连线
    (node.Links || []).forEach(link => {
      _links.push([
        node.Source, link
      ])
    })

    var currentLevel = Number(node.Source[0]) - 1
    // 生成节点
    if(! _nodes[currentLevel] ) {
      _nodes.push([])
    }
    var _node = {
      label: node.ServiceName,
      type: node.Type
    }
    _nodes[currentLevel]['push'](_node)
  })
  return {
    nodes: _nodes,
    links: _links
  }
}