<!--  线 + 柱混合图 -->
<template>
  <div :class="className">
    <el-date-picker
      @change="changeDate"
      v-model="dateRange"
      style="margin: 20px 0 0 20px"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      type="daterange"
      :shortcuts="shortcuts"
      unlink-panels
      value-format="YYYY-MM-DD"
    />
    <div :id="id" :style="{ height, width }" />
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue';
import { init, EChartsOption } from 'echarts';
import resize from '@/utils/resize';
import { getConsumptionCategory } from '@/api/dashboard';
import { ConsumptionTypeMap } from '@/utils/enums';

import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/zh-cn';

dayjs.extend(weekday);
dayjs.locale('zh-cn');

const props = defineProps({
  id: {
    type: String,
    default: 'pieChart'
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

const dateRange = ref([dayjs().startOf('month').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);
const shortcuts = [
  {
    text: '本周',
    value: [dayjs().startOf('week'), dayjs()]
  },
  {
    text: '本月',
    value: [dayjs().startOf('month'), dayjs()]
  },
  {
    text: '本年',
    value: [dayjs().startOf('year'), dayjs()]
  }
];

const { mounted, chart, beforeDestroy, activated, deactivated } = resize();

function changeDate(dateRange: [string, string] | null) {
  if (chart.value) {
    getConsumptionCategory({
      startTime: dateRange ? dateRange[0] : undefined,
      endTime: dateRange ? dateRange[1] : undefined
    }).then(res => {
      const data = res.data;
      chart.value.setOption({
        series: [
          {
            type: 'pie',
            radius: 80,
            center: ['25%', '60%'],
            data: data.map(item => ({
              value: item.amount,
              name: ConsumptionTypeMap[item.type]
            }))
          },
          {
            type: 'pie',
            radius: 80,
            center: ['75%', '60%'],
            data: data.map(item => ({
              value: item.count,
              name: ConsumptionTypeMap[item.type]
            })),
            datasetIndex: 2
          }
        ]
      });
    });
  }
}

function initChart() {
  getConsumptionCategory({
    startTime: dateRange.value[0],
    endTime: dateRange.value[1]
  }).then(res => {
    const data = res.data;

    const pieChart = init(document.getElementById(props.id) as HTMLDivElement);
    pieChart.setOption({
      title: [
        {
          text: '消费金额（元）',
          top: '18%',
          left: '25%',
          textAlign: 'center'
        },
        {
          text: '消费人次（次）',
          top: '18%',
          left: '75%',
          textAlign: 'center'
        }
      ],
      legend: {
        top: '5%'
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: 80,
          center: ['25%', '60%'],
          data: data.map(item => ({
            value: item.amount,
            name: ConsumptionTypeMap[item.type]
          }))
        },
        {
          type: 'pie',
          radius: 80,
          center: ['75%', '60%'],
          data: data.map(item => ({
            value: item.count,
            name: ConsumptionTypeMap[item.type]
          })),
          datasetIndex: 2
        }
      ]
    } as EChartsOption);
    chart.value = pieChart;
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
