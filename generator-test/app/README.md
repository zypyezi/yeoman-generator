工具 ：
    kao.js
    Yeoman
    npmjs账号 邮箱
    github 账号 邮箱
    E.js
    shell.js  基于node的一层命令封装插件
    mem-fs-editor

安装：
    npm install -g yo
    npm install -g generator-generator

手动创建 | yarn generator-generator
    新建文件，目录名字为generator-name
    新建package.json文件
    {
        name属性必须以generator-前缀
        keywords必须包含yeoman-generator
        必须安装yeoman-generator依赖
    }

yarn link   注册
yo name   运行




fs  --- file system
--------------------------------------------------------------------------------
https://github.com/sboudrias/mem-fs-editor



shell.js    重新包装了 child_proces
--------------------------------------------------------------------------------
https://www.npmjs.com/package/shelljs




路径
--------------------------------------------------------------------------------
destinationPath   ./destinationPath
destinationRoot : 可以复写destinationPath
templatePath :  默认取得是 ./templates/
this.sourceRoot: 可以复写templatePath







运行上下文
--------------------------------------------------------------------------------
如何运行函数

1.  每一个直接挂载到生成器原型上的函数相当于一个task【Object.getPrototypeof(Generator)】，会自动依次执行


2.  如何定义一个不会被自动执行的函数【辅助函数】
    -- 添加 _ 前缀

    -- 在构造函数里面定义

    -- 继承父生成器




执行顺序
--------------------------------------------------------------------------------
按照优先级执行所定义的方法。
当方法名字和优先级函数同名时，会将该方法放入特殊的优先级队列，否则放入默认的优先级队列

initializing		初始化，获取配置
prompting		用户交互
configuring	创建配置文件等
default		默认执行的函数队列
writing		项目具体文件
conflicts		处理冲突
install			调用npm包安装
end			结束

异步
返回一个promise，如果返回成功则继续执行，如果返回失败就会停止





















