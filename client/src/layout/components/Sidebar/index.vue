<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-menu
      :defaultActive="defaultActive"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item
        v-for="route in menus"
        :item="route"
        :key="route.path"
        :base-path="'/'"
        :is-collapse="isCollapse"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import variables from '@/styles/variables.module.scss';
import useStore from '@/store';

import { constantRoutes } from '@/router';

const { app, setting } = useStore();
const route = useRoute();

const defaultActive = ref('/');
const menus = ref(constantRoutes.find(route => route.path === '/')?.children || []);

const showLogo = computed(() => setting.sidebarLogo);
const isCollapse = computed(() => !app.sidebar.opened);


watch(
  route,
  () => {
    if (route.meta.activeMenu) {
      defaultActive.value = route.meta.activeMenu as string;
    } else {
      defaultActive.value = route.path;
    }
  },
  {
    immediate: true
  }
);
</script>
