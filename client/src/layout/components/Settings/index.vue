<template>
  <div class="drawer-container">
    <h3 class="drawer-title">系统配置</h3>
    <div class="drawer-item">
      <span>主题颜色</span>
      <div style="float: right; height: 26px; margin: -3px 8px 0 0">
        <theme-picker @change="themeChange" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemePicker from '@/components/ThemePicker/index.vue';

import useStore from '@/store';

const { setting } = useStore();

function themeChange(val: any) {
  setting.changeSetting({ key: 'theme', value: val });
}

</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }

  .job-link {
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
