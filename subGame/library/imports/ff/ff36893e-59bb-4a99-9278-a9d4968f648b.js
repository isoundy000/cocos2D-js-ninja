"use strict";
cc._RF.push(module, 'ff368k+WbtKmZJ4qdSWj2SL', 'gameConfig');
// gameConfig.js

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GameConfig = {
    INTER_URL: "http://192.168.1.156:30000/", //接口
    shareKind: 1, //分享类型  1:超越  2:普通
    passNickName: null, //超越好友的名字
    //分享配置
    config: {},
    shareTitle: null, //本次分享标题
    shareImg: null //本次分享图片

};
exports.default = GameConfig;
module.exports = exports["default"];

cc._RF.pop();