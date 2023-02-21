import { defineStore } from 'pinia';
import { PermissionState } from '@/types';
import { UserRole } from '@/utils/enums';
import router, { businessRoutes } from '@/router';

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: []
  }),
  getters: {},
  actions: {
    async RESET_STATE() {
      this.$reset();
    },

    generateRoutes(role: UserRole): Promise<PermissionState['routes']> {
      return new Promise((resolve, reject) => {
        this.routes = businessRoutes.filter(route => {
          return !route?.meta?.roles || (route.meta?.roles as UserRole[]).includes(role);
        });
        resolve(this.routes);
      });
    }
  }
});

export default usePermissionStore;
