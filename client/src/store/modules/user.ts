import { defineStore } from 'pinia';
import { LoginFormData, UserState } from '@/types';
import { localStorage } from '@/utils/storage';
import { login, getUser, refreshToken } from '@/api/login';

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: localStorage.get('accessToken') || '',
    info: undefined
  }),
  getters: {
    userInfo: state => JSON.parse(decodeURIComponent(escape(window.atob(state.token.split('.')[1]))))
  },
  actions: {
    async RESET_STATE() {
      this.$reset();
    },
    /**
     * 用户登录请求
     * @param userInfo 登录用户信息
     *  username: 用户名
     *  password: 密码
     */
    login(userInfo: LoginFormData) {
      const { account, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({
          account,
          password
        })
          .then(response => {
            const { access_token } = response.data;
            const accessToken = 'Bearer ' + access_token;
            localStorage.set('accessToken', accessToken);
            this.token = accessToken;
            resolve(accessToken);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     *  获取用户详情
     */
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUser().then(response => {
          console.log(response.data)
          this.info = response.data;
          resolve(response.data)
        })
      });
    },

    /**
     *  刷新 token
     */
    refreshToken() {
      return new Promise((resolve, reject) => {
        refreshToken(localStorage.get('refresh_token')).then(response => {
          const { account_token } = response.data;
          if (account_token) {
            this.token = account_token;
            localStorage.set('account_token', account_token);
          }
          resolve(null);
        });
      });
    },

    /**
     *  注销
     */
    logout() {
      return new Promise((resolve, reject) => {
        this.resetToken();
        resolve(null);
      });
    },

    /**
     * 清除 Token
     */
    resetToken() {
      return new Promise(resolve => {
        localStorage.remove('accessToken');
        this.RESET_STATE();
        resolve(null);
      });
    }
  }
});

export default useUserStore;
