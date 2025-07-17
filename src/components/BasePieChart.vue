<template>
  <a-card size="small">
    <v-chart class="chart" :option="option" autoresize />
  </a-card>
</template>

<script setup>
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  GraphicComponent,
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  PieChart,
  GraphicComponent,
  CanvasRenderer,
])

import VChart, { THEME_KEY } from 'vue-echarts'
import { ref, provide, watchEffect } from 'vue'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

provide(THEME_KEY, 'light')

const props = defineProps({
  seriesData: Array,
  chartTitle: String,
  totalData: {
    default: '0',
  },
  unit: {
    type: String,
    default: '',
  },
})

const option = ref({
  color: [
    'rgb(71, 147, 175)',
    'rgb(255, 196, 112)',
    'rgb(221, 87, 70)',
    'rgb(139, 50, 44)',
    'rgb(91, 188, 255)',
    'rgb(126, 161, 255)',
  ],
  title: {
    text: props.chartTitle,
    top: 0,
    left: 'center',
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {},
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: params => {
      return `
      <strong>${params.name}</strong><br/>
      ${params.value.toLocaleString('id-ID')} (${props.unit})
    `
    },
  },
  legend: {
    orient: 'horizontal',
    top: 30,
  },
  series: [
    {
      type: 'pie',
      selectedMode: 'single',
      radius: ['15%', '40%'],
      labelLine: {
        length: 30,
      },
      label: {
        formatter: params => {
          const value = Number(params.value || 0).toLocaleString('id-ID')
          const percent = params.percent?.toFixed(0) || '0'

          return `{value|${value} ${props.unit}} \n{percent|${percent} %}`
        },
        backgroundColor: '#F6F8FC',
        rich: {
          value: {
            fontSize: 12,
            color: '#000',
            padding: [2, 0],
            fontWeight: 'bold',
          },
          percent: {
            fontSize: 12,
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [5, 5],
            borderRadius: 4,
          },
        },
        show: true,
        position: 'outside',
      },
      data: props.seriesData,
    },
  ],
  graphic: [
    {
      type: 'text',
      left: 'center',
      bottom: 30,
      style: {
        text: `Total : ${Number(props.totalData).toLocaleString('id-ID')} ${props.unit}`,
        textAlign: 'center',
        font: 'bold' + ' 14px ' + 'sans-serif',
      },
    },
  ],
})

const updateChart = () => {
  option.value.series[0].data = props.seriesData
  option.value.title.text = props.chartTitle
  option.value.graphic[0].style.text = `Total : ${Number(props.totalData).toLocaleString('id-ID')} ${props.unit}`
}

watchEffect(() => {
  updateChart()
})
</script>

<style scoped>
.chart {
  height: 40vh;
}
</style>
