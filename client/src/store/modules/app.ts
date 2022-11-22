import { AppState } from '@/types';
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
import { TodayStatistic } from '@/types';
import { getTodayStatistic } from '@/api/dashboard';

const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: localStorage.get('sidebarStatus')
        ? !!+localStorage.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    size: localStorage.get('size') || 'default', // 'default' 'small' 'large'
    todayStatistic: {} as TodayStatistic
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', 1);
      } else {
        localStorage.set('sidebarStatus', 0);
      }
    },
    closeSideBar(withoutAnimation: any) {
      localStorage.set('sidebarStatus', 0);
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
      localStorage.set('size', size);
    },
    getTodayStatistic() {
      getTodayStatistic().then(res => {
        this.todayStatistic = res.data;
      })
    }
  }
});

export default useAppStore;
