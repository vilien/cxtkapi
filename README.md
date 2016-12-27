# utf16toEntities
微信小程序版淘点金api对接模块
```java
var CxTkapi = require('./src/index.js');
var tk = new CxTkapi;
tk.init({
    pid: 'mm_00000000_11111111_22222222',
    etProxy: 'https://myhost/?url=:TKURL',
    referer: 'https://myhost/item-888888666666.html'
});
tk.getLink('888888666666', function(url){
    console.log(url); // 输出淘点金链接
});
```
