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
        v-for="route in permission.routes"
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
import { useRouter, useRoute } from 'vue-router';

import SidebarItem from './SidebarItem.vue';
import Logo from './Logo.vue';
import variables from '@/styles/variables.module.scss';
import useStore from '@/store';


const { app, setting, permission } = useStore();
const route = useRoute();
const router = useRouter();
router.getRoutes()

const defaultActive = ref('/');

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
