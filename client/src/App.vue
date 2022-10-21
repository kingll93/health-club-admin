<template>
  <el-config-provider :locale="zhCn" :size="size">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElConfigProvider } from 'element-plus';
import zhCn from "element-plus/lib/locale/lang/zh-cn"

import useStore from '@/store';

const { app } = useStore();

const size: any = computed(() => app.size);

</script>
