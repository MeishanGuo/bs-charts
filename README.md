<p align="center">
  <img src="http://gitlab.beisencorp.com/ux-cnpm/bs-charts/blob/master/static/bs-chart-logo.png">
</p>

# BSChart


> A Vue.js 2.0 Charts Library for Web.

## Links

## Install
```shell
npm install @beisen/bs-chart
```

## Quick Start
``` javascript
import Vue from 'vue'
import BSChart from '@beisen/bs-chart'

Vue.use(BSChart)

// or

import Vue from 'vue'
import BSChart from '@beisen/bs-chart'

const { components } = BSChart
const myChartList = ['bs-chart-china-map', 'bs-chart-world-map', 'bs-chart-diagram', ...]
myChartList.forEach((chart) => {
  Vue.component(chart.name, chart)
})
```
For more information, contact <guomeishan@beisen.com>

## Browser Support
Modern browsers and Internet Explorer 10+.

## Development
Skip this part if you just want to use BSChart.

## Changelog
Detailed changes for each release are documented in the [activity](http://gitlab.beisencorp.com/ux/ux-hawkeye-surveillance/activity).

## FAQ
We have collected some [frequently asked questions](http://gitlab.beisencorp.com/ux/ux-hawkeye-surveillance/issues/). Before reporting an issue, please search if the FAQ has the answer to your problem.

## Contribution

## Donation

## Backers

## Sponsors

## LICENSE
MIT
