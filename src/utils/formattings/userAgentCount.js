export default function userAgentCount (origin) {
  return origin.map(item => {
    return {
      label: item.UserAgentType,
      count: item.TotalCount
    }
  })
}