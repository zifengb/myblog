---
sidebar: auto
date: 2017/04/10
prev: /blog/cmd-shell.html
next: /blog/multiple-ssh-key.html
---


# 详谈--如何在js中操作CSS

## 前言

* 本文涉及到的**关键知识点**

> 1. CSSStyleSheet对象，继承于StyleSheet接口-->[传送门][2]
> 2. CSSRuleList对象-->[传送门][3]
> 3. CSSStyleRule对象，继承于CSSRule接口-->[传送门][4]
> 4. CSSStyleDeclaration对象-->[传送门][5]

**注：**不知道这些知识点？没关系，我有为你们提供了传送门：),由于这里面很多是`DOM2级样式`的操作，所以可以使用以下代码检测你的浏览器支持情况：

```javascript
    function isSuportDOM2(){
        return document.implementation.hasFeature('CSS','2.0') &&
                document.implementation.hasFeature('CSS2','2.0');
    }
```

## !!!下面时普通知识点，已有经验的同学可以略过

### CSS（层叠样式表）的引用方式

> 1. 外部样式表`<link />`,还有被诟病已久的`@import url(...)`
> 2. 嵌入样式表`<style>...</style>`
> 3. 行内样式`<element style="..." />`


**☞爱深究的童鞋：**[link何@import的区别][1]

## 真正的正文!!!

First，我们应该有个基本的认识就是

::: tip
CSSStyleSheet > CSSRuleList > CSSStyleRule > CSSDeclaration
:::

### CSSStyleSheet对象

> 样式表对象，例如：`<link />`方式引入的外部样式表

**获取方式如下**

```javascript
    // first，通过document.styleSheets,返回一个类数组对象StyleSheetList，而其中每一项就是CSSStyleSheet，继承于StyleSheet接口
    var styleList = document.styleSheets;
    // 获取link元素的sheet/styleSheet(又是IE~orz)，返回CSSStyleSheet对象
    var link = document.querySelector('link');
    var stylesheet = link.sheet || styleSheet;
```

* CSSStyleSheet常用属性

> disabled,设置样式表是否禁用，只有该属性是可写的，其余均只可读<br/>
> href，样式表的路径信息<br/>
> media，多媒体属性，返回MediaList对象<br/>
> cssRules || rules(还是IE~orz)，返回CSSRuleList对象

* CSSStyleSheet方法

> deleteRule(index) || removeRule(index) (IE，跪)<br/>
> insertRule(rule,index) || addRule(selector,cssText,index) (IE...)

栗子！！！

```javascript
    // IE
    var sheet = document.styleSheets[0];
    sheet.addRule('body','font-size:12px',0);
    // 非IE
    sheet.insertRule('body{font-size:12px;}',0);
```

### CSSRuleList对象

> 样式**规则**列表，例如：`selector1{...}、selector2{...}...selectorN{...}`

**获取方式**

```javascript
    // 获取到CSSStyleSheet对象，然后取其cssRules/rules属性即可
    var rulelist = document.styleSheets[0].cssRules ||
        document.styleSheets[0].rules;
```

* CSSRuleList的属性和方法

> length,返回样式规则列表的数目

## CSSStyleRule对象(**继承于CSSRule接口**)

> 样式规则（一条），例如：`selector{...}`

**获取方式**

```javascript
    var rulelist = document.styleSheets[0].cssRules ||
        document.styleSheets[0].rules;
    // CSSStyleRule对象
    var rule = ruleList[0];
```

* CSSStyleRule的属性

> cssText,返回样式规则的文本<br/>
> selectorText,返回样式规则的选择器<br/>
> style,返回CSSStyleDeclaration对象<br/>
> parentStyleSheet,返回样式规则所在的样式表对象--CSSStyleSheet

举个栗子：

```
    style.css
        --body{
            font-size:12px;
            ...
        }
        a{
            text-decoration:none;
            ...
        }

    /* 说明如下：
        例如：第一条规则`body{...}`
            cssText->"body{font-size:12px...}"
            selectorText->"body"
            parentStyleSheet->"style.css"样式表对象
    */
```

## CSSStyleDeclaration对象（最常操作）

**获取方式**

* 对于行内样式

```
    var cd = element.style
```

* 对于非行内样式

```javascript
    // IE
    var currentStyle = element.currentStyle;
    // 非IE
    var computedStyle = getComputedStyle(element,false);
```

* 从CSSStyleRule对象

```javascript
    var rulelist = document.styleSheets[0].cssRules ||
        document.styleSheets[0].rules;
    // CSSStyleRule对象
    var rule = ruleList[0];
    // CSSStyleDeclaration对象
    var cd = rule.style;
```

* CSSStyleDeclaration的属性

> cssText，返回样式规则文本<br/>
> length，返回声明样式的数目<br/>
> parentRule，返回该声明规则对应的CSSStyleRule对象

**!!!注意：**`CSSStyleDeclaration`对象的`cssText`于`CSSSstyleRule`对象的`cssText`存在区别-->代码如下：

```javascript
    /*
        例如：body{font-size:12px}
            CSSStyleRule的cssText-->"body{font-size:12px}"
            CSSStyleDeclaration的cssText-->"font-size:12px"
    */
```

* CSSStyleDeclaration的方法

> item(index),返回样式的`key`值<br/>
> getPropertyCSSValue(key)，例如：`getPropertyCSSValue('font-size')`<br/>
> getPropertyValue(key)，同上，不过该方法使用更广泛<br/>
> removeProperty(key)，移除某个CSS样式，例如：`removeProperty('font-size')`<br/>
> getPropertyPriority(key)，如果样式设置了`!important`返回“import”，反之返回“”<br/>
> setProperty(key，value，import)，设置样式


## 参考文献


  > javascript高级程序设计(第3版)——[美] Nicolas C.Zakas 著  李松峰  曹力 译
  > HTML5权威指南——[美] Adam Freeman 著 谢廷晟  牛化成  刘美英 译



  [1]: http://www.divcss5.com/rumen/r431.shtml
  [2]: https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet
  [3]: https://developer.mozilla.org/zh-CN/docs/Web/API/CSSRuleList
  [4]: https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleRule
  [5]: https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration
