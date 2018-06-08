---
sidebar: auto
prev: /blog/css-operated-in-js.html
next: /blog/parseInt-in-js.html
---


# 管理多个SSH公钥密钥


## 前言

> 首先，为什么会出现这个SSH公钥密钥呢？
这时因为[RSA的算法][1]的出现，使得人们可以利用RSA算法**双密钥**的机制（基于非对称密码体制）进行广泛的加密和数字签名等

## 双密钥/单密钥机制

* 单密钥(对称加密)

> 所谓对称，就是采用这种加密方法的双方使用方式用<ins>同样的密钥</ins>进行加密和解密。密钥是控制加密及解密过程的指令。算法是一组规则，规定如何进行加密和解密

* 双密钥(非对称加密)

> 与对称加密算法不同，非对称加密算法需要两个密钥：<ins>公开密钥（publickey）</ins>和<ins>私有密钥（privatekey）</ins>。公开密钥与私有密钥是一对，如果用公开密钥对数据进行加密，只有用对应的私有密钥才能解密；如果用私有密钥对数据进行加密，那么只有用对应的公开密钥才能解密

**注：**更多内容可以自行了解信息加密的历史以及发展~下面才是我们的***重点***！！！！

## 使用git，拥抱github

**Firstly**，git是常用的分布式版本控制系统，异常强大！其他的可以google/百度，github呢，则是全球最大的同性交友平台（手动微笑~），咳咳，应该最大的开源项目共享平台，干货很多！！！

> 通常使用git的人，都会建立自己的github账号和远程仓库。
然而，国内的git云开源平台也不少，例如：码云、codeing.net...，
当你想连接多个不同来源的git远程仓库的时候，需要用到`SSH KEY`,
So...问题就来了，github上使用的`SSH KEY`，码云和codeing.net上使用不了！！！
估计是为了安全着想，如果有共用`SSH KEY`方案的请私我~

## 解决办法

**如文章标题所示**，我们可以通过使用命令行工具进行多个SSH公钥密钥的生成和管理！

```shell
    // 为codeing.net生成专用SHH密钥
    ssh-keygen -t rsa -f 路径/自定义文件名 -C "Key for coding.net"
    // 为github生成专用SHH密钥
    ssh-keygen -t rsa -f 路径/自定义文件名 -C "Key for GitHub stuff"
```

* 举个栗子：

```shell
    ssh-keygen -t rsa -f f:/github_rsa -C "Key for GitHub stuff"
```

> 运行该命令行后，会在F盘根目录生成私钥-->`github_rsa`和公钥-->`github_rsa.pub`，这是一对密钥
> 私钥要妥善私人报管，公钥可以用于公开进行github的`SSH KEY`接入等用途

`.pub`扩展名的文件打开即可以获得公开密钥~

## 如何管理多个SHH KEY

**Importantly**,关键的一步是把你创建的多个`SHH KEY`统一放到一个目录下进行管理（一般是C:\Users\你的用户名\.ssh）,然后新建一个空白的`config`文件（无文件后缀名！！！），内容如下：

```
    Host github.com
        IdentityFile ~/.ssh/github_rsa
        User git
    Host git.oschina.net
        IdentityFile ~/.ssh/oschina_rsa
        User git
```

**解释：**

> `Host`就是你的git仓库的域名或者IP，例如：github、码云的域名~
> `IdentityFile`指定你连接git仓库的私有密钥文件路径

**检验**配置是否成功

```shell
    // 例子
    ssh -T git@github.com
    // 结果类似下面，则表示成功！
    Welcome to Github,your name!
```


## 参考文献

> [linux管理多个ssh公钥密钥][2]<br/>
> [廖雪峰git教程][3]


  [1]: http://baike.baidu.com/link?url=e8X3c91lkFL1j8zVuByrOGyezRzalrnQ-_szYSeLtvnjPtBfEyvKvp7JZ-8dqK-K_rxFI7ei2s4pRvwNc1hPohxUVqGNnQ0YQ-Xn9QSrYSe
  [2]: http://rongmayisheng.com/post/linux%E7%AE%A1%E7%90%86%E5%A4%9A%E4%B8%AAssh%E5%85%AC%E9%92%A5%E5%AF%86%E9%92%A5
  [3]: http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000
