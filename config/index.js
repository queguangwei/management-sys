// 获取运行环境变量
process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim()

import path from 'path'

// 配置项
const config = new Map()
// 环境变量
const env = process.env.NODE_ENV
// 动态获取环境配置
const envConfig = require('./' + env + '.json')
// 接口环境 lr / dev / com
const proxy_env = "lr"

// ---------------
// 系统环境相关
// ---------------
config.set('env', env)
config.set('globals', {
  '__DEV__' : config.get('env') === 'development',
  '__PROD__': config.get('env') === 'production'
})

// ---------------
// 服务相关
// ---------------
config.set('server_host', 'localhost')
config.set('server_port', process.env.PORT || envConfig.port || 4016)
config.set('server_api', envConfig.api[proxy_env] || false)

// ---------------
// Webpack相关
// ---------------
config.set('webpack_port', 3016)
config.set('webpack_public_path', `http://${config.get('server_host')}:${config.get('webpack_port')}/`)

// ---------------
// 项目相关
// ---------------
config.set('path_project', path.resolve(__dirname, '../'))
config.set('dir_src', 'src')
config.set('dir_dist', 'dist')

// 单独打包的依赖
config.set('vendor_dependencies', [
  'react',
  'react-dom',
  'react-immutable-render-mixin',
  'react-router',
  'react-redux',
  'redux',
  'redux-thunk',
  'superagent'
]);

// ---------------
// Util相关
// ---------------
const paths = (() => {
  const base = [config.get('path_project')];
  const resolve = path.resolve;

  const project = (...args) => resolve.apply(resolve, [...base, ...args]);

  return {
    project : project,
    src     : project.bind(null, config.get('dir_src')),
    dist    : project.bind(null, config.get('dir_dist'))
  };
})();

config.set('utils_paths', paths);

export default config
