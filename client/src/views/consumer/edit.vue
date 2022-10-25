<script lang="ts">
export default {
    name: 'consumer-edit'
};
</script>

<script setup lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { Consumer } from '@/types';
import router from '@/router';
import { createConsumer, editConsumer, getConsumer } from '@/api/consumer';
import { Gender } from '@/utils/enums';

const route = useRoute();

const dataFormRef = ref(ElForm);


const state = reactive({
    formData: {
        gender: Gender.FEMALE
    } as Consumer,
    rules: {
        cardNumber: [
            {
                required: true,
                message: '会员号不能为空',
                trigger: 'blur'
            }
        ],
        name: [
            {
                required: true,
                message: '客户姓名不能为空',
                trigger: 'blur'
            }
        ],
        phone: [
            {
                required: true,
                message: '手机号不能为空',
                trigger: 'blur'
            }
        ]
    },
})

const {
    formData,
    rules,
} = toRefs(state);

function handleCancel() {
    router.go(-1);
}

function handleSubmit() {
    dataFormRef.value.validate((isValid: boolean) => {
        if (isValid) {
            const handler = state.formData.id ? editConsumer : createConsumer;
            handler(state.formData).then(res => {
                ElMessage({
                    type: 'success',
                    message: '操作成功',
                });
                router.go(-1);
            })
        }
    });
}


onMounted(() => {
    const id = route.query.id;
    if (id) {
        getConsumer(Number(id)).then(res => {
            state.formData = res.data;
        })
    }
})

</script>

<template>
    <div class="app-container">
        <el-form ref="dataFormRef" :model="formData" :rules="rules" :validate-on-rule-change="false"
            label-width="120px">
            <el-form-item prop="name" label="客户姓名:">
                <el-input v-model="formData.name" placeholder="请输入客户姓名" />
            </el-form-item>

            <el-form-item prop="cardNumber" label="会员号:">
                <el-input :disabled="formData.id" v-model="formData.cardNumber" placeholder="请输入会员号" />
            </el-form-item>

            <el-form-item prop="phone" label="手机号:">
                <el-input v-model="formData.phone" placeholder="请输入客户手机号" />
            </el-form-item>

            <el-form-item prop="gender" label="性别:">
                <el-select v-model="formData.gender">
                    <el-option label="男" :value="1" />
                    <el-option label="女" :value="0" />
                </el-select>
            </el-form-item>

            <el-form-item prop="balance" :label="formData.id ? '余额:' : '开卡金额:'">
                <el-input :disabled="formData.id" v-model.number="formData.balance" placeholder="请输入开卡金额" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button @click="handleCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>

</style>