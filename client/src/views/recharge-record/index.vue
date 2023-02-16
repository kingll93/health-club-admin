<script lang="ts">
export default {
  name: 'recharge-record'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref, watch, nextTick } from 'vue';
import { ElForm, ElMessageBox, ElMessage } from 'element-plus';
import { RechargeRecord, RechargeRecordQueryParam } from '@/types';
import { Search, Refresh } from '@element-plus/icons-vue';
import { getRechargeRecordList, deleteRechargeRecord } from '@/api/recharge-record';
import { printRecharge } from '@/utils/print';

// 属性名必须和元素的ref属性值一致
const queryFormRef = ref(ElForm);

const state = reactive({
  loading: false,
  dateRange: null as null | string[],
  queryParams: {
    page: 1,
    pageSize: 10
  } as RechargeRecordQueryParam,
  list: [] as RechargeRecord[],
  total: 0
});

const { loading, dateRange, queryParams, list, total } = toRefs(state);

watch(dateRange, newValue => {
  if (newValue) {
    state.queryParams.startTime = newValue[0];
    state.queryParams.endTime = newValue[1];
  } else {
    delete state.queryParams.startTime;
    delete state.queryParams.endTime;
  }
});

function handleQuery() {
  state.loading = true;
  getRechargeRecordList(state.queryParams).then(({ data }) => {
    state.list = data.list;
    state.total = data.total;
    state.loading = false;
  });
}

function resetQuery() {
  state.dateRange = null;
  nextTick(() => {
    queryFormRef.value.resetFields();
    handleQuery();
  });
}

function handlePrint(row: RechargeRecord) {
  printRecharge({
    orderNum: row.orderNum,
    createTime: row.createTime,
    consumerName: row.consumerName,
    amount: row.amount + '',
    balance: row.balance + ''
  });
}

function handleDelete(row: RechargeRecord) {
  ElMessageBox.confirm('您正在执行删除订单操作，删除后，将无法恢复数据。确认要删除吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      deleteRechargeRecord(row.id).then(() => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        handleQuery();
      });
    })
    .catch(() => {});
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
        <el-date-picker v-model="dateRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="dataTable" v-loading="loading" :data="list">
      <el-table-column prop="orderNum" label="订单号" />
      <el-table-column prop="consumerName" label="顾客姓名" />
      <el-table-column prop="amount" label="充值金额" />
      <el-table-column prop="balance" label="本次充值后余额" />
      <el-table-column prop="createTime" label="充值时间" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="userName" label="操作人" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button text type="primary" @click="handlePrint(scope.row)">打印</el-button>
          <el-button text type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页工具条 -->
    <pagination v-if="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
  </div>
</template>

<style lang="scss" scoped></style>
