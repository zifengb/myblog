module.exports = {
  // 设置<head>标签内容
  head: [
    ['link', { rel: 'icon', href: '/logo.png' } ]
  ],
  // 多语言配置
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'zifengb\'s Blog',  // 页头
      description: 'It\'s almost far away ...', // 描述
    }
  },
  // base: '',  // 部署站点的非根URL
  // title: 'zifengb\'s Blog',  // 页头
  // description: 'Just playing around', // 描述
  // serviceWorker: true,
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/' },
      // { text: 'Github', link: 'http://github.com/zifengb' },
    ],
    lastUpdated: '最后更新',
    // 导航栏repo链接
    repo: 'zifengb/zifengb.github.io',
    repoLabel: 'Github',
    // // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'zifengb/zifengb.github.io',
    // // 假如文档不是放在仓库的根目录下：
    // docsDir: '/',
    // // 假如文档放在一个特定的分支下：
    // docsBranch: 'master',
    // // 默认是 false, 设置为 true 来启用
    // editLinks: true,
    // // 默认为 "Edit this page"
    // editLinkText: 'Github Issue'
  },
  markdown: {
    lineNumbers: true,  // don't work?
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [2, 3, 4] },
    config: md => {
      // 使用更多的 markdown-it 插件!
      // md.use(require('markdown-it-table-of-contents'))
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': './public/images'  // 设置相对路径别名，不起效？
      }
    }
  },
}
