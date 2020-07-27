
// 这里只列一部分，具体配置惨考文档啊
// 让打包的时候输出可配置的文件
const GenerateAssetPlugin = require('generate-asset-webpack-plugin')
const createServerConfig = function (compilation) {
  const cfgJson = { baseUrl: 'http://172.16.63.148:8850', getMp4RecordFile: 'http://172.16.63.158:9999', apiFiAndPtz: 'http://172.16.63.29:8888', picUrl: 'http://172.16.63.158:22222' }
  return JSON.stringify(cfgJson)
}
module.exports = {
  publicPath: '/webFS',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  /*
    构建多页面模式的应用程序.每个“页面”都应该有一个相应的JavaScript条目文件。该值应该是一
    个对象，其中键是条目的名称，而该值要么是指定其条目、模板和文件名的对象，要么是指定其条目
    的字符串，
    注意：请保证pages里配置的路径和文件名 在你的文档目录都存在 否则启动服务会报错的
  */
  // pages: {
  // index: {
  // entry for the page
  // entry: 'src/index/main.js',
  // the source template
  // template: 'public/index.html',
  // output as dist/index.html
  // filename: 'index.html'
  // },
  // when using the entry-only string format,
  // template is inferred to be `public/subpage.html`
  // and falls back to `public/index.html` if not found.
  // Output filename is inferred to be `subpage.html`.
  // subpage: 'src/subpage/main.js'
  // },

  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: true,
  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项

  devServer: {
    port: 8080, // 端口号
    host: '0.0.0.0', // localhost
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器
    proxy: {
      '/api': {
        target: 'http://172.16.63.148:8850',
        ws: true,
        changeOrigin: true
      }
    } // 配置多个代理
  },
  configureWebpack: {
    plugins: [
      // 让打包的时候输入可配置的文件
      new GenerateAssetPlugin({
        filename: 'serverconfig.json',
        fn: (compilation, cb) => {
          cb(null, createServerConfig(compilation))
        },
        extraFiles: []
      })
    ]
  }
}
