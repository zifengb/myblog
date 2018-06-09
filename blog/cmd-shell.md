---
sidebar: auto
date: 2017/03/20
prev: /blog/js-modules.html
next: /blog/css-operated-in-js.html
---

# cmd shell实用命令


## 盘符命令

* c:/d:/e:...   切换到其他磁盘

eg:

```shell
    // 切换到d盘根目录
    C:\Users\admin> d:
```

## runas命令

* runas /user:xxx cmd

**注：** 相当于`linux`下的`sudo`命令

> 	提升到管理员权限，xxx是指隶属管理员组的用户名（需得知道登录密码）

eg:

```shell
    C:\Users\admin> runas /user:administrator cmd
```

## cd命令

> 	cd.. 往前一个目录回退
> 	cd/ 回到磁盘根目录
> 	cd [path] 进入某磁盘/某目录

eg:

```shell
    // 进入C盘users/admin/lib/tmp目录
    C:\Users\admin> cd lib\tmp
```

## md命令

* md [path] 创建文件夹

eg:

```shell
    // 在C盘users/admin/目录下创建新的hello/h目录
    C:\Users\admin> md hello\h
```

## rd命令

* rd [path] [/Q | /S] 删除文件夹

>  `/S`  ->  除目录本身外，还将删除指定目录下的所有子目录和文件。用于删除目录树。<br/>
>  `/Q`  ->  安静模式，带 /S 删除目录树时不要求确认

eg:

```shell
    // 在C盘users/admin/目录下删除的hello/h目录
    C:\Users\admin> rd hello\h /S
```

## 新建文件

* type nul>[path] 创建空白文件
* type [path] 查看文件内容
* echo XXX>[paht] 创建内容为“XXX”的文件

eg:

```shell
    // 在C盘users/admin/目录下新建了hello.txt空白文件
    C:\Users\admin> type nul>hello.txt
```

## 删除文件

* del [path] 删除文件

eg:

```shell
    // 在C盘users/admin/目录下删除hello.txt文件
    C:\Users\admin> type nul>hello.txt
```

## 复制文件

> copy [path] [path] 复制文件到目标目录下
> xcopy [path] [path] /S 复制文件夹以及文件到目标目录下

```shell
    // 在C盘users/admin/目录下复制hello.txt文件到c:/users/admin/hello/h目录下
    C:\Users\admin> copy hello.txt hello\h
```

## 移动文件/文件夹

* move [path] [path] 移动文件夹/文件到目标目录下

eg:

```shell
    // 在C盘users/admin/目录下移动hello.txt文件到c:/users/admin/hello/h目录下
    C:\Users\admin> move hello.txt hello\h
```

## 重命名文件

* ren/rename [oldpath] [newpath] 修改文件夹名/文件名

eg:

```shell
    // 批量修改文件名，把 C:/Users/admin.txt目录下的全部.txt文件改为.html文件
    C:\Users\admin> ren *.html *.txt
```

## 其他常用命令

> 	dir [path] 查看当前目录下文件<br/>
> 	cls：清屏<br/>
> 	ver: 查看系统版本
