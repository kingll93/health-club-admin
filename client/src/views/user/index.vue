<script lang="ts">
export default {
  name: 'user'
};
</script>
<script setup lang="ts">
import { reactive, toRefs, ref, onMounted } from 'vue';
import { ElForm, ElMessageBox, ElMessage } from 'element-plus';
import { Position, Search, Refresh } from '@element-plus/icons-vue';
import { UserQueryParam, User } from '@/types';
import { getUserList, updateUser } from '@/api/user';
import { UserStatus } from '@/utils/enums';
import router from '@/router';

const queryFormRef = ref(ElForm);

const state = reactive({
  loading: false,
  queryParams: {
    page: 1,
    pageSize: 10
  } as UserQueryParam,
  list: [] as User[],
  total: 0
});

const { loading, queryParams, list, total } = toRefs(state);

function handleAdd() {
  router.push('/user-add');
}

function handleQuery() {
  state.loading = true;
  getUserList(state.queryParams).then(({ data }) => {
    state.list = data.list;
    state.total = data.total;
    state.loading = false;
  });
}

function resetQuery() {
  queryFormRef.value.resetFields();
  handleQuery();
}

function handleChangePassword(row: User) {
  ElMessageBox.prompt('请输入新密码', '提示', {
    inputType: 'password',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /.{6,12}/,
    inputErrorMessage: '密码长度在6-12位之间'
  }).then(({ value }) => {
    if (!value.trim()) {
      return;
    }
    updateUser({ id: row.id, password: value.trim() }).then(() => {
      ElMessage({
        type: 'success',
        message: '操作成功'
      });
    });
  });
}

function handleChangeStatus(row: User) {
  const status = row.status === UserStatus.ENABLED ? UserStatus.DISABLED : UserStatus.ENABLED;
  ElMessageBox.confirm(`是否要${status === UserStatus.ENABLED ? '启用' : '禁用'}该用户?`, '提示', {
    type: 'warning'
  })
    .then(() => {
      updateUser({
        id: row.id,
        status
      }).then(res => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        row.status = status;
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
      <el-form-item>
        <el-button type="success" :icon="Position" @click="handleAdd">新增用户</el-button>
      </el-form-item>

      <el-form-item prop="name">
        <el-input v-model="queryParams.name" placeholder="姓名" clearable />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="Search" @click="handleQuery">查询</el-button>
        <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table ref="dataTable" v-loading="loading" :data="list">
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === UserStatus.ENABLED ? 'success' : 'danger'">
            {{ scope.row.status === UserStatus.ENABLED ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template #default="scope">
          <el-button text type="primary" @click="handleChangePassword(scope.row)">修改密码</el-button>
          <el-button text type="primary" @click="handleChangeStatus(scope.row)">{{ scope.row.status === UserStatus.ENABLED ? '禁用' : '启用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页工具条 -->
    <pagination v-if="total > 0" :total="total" v-model:page="queryParams.page" v-model:limit="queryParams.pageSize" @pagination="handleQuery" />
  </div>
</template>
<style lang="scss" scoped></style>
