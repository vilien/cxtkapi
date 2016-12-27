# 微信小程序版淘客淘点金api对接模块


众所周知，微信是不允许连接淘宝的任何链接的。并且，微信小程序也不允许使用window对象下面的一些方法，所以淘宝官方提供的tkapi是无法在微信小程序里使用的。于是，便有了我们的CxTkapi模块。

|  方法名 |   类型   |   说明
|:--------|:--------:|:-------------------------------------
| init    | 动态方法 | 初始化，需提供pid、etProxy、referer
| getLink | 动态方法 | 获取淘客链接
| clear   | 静态方法 | 清除淘客身份信息缓存

## 安装
    npm install cxtkapi

## 使用
注：使用该模块之前，我们得先有一台已注册到微信小程序里的合法https服务器。该服务器用于向淘宝请求etcode（我也不知道官方名叫什么，暂且这么叫）。其功能仅仅是代理请求`:TKURL`即可（:TKURL为内部用关键字，全大写，冒号不可省略）。
```javascript
var CxTkapi = require('cxtkapi');
var tk = new CxTkapi;
tk.init({
    pid: 'mm_00000000_11111111_22222222', // 淘客pid
    etProxy: 'https://[yourhost]/?url=:TKURL', // 代理地址
    referer: 'https://[yourhost]/clothing/list.html' // 虚拟引用地址
});
// 获取淘客链接
tk.getLink('http://detail.tmall.com/item.htm?id=888888666666', function(url){
    console.log(url); // 输出淘客链接
});
```

## 清理
官方原版tkapi是把淘客的身份信息放到cookies里的，而微信小程序里我们使用的是storage。由于storage是不过期的，目前还不清楚不过期的身份信息会不会对淘客造成什么不良影响，所以建议使用完成后进行缓存清理。
建议的做法是放到微信小程序onLaunch阶段，这样每次启动都将获得一个新的身份信息。
示例如下：
```javascript
var CxTkapi = require('cxtkapi');
App({
    onLaunch: function () {
        CxTkapi.clear(); // 清除淘客身份信息缓存
    }
})
```

## 更多
[CxTkapi](https://github.com/vilien/cxtkapi)  - github主页

[issue](https://github.com/vilien/cxtkapi/issues)
