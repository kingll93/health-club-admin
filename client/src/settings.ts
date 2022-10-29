interface DefaultSettings {
  title: string;
  showSettings: boolean;
  tagsView: boolean;
  fixedHeader: boolean;
  sidebarLogo: boolean;
  errorLog: string;
}

const defaultSettings: DefaultSettings = {
  title: '天机云链管理后台',
  showSettings: true,
  tagsView: false,
  fixedHeader: true,
  sidebarLogo: true,
  errorLog: 'production'
};

export default defaultSettings;
