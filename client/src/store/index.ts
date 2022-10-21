import useUserStore from './modules/user';
import useAppStore from './modules/app';
import useSettingStore from './modules/settings';

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  setting: useSettingStore(),
});

export default useStore;
