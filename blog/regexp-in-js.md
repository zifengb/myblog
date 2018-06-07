---
sidebar: auto
---


# 正则表达式在javascript的使用


## 前言

> 1.这是写给js开发者的正则表达式使用<br/>
2.个人第一篇博客文章,不足之处望各位斧正,不胜感谢！<br/>
3.文章存在错误部分欢迎指出,谢谢!不喜勿喷,毕竟本人水平有限<br/>

<!-- more -->

::: warning
**想在js使用以下特性的可以放弃了，javascript的正则表达式不支持以下特性！**
:::


> 1.匹配字符串开头和结尾的\A和\Z锚(但支持^、\$插入符号做开头和结尾)<br/>
2.向后查找<br/>
3.并集和交集类<br/>
4.原子组<br/>
5.Unicode支持(单个字符除外,如\uFFFF)<br/>
6.命名的捕获组(子表达式,后面会详细解析)<br/>
7.s(single,单行匹配模式)和x(free-spacing,无间隔匹配模式)<br/>
8.条件匹配--(*这是个好东西啊...然而js没有,555~*)<br/>
9.正则表达式注释<br/>


这里，解析下`原子组`-`语法->(?>group)`,根据google查询到的资料:以下表达式`a(?>bc|b)c`会匹配`abcc`,但不匹配`abc`,然后原子组匹配的时候会自动丢弃回溯引用位置,也就是说无法将使用回溯引用。具体怎么用请另行goole,毕竟js里不支持这个特性,So mind my business?英语好且可以翻墙的各位->[传送门](http://www.regular-expressions.info/atomic.html)


 - What(正则表达式是什么)

>  正则表达式是一门利用特殊字符定义匹配规则的技术，主要是用来处理字符串的搜索和替换，字符串在编程语言里是经常出现的基本数据类型，难免会涉及到字符串的处理，一般字符串对象内置的字符串处理方法，但是增加代码量是一大弊端。这时候，正则就出场了，**正则表达式**以极短的匹配字符，可以满足任意的字符串操作。

- How(javascript中的正则表达式使用)

首先，在javascript中，创建正则表达式的的方式有两种：
```javascript
//第一种方式（继承Perl的语法）
var reg1 = /\w+/g;
//第二种方式，创建RegExp对象
var reg2 = new RegExp("\\w+","g");
```
有些人可能会对“\w+”,“g”...这些东西无解，看不懂的上面的正则表达式并没有关系，下文会做详细的解析。

## 正则表达式的元字符

 - 元字符

| 元字符 | 含义 |
|----|----|
|\   | 一般用来做元字符的转义操作,但其本身也是元字符|
|.   | 匹配单个任意字符,除了换行符和结束符|
|\d  | 匹配字符串中的数字(digit,数字)|
|\D  | 匹配字符串中的非数字,即\d的补集|
|\w  | 匹配字符串中的单词(word,单词。字母、数字、下划线)|
|\W  | 匹配字符串中的非单词部分,\w的补集|
|\s  | 匹配字符串中的空格(space,空格:包括普通空格、制表符空格以及换行符空格)|
|\S  | 匹配字符串中的非空格部分,\s的补集|
|\b  | 匹配字符串中的单词边界(boundary,边界)|
|\B  | 匹配字符串中的非单词边界,\b的补集|
|\n  | 匹配字符串中的换行符|
|\f  | 匹配字符串中的换页符|
|\r  | 匹配字符串中的回车符|
|\t  | 匹配字符串中的制表符：`tab`键|
|\v  | 匹配字符串中的垂直制表符|
|\xxx| 查找以八进制数 xxx 规定的字符|
|\xdd| 查找以十六进制数 dd 规定的字符|
|\uxxxx| 查找以十六进制数 xxxx 规定的 Unicode 字符|

**注意**:由于元字符在正则表达式里具有特殊含义,所以在匹配的文本里如果包含有元字符的需用`\`进行转义。同等的,使用RegExp实例化的两个参数是字符串,所以含有元字符也就行转义。如：`\`转义后是`\\`、`\\`转义后是`\\\\`

 - 区间表达式

| 区间表达式 | 含义 |
|----|----|----|
|[0-9]|匹配0至9的数字,等同于\d|
|[a-z]|匹配小写字母a至z|
|[A-Z]|匹配大写字母A至Z|
|[^0-9]|匹配0至9的数字以外的字符串,等同于\D|
|(red\|blue\|green)|匹配字符串`red`/`blue`/`green`任意一个


 - 举个栗子


```javascript
//测试字符
var str = "there are 4 cats at my home";
//正则表达式
var reg = /\b\w+\b/g;
reg.exec(str);//["there", index: 0, input: "there are 4 cats at my home"]
str.match(reg);//["there","are","4","cats","at","my","home"]
```
注：这里`exec()`和`match()`方法返回的结果是有点类似的,但是需要注意的是前者是`RegExp`对象的方法，后者是`String`对象的方法。其两个方法的主要区别在于`exec()`可以每次匹配一项,可以使用循环进行逐个匹配,For example:

```javascript
//测试字符
var str = "there are 4 cats at my home";
//正则表达式
var reg = /\b\w+\b/g;
var result;
while((result = reg.exec(str))!=null){
    console.log(result);
    console.log(reg.lastIndex);//lastIndex属性下面会做解释
}
```

## 正则表达式修饰符的匹配类型

| 修饰符 | 匹配模式|
|---|---|
|g|全局匹配|
|i|忽略大小写匹配|
|m|多行匹配|


 - 使用栗子


```javascript
//匹配所有的单词
var str = "hello world";
//Perl语法
var reg = /\w+/gi;
//RegExp对象实例化
var regexp = new RegExp("\\w+","gi");
```


## 正则表达式的贪婪匹配和懒惰匹配

|量词|含义|
|---|---|
|+|匹配至少一个|
|?|匹配零个或一个|
|*|匹配零个或多个|
|{n}|匹配n个|
|{n,m}|匹配n至m个|
|{n,}|匹配n个或n个以上|


::: tip
贪婪匹配和懒惰匹配都是与量词有关的,所以上面先列出正则表达式的量词
:::

 - 贪婪匹配的栗子

```javascript
//首先指出上面属于贪婪型的量词有：+、*、{n,}
//下面我们来匹配一个h3标签内容
var str = "<h3>this is an example</h3><h3>this is an example too</h3>";
var reg = /<h3>.*<\/h3>/g;
str.match(reg);
```
注：相信很多人觉得上面的匹配没啥毛病,Perfect！
蛋四,它结果是怎样呢...(不相信的可以亲测)
匹配的结果是`<h3>this is an example</h3><h3>this is an example too</h3>`

Excuse Me?为啥会这样呢？:(
这就是贪婪匹配的后果啊,所谓贪婪的欲望是没有尽头的,所以贪婪型匹配就是在匹配条件规则下尽可能的吞噬匹配的字符串,因为有两个`</h3>`结束标签,它当然是匹配后一个啦!

 - 再来一个栗子

```javascript
//下面我们来匹配一个h3标签内容agian...
var str = "<h3>this is an example</h3><h3>this is an example too</h3>";
//注意修改后的正则表达式与上一个例子有什么区别！！！
var reg = /<h3>.*?<\/h3>/g;
str.match(reg);
//["<h3>this is an example</h3>","<h3>this is an example too</h3>"];
```

这次匹配得到的就是我们想要的结果了,群众的眼睛是雪亮的,上面的正则表达式的区别是多了这货儿——`?`,没错!`.*`到`.*?`的转变就起到了翻天覆地的变化,修改后的正则明显没有这么贪婪了,Bingo!这个不贪婪的正则就是懒惰型匹配。

::: tip
凡是贪婪型匹配都可以通过增加`?`来使它变为懒惰型匹配
:::


## 子表达式(捕获组)

> 子表达式是什么鬼?别急,所谓的子表达式就是...子表达式(一阵扔鞋~)

**咳咳**,下面我就来一本正经的说下子表达式是个什么东东,照旧,举个栗子:
还是这个正则表达式`/(<(h3)>)(.*?)(<\/h3>)/g`(你丫的没栗子啊,整天嚼同一粒栗子),还真没有~咬我啊。其实呢栗子举到好,调完bug回家早嘛

`/(<(h3)>)(.*?)(<\/h3>)/g`这个栗子呢已经包含了子表达式的终极奥义,呐!括号里的就是子表达式,明显有4个子表达式:`(<(h3)>)`,`(h3)`,`(.*?)`,`(<\/h3>)`,这里子表达式依次可以用`RegExp.$1`,`RegExp.$2`,`RegExp.$3`,`RegExp.$4`来获得引用,或许有人会疑问,第二个子表达式,javascript正则的子表达式明显是以左括号`(`出现的顺序来界定的。

 - 栗子+1

```javascript
var str = "<h3>this is an example</h3>";
var reg = /(<(h3)>)(.*?)(<\/h3>)/g;
reg.exec(str);
console.log(RegExp.$1)//<h3>
console.log(RegExp.$2)//h3
console.log(RegExp.$3)//the is a example
console.log(RegExp.$4)//</h3>
```

## 由子表达式引出的补充

- 回溯引用

> 闲话少说,上需求:使用正则匹配任意的标题标签及内容

我美美地写了个栗子：

```javascript
var reg = /<[Hh][1-6]>.*?<\/[Hh][1-6]>/g;
console.log("<h2>this is an example</h2>")//匹配成功
console.log("<h3>this is an example too</h3>")//匹配成功
console.log("<h6>this is an example too too</h6>")//匹配成功
//重点来了
console.log("<h2>this is an example too...</h3>")//匹配成功
```

明显,最后一个匹配的字符串是不合法的`</h3>`闭合标签不一致啊,我们想排除这种不合法情况,就应该把正则表达式改为这样：

```javascript
var reg = /<[Hh]([1-6])>.*?<\/[Hh]\1/g;
```
**解析**:上面的表达式就是巧妙运用了子表达式的效果,`\1`就是回引用了前面的子表达式`([1-6])`,对的,`\1`,`\2`...就是引用第一个至第n个子表达式的意思。回溯引用很有趣吧！


## 向前查找匹配/负向前查找匹配

|符号|含义|
|---|---|
|^|定义匹配的开头|
|\$|定义匹配的结尾|
|?=n|匹配字符串后面紧接字符n的字符串,即向前查找匹配|
|?!n|匹配字符串后面不紧接字符n的字符串,即负向前查找匹配|


 - 向前查找

> 需求:匹配下面单词表里面所有具有过去式的单词
> - watched
> - moved
> - go
> - eating
> - run

噼里啪啦,熟练打出以下表达式：

```javascript
var reg = /\b\w+ed\b/g;
```
不用想了，上面的表达式是可以滴。蛋四,我想用向前查找的方式实现,该怎么写呢?该这样:

```javascript
var reg = /\b\w+(?=ed)\b/g;
```

这还不足以体现向前查找的威力,如果我立刻让你写出匹配非过去式的单词,又该怎么写正则表达式呢?答案昭然若揭...(tips:负向前查找)

```javascript
var reg = /\b\w+(?!ed)\b/g;
```
_是的,正则就是这么diao,不用怀疑。哈哈..._


## RegExp对象解析

 > RegExp对象是javacript内置的基本对象之一，下面我们来看一下RegExp对象的的属性和方法：



 - RegExp的实例属性

|属性名|含义|
|---|---|
|global|布尔类型值,如果使用了全局匹配模式则返回true,反之返回false|
|ignore|布尔类型值,如果使用了忽略大小写匹配模式则返回true,反之返回false|
|multiline|布尔类型值,如果，如果使用多行匹配模式则返回true,反之返回false|
|lastIndex|整型数据,表示下一个匹配项的字符开始位置,从0开始索引|
|source|返回正则表达式的字符串表示|



 - RegExp的构造函数属性

|长属性名|短属性名|含义|
|---|---|---|
|input|\$_|返回最近一次匹配的**全部字符串文本**|
|lastMatch|\$&|返回最近一次匹配的字符串|
|lastParen|\$+|返回最近一次匹配的捕获组,即子表达式|
|leftContext|\$`|返回匹配的字符串的左边的文本内容|
|rightContext|\$'|返回匹配的字符串的右边的文本内容|
|multiline|\$*|布尔类型值,如果，如果使用多行匹配模式则返回true,反之返回false|


 - 大大的栗子again


```javascript
var str = "this has been a short summer";
var reg = /(.)hort/g;
str.match(reg);
document.write(RegExp["$_"]);//"this has been a short summer"
document.write(RegExp["$&"]);//"short"
document.write(RegExp["$`"]);//"this has been a "
document.write(RegExp["$'"]);//" summer"
document.write(RegExp["$+"]);//"s"
document.write(RegExp["$*"]);//false/undefined(chrome 53.0)
```

**Advise**:个人建议使用这些属性时候,使用长属性名会更佳,因为这些名字能够见名知意,在协同开发里能够起到自文档的优秀实践效果

### Lastly,总结一下，正则表达式能在javascript的哪些方法使用：

 - RegExp对象的方法
   - exec([string])方法,返回第一个匹配项含有正则属性数组
   - test([string])方法,返回布尔值,true成功匹配,false失败
   - compilie([regex])方法,重新编译新的规则,貌似较少使用



 - String对象的方法
    - match([string|regex])方法,返回一个含有所有匹配项的数组
    - search([string|regex])方法,返回匹配项的开始位置索引值,匹配失败返回-1
    - split([string|regex])方法,以某规则或字符串切割字符串,返回切割后字符串的数组
    - replace([string|regex],[string|regex])方法,以某规则或字符串替换对应的字符串,返回替换后的字符串

## 参考文献

> 1.正则表达式必知必会——Ben Forta著/杨涛 等 译<br/>
2.javascript高级程序设计(第3版)——Nicholas C.Zakas著/李松峰 曹力 译<br/>
3.[w3School在线RegExp对象手册][1]<br/>


[1]: http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp
