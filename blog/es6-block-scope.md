---
sidebar: auto
date: 2017/02/23
prev: /blog/chinese-garbled-in-JavaWeb.html
next: /blog/js-modules.html
---

# Es6入门之块级作用域


## 块级作用域

> 首先有学习过javascript的童鞋应该都清楚，js之中不像java这些静态语言存在纯天然的块级作用域。js的作用域是以函数来区分

* 最常见的例子

```javascript
    for(var i = 0;i<10;i++){
        //code here...
    }
    console.log(i);//10
```


对的，没错，上面输出的***`i是10`***；这个会让从有块级作用作用域语言转过来的人一脸懵逼！究其原因就是因为js中的作用域是以函数来区分的，而非***`{}`***符号


* 函数作用域例子

```javascript
    var fn = function (){
        for(var i = 0;i<10;i++){
            //code here...
        }
    }

    console.log(i);
    //ReferenceError: i is not defined
```

以上例子才是js作用域的真正体现！以函数为界限，js由內至外形成一个作用域链，外部作用域不可以访问内部作用域，内部作用则可以访问外部作用域。以下图片可以简单说明作用域链是啥东东：

![作用域链示意图](https://img-blog.csdn.net/20170223163302750?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvREJCX3ppZmVuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

---


> 谢天谢地:)    ECMAscript 6标准的发布，给我们javascript带来块级作用域，撒花~


## 块级作用域之let


> let关键字的出现，就是js实现块级作用域之时；另外一个const关键字，两者稍稍有些区别，下面再赘述

* 下面使用let实现块级作用域的例子

```javascript
    for(let i = 0;i<10;i++){
            //code here...
    }
    // 由于使用了let关键字，所以i变量只在for循环里面有效，形成了一个块级作用域，外部作用域再反问i变量则报错
    console.log(i);
    // ReferenceError: i is not defined
```


## 块级作用域之const


> const关键字与let关键字的不同点在于前者用于定义常量！使用过java语言的童鞋应该知道final关键字就是用来定义常量的，常量是不可修改的变量

* 举个栗子

java写法

```java
final int PI = 3.14;
```


Es6写法

```javascript
const PI = 3.14;
// 因为const定义的变量是常量，不可修改，因此执行到这句将会发生错误
PI = 3.1415926;
//Uncaught TypeError: Assignment to constant variable.
```

**其实以前Es6标准还没有发布，各位前辈是这样实现js的块级作用域的**

```javascript
// 其实也就是使用函数的特性
// 再利用IIFE(Immediately-invoked function expression,中文就是立即执行函数)的特性
(function (){
    // code here...
})()
```

## 为什么需要块级作用域

> 块级作用域，这使js编程更符合常理，解决了那些对js不熟悉的使用者，分分钟写出不自知的WTF的bug

* 经典场景：闭包(不懂的童鞋可以自行搜索，由于篇幅原因，不在这里展开赘述)

```javascript
    // 假设li的数量有3个
    var aLis = document.querySelectorAll("#list li");
    for(var i = 0; i < aLis.length; i++){
        aLis[i].onclick = function (){
            console.log(i);//一直输出3
        }
    }
```

哈哈，傻眼了吧，怎么输出的不是0，1，2？这就是因为特么的有个闭包啊！以前我们的解决方案一般是这样:

```javascript
    // 假设li的数量有3个
    var aLis = document.querySelectorAll("#list li");
    for(var i = 0; i < aLis.length; i++){
        aList[i].index = i;
        aLis[i].onclick = function (){
            console.log(this.index);//0,1,2
        }
    }
```

let的解决方案：

```javascript
    // 假设li的数量有3个
    var aLis = document.querySelectorAll("#list li");
    for(let i = 0; i < aLis.length; i++){
        aLis[i].onclick = function (){
            console.log(i);//0,1,2
        }
    }
```

高下立见，明显有了`let`我们实现更加优雅了，而不用使用那些hack方法

## let和const使用的注意事项

> 1.不像`var`那样会发生“变量提升”
> 2.同一个块级作用域不允许重复声明同一个名称的变量
> 3.`const`用于声明常量，不可更改且必须立即初始化
> 4.`let`、`const`、`class`等关键字声明的变量将不同于`var`和`function`，不再默认附属于全局对象的属性
> 谨记，注意TDZ(Temporal Dead Zone)--块级作用域引起的暂时性死区

* 不存在变量提升

```javascript
    console.log(i);
    //Uncaught ReferenceError: i is not defined
    let i = 10;

    console.log(j);//undefined
    var j = 10;
```

* 不允许重复声明同一个变量

```javascript
    let i = 10;
    let i = 5;//Uncaught SyntaxError: Identifier 'i' has already been declared
```

* const声明常量必须初始化

```javascript
    const PI;//Uncaught SyntaxError: Missing initializer in const declaration
```

* let/const/class关键字声明的变量不再附着于全局变量

```javascript
    // 假设是在客户端场景下
    var width = 100;
    let height = 100;
    console.log(window.width);//100
    console.log(window.height);//undefined
```

* TDZ，暂时性死区

> 暂时性死区是因为使用了`let`/`const`等关键字，在那块块级作用域里面就会对声明的变量进行锁定，然后如果在`let`/`const`声明之前使用该该变量则会报错

* 对方不想和你说话，并向你扔了个栗子

```javascript
    // TDZ栗子1
    var temp = 'hello';
    if(true){
        // TDZ(temple died zone)开始
        try{
            temp = "es6";//报错，变量temp is not defined
        }catch(e){
            console.log(e);
        }
        let temp;
        // TDZ(temple died zone)结束
        console.log(temp);//undefined
    }
    // TDZ栗子2:这里是由于x的默认值是y，而y又还没声明导致的暂时性死区问题
    try{
        (function (x=y,y=2){
            console.log([x,y])
        })()
    }catch(e){
        console.log(e);
    }
```


## 参考文献

> Es6标准入门（第二版）——阮一峰 著->[传送门][1]<br/>
> javascript高级程序设计（第三版）——[美]Nichilas C.Zakas 著


  [1]: http://es6.ruanyifeng.com/
