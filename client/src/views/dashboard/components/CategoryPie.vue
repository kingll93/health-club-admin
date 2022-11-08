<!--  线 + 柱混合图 -->
<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import {
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
} from 'vue';
import { init, EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import resize from '@/utils/resize';
import { getDailyConsumption } from '@/api/dashboard';
import { da } from 'element-plus/es/locale';

const props = defineProps({
  id: {
    type: String,
    default: 'barChart',
  },
  className: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '200px',
    required: true,
  },
  height: {
    type: String,
    default: '200px',
    required: true,
  },
});

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function initChart() {
  getDailyConsumption().then(res => {
    const data = res.data;

    const barChart = init(document.getElementById(props.id) as HTMLDivElement);
    barChart.setOption({
      title: {
        show: true,
        text: '消费量总览',
        x: 'center',
        padding: 15,
        textStyle: {
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 'bold',
          color: '#337ecc',
        },
      },
      grid: {
        left: '2%',
        right: '2%',
        bottom: '10%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      xAxis: [
        {
          nameLocation: 'start',
          type: 'category',
          data: data.map(item => item.date),
          axisPointer: {
            type: 'shadow',
          },
        },
      ],
      yAxis: [
        {
          name: '单位（次）',
          type: 'value',
          interval: 2000,
          axisLabel: {
            formatter: '{value} ',
          },
        },
      ],
      series: [
        {
          type: 'line',
          data: data.map(item => item.count),
          barWidth: 20,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#25d73c' },
              { offset: 0.5, color: '#1bc23d' },
              { offset: 1, color: '#179e61' },
            ]),
          },
        },
      ],
    } as EChartsOption);
    chart.value = barChart;
  })
}

onBeforeUnmount(() => {
  beforeDestroy();
});

onActivated(() => {
  activated();
});

onDeactivated(() => {
  deactivated();
});

onMounted(() => {
  mounted();
  initChart();
});
</script>
