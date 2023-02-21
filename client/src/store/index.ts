import useUserStore from './modules/user';
import useAppStore from './modules/app';
import useSettingStore from './modules/settings';
import usePermissionStore from './modules/permission';

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  setting: useSettingStore(),
  permission: usePermissionStore(),
});

export default useStore;
