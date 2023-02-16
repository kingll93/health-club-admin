<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="today-datas">今日消费总消费：{{todayStatistic.guestConsumption + todayStatistic.memberConsumption}}元，会员消费：{{todayStatistic.memberConsumption}}元，散客消费：{{todayStatistic.guestConsumption}}元；总充值：{{todayStatistic.memberRechange}}元。</div>

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!--        <search id="header-search" class="right-menu-item" />
                  <error-log class="errLog-container right-menu-item hover-effect" />-->
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="https://s2.loli.net/2022/04/07/gw1L2Z5sPtS8GIl.gif?imageView2/1/w/80/h/80" class="user-avatar" />
          <CaretBottom style="width: 0.6em; height: 0.6em; margin-left: 5px" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="user?.info?.role === UserType.ADMIN" divided @click="handleCreateUser">
              创建用户
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleChangePassword">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <register ref="registerComp"></register>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { changePassword } from '@/api/login';
import useStore from '@/store';
import { UserType } from '@/utils/enums';

// 组件依赖
import Hamburger from '@/components/Hamburger/index.vue';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Screenfull from '@/components/Screenfull/index.vue';
import SizeSelect from '@/components/SizeSelect/index.vue';
import Register from './Register.vue';

// 图标依赖
import { CaretBottom } from '@element-plus/icons-vue';

const registerComp = ref<InstanceType<typeof Register> | null>(null);

const { app, user } = useStore();

const route = useRoute();
const router = useRouter();

const sidebar = computed(() => app.sidebar);
const device = computed(() => app.device);
const todayStatistic = computed(() => app.todayStatistic);

function toggleSideBar() {
  app.toggleSidebar();
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    user
      .logout()
      .then(() => {
        router.push(`/login?redirect=${route.fullPath}`);
      });
  });
}

function handleCreateUser() {
  registerComp.value?.show();
}

function handleChangePassword() {
  ElMessageBox.prompt('请输入新密码', '提示', {
    inputType: 'password',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    // inputErrorMessage: '邮箱格式不正确'
  }).then(({ value }) => {
    if (!value.trim()) {
      return
    }
    changePassword({
      password: value.trim()
    }).then(() => {
      ElMessage({
        type: 'success',
        message: '修改成功,请重新登录'
      });
      user
        .logout()
        .then(() => {
          router.push(`/login?redirect=${route.fullPath}`);
        });
    })
  })
}

onMounted(() => {
  app.getTodayStatistic();
  user.getUserInfo();
});
</script>
  
<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar {
  display: flex;
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  border-bottom: 1px solid #d8dce5;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
  }

  .today-datas {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--el-color-primary);
  }

  .right-menu {
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
  