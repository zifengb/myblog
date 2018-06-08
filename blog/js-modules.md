---
sidebar: auto
prev: /blog/es6-block-scope.html
next: /blog/cmd-shell.html
---


# javascript的模块化编程


## 模块化的历史


* 什么是模块化？

     > 模块化是指解决一个复杂问题时自顶向下逐层把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。(来自[百度百科][1])

* 模块化编程(觉得以下理解可以略过...)

    > 1.软件模块是一套一致而互相有紧密关连的软件组织。它分别包含了程序和数据结构两部份。
    > 2.现代软件开发往往利用模块作合成的单位。
模块的接口表达了由该模块提供的功能和调用它时所需的元素。
    > 3.模块是可能分开地被编写的单位。这使他们可再用和允许广泛人员同时协作、编写及研究不同的模块。

* 通俗说法

    > 就我个人理解来说，模块化编程就是通过抽象、封装以及逻辑分离，然后有效地把庞杂无序的功能有条不紊地分割到各个编程源文件里，这里的一个个文件就可以看成是一个个模块。(纯属个人的理解，不当之处欢迎斧正)

注：**看到这里也许有人会认为，我就是这样干的啊！那么恭喜你，你已经具有模块化的思想。但是，js不像其他具有`类`概念的编程语言那样天生俱备易于模块化的条件，js模块化的程度往往取决于个人水平**

* 为什么需要js模块化？

    > js作为一门可以OO、PO以及Functional的动态语言，最大的不足可能就是文件的分离及组织结合了！

比如下面这张图，为了把功能有逻辑有条理地分离，引用时，竟丑陋...（而且还有注意文件引入的顺序）：

