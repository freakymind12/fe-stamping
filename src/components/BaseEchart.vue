<template>
  <a-card size="small">
    <v-chart :option="option" :style="{ height: height + 'px' }" autoresize />
  </a-card>
</template>

<script setup>
import { use } from 'echarts/core'
import { LineChart, BarChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { ref, provide, watchEffect } from 'vue'
import VChart, { THEME_KEY } from 'vue-echarts'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  GridComponent,
  LineChart,
  ScatterChart,
  BarChart,
  CanvasRenderer,
])

provide(THEME_KEY, 'light')

const yformat = function (value) {
  var newValue = value
  if (value >= 1000000000) {
    newValue = (value / 1000000000).toFixed(0) + 'B'
  } else if (value >= 1000000) {
    newValue = (value / 1000000).toFixed(0) + 'M'
  } else if (value >= 1000) {
    newValue = (value / 1000).toFixed(0) + 'K'
  }
  return newValue
}

const labelFormatter = function (value) {
  if (value.data === 0) {
    return '' // Tidak menampilkan angka bila nilainya 0
  }
  if (value.data >= 1e9) {
    return (value.data / 1e9).toFixed(1) + 'B' // Miliar
  } else if (value.data >= 1e6) {
    return (value.data / 1e6).toFixed(1) + 'M' // Jutaan
  } else if (value.data >= 1e3) {
    return (value.data / 1e3).toFixed(1) + 'K' // Ribuan
  } else {
    return value.data // Angka normal
  }
}

const props = defineProps({
  height: {
    type: Number,
    default: 300,
  },
  title: {
    type: String,
    default: 'Title Chart',
  },
  xAxisName: {
    type: String,
    default: 'X Axis Title',
  },
  yAxisName: {
    type: String,
    default: null,
  },
  xAxisData: {
    type: Array,
    default: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  seriesName: {
    type: Array,
    default: () => ['In', 'Out'],
  },
  seriesData: {
    type: Array,
    default: () => [
      [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 2, 4],
      [2, 1, 4, 5, 2, 2, 1, 4, 5, 2, 5, 3],
    ],
  },
  seriesType: {
    type: Array,
    default: () => ['line', 'line'],
  },
  titleSize: {
    type: Number,
    default: 18,
  },
  showLabelSeries: {
    type: Boolean,
    default: false,
  },
  seriesColor: {
    type: Array,
    default: () => ['#2EAA8D', '#DC1A21', '#006CE3', '#EA9500'],
  },
  toolbox: {
    type: Boolean,
    default: false,
  },
  dataZoom: {
    type: Boolean,
    default: false,
  },
  grid: {
    type: Object,
    default: () => ({
      left: '10%',
      right: '4%',
    }),
  },
  legendOrient: {
    type: String,
    default: 'horizontal',
  },
})

const option = ref({
  color: props.seriesColor,
  title: {
    text: props.title,
    textStyle: {
      fontSize: props.titleSize,
    },
  },
  toolbox: {
    show: props.toolbox,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
      },
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: props.grid.left,
    right: props.grid.right,
    bottom: props.dataZoom ? '25%' : '10%',
    containLabel: true,
  },
  legend: {
    data: props.seriesName,
    right: '0%',
    orient: props.legendOrient,
  },
  xAxis: {
    name: props.xAxisName,
    type: 'category',
    boundaryGap: true,
    data: props.xAxisData,
    nameLocation: 'middle',
    nameGap: 25,
  },
  yAxis: [
    {
      name: props.yAxisName,
      type: 'value',
      splitLine: {
        show: false,
      },
      min: 0,
      nameLocation: 'middle',
      nameGap: 40,
      axisLabel: {
        formatter: yformat,
        fontSize: 12,
      },
    },
  ],
  series: [],
  ...(props.dataZoom && {
    dataZoom: [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: 'inside',
        start: 0,
        end: 20,
      },
    ],
  }),
})

const updateChart = () => {
  // Reset option.value.series
  option.value.series = []
  option.value.legend.data = props.legend
  option.value.title.text = props.title
  option.value.xAxis.data = props.xAxisData
  option.value.yAxis[0].name = props.yAxisName

  if (props.dataZoom) {
    option.value.dataZoom = [
      {
        type: 'slider',
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: 'inside',
        start: 0,
        end: 20,
      },
    ]
  } else {
    delete option.value.dataZoom
  }

  // Loop through props.seriesData and push each series to option.value.series
  props.seriesData.forEach((data, index) => {
    option.value.series.push({
      name: props.seriesName[index], // Use seriesName prop for series name
      type: props.seriesType[index], // Assuming the type is always 'line'
      lineStyle: {
        width: 5,
      },
      label: {
        show: props.showLabelSeries,
        formatter: labelFormatter,
        fontSize: 10,
      },
      emphasis: {
        focus: 'series',
      },
      smooth: true,
      data: data, // Use the data from props.seriesData
    })
  })
}

watchEffect(() => {
  updateChart()
})
</script>
