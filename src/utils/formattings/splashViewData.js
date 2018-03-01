

export default function splashViewData (origin) {
  const msgList = origin.map(item => {
    return {
      time: item.Times || '',
      text: item.Message || ''
    }
  })
  return {
    msgList: msgList
  }
}