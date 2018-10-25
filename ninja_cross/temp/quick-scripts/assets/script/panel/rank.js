(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/panel/rank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ea993OaclZFSYRp26rCz1XM', 'rank', __filename);
// script/panel/rank.js

'use strict';

var _util = require('../utils/util');

var _util2 = _interopRequireDefault(_util);

var _GameUITools = require('../utils/GameUITools');

var _GameUITools2 = _interopRequireDefault(_GameUITools);

var _gameConfig = require('../gameConfig');

var _gameConfig2 = _interopRequireDefault(_gameConfig);

var _gameDataManager = require('../gameDataManager');

var _gameDataManager2 = _interopRequireDefault(_gameDataManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,
    properties: {
        subCanvas: cc.Node,
        closeBtn: cc.Node,
        btnSound: {
            default: null,
            type: cc.AudioClip
        }
    },
    onLoad: function onLoad() {
        this.init();
    },
    init: function init() {
        var _this = this;
        cc.loader.loadRes("panel/subCanvas", function (err, prefab) {
            if (!err) {
                var node = cc.instantiate(prefab);
                _this.node.addChild(node);
            }
        });
        if (_gameConfig2.default.IS_WX) {
            if (CC_WECHATGAME) {
                this.tex = new cc.Texture2D();
                window.sharedCanvas.width = 750;
                window.sharedCanvas.height = 1206;
                wx.postMessage({
                    messageType: 2, //获取排行榜
                    MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM
                });
            }
        }
        this.node.on('touchstart', function (e) {
            e.stopPropagation();
        });
        _util2.default.btnEvent(this.closeBtn, this.btnSound, function () {
            if (_gameConfig2.default.IS_WX) {
                wx.postMessage({ messageType: 3, MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM });
                console.log(_gameDataManager2.default.isHideSub);
                if (_gameDataManager2.default.isHideSub) {
                    console.log('关闭排行榜隐藏子域');
                    wx.postMessage({ messageType: 5 });
                }
            }
            _GameUITools2.default.unLoadingLayer(_this.node);
        });
    },
    start: function start() {
        this.tex = new cc.Texture2D();
    },

    //获取排行
    // 刷新开放数据域的纹理
    _updateSubDomainCanvas: function _updateSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.subCanvas = new cc.SpriteFrame(this.tex);
    },
    update: function update() {
        if (_gameConfig2.default.IS_WX) {
            this._updateSubDomainCanvas();
        }
    }
});

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
        //# sourceMappingURL=rank.js.map
        