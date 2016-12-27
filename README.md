# 微信小程序版淘点金api对接模块
众所周知，微信是不允许连接淘宝的任何链接的。并且，微信小程序也不允许使用window对象下面的一些方法，所以淘宝官方提供的tkapi是无法在微信小程序里使用的。于是，便有了我们的CxTkapi模块。

## 安装
    npm install cxtkapi

## 使用
注：使用该模块之前，我们得先有一台已注册到微信小程序里的合法https服务器。该服务器用于向淘宝请求etcode（我也不知道官方名叫什么，暂且这么叫）。其功能仅仅是代理请求`:TKURL`即可。
```javascript
var CxTkapi = require('cxtkapi');
var tk = new CxTkapi;
tk.init({
    pid: 'mm_00000000_11111111_22222222', // 淘点金pid
    etProxy: 'https://myhost/?url=:TKURL', // 代理地址
    referer: 'https://myhost/item-888888666666.html' // 虚拟引用地址
});
// 获取链接
tk.getLink('888888666666', function(url){
    console.log(url); // 输出淘点金链接
});
```
