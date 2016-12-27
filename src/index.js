;(function(){
	function CxTkapi(){
	  this.pid = '';
	  this.etProxy = 'https://';
	  this.referer = 'http://';
	  this.pgid = null;
	  this.etcode = null;
	}

	CxTkapi.prototype.init = function(options) {
	  this.etProxy = options.etProxy;
	  this.pid = options.pid;
	  this.referer = options.referer;
	};

	// 静态方法，用于清除本地缓存
	CxTkapi.clear = function(){
	  wx.removeStorage({key: 'amvid'});
	  wx.removeStorage({key: 'etcode'});
	};

	CxTkapi.prototype.getLink = function(goodsLink, getLinkCallback) {
	  var that = this, referer = this.referer, pid=this.pid, etProxy=this.etProxy;

	  function getAmvid(cb) {
	    var b, c, d, h, i = '', j = '', l = 'abcdef0123456789', cu = referer.substr(1), m = Math;
	    that.pgid = wx.getStorageSync('amvid');
	    if (!that.pgid) {
	      j = getA(cu, 8) + getA(l, 16);
	      for (var c = 1; 32 >= c; c++) d = m.floor(16 * m.random()), j && c <= j.length && (h = j.charCodeAt(c - 1), d = (d + h) % 16), i += d.toString(16);
	      that.pgid = i;
	      wx.setStorage({
	        key: 'amvid',
	        data: that.pgid
	      });
	    }
	    cb(that.pgid);
	  }

	  function getA(a, b) {
	    var c, d = '', e = 1;
	    if (e = Math.floor(a.length / b), 1 == e) d = a.substr(0, b);
	    else
	      for (c = 0; b > c; c++) d += a.substr(c * e, 1);
	    return d;
	  }

	  function getEt(pgid) {
	    var url;
	    that.etcode = wx.getStorageSync('etcode');
	    if (!that.etcode) {
	      url = 'http://g.click.taobao.com/load?rf=';
	      url += encodeURIComponent(encodeURIComponent(referer));
	      url += '&dr=&pid=' + pid;
	      url += '&pgid=' + pgid;
	      url += '&ak=&ttype=2&scr=414x736&lan=2%2C0&ciid=&csid=&curl=&ckeywords=';
	      url += '&cb=get_etcode';
	      wx.request({
	        url : that.etProxy.replace(':TKURL', encodeURIComponent(url)),
	        success : function(res) {
	          var data = res.data && (res.data.data || res.data);
	          that.etcode = data.match(/\d+/)[0];
	          wx.setStorage({
	            key: 'etcode',
	            data: that.etcode
	          });
	          show(that.etcode, pgid);
	        }
	      });
	    } else {
	      show(that.etcode, pgid);
	    }
	  }

	  function show(etcode, pgid) {
	    var link = 'http://g.click.taobao.com/q?pid=' + pid;
	    link += '&rf=' + encodeURIComponent(referer);
	    link += '&rd=2&et=' + etcode;
	    link += '&pgid=' + pgid;
	    link += '&ct=' + encodeURIComponent('url=' + encodeURIComponent(goodsLink));
	    link += '&v=1.2&ttype=2&cm=&ck=-1&cw=0';
	    if (typeof getLinkCallback === 'function') {
	      getLinkCallback(link);
	    }
	  }

	  if (this.etcode && this.pgid) {
	    show(this.etcode, this.pgid);
	  } else {
	    getAmvid(getEt);
	  }
	};

	module.exports = CxTkapi;
})();
