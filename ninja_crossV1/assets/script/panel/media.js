import GameConfig from '../gameConfig';
import GameDataManager from '../gameDataManager';
cc.Class({
    extends: cc.Component,
    properties: {
        musicOn:cc.Node,
        musicOff:cc.Node,
        bgm: cc.AudioClip,
        isMusicOn:true
    },
    // 生命周期
    onLoad() {
        var _this = this;
        cc.loader.load('https://cdn.feilaib.top/img/sounds/bg.mp3',function(err, clip){
            _this.bgm = clip;
            _this.musicInit();
        });
    },
    start() {},
    musicBtnDispaly: function () {
        this.musicOff.active = !this.musicOff.active;
        this.musicOn.active = !this.musicOn.active;
    },
    musicInit: function (){
        var _this = this;
        if (GameDataManager.canSoundPlay) {
            this.musicOff.active = false;
            cc.audioEngine.playMusic(this.bgm, true, 1);
        }
        else {
            this.musicOn.active = false;
        }
        this.musicOn.on('touchstart', function () {
            _this.musicBtnDispaly();
            GameDataManager.canSoundPlay = !GameDataManager.canSoundPlay
            cc.audioEngine.pauseMusic(_this.bgm, true, 1);
            GameConfig.isScreemCanTouch = false;
            setTimeout(function (){
                GameConfig.isScreemCanTouch = true;
            },300)
        });
        this.musicOff.on('touchstart', function () {
            _this.musicBtnDispaly();
            GameDataManager.canSoundPlay = !GameDataManager.canSoundPlay
            cc.audioEngine.resumeMusic(_this.bgm, true, 1);
            GameConfig.isScreemCanTouch = false;
            setTimeout(function () {
                GameConfig.isScreemCanTouch = true;
            },300)
        });
    }
});
