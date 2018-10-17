(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/gameConfig.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bae414A/XVASpQcak5z2DC3', 'gameConfig', __filename);
// script/gameConfig.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var GameConfig = {
  /**
   * 游戏配置参数
   */
  isBgmPlay: true, //背景音乐是否播放
  isScreemCanTouch: true, //游戏屏幕是否能触摸
  gameBgMoveSpeed: 1, //背景移动速度
  gameMoveSpeed: 8, //游戏移动速度
  stickLength: 0, //棍子初始长度
  stickLengthSpeed: 5, //棍子变长速度
  minMultiProbability: 0.2, //多分值站桩最小抽取概率
  MaxMultiProbability: 0.5, //多分值站桩最大抽取概
  canResurrectTime: 1, //能复活次数
  sharkJumpDurTime: 30, //鲨鱼跳跃间隔时间(秒)
  MAIN_MENU_NUM: "ninja_crossing", // 主选择菜单
  IS_WX: true, //当前是否是微信环境(游戏发布时改为true)
  /**
   *数据存储
   */
  nickName: null,
  avatarUrl: null
};
exports.default = GameConfig;
module.exports = exports["default"];

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=gameConfig.js.map
        