// Prettier代码格式化: https://prettier.io/docs/en/index.html
module.exports = {
  // disableLanguages: ["vue"], // 要禁用此扩展的语言ID列表,如["vue"],不格式化vue文件，vue文件的格式化可以单独设置
  // ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  // eslintIntegration: true, // 是否让prettier使用eslint的代码格式进行校验，该属性已废除
  // tabWidth: 2, // tab缩进大小,默认为2
  // useTabs: false, // 使用tab缩进,默认false
  printWidth: 160, // 单行代码的最大宽度,默认为80
  singleQuote: true, // 使用单引号,默认false(在jsx中配置无效, 默认都是双引号)
  // semi: false, // 结尾使用分号,默认true
  htmlWhitespaceSensitivity: 'ignore', // 指定HTML文件的全局空白区域敏感度,默认"css", 可选css|strict|ignore，（使用ignore时结束标签结尾尖括号不掉到下一行）
  endOfLine: 'auto', // 结尾是 \n \r \n\r auto https://blog.csdn.net/weixin_30773135/article/details/95838337
  // bracketSpacing: true, // 对象中的空格,默认true
  trailingComma: 'none', // 行尾逗号,默认none,可选none|es5|all, es5包括es5中的数组、对象, all包括函数对象等所有可选
  arrowParens: 'avoid', // 箭头函数参数括号,默认avoid 可选 avoid| always, avoid能省略括号的时候就省略 例如x => x, always总是有括号
  // JSX标签闭合位置 默认false
  // false: <div
  //          className=""
  //          style={{}}
  //       >
  // true: <div
  //          className=""
  //          style={{}} >
  // jsxBracketSameLine: false
};
