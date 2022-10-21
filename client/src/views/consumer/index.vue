<script lang="ts">
export const CardTypeMap = {
  1: '8折卡',
  2: '7折卡',
  3: '6折卡',
  4: '5折卡'
}

export default {
  name: 'consumer'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ElForm, ElMessageBox, ElMessage } from 'element-plus';
import { ConsumerQueryParam, Consumer, ConsumerRechargeParam, Dialog } from '@/types';
import { Position, Search, Refresh } from '@element-plus/icons-vue';
import { getConsumerList, deleteConsumer } from '@/api/consumer';
import { recharge } from '@/api/recharge-record';
import router from '@/router';

// 属性名必须和元素的ref属性值一致
const queryFormRef = ref(ElForm);
const rechargeFormRef = ref(ElForm);

const state = reactive({
  loading: false,
  dateRange: null,
  queryParams: {
    page: 1,
    pageSize: 10
  } as ConsumerQueryParam,
  list: [] as Consumer[],
  total: 0,
  dialog: {
    visible: false,
    title: ''
  } as Dialog,
  currentConsumer: {} as Consumer,
  rechargeForm: {} as ConsumerRechargeParam
});

const { loading, dateRange, queryParams, list, total, dialog, currentConsumer, rechargeForm } = toRefs(state);

function handleAdd() {
  router.push('/consumer-add');
}

function handleEdit(row: Consumer) {
  router.push({
    path: '/consumer-edit',
    query: {
      id: row.id
    }
  });
}

function handleQuery() {
  if (state.dateRange) {
    state.queryParams.startTime = state.dateRange[0];
    state.queryParams.endTime = state.dateRange[1];
  }
  state.loading = true;
  getConsumerList(state.queryParams).then(({ data }) => {
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

function handleDelete(row: Consumer) {
  ElMessageBox.confirm('您正在执行删除客户操作，删除后，将无法恢复数据。确认要删除吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      deleteConsumer(row.id).then(() => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        handleQuery();
      });
    })
    .catch(() => { });
}

function handleRecharge(row: Consumer) {
  state.currentConsumer = row;
  state.dialog = {
    visible: true,
    title: '充值'
  }
}

function handleRechargeConfirm() {
  rechargeFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      state.rechargeForm.consumerId = state.currentConsumer.id;
      recharge(state.rechargeForm).then(res => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        handleCloseDialog();
        handleQuery();
      })
    }
  })
}

function handleCloseDialog() {
  rechargeFormRef?.value?.resetFields();
  state.dialog = {
    visible: false,
    title: ''
  }
}

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="app-container">
    <el-form ref="queryFormRef" :model="queryParams" :inline="true">
      <el-form-item>
        <el-button type="success" :icon="Position" @click="handleAdd">新增客户</el-button>
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="queryParams.name" placeholder="姓名" />
      </el-form-item>

      <el-form-item prop="phone">
        <el-input v-model="queryParams.phone" placeholder="手机号" />
      </el-form-item>

      <el-form-item prop="gender">
        <el-select v-model="queryParams.gender" placeholder="性别" clearable>
          <el-option label="男" :value="1" />
          <el-option label="女" :value="0" />
        </el-select>
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
      <el-table-column prop="cardNumber" label="会员号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column label="性别">
        <template #default="scope">
          <span>{{ scope.row.gender === 0 ? '女' : '男' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="会员类型">
        <template #default="scope">
          <span>{{ CardTypeMap[scope.row.cardType as Consumer['cardType'] || 1]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="已消费金额" />
      <el-table-column prop="balance" label="余额" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="操作" min-width="150">
        <template #default="scope">
          <el-button text type="primary" @click="handleRecharge(scope.row)">充值</el-button>
          <el-button text type="primary" @click="handleDelete(scope.row)">消费</el-button>
          <el-button text type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button text type="primary" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页工具条 -->
    <pagination v-if="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize"
      @pagination="handleQuery" />

    <!-- 充值弹窗 -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" @close="handleCloseDialog">
      <el-form ref="rechargeFormRef" :model="rechargeForm" label-width="100px">
        <el-form-item label="姓名:">
          <el-input disabled :value="currentConsumer.name" />
        </el-form-item>
        <el-form-item label="当前余额:">
          <el-input disabled :value="currentConsumer.balance" />
        </el-form-item>
        <el-form-item prop="amount" label="充值金额:" :rules="[
          { required: true, message: '充值金额不能为空', trigger: 'blur' },
          { type: 'number', message: '金额必须为数字值', trigger: 'blur'}
        ]">
          <el-input v-model.number="rechargeForm.amount" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRechargeConfirm">确定</el-button>
          <el-button @click="handleCloseDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>
