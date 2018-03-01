
export default function notificationData (origin) {
  return {
    text: origin && origin.Message || '鹰眼感知监控大屏欢迎您！'
  }
}