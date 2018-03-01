export default function worldSecurityAttachCountData (origin) {
  var _dataset = (origin || []).map(city => {
    return {
      lat: city.Latitude,
      lng: city.Longitude,
      count: city.TotalCount
    }
  })
  return {
    dataset: _dataset
  }
}