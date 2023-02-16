<template>
  <el-dialog v-model="visible" title="创建用户" width="30%" :before-close="handleClose">
    <el-form ref="registeFormRef" label-width="80px" :model="formData" :rules="rules" class="login-form">
      <el-form-item prop="account" label="用户账号">
        <el-input v-model="formData.account" placeholder="请输入用户账号" type="text" />
      </el-form-item>
      <el-form-item prop="name" label="用户姓名">
        <el-input ref="name" v-model="formData.name" placeholder="请输入用户姓名" type="text" />
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input v-model="formData.password" placeholder="请输入密码" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { RegisterFormData } from '@/types';
import { register } from '@/api/login';

const registeFormRef = ref(ElForm);

const state = reactive({
  visible: false,
  formData: {} as RegisterFormData,
  rules: {
    account: [
      {
        required: true,
        message: '用户账号不能为空',
        trigger: 'blur'
      }
    ],
    name: [
      {
        required: true,
        message: '用户姓名不能为空',
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

const { visible, formData, rules } = toRefs(state);

function confirm() {
  registeFormRef.value.validate((valid: boolean) => {
    if (valid) {
      register(state.formData).then(res => {
        ElMessage({
          type: 'success',
          message: '操作成功'
        });
        registeFormRef.value.resetFields();
      });
    }
  });
}

function handleClose() {
  state.visible = false;
  registeFormRef.value.resetFields();
}

function show() {
    state.visible = true;
}

defineExpose({
    show
})
</script>
<style lang="scss" scoped></style>
