
var Generator = require('yeoman-generator');
const basePkgJson = require('./templates/pkgJson')
var extend = require('deep-extend');
const ora = require('ora')
const shelljs = require('shelljs')

module.exports = class extends Generator{

    // 构造函数
    constructor(args, opts){  // 必须要加参数，内部有使用到这两个参数，不加会报错
        // EG : yo test args --opts
        // args : ['args']
        // opts : { opts: true, env:{ Environment:{} } } 
        // Environment :{ options arguments }
        super(args, opts)

        this.fn = ()=>{ // 不自动执行 方法二
            //  定义函数 , 待调用，不会直接执行
            // console.log('won\'t be called automatically')
        }
        


        // 参数的处理
        this.argument('projectName',{   // 可以通过 this.arguments[projectName] 访问
			type:String,    //Boolean, String or Number
			required:false,
			desc:'name'
        })
        
        this.option('preprocessor',{   // 可以通过 this.options[p] 访问
			alias:'p',  // 简写
        })
        
    }

     // generator不能为空，至少包含一个method去运行
     methods1 (){
        console.log('method 1 just ran');   // 自动顺序执行
    }

    _methods2 () {
        console.log('won\'t be called automatically');   // 不自动执行 方法一
    }

   

    
    async prompting (){  // 用户交互
        // 使用this.log, 否则不使用终端的用户可能无法看到输出
        // this.log 只能打印一个参数
        // 异步， 返回一个promise

        const answers = await this.prompt([{
            type: 'input',
            name: 'title',
            message: 'enter your project title',
            default: this.appname,
            store   : true
        },
        {
            type: 'confirm',
            name: 'needWebpack',
            message: '需要安装webpack吗？'
        },
        {
            type    : 'confirm',
            name    : 'install',
            message : '是否自动安装依赖'
        }
        ])

        // this.log(answers)
        this.answers = answers

    }


    default(){
        // 复写修改默认
        // this.destinationRoot(this.project)
    }


    writing (){
        
        // https://github.com/sboudrias/mem-fs-editor

        // 生成模版文件
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('demo/index.html'),
            {title : this.answers.title }
        )
      
        // Extend or create package.json file in destination path
        var configPkgJson = {
            dependencies :{},
            devDependencies:{}
        }
        if(this.answers.needWebpack){
            configPkgJson.devDependencies['webpack'] = '^2.6.1'
        }
        var pkgJson = extend(
            this.fs.readJSON(this.templatePath('pkgJson.json')),
            configPkgJson
        )
        
        this.fs.extendJSON(this.destinationPath('./demo/package.json'), pkgJson);  // 内置了fs
    }

    install (){

        // 是否需要安装依赖
        if(this.answers.install){
            var done = this.async()
            const spinner = ora('安装依赖中').start();   // ora  loading效果和图标
            shelljs.cd('demo')  // 进入安装目录
            shelljs.exec('cnpm install',{

            },
            (code, stdout, stderr)=>{
                if(code == 0 ){
                    spinner.succeed()
                }else{
                    spinner.fail('安装成功')
                }
                
            }
            )
        }
    }


    end(){
        this.log('安装成功')
    }
   

};



