<script lang="ts">
export default {
  name: 'user-add'
};
</script>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { CreateUserParam } from '@/types';
import router from '@/router';
import { createUser } from '@/api/user';

const dataFormRef = ref(ElForm);

const state = reactive({
  formData: {} as CreateUserParam,
  rules: {
    name: [
      {
        required: true,
        message: '用户姓名不能为空',
        trigger: 'blur'
      }
    ],
    account: [
      {
        required: true,
        message: '账号不能为空',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur'
      }
    ]
  }
});

const { formData, rules } = toRefs(state);

function handleCancel() {
  router.go(-1);
}

function handleSubmit() {
  dataFormRef.value.validate((isValid: boolean) => {
    if (isValid) {
      createUser(state.formData).then(res => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        router.go(-1);
      });
    }
  });
}
</script>

<template>
  <div class="app-container">
    <el-form ref="dataFormRef" :model="formData" :rules="rules" :validate-on-rule-change="false" label-width="120px">
      <el-form-item prop="name" label="用户姓名:">
        <el-input v-model="formData.name" placeholder="请输入用户姓名" />
      </el-form-item>

      <el-form-item prop="account" label="账号:">
        <el-input v-model="formData.account" placeholder="请输入用户账号" />
      </el-form-item>

      <el-form-item prop="password" label="密码:">
        <el-input v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
