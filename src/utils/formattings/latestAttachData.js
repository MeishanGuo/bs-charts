
export default function latestAttachData (origin) {
  return origin.map(msg => {
    return msg.Time + ' ' + msg.Message
  })
}