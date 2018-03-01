export default function mobileDeviceCount (origin) {
  if (origin.length) {
    return origin.map(item => {
      return {
        text: item.DeviceName,
        count: item.TotalCount
      }
    })
  } else {
    return [
      {
        text: 'ios',
        count: 0
      }, {
        text: 'android',
        count: 0
      }
    ]
  }
}