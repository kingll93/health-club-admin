<!--  线 + 柱混合图 -->
<template>
  <div :id="id" :class="className" :style="{ height, width }" />
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue';
import { init, EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import resize from '@/utils/resize';
import { getDailyRecharge } from '@/api/dashboard';

const props = defineProps({
  id: {
    type: String,
    default: 'barChart'
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '200px',
    required: true
  },
  height: {
    type: String,
    default: '200px',
    required: true
  }
});

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function initChart() {
  getDailyRecharge().then(res => {
    const data = res.data;

    const barChart = init(document.getElementById(props.id) as HTMLDivElement);
    barChart.setOption({
      title: {
        show: true,
        text: '充值总览',
        x: 'center',
        top: '5%',
        textStyle: {
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 'bold',
          color: '#337ecc'
        }
      },
      legend: {
        top: '5%'
      },
      grid: {
        top: '18%',
        left: '5%',
        right: '5%',
        bottom: '15%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      xAxis: [
        {
          nameLocation: 'start',
          type: 'category',
          data: data.map(item => item.date),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          name: '单位（元）',
          type: 'value',
          axisLabel: {
            formatter: '{value} '
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside'
        },
        {
          type: 'slider'
        }
      ],
      series: [
        {
          type: 'bar',
          data: data.map(item => item.amount),
          markPoint: {
            data: [{ type: 'max', name: 'Max', symbolSize: value => Math.max((value.toString().length + 1) * 10, 50) }]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#ffba1a' },
              { offset: 0.5, color: '#e1745e' },
              { offset: 1, color: '#f35838' }
            ])
          }
        }
      ]
    } as EChartsOption);
    chart.value = barChart;
  });
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
