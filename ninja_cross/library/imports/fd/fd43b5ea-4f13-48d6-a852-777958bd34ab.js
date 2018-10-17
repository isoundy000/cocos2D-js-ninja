"use strict";
cc._RF.push(module, 'fd43bXqTxNI1qhSd3lYvTSr', 'GameOver');
// script/GameOver.js

'use strict';

var _util = require('./utils/util');

var _util2 = _interopRequireDefault(_util);

var _GameUITools = require('./utils/GameUITools');

var _GameUITools2 = _interopRequireDefault(_GameUITools);

var _gameConfig = require('./gameConfig');

var _gameConfig2 = _interopRequireDefault(_gameConfig);

var _GameDataManager = require('./GameDataManager');

var _GameDataManager2 = _interopRequireDefault(_GameDataManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

cc.Class({
    extends: cc.Component,
    properties: {
        playAgainBtn: cc.Node,
        advBtn: cc.Node,
        goBackHomeBtn: cc.Node,
        rankBtn: cc.Node,
        btnSound: cc.AudioClip,
        bestScore: cc.Label,
        nowScore: cc.Label,
        btnGroup: cc.Node,
        showOffbtn: cc.Node
    },
    onLoad: function onLoad() {
        var _this = this;
        //btn绑定事件
        cc.loader.loadRes("panel/subCanvas", function (err, prefab) {
            if (!err) {
                var node = cc.instantiate(prefab);
                _this.node.addChild(node);
            }
        });
        _util2.default.btnEvent(this.playAgainBtn, this.btnSound, function () {
            _gameConfig2.default.canResurrectTime = 1;
            _this.advBtn.active = true;
            _this.game.reStartGame();
            _this.node.active = false;
        });
        _util2.default.btnEvent(this.goBackHomeBtn, this.btnSound, function () {
            _GameUITools2.default.loadingScene('start');
            _gameConfig2.default.canResurrectTime = 1;
        });
        _util2.default.btnEvent(this.rankBtn, this.btnSound, function () {
            _GameUITools2.default.loadingLayer("panel/rank");
        });
        _util2.default.btnEvent(this.advBtn, this.btnSound, function () {
            _gameConfig2.default.canResurrectTime -= 1;
            _this.game.continueGame();
            _this.node.active = false;
        });
        _util2.default.btnEvent(this.showOffbtn, this.btnSound, function () {
            if (_gameConfig2.default.IS_WX) {
                switch (_GameDataManager2.default.toolChoose) {
                    case 0:
                        wx.shareAppMessage({
                            title: '@你,快来超越我吧',
                            imageUrl: "https://st.gwold.com/wfclb/ninja/pic/stickmode.png"
                        });
                        break;
                    case 1:
                        wx.shareAppMessage({
                            title: '@你,快来超越我吧',
                            imageUrl: "https://st.gwold.com/wfclb/ninja/pic/bridgemode.png"
                        });
                        break;
                    case 2:
                        wx.shareAppMessage({
                            title: '@你,快来超越我吧',
                            imageUrl: "https://st.gwold.com/wfclb/ninja/pic/jumpmode.jpg"
                        });
                        break;
                }
            }
        });
    },

    init: function init(game) {
        this.game = game;
    },
    showScore: function showScore() {
        if (localStorage.getItem("score")) {
            var score = localStorage.getItem("score");
            this.nowScore.string = "本次分值: " + _GameDataManager2.default.totalScore;
            if (_GameDataManager2.default.totalScore > score) {
                this.bestScore.string = "历史最佳: " + score;
                localStorage.setItem("score", _GameDataManager2.default.totalScore);
            } else {
                this.bestScore.string = "历史最佳: " + score;
            }
        } else {
            this.nowScore.string = "本次分值: " + _GameDataManager2.default.totalScore;
            this.bestScore.string = "历史最佳: " + _GameDataManager2.default.totalScore;
            localStorage.setItem("score", _GameDataManager2.default.totalScore);
        }
        //微信存储分数
        var gameScore = _GameDataManager2.default.totalScore;
        if (_gameConfig2.default.IS_WX) {
            wx.postMessage({ messageType: 1, score: gameScore, MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM });
        }
        if (_gameConfig2.default.IS_WX) {
            wx.postMessage({ messageType: 3, MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM });
        }
    }
});

cc._RF.pop();