![这里写图片描述](http://img.blog.csdn.net/20170224231848649?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvREJCX3ppZmVuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


除了客户端，还有服务端呢...所以js模块化编程是势在必行的，js模块化有以下几种CommonJS、AMD/CMD、UMD


## 模拟的模块化


* 匿名函数+IIFE实现

    ```javascript
    (function (){
        // 属性
        var width = 10;
        var height = 10;
        // 方法
        var squre = function (w,h){
            return w * h;
        }

        console.log('the squre is',squre(width,height));

    })();
    ```

这种形式实现的模块化，有个致名的弊端就是所有属性和方法都是私有的，外部不可访问，这明显是不符合常理的，模块应该是可以自由组合/分离的。

* 全局参数传递

    ```javascript
    var globalVariable = {};

    (function (globalVariable){

        // 私有属性
        var privateProp = 12;

        // 公有属性
        globalVariable.publicProp = 10;

        // 私有方法
        var privateFun = function (){

        };

        // 公有方法
        globalVariable.func = function (){

        };

    })(globalVariable);
    ```

通过传递全局对象到IIFE内部，给它添加私有属性/方法和公有属性/方法，据说jquery使用的就是这种实践。

* 提供一个对象接口

    ```javascript
    var module = (function (){
        // 定义属性和方法
        var prop1 = 'private property';
        var prop2 = 'public property';

        var method1 = function (){
            // code here..
        }

        var method2 = function (){
            // code here...
        }

        // 如果随对象返回的就是公有属性和方法，反之为私有
        return {
            publicProp:prop1,
            publicMehtod:method1
        }

    })();
    ```

## AMD/CMD

* AMD（客户端异步加载模块实践1）

业界以[requireJS][3]为最佳实践：

```javascript
// module.js
//定义一个模块
//第一个参数，必须是数组，数组元素是该模块的依赖
define(['jquery'],function ($){
    // 假设依赖了jquery
    // code here...可以使用jquery的所有东西
    console.log('it\'s a module');
});
```

```javascript
// 引入模块
// 第一个参数依然是数组，还有第二个可选参数callback函数
require(['./module'],function (){
    // code here...
});
```

另外，还可以使用`require.config()`设置模块的路径

```javacript
require.config({
    paths:{
        jquery:['http://libs.baidu.com/jquery/2.0.3/jqueryhttp://'],
        module:['./module']
    }
});
// 上面分别设置了jquery的路径(外部资源)，以及内部模块module，然后引入模块就可以更简略，如下：
require(['jquery','module']);
```
更多详细栗子，可以访问[菜鸟教程][4]

* CMD（客户端异步加载模块实践2）

业界以[seaJS][5]为最佳实践：

```javascript
// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
  exports.doSomething = ...

  // 或者通过 module.exports 提供整个接口
  module.exports = ...

});
```

```javascript
// seajs 的简单配置
seajs.config({
  base: "../sea-modules/",
  alias: {
    "jquery": "jquery/jquery/1.10.1/jquery.js"
  }
})

// 加载入口模块
seajs.use("../static/hello/src/main")
```

* AMD与CMD的区别

> 1.**定位有差异**。RequireJS 想成为浏览器端的模块加载器，同时也想成为 Rhino / Node 等环境的模块加载器。Sea.js 则专注于 Web 浏览器端，同时通过 Node 扩展的方式可以很方便跑在 Node 环境中。
2.**遵循的规范不同**。RequireJS 遵循 AMD（异步模块定义）规范，Sea.js 遵循 CMD （通用模块定义）规范。规范的不同，导致了两者 API 不同。Sea.js 更贴近 CommonJS Modules/1.1 和 Node Modules 规范。
3.**推广理念有差异**。RequireJS 在尝试让第三方类库修改自身来支持 RequireJS，目前只有少数社区采纳。Sea.js 不强推，采用自主封装的方式来“海纳百川”，目前已有较成熟的封装策略。
4.**对开发调试的支持有差异**。Sea.js 非常关注代码的开发调试，有 nocache、debug 等用于调试的插件。RequireJS 无这方面的明显支持。
5.**插件机制不同**。RequireJS 采取的是在源码中预留接口的形式，插件类型比较单一。Sea.js 采取的是通用事件机制，插件类型更丰富。

详细请查看知乎回答->[传送门](https://www.zhihu.com/question/20351507/answer/14859415)

## CommonJS

服务端[NodeJS][2]使用的规范就是CommonJS，使用方法如下：

一个模块文件大概如下：
```javascript
// module.js
function printStr(){
    console.log('it\'s a module');
}
//1.
export.method = printStr;
//2.
module.export.method = printStr;
```

引入模块：

```javascript
var printStr = require('./module');

//1.
method.printStr();//'it's a module'
//2.
method();//'it's a module'
```

**说明**：其中导出模块的方式有`export`和`module.export`，两者的区别是前者导出的方法是在export对象上，而后者直接导出方法本身。


## UMD

通用模块规范，实现如下：

```javascript
;(function  (name,definition) {
     // 检测上下文环境是否为AMD或CMD
     var hasDefine = typeof define === 'function',
     // 检测上下文环境是否为Node
      hasExports = typeof module !== 'undefined' && module.exports;
     if(hasDefine){
      // AMD或者CMD
      define(definition)
     }else if(hasExports){
      // Node
      module.exports = definition();
     }else{
      // 将模块的执行结果挂在window变量里
      this[name]  = definition();
     }
    })('hello',function() {
     var hello = function  () {};
     return hello;
});
```

## Good New，Es6标准引入了模块

> Es6引入了模块，使用`import`和`export`关键字来引入和导出模块

* 简单栗子

```javascript
// module.js
// 导出模块
export function fn(){
    // code here...
}
```

```javascript
// 引入模块
import fn from './module';
fn();
```

**注**：不过，现在Es6模块的支持性还不高，但是如果你已经迫不及待地想使用它，还是有方法滴，deng~利用[Babel](http://babeljs.cn/)编译成Es5形式就可以愉快地使用了


## 参考文献

> Es6标准入门——阮一峰 著->[传送门](https://www.baidu.com/link?url=DUxI0VoUngIf32jLecNb4U09shgSfgXGlSXB_o1cLNZ6907Qmz67AW2CEEqS_MdZ&wd=&eqid=802491d3000129040000000358b05017)<br/>
> 百度百科——[模块化](http://baike.baidu.com/link?url=Dd2ScQSG_vYJqwByUj7krpE6C31yxhyxTwaNB4P4-xGz8pHfmL9tEy7-2hNvtDVGzott30BjMduWi8DOuafoxbmIhTupWG4pN3G6n2tYxYYSDI9FIVfpowKZR1D1vYzZ)



[1]: http://baike.baidu.com/link?url=Dd2ScQSG_vYJqwByUj7krpE6C31yxhyxTwaNB4P4-xGz8pHfmL9tEy7-2hNvtDVGzott30BjMduWi8DOuafoxbmIhTupWG4pN3G6n2tYxYYSDI9FIVfpowKZR1D1vYzZ
[2]: http://nodejs.cn/
[3]: http://www.requirejs.cn/
[4]: http://www.runoob.com/?s=requirejs
[5]: http://seajs.org/docs/
