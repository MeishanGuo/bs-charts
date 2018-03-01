
export default function provinceCountList (origin) {
  return {
    citys: origin.map(city => {
      return {
        name: city.Province,
        value: city.TotalCount,
        log: city.Longitude,
        lat: city.Latitude
      }
    })
  }
}
