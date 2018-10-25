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
        navigateBtn: cc.Node,
        goBackHomeBtn: cc.Node,
        rankBtn: cc.Node,
        btnSound: cc.AudioClip,
        bestScore: cc.Label,
        nowScore: cc.Label,
        btnGroup: cc.Node,
        showOffbtn: cc.Node,
        showOffText: cc.Node
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
        _util2.default.btnEvent(this.navigateBtn, this.btnSound, function () {
            if (_gameConfig2.default.IS_WX) {
                wx.navigateToMiniProgram({
                    appId: 'wx60dc6bacf553bdfc',
                    success: function success(res) {
                        console.log("跳转成功");
                    }
                });
            }
        });
        _util2.default.btnEvent(this.showOffbtn, this.btnSound, function () {
            if (_gameConfig2.default.IS_WX) {
                if (_GameDataManager2.default.isBreakRecord) {
                    wx.shareAppMessage({
                        title: _gameConfig2.default.config.recordShareTitle,
                        imageUrl: _gameConfig2.default.config.recordShareImg,
                        query: "SHARECODE=" + wx.getStorageSync('shareCode')
                    });
                    //用户点击了“转发”按钮
                    wx.onShareAppMessage(function (res) {
                        return {
                            title: _gameConfig2.default.config.recordShareTitle,
                            imageUrl: _gameConfig2.default.config.recordShareImg,
                            query: "SHARECODE=" + wx.getStorageSync('shareCode')
                        };
                    });
                    wx.request({
                        url: _gameConfig2.default.INTER_URL + "game/share",
                        data: {
                            'title': _gameConfig2.default.config.recordShareTitle,
                            'image': _gameConfig2.default.config.recordShareImg,
                            'query': "SHARECODE=" + wx.getStorageSync('shareCode')
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'Cookie': "SESSION=" + wx.getStorageSync('sessionId')
                        },
                        method: "POST",
                        success: function success(res) {
                            console.log(res.data);
                            if (res.data.status == 1) {
                                console.log("游戏分享保存成功");
                            } else {
                                switch (res.data.code) {
                                    case 1005:
                                        console.log("游戏分享保存参数错误");
                                        break;
                                }
                            }
                        },
                        error: function error() {
                            console.log("连接错误");
                        }

                    });
                } else {
                    wx.shareAppMessage({
                        title: _gameConfig2.default.config.shareTitle,
                        imageUrl: _gameConfig2.default.config.shareImg,
                        query: "SHARECODE=" + wx.getStorageSync('shareCode')
                    });
                    wx.request({
                        url: _gameConfig2.default.INTER_URL + "game/share",
                        data: {
                            'title': _gameConfig2.default.config.shareTitle,
                            'image': _gameConfig2.default.config.shareImg,
                            'query': "SHARECODE=" + wx.getStorageSync('shareCode')
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'Cookie': "SESSION=" + wx.getStorageSync('sessionId')
                        },
                        method: "POST",
                        success: function success(res) {
                            console.log(res.data);
                            if (res.data.status == 1) {
                                console.log("游戏分享保存成功");
                            } else {
                                switch (res.data.code) {
                                    case 1005:
                                        console.log("游戏分享保存参数错误");
                                        break;
                                }
                            }
                        },
                        error: function error() {
                            console.log("连接错误");
                        }

                    });
                    //用户点击了“转发”按钮
                    wx.onShareAppMessage(function (res) {
                        return {
                            title: _gameConfig2.default.config.shareTitle,
                            imageUrl: _gameConfig2.default.config.shareImg,
                            query: "SHARECODE=" + wx.getStorageSync('shareCode')
                        };
                    });
                }
            }
        });
    },

    init: function init(game) {
        this.game = game;
    },
    showScore: function showScore() {
        try {
            if (_gameConfig2.default.IS_WX) {
                //分数记录
                if (wx.getStorageSync('gameScore')) {
                    var score = wx.getStorageSync('gameScore');
                    this.nowScore.string = "本次分值: " + _GameDataManager2.default.totalScore;
                    if (_GameDataManager2.default.totalScore > score) {
                        this.bestScore.string = "历史最佳: " + score;
                        wx.setStorageSync('gameScore', _GameDataManager2.default.totalScore);
                        this.showOffText.active = true;
                        _GameDataManager2.default.isHideSub = true;
                        _GameDataManager2.default.isBreakRecord = true;
                    } else {
                        this.showOffText.active = false;
                        _GameDataManager2.default.isBreakRecord = false;
                        this.bestScore.string = "历史最佳: " + score;
                        _GameDataManager2.default.isHideSub = false;
                    }
                } else {
                    this.nowScore.string = "本次分值: " + _GameDataManager2.default.totalScore;
                    this.bestScore.string = "历史最佳: " + _GameDataManager2.default.totalScore;
                    wx.setStorageSync('gameScore', _GameDataManager2.default.totalScore);
                    _GameDataManager2.default.isHideSub = true;
                }
                //微信存储分数
                var gameScore = _GameDataManager2.default.totalScore;
                wx.postMessage({ messageType: 1, score: gameScore, MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM });
                wx.postMessage({ messageType: 3, MAIN_MENU_NUM: _gameConfig2.default.MAIN_MENU_NUM });
                if (_GameDataManager2.default.isHideSub) {
                    wx.postMessage({ messageType: 5 });
                }
                //记录游戏数据
                wx.request({
                    url: _gameConfig2.default.INTER_URL + "game/over",
                    data: {
                        'gameId': _GameDataManager2.default.gameId,
                        'score': _GameDataManager2.default.totalScore
                    },
                    header: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'Cookie': "SESSION=" + wx.getStorageSync('sessionId')
                    },
                    method: "POST",
                    success: function success(res) {
                        console.log(res.data);
                        if (res.data.status == 1) {
                            console.log("游戏数据记录成功");
                        } else {
                            switch (res.data.code) {
                                case 1004:
                                    console.log("游戏不存在");
                                    break;
                                case 1005:
                                    console.log("游戏数据记录参数错误");
                                    break;
                            }
                        }
                    },
                    error: function error() {
                        console.log("连接错误");
                    }
                });
            }
        } catch (e) {
            _util2.default.gameLog(1, '游戏结果显示模块错误');
        }
    }
});

cc._RF.pop();