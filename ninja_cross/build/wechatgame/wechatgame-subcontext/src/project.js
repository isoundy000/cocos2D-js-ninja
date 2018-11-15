window.__require=function e(t,a,i){function n(r,o){if(!a[r]){if(!t[r]){var c=r.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!o&&l)return l(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+r+"'")}}var u=a[r]={exports:{}};t[r][0].call(u.exports,function(e){return n(t[r][1][e]||e)},u,u.exports,e,t,a,i)}return a[r].exports}for(var s="function"==typeof __require&&__require,r=0;r<i.length;r++)n(i[r]);return n}({rankList:[function(e,t,a){"use strict";cc._RF.push(t,"4d1937N7rZHfZJa8/er9y+A","rankList"),cc.Class({extends:cc.Component,properties:{displayNode:cc.Node,display:cc.ScrollView,content:cc.Node,rankItem:cc.Prefab,loadingLabel:cc.Node,scoreText:cc.Node,scoreTextLabel:cc.Label,userInfo:cc.Node,index:1},start:function(){var e=this;this.display.scrollToTop(0),wx.onMessage(function(t){switch(t.messageType){case 1:e._submitScore(t.MAIN_MENU_NUM,t.score);break;case 2:e._fetchFriendData(t.MAIN_MENU_NUM);break;case 3:e._getScoreText(t.MAIN_MENU_NUM);break;case 5:e._hideSub()}})},_removeChild:function(){this.content.removeAllChildren(),this._showMessage("\u73a9\u547d\u52a0\u8f7d\u4e2d...")},_submitScore:function(e,t){wx.getUserCloudStorage({keyList:["x2"+e],success:function(a){a.KVDataList.length>0&&(1==e&&wx.setUserCloudStorage({KVDataList:[{key:"Classic",value:'{"wxgame":{"score":'+(a.KVDataList[0].value>t?a.KVDataList[0].value:t)+',"update_time": '+(new Date).getTime()+"}}"}]}),a.KVDataList[0].value>t)||wx.setUserCloudStorage({KVDataList:[{key:"x2"+e,value:""+t}],success:function(e){console.log("setUserCloudStorage","success",e)},fail:function(e){console.log("setUserCloudStorage","fail",e)},complete:function(e){console.log("setUserCloudStorage","ok",e)}})},fail:function(e){console.log("getUserCloudStorage","fail")},complete:function(e){console.log("getUserCloudStorage","ok")}})},_getScoreText:function(e){var t=this;this._removeChild(),this.hideRankList();var a=this,i=void 0,n=void 0,s=void 0;wx.getUserInfo({openIdList:["selfOpenId"],success:function(r){t.loadingLabel.active=!1,console.log("success",r.data);var o=r.data[0];wx.getFriendCloudStorage({keyList:["x2"+e],success:function(e){console.log("wx.getFriendCloudStorage success",e);var t=e.data;t.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var r=0;r<t.length;r++){var c=r;t[r].avatarUrl==o.avatarUrl&&(!0,i=c,n=c-1,s=c+1)}if(0==i)a.scoreTextLabel.string="\u4f60\u5728\u597d\u53cb\u4e2d\u5360\u636e\u7b2c\u4e00!";else if(i==t.length-1)a.scoreTextLabel.string="\u4f60\u5728\u597d\u53cb\u4e2d\u57ab\u5e95\u4e86\uff0c\u5feb\u5feb\u594b\u8d77\u76f4\u8ffd\u5427!";else{var l=0!=t[i].KVDataList.length?t[i].KVDataList[0].value:0,u=(0!=t[n].KVDataList.length?t[n].KVDataList[0].value:0)-l,g=a._cutstr(t[n].nickname,4),h=a._cutstr(t[s].nickname,10);a.scoreTextLabel.string="\u4f60\u5df2\u8d85\u8fc7"+h+",\n\u8ddd\u79bb\u4e0b\u4e00\u4f4d\u597d\u53cb"+g+"\u8fd8\u5dee"+u+"\u5206"}},fail:function(e){a._showMessage("\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5"),console.log("\u83b7\u53d6\u6392\u884c\u699c\u5931\u8d25",e)}})},fail:function(e){a._showMessage("\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5")}})},_fetchFriendData:function(e){var t=this;this._removeChild(),this.index=1,this.showRankList();var a=this;wx.getUserInfo({openIdList:["selfOpenId"],success:function(i){t.loadingLabel.active=!1;var n=i.data[0];wx.getFriendCloudStorage({keyList:["x2"+e],success:function(e){var i=e.data;i.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var s=0;s<i.length;s++)i[s].avatarUrl==n.avatarUrl&&a._showUserData(s,i[s]);for(var r=0;r<10;r++)i[r].avatarUrl==n.avatarUrl?a._showPlayerData(r,i[r],!0):a._showPlayerData(r,i[r],!1);t.displayNode.on("bounce-bottom",function(){var e=a.index,t=i.length-10*e;if(t>10){for(var s=10*e;s<10*e+10;s++)i[s].avatarUrl==n.avatarUrl?a._showPlayerData(s,i[s],!0):a._showPlayerData(s,i[s],!1);a.index++}else if(t<=10&&t>0){for(var r=10*a.index;r<i.length;r++)i[r].avatarUrl==n.avatarUrl?a._showPlayerData(r,i[r],!0):a._showPlayerData(r,i[r],!1);a.index++}})},fail:function(e){a._showMessage("\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5"),console.log("\u83b7\u53d6\u6392\u884c\u699c\u5931\u8d25",e)}})},fail:function(e){a._showMessage("\u83b7\u53d6\u6570\u636e\u5931\u8d25\uff0c\u8bf7\u68c0\u67e5\u7f51\u7edc\u8fde\u63a5")}})},_showMessage:function(e){this.loadingLabel.getComponent(cc.Label).string=e,this.loadingLabel.active=!0},_showPlayerData:function(e,t,a){var i=cc.instantiate(this.rankItem);(i.parent=this.content,a)&&(i.getChildByName("itemBg").active=!0);i.getChildByName("num").getComponent(cc.Label).string=(e+1).toString();var n=i.getChildByName("nickName").getComponent(cc.Label),s=this._cutstr(t.nickname,6);n.string=s;var r=i.getChildByName("score").getComponent(cc.Label),o=0!=t.KVDataList.length?t.KVDataList[0].value:0;r.string=o.toString();var c=i.getChildByName("userIcon").getComponent(cc.Sprite);""!=t.avatarUrl&&cc.loader.load({url:t.avatarUrl,type:"png"},function(e,t){e&&console.error(e),c.spriteFrame=new cc.SpriteFrame(t)})},hideRankList:function(){this.display.active=!1,this.loadingLabel.active=!1,this.userInfo.active=!1,this.scoreText.active=!0},showRankList:function(){this.display.active=!0,this.userInfo.active=!0,this.scoreText.active=!1},_showUserData:function(e,t){this.userInfo.removeAllChildren();var a=cc.instantiate(this.rankItem);a.parent=this.userInfo,a.getChildByName("itemBg").active=!0,a.getChildByName("num").getComponent(cc.Label).string=(e+1).toString();var i=a.getChildByName("nickName").getComponent(cc.Label),n=this._cutstr(t.nickname,6);i.string=n;var s=a.getChildByName("score").getComponent(cc.Label),r=0!=t.KVDataList.length?t.KVDataList[0].value:0;s.string=r.toString();var o=a.getChildByName("userIcon").getComponent(cc.Sprite);""!=t.avatarUrl&&cc.loader.load({url:t.avatarUrl,type:"png"},function(e,t){e&&console.error(e),o.spriteFrame=new cc.SpriteFrame(t)})},_hideSub:function(){this.display.active=!1,this.loadingLabel.active=!1,this.scoreText.active=!1},_cutstr:function(e,t){if(e.length<=t)return e;for(var a=0,i=new String,n=e.length,s=0;s<n;s++){var r=e.charAt(s);if(a++,i=i.concat(r),a>=t)return i=i.concat("...")}}}),cc._RF.pop()},{}]},{},["rankList"]);