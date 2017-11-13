// default settings. fis3 release

// Global start
// 加md5
fis.match('*.{js,css,png,gif}', {
  useHash: true
});

fis.match('::image', {
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
})

// 对 CSS 进行图片合并
fis.match('/css/*.css', {
  useSprite: true
});

//压缩
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png,gif,jpg', {
  optimizer: fis.plugin('png-compressor'),
  release: '/static/pic$0'
});


//定位资源，将内容发布到release 指向的目录
fis.match('/js/*.js',{
  release:'/static$0'
});
fis.match('*.{css,less}',{
  release:'/static$0'
});
fis.match('/images/*/(*.{png,gif,jpg,svg})', {
  //发布到/static/pic/xxx目录下
  release: '/static$0'
});
fis.match('/images/(*.{png,gif,jpg,svg})', {
  //发布到/static/pic/xxx目录下
  release: '/static$0'
});

// Global end

// less编译
fis.match('*.less', {
  rExt: '.css', // from .less to .css
  parser: fis.plugin('less-2.x', {
      // fis-parser-less-2.x option
  }),
  release:'/static$0'
});

//scss编译
fis.match('*.scss', {
release:'/static/css$0',
rExt: '.css',
parser: fis.plugin('node-sass', {
  // options...
})
});

//基于页面的打包
fis.match('::package', {
postpackager: fis.plugin('loader', {
  allInOne: true
})
});

//发布的时候忽略以下目录或文件
fis.set('project.ignore', [
'output/**',
'node_modules/**',
'.git/**',
'.svn/**',
'package.json'
]);

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');

fis.media('rd').match('*', {
  deploy : fis.plugin('http-push', {
      receiver : 'http://xxxx:8999/receiver',
      to : '/home/users/xxxx/test' //部署机器的路径
  })
})
