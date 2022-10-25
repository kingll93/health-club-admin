<script lang="ts">
export default {
  name: 'consumption-record'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ElForm } from 'element-plus';
import { ConsumptionRecord, ConsumptionRecordQueryParam } from '@/types';
import { Search, Refresh } from '@element-plus/icons-vue';
import { getConsumptionRecordList } from '@/api/consumption-record';
import { ConsumptionTypeMap, HairTypeMap } from '../consumer/index.vue';

// 属性名必须和元素的ref属性值一致
const queryFormRef = ref(ElForm);

const state = reactive({
  loading: false,
  dateRange: null,
  queryParams: {
    page: 1,
    pageSize: 10
  } as ConsumptionRecordQueryParam,
  list: [] as ConsumptionRecord[],
  total: 0,
});

const { loading, dateRange, queryParams, list, total } = toRefs(state);

function handleQuery() {
  if (state.dateRange) {
    state.queryParams.startTime = state.dateRange[0];
    state.queryParams.endTime = state.dateRange[1];
  }
  state.loading = true;
  getConsumptionRecordList(state.queryParams).then(({ data }) => {
    state.list = data.list;
    state.total = data.total;
    state.loading = false;
  });
}

function resetQuery() {
  state.dateRange = null;
  delete state.queryParams.startTime;
  delete state.queryParams.endTime;
  queryFormRef.value.resetFields();
  handleQuery();
}

onMounted(() => {
  handleQuery();
});

</script>

<template>
  <div class="app-container">
    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
      <el-form-item prop="consumerName">
        <el-input v-model="queryParams.consumerName" placeholder="顾客姓名" clearable />
      </el-form-item>

      <el-form-item prop="userName">
        <el-input v-model="queryParams.userName" placeholder="操作人" clearable />
      </el-form-item>

      <el-form-item>
        <el-date-picker v-model="dateRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="dataTable" v-loading="loading" :data="list">
      <el-table-column prop="consumerName" label="顾客姓名" />
      <el-table-column prop="consumptionType" label="消费类型">
        <template #default="scope">
          <span>{{ ConsumptionTypeMap[scope.row.consumptionType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hairType" label="头发类型">
        <template #default="scope">
          <span>{{ HairTypeMap[scope.row.hairType] }}</span>
        </template>
      </el-table-column>>
      <el-table-column prop="amount" label="充值金额" />
      <el-table-column prop="createTime" label="消费时间" />
      <el-table-column prop="userName" label="操作人" />
    </el-table>

    <!-- 分页工具条 -->
    <pagination v-if="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize"
      @pagination="handleQuery" />
  </div>
</template>

<style lang="scss" scoped>

</style>