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
        show: false,
        text: '消费总览',
        x: 'center',
        padding: 15,
        textStyle: {
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 'bold',
          color: '#337ecc',
        },
      },
      legend: {},
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
          name: '单位（元）',
          type: 'value',
          axisLabel: {
            formatter: '{value} ',
          },
        },
      ],
      series: [
        {
          name: '会员消费',
          type: 'bar',
          data: data.map(item => item.memberConsumption),
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' },
            ]),
          },
        },
        {
          name: '散客消费',
          type: 'bar',
          data: data.map(item => item.guestConsumption),
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
