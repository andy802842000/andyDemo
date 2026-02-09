window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AudioManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ccbfzDumVNG4DeFv0lBdag", "AudioManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AudioManager_alchemist = void 0;
    var AudioType_alchemist_1 = require("./AudioType_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var RemoteAssetManager_alchemist_1 = require("../RemoteAssetManager_alchemist");
    var AudioManager_alchemist = function() {
      function AudioManager_alchemist() {}
      AudioManager_alchemist.Remoteinit = function() {
        this.RemoteMusicToMap("MAINGAME");
        this.RemoteMusicToMap("FREEGAME");
        this.RemoteMusicToMap("Particle01");
        this.RemoteMusicToMap("Particle02");
        this.RemoteMusicToMap("ParticleEnd");
        this.RemoteSoundToMap("SPIN_START");
        this.RemoteSoundToMap("SPIN_STOP");
        this.RemoteSoundToMap("CLICK_BUTTON");
        this.RemoteSoundToMap("WinLine");
        this.RemoteSoundToMap("BigWinLevelUp");
        this.RemoteSoundToMap("ScatterListent");
        this.RemoteSoundToMap("ScatterReward");
        this.RemoteSoundToMap("Scatter01");
        this.RemoteSoundToMap("Scatter02");
        this.RemoteSoundToMap("Scatter03");
        this.RemoteSoundToMap("Scatter04");
        this.RemoteSoundToMap("Scatter05");
        this.RemoteSoundToMap("FreeGamePlus");
        this.RemoteSoundToMap("WildStick");
        this.RemoteSoundToMap("Flash_to_FG");
        this.RemoteSoundToMap("FreeGameResult");
        GameManager_alchemist_1.default.GM.AudioReady = true;
      };
      AudioManager_alchemist.RemoteMusicToMap = function(clipName) {
        var clip = RemoteAssetManager_alchemist_1.default.self.getAsset(clipName);
        this.m_MusicClipMap.set(clipName, clip);
      };
      AudioManager_alchemist.RemoteSoundToMap = function(clipName) {
        var clip = RemoteAssetManager_alchemist_1.default.self.getAsset(clipName);
        this.m_SoundClipMap.set(clipName, clip);
      };
      AudioManager_alchemist.playMusic = function(music, loop) {
        void 0 === loop && (loop = true);
        if ("" == music.toString()) return;
        var clip = AudioManager_alchemist.getClip(this.m_MusicClipMap, music);
        var id = cc.audioEngine.playMusic(clip, loop);
        this.m_MusicClipMap.forEach(function(item) {
          console.log("clip=" + item + "\n");
        });
        this.m_TempPlayingMusics.set(music, id);
        return id;
      };
      AudioManager_alchemist.playSound = function(sound, loop, newClip) {
        void 0 === loop && (loop = false);
        void 0 === newClip && (newClip = false);
        if ("" == sound.toString()) return;
        newClip || this.stopSound(sound);
        var clip = AudioManager_alchemist.getClip(this.m_SoundClipMap, sound);
        var id = cc.audioEngine.playEffect(clip, loop);
        this.m_TempPlayingSounds.set(sound, id);
        return id;
      };
      AudioManager_alchemist.stopMusic = function() {
        cc.audioEngine.stopMusic();
      };
      AudioManager_alchemist.stopSound = function(sound) {
        var state = this.getAudioState(sound);
        if (state == cc.audioEngine.AudioState.PLAYING) {
          var id = this.m_TempPlayingSounds.get(sound);
          cc.audioEngine.stopEffect(id);
        }
      };
      AudioManager_alchemist.isEnum = function(value, e) {
        return Object.values(e).includes(value);
      };
      AudioManager_alchemist.getAudioState = function(type) {
        var id = -1;
        AudioManager_alchemist.isEnum(type, AudioType_alchemist_1.MusicType_alchemist) ? id = this.m_TempPlayingMusics.get(type) : AudioManager_alchemist.isEnum(type, AudioType_alchemist_1.SoundType_alchemist) && (id = this.m_TempPlayingSounds.get(type));
        if (void 0 == id || id < 0) return cc.audioEngine.AudioState.STOPPED;
        return cc.audioEngine.getState(id);
      };
      AudioManager_alchemist.setMusicVolume = function(volume) {
        cc.audioEngine.setMusicVolume(volume);
      };
      AudioManager_alchemist.setSoundVolume = function(volume) {
        cc.audioEngine.setEffectsVolume(volume);
      };
      AudioManager_alchemist.getClip = function(map, type) {
        var result = map.get(type);
        void 0 === result && cc.log("Cannot find sound of type: " + type);
        return result;
      };
      AudioManager_alchemist.clipsToMap = function(clips) {
        var map = new Map();
        clips.forEach(function(clip) {
          map.set(clip.name, clip);
        });
        return map;
      };
      AudioManager_alchemist.MusicFolderUrl = "Audio/Music/";
      AudioManager_alchemist.SoundFolderUrl = "Audio/Sound/";
      AudioManager_alchemist.m_MusicClipMap = new Map();
      AudioManager_alchemist.m_SoundClipMap = new Map();
      AudioManager_alchemist.m_TempPlayingSounds = new Map();
      AudioManager_alchemist.m_TempPlayingMusics = new Map();
      return AudioManager_alchemist;
    }();
    exports.AudioManager_alchemist = AudioManager_alchemist;
    cc._RF.pop();
  }, {
    "../GameManager_alchemist": "GameManager_alchemist",
    "../RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist",
    "./AudioType_alchemist": "AudioType_alchemist"
  } ],
  AudioType_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a5297LCDVpKd57kKB86bPU5", "AudioType_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SoundType_alchemist = exports.MusicType_alchemist = void 0;
    var MusicType_alchemist;
    (function(MusicType_alchemist) {
      MusicType_alchemist["MAINGAME"] = "MAINGAME";
      MusicType_alchemist["FREEGAME"] = "FREEGAME";
      MusicType_alchemist["Particle01"] = "Particle01";
      MusicType_alchemist["Particle02"] = "Particle02";
      MusicType_alchemist["ParticleEnd"] = "ParticleEnd";
    })(MusicType_alchemist = exports.MusicType_alchemist || (exports.MusicType_alchemist = {}));
    var SoundType_alchemist;
    (function(SoundType_alchemist) {
      SoundType_alchemist["SPIN_START"] = "SPIN_START";
      SoundType_alchemist["SPIN_STOP"] = "SPIN_STOP";
      SoundType_alchemist["CLICK_BUTTON"] = "CLICK_BUTTON";
      SoundType_alchemist["WinLine"] = "WinLine";
      SoundType_alchemist["BigWinLevelUp"] = "BigWinLevelUp";
      SoundType_alchemist["ScatterListent"] = "ScatterListent";
      SoundType_alchemist["ScatterReward"] = "ScatterReward";
      SoundType_alchemist["Scatter01"] = "Scatter01";
      SoundType_alchemist["Scatter02"] = "Scatter02";
      SoundType_alchemist["Scatter03"] = "Scatter03";
      SoundType_alchemist["Scatter04"] = "Scatter04";
      SoundType_alchemist["Scatter05"] = "Scatter05";
      SoundType_alchemist["FreeGamePlus"] = "FreeGamePlus";
      SoundType_alchemist["WildStick"] = "WildStick";
      SoundType_alchemist["Flash_to_FG"] = "Flash_to_FG";
      SoundType_alchemist["FreeGameResult"] = "FreeGameResult";
    })(SoundType_alchemist = exports.SoundType_alchemist || (exports.SoundType_alchemist = {}));
    cc._RF.pop();
  }, {} ],
  AutoPlay_Setting_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dff7dLKcJFxZIrJiaXvegL", "AutoPlay_Setting_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameServer_alchemist_1 = require("../FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var UI_interface_alchemist_1 = require("./UI_interface_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AutoPlay_Setting = function(_super) {
      __extends(AutoPlay_Setting, _super);
      function AutoPlay_Setting() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.MaxForceTime = .5;
        _this.m_Time = 0;
        _this.m_IsTouching = false;
        _this.force = 0;
        _this.shouldPlaySound = false;
        _this.m_fastmode = false;
        _this.btn_Confirm = null;
        _this.btn_close = null;
        _this.btn_Set_autotimes = [];
        _this.lbl_Current_loopTime = null;
        _this.setting_looptimes = 0;
        _this.SmallerCredit = 0;
        _this.BiggerCredit = 0;
        _this.btn_BiggerAdd = null;
        _this.btn_BiggerSub = null;
        _this.btn_SmallerAdd = null;
        _this.btn_SmallerSub = null;
        _this.lbl_Biggerlimit = null;
        _this.lbl_Smallerlimit = null;
        _this.tgl_Bigger = null;
        _this.tgl_Smaller = null;
        _this.tgl_bonus = null;
        _this.tgl_skipscreen = null;
        _this.tgl_quickspin = null;
        _this.node_unlimted = null;
        _this.m_eachtime_ChangeValue = 0;
        _this.btnname = "";
        _this.isBonusContinue = false;
        _this.times = [ 10, 30, 50, 100, 200, 1e3 ];
        _this.eachtime_ChangeValue = 100;
        return _this;
      }
      AutoPlay_Setting.prototype.setButton = function(button, value) {
        var _this = this;
        button.node.on(cc.Node.EventType.TOUCH_START, function() {
          _this.btnname = button.node.name;
          _this.m_IsTouching = true;
          _this.m_eachtime_ChangeValue = value;
        });
        button.node.on(cc.Node.EventType.TOUCH_END, function() {
          _this.m_IsTouching = false;
          _this.m_Time = 0;
        });
        button.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
          _this.m_IsTouching = false;
          _this.m_Time = 0;
        });
      };
      AutoPlay_Setting.prototype.init = function() {
        var _this = this;
        var _loop_1 = function(i) {
          this_1.btn_Set_autotimes[i].node.on("click", function() {
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
            if (i != _this.btn_Set_autotimes.length - 1) {
              _this.setting_looptimes = _this.times[i];
              _this.lbl_Current_loopTime.string = UI_interface_alchemist_1.default.self.language_assets.START_AUTOPLAY + " (" + _this.times[i].toString() + ")";
            }
            if (i == _this.btn_Set_autotimes.length - 1) {
              _this.setting_looptimes = _this.times[i];
              _this.lbl_Current_loopTime.string = UI_interface_alchemist_1.default.self.language_assets.START_AUTOPLAY + " (\u221e)";
            }
          });
        };
        var this_1 = this;
        for (var i = 0; i < this.btn_Set_autotimes.length; i++) _loop_1(i);
        this.tgl_quickspin.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          UI_interface_alchemist_1.default.self.QuickSpinFlag = !UI_interface_alchemist_1.default.self.QuickSpinFlag;
          UI_interface_alchemist_1.default.self.AutoSetting.tgl_quickspin.isChecked = UI_interface_alchemist_1.default.self.SystemSetting.tgl_quickspin.isChecked = UI_interface_alchemist_1.default.self.QuickSpinFlag;
          GameManager_alchemist_1.default.GM.Instance_WheelManager.resetStopPara();
        });
        this.btn_BiggerAdd.node.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.BiggerCredit += 10;
          _this.lbl_Biggerlimit.string = _this.BiggerCredit.toString();
          _this.BiggerCredit > GameServer_alchemist_1.default.self.UserCredit && (_this.btn_BiggerSub.interactable = true);
        });
        this.btn_BiggerSub.node.on("click", function() {
          if (_this.BiggerCredit > GameServer_alchemist_1.default.self.UserCredit) {
            _this.BiggerCredit -= 10;
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
            _this.lbl_Biggerlimit.string = _this.BiggerCredit.toString();
            _this.BiggerCredit <= GameServer_alchemist_1.default.self.UserCredit && (_this.btn_BiggerSub.interactable = false);
          }
        });
        this.btn_SmallerAdd.node.on("click", function() {
          if (_this.SmallerCredit < GameServer_alchemist_1.default.self.UserCredit) {
            _this.SmallerCredit += 10;
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
            _this.lbl_Smallerlimit.string = _this.SmallerCredit.toString();
            _this.SmallerCredit == GameServer_alchemist_1.default.self.UserCredit && (_this.btn_SmallerAdd.interactable = false);
          }
        });
        this.btn_SmallerSub.node.on("click", function() {
          if (_this.SmallerCredit > 0) {
            _this.SmallerCredit -= 10;
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          }
          _this.lbl_Smallerlimit.string = _this.SmallerCredit.toString();
          _this.SmallerCredit <= 0 && (_this.btn_SmallerSub.interactable = false);
          _this.SmallerCredit < GameServer_alchemist_1.default.self.UserCredit && (_this.btn_SmallerAdd.interactable = true);
        });
        this.btn_Confirm.node.on("click", function() {
          if (_this.setting_looptimes <= 0) {
            _this.node.getChildByName("Page_Auto(\u81ea\u52d5\u9801\u9762)").active = _this.node.getChildByName("tgl_auto").getComponent(cc.Toggle).isChecked = false;
            return;
          }
          if (_this.setting_looptimes > 0) {
            if (_this.tgl_Bigger.isChecked) {
              UI_interface_alchemist_1.default.self.BiggerSetting = _this.BiggerCredit;
              UI_interface_alchemist_1.default.self.BiggerTag = true;
            }
            if (_this.tgl_Smaller.isChecked) {
              UI_interface_alchemist_1.default.self.SmallerSetting = _this.SmallerCredit;
              UI_interface_alchemist_1.default.self.SmallerTag = true;
            }
            UI_interface_alchemist_1.default.self.LoopTimes = _this.setting_looptimes;
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
            _this.node.getChildByName("tgl_auto").getComponent(cc.Toggle).isChecked = false;
            _this.SmallerCredit = _this.BiggerCredit = GameServer_alchemist_1.default.self.UserCredit;
            _this.lbl_Smallerlimit.string = _this.lbl_Biggerlimit.string = GameServer_alchemist_1.default.self.UserCredit.toString();
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          }
          _this.node.getChildByName("Page_Auto(\u81ea\u52d5\u9801\u9762)").active = _this.node.getChildByName("tgl_auto").getComponent(cc.Toggle).isChecked = false;
          GameManager_alchemist_1.default.GM.GameState == EventSystem_alchemist_1.EventType_alchemist.Normal && GameManager_alchemist_1.default.GM.Spin.node.emit("click");
          _this.setting_looptimes <= 200 && (_this.setting_looptimes -= 1);
          UI_interface_alchemist_1.default.self.LoopTimes = _this.setting_looptimes;
          UI_interface_alchemist_1.default.self.Update_UI();
          _this.init_AutoPlaySetting();
        });
        this.setButton(this.btn_SmallerAdd, 100);
        this.setButton(this.btn_SmallerSub, -100);
        this.setButton(this.btn_BiggerAdd, 100);
        this.setButton(this.btn_BiggerSub, -100);
        this.tgl_bonus.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.isBonusContinue = _this.tgl_bonus.isChecked;
        });
        this.tgl_skipscreen.node.on("toggle", function() {
          GameManager_alchemist_1.default.GM.isSkipMode = _this.tgl_skipscreen.isChecked;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.tgl_Bigger.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.tgl_Smaller.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_close.node.on("click", function() {
          _this.node.getChildByName("tgl_auto").getComponent(cc.Toggle).isChecked = false;
          _this.node.getChildByName("Page_Auto(\u81ea\u52d5\u9801\u9762)").active = false;
          _this.BiggerCredit = GameServer_alchemist_1.default.self.UserCredit;
          _this.lbl_Biggerlimit.string = _this.BiggerCredit.toString();
          _this.SmallerCredit = GameServer_alchemist_1.default.self.UserCredit;
          _this.lbl_Smallerlimit.string = _this.SmallerCredit.toString();
          _this.BiggerCredit = GameServer_alchemist_1.default.self.UserCredit;
          _this.lbl_Biggerlimit.string = _this.BiggerCredit.toString();
          _this.btn_BiggerSub.interactable = false;
          _this.SmallerCredit = GameServer_alchemist_1.default.self.UserCredit;
          _this.lbl_Smallerlimit.string = _this.SmallerCredit.toString();
          _this.btn_SmallerAdd.interactable = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
      };
      AutoPlay_Setting.prototype.init_AutoPlaySetting = function() {
        this.BiggerCredit = GameServer_alchemist_1.default.self.UserCredit;
        this.lbl_Biggerlimit.string = this.BiggerCredit.toString();
        this.SmallerCredit = GameServer_alchemist_1.default.self.UserCredit;
        this.lbl_Smallerlimit.string = this.SmallerCredit.toString();
        this.btn_BiggerSub.interactable = false;
        this.btn_SmallerAdd.interactable = false;
        this.tgl_Bigger.isChecked = false;
        this.tgl_Smaller.isChecked = false;
        this.setting_looptimes = 0;
        this.lbl_Current_loopTime.string = UI_interface_alchemist_1.default.self.language_assets.START_AUTOPLAY + " (0)";
      };
      AutoPlay_Setting.prototype.update = function(dt) {
        if (this.m_IsTouching) {
          this.m_Time += dt;
          if (this.m_Time > this.MaxForceTime) {
            this.m_Time = .2;
            if ("BiggerCredit+" == this.btnname) {
              this.BiggerCredit > GameServer_alchemist_1.default.self.UserCredit && (this.btn_BiggerSub.interactable = true);
              this.BiggerCredit += this.eachtime_ChangeValue;
              this.lbl_Biggerlimit.string = this.BiggerCredit.toString();
            }
            if ("BiggerCredit-" == this.btnname && this.BiggerCredit > GameServer_alchemist_1.default.self.UserCredit) {
              this.BiggerCredit -= 100;
              this.lbl_Biggerlimit.string = this.BiggerCredit.toString();
              if (this.BiggerCredit <= GameServer_alchemist_1.default.self.UserCredit) {
                this.btn_BiggerSub.interactable = false;
                this.BiggerCredit = GameServer_alchemist_1.default.self.UserCredit;
                this.lbl_Biggerlimit.string = this.BiggerCredit.toString();
              }
            }
            if ("SmallerCredit+" == this.btnname && this.SmallerCredit < GameServer_alchemist_1.default.self.UserCredit) {
              this.SmallerCredit += 100;
              this.lbl_Smallerlimit.string = this.SmallerCredit.toString();
              if (this.SmallerCredit >= GameServer_alchemist_1.default.self.UserCredit) {
                this.btn_SmallerAdd.interactable = false;
                this.SmallerCredit = GameServer_alchemist_1.default.self.UserCredit;
                this.lbl_Smallerlimit.string = this.SmallerCredit.toString();
              }
            }
            if ("SmallerCredit-" == this.btnname) {
              this.SmallerCredit > 0 && (this.SmallerCredit -= 100);
              this.lbl_Smallerlimit.string = this.SmallerCredit.toString();
              this.SmallerCredit < GameServer_alchemist_1.default.self.UserCredit && (this.btn_SmallerAdd.interactable = true);
            }
          }
        }
      };
      __decorate([ property({
        type: cc.Float,
        displayName: "+-\u6309\u9215 \u6309\u58d3\u6301\u7e8c\u6642\u9593"
      }) ], AutoPlay_Setting.prototype, "MaxForceTime", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_Confirm", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_close", void 0);
      __decorate([ property({
        type: [ cc.Button ],
        displayName: "\u6309\u9215\u81ea\u52d5\u6b21\u662f\u6578"
      }) ], AutoPlay_Setting.prototype, "btn_Set_autotimes", void 0);
      __decorate([ property(cc.Label) ], AutoPlay_Setting.prototype, "lbl_Current_loopTime", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_BiggerAdd", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_BiggerSub", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_SmallerAdd", void 0);
      __decorate([ property(cc.Button) ], AutoPlay_Setting.prototype, "btn_SmallerSub", void 0);
      __decorate([ property(cc.Label) ], AutoPlay_Setting.prototype, "lbl_Biggerlimit", void 0);
      __decorate([ property(cc.Label) ], AutoPlay_Setting.prototype, "lbl_Smallerlimit", void 0);
      __decorate([ property(cc.Toggle) ], AutoPlay_Setting.prototype, "tgl_Bigger", void 0);
      __decorate([ property(cc.Toggle) ], AutoPlay_Setting.prototype, "tgl_Smaller", void 0);
      __decorate([ property(cc.Toggle) ], AutoPlay_Setting.prototype, "tgl_bonus", void 0);
      __decorate([ property(cc.Toggle) ], AutoPlay_Setting.prototype, "tgl_skipscreen", void 0);
      __decorate([ property(cc.Toggle) ], AutoPlay_Setting.prototype, "tgl_quickspin", void 0);
      __decorate([ property(cc.Node) ], AutoPlay_Setting.prototype, "node_unlimted", void 0);
      AutoPlay_Setting = __decorate([ ccclass ], AutoPlay_Setting);
      return AutoPlay_Setting;
    }(cc.Component);
    exports.default = AutoPlay_Setting;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "./UI_interface_alchemist": "UI_interface_alchemist"
  } ],
  AxisListManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "923716ffsVFraKuzW22Zw5L", "AxisListManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var FreeAxisManager_alchemist_1 = require("./FreeAxisManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var AxisListManager_alchemist = function(_super) {
      __extends(AxisListManager_alchemist, _super);
      function AxisListManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.FreeAxisList = [];
        _this.Reels = null;
        _this.ReelsBg = null;
        _this.EnergyBarBg = null;
        _this.ReelHint = null;
        _this.m_ReelsSpining = false;
        _this.m_ReelsHint = false;
        _this.m_ReelsHintIndex = 0;
        _this.m_ReelsHintAniType = 0;
        _this.m_HintTab = [ false, false, false, false, false ];
        _this.m_Reel_Hint_PosX = [ 0, 0, 0, 0, 0 ];
        _this.m_NowFreeSpinIng = false;
        _this.m_FreeSpining = false;
        _this.m_ReelsRectPosition = [ cc.v3(42, 0, 0), cc.v3(0, 183, 0) ];
        _this.m_ReelsRectScale = [ cc.v3(.9, .9, 1), cc.v3(.72, .72, 1) ];
        return _this;
      }
      AxisListManager_alchemist.prototype.start = function() {};
      AxisListManager_alchemist.prototype.init = function() {
        for (var i = 0; i < this.FreeAxisList.length; i++) this.FreeAxisList[i].init(15 + 10 * i, i);
        this.m_ReelsHintAniType = 0;
        this.Reels.getChildByName("ReelsRect").active = true;
        this.Reels.getChildByName("FreeReelsRect").active = false;
      };
      AxisListManager_alchemist.prototype.SetResultSunScore = function(scoretab) {
        return;
      };
      AxisListManager_alchemist.prototype.SetFreeResult = function(result) {
        for (var i = 0; i < this.FreeAxisList.length; i++) {
          var sym_id = result[i];
          this.FreeAxisList[i].SetResult(sym_id);
        }
      };
      AxisListManager_alchemist.prototype.SymbolBoxHide = function(index) {};
      AxisListManager_alchemist.prototype.onSpin = function(freeFlg) {
        this.m_FreeSpining = freeFlg;
        if (this.m_FreeSpining) {
          var Runningcountindex = 0;
          for (var i = 0; i < this.FreeAxisList.length; i++) if (!this.FreeAxisList[i].m_IsGetSun) {
            this.FreeAxisList[i].SetRunningcountnum(15 + 10 * Runningcountindex);
            Runningcountindex += 1;
            this.FreeAxisList[i].AxisRunningStart();
          }
        }
        this.m_ReelsSpining = true;
      };
      AxisListManager_alchemist.prototype.QuickStop = function() {
        return;
      };
      AxisListManager_alchemist.prototype.CheckHint = function() {
        return;
      };
      AxisListManager_alchemist.prototype.HintShowStart = function() {
        this.m_ReelsHintAniType = 0;
      };
      AxisListManager_alchemist.prototype.ChangeHintLoop = function() {
        0 == this.m_ReelsHintAniType && (this.m_ReelsHintAniType = 1);
      };
      AxisListManager_alchemist.prototype.HintShowEnd = function() {
        this.ReelHint.getComponent(sp.Skeleton).clearTracks();
        this.ReelHint.getComponent(sp.Skeleton).setToSetupPose();
        this.ReelHint.active = false;
      };
      AxisListManager_alchemist.prototype.ChangeSymbol = function(index, id) {
        return;
      };
      AxisListManager_alchemist.prototype.RandSymbolID = function(freeFlg, index) {
        void 0 === index && (index = 0);
        return;
      };
      AxisListManager_alchemist.prototype.SetSymbolShow = function(index, show) {
        return;
      };
      AxisListManager_alchemist.prototype.SetSymbolDark = function(index, dark) {
        return;
      };
      AxisListManager_alchemist.prototype.SetSymbolScore = function(index, score) {};
      AxisListManager_alchemist.prototype.SetSymbolSunDark = function(index) {
        return;
      };
      AxisListManager_alchemist.prototype.ChangeCameraType = function(CameraType) {
        this.Reels.setPosition(this.m_ReelsRectPosition[CameraType]);
        this.Reels.setScale(this.m_ReelsRectScale[CameraType]);
        if (0 == CameraType) {
          this.ReelsBg.active = true;
          this.EnergyBarBg.active = true;
        } else {
          this.ReelsBg.active = false;
          this.EnergyBarBg.active = false;
        }
      };
      AxisListManager_alchemist.prototype.SetFreeSpinIngFlg = function(flg) {
        return;
      };
      AxisListManager_alchemist.prototype.ChangeToFreeReels = function() {
        this.Reels.getChildByName("ReelsRect").active = false;
        this.Reels.getChildByName("FreeReelsRect").active = true;
      };
      AxisListManager_alchemist.prototype.ChangeToMainReels = function() {
        this.Reels.getChildByName("ReelsRect").active = true;
        this.Reels.getChildByName("FreeReelsRect").active = false;
      };
      AxisListManager_alchemist.prototype.SetMainReelsShow = function(show) {
        this.Reels.getChildByName("ReelsRect").active = show;
      };
      AxisListManager_alchemist.prototype.SetFreeReelsShow = function(show) {
        this.Reels.getChildByName("FreeReelsRect").active = show;
      };
      AxisListManager_alchemist.prototype.update = function(dt) {
        if (this.m_ReelsSpining) {
          this.m_ReelsHint && this.CheckHint();
          if (this.m_FreeSpining) {
            for (var i = 0; i < this.FreeAxisList.length; i++) {
              if (true == this.FreeAxisList[i].m_Spining) return;
              this.SymbolBoxHide(i);
            }
            for (var i = 0; i < this.FreeAxisList.length; i++) this.FreeAxisList[i].AllAxisStopSetting();
          }
          this.m_ReelsSpining = false;
        }
      };
      __decorate([ property([ FreeAxisManager_alchemist_1.default ]) ], AxisListManager_alchemist.prototype, "FreeAxisList", void 0);
      __decorate([ property(cc.Node) ], AxisListManager_alchemist.prototype, "Reels", void 0);
      __decorate([ property(cc.Node) ], AxisListManager_alchemist.prototype, "ReelsBg", void 0);
      __decorate([ property(cc.Node) ], AxisListManager_alchemist.prototype, "EnergyBarBg", void 0);
      __decorate([ property(cc.Node) ], AxisListManager_alchemist.prototype, "ReelHint", void 0);
      AxisListManager_alchemist = __decorate([ ccclass ], AxisListManager_alchemist);
      return AxisListManager_alchemist;
    }(cc.Component);
    exports.default = AxisListManager_alchemist;
    cc._RF.pop();
  }, {
    "./FreeAxisManager_alchemist": "FreeAxisManager_alchemist"
  } ],
  Bet_Setting_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d2479VRbNJAJYRSejsmYw1M", "Bet_Setting_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameServer_alchemist_1 = require("../FakeServer/GameServer_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Bet_Setting_TS = function(_super) {
      __extends(Bet_Setting_TS, _super);
      function Bet_Setting_TS() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.title_GameLine = null;
        _this.btn_perLine_Add = null;
        _this.btn_perLine_Sub = null;
        _this.btn_Total_Add = null;
        _this.btn_Total_Sub = null;
        _this.title_TotalLine = null;
        _this.btn_Confirm = null;
        _this.btn_close = null;
        _this.value_PerLine = null;
        _this.value_TotalBet = null;
        _this.BetList = [];
        _this._BetIndex = 0;
        return _this;
      }
      Object.defineProperty(Bet_Setting_TS.prototype, "BetIndex", {
        get: function() {
          return this._BetIndex;
        },
        set: function(v) {
          var idx = v;
          v = idx < 0 ? this.BetList.length - Math.abs(idx) : idx % this.BetList.length;
          this._BetIndex = v;
        },
        enumerable: false,
        configurable: true
      });
      Bet_Setting_TS.prototype.init = function() {
        var _this = this;
        this.btn_Total_Add.node.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.BetIndex += 1;
          var textTotalBet = _this.BetList[_this.BetIndex];
          _this.value_TotalBet.string = textTotalBet.toString();
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.UpdateUI);
        });
        this.btn_Total_Sub.node.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.BetIndex -= 1;
          var textTotalBet = _this.BetList[_this.BetIndex];
          _this.value_TotalBet.string = textTotalBet.toString();
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.UpdateUI);
        });
        this.btn_close.node.on("click", function() {
          _this.node.parent.getChildByName("tgl_bet").getComponent(cc.Toggle).isChecked = false;
          _this.node.parent.getChildByName("Page_Bet(\u4e0b\u6ce8\u9801\u9762)").active = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_Confirm.node.on("click", function() {
          _this.node.parent.getChildByName("tgl_bet").getComponent(cc.Toggle).isChecked = false;
          _this.node.parent.getChildByName("Page_Bet(\u4e0b\u6ce8\u9801\u9762)").active = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          GameServer_alchemist_1.default.self.setBet(_this.BetIndex);
        });
      };
      Bet_Setting_TS.prototype.lateUpdate = function(dt) {};
      Bet_Setting_TS.prototype.onEnable = function() {
        this.BetList = GameServer_alchemist_1.default.self.Bet_list;
        this.BetIndex = GameServer_alchemist_1.default.self.BetIdx;
        var textTotalBet = this.BetList[this.BetIndex];
        this.value_TotalBet.string = textTotalBet.toString();
      };
      __decorate([ property(cc.Label) ], Bet_Setting_TS.prototype, "title_GameLine", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_perLine_Add", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_perLine_Sub", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_Total_Add", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_Total_Sub", void 0);
      __decorate([ property(cc.Label) ], Bet_Setting_TS.prototype, "title_TotalLine", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_Confirm", void 0);
      __decorate([ property(cc.Button) ], Bet_Setting_TS.prototype, "btn_close", void 0);
      __decorate([ property(cc.Label) ], Bet_Setting_TS.prototype, "value_PerLine", void 0);
      __decorate([ property(cc.Label) ], Bet_Setting_TS.prototype, "value_TotalBet", void 0);
      Bet_Setting_TS = __decorate([ ccclass ], Bet_Setting_TS);
      return Bet_Setting_TS;
    }(cc.Component);
    exports.default = Bet_Setting_TS;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../FakeServer/GameServer_alchemist": "GameServer_alchemist"
  } ],
  BigWinManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe31elEoTtG45JsbJ9k2sag", "BigWinManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BigWinState = void 0;
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BigWinState;
    (function(BigWinState) {
      BigWinState[BigWinState["BigWin_In"] = 0] = "BigWin_In";
      BigWinState[BigWinState["BigWin_Loop"] = 1] = "BigWin_Loop";
      BigWinState[BigWinState["HugeWin_In"] = 3] = "HugeWin_In";
      BigWinState[BigWinState["HugeWin_Loop"] = 4] = "HugeWin_Loop";
      BigWinState[BigWinState["MegaWin_In"] = 6] = "MegaWin_In";
      BigWinState[BigWinState["MegaWin_Loop"] = 7] = "MegaWin_Loop";
      BigWinState[BigWinState["SuperWin_In"] = 9] = "SuperWin_In";
      BigWinState[BigWinState["SuperWin_Loop"] = 10] = "SuperWin_Loop";
      BigWinState[BigWinState["BigWinShowEnd"] = 12] = "BigWinShowEnd";
    })(BigWinState = exports.BigWinState || (exports.BigWinState = {}));
    var BigWinManager = function(_super) {
      __extends(BigWinManager, _super);
      function BigWinManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BigWinBottomBackgroun = null;
        _this.BigWinAni = null;
        _this.BigWinNum = null;
        _this.numSpriteAtlas_bigwin = [];
        _this.DigitalLayout = null;
        _this.m_BigWinAniName = [ "1.bigWin_in", "2.bigWin_loop", "", "3.superWin_in", "4.superWin_loop", "", "5.megaWin_in", "6.megaWin_loop", "", "5.megaWin_in", "6.megaWin_loop", "" ];
        _this.m_BigWinAniLoop = [ false, true, false, true, false, true, false, true ];
        _this.m_BigWinLevel = [ 30, 50, 70 ];
        _this.m_BigWinNowNum = 0;
        _this.m_BigWinFinilNum = 0;
        _this.m_BigWinAddCount = 0;
        _this.m_BigWinState = 0;
        _this.m_NowBigWinLevel = 0;
        _this.m_BigWinShowFlg = false;
        _this.m_BigWinCountFlg = false;
        _this.m_canSkipFlag = false;
        _this.m_lastStateShowTime = 0;
        _this.closeBigWinScreen = function() {
          GameManager_alchemist_1.default.GM.isBigWin = false;
          _this.node.active = false;
          GameManager_alchemist_1.default.GM.touch_Block.enabled = false;
          GameManager_alchemist_1.default.GM.bigWinBG.active = false;
          _this.m_canSkipFlag = false;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.BigWinShowEnd);
        };
        return _this;
      }
      BigWinManager.prototype.init = function() {
        var _this = this;
        this.BigWinBottomBackgroun = this.node.parent.getChildByName("BigWin_BG").getComponent(cc.Sprite);
        this.BigWinAni.setCompleteListener(function() {
          _this.BigWinAniComplete();
        });
        this.node.getChildByName("Block").on(cc.Node.EventType.TOUCH_START, function() {
          _this.LevelUp();
          _this.m_canSkipFlag && (_this.m_lastStateShowTime += 3);
        }, this);
      };
      BigWinManager.prototype.BigWinAniShow = function(finialwinNum) {
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.BigWinLevelUp);
        this.m_BigWinShowFlg = true;
        this.m_BigWinCountFlg = true;
        this.BigWinBottomBackgroun.node.active = true;
        AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.Particle01, true);
        this.m_BigWinState = BigWinState.BigWin_In;
        this.node.active = true;
        this.BigWinAni.node.active = true;
        this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], false);
        this.m_NowBigWinLevel = 0;
        this.m_BigWinNowNum = 0;
        this.m_BigWinAddCount = GameServer_alchemist_1.default.self.getTotalBet() / 12;
        this.m_BigWinFinilNum = finialwinNum;
      };
      BigWinManager.prototype.BigWinAniShowEnd = function() {
        this.m_BigWinState == BigWinState.BigWin_In || this.m_BigWinState == BigWinState.BigWin_Loop ? this.BigWinEnd(false) : this.m_BigWinState == BigWinState.HugeWin_In || this.m_BigWinState == BigWinState.HugeWin_Loop ? this.HugeWinEnd(false) : this.m_BigWinState == BigWinState.MegaWin_In || this.m_BigWinState == BigWinState.MegaWin_Loop ? this.MegaWinEnd(false) : this.m_BigWinState != BigWinState.SuperWin_In && this.m_BigWinState != BigWinState.SuperWin_Loop || this.SuperWinEnd();
      };
      BigWinManager.prototype.BigWinEnd = function(islevelup) {
        AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.Particle02, true);
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.BigWinLevelUp);
        islevelup && (this.m_BigWinState = BigWinState.HugeWin_In);
        this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], false);
      };
      BigWinManager.prototype.HugeWinEnd = function(islevelup) {
        if (islevelup) {
          this.m_BigWinState = BigWinState.MegaWin_In;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], false);
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.BigWinLevelUp);
        }
      };
      BigWinManager.prototype.MegaWinEnd = function(islevelup) {
        if (islevelup) {
          this.m_BigWinState = BigWinState.SuperWin_In;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], false);
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.BigWinLevelUp);
        }
      };
      BigWinManager.prototype.SuperWinEnd = function() {
        this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], false);
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.BigWinLevelUp);
      };
      BigWinManager.prototype.BigWinAniComplete = function() {
        switch (this.m_BigWinState) {
         case BigWinState.BigWin_In:
          this.m_BigWinState = BigWinState.BigWin_Loop;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], true);
          break;

         case BigWinState.HugeWin_In:
          this.m_BigWinState = BigWinState.HugeWin_Loop;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], true);
          break;

         case BigWinState.MegaWin_In:
          this.m_BigWinState = BigWinState.MegaWin_Loop;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], true);
          break;

         case BigWinState.SuperWin_In:
          this.m_BigWinState = BigWinState.SuperWin_Loop;
          this.BigWinAni.setAnimation(0, this.m_BigWinAniName[this.m_BigWinState], true);
        }
      };
      BigWinManager.prototype.SetBigWinNum = function(num, dt) {
        void 0 === dt && (dt = 0);
        this.m_BigWinNowNum = num;
        this.BigWinNum.string = "" + GameManager_alchemist_1.default.toStringThousandth(this.m_BigWinNowNum);
      };
      BigWinManager.prototype.BigWinCountUpdate = function(dt) {
        if (this.m_BigWinCountFlg) {
          this.m_BigWinNowNum += this.m_BigWinAddCount;
          if (this.m_BigWinNowNum >= this.m_BigWinFinilNum) {
            this.m_BigWinNowNum = this.m_BigWinFinilNum;
            this.m_BigWinCountFlg = false;
            AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.ParticleEnd, false);
          }
          this.SetBigWinNum(this.m_BigWinNowNum);
          if (0 == this.m_NowBigWinLevel) {
            var levelnum = GameServer_alchemist_1.default.self.getTotalBet() * this.m_BigWinLevel[1];
            if (this.m_BigWinNowNum >= levelnum) {
              this.BigWinEnd(true);
              this.m_NowBigWinLevel = 1;
            }
          } else if (1 == this.m_NowBigWinLevel) {
            var levelnum = GameServer_alchemist_1.default.self.getTotalBet() * this.m_BigWinLevel[2];
            if (this.m_BigWinNowNum >= levelnum) {
              this.HugeWinEnd(true);
              this.m_NowBigWinLevel = 2;
            }
          }
        } else {
          this.m_lastStateShowTime += dt;
          if (this.m_BigWinShowFlg) {
            this.m_canSkipFlag = true;
            this.m_BigWinShowFlg = false;
          }
          if (this.m_lastStateShowTime > 3) {
            this.closeBigWinScreen();
            this.m_lastStateShowTime = 0;
          }
        }
      };
      BigWinManager.prototype.LevelUp = function() {
        if (this.m_BigWinCountFlg) if (0 == this.m_NowBigWinLevel) {
          var levelnum = GameServer_alchemist_1.default.self.getTotalBet() * this.m_BigWinLevel[1];
          this.m_BigWinNowNum = this.m_BigWinFinilNum >= levelnum ? levelnum : this.m_BigWinFinilNum;
          this.SetBigWinNum(this.m_BigWinNowNum);
        } else if (1 == this.m_NowBigWinLevel) {
          var levelnum = GameServer_alchemist_1.default.self.getTotalBet() * this.m_BigWinLevel[2];
          this.m_BigWinNowNum = this.m_BigWinFinilNum >= levelnum ? levelnum : this.m_BigWinFinilNum;
          this.SetBigWinNum(this.m_BigWinNowNum);
        } else if (2 == this.m_NowBigWinLevel) {
          var levelnum = GameServer_alchemist_1.default.self.getTotalBet() * this.m_BigWinLevel[3];
          this.m_BigWinNowNum = this.m_BigWinFinilNum >= levelnum ? levelnum : this.m_BigWinFinilNum;
          this.SetBigWinNum(this.m_BigWinNowNum);
        } else if (3 == this.m_NowBigWinLevel) {
          this.m_BigWinNowNum = this.m_BigWinFinilNum;
          this.SetBigWinNum(this.m_BigWinNowNum);
          this.m_BigWinCountFlg = false;
        }
      };
      BigWinManager.prototype.onEnable = function() {
        this.BigWinBottomBackgroun.node.active = true;
      };
      BigWinManager.prototype.onDisable = function() {
        this.BigWinBottomBackgroun.node.active = false;
      };
      __decorate([ property(sp.Skeleton) ], BigWinManager.prototype, "BigWinAni", void 0);
      __decorate([ property(cc.Label) ], BigWinManager.prototype, "BigWinNum", void 0);
      BigWinManager = __decorate([ ccclass ], BigWinManager);
      return BigWinManager;
    }(cc.Component);
    exports.default = BigWinManager;
    cc._RF.pop();
  }, {
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist"
  } ],
  BonusManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa924BiRxJPjYtjYScP5dR4", "BonusManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BubbleNumberJumper_alchemist_1 = require("./BubbleNumberJumper_alchemist");
    var FreeAxisManager_alchemist_1 = require("./FreeAxisManager_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var RemoteAssetManager_alchemist_1 = require("./RemoteAssetManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BonusManager = function(_super) {
      __extends(BonusManager, _super);
      function BonusManager() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.roundScore = [];
        _this.BubbleMap = [];
        _this.bubbleScoreImg = [];
        _this.blueframes = [];
        _this.EnergyBar = null;
        _this.particle_texture = null;
        _this.bubbleSpr = null;
        _this.bubbleGraySpr = null;
        _this.HintBox = [];
        _this.checkBeatGame = [];
        _this.BubbleHitSoundCount = 0;
        _this._BonueTime = 3;
        _this.firstRound = true;
        _this.RandomBox = [];
        _this.m_odds = [ 7, 11, 15, 12, 11, 10, 7, 6, 5, 4, 3, 3, 2, 2, 2 ];
        _this.m_multiNum = [ .5, 1, 2, 4, 6, 8, 10, 15, 25, 50, 75, 100, 125, 150, 200 ];
        _this.m_BonusSpining = false;
        _this.BonusAxisList = [];
        return _this;
      }
      Object.defineProperty(BonusManager.prototype, "BonuesTime", {
        get: function() {
          return this._BonueTime;
        },
        set: function(v) {
          this.particle_texture.opacity = 0;
          var SelectAnim = 0;
          SelectAnim = 3 == v ? 1 : 2;
          this._BonueTime = v;
          var offsetWidth = 325 * this._BonueTime;
          switch (SelectAnim) {
           case 1:
            this.fillEnergy(offsetWidth);
            break;

           case 2:
            this.BurnEnergy(offsetWidth);
          }
        },
        enumerable: false,
        configurable: true
      });
      BonusManager.prototype.fillEnergy = function(offsetWidth) {
        cc.tween(this.EnergyBar).to(.3, {
          width: offsetWidth
        }).start();
      };
      BonusManager.prototype.BurnEnergy = function(offsetWidth) {
        var _this = this;
        cc.tween(this.EnergyBar).call(function() {
          _this.particle_texture.opacity = 255;
        }).to(.3, {
          width: offsetWidth
        }).call(function() {
          _this.particle_texture.opacity = 0;
        }).start();
      };
      BonusManager.prototype.onLoad = function() {
        this.blueframes = this.node.getChildByName("AwardFrames").getComponentsInChildren(sp.Skeleton);
        this.bubbleSpr = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_11");
        this.bubbleGraySpr = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_12");
        for (var num = 0; num <= 12; num++) {
          var texture = RemoteAssetManager_alchemist_1.default.self.getAsset("bubbleDigital_" + num);
          this.bubbleScoreImg[num] = new cc.SpriteFrame(texture);
        }
        this.particle_texture = this.EnergyBar.getChildByName("particle_texture");
        var hintBoxNode = this.node.getChildByName("HintBox");
        for (var i = 0; i < hintBoxNode.children.length; i++) {
          var HintBoxSpine = hintBoxNode.children[i].getComponent(sp.Skeleton);
          HintBoxSpine.skeletonData = RemoteAssetManager_alchemist_1.default.self.getSpine("CrystallBall");
          this.HintBox.push(HintBoxSpine);
        }
        for (var i = 0; i < this.m_odds.length; i++) this.InitRandomBox(this.m_multiNum[i], this.m_odds[i]);
      };
      BonusManager.prototype.StartBonusGameInit = function() {
        for (var i = 0; i < 15; i++) {
          this.BubbleMap[i] = 0;
          this.blueframes[i].node.opacity = 0;
          this.blueframes[i].setAnimation(0, "win", true);
        }
        var mainGameResult = GameServer_alchemist_1.default.self.ServerResult[0];
        this.firstRound = true;
        this.bubbleItemInit();
        var BubbleIndexTab = [];
        BubbleIndexTab = mainGameResult["BubbleIndexTab"];
        var BubbleWinTab = [];
        BubbleWinTab = mainGameResult["BubbleWinTab"];
        var ShowBubbleList = [];
        for (var index = 0; index < BubbleIndexTab.length; index++) {
          var indexValue = BubbleIndexTab[index];
          this.BubbleMap[indexValue] = BubbleWinTab[index];
        }
        for (var index = 0; index < this.BubbleMap.length; index++) 0 != this.BubbleMap[index] ? ShowBubbleList[index] = 12 : ShowBubbleList[index] = 13;
        for (var i = 0; i < this.BonusAxisList.length; i++) this.BonusAxisList[i].init(15 + 10 * i, i);
        for (var i = 0; i < this.BonusAxisList.length; i++) if (12 == ShowBubbleList[i]) {
          this.BonusAxisList[i].StartInit(this.BubbleMap[i]);
          this.BonusAxisList[i].m_IsGetSun = true;
          this.HintBox[i].node.opacity = 255;
          this.blueframes[i].node.opacity = 255;
        } else this.BonusAxisList[i].m_IsGetSun = false;
      };
      BonusManager.prototype.BonusStartSpin = function() {
        this.m_BonusSpining = true;
        if (this.m_BonusSpining) {
          var Runningcountindex = 0;
          for (var i = 0; i < this.BonusAxisList.length; i++) if (!this.BonusAxisList[i].m_IsGetSun) {
            this.BonusAxisList[i].SetRunningcountnum(7 + 10 * Runningcountindex);
            Runningcountindex += 1;
            this.BonusAxisList[i].AxisRunningStart();
          }
        }
        GameServer_alchemist_1.default.self.ServerDataIndex += 1;
        this.BonuesTime = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["NowEnergyCount"];
        var oneBonusResult = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex];
        var BubbleIndexTab = oneBonusResult["WinIndexTab"];
        var BubbleWinTab = oneBonusResult["WinTab"];
        var ShowBubbleList = oneBonusResult["ResultIdTab"];
        for (var index = 0; index < BubbleIndexTab.length; index++) {
          var indexValue = BubbleIndexTab[index];
          this.BubbleMap[indexValue] = BubbleWinTab[index];
        }
        console.log("ShowBubbleList=>", ShowBubbleList);
        console.log("BubbleMap=>", this.BubbleMap);
        this.SetBonusResult(ShowBubbleList, this.BubbleMap);
      };
      BonusManager.prototype.SetBonusResult = function(_idTab, _scoreTab) {
        for (var i = 0; i < this.BonusAxisList.length; i++) {
          var sym_id = _idTab[i];
          this.BonusAxisList[i].SetResult(sym_id - 1);
          var _Score = 12 == _idTab[i] ? _scoreTab[i] : this.bubbleRandom() * GameServer_alchemist_1.default.self.getTotalBet();
          this.BonusAxisList[i].SetResultSunScore(_Score);
        }
      };
      BonusManager.prototype.update = function(dt) {
        var _this = this;
        this.particle_texture.setPosition(cc.v3(this.EnergyBar.width - 10, 0, 0));
        if (this.m_BonusSpining) {
          for (var i = 0; i < this.BonusAxisList.length; i++) if (true == this.BonusAxisList[i].m_Spining) return;
          for (var i = 0; i < this.BonusAxisList.length; i++) this.BonusAxisList[i].AllAxisStopSetting();
          this.m_BonusSpining = false;
          var bubbleMul = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["WinTab"];
          if (this.firstRound) {
            var mainGameBubbleIndex = GameServer_alchemist_1.default.self.ServerResult[0]["BubbleIndexTab"];
            var BonusFirstResult = GameServer_alchemist_1.default.self.ServerResult[1]["WinIndexTab"];
            var firstIndexTab = [];
            for (var i = 0; i < BonusFirstResult.length; i++) {
              var b_result = mainGameBubbleIndex.includes(BonusFirstResult[i]);
              false == b_result && firstIndexTab.push(i);
            }
            var BonusFirstResult_ScoreTab = GameServer_alchemist_1.default.self.ServerResult[1]["WinTab"];
            for (var i = 0; i < firstIndexTab.length; i++) this.roundScore.push(BonusFirstResult_ScoreTab[firstIndexTab[i]]);
            this.firstRound = false;
          } else for (var i = 0; i < bubbleMul.length; i++) this.roundScore.push(bubbleMul[i]);
          GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["FinalEnergyCount"] > this.BonuesTime && (this.BonuesTime = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["FinalEnergyCount"]);
          this.scheduleOnce(function() {
            var getSunArr = [];
            _this.BonusAxisList.forEach(function(axis) {
              getSunArr.push(axis.m_IsGetSun);
            });
            if (GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["FinalEnergyCount"] > 0 && -1 != getSunArr.indexOf(false)) _this.BonusStartSpin(); else {
              var ShowStage_1 = GameManager_alchemist_1.default.GM.Instance_BonusManager.node.getChildByName("flyNum");
              for (var idx = 0; idx < _this.BonusAxisList.length; idx++) {
                var BonusScoreNode = _this.BonusAxisList[idx];
                if (true == BonusScoreNode.Symbol_List[1].getChildByName("Score").active) {
                  var parent = BonusScoreNode.Symbol_List[1].parent.parent.position;
                  var cloneNum = cc.instantiate(BonusScoreNode.Symbol_List[1].getChildByName("Score").getChildByName("num"));
                  cloneNum.parent = ShowStage_1;
                  cloneNum.setPosition(parent);
                }
                BonusScoreNode.hintSpine.setCompleteListener(null);
                BonusScoreNode.Symbol_List[1].getChildByName("Score").getChildByName("num").stopAllActions();
                BonusScoreNode.Symbol_List[1].getChildByName("Score").getChildByName("num").scale = 1;
                BonusScoreNode.Symbol_List[1].getChildByName("Score").getChildByName("num").getComponent(cc.Label).string = "";
                BonusScoreNode.Symbol_List[1].getChildByName("Score").getChildByName("num").destroyAllChildren();
              }
              var breakBubbleInOrder_1 = [];
              for (var idx = 0; idx < _this.BonusAxisList.length; idx++) _this.BonusAxisList[idx].hintSpine.node.opacity > 0 && breakBubbleInOrder_1.push(_this.BonusAxisList[idx].hintSpine);
              var BubbleScore_1 = [];
              for (var i = 0; i < _this.BubbleMap.length; i++) _this.BubbleMap[i] > 0 && BubbleScore_1.push(_this.BubbleMap[i]);
              var showtimes = [];
              var _loop_1 = function(idx) {
                showtimes.push((1 + idx) * (.999 - .429));
                _this.scheduleOnce(function() {
                  var O_position = breakBubbleInOrder_1[idx].node.getPosition();
                  cc.tween(breakBubbleInOrder_1[idx].node).to(.3, {
                    position: cc.v3(0, -333.715, 0)
                  }).call(function() {
                    breakBubbleInOrder_1[idx].setCompleteListener(function() {
                      breakBubbleInOrder_1[idx].setCompleteListener(null);
                      breakBubbleInOrder_1[idx].node.setPosition(O_position);
                    });
                    breakBubbleInOrder_1[idx].setAnimation(0, "win", false);
                  }).start();
                  cc.tween(ShowStage_1.children[idx]).to(.3, {
                    position: cc.v3(0, -333.715, 0)
                  }).call(function() {
                    ShowStage_1.children[idx].opacity = 0;
                    GameManager_alchemist_1.default.GM.setScore(BubbleScore_1[idx], false);
                    idx == breakBubbleInOrder_1.length - 1 && _this.scheduleOnce(function() {
                      EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.BonusExit, GameServer_alchemist_1.default.self.ServerData["TotalWin"]);
                      _this.BubbleHitSoundCount = 0;
                      ShowStage_1.destroyAllChildren();
                    }, 1);
                  }).start();
                }, showtimes[idx]);
              };
              for (var idx = 0; idx < breakBubbleInOrder_1.length; idx++) _loop_1(idx);
            }
          }, 1);
        }
      };
      BonusManager.prototype.bubbleRandom = function() {
        var numIndex = 1;
        numIndex = this.Random(1, 100);
        return this.RandomBox[numIndex];
      };
      BonusManager.prototype.bubbleItemInit = function() {
        var _this = this;
        for (var i = 0; i < this.node.getChildByName("FreeReelsRect").children.length; i++) {
          this.BonusAxisList[i] = this.node.getChildByName("FreeReelsRect").children[i].children[0].getComponent(FreeAxisManager_alchemist_1.default);
          this.BonusAxisList[i].bubble_img = this.bubbleSpr;
          this.BonusAxisList[i].bubbleGray_img = this.bubbleGraySpr;
          this.BonusAxisList[i].hintSpine = this.HintBox[i];
          this.BonusAxisList[i].hintSpine.node.active = true;
          this.BonusAxisList[i].hintSpine.setAnimation(0, "in", false);
          this.BonusAxisList[i].blueframe = this.blueframes[i];
          this.BonusAxisList[i].node.children.forEach(function(child) {
            child.getChildByName("Score").getChildByName("num").getComponent(cc.Layout).spacingX = 0;
            child.getChildByName("Score").getComponent(BubbleNumberJumper_alchemist_1.BubbleNumberJumper).numSpriteAtlas = _this.bubbleScoreImg;
          });
        }
      };
      BonusManager.prototype.InitRandomBox = function(multiNum, odds) {
        for (var index = 0; index < odds; index++) this.RandomBox.push(multiNum);
      };
      BonusManager.prototype.onDisable = function() {};
      BonusManager.prototype.onEnable = function() {
        this.StartBonusGameInit();
        for (var i = 0; i < this.BonusAxisList.length; i++) ;
      };
      BonusManager.prototype.Random = function(max, min) {
        return Math.round(Math.random() * (max - min) + min);
      };
      __decorate([ property(cc.Node) ], BonusManager.prototype, "EnergyBar", void 0);
      __decorate([ property(cc.Node) ], BonusManager.prototype, "particle_texture", void 0);
      BonusManager = __decorate([ ccclass ], BonusManager);
      return BonusManager;
    }(cc.Component);
    exports.default = BonusManager;
    cc._RF.pop();
  }, {
    "./BubbleNumberJumper_alchemist": "BubbleNumberJumper_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./FreeAxisManager_alchemist": "FreeAxisManager_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist"
  } ],
  BonusRoller_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe486jwuLVKA7s39+GD4WV/", "BonusRoller_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BonusRollerName = void 0;
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var RemoteAssetManager_alchemist_1 = require("./RemoteAssetManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BonusRollerName;
    (function(BonusRollerName) {
      BonusRollerName["axis1"] = "axis1";
      BonusRollerName["axis2"] = "axis2";
      BonusRollerName["axis3"] = "axis3";
      BonusRollerName["axis4"] = "axis4";
      BonusRollerName["axis5"] = "axis5";
    })(BonusRollerName = exports.BonusRollerName || (exports.BonusRollerName = {}));
    var BonusRoller = function(_super) {
      __extends(BonusRoller, _super);
      function BonusRoller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Symbol_column_count = 3;
        _this.Symbol_migration_distance = 200;
        _this.Column_Symbols = [];
        _this.ColumnData = [];
        _this.m_Sprite = [];
        _this.m_stoped = false;
        _this.Spine_symbols = [];
        _this.bubbleImgScale = .3;
        _this.bubbleDigital = [];
        _this.bubbleNum = 0;
        _this.myName = "";
        _this.Column_bubbleData = [];
        return _this;
      }
      BonusRoller.prototype.onLoad = function() {
        var _this = this;
        this.node.children.forEach(function(childNode) {
          _this.Column_Symbols.push(childNode);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.AssetLoaded, function() {
          _this.init();
          _this.bubbleDigital = _this.bubbleDigitalInit();
          console.log("BonusRollerBonusRollerBonusRoller");
        });
      };
      BonusRoller.prototype.bubbleDigitalInit = function() {
        var DigitalImgs = [];
        for (var idx = 0; idx <= 11; idx++) {
          var texture = RemoteAssetManager_alchemist_1.default.self.getAsset("bubbleDigital_" + idx);
          DigitalImgs[idx] = new cc.SpriteFrame(texture);
        }
        return DigitalImgs;
      };
      BonusRoller.prototype.init = function() {
        this.myName = this.node.name;
        this.Symbol_column_count = this.node.childrenCount;
        for (var i = 0; i <= 12; i++) {
          var texture2D = RemoteAssetManager_alchemist_1.default.self.getAsset("symbol_" + i);
          var img = new cc.SpriteFrame(texture2D);
          img.name = "symbol_" + i;
          this.m_Sprite.push(img);
        }
        this.ColumnData = this.firstGameResult();
        GameManager_alchemist_1.default.GM.count_Rollerinit += 1;
      };
      BonusRoller.prototype.firstGameResult = function() {
        var RandonIndexArray = [];
        for (var i = 0; i < this.Symbol_column_count; i++) {
          RandonIndexArray[i] = this.Random(11, 1);
          this.Column_Symbols[i].getComponent(cc.Sprite).spriteFrame = this.m_Sprite[RandonIndexArray[i]];
          this.Column_bubbleData[i] = this.bubbleRandom().toString();
        }
        return RandonIndexArray;
      };
      BonusRoller.prototype.Random = function(max, min) {
        return Math.round(Math.random() * (max - min) + min);
      };
      BonusRoller.prototype.bubbleRandom = function() {
        var num = 1;
        num = Math.round(this.Random(2e3, 5)) / 10;
        num *= GameServer_alchemist_1.default.self.getTotalBet();
        return num;
      };
      BonusRoller.prototype.font_Transfer_to_texture = function(num) {
        var valueStr = GameManager_alchemist_1.default.toStringThousandth(num);
        this.updateNumImgs(valueStr);
      };
      BonusRoller.prototype.updateNumImgs = function(valueStr) {
        var _this = this;
        var roll = this.node;
        var balls = roll;
        var layout = null;
        balls.children.forEach(function(ball) {
          null == ball.getComponentInChildren(cc.Layout) && ball.children[0].addComponent(cc.Layout);
          layout = ball.children[0].getComponent(cc.Layout);
          layout.spacingX = -10;
          layout.type = cc.Layout.Type.HORIZONTAL;
          layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
          layout.affectedByScale = true;
          layout.node.anchorY = 1;
          layout.node.y = -100 * _this.bubbleImgScale - 5;
          layout.node.scale = _this.bubbleImgScale;
          if (null != layout.node) {
            layout.node.destroyAllChildren();
            for (var _i = 0, valueStr_1 = valueStr; _i < valueStr_1.length; _i++) {
              var char = valueStr_1[_i];
              var charNode = new cc.Node();
              charNode.setParent(layout.node);
              var spr = charNode.addComponent(cc.Sprite);
              var tex = _this.getSpriteByChar(char);
              if (tex) {
                spr.spriteFrame = tex;
                spr.sizeMode = cc.Sprite.SizeMode.TRIMMED;
                spr.trim = true;
                spr.node.anchorY = 0;
              }
            }
          }
        });
      };
      BonusRoller.prototype.getSpriteByChar = function(char) {
        if (char.match(/[0-9]/)) {
          var num = Number.parseInt(char);
          return this.determineSpr(num);
        }
        if ("," === char) return this.determineSpr(10);
        if ("." === char) return this.determineSpr(11);
        return null;
      };
      BonusRoller.prototype.determineSpr = function(num) {
        return this.bubbleDigital[num];
      };
      __decorate([ property(cc.Float) ], BonusRoller.prototype, "Symbol_column_count", void 0);
      __decorate([ property(cc.Float) ], BonusRoller.prototype, "Symbol_migration_distance", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], BonusRoller.prototype, "bubbleDigital", void 0);
      BonusRoller = __decorate([ ccclass ], BonusRoller);
      return BonusRoller;
    }(cc.Component);
    exports.default = BonusRoller;
    cc._RF.pop();
  }, {
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist"
  } ],
  BoosterController_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5de2eGE8PxKT4/d4T8EIMkK", "BoosterController_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BoosterController = function(_super) {
      __extends(BoosterController, _super);
      function BoosterController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rowTest = null;
        _this.TopRow_spr = [];
        _this.Symbol_column_count = 6;
        _this.Symbol_Size_width = 145;
        _this.Symbol_Speed = .1;
        _this.BoosterData = [ 7, 2, 3, 10, 6, 5, 8, 1, 9, 4, 0 ];
        _this.RowData = [ 0, 7, 2, 3, 10 ];
        _this.Row_Symbols = [];
        _this.AnimMap = new Map();
        _this.ChangeRow = function(ServerData) {
          void 0 === ServerData && (ServerData = -1);
          _this.node.getComponent(cc.Layout).enabled || (_this.node.getComponent(cc.Layout).enabled = true);
          -1 != ServerData && (_this.RowData[4] = ServerData);
        };
        return _this;
      }
      BoosterController.prototype.init = function() {
        var _this = this;
        this.AnimMap.set(0, "freespinx5");
        this.AnimMap.set(1, "freespinx8");
        this.AnimMap.set(2, "freespinx12");
        this.AnimMap.set(3, "winx2");
        this.AnimMap.set(4, "winx5");
        this.AnimMap.set(5, "winx10");
        this.AnimMap.set(6, "betx5");
        this.AnimMap.set(7, "betx25");
        this.AnimMap.set(8, "betx250");
        this.AnimMap.set(9, "betx500");
        this.AnimMap.set(10, "ex");
        this.node.children.forEach(function(child) {
          _this.Row_Symbols.push(child);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.BigWininit);
        this.initTopRow();
        var AnimName = [];
        this.RowData.forEach(function(data) {
          AnimName.push(_this.AnimMap.get(data));
        });
      };
      BoosterController.prototype.putLastData = function() {
        var arr = [];
        if (this.RowData[this.RowData.length - 1] == this.BoosterData[this.BoosterData.length - 1]) {
          this.Row_Symbols[5].children[1].getComponent(cc.Sprite).spriteFrame = this.TopRow_spr[this.BoosterData[0]];
          this.RowData.shift();
          this.RowData.push(this.BoosterData[0]);
        } else {
          this.Row_Symbols[5].children[1].getComponent(cc.Sprite).spriteFrame = this.TopRow_spr[this.RowData[this.RowData.length - 1]];
          this.RowData.shift();
          var CompareLastElement = this.BoosterData.indexOf(this.RowData[this.RowData.length - 1]);
          this.RowData.push(this.BoosterData[CompareLastElement + 1]);
        }
      };
      BoosterController.prototype.onSlideBoost = function(targetNode, speed) {
        var _this = this;
        this.putLastData();
        this.scheduleOnce(function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                targetNode.children.forEach(function(childNode) {
                  childNode.children[0].anchorY = .5;
                  childNode.children[0].getComponent(cc.Animation).play("Ghost_move");
                });
                return [ 4, this.moveleft(targetNode, speed) ];

               case 1:
                _a.sent();
                return [ 2 ];
              }
            });
          });
        }, .5);
      };
      BoosterController.prototype.moveleft = function(targetNode, speed) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          cc.tween(targetNode).by(speed, {
            position: cc.v3(-880 / 6, 0, 0)
          }).by(0, {
            position: cc.v3(880 / 6, 0, 0)
          }).call(function() {
            _this.ChangeRow();
          }).call(resolve).start();
          null == targetNode && reject(cc.log("\u7bc0\u9ede\u907a\u5931"));
        }).then(function() {
          targetNode.children.forEach(function(childNode) {
            childNode.children[0].getComponent(cc.Animation).play("Ghost_burn");
            cc.tween(childNode.children[0]).to(.3, {
              opacity: 0
            }).start();
          });
          _this.showTopRow();
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.Stoped);
        });
      };
      BoosterController.prototype.initTopRow = function() {
        var _this = this;
        this.RowData.forEach(function(num, idx) {
          _this.Row_Symbols[idx].children[1].getComponent(cc.Sprite).spriteFrame = _this.TopRow_spr[num];
        });
      };
      BoosterController.prototype.CheckRow = function(idxs, targetNumber) {
        var checkresult = [];
        idxs.forEach(function(idx) {
          idx == targetNumber && checkresult.push(idx);
        });
        return checkresult;
      };
      BoosterController.prototype.showTopRow = function() {
        var _this = this;
        var animName = [];
        this.RowData.forEach(function(num, idx) {
          animName[idx] = _this.AnimMap.get(num);
        });
        for (var idx = 0; idx < animName.length; idx++) this.Row_Symbols[idx].children[1].getComponent(cc.Sprite).spriteFrame = this.TopRow_spr[this.RowData[idx]];
      };
      BoosterController.prototype.TopRow_win = function(_ghostEffectSwitch) {
        for (var i = 0; i < _ghostEffectSwitch.length; i++) if (_ghostEffectSwitch[i]) {
          this.node.children[i].children[0].opacity = 255;
          this.node.children[i].children[0].anchorY = .4;
          this.node.children[i].children[0].getComponent(cc.Animation).play("Ghost_Redburn");
          var animName = this.AnimMap.get(this.RowData[i]);
          this.node.children[i].children[1].getComponent(cc.Animation).play(animName);
        }
      };
      BoosterController.prototype.TopRow_Reset = function() {
        for (var idx = 0; idx < 5; idx++) {
          this.node.children[idx].children[0].getComponent(cc.Animation).play("Ghost_burn");
          this.node.children[idx].children[0].scale = 1;
          this.node.children[idx].children[0].anchorY = .5;
          this.node.children[idx].children[1].getComponent(cc.Animation).stop();
        }
        GameManager_alchemist_1.default.GM.Instance_WheelManager.TopRowQueen = [ false, false, false, false, false ];
      };
      __decorate([ property(cc.Button) ], BoosterController.prototype, "rowTest", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], BoosterController.prototype, "TopRow_spr", void 0);
      __decorate([ property(cc.Float) ], BoosterController.prototype, "Symbol_column_count", void 0);
      __decorate([ property(cc.Float) ], BoosterController.prototype, "Symbol_Size_width", void 0);
      __decorate([ property(cc.Float) ], BoosterController.prototype, "Symbol_Speed", void 0);
      BoosterController = __decorate([ ccclass ], BoosterController);
      return BoosterController;
    }(cc.Component);
    exports.default = BoosterController;
    cc._RF.pop();
  }, {
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist"
  } ],
  BubbleNumberJumper_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29531+u6WdCl6UTm8iIrsOB", "BubbleNumberJumper_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BubbleNumberJumper = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BubbleNumberJumper = function(_super) {
      __extends(BubbleNumberJumper, _super);
      function BubbleNumberJumper() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.numSpriteAtlas = [];
        _this.numImgScale = .25;
        _this.m_Time = 0;
        _this.m_Duration = 0;
        _this.m_StartNum = 0;
        _this.m_EndNum = 0;
        _this.m_DecimalNum = 2;
        _this.m_Color = cc.Color.WHITE;
        return _this;
      }
      BubbleNumberJumper.prototype.startJumpingNum = function(start, end, duration, decimalNum, callback) {
        void 0 != callback && (this._callback = callback);
        this.m_StartNum = start;
        this.m_EndNum = end;
        this.m_Duration = duration;
        this.m_Time = 0;
        this.m_DecimalNum = decimalNum;
      };
      BubbleNumberJumper.prototype.lateUpdate = function(dt) {
        if (this.m_Time < this.m_Duration) {
          var scale = .5;
          this.m_Time = Math.min(this.m_Duration, this.m_Time + dt);
          var t = cc.misc.clamp01(this.m_Time / this.m_Duration);
          var num = cc.misc.lerp(this.m_StartNum, this.m_EndNum, t);
          var valueStr = "";
          valueStr = num < 1e4 ? num.toString() : (num / 1e3).toString() + "k";
          scale = valueStr.length <= 7 ? .4 : .35;
          this.updateNumImgs(valueStr, scale);
        } else if (void 0 != this._callback) {
          this._callback();
          this._callback = void 0;
        }
      };
      BubbleNumberJumper.prototype.setNumImgsColor = function(_color) {
        this.m_Color = _color;
      };
      BubbleNumberJumper.prototype.updateNumImgs = function(valueStr, scale) {
        var parent = this.node.getChildByName("num");
        var layout = null;
        layout = parent.getComponent(cc.Layout);
        layout.spacingX = -25;
        layout.type = cc.Layout.Type.HORIZONTAL;
        layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        layout.affectedByScale = true;
        layout.node.anchorY = .5;
        parent.scale = scale;
        if (null != parent) {
          parent.destroyAllChildren();
          for (var _i = 0, valueStr_1 = valueStr; _i < valueStr_1.length; _i++) {
            var char = valueStr_1[_i];
            var charNode = new cc.Node();
            charNode.setParent(parent);
            var spr = charNode.addComponent(cc.Sprite);
            var tex = this.getSpriteByChar(char);
            tex && (spr.spriteFrame = tex);
            charNode.color = this.m_Color;
          }
        }
      };
      BubbleNumberJumper.prototype.getSpriteByChar = function(char) {
        if (char.match(/[0-9]/)) {
          var num = Number.parseInt(char);
          return this.numSpriteAtlas[num];
        }
        if ("," === char) return this.numSpriteAtlas[10];
        if ("." === char) return this.numSpriteAtlas[11];
        if ("k" === char) return this.numSpriteAtlas[12];
        return null;
      };
      BubbleNumberJumper = __decorate([ ccclass ], BubbleNumberJumper);
      return BubbleNumberJumper;
    }(cc.Component);
    exports.BubbleNumberJumper = BubbleNumberJumper;
    cc._RF.pop();
  }, {} ],
  ButtonControllBase_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a0b91kSe0pBjIz4NTTSVZDn", "ButtonControllBase_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ButtonControllBase_alchemist = function(_super) {
      __extends(ButtonControllBase_alchemist, _super);
      function ButtonControllBase_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.falseNode = null;
        _this.trueNode = null;
        _this.changeToTrue = function() {
          _this.falseNode.active = false;
          _this.trueNode.active = true;
          _this.setValue(true);
        };
        _this.changeTofalse = function() {
          _this.falseNode.active = true;
          _this.trueNode.active = false;
          _this.setValue(false);
        };
        return _this;
      }
      ButtonControllBase_alchemist.prototype.baseInit = function() {
        this.falseNode.on("click", this.changeToTrue);
        this.trueNode.on("click", this.changeTofalse);
      };
      ButtonControllBase_alchemist.prototype.setValue = function(boo) {};
      __decorate([ property(cc.Node) ], ButtonControllBase_alchemist.prototype, "falseNode", void 0);
      __decorate([ property(cc.Node) ], ButtonControllBase_alchemist.prototype, "trueNode", void 0);
      ButtonControllBase_alchemist = __decorate([ ccclass ], ButtonControllBase_alchemist);
      return ButtonControllBase_alchemist;
    }(cc.Component);
    exports.default = ButtonControllBase_alchemist;
    cc._RF.pop();
  }, {} ],
  1: [ function(require, module, exports) {}, {} ],
  2: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function() {
          var d = [];
          for (var i = 0; i < 256; i++) d[i] = i < 128 ? i << 1 : i << 1 ^ 283;
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ 255 & sx ^ 99;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = 257 * d[sx] ^ 16843008 * sx;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = 16843009 * x8 ^ 65537 * x4 ^ 257 * x2 ^ 16843008 * x;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (x) {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            } else x = xi = 1;
          }
        })();
        var RCON = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function() {
            var t;
            if (this._nRounds && this._keyPriorReset === this._key) return;
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = 4 * (nRounds + 1);
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) if (ksRow < keySize) keySchedule[ksRow] = keyWords[ksRow]; else {
              t = keySchedule[ksRow - 1];
              if (ksRow % keySize) keySize > 6 && ksRow % keySize == 4 && (t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t]); else {
                t = t << 8 | t >>> 24;
                t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[255 & t];
                t ^= RCON[ksRow / keySize | 0] << 24;
              }
              keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) var t = keySchedule[ksRow]; else var t = keySchedule[ksRow - 4];
              invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[255 & t]];
            }
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function(M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[255 & s3] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[255 & s0] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[255 & s1] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[255 & s2] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[255 & s3]) ^ keySchedule[ksRow++];
            var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[255 & s0]) ^ keySchedule[ksRow++];
            var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[255 & s1]) ^ keySchedule[ksRow++];
            var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[255 & s2]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 8
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS.AES;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  3: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        const N = 16;
        const ORIG_P = [ 608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731 ];
        const ORIG_S = [ [ 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946 ], [ 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055 ], [ 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504 ], [ 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462 ] ];
        var BLOWFISH_CTX = {
          pbox: [],
          sbox: []
        };
        function F(ctx, x) {
          let a = x >> 24 & 255;
          let b = x >> 16 & 255;
          let c = x >> 8 & 255;
          let d = 255 & x;
          let y = ctx.sbox[0][a] + ctx.sbox[1][b];
          y ^= ctx.sbox[2][c];
          y += ctx.sbox[3][d];
          return y;
        }
        function BlowFish_Encrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = 0; i < N; ++i) {
            Xl ^= ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr ^= ctx.pbox[N];
          Xl ^= ctx.pbox[N + 1];
          return {
            left: Xl,
            right: Xr
          };
        }
        function BlowFish_Decrypt(ctx, left, right) {
          let Xl = left;
          let Xr = right;
          let temp;
          for (let i = N + 1; i > 1; --i) {
            Xl ^= ctx.pbox[i];
            Xr = F(ctx, Xl) ^ Xr;
            temp = Xl;
            Xl = Xr;
            Xr = temp;
          }
          temp = Xl;
          Xl = Xr;
          Xr = temp;
          Xr ^= ctx.pbox[1];
          Xl ^= ctx.pbox[0];
          return {
            left: Xl,
            right: Xr
          };
        }
        function BlowFishInit(ctx, key, keysize) {
          for (let Row = 0; Row < 4; Row++) {
            ctx.sbox[Row] = [];
            for (let Col = 0; Col < 256; Col++) ctx.sbox[Row][Col] = ORIG_S[Row][Col];
          }
          let keyIndex = 0;
          for (let index = 0; index < N + 2; index++) {
            ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
            keyIndex++;
            keyIndex >= keysize && (keyIndex = 0);
          }
          let Data1 = 0;
          let Data2 = 0;
          let res = 0;
          for (let i = 0; i < N + 2; i += 2) {
            res = BlowFish_Encrypt(ctx, Data1, Data2);
            Data1 = res.left;
            Data2 = res.right;
            ctx.pbox[i] = Data1;
            ctx.pbox[i + 1] = Data2;
          }
          for (let i = 0; i < 4; i++) for (let j = 0; j < 256; j += 2) {
            res = BlowFish_Encrypt(ctx, Data1, Data2);
            Data1 = res.left;
            Data2 = res.right;
            ctx.sbox[i][j] = Data1;
            ctx.sbox[i][j + 1] = Data2;
          }
          return true;
        }
        var Blowfish = C_algo.Blowfish = BlockCipher.extend({
          _doReset: function() {
            if (this._keyPriorReset === this._key) return;
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            BlowFishInit(BLOWFISH_CTX, keyWords, keySize);
          },
          encryptBlock: function(M, offset) {
            var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          decryptBlock: function(M, offset) {
            var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
            M[offset] = res.left;
            M[offset + 1] = res.right;
          },
          blockSize: 2,
          keySize: 4,
          ivSize: 2
        });
        C.Blowfish = BlockCipher._createHelper(Blowfish);
      })();
      return CryptoJS.Blowfish;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  4: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./evpkdf")) : "function" === typeof define && define.amd ? define([ "./core", "./evpkdf" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.lib.Cipher || function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var Base64 = C_enc.Base64;
        var C_algo = C.algo;
        var EvpKDF = C_algo.EvpKDF;
        var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          createEncryptor: function(key, cfg) {
            return this.create(this._ENC_XFORM_MODE, key, cfg);
          },
          createDecryptor: function(key, cfg) {
            return this.create(this._DEC_XFORM_MODE, key, cfg);
          },
          init: function(xformMode, key, cfg) {
            this.cfg = this.cfg.extend(cfg);
            this._xformMode = xformMode;
            this._key = key;
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          process: function(dataUpdate) {
            this._append(dataUpdate);
            return this._process();
          },
          finalize: function(dataUpdate) {
            dataUpdate && this._append(dataUpdate);
            var finalProcessedData = this._doFinalize();
            return finalProcessedData;
          },
          keySize: 4,
          ivSize: 4,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function() {
            function selectCipherStrategy(key) {
              return "string" == typeof key ? PasswordBasedCipher : SerializableCipher;
            }
            return function(cipher) {
              return {
                encrypt: function(message, key, cfg) {
                  return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                },
                decrypt: function(ciphertext, key, cfg) {
                  return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                }
              };
            };
          }()
        });
        var StreamCipher = C_lib.StreamCipher = Cipher.extend({
          _doFinalize: function() {
            var finalProcessedBlocks = this._process(true);
            return finalProcessedBlocks;
          },
          blockSize: 1
        });
        var C_mode = C.mode = {};
        var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
          createEncryptor: function(cipher, iv) {
            return this.Encryptor.create(cipher, iv);
          },
          createDecryptor: function(cipher, iv) {
            return this.Decryptor.create(cipher, iv);
          },
          init: function(cipher, iv) {
            this._cipher = cipher;
            this._iv = iv;
          }
        });
        var CBC = C_mode.CBC = function() {
          var CBC = BlockCipherMode.extend();
          CBC.Encryptor = CBC.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              xorBlock.call(this, words, offset, blockSize);
              cipher.encryptBlock(words, offset);
              this._prevBlock = words.slice(offset, offset + blockSize);
            }
          });
          CBC.Decryptor = CBC.extend({
            processBlock: function(words, offset) {
              var cipher = this._cipher;
              var blockSize = cipher.blockSize;
              var thisBlock = words.slice(offset, offset + blockSize);
              cipher.decryptBlock(words, offset);
              xorBlock.call(this, words, offset, blockSize);
              this._prevBlock = thisBlock;
            }
          });
          function xorBlock(words, offset, blockSize) {
            var block;
            var iv = this._iv;
            if (iv) {
              block = iv;
              this._iv = undefined;
            } else block = this._prevBlock;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= block[i];
          }
          return CBC;
        }();
        var C_pad = C.pad = {};
        var Pkcs7 = C_pad.Pkcs7 = {
          pad: function(data, blockSize) {
            var blockSizeBytes = 4 * blockSize;
            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
            var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
            var paddingWords = [];
            for (var i = 0; i < nPaddingBytes; i += 4) paddingWords.push(paddingWord);
            var padding = WordArray.create(paddingWords, nPaddingBytes);
            data.concat(padding);
          },
          unpad: function(data) {
            var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
            data.sigBytes -= nPaddingBytes;
          }
        };
        var BlockCipher = C_lib.BlockCipher = Cipher.extend({
          cfg: Cipher.cfg.extend({
            mode: CBC,
            padding: Pkcs7
          }),
          reset: function() {
            var modeCreator;
            Cipher.reset.call(this);
            var cfg = this.cfg;
            var iv = cfg.iv;
            var mode = cfg.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) modeCreator = mode.createEncryptor; else {
              modeCreator = mode.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == modeCreator) this._mode.init(this, iv && iv.words); else {
              this._mode = modeCreator.call(mode, this, iv && iv.words);
              this._mode.__creator = modeCreator;
            }
          },
          _doProcessBlock: function(words, offset) {
            this._mode.processBlock(words, offset);
          },
          _doFinalize: function() {
            var finalProcessedBlocks;
            var padding = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              padding.pad(this._data, this.blockSize);
              finalProcessedBlocks = this._process(true);
            } else {
              finalProcessedBlocks = this._process(true);
              padding.unpad(finalProcessedBlocks);
            }
            return finalProcessedBlocks;
          },
          blockSize: 4
        });
        var CipherParams = C_lib.CipherParams = Base.extend({
          init: function(cipherParams) {
            this.mixIn(cipherParams);
          },
          toString: function(formatter) {
            return (formatter || this.formatter).stringify(this);
          }
        });
        var C_format = C.format = {};
        var OpenSSLFormatter = C_format.OpenSSL = {
          stringify: function(cipherParams) {
            var wordArray;
            var ciphertext = cipherParams.ciphertext;
            var salt = cipherParams.salt;
            wordArray = salt ? WordArray.create([ 1398893684, 1701076831 ]).concat(salt).concat(ciphertext) : ciphertext;
            return wordArray.toString(Base64);
          },
          parse: function(openSSLStr) {
            var salt;
            var ciphertext = Base64.parse(openSSLStr);
            var ciphertextWords = ciphertext.words;
            if (1398893684 == ciphertextWords[0] && 1701076831 == ciphertextWords[1]) {
              salt = WordArray.create(ciphertextWords.slice(2, 4));
              ciphertextWords.splice(0, 4);
              ciphertext.sigBytes -= 16;
            }
            return CipherParams.create({
              ciphertext: ciphertext,
              salt: salt
            });
          }
        };
        var SerializableCipher = C_lib.SerializableCipher = Base.extend({
          cfg: Base.extend({
            format: OpenSSLFormatter
          }),
          encrypt: function(cipher, message, key, cfg) {
            cfg = this.cfg.extend(cfg);
            var encryptor = cipher.createEncryptor(key, cfg);
            var ciphertext = encryptor.finalize(message);
            var cipherCfg = encryptor.cfg;
            return CipherParams.create({
              ciphertext: ciphertext,
              key: key,
              iv: cipherCfg.iv,
              algorithm: cipher,
              mode: cipherCfg.mode,
              padding: cipherCfg.padding,
              blockSize: cipher.blockSize,
              formatter: cfg.format
            });
          },
          decrypt: function(cipher, ciphertext, key, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
            return plaintext;
          },
          _parse: function(ciphertext, format) {
            return "string" == typeof ciphertext ? format.parse(ciphertext, this) : ciphertext;
          }
        });
        var C_kdf = C.kdf = {};
        var OpenSSLKdf = C_kdf.OpenSSL = {
          execute: function(password, keySize, ivSize, salt, hasher) {
            salt || (salt = WordArray.random(8));
            if (hasher) var key = EvpKDF.create({
              keySize: keySize + ivSize,
              hasher: hasher
            }).compute(password, salt); else var key = EvpKDF.create({
              keySize: keySize + ivSize
            }).compute(password, salt);
            var iv = WordArray.create(key.words.slice(keySize), 4 * ivSize);
            key.sigBytes = 4 * keySize;
            return CipherParams.create({
              key: key,
              iv: iv,
              salt: salt
            });
          }
        };
        var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
          cfg: SerializableCipher.cfg.extend({
            kdf: OpenSSLKdf
          }),
          encrypt: function(cipher, message, password, cfg) {
            cfg = this.cfg.extend(cfg);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
            ciphertext.mixIn(derivedParams);
            return ciphertext;
          },
          decrypt: function(cipher, ciphertext, password, cfg) {
            cfg = this.cfg.extend(cfg);
            ciphertext = this._parse(ciphertext, cfg.format);
            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
            cfg.iv = derivedParams.iv;
            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
            return plaintext;
          }
        });
      }();
    });
  }, {
    "./core": 5,
    "./evpkdf": 9
  } ],
  5: [ function(require, module, exports) {
    (function(global) {
      (function(root, factory) {
        "object" === typeof exports ? module.exports = exports = factory() : "function" === typeof define && define.amd ? define([], factory) : root.CryptoJS = factory();
      })(this, function() {
        var CryptoJS = CryptoJS || function(Math, undefined) {
          var crypto;
          "undefined" !== typeof window && window.crypto && (crypto = window.crypto);
          "undefined" !== typeof self && self.crypto && (crypto = self.crypto);
          "undefined" !== typeof globalThis && globalThis.crypto && (crypto = globalThis.crypto);
          !crypto && "undefined" !== typeof window && window.msCrypto && (crypto = window.msCrypto);
          !crypto && "undefined" !== typeof global && global.crypto && (crypto = global.crypto);
          if (!crypto && "function" === typeof require) try {
            crypto = require("crypto");
          } catch (err) {}
          var cryptoSecureRandomInt = function() {
            if (crypto) {
              if ("function" === typeof crypto.getRandomValues) try {
                return crypto.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {}
              if ("function" === typeof crypto.randomBytes) try {
                return crypto.randomBytes(4).readInt32LE();
              } catch (err) {}
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var create = Object.create || function() {
            function F() {}
            return function(obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function() {
            return {
              extend: function(overrides) {
                var subtype = create(this);
                overrides && subtype.mixIn(overrides);
                subtype.hasOwnProperty("init") && this.init !== subtype.init || (subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                });
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              create: function() {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              init: function() {},
              mixIn: function(properties) {
                for (var propertyName in properties) properties.hasOwnProperty(propertyName) && (this[propertyName] = properties[propertyName]);
                properties.hasOwnProperty("toString") && (this.toString = properties.toString);
              },
              clone: function() {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            init: function(words, sigBytes) {
              words = this.words = words || [];
              this.sigBytes = sigBytes != undefined ? sigBytes : 4 * words.length;
            },
            toString: function(encoder) {
              return (encoder || Hex).stringify(this);
            },
            concat: function(wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              } else for (var j = 0; j < thatSigBytes; j += 4) thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              this.sigBytes += thatSigBytes;
              return this;
            },
            clamp: function() {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
              words.length = Math.ceil(sigBytes / 4);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            random: function(nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) words.push(cryptoSecureRandomInt());
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((15 & bite).toString(16));
              }
              return hexChars.join("");
            },
            parse: function(hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            stringify: function(wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join("");
            },
            parse: function(latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (255 & latin1Str.charCodeAt(i)) << 24 - i % 4 * 8;
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            stringify: function(wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error("Malformed UTF-8 data");
              }
            },
            parse: function(utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function() {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            _append: function(data) {
              "string" == typeof data && (data = Utf8.parse(data));
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            _process: function(doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = 4 * blockSize;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((0 | nBlocksReady) - this._minBufferSize, 0);
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math.min(4 * nWordsReady, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function() {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function(cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            reset: function() {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            update: function(messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            finalize: function(messageUpdate) {
              messageUpdate && this._append(messageUpdate);
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 16,
            _createHelper: function(hasher) {
              return function(message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            _createHmacHelper: function(hasher) {
              return function(message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS;
      });
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {
    crypto: 1
  } ],
  6: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              -1 !== paddingIndex && (base64StrLength = paddingIndex);
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64;
    });
  }, {
    "./core": 5
  } ],
  7: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Base64url = C_enc.Base64url = {
          stringify: function(wordArray, urlSafe) {
            void 0 === urlSafe && (urlSafe = true);
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = urlSafe ? this._safe_map : this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + .75 * j < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
            return base64Chars.join("");
          },
          parse: function(base64Str, urlSafe) {
            void 0 === urlSafe && (urlSafe = true);
            var base64StrLength = base64Str.length;
            var map = urlSafe ? this._safe_map : this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              -1 !== paddingIndex && (base64StrLength = paddingIndex);
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
          _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) if (i % 4) {
            var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
            var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
            var bitsCombined = bits1 | bits2;
            words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
            nBytes++;
          }
          return WordArray.create(words, nBytes);
        }
      })();
      return CryptoJS.enc.Base64url;
    });
  }, {
    "./core": 5
  } ],
  8: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_enc = C.enc;
        var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        C_enc.Utf16LE = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var utf16Chars = [];
            for (var i = 0; i < sigBytes; i += 2) {
              var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
              utf16Chars.push(String.fromCharCode(codePoint));
            }
            return utf16Chars.join("");
          },
          parse: function(utf16Str) {
            var utf16StrLength = utf16Str.length;
            var words = [];
            for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
            return WordArray.create(words, 2 * utf16StrLength);
          }
        };
        function swapEndian(word) {
          return word << 8 & 4278255360 | word >>> 8 & 16711935;
        }
      })();
      return CryptoJS.enc.Utf16;
    });
  }, {
    "./core": 5
  } ],
  9: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac")) : "function" === typeof define && define.amd ? define([ "./core", "./sha1", "./hmac" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var MD5 = C_algo.MD5;
        var EvpKDF = C_algo.EvpKDF = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: MD5,
            iterations: 1
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var block;
            var cfg = this.cfg;
            var hasher = cfg.hasher.create();
            var derivedKey = WordArray.create();
            var derivedKeyWords = derivedKey.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              block && hasher.update(block);
              block = hasher.update(password).finalize(salt);
              hasher.reset();
              for (var i = 1; i < iterations; i++) {
                block = hasher.finalize(block);
                hasher.reset();
              }
              derivedKey.concat(block);
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.EvpKDF = function(password, salt, cfg) {
          return EvpKDF.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.EvpKDF;
    });
  }, {
    "./core": 5,
    "./hmac": 11,
    "./sha1": 30
  } ],
  10: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var CipherParams = C_lib.CipherParams;
        var C_enc = C.enc;
        var Hex = C_enc.Hex;
        var C_format = C.format;
        var HexFormatter = C_format.Hex = {
          stringify: function(cipherParams) {
            return cipherParams.ciphertext.toString(Hex);
          },
          parse: function(input) {
            var ciphertext = Hex.parse(input);
            return CipherParams.create({
              ciphertext: ciphertext
            });
          }
        };
      })();
      return CryptoJS.format.Hex;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  11: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            "string" == typeof key && (key = Utf8.parse(key));
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = 4 * hasherBlockSize;
            key.sigBytes > hasherBlockSizeBytes && (key = hasher.finalize(key));
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }, {
    "./core": 5
  } ],
  12: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./enc-base64url"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy"), require("./blowfish")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy", "./blowfish" ], factory) : root.CryptoJS = factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      return CryptoJS;
    });
  }, {
    "./aes": 2,
    "./blowfish": 3,
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./enc-base64url": 7,
    "./enc-utf16": 8,
    "./evpkdf": 9,
    "./format-hex": 10,
    "./hmac": 11,
    "./lib-typedarrays": 13,
    "./md5": 14,
    "./mode-cfb": 15,
    "./mode-ctr": 17,
    "./mode-ctr-gladman": 16,
    "./mode-ecb": 18,
    "./mode-ofb": 19,
    "./pad-ansix923": 20,
    "./pad-iso10126": 21,
    "./pad-iso97971": 22,
    "./pad-nopadding": 23,
    "./pad-zeropadding": 24,
    "./pbkdf2": 25,
    "./rabbit": 27,
    "./rabbit-legacy": 26,
    "./rc4": 28,
    "./ripemd160": 29,
    "./sha1": 30,
    "./sha224": 31,
    "./sha256": 32,
    "./sha3": 33,
    "./sha384": 34,
    "./sha512": 35,
    "./tripledes": 36,
    "./x64-core": 37
  } ],
  13: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        if ("function" != typeof ArrayBuffer) return;
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var superInit = WordArray.init;
        var subInit = WordArray.init = function(typedArray) {
          typedArray instanceof ArrayBuffer && (typedArray = new Uint8Array(typedArray));
          (typedArray instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) && (typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength));
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            superInit.call(this, words, typedArrayByteLength);
          } else superInit.apply(this, arguments);
        };
        subInit.prototype = WordArray;
      })();
      return CryptoJS.lib.WordArray;
    });
  }, {
    "./core": 5
  } ],
  14: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function() {
          for (var i = 0; i < 64; i++) T[i] = 4294967296 * Math.abs(Math.sin(i + 1)) | 0;
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
            var nBitsTotalL = nBitsTotal;
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalH << 8 | nBitsTotalH >>> 24) | 4278255360 & (nBitsTotalH << 24 | nBitsTotalH >>> 8);
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotalL << 8 | nBitsTotalL >>> 24) | 4278255360 & (nBitsTotalL << 24 | nBitsTotalL >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  }, {
    "./core": 5
  } ],
  15: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CFB = function() {
        var CFB = CryptoJS.lib.BlockCipherMode.extend();
        CFB.Encryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
          }
        });
        CFB.Decryptor = CFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
          }
        });
        function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
          var keystream;
          var iv = this._iv;
          if (iv) {
            keystream = iv.slice(0);
            this._iv = void 0;
          } else keystream = this._prevBlock;
          cipher.encryptBlock(keystream, 0);
          for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
        }
        return CFB;
      }();
      return CryptoJS.mode.CFB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  16: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CTRGladman = function() {
        var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
        function incWord(word) {
          if (255 === (word >> 24 & 255)) {
            var b1 = word >> 16 & 255;
            var b2 = word >> 8 & 255;
            var b3 = 255 & word;
            if (255 === b1) {
              b1 = 0;
              if (255 === b2) {
                b2 = 0;
                255 === b3 ? b3 = 0 : ++b3;
              } else ++b2;
            } else ++b1;
            word = 0;
            word += b1 << 16;
            word += b2 << 8;
            word += b3;
          } else word += 1 << 24;
          return word;
        }
        function incCounter(counter) {
          0 === (counter[0] = incWord(counter[0])) && (counter[1] = incWord(counter[1]));
          return counter;
        }
        var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTRGladman.Decryptor = Encryptor;
        return CTRGladman;
      }();
      return CryptoJS.mode.CTRGladman;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  17: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.CTR = function() {
        var CTR = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = CTR.Encryptor = CTR.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
              counter = this._counter = iv.slice(0);
              this._iv = void 0;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        CTR.Decryptor = Encryptor;
        return CTR;
      }();
      return CryptoJS.mode.CTR;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  18: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.ECB = function() {
        var ECB = CryptoJS.lib.BlockCipherMode.extend();
        ECB.Encryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.encryptBlock(words, offset);
          }
        });
        ECB.Decryptor = ECB.extend({
          processBlock: function(words, offset) {
            this._cipher.decryptBlock(words, offset);
          }
        });
        return ECB;
      }();
      return CryptoJS.mode.ECB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  19: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.mode.OFB = function() {
        var OFB = CryptoJS.lib.BlockCipherMode.extend();
        var Encryptor = OFB.Encryptor = OFB.extend({
          processBlock: function(words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
              keystream = this._keystream = iv.slice(0);
              this._iv = void 0;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
          }
        });
        OFB.Decryptor = Encryptor;
        return OFB;
      }();
      return CryptoJS.mode.OFB;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  20: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.AnsiX923 = {
        pad: function(data, blockSize) {
          var dataSigBytes = data.sigBytes;
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
          var lastBytePos = dataSigBytes + nPaddingBytes - 1;
          data.clamp();
          data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
          data.sigBytes += nPaddingBytes;
        },
        unpad: function(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Ansix923;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  21: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.Iso10126 = {
        pad: function(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
          data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([ nPaddingBytes << 24 ], 1));
        },
        unpad: function(data) {
          var nPaddingBytes = 255 & data.words[data.sigBytes - 1 >>> 2];
          data.sigBytes -= nPaddingBytes;
        }
      };
      return CryptoJS.pad.Iso10126;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  22: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.Iso97971 = {
        pad: function(data, blockSize) {
          data.concat(CryptoJS.lib.WordArray.create([ 2147483648 ], 1));
          CryptoJS.pad.ZeroPadding.pad(data, blockSize);
        },
        unpad: function(data) {
          CryptoJS.pad.ZeroPadding.unpad(data);
          data.sigBytes--;
        }
      };
      return CryptoJS.pad.Iso97971;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  23: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.NoPadding = {
        pad: function() {},
        unpad: function() {}
      };
      return CryptoJS.pad.NoPadding;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  24: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      CryptoJS.pad.ZeroPadding = {
        pad: function(data, blockSize) {
          var blockSizeBytes = 4 * blockSize;
          data.clamp();
          data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
        },
        unpad: function(data) {
          var dataWords = data.words;
          var i = data.sigBytes - 1;
          for (var i = data.sigBytes - 1; i >= 0; i--) if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
            data.sigBytes = i + 1;
            break;
          }
        }
      };
      return CryptoJS.pad.ZeroPadding;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5
  } ],
  25: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256"), require("./hmac")) : "function" === typeof define && define.amd ? define([ "./core", "./sha256", "./hmac" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var HMAC = C_algo.HMAC;
        var PBKDF2 = C_algo.PBKDF2 = Base.extend({
          cfg: Base.extend({
            keySize: 4,
            hasher: SHA256,
            iterations: 25e4
          }),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
          },
          compute: function(password, salt) {
            var cfg = this.cfg;
            var hmac = HMAC.create(cfg.hasher, password);
            var derivedKey = WordArray.create();
            var blockIndex = WordArray.create([ 1 ]);
            var derivedKeyWords = derivedKey.words;
            var blockIndexWords = blockIndex.words;
            var keySize = cfg.keySize;
            var iterations = cfg.iterations;
            while (derivedKeyWords.length < keySize) {
              var block = hmac.update(salt).finalize(blockIndex);
              hmac.reset();
              var blockWords = block.words;
              var blockWordsLength = blockWords.length;
              var intermediate = block;
              for (var i = 1; i < iterations; i++) {
                intermediate = hmac.finalize(intermediate);
                hmac.reset();
                var intermediateWords = intermediate.words;
                for (var j = 0; j < blockWordsLength; j++) blockWords[j] ^= intermediateWords[j];
              }
              derivedKey.concat(block);
              blockIndexWords[0]++;
            }
            derivedKey.sigBytes = 4 * keySize;
            return derivedKey;
          }
        });
        C.PBKDF2 = function(password, salt, cfg) {
          return PBKDF2.create(cfg).compute(password, salt);
        };
      })();
      return CryptoJS.PBKDF2;
    });
  }, {
    "./core": 5,
    "./hmac": 11,
    "./sha256": 32
  } ],
  26: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
      })();
      return CryptoJS.RabbitLegacy;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  27: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var S = [];
        var C_ = [];
        var G = [];
        var Rabbit = C_algo.Rabbit = StreamCipher.extend({
          _doReset: function() {
            var K = this._key.words;
            var iv = this.cfg.iv;
            for (var i = 0; i < 4; i++) K[i] = 16711935 & (K[i] << 8 | K[i] >>> 24) | 4278255360 & (K[i] << 24 | K[i] >>> 8);
            var X = this._X = [ K[0], K[3] << 16 | K[2] >>> 16, K[1], K[0] << 16 | K[3] >>> 16, K[2], K[1] << 16 | K[0] >>> 16, K[3], K[2] << 16 | K[1] >>> 16 ];
            var C = this._C = [ K[2] << 16 | K[2] >>> 16, 4294901760 & K[0] | 65535 & K[1], K[3] << 16 | K[3] >>> 16, 4294901760 & K[1] | 65535 & K[2], K[0] << 16 | K[0] >>> 16, 4294901760 & K[2] | 65535 & K[3], K[1] << 16 | K[1] >>> 16, 4294901760 & K[3] | 65535 & K[0] ];
            this._b = 0;
            for (var i = 0; i < 4; i++) nextState.call(this);
            for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
            if (iv) {
              var IV = iv.words;
              var IV_0 = IV[0];
              var IV_1 = IV[1];
              var i0 = 16711935 & (IV_0 << 8 | IV_0 >>> 24) | 4278255360 & (IV_0 << 24 | IV_0 >>> 8);
              var i2 = 16711935 & (IV_1 << 8 | IV_1 >>> 24) | 4278255360 & (IV_1 << 24 | IV_1 >>> 8);
              var i1 = i0 >>> 16 | 4294901760 & i2;
              var i3 = i2 << 16 | 65535 & i0;
              C[0] ^= i0;
              C[1] ^= i1;
              C[2] ^= i2;
              C[3] ^= i3;
              C[4] ^= i0;
              C[5] ^= i1;
              C[6] ^= i2;
              C[7] ^= i3;
              for (var i = 0; i < 4; i++) nextState.call(this);
            }
          },
          _doProcessBlock: function(M, offset) {
            var X = this._X;
            nextState.call(this);
            S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
            S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
            S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
            S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
            for (var i = 0; i < 4; i++) {
              S[i] = 16711935 & (S[i] << 8 | S[i] >>> 24) | 4278255360 & (S[i] << 24 | S[i] >>> 8);
              M[offset + i] ^= S[i];
            }
          },
          blockSize: 4,
          ivSize: 2
        });
        function nextState() {
          var X = this._X;
          var C = this._C;
          for (var i = 0; i < 8; i++) C_[i] = C[i];
          C[0] = C[0] + 1295307597 + this._b | 0;
          C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
          C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
          C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
          C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
          C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
          C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
          C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
          this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
          for (var i = 0; i < 8; i++) {
            var gx = X[i] + C[i];
            var ga = 65535 & gx;
            var gb = gx >>> 16;
            var gh = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb;
            var gl = ((4294901760 & gx) * gx | 0) + ((65535 & gx) * gx | 0);
            G[i] = gh ^ gl;
          }
          X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
          X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
          X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
          X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
          X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
          X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
          X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
          X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
        }
        C.Rabbit = StreamCipher._createHelper(Rabbit);
      })();
      return CryptoJS.Rabbit;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  28: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var StreamCipher = C_lib.StreamCipher;
        var C_algo = C.algo;
        var RC4 = C_algo.RC4 = StreamCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keySigBytes = key.sigBytes;
            var S = this._S = [];
            for (var i = 0; i < 256; i++) S[i] = i;
            for (var i = 0, j = 0; i < 256; i++) {
              var keyByteIndex = i % keySigBytes;
              var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
              j = (j + S[i] + keyByte) % 256;
              var t = S[i];
              S[i] = S[j];
              S[j] = t;
            }
            this._i = this._j = 0;
          },
          _doProcessBlock: function(M, offset) {
            M[offset] ^= generateKeystreamWord.call(this);
          },
          keySize: 8,
          ivSize: 0
        });
        function generateKeystreamWord() {
          var S = this._S;
          var i = this._i;
          var j = this._j;
          var keystreamWord = 0;
          for (var n = 0; n < 4; n++) {
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            var t = S[i];
            S[i] = S[j];
            S[j] = t;
            keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - 8 * n;
          }
          this._i = i;
          this._j = j;
          return keystreamWord;
        }
        C.RC4 = StreamCipher._createHelper(RC4);
        var RC4Drop = C_algo.RC4Drop = RC4.extend({
          cfg: RC4.cfg.extend({
            drop: 192
          }),
          _doReset: function() {
            RC4._doReset.call(this);
            for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
          }
        });
        C.RC4Drop = StreamCipher._createHelper(RC4Drop);
      })();
      return CryptoJS.RC4;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  29: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var _zl = WordArray.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]);
        var _zr = WordArray.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]);
        var _sl = WordArray.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]);
        var _sr = WordArray.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]);
        var _hl = WordArray.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]);
        var _hr = WordArray.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]);
        var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
          _doReset: function() {
            this._hash = WordArray.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function(M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = 16711935 & (M_offset_i << 8 | M_offset_i >>> 24) | 4278255360 & (M_offset_i << 24 | M_offset_i >>> 8);
            }
            var H = this._hash.words;
            var hl = _hl.words;
            var hr = _hr.words;
            var zl = _zl.words;
            var zr = _zr.words;
            var sl = _sl.words;
            var sr = _sr.words;
            var al, bl, cl, dl, el;
            var ar, br, cr, dr, er;
            ar = al = H[0];
            br = bl = H[1];
            cr = cl = H[2];
            dr = dl = H[3];
            er = el = H[4];
            var t;
            for (var i = 0; i < 80; i += 1) {
              t = al + M[offset + zl[i]] | 0;
              t += i < 16 ? f1(bl, cl, dl) + hl[0] : i < 32 ? f2(bl, cl, dl) + hl[1] : i < 48 ? f3(bl, cl, dl) + hl[2] : i < 64 ? f4(bl, cl, dl) + hl[3] : f5(bl, cl, dl) + hl[4];
              t |= 0;
              t = rotl(t, sl[i]);
              t = t + el | 0;
              al = el;
              el = dl;
              dl = rotl(cl, 10);
              cl = bl;
              bl = t;
              t = ar + M[offset + zr[i]] | 0;
              t += i < 16 ? f5(br, cr, dr) + hr[0] : i < 32 ? f4(br, cr, dr) + hr[1] : i < 48 ? f3(br, cr, dr) + hr[2] : i < 64 ? f2(br, cr, dr) + hr[3] : f1(br, cr, dr) + hr[4];
              t |= 0;
              t = rotl(t, sr[i]);
              t = t + er | 0;
              ar = er;
              er = dr;
              dr = rotl(cr, 10);
              cr = br;
              br = t;
            }
            t = H[1] + cl + dr | 0;
            H[1] = H[2] + dl + er | 0;
            H[2] = H[3] + el + ar | 0;
            H[3] = H[4] + al + br | 0;
            H[4] = H[0] + bl + cr | 0;
            H[0] = t;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = 16711935 & (nBitsTotal << 8 | nBitsTotal >>> 24) | 4278255360 & (nBitsTotal << 24 | nBitsTotal >>> 8);
            data.sigBytes = 4 * (dataWords.length + 1);
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 5; i++) {
              var H_i = H[i];
              H[i] = 16711935 & (H_i << 8 | H_i >>> 24) | 4278255360 & (H_i << 24 | H_i >>> 8);
            }
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function f1(x, y, z) {
          return x ^ y ^ z;
        }
        function f2(x, y, z) {
          return x & y | ~x & z;
        }
        function f3(x, y, z) {
          return (x | ~y) ^ z;
        }
        function f4(x, y, z) {
          return x & z | y & ~z;
        }
        function f5(x, y, z) {
          return x ^ (y | ~z);
        }
        function rotl(x, n) {
          return x << n | x >>> 32 - n;
        }
        C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
        C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
      })(Math);
      return CryptoJS.RIPEMD160;
    });
  }, {
    "./core": 5
  } ],
  30: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var W = [];
        var SHA1 = C_algo.SHA1 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            for (var i = 0; i < 80; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                W[i] = n << 1 | n >>> 31;
              }
              var t = (a << 5 | a >>> 27) + e + W[i];
              t += i < 20 ? 1518500249 + (b & c | ~b & d) : i < 40 ? 1859775393 + (b ^ c ^ d) : i < 60 ? (b & c | b & d | c & d) - 1894007588 : (b ^ c ^ d) - 899497514;
              e = d;
              d = c;
              c = b << 30 | b >>> 2;
              b = a;
              a = t;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA1 = Hasher._createHelper(SHA1);
        C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
      })();
      return CryptoJS.SHA1;
    });
  }, {
    "./core": 5
  } ],
  31: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./sha256")) : "function" === typeof define && define.amd ? define([ "./core", "./sha256" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var C_algo = C.algo;
        var SHA256 = C_algo.SHA256;
        var SHA224 = C_algo.SHA224 = SHA256.extend({
          _doReset: function() {
            this._hash = new WordArray.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
          },
          _doFinalize: function() {
            var hash = SHA256._doFinalize.call(this);
            hash.sigBytes -= 4;
            return hash;
          }
        });
        C.SHA224 = SHA256._createHelper(SHA224);
        C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
      })();
      return CryptoJS.SHA224;
    });
  }, {
    "./core": 5,
    "./sha256": 32
  } ],
  32: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n) {
            var sqrtN = Math.sqrt(n);
            for (var factor = 2; factor <= sqrtN; factor++) if (!(n % factor)) return false;
            return true;
          }
          function getFractionalBits(n) {
            return 4294967296 * (n - (0 | n)) | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              nPrime < 8 && (H[nPrime] = getFractionalBits(Math.pow(n, .5)));
              K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA256 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) W[i] = 0 | M[offset + i]; else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
            H[4] = H[4] + e | 0;
            H[5] = H[5] + f | 0;
            H[6] = H[6] + g | 0;
            H[7] = H[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[14 + (nBitsLeft + 64 >>> 9 << 4)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[15 + (nBitsLeft + 64 >>> 9 << 4)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA256);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
      })(Math);
      return CryptoJS.SHA256;
    });
  }, {
    "./core": 5
  } ],
  33: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var C_algo = C.algo;
        var RHO_OFFSETS = [];
        var PI_INDEXES = [];
        var ROUND_CONSTANTS = [];
        (function() {
          var x = 1, y = 0;
          for (var t = 0; t < 24; t++) {
            RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
            var newX = y % 5;
            var newY = (2 * x + 3 * y) % 5;
            x = newX;
            y = newY;
          }
          for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
          var LFSR = 1;
          for (var i = 0; i < 24; i++) {
            var roundConstantMsw = 0;
            var roundConstantLsw = 0;
            for (var j = 0; j < 7; j++) {
              if (1 & LFSR) {
                var bitPosition = (1 << j) - 1;
                bitPosition < 32 ? roundConstantLsw ^= 1 << bitPosition : roundConstantMsw ^= 1 << bitPosition - 32;
              }
              128 & LFSR ? LFSR = LFSR << 1 ^ 113 : LFSR <<= 1;
            }
            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
          }
        })();
        var T = [];
        (function() {
          for (var i = 0; i < 25; i++) T[i] = X64Word.create();
        })();
        var SHA3 = C_algo.SHA3 = Hasher.extend({
          cfg: Hasher.cfg.extend({
            outputLength: 512
          }),
          _doReset: function() {
            var state = this._state = [];
            for (var i = 0; i < 25; i++) state[i] = new X64Word.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          },
          _doProcessBlock: function(M, offset) {
            var state = this._state;
            var nBlockSizeLanes = this.blockSize / 2;
            for (var i = 0; i < nBlockSizeLanes; i++) {
              var M2i = M[offset + 2 * i];
              var M2i1 = M[offset + 2 * i + 1];
              M2i = 16711935 & (M2i << 8 | M2i >>> 24) | 4278255360 & (M2i << 24 | M2i >>> 8);
              M2i1 = 16711935 & (M2i1 << 8 | M2i1 >>> 24) | 4278255360 & (M2i1 << 24 | M2i1 >>> 8);
              var lane = state[i];
              lane.high ^= M2i1;
              lane.low ^= M2i;
            }
            for (var round = 0; round < 24; round++) {
              for (var x = 0; x < 5; x++) {
                var tMsw = 0, tLsw = 0;
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  tMsw ^= lane.high;
                  tLsw ^= lane.low;
                }
                var Tx = T[x];
                Tx.high = tMsw;
                Tx.low = tLsw;
              }
              for (var x = 0; x < 5; x++) {
                var Tx4 = T[(x + 4) % 5];
                var Tx1 = T[(x + 1) % 5];
                var Tx1Msw = Tx1.high;
                var Tx1Lsw = Tx1.low;
                var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
                var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
                for (var y = 0; y < 5; y++) {
                  var lane = state[x + 5 * y];
                  lane.high ^= tMsw;
                  lane.low ^= tLsw;
                }
              }
              for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
                var tMsw;
                var tLsw;
                var lane = state[laneIndex];
                var laneMsw = lane.high;
                var laneLsw = lane.low;
                var rhoOffset = RHO_OFFSETS[laneIndex];
                if (rhoOffset < 32) {
                  tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
                  tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
                } else {
                  tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
                  tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
                }
                var TPiLane = T[PI_INDEXES[laneIndex]];
                TPiLane.high = tMsw;
                TPiLane.low = tLsw;
              }
              var T0 = T[0];
              var state0 = state[0];
              T0.high = state0.high;
              T0.low = state0.low;
              for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) {
                var laneIndex = x + 5 * y;
                var lane = state[laneIndex];
                var TLane = T[laneIndex];
                var Tx1Lane = T[(x + 1) % 5 + 5 * y];
                var Tx2Lane = T[(x + 2) % 5 + 5 * y];
                lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
                lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
              }
              var lane = state[0];
              var roundConstant = ROUND_CONSTANTS[round];
              lane.high ^= roundConstant.high;
              lane.low ^= roundConstant.low;
            }
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            var blockSizeBits = 32 * this.blockSize;
            dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
            dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var state = this._state;
            var outputLengthBytes = this.cfg.outputLength / 8;
            var outputLengthLanes = outputLengthBytes / 8;
            var hashWords = [];
            for (var i = 0; i < outputLengthLanes; i++) {
              var lane = state[i];
              var laneMsw = lane.high;
              var laneLsw = lane.low;
              laneMsw = 16711935 & (laneMsw << 8 | laneMsw >>> 24) | 4278255360 & (laneMsw << 24 | laneMsw >>> 8);
              laneLsw = 16711935 & (laneLsw << 8 | laneLsw >>> 24) | 4278255360 & (laneLsw << 24 | laneLsw >>> 8);
              hashWords.push(laneLsw);
              hashWords.push(laneMsw);
            }
            return new WordArray.init(hashWords, outputLengthBytes);
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            var state = clone._state = this._state.slice(0);
            for (var i = 0; i < 25; i++) state[i] = state[i].clone();
            return clone;
          }
        });
        C.SHA3 = Hasher._createHelper(SHA3);
        C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
      })(Math);
      return CryptoJS.SHA3;
    });
  }, {
    "./core": 5,
    "./x64-core": 37
  } ],
  34: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core", "./sha512" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        var SHA512 = C_algo.SHA512;
        var SHA384 = C_algo.SHA384 = SHA512.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([ new X64Word.init(3418070365, 3238371032), new X64Word.init(1654270250, 914150663), new X64Word.init(2438529370, 812702999), new X64Word.init(355462360, 4144912697), new X64Word.init(1731405415, 4290775857), new X64Word.init(2394180231, 1750603025), new X64Word.init(3675008525, 1694076839), new X64Word.init(1203062813, 3204075428) ]);
          },
          _doFinalize: function() {
            var hash = SHA512._doFinalize.call(this);
            hash.sigBytes -= 16;
            return hash;
          }
        });
        C.SHA384 = SHA512._createHelper(SHA384);
        C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
      })();
      return CryptoJS.SHA384;
    });
  }, {
    "./core": 5,
    "./sha512": 35,
    "./x64-core": 37
  } ],
  35: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./x64-core")) : "function" === typeof define && define.amd ? define([ "./core", "./x64-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Hasher = C_lib.Hasher;
        var C_x64 = C.x64;
        var X64Word = C_x64.Word;
        var X64WordArray = C_x64.WordArray;
        var C_algo = C.algo;
        function X64Word_create() {
          return X64Word.create.apply(X64Word, arguments);
        }
        var K = [ X64Word_create(1116352408, 3609767458), X64Word_create(1899447441, 602891725), X64Word_create(3049323471, 3964484399), X64Word_create(3921009573, 2173295548), X64Word_create(961987163, 4081628472), X64Word_create(1508970993, 3053834265), X64Word_create(2453635748, 2937671579), X64Word_create(2870763221, 3664609560), X64Word_create(3624381080, 2734883394), X64Word_create(310598401, 1164996542), X64Word_create(607225278, 1323610764), X64Word_create(1426881987, 3590304994), X64Word_create(1925078388, 4068182383), X64Word_create(2162078206, 991336113), X64Word_create(2614888103, 633803317), X64Word_create(3248222580, 3479774868), X64Word_create(3835390401, 2666613458), X64Word_create(4022224774, 944711139), X64Word_create(264347078, 2341262773), X64Word_create(604807628, 2007800933), X64Word_create(770255983, 1495990901), X64Word_create(1249150122, 1856431235), X64Word_create(1555081692, 3175218132), X64Word_create(1996064986, 2198950837), X64Word_create(2554220882, 3999719339), X64Word_create(2821834349, 766784016), X64Word_create(2952996808, 2566594879), X64Word_create(3210313671, 3203337956), X64Word_create(3336571891, 1034457026), X64Word_create(3584528711, 2466948901), X64Word_create(113926993, 3758326383), X64Word_create(338241895, 168717936), X64Word_create(666307205, 1188179964), X64Word_create(773529912, 1546045734), X64Word_create(1294757372, 1522805485), X64Word_create(1396182291, 2643833823), X64Word_create(1695183700, 2343527390), X64Word_create(1986661051, 1014477480), X64Word_create(2177026350, 1206759142), X64Word_create(2456956037, 344077627), X64Word_create(2730485921, 1290863460), X64Word_create(2820302411, 3158454273), X64Word_create(3259730800, 3505952657), X64Word_create(3345764771, 106217008), X64Word_create(3516065817, 3606008344), X64Word_create(3600352804, 1432725776), X64Word_create(4094571909, 1467031594), X64Word_create(275423344, 851169720), X64Word_create(430227734, 3100823752), X64Word_create(506948616, 1363258195), X64Word_create(659060556, 3750685593), X64Word_create(883997877, 3785050280), X64Word_create(958139571, 3318307427), X64Word_create(1322822218, 3812723403), X64Word_create(1537002063, 2003034995), X64Word_create(1747873779, 3602036899), X64Word_create(1955562222, 1575990012), X64Word_create(2024104815, 1125592928), X64Word_create(2227730452, 2716904306), X64Word_create(2361852424, 442776044), X64Word_create(2428436474, 593698344), X64Word_create(2756734187, 3733110249), X64Word_create(3204031479, 2999351573), X64Word_create(3329325298, 3815920427), X64Word_create(3391569614, 3928383900), X64Word_create(3515267271, 566280711), X64Word_create(3940187606, 3454069534), X64Word_create(4118630271, 4000239992), X64Word_create(116418474, 1914138554), X64Word_create(174292421, 2731055270), X64Word_create(289380356, 3203993006), X64Word_create(460393269, 320620315), X64Word_create(685471733, 587496836), X64Word_create(852142971, 1086792851), X64Word_create(1017036298, 365543100), X64Word_create(1126000580, 2618297676), X64Word_create(1288033470, 3409855158), X64Word_create(1501505948, 4234509866), X64Word_create(1607167915, 987167468), X64Word_create(1816402316, 1246189591) ];
        var W = [];
        (function() {
          for (var i = 0; i < 80; i++) W[i] = X64Word_create();
        })();
        var SHA512 = C_algo.SHA512 = Hasher.extend({
          _doReset: function() {
            this._hash = new X64WordArray.init([ new X64Word.init(1779033703, 4089235720), new X64Word.init(3144134277, 2227873595), new X64Word.init(1013904242, 4271175723), new X64Word.init(2773480762, 1595750129), new X64Word.init(1359893119, 2917565137), new X64Word.init(2600822924, 725511199), new X64Word.init(528734635, 4215389547), new X64Word.init(1541459225, 327033209) ]);
          },
          _doProcessBlock: function(M, offset) {
            var H = this._hash.words;
            var H0 = H[0];
            var H1 = H[1];
            var H2 = H[2];
            var H3 = H[3];
            var H4 = H[4];
            var H5 = H[5];
            var H6 = H[6];
            var H7 = H[7];
            var H0h = H0.high;
            var H0l = H0.low;
            var H1h = H1.high;
            var H1l = H1.low;
            var H2h = H2.high;
            var H2l = H2.low;
            var H3h = H3.high;
            var H3l = H3.low;
            var H4h = H4.high;
            var H4l = H4.low;
            var H5h = H5.high;
            var H5l = H5.low;
            var H6h = H6.high;
            var H6l = H6.low;
            var H7h = H7.high;
            var H7l = H7.low;
            var ah = H0h;
            var al = H0l;
            var bh = H1h;
            var bl = H1l;
            var ch = H2h;
            var cl = H2l;
            var dh = H3h;
            var dl = H3l;
            var eh = H4h;
            var el = H4l;
            var fh = H5h;
            var fl = H5l;
            var gh = H6h;
            var gl = H6l;
            var hh = H7h;
            var hl = H7l;
            for (var i = 0; i < 80; i++) {
              var Wil;
              var Wih;
              var Wi = W[i];
              if (i < 16) {
                Wih = Wi.high = 0 | M[offset + 2 * i];
                Wil = Wi.low = 0 | M[offset + 2 * i + 1];
              } else {
                var gamma0x = W[i - 15];
                var gamma0xh = gamma0x.high;
                var gamma0xl = gamma0x.low;
                var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
                var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
                var gamma1x = W[i - 2];
                var gamma1xh = gamma1x.high;
                var gamma1xl = gamma1x.low;
                var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
                var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
                var Wi7 = W[i - 7];
                var Wi7h = Wi7.high;
                var Wi7l = Wi7.low;
                var Wi16 = W[i - 16];
                var Wi16h = Wi16.high;
                var Wi16l = Wi16.low;
                Wil = gamma0l + Wi7l;
                Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
                Wil += gamma1l;
                Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
                Wil += Wi16l;
                Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
                Wi.high = Wih;
                Wi.low = Wil;
              }
              var chh = eh & fh ^ ~eh & gh;
              var chl = el & fl ^ ~el & gl;
              var majh = ah & bh ^ ah & ch ^ bh & ch;
              var majl = al & bl ^ al & cl ^ bl & cl;
              var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
              var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
              var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
              var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
              var Ki = K[i];
              var Kih = Ki.high;
              var Kil = Ki.low;
              var t1l = hl + sigma1l;
              var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
              var t1l = t1l + chl;
              var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
              var t1l = t1l + Kil;
              var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
              var t1l = t1l + Wil;
              var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
              var t2l = sigma0l + majl;
              var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
              hh = gh;
              hl = gl;
              gh = fh;
              gl = fl;
              fh = eh;
              fl = el;
              el = dl + t1l | 0;
              eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
              dh = ch;
              dl = cl;
              ch = bh;
              cl = bl;
              bh = ah;
              bl = al;
              al = t1l + t2l | 0;
              ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
            }
            H0l = H0.low = H0l + al;
            H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
            H1l = H1.low = H1l + bl;
            H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
            H2l = H2.low = H2l + cl;
            H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
            H3l = H3.low = H3l + dl;
            H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
            H4l = H4.low = H4l + el;
            H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
            H5l = H5.low = H5l + fl;
            H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
            H6l = H6.low = H6l + gl;
            H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
            H7l = H7.low = H7l + hl;
            H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = 8 * this._nDataBytes;
            var nBitsLeft = 8 * data.sigBytes;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[30 + (nBitsLeft + 128 >>> 10 << 5)] = Math.floor(nBitsTotal / 4294967296);
            dataWords[31 + (nBitsLeft + 128 >>> 10 << 5)] = nBitsTotal;
            data.sigBytes = 4 * dataWords.length;
            this._process();
            var hash = this._hash.toX32();
            return hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          },
          blockSize: 32
        });
        C.SHA512 = Hasher._createHelper(SHA512);
        C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
      })();
      return CryptoJS.SHA512;
    });
  }, {
    "./core": 5,
    "./x64-core": 37
  } ],
  36: [ function(require, module, exports) {
    (function(root, factory, undef) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core")) : "function" === typeof define && define.amd ? define([ "./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function() {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var PC1 = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ];
        var PC2 = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ];
        var BIT_SHIFTS = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ];
        var SBOX_P = [ {
          0: 8421888,
          268435456: 32768,
          536870912: 8421378,
          805306368: 2,
          1073741824: 512,
          1342177280: 8421890,
          1610612736: 8389122,
          1879048192: 8388608,
          2147483648: 514,
          2415919104: 8389120,
          2684354560: 33280,
          2952790016: 8421376,
          3221225472: 32770,
          3489660928: 8388610,
          3758096384: 0,
          4026531840: 33282,
          134217728: 0,
          402653184: 8421890,
          671088640: 33282,
          939524096: 32768,
          1207959552: 8421888,
          1476395008: 512,
          1744830464: 8421378,
          2013265920: 2,
          2281701376: 8389120,
          2550136832: 33280,
          2818572288: 8421376,
          3087007744: 8389122,
          3355443200: 8388610,
          3623878656: 32770,
          3892314112: 514,
          4160749568: 8388608,
          1: 32768,
          268435457: 2,
          536870913: 8421888,
          805306369: 8388608,
          1073741825: 8421378,
          1342177281: 33280,
          1610612737: 512,
          1879048193: 8389122,
          2147483649: 8421890,
          2415919105: 8421376,
          2684354561: 8388610,
          2952790017: 33282,
          3221225473: 514,
          3489660929: 8389120,
          3758096385: 32770,
          4026531841: 0,
          134217729: 8421890,
          402653185: 8421376,
          671088641: 8388608,
          939524097: 512,
          1207959553: 32768,
          1476395009: 8388610,
          1744830465: 2,
          2013265921: 33282,
          2281701377: 32770,
          2550136833: 8389122,
          2818572289: 514,
          3087007745: 8421888,
          3355443201: 8389120,
          3623878657: 0,
          3892314113: 33280,
          4160749569: 8421378
        }, {
          0: 1074282512,
          16777216: 16384,
          33554432: 524288,
          50331648: 1074266128,
          67108864: 1073741840,
          83886080: 1074282496,
          100663296: 1073758208,
          117440512: 16,
          134217728: 540672,
          150994944: 1073758224,
          167772160: 1073741824,
          184549376: 540688,
          201326592: 524304,
          218103808: 0,
          234881024: 16400,
          251658240: 1074266112,
          8388608: 1073758208,
          25165824: 540688,
          41943040: 16,
          58720256: 1073758224,
          75497472: 1074282512,
          92274688: 1073741824,
          109051904: 524288,
          125829120: 1074266128,
          142606336: 524304,
          159383552: 0,
          176160768: 16384,
          192937984: 1074266112,
          209715200: 1073741840,
          226492416: 540672,
          243269632: 1074282496,
          260046848: 16400,
          268435456: 0,
          285212672: 1074266128,
          301989888: 1073758224,
          318767104: 1074282496,
          335544320: 1074266112,
          352321536: 16,
          369098752: 540688,
          385875968: 16384,
          402653184: 16400,
          419430400: 524288,
          436207616: 524304,
          452984832: 1073741840,
          469762048: 540672,
          486539264: 1073758208,
          503316480: 1073741824,
          520093696: 1074282512,
          276824064: 540688,
          293601280: 524288,
          310378496: 1074266112,
          327155712: 16384,
          343932928: 1073758208,
          360710144: 1074282512,
          377487360: 16,
          394264576: 1073741824,
          411041792: 1074282496,
          427819008: 1073741840,
          444596224: 1073758224,
          461373440: 524304,
          478150656: 0,
          494927872: 16400,
          511705088: 1074266128,
          528482304: 540672
        }, {
          0: 260,
          1048576: 0,
          2097152: 67109120,
          3145728: 65796,
          4194304: 65540,
          5242880: 67108868,
          6291456: 67174660,
          7340032: 67174400,
          8388608: 67108864,
          9437184: 67174656,
          10485760: 65792,
          11534336: 67174404,
          12582912: 67109124,
          13631488: 65536,
          14680064: 4,
          15728640: 256,
          524288: 67174656,
          1572864: 67174404,
          2621440: 0,
          3670016: 67109120,
          4718592: 67108868,
          5767168: 65536,
          6815744: 65540,
          7864320: 260,
          8912896: 4,
          9961472: 256,
          11010048: 67174400,
          12058624: 65796,
          13107200: 65792,
          14155776: 67109124,
          15204352: 67174660,
          16252928: 67108864,
          16777216: 67174656,
          17825792: 65540,
          18874368: 65536,
          19922944: 67109120,
          20971520: 256,
          22020096: 67174660,
          23068672: 67108868,
          24117248: 0,
          25165824: 67109124,
          26214400: 67108864,
          27262976: 4,
          28311552: 65792,
          29360128: 67174400,
          30408704: 260,
          31457280: 65796,
          32505856: 67174404,
          17301504: 67108864,
          18350080: 260,
          19398656: 67174656,
          20447232: 0,
          21495808: 65540,
          22544384: 67109120,
          23592960: 256,
          24641536: 67174404,
          25690112: 65536,
          26738688: 67174660,
          27787264: 65796,
          28835840: 67108868,
          29884416: 67109124,
          30932992: 67174400,
          31981568: 4,
          33030144: 65792
        }, {
          0: 2151682048,
          65536: 2147487808,
          131072: 4198464,
          196608: 2151677952,
          262144: 0,
          327680: 4198400,
          393216: 2147483712,
          458752: 4194368,
          524288: 2147483648,
          589824: 4194304,
          655360: 64,
          720896: 2147487744,
          786432: 2151678016,
          851968: 4160,
          917504: 4096,
          983040: 2151682112,
          32768: 2147487808,
          98304: 64,
          163840: 2151678016,
          229376: 2147487744,
          294912: 4198400,
          360448: 2151682112,
          425984: 0,
          491520: 2151677952,
          557056: 4096,
          622592: 2151682048,
          688128: 4194304,
          753664: 4160,
          819200: 2147483648,
          884736: 4194368,
          950272: 4198464,
          1015808: 2147483712,
          1048576: 4194368,
          1114112: 4198400,
          1179648: 2147483712,
          1245184: 0,
          1310720: 4160,
          1376256: 2151678016,
          1441792: 2151682048,
          1507328: 2147487808,
          1572864: 2151682112,
          1638400: 2147483648,
          1703936: 2151677952,
          1769472: 4198464,
          1835008: 2147487744,
          1900544: 4194304,
          1966080: 64,
          2031616: 4096,
          1081344: 2151677952,
          1146880: 2151682112,
          1212416: 0,
          1277952: 4198400,
          1343488: 4194368,
          1409024: 2147483648,
          1474560: 2147487808,
          1540096: 64,
          1605632: 2147483712,
          1671168: 4096,
          1736704: 2147487744,
          1802240: 2151678016,
          1867776: 4160,
          1933312: 2151682048,
          1998848: 4194304,
          2064384: 4198464
        }, {
          0: 128,
          4096: 17039360,
          8192: 262144,
          12288: 536870912,
          16384: 537133184,
          20480: 16777344,
          24576: 553648256,
          28672: 262272,
          32768: 16777216,
          36864: 537133056,
          40960: 536871040,
          45056: 553910400,
          49152: 553910272,
          53248: 0,
          57344: 17039488,
          61440: 553648128,
          2048: 17039488,
          6144: 553648256,
          10240: 128,
          14336: 17039360,
          18432: 262144,
          22528: 537133184,
          26624: 553910272,
          30720: 536870912,
          34816: 537133056,
          38912: 0,
          43008: 553910400,
          47104: 16777344,
          51200: 536871040,
          55296: 553648128,
          59392: 16777216,
          63488: 262272,
          65536: 262144,
          69632: 128,
          73728: 536870912,
          77824: 553648256,
          81920: 16777344,
          86016: 553910272,
          90112: 537133184,
          94208: 16777216,
          98304: 553910400,
          102400: 553648128,
          106496: 17039360,
          110592: 537133056,
          114688: 262272,
          118784: 536871040,
          122880: 0,
          126976: 17039488,
          67584: 553648256,
          71680: 16777216,
          75776: 17039360,
          79872: 537133184,
          83968: 536870912,
          88064: 17039488,
          92160: 128,
          96256: 553910272,
          100352: 262272,
          104448: 553910400,
          108544: 0,
          112640: 553648128,
          116736: 16777344,
          120832: 262144,
          124928: 537133056,
          129024: 536871040
        }, {
          0: 268435464,
          256: 8192,
          512: 270532608,
          768: 270540808,
          1024: 268443648,
          1280: 2097152,
          1536: 2097160,
          1792: 268435456,
          2048: 0,
          2304: 268443656,
          2560: 2105344,
          2816: 8,
          3072: 270532616,
          3328: 2105352,
          3584: 8200,
          3840: 270540800,
          128: 270532608,
          384: 270540808,
          640: 8,
          896: 2097152,
          1152: 2105352,
          1408: 268435464,
          1664: 268443648,
          1920: 8200,
          2176: 2097160,
          2432: 8192,
          2688: 268443656,
          2944: 270532616,
          3200: 0,
          3456: 270540800,
          3712: 2105344,
          3968: 268435456,
          4096: 268443648,
          4352: 270532616,
          4608: 270540808,
          4864: 8200,
          5120: 2097152,
          5376: 268435456,
          5632: 268435464,
          5888: 2105344,
          6144: 2105352,
          6400: 0,
          6656: 8,
          6912: 270532608,
          7168: 8192,
          7424: 268443656,
          7680: 270540800,
          7936: 2097160,
          4224: 8,
          4480: 2105344,
          4736: 2097152,
          4992: 268435464,
          5248: 268443648,
          5504: 8200,
          5760: 270540808,
          6016: 270532608,
          6272: 270540800,
          6528: 270532616,
          6784: 8192,
          7040: 2105352,
          7296: 2097160,
          7552: 0,
          7808: 268435456,
          8064: 268443656
        }, {
          0: 1048576,
          16: 33555457,
          32: 1024,
          48: 1049601,
          64: 34604033,
          80: 0,
          96: 1,
          112: 34603009,
          128: 33555456,
          144: 1048577,
          160: 33554433,
          176: 34604032,
          192: 34603008,
          208: 1025,
          224: 1049600,
          240: 33554432,
          8: 34603009,
          24: 0,
          40: 33555457,
          56: 34604032,
          72: 1048576,
          88: 33554433,
          104: 33554432,
          120: 1025,
          136: 1049601,
          152: 33555456,
          168: 34603008,
          184: 1048577,
          200: 1024,
          216: 34604033,
          232: 1,
          248: 1049600,
          256: 33554432,
          272: 1048576,
          288: 33555457,
          304: 34603009,
          320: 1048577,
          336: 33555456,
          352: 34604032,
          368: 1049601,
          384: 1025,
          400: 34604033,
          416: 1049600,
          432: 1,
          448: 0,
          464: 34603008,
          480: 33554433,
          496: 1024,
          264: 1049600,
          280: 33555457,
          296: 34603009,
          312: 1,
          328: 33554432,
          344: 1048576,
          360: 1025,
          376: 34604032,
          392: 33554433,
          408: 34603008,
          424: 0,
          440: 34604033,
          456: 1049601,
          472: 1024,
          488: 33555456,
          504: 1048577
        }, {
          0: 134219808,
          1: 131072,
          2: 134217728,
          3: 32,
          4: 131104,
          5: 134350880,
          6: 134350848,
          7: 2048,
          8: 134348800,
          9: 134219776,
          10: 133120,
          11: 134348832,
          12: 2080,
          13: 0,
          14: 134217760,
          15: 133152,
          2147483648: 2048,
          2147483649: 134350880,
          2147483650: 134219808,
          2147483651: 134217728,
          2147483652: 134348800,
          2147483653: 133120,
          2147483654: 133152,
          2147483655: 32,
          2147483656: 134217760,
          2147483657: 2080,
          2147483658: 131104,
          2147483659: 134350848,
          2147483660: 0,
          2147483661: 134348832,
          2147483662: 134219776,
          2147483663: 131072,
          16: 133152,
          17: 134350848,
          18: 32,
          19: 2048,
          20: 134219776,
          21: 134217760,
          22: 134348832,
          23: 131072,
          24: 0,
          25: 131104,
          26: 134348800,
          27: 134219808,
          28: 134350880,
          29: 133120,
          30: 2080,
          31: 134217728,
          2147483664: 131072,
          2147483665: 2048,
          2147483666: 134348832,
          2147483667: 133152,
          2147483668: 32,
          2147483669: 134348800,
          2147483670: 134217728,
          2147483671: 134219808,
          2147483672: 134350880,
          2147483673: 134217760,
          2147483674: 134219776,
          2147483675: 0,
          2147483676: 133120,
          2147483677: 2080,
          2147483678: 131104,
          2147483679: 134350848
        } ];
        var SBOX_MASK = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ];
        var DES = C_algo.DES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            var keyBits = [];
            for (var i = 0; i < 56; i++) {
              var keyBitPos = PC1[i] - 1;
              keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
            }
            var subKeys = this._subKeys = [];
            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
              var subKey = subKeys[nSubKey] = [];
              var bitShift = BIT_SHIFTS[nSubKey];
              for (var i = 0; i < 24; i++) {
                subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
                subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
              }
              subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
              for (var i = 1; i < 7; i++) subKey[i] = subKey[i] >>> 4 * (i - 1) + 3;
              subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
            }
            var invSubKeys = this._invSubKeys = [];
            for (var i = 0; i < 16; i++) invSubKeys[i] = subKeys[15 - i];
          },
          encryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._subKeys);
          },
          decryptBlock: function(M, offset) {
            this._doCryptBlock(M, offset, this._invSubKeys);
          },
          _doCryptBlock: function(M, offset, subKeys) {
            this._lBlock = M[offset];
            this._rBlock = M[offset + 1];
            exchangeLR.call(this, 4, 252645135);
            exchangeLR.call(this, 16, 65535);
            exchangeRL.call(this, 2, 858993459);
            exchangeRL.call(this, 8, 16711935);
            exchangeLR.call(this, 1, 1431655765);
            for (var round = 0; round < 16; round++) {
              var subKey = subKeys[round];
              var lBlock = this._lBlock;
              var rBlock = this._rBlock;
              var f = 0;
              for (var i = 0; i < 8; i++) f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
              this._lBlock = rBlock;
              this._rBlock = lBlock ^ f;
            }
            var t = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = t;
            exchangeLR.call(this, 1, 1431655765);
            exchangeRL.call(this, 8, 16711935);
            exchangeRL.call(this, 2, 858993459);
            exchangeLR.call(this, 16, 65535);
            exchangeLR.call(this, 4, 252645135);
            M[offset] = this._lBlock;
            M[offset + 1] = this._rBlock;
          },
          keySize: 2,
          ivSize: 2,
          blockSize: 2
        });
        function exchangeLR(offset, mask) {
          var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
          this._rBlock ^= t;
          this._lBlock ^= t << offset;
        }
        function exchangeRL(offset, mask) {
          var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
          this._lBlock ^= t;
          this._rBlock ^= t << offset;
        }
        C.DES = BlockCipher._createHelper(DES);
        var TripleDES = C_algo.TripleDES = BlockCipher.extend({
          _doReset: function() {
            var key = this._key;
            var keyWords = key.words;
            if (2 !== keyWords.length && 4 !== keyWords.length && keyWords.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var key1 = keyWords.slice(0, 2);
            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
            this._des1 = DES.createEncryptor(WordArray.create(key1));
            this._des2 = DES.createEncryptor(WordArray.create(key2));
            this._des3 = DES.createEncryptor(WordArray.create(key3));
          },
          encryptBlock: function(M, offset) {
            this._des1.encryptBlock(M, offset);
            this._des2.decryptBlock(M, offset);
            this._des3.encryptBlock(M, offset);
          },
          decryptBlock: function(M, offset) {
            this._des3.decryptBlock(M, offset);
            this._des2.encryptBlock(M, offset);
            this._des1.decryptBlock(M, offset);
          },
          keySize: 6,
          ivSize: 2,
          blockSize: 2
        });
        C.TripleDES = BlockCipher._createHelper(TripleDES);
      })();
      return CryptoJS.TripleDES;
    });
  }, {
    "./cipher-core": 4,
    "./core": 5,
    "./enc-base64": 6,
    "./evpkdf": 9,
    "./md5": 14
  } ],
  37: [ function(require, module, exports) {
    (function(root, factory) {
      "object" === typeof exports ? module.exports = exports = factory(require("./core")) : "function" === typeof define && define.amd ? define([ "./core" ], factory) : factory(root.CryptoJS);
    })(this, function(CryptoJS) {
      (function(undefined) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var X32WordArray = C_lib.WordArray;
        var C_x64 = C.x64 = {};
        var X64Word = C_x64.Word = Base.extend({
          init: function(high, low) {
            this.high = high;
            this.low = low;
          }
        });
        var X64WordArray = C_x64.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            this.sigBytes = sigBytes != undefined ? sigBytes : 8 * words.length;
          },
          toX32: function() {
            var x64Words = this.words;
            var x64WordsLength = x64Words.length;
            var x32Words = [];
            for (var i = 0; i < x64WordsLength; i++) {
              var x64Word = x64Words[i];
              x32Words.push(x64Word.high);
              x32Words.push(x64Word.low);
            }
            return X32WordArray.create(x32Words, this.sigBytes);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            var words = clone.words = this.words.slice(0);
            var wordsLength = words.length;
            for (var i = 0; i < wordsLength; i++) words[i] = words[i].clone();
            return clone;
          }
        });
      })();
      return CryptoJS;
    });
  }, {
    "./core": 5
  } ],
  CocosUtil_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "192c0EfQMlEmI+aXdNY0kEp", "CocosUtil_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CocosUtil_alchemist = void 0;
    var CocosUtil_alchemist = function() {
      function CocosUtil_alchemist() {}
      CocosUtil_alchemist.randomRangeInt = function(min, max) {
        return Math.round(this.randomRange(min, max));
      };
      CocosUtil_alchemist.randomRange = function(min, max) {
        var value = cc.misc.lerp(min, max, Math.random());
        return this.clamp(min, max, value);
      };
      CocosUtil_alchemist.clamp = function(min, max, value) {
        value = Math.max(min, value);
        value = Math.min(max, value);
        return value;
      };
      CocosUtil_alchemist.convertToNodePosition = function(convertNode, target) {
        var worldPos = convertNode.parent.convertToWorldSpaceAR(convertNode.position);
        return target.convertToNodeSpaceAR(worldPos);
      };
      CocosUtil_alchemist.loadResDirSync = function(dirUrl, type) {
        void 0 === type && (type = cc.Asset);
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            console.log(dirUrl);
            return [ 2, new Promise(function(resolve, reject) {
              cc.loader.loadResDir(dirUrl, type, function(err, assets) {
                err && reject(err);
                resolve(assets);
              });
            }) ];
          });
        });
      };
      CocosUtil_alchemist.loadResSync = function(url, type) {
        void 0 === type && (type = cc.Asset);
        return __awaiter(this, void 0, Promise, function() {
          return __generator(this, function(_a) {
            return [ 2, new Promise(function(resolve, reject) {
              cc.loader.loadRes(url, type, function(err, asset) {
                err && reject(err);
                resolve(asset);
              });
            }) ];
          });
        });
      };
      CocosUtil_alchemist.toInterface = function(obj) {
        return obj;
      };
      CocosUtil_alchemist.isEnum = function(value, e) {
        return Object.values(e).includes(value);
      };
      CocosUtil_alchemist.deepCopy = function(obj) {
        var copy;
        if (null == obj || "object" != typeof obj) return obj;
        if (obj instanceof Date) {
          copy = new Date();
          copy.setTime(obj.getTime());
          return copy;
        }
        if (obj instanceof Array) {
          copy = [];
          for (var i = 0, len = obj.length; i < len; i++) copy[i] = CocosUtil_alchemist.deepCopy(obj[i]);
          return copy;
        }
        if (obj instanceof Object) {
          copy = {};
          for (var attr in obj) obj.hasOwnProperty(attr) && (copy[attr] = CocosUtil_alchemist.deepCopy(obj[attr]));
          return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
      };
      CocosUtil_alchemist.Arrayhasitem = function(array, item) {
        var id = array.indexOf(item);
        return -1 !== id;
      };
      CocosUtil_alchemist.toPrecisionStr = function(v, v2) {
        return Math.round(v).toString();
      };
      return CocosUtil_alchemist;
    }();
    exports.CocosUtil_alchemist = CocosUtil_alchemist;
    cc._RF.pop();
  }, {} ],
  ColorAssembler2D_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "df619blpABE0pbr4//SrK0p", "ColorAssembler2D_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, executeInEditMode = _a.executeInEditMode, requireComponent = _a.requireComponent, menu = _a.menu;
    var ColorAssembler2D_alchemist = function(_super) {
      __extends(ColorAssembler2D_alchemist, _super);
      function ColorAssembler2D_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._colors = [];
        return _this;
      }
      Object.defineProperty(ColorAssembler2D_alchemist.prototype, "colors", {
        get: function() {
          return this._colors;
        },
        set: function(colors) {
          this._colors = colors;
          this._updateColors();
        },
        enumerable: false,
        configurable: true
      });
      ColorAssembler2D_alchemist.prototype.onEnable = function() {
        cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
      };
      ColorAssembler2D_alchemist.prototype.onDisable = function() {
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
        this.node["_renderFlag"] |= cc["RenderFlow"].FLAG_COLOR;
      };
      ColorAssembler2D_alchemist.prototype._updateColors = function() {
        var cmp = this.getComponent(cc.RenderComponent);
        if (!cmp) return;
        var _assembler = cmp["_assembler"];
        if (!(_assembler instanceof cc["Assembler2D"])) return;
        var uintVerts = _assembler._renderData.uintVDatas[0];
        if (!uintVerts) return;
        var color = this.node.color;
        var floatsPerVert = _assembler.floatsPerVert;
        var colorOffset = _assembler.colorOffset;
        var count = 0;
        for (var i = colorOffset, l = uintVerts.length; i < l; i += floatsPerVert) uintVerts[i] = (this.colors[count++] || color)["_val"];
      };
      __decorate([ property ], ColorAssembler2D_alchemist.prototype, "_colors", void 0);
      __decorate([ property({
        type: [ cc.Color ]
      }) ], ColorAssembler2D_alchemist.prototype, "colors", null);
      ColorAssembler2D_alchemist = __decorate([ ccclass, executeInEditMode, requireComponent(cc.RenderComponent) ], ColorAssembler2D_alchemist);
      return ColorAssembler2D_alchemist;
    }(cc.Component);
    exports.default = ColorAssembler2D_alchemist;
    cc._RF.pop();
  }, {} ],
  CommonAudioUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "799b6hCFaBH/4jz9k18QUB+", "CommonAudioUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonAudioUI_alchemist = function(_super) {
      __extends(CommonAudioUI_alchemist, _super);
      function CommonAudioUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.toggle = null;
        _this.changeToggle = function() {
          var _a, _b;
          _this.data.audio = !_this.data.audio;
          null === (_b = (_a = _this.data.callbacks).setAudio) || void 0 === _b ? void 0 : _b.call(_a, _this.data.audio);
        };
        return _this;
      }
      CommonAudioUI_alchemist.prototype.init = function(data) {
        this.data = data;
        this.toggle.isChecked = data.audio;
        this.toggle.node.on("click", this.changeToggle);
      };
      __decorate([ property(cc.Toggle) ], CommonAudioUI_alchemist.prototype, "toggle", void 0);
      CommonAudioUI_alchemist = __decorate([ ccclass ], CommonAudioUI_alchemist);
      return CommonAudioUI_alchemist;
    }(cc.Component);
    exports.default = CommonAudioUI_alchemist;
    cc._RF.pop();
  }, {} ],
  CommonAutoButton_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a8cd1cA1mNGRZOjZYctawna", "CommonAutoButton_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonAutoButton_alchemist = function(_super) {
      __extends(CommonAutoButton_alchemist, _super);
      function CommonAutoButton_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.labels = [];
        return _this;
      }
      CommonAutoButton_alchemist.prototype.init = function(autoTimes, btnAction) {
        var btnNode = this.node;
        btnNode.on("click", btnAction);
        this.labels = [];
        this.labels.push(this.node.children[0].children[0].getComponent(cc.Label));
        this.labels.push(this.node.children[1].children[0].getComponent(cc.Label));
        if (-1 == autoTimes) for (var i = 0; i < this.labels.length; i++) {
          this.labels[i].string = "\u221e";
          this.labels[i].node.setPosition(0, 2);
        } else for (var i = 0; i < this.labels.length; i++) {
          this.labels[i].string = autoTimes.toString();
          this.labels[i].node.setPosition(0, 0);
        }
      };
      CommonAutoButton_alchemist = __decorate([ ccclass ], CommonAutoButton_alchemist);
      return CommonAutoButton_alchemist;
    }(cc.Component);
    exports.default = CommonAutoButton_alchemist;
    cc._RF.pop();
  }, {} ],
  CommonAutoUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "248abzO1nFDl7mNdTruUU0c", "CommonAutoUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonPopupControlBase_alchemist_1 = require("./Base/CommonPopupControlBase_alchemist");
    var CommonAutoButton_alchemist_1 = require("./CommonAutoButton_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonAutoUI_alchemist = function(_super) {
      __extends(CommonAutoUI_alchemist, _super);
      function CommonAutoUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.autoBtns = [];
        _this.autoTimesLabel = null;
        _this.autoSpinBtn = null;
        _this.autoTimesLabelDefaultPosition = null;
        _this.selectedAutoIndex = 0;
        _this.autoTimes = 0;
        _this.startAutoAction = null;
        _this.setAutoTimes = function() {
          var _a, _b, _c;
          if (-1 == _this.selectedAutoIndex) return;
          var times = _this.data.autoRange[_this.selectedAutoIndex];
          null === (_b = (_a = _this.data.callbacks).autoBtnAction) || void 0 === _b ? void 0 : _b.call(_a, times);
          null === (_c = _this.startAutoAction) || void 0 === _c ? void 0 : _c.call(_this, times);
          _this.popupDirectClose();
          _this.updateAutoTimes(times);
        };
        return _this;
      }
      CommonAutoUI_alchemist.prototype.init = function(data, startAutoAction) {
        var _this = this;
        this.data = data;
        this.autoTimesLabelDefaultPosition = this.autoTimesLabel.node.getPosition();
        this.startAutoAction = startAutoAction;
        this.selectedAutoIndex = 0;
        var _loop_1 = function(i) {
          this_1.autoBtns[i].init(this_1.data.autoRange[i], function() {
            _this.setSelectedIndex(i);
          });
        };
        var this_1 = this;
        for (var i = 0; i < this.autoBtns.length; i++) _loop_1(i);
        this.autoSpinBtn.node.on("click", this.setAutoTimes);
        this.baseInit();
        this.updateAutoTimes(0);
      };
      CommonAutoUI_alchemist.prototype.setSelectedIndex = function(index) {
        this.selectedAutoIndex = index;
      };
      CommonAutoUI_alchemist.prototype.updateAutoTimes = function(times) {
        var _a, _b;
        this.autoTimes = times;
        if (this.autoTimes <= -1) {
          this.autoTimesLabel.node.active = true;
          this.autoTimesLabel.string = "\u221e";
          this.autoTimesLabel.fontSize = 60;
          this.autoTimesLabel.node.setPosition(this.autoTimesLabelDefaultPosition.x, this.autoTimesLabelDefaultPosition.y + 5);
        } else {
          this.autoTimesLabel.node.active = this.autoTimes > 0;
          this.autoTimesLabel.string = this.autoTimes.toString();
          this.autoTimesLabel.fontSize = 44;
          this.autoTimesLabel.node.setPosition(this.autoTimesLabelDefaultPosition);
        }
        0 != this.autoTimes && (null === (_b = (_a = this.data.callbacks).spinBtnAction) || void 0 === _b ? void 0 : _b.call(_a, true));
      };
      __decorate([ property(CommonAutoButton_alchemist_1.default) ], CommonAutoUI_alchemist.prototype, "autoBtns", void 0);
      __decorate([ property(cc.Label) ], CommonAutoUI_alchemist.prototype, "autoTimesLabel", void 0);
      __decorate([ property(cc.Button) ], CommonAutoUI_alchemist.prototype, "autoSpinBtn", void 0);
      CommonAutoUI_alchemist = __decorate([ ccclass ], CommonAutoUI_alchemist);
      return CommonAutoUI_alchemist;
    }(CommonPopupControlBase_alchemist_1.default);
    exports.default = CommonAutoUI_alchemist;
    cc._RF.pop();
  }, {
    "./Base/CommonPopupControlBase_alchemist": "CommonPopupControlBase_alchemist",
    "./CommonAutoButton_alchemist": "CommonAutoButton_alchemist"
  } ],
  CommonBetUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4065aJs3IFD2pH4iyMKh9c7", "CommonBetUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonGameBarUtils_alchemist_1 = require("./CommonGameBarUtils_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonBetUI_alchemist = function(_super) {
      __extends(CommonBetUI_alchemist, _super);
      function CommonBetUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.addNode = null;
        _this.minusNode = null;
        _this.betLabel = null;
        _this.updateBetAction = null;
        _this.addBetIndex = function() {
          _this.data.betIndex + 1 < _this.data.betRange.length && _this.data.betIndex++;
          _this.runCallback();
        };
        _this.minusBetIndex = function() {
          _this.data.betIndex - 1 >= 0 && _this.data.betIndex--;
          _this.runCallback();
        };
        return _this;
      }
      CommonBetUI_alchemist.prototype.init = function(data, updateBetAction) {
        this.data = data;
        this.updateBetAction = updateBetAction;
        this.addNode.node.on("click", this.addBetIndex);
        this.minusNode.node.on("click", this.minusBetIndex);
        this.updateUI();
      };
      CommonBetUI_alchemist.prototype.setBtnInteractable = function(boo) {
        if (boo) this.updateUI(); else {
          this.minusNode.interactable = false;
          this.minusNode.node.opacity = 100;
          this.addNode.interactable = false;
          this.addNode.node.opacity = 100;
        }
      };
      CommonBetUI_alchemist.prototype.updateUI = function() {
        this.minusNode.interactable = 0 != this.data.betIndex;
        this.minusNode.node.opacity = 0 == this.data.betIndex ? 100 : 255;
        this.addNode.interactable = this.data.betRange.length - 1 != this.data.betIndex;
        this.addNode.node.opacity = this.data.betRange.length - 1 == this.data.betIndex ? 100 : 255;
        var bet = this.data.betRange[this.data.betIndex];
        this.betLabel.string = "" + CommonGameBarUtils_alchemist_1.default.thousandAndToFixed(bet);
      };
      CommonBetUI_alchemist.prototype.runCallback = function() {
        var _a, _b, _c;
        null === (_b = (_a = this.data.callbacks).setBetIndex) || void 0 === _b ? void 0 : _b.call(_a, this.data.betIndex);
        null === (_c = this.updateBetAction) || void 0 === _c ? void 0 : _c.call(this, this.data.betIndex);
        this.updateUI();
      };
      __decorate([ property(cc.Button) ], CommonBetUI_alchemist.prototype, "addNode", void 0);
      __decorate([ property(cc.Button) ], CommonBetUI_alchemist.prototype, "minusNode", void 0);
      __decorate([ property(cc.Label) ], CommonBetUI_alchemist.prototype, "betLabel", void 0);
      CommonBetUI_alchemist = __decorate([ ccclass ], CommonBetUI_alchemist);
      return CommonBetUI_alchemist;
    }(cc.Component);
    exports.default = CommonBetUI_alchemist;
    cc._RF.pop();
  }, {
    "./CommonGameBarUtils_alchemist": "CommonGameBarUtils_alchemist"
  } ],
  CommonGameBarControl_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c56e1a0DMhOUpnRobx5JFct", "CommonGameBarControl_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonGameBarControl_alchemist = function(_super) {
      __extends(CommonGameBarControl_alchemist, _super);
      function CommonGameBarControl_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.optionNode = null;
        _this.optionHideBtn = null;
        _this.openOptionBtn = null;
        _this.autoBtn = null;
        _this.homeBtns = [];
        _this.optionShowPos = new cc.Vec3(0, 0);
        _this.optionHidePos = new cc.Vec3(0, -320);
        _this.aniTime = .3;
        _this.optionUiVisible = false;
        _this.clickHome = function() {
          var _a, _b;
          null === (_b = (_a = _this.data.callbacks).homeAction) || void 0 === _b ? void 0 : _b.call(_a);
        };
        _this.clickOption = function() {
          _this.optionUiVisible = !_this.optionUiVisible;
          _this.optionHideBtn.node.active = _this.optionUiVisible;
          var targetPos = _this.optionUiVisible ? _this.optionShowPos : _this.optionHidePos;
          cc.Tween.stopAllByTarget(_this.optionNode);
          cc.tween(_this.optionNode).to(_this.aniTime, {
            position: targetPos
          }).start();
        };
        _this.closeOption = function() {
          if (!_this.optionUiVisible) return;
          _this.clickOption();
        };
        return _this;
      }
      CommonGameBarControl_alchemist.prototype.init = function(data) {
        this.data = data;
        for (var i = 0; i < this.homeBtns.length; i++) this.homeBtns[i].node.on("click", this.clickHome);
        this.openOptionBtn.node.on("click", this.clickOption);
        this.optionHideBtn.node.on("click", this.closeOption);
        this.optionHideBtn.node.active = false;
        this.optionUiVisible = false;
        this.optionHidePos = new cc.Vec3(0, -this.optionNode.height);
        this.optionNode.setPosition(this.optionHidePos);
      };
      CommonGameBarControl_alchemist.prototype.setBtnInteractable = function(boo) {
        this.setBtnState(this.openOptionBtn, boo);
        this.setBtnState(this.autoBtn, boo);
        for (var i = 0; i < this.homeBtns.length; i++) this.setBtnState(this.homeBtns[i], boo);
      };
      CommonGameBarControl_alchemist.prototype.setBtnState = function(btn, boo) {
        btn.interactable = boo;
        btn.node.opacity = boo ? 255 : 100;
      };
      __decorate([ property(cc.Node) ], CommonGameBarControl_alchemist.prototype, "optionNode", void 0);
      __decorate([ property(cc.Button) ], CommonGameBarControl_alchemist.prototype, "optionHideBtn", void 0);
      __decorate([ property(cc.Button) ], CommonGameBarControl_alchemist.prototype, "openOptionBtn", void 0);
      __decorate([ property(cc.Button) ], CommonGameBarControl_alchemist.prototype, "autoBtn", void 0);
      __decorate([ property(cc.Button) ], CommonGameBarControl_alchemist.prototype, "homeBtns", void 0);
      CommonGameBarControl_alchemist = __decorate([ ccclass ], CommonGameBarControl_alchemist);
      return CommonGameBarControl_alchemist;
    }(cc.Component);
    exports.default = CommonGameBarControl_alchemist;
    cc._RF.pop();
  }, {} ],
  CommonGameBarData_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1833fomTY5H/Kg323TOmhE7", "CommonGameBarData_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SpinButtonState_alchemist = exports.CommonGameBarSymbolInfo_alchemist = exports.CommonGameBarPayTableInfo_alchemist = exports.CommonGameBarCallBack_alchemist = exports.CommonGameBarData_alchemist = void 0;
    var CommonGameBarData_alchemist = function() {
      function CommonGameBarData_alchemist(balance, betRange, betIndex, autoRange, currencySymbol, turbo, callbacks, payTableInfo) {
        void 0 === betIndex && (betIndex = 0);
        this.betIndex = 0;
        this.turbo = false;
        this.audio = true;
        this.balance = balance;
        this.betRange = betRange;
        this.betIndex = betIndex;
        this.autoRange = autoRange;
        this.currencySymbol = currencySymbol;
        this.turbo = turbo;
        this.callbacks = callbacks;
        this.payTableInfo = payTableInfo;
      }
      return CommonGameBarData_alchemist;
    }();
    exports.CommonGameBarData_alchemist = CommonGameBarData_alchemist;
    var CommonGameBarCallBack_alchemist = function() {
      function CommonGameBarCallBack_alchemist(setBetIndex, spinBtnAction, setAutoTime, setTurbo, setAudio, homeAction) {
        this.setBetIndex = setBetIndex;
        this.spinBtnAction = spinBtnAction;
        this.autoBtnAction = setAutoTime;
        this.setTurbo = setTurbo;
        this.setAudio = setAudio;
        this.homeAction = homeAction;
      }
      return CommonGameBarCallBack_alchemist;
    }();
    exports.CommonGameBarCallBack_alchemist = CommonGameBarCallBack_alchemist;
    var CommonGameBarPayTableInfo_alchemist = function() {
      function CommonGameBarPayTableInfo_alchemist() {
        var symbolInfos = [];
        for (var _i = 0; _i < arguments.length; _i++) symbolInfos[_i] = arguments[_i];
        this.symbolInfos = symbolInfos;
      }
      return CommonGameBarPayTableInfo_alchemist;
    }();
    exports.CommonGameBarPayTableInfo_alchemist = CommonGameBarPayTableInfo_alchemist;
    var CommonGameBarSymbolInfo_alchemist = function() {
      function CommonGameBarSymbolInfo_alchemist(amount, score) {
        this.amount = amount;
        this.score = score;
      }
      return CommonGameBarSymbolInfo_alchemist;
    }();
    exports.CommonGameBarSymbolInfo_alchemist = CommonGameBarSymbolInfo_alchemist;
    var SpinButtonState_alchemist;
    (function(SpinButtonState_alchemist) {
      SpinButtonState_alchemist[SpinButtonState_alchemist["IDLE"] = 0] = "IDLE";
      SpinButtonState_alchemist[SpinButtonState_alchemist["SPINNING"] = 1] = "SPINNING";
      SpinButtonState_alchemist[SpinButtonState_alchemist["AUTO"] = 2] = "AUTO";
    })(SpinButtonState_alchemist = exports.SpinButtonState_alchemist || (exports.SpinButtonState_alchemist = {}));
    cc._RF.pop();
  }, {} ],
  CommonGameBarManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6c7f2aKETlKAomWNOBFnoYB", "CommonGameBarManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonAudioUI_alchemist_1 = require("./CommonAudioUI_alchemist");
    var CommonAutoUI_alchemist_1 = require("./CommonAutoUI_alchemist");
    var CommonBetUI_alchemist_1 = require("./CommonBetUI_alchemist");
    var CommonGameBarControl_alchemist_1 = require("./CommonGameBarControl_alchemist");
    var CommonGameBarData_alchemist_1 = require("./CommonGameBarData_alchemist");
    var CommonGameBarUtils_alchemist_1 = require("./CommonGameBarUtils_alchemist");
    var CommonGameInfoUI_alchemist_1 = require("./CommonGameInfoUI_alchemist");
    var CommonSpinUI_alchemist_1 = require("./CommonSpinUI_alchemist");
    var CommonTurboUI_alchemist_1 = require("./CommonTurboUI_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonGameBar_alchemist_UIType;
    (function(CommonGameBar_alchemist_UIType) {
      CommonGameBar_alchemist_UIType[CommonGameBar_alchemist_UIType["_1920x1080"] = 0] = "_1920x1080";
      CommonGameBar_alchemist_UIType[CommonGameBar_alchemist_UIType["_1334x750"] = 1] = "_1334x750";
      CommonGameBar_alchemist_UIType[CommonGameBar_alchemist_UIType["_1280x720"] = 2] = "_1280x720";
    })(CommonGameBar_alchemist_UIType || (CommonGameBar_alchemist_UIType = {}));
    var CommonGameBarManager_alchemist = function(_super) {
      __extends(CommonGameBarManager_alchemist, _super);
      function CommonGameBarManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._uiType = CommonGameBar_alchemist_UIType._1334x750;
        _this.gameBarControl = null;
        _this.spinUI = null;
        _this.turboUI = null;
        _this.betUI = null;
        _this.audioUI = null;
        _this.autoUI = null;
        _this.infoUI = null;
        _this.balanceLabel = null;
        _this.winLabel = null;
        _this.startAutoAction = function(times) {
          0 == times;
        };
        _this.updateBetAction = function(betIndex) {
          _this.infoUI.updateBetIndex(betIndex);
        };
        return _this;
      }
      Object.defineProperty(CommonGameBarManager_alchemist.prototype, "uiType", {
        get: function() {
          return this._uiType;
        },
        set: function(value) {
          this._uiType = value;
          this.updateUIScale();
        },
        enumerable: false,
        configurable: true
      });
      CommonGameBarManager_alchemist.prototype.onLoad = function() {
        var cbs = new CommonGameBarData_alchemist_1.CommonGameBarCallBack_alchemist(function(betIndex) {
          console.log("\u4e0b\u6ce8\u4ee3\u865f: " + betIndex);
        }, function() {
          console.log("\u9ede\u64ca\u4e0b\u6ce8");
        }, function(autoTimes) {
          console.log("\u81ea\u52d5\u6b21\u6578: " + autoTimes);
        }, function(isTurbo) {
          console.log("\u52a0\u901f\u72c0\u614b: " + isTurbo);
        }, function(Audio) {
          console.log("\u97f3\u6548\u72c0\u614b: " + Audio);
        }, function() {
          console.log("\u9ede\u64ca\u56de\u9996\u9801");
        });
        var payTable = new CommonGameBarData_alchemist_1.CommonGameBarPayTableInfo_alchemist(new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 500, 300, 100 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 300, 100, 50 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 100, 50, 30 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 50, 30, 10 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 30, 10, 5 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 10, 5, 3 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 5, 3, 2 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 3, 2, 1 ]));
        var data = new CommonGameBarData_alchemist_1.CommonGameBarData_alchemist(1e5, [ 1, 5, 10, 50, 100, 500, 1e3 ], 0, [ 50, 100, 200, 500, -1 ], "USD", false, cbs, payTable);
        this.init(data);
      };
      CommonGameBarManager_alchemist.prototype.init = function(data) {
        this.data = data;
        this.gameBarControl.init(this.data);
        this.spinUI.init(this.data);
        this.turboUI.init(this.data);
        this.betUI.init(this.data, this.updateBetAction);
        this.audioUI.init(this.data);
        this.autoUI.init(this.data, this.startAutoAction);
        this.infoUI.init(this.data);
        this.updateBalanceLabel(this.data.balance);
        this.updateWinLabel(0);
      };
      CommonGameBarManager_alchemist.prototype.updateBalanceLabel = function(balance) {
        this.data.balance = balance;
        this.balanceLabel.string = "" + CommonGameBarUtils_alchemist_1.default.thousandAndToFixed(this.data.balance);
      };
      CommonGameBarManager_alchemist.prototype.updateWinLabel = function(win) {
        this.winLabel.string = "" + CommonGameBarUtils_alchemist_1.default.thousandAndToFixed(win);
      };
      CommonGameBarManager_alchemist.prototype.setBtnState = function(state) {
        var boo = state == CommonGameBarData_alchemist_1.SpinButtonState_alchemist.IDLE;
        this.betUI.setBtnInteractable(boo);
        this.gameBarControl.setBtnInteractable(boo);
        this.spinUI.setBtnState(state);
      };
      CommonGameBarManager_alchemist.prototype.updateAutoTimes = function(times) {
        this.autoUI.updateAutoTimes(times);
        this.startAutoAction(times);
      };
      CommonGameBarManager_alchemist.prototype.updateUIScale = function() {
        this._uiType == CommonGameBar_alchemist_UIType._1920x1080 ? this.node.setScale(1) : this._uiType == CommonGameBar_alchemist_UIType._1334x750 ? this.node.setScale(.6948, .6945) : this.node.setScale(.6667, .6667);
      };
      __decorate([ property({
        visible: false,
        type: cc.Enum(CommonGameBar_alchemist_UIType)
      }) ], CommonGameBarManager_alchemist.prototype, "_uiType", void 0);
      __decorate([ property({
        type: cc.Enum(CommonGameBar_alchemist_UIType)
      }) ], CommonGameBarManager_alchemist.prototype, "uiType", null);
      __decorate([ property(CommonGameBarControl_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "gameBarControl", void 0);
      __decorate([ property(CommonSpinUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "spinUI", void 0);
      __decorate([ property(CommonTurboUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "turboUI", void 0);
      __decorate([ property(CommonBetUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "betUI", void 0);
      __decorate([ property(CommonAudioUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "audioUI", void 0);
      __decorate([ property(CommonAutoUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "autoUI", void 0);
      __decorate([ property(CommonGameInfoUI_alchemist_1.default) ], CommonGameBarManager_alchemist.prototype, "infoUI", void 0);
      __decorate([ property(cc.Label) ], CommonGameBarManager_alchemist.prototype, "balanceLabel", void 0);
      __decorate([ property(cc.Label) ], CommonGameBarManager_alchemist.prototype, "winLabel", void 0);
      CommonGameBarManager_alchemist = __decorate([ ccclass ], CommonGameBarManager_alchemist);
      return CommonGameBarManager_alchemist;
    }(cc.Component);
    exports.default = CommonGameBarManager_alchemist;
    cc._RF.pop();
  }, {
    "./CommonAudioUI_alchemist": "CommonAudioUI_alchemist",
    "./CommonAutoUI_alchemist": "CommonAutoUI_alchemist",
    "./CommonBetUI_alchemist": "CommonBetUI_alchemist",
    "./CommonGameBarControl_alchemist": "CommonGameBarControl_alchemist",
    "./CommonGameBarData_alchemist": "CommonGameBarData_alchemist",
    "./CommonGameBarUtils_alchemist": "CommonGameBarUtils_alchemist",
    "./CommonGameInfoUI_alchemist": "CommonGameInfoUI_alchemist",
    "./CommonSpinUI_alchemist": "CommonSpinUI_alchemist",
    "./CommonTurboUI_alchemist": "CommonTurboUI_alchemist"
  } ],
  CommonGameBarUtils_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2a534z1QEhNRZVXyIu/v/Ug", "CommonGameBarUtils_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonGameBarUtils_alchemist = function() {
      function CommonGameBarUtils_alchemist() {}
      CommonGameBarUtils_alchemist.randomNum = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      };
      CommonGameBarUtils_alchemist.randomBool = function() {
        var r = Math.random();
        return Math.random() >= .5;
      };
      CommonGameBarUtils_alchemist.numberToFixed = function(num, tofixed) {
        return Number.parseFloat(num.toString()).toFixed(tofixed);
      };
      CommonGameBarUtils_alchemist.thousandAndToFixed = function(num, tofixed) {
        void 0 === tofixed && (tofixed = 2);
        return Math.round(num).toString();
      };
      CommonGameBarUtils_alchemist.NumberRunner = function(label, startNum, endNum, runTime, fixed) {
        void 0 === fixed && (fixed = 2);
        var runTimes = Math.trunc(1e3 * runTime / 60);
        var precent = 1e3 * runTime / runTimes;
        var dis = (endNum - startNum) / runTimes;
        var index = 0;
        var currentPoint = startNum;
        label.string = CommonGameBarUtils_alchemist.thousandAndToFixed(currentPoint, fixed);
        var intervalFunction = function() {
          if ("hidden" == document.visibilityState) return;
          index++;
          currentPoint += dis;
          label.string = CommonGameBarUtils_alchemist.thousandAndToFixed(currentPoint, fixed);
          if (index >= runTimes) {
            label.string = CommonGameBarUtils_alchemist.thousandAndToFixed(endNum, fixed);
            clearInterval(interVal);
          }
        };
        var interVal = setInterval(intervalFunction, precent);
        return interVal;
      };
      return CommonGameBarUtils_alchemist;
    }();
    exports.default = CommonGameBarUtils_alchemist;
    cc._RF.pop();
  }, {} ],
  CommonGameInfoUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b437LlEO9CF50pTChYkMLM", "CommonGameInfoUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonPopupControlBase_alchemist_1 = require("./Base/CommonPopupControlBase_alchemist");
    var CommonSymbolInfoUI_alchemist_1 = require("./CommonSymbolInfoUI_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonGameInfoUI_alchemist = function(_super) {
      __extends(CommonGameInfoUI_alchemist, _super);
      function CommonGameInfoUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.symbolInfoParent = null;
        _this.leftBtn = null;
        _this.rightBtn = null;
        _this.symbolInfos = [];
        _this.clickLeft = function() {
          console.log("\u9ede\u64ca\u5411\u5de6\u7ffb\u9801");
        };
        _this.clickRight = function() {
          console.log("\u9ede\u64ca\u5411\u53f3\u7ffb\u9801");
        };
        return _this;
      }
      CommonGameInfoUI_alchemist.prototype.init = function(data) {
        this.data = data;
        var currentIndex = 0;
        var count = this.symbolInfoParent.childrenCount;
        var betAmount = this.data.betRange[this.data.betIndex];
        for (var i = 0; i < count; i++) {
          var infoComponent = this.symbolInfoParent.children[i].getComponent(CommonSymbolInfoUI_alchemist_1.default);
          if (infoComponent) {
            infoComponent.init(this.data.payTableInfo.symbolInfos[currentIndex], betAmount, this.data.currencySymbol);
            this.symbolInfos.push(infoComponent);
            currentIndex++;
          }
        }
        this.baseInit();
        this.leftBtn.node.on("click", this.clickLeft);
        this.rightBtn.node.on("click", this.clickRight);
      };
      CommonGameInfoUI_alchemist.prototype.updateBetIndex = function(betIndex) {
        var betAmount = this.data.betRange[betIndex];
        for (var i = 0; i < this.symbolInfos.length; i++) this.symbolInfos[i].updateUI(betAmount);
      };
      __decorate([ property(cc.Node) ], CommonGameInfoUI_alchemist.prototype, "symbolInfoParent", void 0);
      __decorate([ property(cc.Button) ], CommonGameInfoUI_alchemist.prototype, "leftBtn", void 0);
      __decorate([ property(cc.Button) ], CommonGameInfoUI_alchemist.prototype, "rightBtn", void 0);
      CommonGameInfoUI_alchemist = __decorate([ ccclass ], CommonGameInfoUI_alchemist);
      return CommonGameInfoUI_alchemist;
    }(CommonPopupControlBase_alchemist_1.default);
    exports.default = CommonGameInfoUI_alchemist;
    cc._RF.pop();
  }, {
    "./Base/CommonPopupControlBase_alchemist": "CommonPopupControlBase_alchemist",
    "./CommonSymbolInfoUI_alchemist": "CommonSymbolInfoUI_alchemist"
  } ],
  CommonPopupControlBase_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e2c6PW1fRPF5yDwyPcfJ/6", "CommonPopupControlBase_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonPopupType_alchemist_1 = require("./CommonPopupType_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonPopupControlBase_alchemist = function(_super) {
      __extends(CommonPopupControlBase_alchemist, _super);
      function CommonPopupControlBase_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.openType = CommonPopupType_alchemist_1.CommonPopupType_alchemist.FADE_IN;
        _this.closeType = CommonPopupType_alchemist_1.CommonPopupType_alchemist.DIRECT;
        _this.openPopupBtnNode = null;
        _this.closePopupBtnNode = null;
        _this.blockNode = null;
        _this.popupNode = null;
        _this.aniTime = .3;
        _this.popupDirectOpen = function() {
          _this.blockNode.active = true;
          _this.popupNode.active = true;
        };
        _this.popupDirectClose = function() {
          _this.blockNode.active = false;
          _this.popupNode.active = false;
        };
        _this.popupFadeInOpen = function() {
          _this.blockNode.active = true;
          _this.blockNode.opacity = 0;
          cc.tween(_this.blockNode).to(_this.aniTime, {
            opacity: 100
          }).start();
          _this.popupNode.active = true;
          cc.tween(_this.popupNode).to(_this.aniTime, {
            opacity: 255
          }).start();
        };
        _this.popupFadeOutClose = function() {
          _this.blockNode.active = true;
          cc.tween(_this.blockNode).to(_this.aniTime, {
            opacity: 0
          }).call(function() {
            _this.blockNode.active = false;
          }).start();
          cc.tween(_this.popupNode).to(_this.aniTime, {
            opacity: 0
          }).call(function() {
            _this.popupNode.active = false;
          }).start();
        };
        return _this;
      }
      CommonPopupControlBase_alchemist.prototype.baseInit = function() {
        this.openType == CommonPopupType_alchemist_1.CommonPopupType_alchemist.DIRECT ? this.openPopupBtnNode.on("click", this.popupDirectOpen) : this.openPopupBtnNode.on("click", this.popupFadeInOpen);
        this.closeType == CommonPopupType_alchemist_1.CommonPopupType_alchemist.DIRECT ? this.closePopupBtnNode.on("click", this.popupDirectClose) : this.closePopupBtnNode.on("click", this.popupFadeOutClose);
      };
      __decorate([ property({
        type: cc.Enum(CommonPopupType_alchemist_1.CommonPopupType_alchemist)
      }) ], CommonPopupControlBase_alchemist.prototype, "openType", void 0);
      __decorate([ property({
        type: cc.Enum(CommonPopupType_alchemist_1.CommonPopupType_alchemist)
      }) ], CommonPopupControlBase_alchemist.prototype, "closeType", void 0);
      __decorate([ property(cc.Node) ], CommonPopupControlBase_alchemist.prototype, "openPopupBtnNode", void 0);
      __decorate([ property(cc.Node) ], CommonPopupControlBase_alchemist.prototype, "closePopupBtnNode", void 0);
      __decorate([ property(cc.Node) ], CommonPopupControlBase_alchemist.prototype, "blockNode", void 0);
      __decorate([ property(cc.Node) ], CommonPopupControlBase_alchemist.prototype, "popupNode", void 0);
      CommonPopupControlBase_alchemist = __decorate([ ccclass ], CommonPopupControlBase_alchemist);
      return CommonPopupControlBase_alchemist;
    }(cc.Component);
    exports.default = CommonPopupControlBase_alchemist;
    cc._RF.pop();
  }, {
    "./CommonPopupType_alchemist": "CommonPopupType_alchemist"
  } ],
  CommonPopupType_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "94c93RBeZZN9om12+7flZHK", "CommonPopupType_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CommonPopupType_alchemist = void 0;
    var CommonPopupType_alchemist;
    (function(CommonPopupType_alchemist) {
      CommonPopupType_alchemist[CommonPopupType_alchemist["DIRECT"] = 0] = "DIRECT";
      CommonPopupType_alchemist[CommonPopupType_alchemist["FADE_IN"] = 1] = "FADE_IN";
    })(CommonPopupType_alchemist = exports.CommonPopupType_alchemist || (exports.CommonPopupType_alchemist = {}));
    cc._RF.pop();
  }, {} ],
  CommonSpinUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "25693is5W9NuYH38T6cP+bb", "CommonSpinUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonGameBarData_alchemist_1 = require("./CommonGameBarData_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonSpinUI_alchemist = function(_super) {
      __extends(CommonSpinUI_alchemist, _super);
      function CommonSpinUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.spinBtn = null;
        _this.spinSpriteFrame = null;
        _this.stopSpriteFrame = null;
        _this.autoSpriteFrame = null;
        _this.spinSprite = null;
        _this.clickSpinBtn = function() {
          var _a, _b;
          null === (_b = (_a = _this.data.callbacks).spinBtnAction) || void 0 === _b ? void 0 : _b.call(_a, false);
        };
        return _this;
      }
      CommonSpinUI_alchemist.prototype.init = function(data) {
        this.data = data;
        this.spinSprite = this.spinBtn.getComponent(cc.Sprite);
        this.spinBtn.node.on("click", this.clickSpinBtn);
      };
      CommonSpinUI_alchemist.prototype.setBtnState = function(state) {
        switch (state) {
         case CommonGameBarData_alchemist_1.SpinButtonState_alchemist.IDLE:
          this.spinSprite.spriteFrame = this.spinSpriteFrame;
          break;

         case CommonGameBarData_alchemist_1.SpinButtonState_alchemist.SPINNING:
          this.spinSprite.spriteFrame = this.stopSpriteFrame;
          break;

         case CommonGameBarData_alchemist_1.SpinButtonState_alchemist.AUTO:
          this.spinSprite.spriteFrame = this.autoSpriteFrame;
        }
      };
      __decorate([ property(cc.Button) ], CommonSpinUI_alchemist.prototype, "spinBtn", void 0);
      __decorate([ property(cc.SpriteFrame) ], CommonSpinUI_alchemist.prototype, "spinSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], CommonSpinUI_alchemist.prototype, "stopSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], CommonSpinUI_alchemist.prototype, "autoSpriteFrame", void 0);
      CommonSpinUI_alchemist = __decorate([ ccclass ], CommonSpinUI_alchemist);
      return CommonSpinUI_alchemist;
    }(cc.Component);
    exports.default = CommonSpinUI_alchemist;
    cc._RF.pop();
  }, {
    "./CommonGameBarData_alchemist": "CommonGameBarData_alchemist"
  } ],
  CommonSymbolInfoUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3b5bd4uRmROxq9n3nY3hOU6", "CommonSymbolInfoUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CommonGameBarUtils_alchemist_1 = require("./CommonGameBarUtils_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonSymbolInfoUI_alchemist = function(_super) {
      __extends(CommonSymbolInfoUI_alchemist, _super);
      function CommonSymbolInfoUI_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.content = null;
        _this.data = null;
        _this.currency = null;
        return _this;
      }
      CommonSymbolInfoUI_alchemist.prototype.init = function(data, betAmount, currency) {
        void 0 === currency && (currency = "$");
        this.data = data;
        this.currency = currency;
        this.updateUI(betAmount);
      };
      CommonSymbolInfoUI_alchemist.prototype.updateUI = function(betAmount) {
        var str = "";
        for (var i = 0; i < this.data.amount.length; i++) str += this.contentStr(i, betAmount);
        this.content.string = str;
      };
      CommonSymbolInfoUI_alchemist.prototype.contentStr = function(dataNum, betAmount) {
        var amountStr = CommonGameBarUtils_alchemist_1.default.thousandAndToFixed(this.data.amount[dataNum]);
        var scoreStr = CommonGameBarUtils_alchemist_1.default.thousandAndToFixed(this.data.score[dataNum] * betAmount);
        return 0 == dataNum ? amountStr + "X = " + this.currency + scoreStr : "\n" + amountStr + "X = " + this.currency + scoreStr;
      };
      __decorate([ property(cc.Label) ], CommonSymbolInfoUI_alchemist.prototype, "content", void 0);
      CommonSymbolInfoUI_alchemist = __decorate([ ccclass ], CommonSymbolInfoUI_alchemist);
      return CommonSymbolInfoUI_alchemist;
    }(cc.Component);
    exports.default = CommonSymbolInfoUI_alchemist;
    cc._RF.pop();
  }, {
    "./CommonGameBarUtils_alchemist": "CommonGameBarUtils_alchemist"
  } ],
  CommonTurboUI_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4205fOLDvtItLG5+lnPDdLT", "CommonTurboUI_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ButtonControllBase_alchemist_1 = require("./Base/ButtonControllBase_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonTurboUI_alchemist = function(_super) {
      __extends(CommonTurboUI_alchemist, _super);
      function CommonTurboUI_alchemist() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      CommonTurboUI_alchemist.prototype.init = function(data) {
        this.data = data;
        this.baseInit();
      };
      CommonTurboUI_alchemist.prototype.setValue = function(boo) {
        var _a, _b;
        null === (_b = (_a = this.data.callbacks).setTurbo) || void 0 === _b ? void 0 : _b.call(_a, boo);
      };
      CommonTurboUI_alchemist = __decorate([ ccclass ], CommonTurboUI_alchemist);
      return CommonTurboUI_alchemist;
    }(ButtonControllBase_alchemist_1.default);
    exports.default = CommonTurboUI_alchemist;
    cc._RF.pop();
  }, {
    "./Base/ButtonControllBase_alchemist": "ButtonControllBase_alchemist"
  } ],
  CommonUI_ViewController_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d4e3e3SmZJPTYQDlKEXrBmZ", "CommonUI_ViewController_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CommonUI_ViewController_alchemist = function(_super) {
      __extends(CommonUI_ViewController_alchemist, _super);
      function CommonUI_ViewController_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.CollectionTarget = null;
        _this.Horizontal = null;
        _this.Vertical = null;
        _this.isOverrideNodeSize = false;
        _this.isOverrideNodeScale = false;
        _this.isOverrideFontSize = false;
        _this.isOverrideAnchor = false;
        _this.isOverrideLayoutComponet = false;
        _this.CurrentNode = [];
        _this.NodePostion_Horizontal = [];
        _this.NodePostion_Vertical = [];
        _this.ingoreSizeName = [];
        _this.ingoreNodeName = [];
        return _this;
      }
      CommonUI_ViewController_alchemist.prototype.onLoad = function() {
        var _this = this;
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.clientReady, function() {
          _this.init();
          _this.commonUI_PanleLayoutSetting();
        });
      };
      CommonUI_ViewController_alchemist.prototype.init = function() {
        var _this = this;
        this.collectChildNode(this.CollectionTarget, this.CurrentNode);
        this.collectChildNode(this.Horizontal, this.NodePostion_Horizontal);
        this.collectChildNode(this.Vertical, this.NodePostion_Vertical);
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.ScreenChange, function() {
          _this.commonUI_PanleLayoutSetting();
        });
      };
      CommonUI_ViewController_alchemist.prototype.collectChildNode = function(currentNode, NodeCollection) {
        var needingore = false;
        this.ingoreNodeName.forEach(function(NodeName) {
          currentNode.name == NodeName && (needingore = true);
        });
        if (needingore) return;
        for (var i = 0; i < currentNode.children.length; i++) {
          if (!(currentNode.children.length > 0)) return;
          NodeCollection.push(currentNode.children[i]);
          this.collectChildNode(currentNode.children[i], NodeCollection);
        }
      };
      CommonUI_ViewController_alchemist.prototype.commonUI_PanleLayoutSetting = function() {
        if (GameManager_alchemist_1.default.GM.currentGameScreenLayout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal) for (var i = 0; i < this.NodePostion_Horizontal.length; i++) this.move_CurrentNode_To_TargetNode(this.CurrentNode[i], this.NodePostion_Horizontal[i]); else for (var i = 0; i < this.NodePostion_Horizontal.length; i++) this.move_CurrentNode_To_TargetNode(this.CurrentNode[i], this.NodePostion_Vertical[i]);
        this.other_commonUI_PanleLayoutSetting();
      };
      CommonUI_ViewController_alchemist.prototype.move_CurrentNode_To_TargetNode = function(currentNode, targetNode) {
        currentNode.name != targetNode.name && console.log("Warnning!!!!\n\n            currentNodeName=" + currentNode.parent.name + "/" + currentNode.name + "\n\n            targetNodeName=" + targetNode.parent.name + "/" + targetNode.name + "\n\n            ----------------------------------");
        if ("RICHTEXT_CHILD" == currentNode.name) return;
        var needingore = false;
        this.ingoreNodeName.forEach(function(NodeName) {
          currentNode.name == NodeName && (needingore = true);
        });
        if (needingore) return;
        if (null == currentNode) return;
        var OriginalWorldPos = currentNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var target = targetNode.convertToWorldSpaceAR(cc.v2(0, 0));
        var result = cc.v2(target.x - OriginalWorldPos.x, target.y - OriginalWorldPos.y);
        currentNode.x += result.x;
        currentNode.y += result.y;
        if (this.isOverrideNodeSize) {
          if (-1 != this.ingoreSizeName.indexOf(currentNode.name)) return;
          currentNode.setContentSize(targetNode.getContentSize());
        }
        this.isOverrideNodeScale && currentNode.setScale(targetNode.getScale(cc.v2()));
        if (this.isOverrideFontSize && null != currentNode.getComponent(cc.Label) && null != targetNode.getComponent(cc.Label)) {
          currentNode.getComponent(cc.Label).fontSize = targetNode.getComponent(cc.Label).fontSize;
          currentNode.getComponent(cc.Label).lineHeight = targetNode.getComponent(cc.Label).lineHeight;
        }
        this.isOverrideAnchor && currentNode.setAnchorPoint(targetNode.getAnchorPoint());
        if (this.isOverrideLayoutComponet && null != currentNode.getComponent(cc.Layout) && null != targetNode.getComponent(cc.Layout)) {
          var currentNode_Layout = currentNode.getComponent(cc.Layout);
          var targetNode_Layout = targetNode.getComponent(cc.Layout);
          currentNode_Layout.spacingX = targetNode_Layout.spacingX;
          currentNode_Layout.spacingY = targetNode_Layout.spacingY;
          currentNode_Layout.paddingLeft = targetNode_Layout.paddingLeft;
          currentNode_Layout.paddingLeft = targetNode_Layout.paddingLeft;
          currentNode_Layout.type = targetNode_Layout.type;
          currentNode_Layout.resizeMode = targetNode_Layout.resizeMode;
          currentNode_Layout.updateLayout();
        }
      };
      __decorate([ property(cc.Node) ], CommonUI_ViewController_alchemist.prototype, "CollectionTarget", void 0);
      __decorate([ property(cc.Node) ], CommonUI_ViewController_alchemist.prototype, "Horizontal", void 0);
      __decorate([ property(cc.Node) ], CommonUI_ViewController_alchemist.prototype, "Vertical", void 0);
      __decorate([ property(cc.Boolean) ], CommonUI_ViewController_alchemist.prototype, "isOverrideNodeSize", void 0);
      __decorate([ property(cc.Boolean) ], CommonUI_ViewController_alchemist.prototype, "isOverrideNodeScale", void 0);
      __decorate([ property(cc.Boolean) ], CommonUI_ViewController_alchemist.prototype, "isOverrideFontSize", void 0);
      __decorate([ property(cc.Boolean) ], CommonUI_ViewController_alchemist.prototype, "isOverrideAnchor", void 0);
      __decorate([ property(cc.Boolean) ], CommonUI_ViewController_alchemist.prototype, "isOverrideLayoutComponet", void 0);
      CommonUI_ViewController_alchemist = __decorate([ ccclass ], CommonUI_ViewController_alchemist);
      return CommonUI_ViewController_alchemist;
    }(cc.Component);
    exports.default = CommonUI_ViewController_alchemist;
    cc._RF.pop();
  }, {
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist"
  } ],
  EventSystem_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "12086LEbSBIlZkF5gVhTcQ0", "EventSystem_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.EventSystem_alchemist = exports.EventType_alchemist = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EventType_alchemist;
    (function(EventType_alchemist) {
      EventType_alchemist["Normal"] = "Normal";
      EventType_alchemist["Running"] = "Running";
      EventType_alchemist["Stoped"] = "Stoped";
      EventType_alchemist["ShowResult"] = "ShowResult";
      EventType_alchemist["ShowResultEnd"] = "ShowResultEnd";
      EventType_alchemist["CheckExpand"] = "CheckExpand";
      EventType_alchemist["ShowBetReward"] = "ShowBetReward";
      EventType_alchemist["ShowBetReward_End"] = "ShowBetReward_End";
      EventType_alchemist["CheckBigWin"] = "CheckBigWin";
      EventType_alchemist["BackToNormal"] = "BackToNormal";
      EventType_alchemist["BigWininit"] = "BigWininit";
      EventType_alchemist["UpdateUI"] = "UpdateUI";
      EventType_alchemist["CHANGE_STATE"] = "CHANGE_STATE";
      EventType_alchemist["onEnterFreeGame"] = "onEnterFreeGame";
      EventType_alchemist["FreeGameState"] = "FreeGameState";
      EventType_alchemist["FreeGameEnd"] = "FreeGameEnd";
      EventType_alchemist["BigWinShowEnd"] = "BigWinShowEnd";
      EventType_alchemist["ScreenChange"] = "ScreenChange";
      EventType_alchemist["CheckCanBet"] = "CheckCanBet";
      EventType_alchemist["AssetLoaded"] = "AssetLoaded";
      EventType_alchemist["Gameinit"] = "Gameinit";
      EventType_alchemist["clientReady"] = "clientReady";
      EventType_alchemist["BonusState"] = "BonusState";
      EventType_alchemist["BonusExit"] = "BonusExit";
      EventType_alchemist["hasMystery"] = "hasMystery";
      EventType_alchemist["FreeGameCheckWildAccumulated"] = "FreeGameCheckWildAccumulated";
    })(EventType_alchemist = exports.EventType_alchemist || (exports.EventType_alchemist = {}));
    var EventSystem_alchemist = function(_super) {
      __extends(EventSystem_alchemist, _super);
      function EventSystem_alchemist() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EventSystem_alchemist_1 = EventSystem_alchemist;
      Object.defineProperty(EventSystem_alchemist, "Node", {
        get: function() {
          return this._Instance.node;
        },
        enumerable: false,
        configurable: true
      });
      EventSystem_alchemist.on = function(type, callback, target, useCapture) {
        return EventSystem_alchemist_1.Node.on(type, callback, target, useCapture);
      };
      EventSystem_alchemist.off = function(type, callback, target, useCapture) {
        EventSystem_alchemist_1.Node.off(type, callback, target, useCapture);
      };
      EventSystem_alchemist.targetOff = function(target) {
        EventSystem_alchemist_1.Node.targetOff(target);
      };
      EventSystem_alchemist.emit = function(Node, type, arg1, arg2, arg3, arg4, arg5) {
        EventSystem_alchemist_1.Node.emit(type, arg1, arg2, arg3, arg4, arg5);
      };
      EventSystem_alchemist.prototype.onLoad = function() {
        EventSystem_alchemist_1._Instance = this;
      };
      var EventSystem_alchemist_1;
      EventSystem_alchemist = EventSystem_alchemist_1 = __decorate([ ccclass ], EventSystem_alchemist);
      return EventSystem_alchemist;
    }(cc.Component);
    exports.EventSystem_alchemist = EventSystem_alchemist;
    cc._RF.pop();
  }, {} ],
  FreeAxisManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9b65aX84zlAB6rLE5G0z9jx", "FreeAxisManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BubbleNumberJumper_alchemist_1 = require("./BubbleNumberJumper_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FreeAxisManager_alchemist = function(_super) {
      __extends(FreeAxisManager_alchemist, _super);
      function FreeAxisManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.blueframe = null;
        _this.bubble_img = null;
        _this.bubbleGray_img = null;
        _this.Symbol_List = [];
        _this.hintSpine = null;
        _this.m_Symbol_ID = [ 0, 0, 0 ];
        _this.m_SunScoreTab = [ 0, 0, 0 ];
        _this.m_Symbol_Type = [ 1, 1, 1 ];
        _this.m_Symbol_Move_Hight = 200;
        _this.m_Axis_Type = 0;
        _this.m_Axis_Index = 0;
        _this.m_Spin_Type = 0;
        _this.m_Result_ID = 0;
        _this.m_Result_SunScore = 0;
        _this.m_IsGetResult = true;
        _this.m_CanStop = true;
        _this.m_QuickStop = false;
        _this.m_Spining = false;
        _this.m_Stoping = false;
        _this.m_GetResultCount = 0;
        _this.m_GetResultCountNum = 1;
        _this.m_RunningCount = 0;
        _this.m_RunningCountNum = 0;
        _this.m_SpinSpeed = .05;
        _this.m_MaxSpinSpeed = .02;
        _this.m_Axis_PosY = 0;
        _this.m_IsGetSun = false;
        _this.m_FreeRandTab = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2e3, 8e3 ];
        _this.m_FreeResultRandTab = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 500, 9500 ];
        _this.Enum_Symbol_Type = cc.Enum({
          typeDark: 0,
          typeNormal: 1,
          typeBlur: 2,
          typeNon: 3
        });
        _this.Enum_Axis_Type = cc.Enum({
          Normal: 0,
          RunnStart: 1,
          Running: 2,
          Hint: 3,
          Stop: 4
        });
        _this.Enum_Symbol_ID = cc.Enum({
          SymbolNormal1: 0,
          SymbolNormal2: 1,
          SymbolNormal3: 2,
          SymbolNormal4: 3,
          SymbolNormal5: 4,
          SymbolNormal6: 5,
          SymbolNormal7: 6,
          SymbolNormal8: 7,
          SymbolNormal9: 8,
          SymbolWild: 9,
          SymbolScatter: 10,
          SymbolSun: 11,
          SymbolNull: 12,
          SymbolTotalNum: 13
        });
        _this.Enum_Spin_Type = cc.Enum({
          Normal: 0,
          StartUpDown: 1,
          Running: 2,
          ChangeData: 3,
          MaxRunning: 4,
          Stoping: 5,
          StopDownUp: 6,
          StopEnd: 7
        });
        return _this;
      }
      FreeAxisManager_alchemist.prototype.onLoad = function() {
        for (var i = 0; i < this.node.children.length; i++) this.Symbol_List[i] = this.node.children[i];
      };
      FreeAxisManager_alchemist.prototype.init = function(runningcountnum, index) {
        this.hintSpine.node.opacity = 0;
        this.m_RunningCountNum = runningcountnum;
        this.m_Axis_Type = this.Enum_Axis_Type.Normal;
        this.m_Spin_Type = this.Enum_Spin_Type.Normal;
        this.m_Axis_Index = index;
        for (var i = 0; i < this.Symbol_List.length; i++) {
          this.m_Symbol_ID[i] = this.Enum_Symbol_ID.SymbolNull;
          this.m_SunScoreTab[i] = 0;
          this.SetSymbolSpriteFrame(i, this.m_Symbol_ID[i]);
        }
      };
      FreeAxisManager_alchemist.prototype.SetRunningcountnum = function(runningcountnum) {
        this.m_RunningCountNum = runningcountnum;
      };
      FreeAxisManager_alchemist.prototype.StartInit = function(score) {
        this.SetResultSunScore(score);
        this.m_Symbol_ID[1] = this.Enum_Symbol_ID.SymbolSun;
        this.SetSymbolSpriteFrame(1, this.m_Symbol_ID[1], true);
        this.m_IsGetSun = false;
      };
      FreeAxisManager_alchemist.prototype.AxisRunningStart = function() {
        var _this = this;
        this.m_Axis_Type = this.Enum_Axis_Type.RunnStart;
        this.m_Spin_Type = this.Enum_Spin_Type.StartUpDown;
        this.m_QuickStop = false;
        this.m_IsGetResult = false;
        this.m_CanStop = false;
        this.m_Spining = true;
        this.m_Stoping = false;
        this.m_RunningCount = 0;
        this.m_GetResultCount = 0;
        var upHight = this.m_Symbol_Move_Hight / 4;
        cc.tween(this.node).by(.25, {
          position: cc.v3(0, upHight, 0)
        }).call(function() {
          _this.m_Spin_Type = _this.Enum_Spin_Type.Running;
          _this.m_IsGetResult && (_this.m_CanStop = true);
          _this.FirstRunningActionSetting();
        }).start();
      };
      FreeAxisManager_alchemist.prototype.RandSymbolID = function() {
        var randNum = Math.floor(1e4 * Math.random());
        var level = 0;
        for (var i = 0; i < this.Enum_Symbol_ID.SymbolTotalNum; i++) {
          level += this.m_FreeRandTab[i];
          if (randNum < level) return i;
        }
        return 0;
      };
      FreeAxisManager_alchemist.prototype.SetSymbolSpriteFrame = function(index, id, isinit) {
        void 0 === isinit && (isinit = false);
        if (id <= this.Enum_Symbol_ID.SymbolSun) {
          this.Symbol_List[index].active = true;
          this.Symbol_List[index].getComponent(cc.Sprite).spriteFrame = isinit ? null : this.bubble_img;
          var score = this.m_SunScoreTab[index];
          this.Symbol_List[index].getChildByName("Score").active = true;
          var num = this.roundDecimal(score, 2);
          num % 1 == 0 ? this.Symbol_List[index].getChildByName("Score").getComponent(BubbleNumberJumper_alchemist_1.BubbleNumberJumper).startJumpingNum(num, num, .1, 0) : this.Symbol_List[index].getChildByName("Score").getComponent(BubbleNumberJumper_alchemist_1.BubbleNumberJumper).startJumpingNum(num, num, .1, 2);
        } else {
          this.Symbol_List[index].getComponent(cc.Sprite).spriteFrame = this.bubbleGray_img;
          this.Symbol_List[index].getChildByName("Score").active = false;
        }
      };
      FreeAxisManager_alchemist.prototype.RunningChangeData = function() {
        this.node.setPosition(cc.v3(this.node.x, this.node.y + this.m_Symbol_Move_Hight, 0));
        if (this.m_Stoping) if (this.m_GetResultCount < this.m_GetResultCountNum) {
          var symid = this.m_Result_ID;
          var symScore = this.m_Result_SunScore;
          this.m_Symbol_ID.pop();
          this.m_Symbol_ID.splice(0, 0, symid);
          this.m_SunScoreTab.pop();
          this.m_SunScoreTab.splice(0, 0, symScore);
          for (var i = 0; i < this.Symbol_List.length; i++) this.SetSymbolSpriteFrame(i, this.m_Symbol_ID[i]);
          this.m_GetResultCount++;
          this.RunningActionSetting();
        } else {
          var randid = 0;
          randid = this.RandSymbolID();
          this.m_Symbol_ID.pop();
          this.m_Symbol_ID.splice(0, 0, randid);
          var randScore = this.m_Result_SunScore;
          this.m_SunScoreTab.pop();
          this.m_SunScoreTab.splice(0, 0, randScore);
          for (var i = 0; i < this.Symbol_List.length; i++) this.SetSymbolSpriteFrame(i, this.m_Symbol_ID[i]);
          this.RunningStop();
        } else {
          var randid = 0;
          randid = this.RandSymbolID();
          this.m_Symbol_ID.pop();
          this.m_Symbol_ID.splice(0, 0, randid);
          var randScore = this.m_Result_SunScore;
          this.m_SunScoreTab.pop();
          this.m_SunScoreTab.splice(0, 0, randScore);
          for (var i = 0; i < this.Symbol_List.length; i++) this.SetSymbolSpriteFrame(i, this.m_Symbol_ID[i]);
          this.m_RunningCount++;
          this.m_RunningCount >= this.m_RunningCountNum && (this.m_CanStop ? this.m_Stoping = true : this.m_RunningCount--);
          this.RunningActionSetting();
        }
      };
      FreeAxisManager_alchemist.prototype.FirstRunningActionSetting = function() {
        var _this = this;
        var downHight1 = this.m_Symbol_Move_Hight / 4 * -1;
        var downHight2 = -1 * this.m_Symbol_Move_Hight;
        var Speed = this.m_SpinSpeed;
        cc.tween(this.node).by(Speed, {
          position: cc.v3(0, downHight1, 0)
        }).by(Speed, {
          position: cc.v3(0, downHight2, 0)
        }).call(function() {
          _this.RunningChangeData();
        }).start();
      };
      FreeAxisManager_alchemist.prototype.RunningActionSetting = function() {
        var _this = this;
        var downHight = -1 * this.m_Symbol_Move_Hight;
        var Speed = this.m_SpinSpeed;
        cc.tween(this.node).by(Speed, {
          position: cc.v3(0, downHight, 0)
        }).call(function() {
          _this.RunningChangeData();
        }).start();
      };
      FreeAxisManager_alchemist.prototype.RunningStop = function() {
        var _this = this;
        var upHight = this.m_Symbol_Move_Hight / 4;
        var downHight = -1 * upHight;
        cc.tween(this.node).by(this.m_SpinSpeed, {
          position: cc.v3(0, downHight, 0)
        }).by(.1, {
          position: cc.v3(0, upHight, 0)
        }).call(function() {
          _this.m_Spining = false;
          _this.m_Axis_Type = _this.Enum_Axis_Type.Stop;
          _this.m_Spin_Type = _this.Enum_Spin_Type.StopEnd;
          _this.m_QuickStop = false;
          _this.m_CanStop = false;
          _this.node.y = 0;
          if (_this.m_Symbol_ID[1] == _this.Enum_Symbol_ID.SymbolSun) {
            GameManager_alchemist_1.default.GM.Instance_BonusManager.BubbleHitSoundCount += 1;
            _this.hintSpine.node.opacity = 255;
            _this.Symbol_List[1].getComponent(cc.Sprite).spriteFrame = null;
            _this.hintSpine.setAnimation(0, "in", false);
            _this.blueframe.node.opacity = 255;
            cc.tween(_this.Symbol_List[1]).to(.26664, {
              scale: 1.2
            }).to(.23331, {
              scale: 1
            }).start();
          }
        }).start();
      };
      FreeAxisManager_alchemist.prototype.SetResult = function(result) {
        this.m_Result_ID = result;
        this.m_IsGetResult = true;
        this.m_Spin_Type == this.Enum_Spin_Type.Running && (this.m_CanStop = true);
      };
      FreeAxisManager_alchemist.prototype.SetResultSunScore = function(score) {
        this.m_Result_SunScore = score;
        this.m_SunScoreTab = [ score, score, score ];
      };
      FreeAxisManager_alchemist.prototype.QuickStop = function() {
        this.m_QuickStop = true;
      };
      FreeAxisManager_alchemist.prototype.AllAxisStopSetting = function() {
        this.m_Axis_Type = this.Enum_Axis_Type.Normal;
        this.m_Spin_Type = this.Enum_Spin_Type.Normal;
        this.m_IsGetResult = false;
        this.m_Stoping = false;
        this.m_RunningCount = 0;
        this.m_GetResultCount = 0;
        this.m_QuickStop = false;
        this.m_CanStop = false;
        this.m_Spining = false;
        this.m_Result_ID == this.Enum_Symbol_ID.SymbolSun && (this.m_IsGetSun = true);
      };
      FreeAxisManager_alchemist.prototype.update = function(dt) {};
      FreeAxisManager_alchemist.prototype.roundDecimal = function(val, precision) {
        return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, precision || 0);
      };
      __decorate([ property([ cc.Node ]) ], FreeAxisManager_alchemist.prototype, "Symbol_List", void 0);
      FreeAxisManager_alchemist = __decorate([ ccclass ], FreeAxisManager_alchemist);
      return FreeAxisManager_alchemist;
    }(cc.Component);
    exports.default = FreeAxisManager_alchemist;
    cc._RF.pop();
  }, {
    "./BubbleNumberJumper_alchemist": "BubbleNumberJumper_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist"
  } ],
  FreeSpinDigital_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "031df57br5L8Y+Kor9gBI0L", "FreeSpinDigital_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var FreeSpinDigital_alchemist = function(_super) {
      __extends(FreeSpinDigital_alchemist, _super);
      function FreeSpinDigital_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.HoriTens = null;
        _this.HoriDigital = null;
        _this.VertiTens = null;
        _this.VertiDigital = null;
        _this.FreeSpinTimes_Digital = [];
        _this.Number0 = [];
        _this.Number1 = [];
        _this.Number2 = [];
        _this.Number3 = [];
        _this.Number4 = [];
        _this.Number5 = [];
        _this.Number6 = [];
        _this.Number7 = [];
        _this.Number8 = [];
        _this.Number9 = [];
        return _this;
      }
      FreeSpinDigital_alchemist.prototype.init = function() {
        return __awaiter(this, void 0, void 0, function() {
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.LoadFreeSpinDigital(this.Number0, "Texture/freespinDigital/0/", 0) ];

             case 1:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number1, "Texture/freespinDigital/1/", 1) ];

             case 2:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number2, "Texture/freespinDigital/2/", 2) ];

             case 3:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number3, "Texture/freespinDigital/3/", 3) ];

             case 4:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number4, "Texture/freespinDigital/4/", 4) ];

             case 5:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number5, "Texture/freespinDigital/5/", 5) ];

             case 6:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number6, "Texture/freespinDigital/6/", 6) ];

             case 7:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number7, "Texture/freespinDigital/7/", 7) ];

             case 8:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number8, "Texture/freespinDigital/8/", 8) ];

             case 9:
              _a.sent();
              return [ 4, this.LoadFreeSpinDigital(this.Number9, "Texture/freespinDigital/9/", 9) ];

             case 10:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("0", this.Number0) ];

             case 11:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("1", this.Number1) ];

             case 12:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("2", this.Number2) ];

             case 13:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("3", this.Number3) ];

             case 14:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("4", this.Number4) ];

             case 15:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("5", this.Number5) ];

             case 16:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("6", this.Number6) ];

             case 17:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("7", this.Number7) ];

             case 18:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("8", this.Number8) ];

             case 19:
              _a.sent();
              return [ 4, this.setFreeSpinAnimation("9", this.Number9) ];

             case 20:
              _a.sent();
              this.FreeSpinTimes_Digital.forEach(function(clip, idx) {
                _this.HoriDigital.addClip(clip);
                _this.HoriTens.addClip(clip);
                _this.VertiDigital.addClip(clip);
                _this.VertiTens.addClip(clip);
              });
              return [ 2 ];
            }
          });
        });
      };
      FreeSpinDigital_alchemist.prototype.setFreeSpinAnimation = function(name, freetextures) {
        var _this = this;
        return new Promise(function(res, rej) {
          var clip = cc.AnimationClip.createWithSpriteFrames(freetextures, freetextures.length);
          clip.wrapMode = cc.WrapMode.PingPong;
          clip.name = name;
          _this.FreeSpinTimes_Digital.push(clip);
          res("");
        });
      };
      FreeSpinDigital_alchemist.prototype.LoadFreeSpinDigital = function(emptyarray, path, idx) {
        return new Promise(function(res, rej) {
          var CompletedCount = 0;
          var _loop_1 = function(i) {
            var fileName = function(i) {
              return i < 10 ? idx + "_00" + i : idx + "_0" + i;
            };
            cc.loader.loadRes(path + fileName(i), function(err, texture) {
              err && console.log(err);
              emptyarray[i] = new cc.SpriteFrame(texture);
              CompletedCount += 1;
              CompletedCount >= 16 && res("");
            });
          };
          for (var i = 0; i < 16; i++) _loop_1(i);
        });
      };
      __decorate([ property(cc.Animation) ], FreeSpinDigital_alchemist.prototype, "HoriTens", void 0);
      __decorate([ property(cc.Animation) ], FreeSpinDigital_alchemist.prototype, "HoriDigital", void 0);
      __decorate([ property(cc.Animation) ], FreeSpinDigital_alchemist.prototype, "VertiTens", void 0);
      __decorate([ property(cc.Animation) ], FreeSpinDigital_alchemist.prototype, "VertiDigital", void 0);
      FreeSpinDigital_alchemist = __decorate([ ccclass ], FreeSpinDigital_alchemist);
      return FreeSpinDigital_alchemist;
    }(cc.Component);
    exports.default = FreeSpinDigital_alchemist;
    cc._RF.pop();
  }, {} ],
  GameManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8784alpzRRNXL8hVnQ58iaE", "GameManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GameScreenLayout_alchemist = exports.CongratulateEnum_alchemist = exports.BackgroundSpineEnum_alchemist = void 0;
    var BigWinManager_alchemist_1 = require("./BigWinManager_alchemist");
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var WheelManager_alchemist_1 = require("./WheelManager_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var UI_interface_alchemist_1 = require("./UI/UI_interface_alchemist");
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var ServerPortocolManager_alchemist_1 = require("./ServerPortocolManager_alchemist");
    var LoadingPage_ViewController_alchemist_1 = require("./CommonUI/LoadingPage_ViewController_alchemist");
    var RemoteAssetManager_alchemist_1 = require("./RemoteAssetManager_alchemist");
    var BonusManager_alchemist_1 = require("./BonusManager_alchemist");
    var Roller_alchemist_1 = require("./Roller_alchemist");
    var RewardMarqueen_alchemist_1 = require("./RewardMarqueen_alchemist");
    var CocosUtil_alchemist_1 = require("../alchemist/Hierachy/CocosUtil_alchemist");
    var CommonGameBarManager_alchemist_1 = require("./CommonGameBar/CommonGameBarManager_alchemist");
    var Wildaccumulated_alchemist_1 = require("./Wildaccumulated_alchemist");
    var CommonGameBarUtils_alchemist_1 = require("./CommonGameBar/CommonGameBarUtils_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BackgroundSpineEnum_alchemist;
    (function(BackgroundSpineEnum_alchemist) {
      BackgroundSpineEnum_alchemist["MG_Idle"] = "MainGame_Background_Idle";
      BackgroundSpineEnum_alchemist["MG_Win"] = "MainGame_Background_Win";
      BackgroundSpineEnum_alchemist["Bonus_Idle"] = "BonusGame_Background_Idle";
      BackgroundSpineEnum_alchemist["Bonus_Win"] = "BonusGame_Background_Win";
      BackgroundSpineEnum_alchemist["normal_idle2"] = "normal_idle2";
      BackgroundSpineEnum_alchemist["normal_idle3"] = "normal_idle3";
      BackgroundSpineEnum_alchemist["normal_idle4"] = "normal_idle4";
      BackgroundSpineEnum_alchemist["Symbol_Idle"] = "idle";
      BackgroundSpineEnum_alchemist["Symbol_Win"] = "normal";
      BackgroundSpineEnum_alchemist["Wildx1"] = "normal";
      BackgroundSpineEnum_alchemist["Wildx2"] = "normal";
      BackgroundSpineEnum_alchemist["Wildx3"] = "normal";
      BackgroundSpineEnum_alchemist["LOGO_LOOP"] = "logo";
      BackgroundSpineEnum_alchemist["Wildx5"] = "normal";
    })(BackgroundSpineEnum_alchemist = exports.BackgroundSpineEnum_alchemist || (exports.BackgroundSpineEnum_alchemist = {}));
    var CongratulateEnum_alchemist;
    (function(CongratulateEnum_alchemist) {
      CongratulateEnum_alchemist["GOODLUCK"] = "GOOD LUCK";
      CongratulateEnum_alchemist["SPINTOWIN"] = "SPIN TO WIN";
      CongratulateEnum_alchemist["OFF"] = "";
    })(CongratulateEnum_alchemist = exports.CongratulateEnum_alchemist || (exports.CongratulateEnum_alchemist = {}));
    var GameScreenLayout_alchemist;
    (function(GameScreenLayout_alchemist) {
      GameScreenLayout_alchemist["Horizontal"] = "Horizontal";
      GameScreenLayout_alchemist["Vertical"] = "Vertical";
    })(GameScreenLayout_alchemist = exports.GameScreenLayout_alchemist || (exports.GameScreenLayout_alchemist = {}));
    var GameManager_alchemist = function(_super) {
      __extends(GameManager_alchemist, _super);
      function GameManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.hasResult = false;
        _this.AudioReady = false;
        _this.GameReady = false;
        _this.language_PAYS = "";
        _this.language_LINE = "";
        _this.isWindowFocus = false;
        _this.offlineResultIdx = 0;
        _this.Wild_accumulated = null;
        _this._gm = null;
        _this.commonGameBarManager = null;
        _this.ServerPortocolMgr = null;
        _this.Instance_WheelManager = null;
        _this.Instance_BonusManager = null;
        _this.userUI = null;
        _this.LoadingPage = null;
        _this.big_win_Node = null;
        _this.touch_Block = null;
        _this.Instance_MessageBox = null;
        _this.Spin = null;
        _this.Loading_Black = null;
        _this.UI_Score = null;
        _this.UI_roundScore = null;
        _this.TotalBet = null;
        _this.Credit = null;
        _this.FreeGameCutScene = null;
        _this.EnterFreeGame = null;
        _this.FreeGameleftTime = null;
        _this.EndFreeGame = null;
        _this.BonusCutSceneIn = null;
        _this.BonusCutSceneOut = null;
        _this.bigWinBG = null;
        _this.GameMGBG_spines = [];
        _this.GameFGBG_spines = [];
        _this.congratulateTips = null;
        _this.Effect_FreeGameCutScene = null;
        _this.WinScoreBG_Hori = null;
        _this.WinScoreBG_Verti = null;
        _this.isBigWin = false;
        _this.saveGameScore = 0;
        _this.saveBetReward = 0;
        _this.count_Rollerinit = 0;
        _this.isRollerinit = false;
        _this.GameServer = null;
        _this.isRollerStoped = true;
        _this.MainGameBG = null;
        _this.FreeGameBG = null;
        _this.isGameReady = false;
        _this.isSendReady = false;
        _this.isResourcesDownLoaded = false;
        _this.clientinited = false;
        _this.FS_TimesDigital = null;
        _this.isSkipMode = false;
        _this.Wild_Collection = 0;
        _this.BonusFlag = false;
        _this.isFreeGameState = false;
        _this.FreeGameLastRound = false;
        _this.GameData = [];
        _this.FreeGamePlus2CutScene = null;
        _this.hasBonusGameFlag = false;
        _this.hasFreeGameFlag = false;
        _this.BuyFreeGameFlag = false;
        _this.RewardMarqueen = null;
        _this._FreeGameTimes = 0;
        _this._GameState = "Loading";
        _this._saveGameResult = [];
        _this.BuyFreeGamePage = null;
        _this.BigWinMusicInit = false;
        _this.f = false;
        _this.m_PaylineTriger = false;
        _this.m_timeCounter = 0;
        _this.m_showindex = 0;
        _this.m_changetriger = false;
        _this.DelayTime = 0;
        _this.DelayTimeTrigger = false;
        _this.DelayEndTime = 0;
        _this.RecordTime = 0;
        _this.RecordFlag = false;
        return _this;
      }
      GameManager_alchemist_1 = GameManager_alchemist;
      Object.defineProperty(GameManager_alchemist.prototype, "FreeGameTimes", {
        get: function() {
          return this._FreeGameTimes;
        },
        set: function(v) {
          this._FreeGameTimes = v;
          this.FreeGameleftTime.getChildByName("times").getComponent(cc.Label).string = v.toString();
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GameManager_alchemist.prototype, "GameState", {
        get: function() {
          return this._GameState;
        },
        set: function(v) {
          console.log("%c[" + this._GameState + "]  --\x3e [%c" + v + "]", "color:#FF4D00; font-weight:bold;", "color:#FF4D00;");
          this._GameState = v;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GameManager_alchemist.prototype, "saveGameResult", {
        get: function() {
          return this._saveGameResult;
        },
        set: function(v) {
          this._saveGameResult = v;
        },
        enumerable: false,
        configurable: true
      });
      GameManager_alchemist.prototype.onLoad = function() {
        var _this = this;
        this.RewardMarqueen = this.node.getComponentInChildren(RewardMarqueen_alchemist_1.default);
        this.RewardMarqueen.init();
        this.MainGameBG = cc.find("Canvas/Mask/MainGameBG").getComponent(sp.Skeleton);
        this.FreeGameBG = cc.find("Canvas/Mask/FreeGameBG").getComponent(sp.Skeleton);
        false;
        true;
        GameServer_alchemist_1.default.self = new GameServer_alchemist_1.default();
        this.Instance_MessageBox.getChildByName("ok").on("click", function() {
          _this.Instance_MessageBox.active = false;
          _this.SendCheckcoinType2();
        });
        this._gm = this.node.getComponent(GameManager_alchemist_1);
        GameManager_alchemist_1.GM = this._gm;
        this.big_win_Node = this.big_win_Node.getComponent(BigWinManager_alchemist_1.default);
        this.FreeGamePlus2CutScene = cc.find("Canvas/Mask/FreeTimes");
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.Gameinit, function() {
          if (RemoteAssetManager_alchemist_1.default.self.isAssetLoaded && null != GameServer_alchemist_1.default.self.PlayerData) {
            GameServer_alchemist_1.default.self.PlayerSetting(GameServer_alchemist_1.default.self.PlayerData);
            _this.userUI.UI_Interface_init();
            _this.Wild_accumulated.init();
            _this.ServerPortocolMgr.offline && _this.ServerPortocolMgr.clientReady();
          }
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.AssetLoaded, function() {
          AudioManager_alchemist_1.AudioManager_alchemist.Remoteinit();
          var SpriteComponetSetResource = function(res, pathString) {
            var componet = cc.find(pathString).getComponent(cc.Sprite);
            componet.spriteFrame = res;
            return componet;
          };
          var ButtonComponetSetResource = function(res, pathString) {
            var componet = cc.find(pathString).getComponent(cc.Button);
            componet.normalSprite = res[0];
            componet.hoverSprite = res[1];
            componet.pressedSprite = res[2];
            componet.disabledSprite = res[3];
            return componet;
          };
          var freegameDigital = [];
          for (var i = 0; i <= 10; i++) freegameDigital[i] = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("freegame" + i);
          var _bg_hori = RemoteAssetManager_alchemist_1.default.self.getSpine("MainGame_Background_Landscape");
          var _bg_verti = RemoteAssetManager_alchemist_1.default.self.getSpine("MainGame_Background_Portrait_Idle");
          var _fgbg_hori = RemoteAssetManager_alchemist_1.default.self.getSpine("BonusGame_Background_Landscape");
          var _fgbg_verti = RemoteAssetManager_alchemist_1.default.self.getSpine("BonusGame_Background_Portrait");
          var ExtraFreeSpin = cc.find("Canvas/Mask/FreeTimes/Extra-Free-Spins").getComponent(sp.Skeleton);
          ExtraFreeSpin.skeletonData = RemoteAssetManager_alchemist_1.default.self.getSpine("Extra_Free_Spins");
          ExtraFreeSpin.setAnimation(0, "Intro", true);
          var normal = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("arrow_normal");
          var hover = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("arrow_hover");
          ButtonComponetSetResource([ normal, hover, null, null ], "Canvas/Mask/GameIntroduced/startLbutton");
          ButtonComponetSetResource([ normal, hover, null, null ], "Canvas/Mask/GameIntroduced/startRbutton");
          var playbtn_normal = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("confirm_btn");
          var startbtn = ButtonComponetSetResource([ playbtn_normal, null, null, null ], "Canvas/Mask/GameIntroduced/Start_btn");
          startbtn.node.getChildByName("Background").getComponent(cc.Sprite).spriteFrame = playbtn_normal;
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("confirm_btn"), "Canvas/Mask/BuyFreeGamePage/btn_confirm/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("confirm_btn"), "Canvas/Mask/BuyFreeGamePage/btn_confirm/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("confirm_icon"), "Canvas/Mask/BuyFreeGamePage/btn_confirm/background/confirm_icon");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("cancel_btn"), "Canvas/Mask/BuyFreeGamePage/btn_cancel/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("cancel_icon"), "Canvas/Mask/BuyFreeGamePage/btn_cancel/background/cancel_icon");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("cancel_icon"), "Canvas/Mask/UI_interface/Page_info/tbtn_close/tBackground");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("frame"), "Canvas/Mask/BuyFreeGamePage/frame");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("PayTableBackground"), "Canvas/Mask/UI_interface/Page_info/PageView_hori/pageView/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("PayTableBackgroundPortrait"), "Canvas/Mask/UI_interface/Page_info/PageView_verti/pageView/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("Buy_Freespin"), "Canvas/Mask/FreeGameLeftTImes/background");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("PayTable"), "Canvas/Mask/UI_interface/Page_info/PageView_verti/pageView/view/content/page_5/PayTable");
          SpriteComponetSetResource(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("PayTable"), "Canvas/Mask/UI_interface/Page_info/PageView_hori/pageView/view/content/page_5/PayTable");
          var WildLock = RemoteAssetManager_alchemist_1.default.self.getSpine("Wild");
          var WildLock_Parent = cc.find("Canvas/Mask/WheelManager/Wilds_Lock");
          WildLock_Parent.children.forEach(function(axis) {
            axis.children.forEach(function(unit) {
              unit.getComponent(sp.Skeleton).skeletonData = WildLock;
            });
          });
          _this.WinScoreBG_Hori.skeletonData = _fgbg_hori;
          _this.WinScoreBG_Verti.skeletonData = _fgbg_verti;
          _this.WinScoreBG_Hori.setAnimation(0, BackgroundSpineEnum_alchemist.Bonus_Win, true);
          _this.WinScoreBG_Verti.setAnimation(0, BackgroundSpineEnum_alchemist.Bonus_Win, true);
          _this.anim_WinScore(false);
          _this.GameMGBG_spines.push(_bg_hori);
          _this.GameMGBG_spines.push(_bg_verti);
          _this.GameFGBG_spines.push(_fgbg_hori);
          _this.GameFGBG_spines.push(_fgbg_verti);
          if (_this.currentGameScreenLayout == GameScreenLayout_alchemist.Horizontal) {
            _this.MainGameBG.skeletonData = _this.GameMGBG_spines[0];
            _this.FreeGameBG.skeletonData = _this.GameFGBG_spines[0];
            _this.WinScoreBG_Hori.node.opacity = 255;
            _this.WinScoreBG_Verti.node.opacity = 0;
          } else {
            _this.MainGameBG.skeletonData = _this.GameMGBG_spines[1];
            _this.FreeGameBG.skeletonData = _this.GameFGBG_spines[1];
            _this.WinScoreBG_Hori.node.opacity = 0;
            _this.WinScoreBG_Verti.node.opacity = 255;
          }
          _this.set_BG(BackgroundSpineEnum_alchemist.MG_Idle);
          var _freetimeDigital = [];
          for (var i = 0; i <= 10; i++) _freetimeDigital[i] = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("bonus" + i);
          var bigwinManager = cc.find("Canvas/Mask/BigWin/Spine").getComponent(BigWinManager_alchemist_1.default);
          bigwinManager.init();
          console.log("Asset---------Loaded");
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.Gameinit);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.clientReady, function() {
          if (false == _this.AudioReady || false == _this.GameReady) return;
          _this.isGameReady = true;
          if (false == _this.isSendReady) {
            _this.isSendReady = true;
            EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.ScreenChange, _this.currentGameScreenLayout);
            _this.scheduleOnce(function() {
              _this.set_BG(BackgroundSpineEnum_alchemist.MG_Idle);
              _this.LoadingPage.node.getChildByName("LoadingSpine").active = false;
              _this.LoadingPage.node.active = false;
              GameManager_alchemist_1.GM.GameState = EventSystem_alchemist_1.EventType_alchemist.Normal;
            }, 1);
          }
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.hasMystery, function() {
          return __awaiter(_this, void 0, void 0, function() {
            var _this = this;
            return __generator(this, function(_a) {
              this.hasBonusGameFlag && this.hasFreeGameFlag || this.SendCheckcoin();
              this.scheduleOnce(function() {
                EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.BackToNormal);
              }, .1);
              return [ 2 ];
            });
          });
        });
      };
      GameManager_alchemist.prototype.SetBalance = function(coin) {
        console.log("SetBalance  ", coin);
        GameServer_alchemist_1.default.self.UserCredit = coin;
        this.Credit.string = Math.round(GameServer_alchemist_1.default.self.UserCredit).toString();
        this.commonGameBarManager.updateBalanceLabel(GameServer_alchemist_1.default.self.UserCredit);
      };
      GameManager_alchemist.prototype.start = function() {
        var _this = this;
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.BackToNormal, function() {
          GameManager_alchemist_1.GM.GameState = EventSystem_alchemist_1.EventType_alchemist.BackToNormal;
          _this.userUI.UserPressStopBtn = _this.userUI.btn_Stop.node.active = false;
          if (!_this.isFreeGameState && _this.FreeGameTimes > 0) {
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.ScatterReward);
            _this.ScatterReward();
            _this.scheduleOnce(function() {
              EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.onEnterFreeGame);
            }, 2);
          } else {
            cc.log("\u4e00\u822c\u8f49");
            GameManager_alchemist_1.GM.GameState = EventSystem_alchemist_1.EventType_alchemist.Normal;
            UI_interface_alchemist_1.default.self.btn_Auto.node.active = true;
            UI_interface_alchemist_1.default.self.btn_Bet.node.active = true;
            _this.Spin.node.active = true;
            if (0 != UI_interface_alchemist_1.default.self.LoopTimes) {
              var _decreasevalue = UI_interface_alchemist_1.default.self.LoopTimes > 0 && -1 != UI_interface_alchemist_1.default.self.LoopTimes ? 1 : 0;
              UI_interface_alchemist_1.default.self.LoopTimes -= _decreasevalue;
              UI_interface_alchemist_1.default.self.Update_UI();
              _this.commonGameBarManager.updateAutoTimes(GameManager_alchemist_1.GM.userUI.LoopTimes);
              _this.saveGameResult = [];
            }
            if (_this.saveGameResult.length > 0) {
              _this.congratulateTips.string = CongratulateEnum_alchemist.OFF;
              _this.userUI.top_infobar.children.forEach(function(child) {
                child.active = true;
                child.children.forEach(function(Layer2Child) {
                  Layer2Child.active = true;
                });
              });
              _this.opencounter();
            } else true == _this.UI_Score.node.parent.active && (_this.congratulateTips.string = "");
            _this.commonGameBarManager.setBtnState(0);
          }
        });
        this.Spin.node.on("click", function() {
          if (false == _this.isWindowFocus) {
            AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME);
            _this.isWindowFocus = true;
          }
          if (GameServer_alchemist_1.default.self.TotalBet > GameServer_alchemist_1.default.self.UserCredit) {
            _this.Msg_notEnoughBalance(_this.userUI.language_assets["InsufficientCredit"]);
            return;
          }
          _this.commonGameBarManager.setBtnState(1);
          _this.userUI.btn_Stop.node.active = true;
          _this.Spin.node.active = false;
          _this.userUI.btn_Auto.node.active = false;
          _this.userUI.btn_Bet.node.active = false;
          cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP);
          if (_this.ServerPortocolMgr.offline) {
            var result = _this.offlineResultIdx % _this.ServerPortocolMgr.DemoResult.length;
            GameServer_alchemist_1.default.self.SetResult(_this.ServerPortocolMgr.DemoResult[result]);
            _this.offlineResultIdx++;
          } else {
            _this.ServerPortocolMgr.send("CSCheckCanBet", {
              isBuyFreeGame: false
            });
            GameManager_alchemist_1.GM.RecordFlag = true;
            GameManager_alchemist_1.GM.showRecordTime("SendCheckCanbet");
          }
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.onSpin();
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.Stoped, function() {
          cc.log("GameState->StopEnd");
          if (false == _this.isRollerStoped) return;
          GameManager_alchemist_1.GM.Instance_WheelManager.anim_rollers.forEach(function(roller) {
            roller.children.forEach(function(child) {
              child.active = false;
            });
          });
          GameManager_alchemist_1.GM.GameState = EventSystem_alchemist_1.EventType_alchemist.Stoped;
          GameManager_alchemist_1.GM.hasResult = false;
          var RewardDatas = _this.Instance_WheelManager.PayLineChecker();
          _this.Instance_WheelManager.ShowAllPayLine(RewardDatas);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.onEnterFreeGame, function() {
          _this.GameState = EventSystem_alchemist_1.EventType_alchemist.onEnterFreeGame;
          _this.FreeGameleftTime.active = true;
          _this.isFreeGameState = true;
          _this.Instance_WheelManager.resetStopPara();
          _this.FreeGameCutScene.active = true;
          var BG_Switch = function() {
            _this.FreeGameBG.node.active = true;
            _this.MainGameBG.node.active = false;
            _this.FreeGameBG.setAnimation(0, BackgroundSpineEnum_alchemist.Bonus_Idle, true);
            AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.FREEGAME);
            _this.Wild_accumulated.DisplayUI(true);
          };
          var OutroSetting = function() {
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Flash_to_FG);
            _this.scheduleOnce(function() {
              _this.StartFreeGame();
            }, .7);
            introSpine.setCompleteListener(null);
          };
          _this.EnterFreeGame.active = true;
          var introSpine = _this.EnterFreeGame.getChildByName("BonusGame_Pop_up").getComponent(sp.Skeleton);
          var animActionName = [ "animation" ];
          introSpine.setAnimation(0, animActionName[0], false);
          BG_Switch();
          introSpine.setCompleteListener(OutroSetting);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.FreeGameState, function() {
          GameManager_alchemist_1.GM.GameState = EventSystem_alchemist_1.EventType_alchemist.FreeGameState;
          cc.log("GameState->FreeGameState");
          _this.FreeGameTimesUpdate();
          _this.scheduleOnce(function() {
            _this.FreeSpin();
          }, 1);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.FreeGameEnd, function() {
          var lbl_score = _this.EndFreeGame.getChildByName("Congratulation_PopUp").getChildByName("Result").getComponent(cc.Label);
          lbl_score.node.active = false;
          _this.FreeGameleftTime.active = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.FreeGameResult);
          GameServer_alchemist_1.default.self.ServerDataIndex = 0;
          _this.Wild_Collection = 0;
          _this.saveGameResult = [];
          _this.scheduleOnce(function() {
            lbl_score.node.active = true;
            lbl_score.string = GameManager_alchemist_1.toStringThousandth(GameServer_alchemist_1.default.self.ServerData.data.TotalWin);
            CommonGameBarUtils_alchemist_1.default.NumberRunner(lbl_score, 0, GameServer_alchemist_1.default.self.ServerData.data.TotalWin, 3.8, 0);
          }, .4);
          var animCutSceneOut = _this.EndFreeGame.getChildByName("Congratulation_PopUp").getComponent(sp.Skeleton);
          var animName = [ "in", "Loop" ];
          GameManager_alchemist_1.ResetAllSymbolAction();
          _this.EndFreeGame.active = true;
          _this.FreeGameLastRound = false;
          animCutSceneOut.setAnimation(0, animName[0], false);
          animCutSceneOut.addAnimation(0, animName[1], true);
          var BG_Switch = function() {
            _this.MainGameBG.node.active = true;
            _this.FreeGameBG.node.active = false;
            _this.set_BG(BackgroundSpineEnum_alchemist.MG_Idle);
            AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME);
            _this.Wild_accumulated.DisplayUI(false);
          };
          var OutroSetting = function() {
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Flash_to_FG);
            _this.scheduleOnce(BG_Switch, .7);
            _this.isFreeGameState = false;
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
            _this.scheduleOnce(function() {
              GameManager_alchemist_1.GM.hasFreeGameFlag = false;
              _this.BackToNormalCheckMystery();
            }, .1);
            _this.EndFreeGame.active = false;
            animCutSceneOut.setCompleteListener(null);
          };
          false == UI_interface_alchemist_1.default.self.AutoSetting.isBonusContinue ? _this.scheduleOnce(function() {
            _this.EndFreeGame.on("click", function() {
              _this.EndFreeGame.off("click");
              lbl_score.node.active = false;
              OutroSetting();
            });
          }, 1) : _this.scheduleOnce(OutroSetting, 3);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.CheckBigWin, function() {
          _this.BigWinCheck();
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.BigWinShowEnd, function() {
          _this.isFreeGameState ? EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.FreeGameState) : _this.scheduleOnce(function() {
            AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME, true);
            _this.BackToNormalCheckMystery();
          }, .1);
        });
      };
      GameManager_alchemist.prototype.BackToNormalCheckMystery = function() {
        var _this = this;
        this.hasFreeGameFlag || this.BonusFlag ? this.scheduleOnce(function() {
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.BackToNormal);
        }, .1) : EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.hasMystery);
      };
      GameManager_alchemist.prototype.FreeSpin = function() {
        if (this.FreeGameTimes - 1 > -1) {
          this.FreeGameTimes -= 1;
          var lbl_freetimeleft = this.userUI.top_infobar.getChildByName("lbl_FreeSpinLeft").getComponent(cc.Label);
          lbl_freetimeleft.string = "FREE SPIN LEFT " + this.FreeGameTimes.toString();
          GameManager_alchemist_1.GM.hasResult = true;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_START);
          this.isRollerStoped = false;
          this.saveGameResult = [];
          GameManager_alchemist_1.ResetAllSymbolAction();
          this.userUI.btn_Stop.node.active = true;
          this.Spin.node.active = false;
          this.GameState = EventSystem_alchemist_1.EventType_alchemist.Running;
          GameServer_alchemist_1.default.self.ServerDataIndex += 1;
          var speed = .033332;
          for (var i = 0; i < 5; i++) this.Instance_WheelManager.Rollers[i].TurnWheel(this.Instance_WheelManager.Rollers[i].node, speed, i);
          cc.log("\u514d\u8cbb\u904a\u6232\u6b21\u6578\u5269\u9918\uff1a" + this.FreeGameTimes);
        } else EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.FreeGameEnd);
      };
      GameManager_alchemist.prototype.StartFreeGame = function() {
        this.EnterFreeGame.active = false;
        this.FreeSpin();
      };
      GameManager_alchemist.prototype.FreeGameTimesUpdate = function() {
        this.FreeGameleftTime.getChildByName("times").getComponent(cc.Label).string = this.FreeGameTimes.toString();
      };
      GameManager_alchemist.prototype.Msg_notEnoughBalance = function(message) {
        var btnOK_1 = this.Instance_MessageBox.getChildByName("ok");
        btnOK_1.active = false;
        this.Instance_MessageBox.active = true;
        this.Instance_MessageBox.getChildByName("exit_lbl").getComponent(cc.Label).string = message;
        UI_interface_alchemist_1.default.self.ResetPlayerSetting();
        cc.log("%c\u9918\u984d\u4e0d\u8db3", "color:#FF4D00; font-weight:bold;");
        this.scheduleOnce(function() {
          btnOK_1.active = true;
        }, 1);
        return;
      };
      GameManager_alchemist.prototype.Msg_Disconnect = function(message) {
        this.Instance_MessageBox.active = true;
        this.Instance_MessageBox.getChildByName("exit_lbl").getComponent(cc.Label).string = message;
        this.Instance_MessageBox.getChildByName("ok").active = false;
        this.Instance_MessageBox.getChildByName("cancle").active = false;
        return;
      };
      GameManager_alchemist.prototype.onSpin = function() {
        var _this = this;
        this.closecounter();
        this.isRollerStoped = false;
        this.userUI.btn_Stop.node.active = true;
        this.saveGameResult = [];
        GameManager_alchemist_1.ResetAllSymbolAction();
        if (!this.isFreeGameState && GameServer_alchemist_1.default.self.UserCredit < GameServer_alchemist_1.default.self.getTotalBet()) {
          this.Instance_MessageBox.parent.active = true;
          UI_interface_alchemist_1.default.self.ResetPlayerSetting();
          cc.log("%c\u9918\u984d\u4e0d\u8db3", "color:#FF4D00; font-weight:bold;");
          return;
        }
        if (!this.isFreeGameState) {
          this.clearScore();
          this.congratulateTips.string = this.userUI.message_GoodLuck;
          if (this.BuyFreeGameFlag) {
            GameServer_alchemist_1.default.self.UserCredit -= 100 * GameServer_alchemist_1.default.self.getTotalBet();
            this.BuyFreeGameFlag = false;
          } else GameServer_alchemist_1.default.self.UserCredit -= GameServer_alchemist_1.default.self.getTotalBet();
        }
        this.Spin.node.active = false;
        EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.Running);
        this.GameState = EventSystem_alchemist_1.EventType_alchemist.Running;
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_START);
        var speed = .033332;
        this.scheduleOnce(function() {
          for (var i = 0; i < 5; i++) _this.Instance_WheelManager.Rollers[i].TurnWheel(_this.Instance_WheelManager.Rollers[i].node, speed, i);
        }, .15);
      };
      GameManager_alchemist.prototype.SaveGameResultData = function(_RewardDatas) {
        this.saveGameResult = _RewardDatas;
      };
      GameManager_alchemist.ResetAllSymbolAction = function() {
        GameManager_alchemist_1.GM.WinScoreBG_Hori.node.active = false;
        GameManager_alchemist_1.GM.WinScoreBG_Verti.node.active = false;
        GameManager_alchemist_1.GM.UI_roundScore.node.opacity = 0;
        GameManager_alchemist_1.GM.RewardMarqueen.initcounter();
        GameManager_alchemist_1.GM.saveGameResult = [];
        GameManager_alchemist_1.GM.RewardMarqueen.EnableDisplay(false);
        var effectChild = GameManager_alchemist_1.GM.Instance_WheelManager.node.getChildByName("EffectSymbol_Sprite").children;
        for (var i = 0; i < 5; i++) for (var j = 1; j < 4; j++) effectChild[i].children[j].opacity = 255;
        GameManager_alchemist_1.GM.Instance_WheelManager.PayLineDatas.forEach(function(Data) {
          Data.LineNodes.forEach(function(node) {
            node.opacity = 255;
            node.scale = 1;
          });
        });
        GameManager_alchemist_1.GM.Instance_WheelManager.node.getChildByName("Mask").opacity = 255;
        GameManager_alchemist_1.GM.Instance_WheelManager.PayLine_Lines_DisableAll();
        GameManager_alchemist_1.GM.Instance_WheelManager.PayLineDatas.forEach(function(LineData) {
          LineData.LineNodes.forEach(function(ball) {
            ball.stopAllActions();
            ball.active = true;
          });
        });
        GameManager_alchemist_1.GM.userUI.top_infobar.children[0].children.forEach(function(child) {
          child.active = false;
        });
        GameManager_alchemist_1.GM.Instance_WheelManager.PayLineDatas.forEach(function(Data) {
          Data.LineEffects.forEach(function(effect) {
            effect.node.active = false;
          });
        });
      };
      GameManager_alchemist.prototype.setScore = function(score, shouldUpdateCredit) {
        void 0 === shouldUpdateCredit && (shouldUpdateCredit = true);
        console.log("score   ", score);
        this.UI_Score.node.parent.active = true;
        this.saveGameScore += score;
        shouldUpdateCredit && (GameServer_alchemist_1.default.self.UserCredit += score);
        this.UI_Score.string = "<color=#F5AF32>" + this.userUI.message_TOTALWIN + "</c><color=#919191> " + GameManager_alchemist_1.toStringThousandth(this.saveGameScore);
        this.commonGameBarManager.updateWinLabel(this.saveGameScore);
      };
      GameManager_alchemist.prototype.setRoundScore = function(score) {
        if (0 != score && this.isFreeGameState) {
          this.UI_roundScore.node.opacity = 255;
          this.UI_roundScore.string = "<color=#F5AF32>" + UI_interface_alchemist_1.default.self.message_WIN + "</c><color=#919191> " + GameManager_alchemist_1.toStringThousandth(score);
        }
      };
      GameManager_alchemist.prototype.clearScore = function() {
        this.UI_Score.node.parent.active = false;
        this.saveGameScore = 0;
        this.UI_Score.string = "0";
        this.saveBetReward = 0;
        this.commonGameBarManager.updateWinLabel(0);
      };
      GameManager_alchemist.prototype.hasBigWin = function() {
        var roundScore = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["TotalWin"];
        for (var idx = this.big_win_Node.m_BigWinLevel.length - 1; idx >= 0; idx--) if (roundScore >= GameServer_alchemist_1.default.self.getTotalBet() * this.big_win_Node.m_BigWinLevel[idx]) return true;
      };
      GameManager_alchemist.prototype.BigWinCheck = function() {
        var _this = this;
        if (!this.hasBigWin() || this.isFreeGameState || this.FreeGameLastRound) if (this.FreeGameLastRound) {
          this.big_win_Node.BigWinAniShow(GameServer_alchemist_1.default.self.ServerData.data.TotalWin);
          this.isBigWin = true;
          this.bigWinBG.active = true;
          this.BigWinMusicInit = true;
          this.touch_Block.enabled = true;
        } else if (this.isFreeGameState) {
          var hasPlus = this.Instance_WheelManager.FreeGameCheckTimePlus();
          console.log(GameServer_alchemist_1.default.self.ServerResult.length - 2 + " / " + GameServer_alchemist_1.default.self.ServerDataIndex);
          GameServer_alchemist_1.default.self.ServerResult.length - 2 == GameServer_alchemist_1.default.self.ServerDataIndex && (this.FreeGameLastRound = true);
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.FreeGameState);
        } else this.scheduleOnce(function() {
          _this.BackToNormalCheckMystery();
        }, .1); else {
          this.big_win_Node.BigWinAniShow(GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["TotalWin"]);
          this.isBigWin = true;
          this.bigWinBG.active = true;
          this.BigWinMusicInit = true;
          this.touch_Block.enabled = true;
        }
      };
      GameManager_alchemist.prototype.resetcounter = function() {
        this.m_timeCounter = 0;
        this.m_showindex = 0;
      };
      GameManager_alchemist.prototype.opencounter = function() {
        this.resetcounter();
        this.m_PaylineTriger = true;
        this.m_changetriger = true;
      };
      GameManager_alchemist.prototype.closecounter = function() {
        this.resetcounter();
        this.m_PaylineTriger = false;
        this.m_changetriger = false;
      };
      GameManager_alchemist.prototype.showRecordTime = function(msg) {
        console.log("2023/04/17 " + msg + "=> " + this.RecordTime + " ");
      };
      GameManager_alchemist.prototype.update = function(dt) {
        this.RecordFlag && (this.RecordTime += dt);
        if (this.isBigWin) {
          this.f = true;
          this.big_win_Node.BigWinCountUpdate(dt);
        }
      };
      GameManager_alchemist.prototype.DetectScreenSize = function() {
        var result = "";
        result = GameScreenLayout_alchemist.Horizontal;
        result != this.currentGameScreenLayout && this.ChangeScreenSize(result);
      };
      GameManager_alchemist.prototype.ChangeScreenSize = function(layout) {
        if (layout == GameScreenLayout_alchemist.Horizontal) {
          cc.Canvas.instance.designResolution = new cc.Size(1334, 750);
          cc.Canvas.instance.fitWidth = true;
          cc.Canvas.instance.fitHeight = true;
          cc.find("Canvas/Mask").setContentSize(1334, 750);
          this.currentGameScreenLayout = layout;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.ScreenChange, this.currentGameScreenLayout);
          this.MainGameBG.skeletonData = this.GameMGBG_spines[0];
          this.FreeGameBG.skeletonData = this.GameFGBG_spines[0];
          this.set_BG(this.currentBG);
          this.Effect_FreeGameCutScene.node.rotation = 0;
          this.WinScoreBG_Hori.node.opacity = 255;
          this.WinScoreBG_Verti.node.opacity = 0;
        } else if (layout == GameScreenLayout_alchemist.Vertical) {
          this.Effect_FreeGameCutScene.node.rotation = 90;
          cc.Canvas.instance.designResolution = new cc.Size(750, 1334);
          cc.find("Canvas/Mask").setContentSize(750, 1334);
          cc.Canvas.instance.fitWidth = true;
          cc.Canvas.instance.fitHeight = true;
          this.currentGameScreenLayout = layout;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.ScreenChange, this.currentGameScreenLayout);
          this.MainGameBG.skeletonData = this.GameMGBG_spines[1];
          this.FreeGameBG.skeletonData = this.GameFGBG_spines[1];
          this.set_BG(this.currentBG);
          this.WinScoreBG_Hori.node.opacity = 0;
          this.WinScoreBG_Verti.node.opacity = 255;
        } else this.DetectScreenSize();
      };
      GameManager_alchemist.prototype.lateUpdate = function() {
        if (this.isGameReady) {
          this.DetectScreenSize();
          this.Credit.string = "" + CocosUtil_alchemist_1.CocosUtil_alchemist.toPrecisionStr(GameServer_alchemist_1.default.self.UserCredit, 2);
          this.commonGameBarManager.updateBalanceLabel(GameServer_alchemist_1.default.self.UserCredit);
        }
      };
      GameManager_alchemist.toStringThousandth = function(value) {
        return GameServer_alchemist_1.default.self.getTotalBet() >= 100 ? CocosUtil_alchemist_1.CocosUtil_alchemist.toPrecisionStr(value, 0) : CocosUtil_alchemist_1.CocosUtil_alchemist.toPrecisionStr(value, 2);
      };
      GameManager_alchemist.prototype.ScatterReward = function() {
        var _this = this;
        GameManager_alchemist_1.ResetAllSymbolAction();
        var MainResult_symbolList = GameServer_alchemist_1.default.self.ServerResult[0]["betNumber"];
        MainResult_symbolList.forEach(function(symbol_id, idx) {
          if (symbol_id == Roller_alchemist_1.Symbol_ID.Scatter) {
            _this.Instance_WheelManager.symbol_spineComponet_FormatToServerResult[idx].node.active = true;
            _this.Instance_WheelManager.symbol_spineComponet_FormatToServerResult[idx].node.opacity = 255;
            _this.Instance_WheelManager.symbol_spineComponet_FormatToServerResult[idx].skeletonData = _this.Instance_WheelManager.SpineDatas[Roller_alchemist_1.Symbol_ID.Scatter];
            _this.Instance_WheelManager.symbol_spineComponet_FormatToServerResult[idx].setAnimation(0, "Win", false);
          }
        });
      };
      GameManager_alchemist.prototype.SendCheckcoin = function() {};
      GameManager_alchemist.prototype.SendCheckcoinType2 = function() {};
      GameManager_alchemist.prototype.set_BG = function(animName, isloop) {
        void 0 === isloop && (isloop = true);
        switch (animName) {
         case BackgroundSpineEnum_alchemist.MG_Idle:
         case BackgroundSpineEnum_alchemist.Bonus_Idle:
          this.MainGameBG.setAnimation(0, animName, isloop);
        }
        this.currentBG = animName;
      };
      GameManager_alchemist.prototype.anim_WinScore = function(swtich) {
        GameManager_alchemist_1.GM.WinScoreBG_Hori.node.active = swtich;
        GameManager_alchemist_1.GM.WinScoreBG_Verti.node.active = swtich;
      };
      var GameManager_alchemist_1;
      GameManager_alchemist.GM = null;
      __decorate([ property(Wildaccumulated_alchemist_1.default) ], GameManager_alchemist.prototype, "Wild_accumulated", void 0);
      __decorate([ property(GameManager_alchemist_1) ], GameManager_alchemist.prototype, "_gm", void 0);
      __decorate([ property(CommonGameBarManager_alchemist_1.default) ], GameManager_alchemist.prototype, "commonGameBarManager", void 0);
      __decorate([ property(ServerPortocolManager_alchemist_1.default) ], GameManager_alchemist.prototype, "ServerPortocolMgr", void 0);
      __decorate([ property(WheelManager_alchemist_1.default) ], GameManager_alchemist.prototype, "Instance_WheelManager", void 0);
      __decorate([ property(BonusManager_alchemist_1.default) ], GameManager_alchemist.prototype, "Instance_BonusManager", void 0);
      __decorate([ property(UI_interface_alchemist_1.default) ], GameManager_alchemist.prototype, "userUI", void 0);
      __decorate([ property(LoadingPage_ViewController_alchemist_1.default) ], GameManager_alchemist.prototype, "LoadingPage", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "big_win_Node", void 0);
      __decorate([ property(cc.BlockInputEvents) ], GameManager_alchemist.prototype, "touch_Block", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "Instance_MessageBox", void 0);
      __decorate([ property(cc.Button) ], GameManager_alchemist.prototype, "Spin", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "Loading_Black", void 0);
      __decorate([ property(cc.RichText) ], GameManager_alchemist.prototype, "UI_Score", void 0);
      __decorate([ property(cc.RichText) ], GameManager_alchemist.prototype, "UI_roundScore", void 0);
      __decorate([ property(cc.Label) ], GameManager_alchemist.prototype, "TotalBet", void 0);
      __decorate([ property(cc.Label) ], GameManager_alchemist.prototype, "Credit", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "FreeGameCutScene", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "EnterFreeGame", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "FreeGameleftTime", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "EndFreeGame", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "BonusCutSceneIn", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "BonusCutSceneOut", void 0);
      __decorate([ property(cc.Node) ], GameManager_alchemist.prototype, "bigWinBG", void 0);
      __decorate([ property([ sp.SkeletonData ]) ], GameManager_alchemist.prototype, "GameMGBG_spines", void 0);
      __decorate([ property([ sp.SkeletonData ]) ], GameManager_alchemist.prototype, "GameFGBG_spines", void 0);
      __decorate([ property(cc.Label) ], GameManager_alchemist.prototype, "congratulateTips", void 0);
      __decorate([ property(sp.Skeleton) ], GameManager_alchemist.prototype, "Effect_FreeGameCutScene", void 0);
      __decorate([ property(sp.Skeleton) ], GameManager_alchemist.prototype, "WinScoreBG_Hori", void 0);
      __decorate([ property(sp.Skeleton) ], GameManager_alchemist.prototype, "WinScoreBG_Verti", void 0);
      GameManager_alchemist = GameManager_alchemist_1 = __decorate([ ccclass ], GameManager_alchemist);
      return GameManager_alchemist;
    }(cc.Component);
    exports.default = GameManager_alchemist;
    cc._RF.pop();
  }, {
    "../alchemist/Hierachy/CocosUtil_alchemist": "CocosUtil_alchemist",
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./BigWinManager_alchemist": "BigWinManager_alchemist",
    "./BonusManager_alchemist": "BonusManager_alchemist",
    "./CommonGameBar/CommonGameBarManager_alchemist": "CommonGameBarManager_alchemist",
    "./CommonGameBar/CommonGameBarUtils_alchemist": "CommonGameBarUtils_alchemist",
    "./CommonUI/LoadingPage_ViewController_alchemist": "LoadingPage_ViewController_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist",
    "./RewardMarqueen_alchemist": "RewardMarqueen_alchemist",
    "./Roller_alchemist": "Roller_alchemist",
    "./ServerPortocolManager_alchemist": "ServerPortocolManager_alchemist",
    "./UI/UI_interface_alchemist": "UI_interface_alchemist",
    "./WheelManager_alchemist": "WheelManager_alchemist",
    "./Wildaccumulated_alchemist": "Wildaccumulated_alchemist"
  } ],
  GameServer_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9e873a5JaFAv5k9qgEopOHS", "GameServer_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var CommonGameBarData_alchemist_1 = require("../CommonGameBar/CommonGameBarData_alchemist");
    var CommonGameBarManager_alchemist_1 = require("../CommonGameBar/CommonGameBarManager_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var Roller_alchemist_1 = require("../Roller_alchemist");
    var ServerDataFormat_alchemist_1 = require("../ServerDataFormat_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameServer_alchemist = function() {
      function GameServer_alchemist() {
        var _this = this;
        this.Bet_list = [];
        this.BetIdx = 0;
        this.GameLine = 50;
        this.UserCredit = 1e3;
        this.TotalBet = 1;
        this.ServerResult = [];
        this.ServerDataIndex = 0;
        this.ServerData = null;
        this._BuyFreeGamePay = 1;
        this._PlayerData = null;
        this.setCallBack_AutoTimeSetting = function(autoTimes) {
          console.log("\u81ea\u52d5\u6b21\u6578: " + autoTimes);
          GameManager_alchemist_1.default.GM.userUI.LoopTimes = autoTimes;
        };
        this.setCallBack_BetSetting = function(betIndex) {
          console.log("\u4e0b\u6ce8\u4ee3\u865f: " + betIndex);
          _this.setBet(betIndex);
        };
        this.setCallBack_ClickSpinBtnAction = function(isAuto) {
          if (GameManager_alchemist_1.default.GM.GameState == EventSystem_alchemist_1.EventType_alchemist.Normal) {
            GameManager_alchemist_1.default.GM.Spin.node.emit("click");
            isAuto ? GameManager_alchemist_1.default.GM.commonGameBarManager.setBtnState(2) : GameManager_alchemist_1.default.GM.commonGameBarManager.setBtnState(1);
          } else GameManager_alchemist_1.default.GM.userUI.btn_Stop.node.emit("click");
        };
        this.setCallBack_Turbo = function(isTurbo) {
          GameManager_alchemist_1.default.GM.userUI.QuickSpinFlag = isTurbo;
        };
        this.setCallBack_Audio = function(Audio) {
          var value = Audio ? 1 : 0;
          AudioManager_alchemist_1.AudioManager_alchemist.setMusicVolume(value);
          AudioManager_alchemist_1.AudioManager_alchemist.setSoundVolume(value);
        };
      }
      GameServer_alchemist.prototype.SetResult = function(Sdata) {
        this.ServerData = new ServerDataFormat_alchemist_1.default();
        this.ServerData.setData(Sdata);
        this.ServerDataIndex = 0;
        this.ServerResult = [];
        var ResultList = [];
        cc.log("%c[" + JSON.stringify(this.ServerData.data) + "]", "color:#FF4D00;");
        ResultList.push(Sdata.MainResult);
        for (var i = 0; i < Object.keys(Sdata.FreeResult).length; i++) ResultList[i + 1] = this.ServerData.data.FreeResult[i];
        Object.keys(Sdata.FreeResult).length > 0 && (GameManager_alchemist_1.default.GM.hasFreeGameFlag = true);
        GameManager_alchemist_1.default.GM.hasResult = true;
        this.ServerResult = ResultList;
        this.checkFreeGameTimes(Sdata);
      };
      GameServer_alchemist.prototype.checkFreeGameTimes = function(Sdata) {
        var count = 0;
        Object.values(Sdata.MainResult.betNumber).forEach(function(symbol) {
          symbol == Roller_alchemist_1.Symbol_ID.Scatter && (count += 1);
        });
        switch (count) {
         case 3:
          GameManager_alchemist_1.default.GM.FreeGameTimes += 10;
          break;

         case 4:
          GameManager_alchemist_1.default.GM.FreeGameTimes += 25;
          break;

         case 5:
          GameManager_alchemist_1.default.GM.FreeGameTimes += 50;
        }
      };
      Object.defineProperty(GameServer_alchemist.prototype, "BuyFreeGamePay", {
        get: function() {
          return this._BuyFreeGamePay;
        },
        set: function(v) {
          this._BuyFreeGamePay = v;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(GameServer_alchemist.prototype, "PlayerData", {
        get: function() {
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.offline && null == this._PlayerData && (this._PlayerData = {
            playerMoney: 1e6,
            totalbet: 5e4,
            RewardLine: [ [ 1, 1, 0, 0, 0, .4 ], [ 1, 1, 1, 0, 0, 1 ], [ 1, 1, 1, 1, 0, 2 ], [ 1, 1, 1, 1, 1, 5 ], [ 2, 2, 2, 0, 0, .7 ], [ 2, 2, 2, 2, 0, 1.5 ], [ 2, 2, 2, 2, 2, 2.5 ], [ 3, 3, 3, 0, 0, .7 ], [ 3, 3, 3, 3, 0, 1.5 ], [ 3, 3, 3, 3, 3, 2.5 ], [ 4, 4, 4, 0, 0, .7 ], [ 4, 4, 4, 4, 0, 1.5 ], [ 4, 4, 4, 4, 4, 2.5 ], [ 5, 5, 5, 0, 0, .5 ], [ 5, 5, 5, 5, 0, 1 ], [ 5, 5, 5, 5, 5, 1.5 ], [ 6, 6, 6, 0, 0, .4 ], [ 6, 6, 6, 6, 0, .9 ], [ 6, 6, 6, 6, 6, 1.4 ], [ 7, 7, 7, 0, 0, .3 ], [ 7, 7, 7, 7, 0, .8 ], [ 7, 7, 7, 7, 7, 1.3 ], [ 8, 8, 8, 0, 0, .2 ], [ 8, 8, 8, 8, 0, .7 ], [ 8, 8, 8, 8, 8, 1.2 ], [ 9, 9, 9, 0, 0, .1 ], [ 9, 9, 9, 9, 0, .6 ], [ 9, 9, 9, 9, 9, 1.1 ] ],
            lineMethod: 1,
            betLadder: [ 5e4, 1e5, 15e4, 2e5, 25e4, 3e5, 35e4, 4e5, 45e4, 5e5, 55e4, 6e5, 65e4, 7e5, 75e4, 8e5, 85e4, 9e5, 95e4, 1e6 ],
            OddsTab: [ [ 0, .4, 1, 2, 5 ], [ 0, 0, .7, 1.5, 2.5 ], [ 0, 0, .7, 1.5, 2.5 ], [ 0, 0, .7, 1.5, 2.5 ], [ 0, 0, .5, 1, 1.5 ], [ 0, 0, .4, .9, 1.4 ], [ 0, 0, .3, .8, 1.3 ], [ 0, 0, .2, .7, 1.2 ], [ 0, 0, .1, .6, 1.1 ], [ 0, 1, 5, 25, 100 ] ],
            checkRow: [ [ 0, 0, 0, 0, 0 ], [ -1, -1, -1, -1, -1 ], [ 1, 1, 1, 1, 1 ], [ -1, 0, 1, 0, -1 ], [ 1, 0, -1, 0, 1 ], [ 0, -1, -1, -1, 0 ], [ 0, 1, 1, 1, 0 ], [ -1, -1, 0, 1, 1 ], [ 1, 1, 0, -1, -1 ], [ 0, -1, 0, 1, 0 ], [ 0, 1, 0, -1, 0 ], [ -1, 0, 0, 0, -1 ], [ 1, 0, 0, 0, 1 ], [ -1, 0, -1, 0, -1 ], [ 1, 0, 1, 0, 1 ], [ 0, 0, -1, 0, 0 ], [ 0, 0, 1, 0, 0 ], [ -1, -1, 1, -1, -1 ], [ 1, 1, -1, 1, 1 ], [ -1, 1, 1, 1, -1 ], [ 1, -1, -1, -1, 1 ], [ 0, -1, 1, -1, 0 ], [ 0, 1, -1, 1, 0 ], [ -1, 1, -1, 1, -1 ], [ 1, -1, 1, -1, 1 ], [ 0, 1, 0, -1, -1 ], [ 0, -1, 0, 1, 1 ], [ -1, 0, 1, 1, 1 ], [ 1, 0, -1, -1, -1 ], [ -1, -1, -1, 0, 1 ], [ 1, 1, 1, 0, -1 ], [ 0, -1, 0, -1, 0 ], [ 0, 1, 0, 1, 0 ], [ -1, 0, 0, 0, 0 ], [ 1, 0, 0, 0, 0 ], [ -1, -1, 0, 0, 0 ], [ 1, 1, 0, 0, 0 ], [ 1, 0, 1, 0, -1 ], [ -1, 0, -1, 0, 1 ], [ 0, -1, -1, -1, -1 ], [ 0, 1, 1, 1, 1 ], [ -1, -1, -1, 0, -1 ], [ 1, 1, 1, 0, 1 ], [ -1, 0, -1, -1, -1 ], [ 1, 0, 1, 1, 1 ], [ 0, -1, 0, 0, 0 ], [ 0, 1, 0, 0, 0 ], [ -1, -1, -1, -1, 1 ], [ 1, 1, 1, 1, -1 ], [ 0, 0, 0, -1, 0 ] ],
            betLadders: 41,
            language: "en-US",
            currency: "$",
            BackButtonURL: "",
            HistoryURL: "",
            ReLoginURL: "",
            player: "77n9926C",
            gameId: "1651647865",
            BuyFreeGamePay: 1,
            sign: "de8bbf3daf826a2310bfacd93a5388e6",
            MysteryBonus: false,
            MysteryBonusInfo: "",
            MysteryBonusImg: []
          });
          return this._PlayerData;
        },
        set: function(v) {
          this._PlayerData = v;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(GameManager_alchemist_1.default.GM.node, EventSystem_alchemist_1.EventType_alchemist.Gameinit);
        },
        enumerable: false,
        configurable: true
      });
      GameServer_alchemist.prototype.setTotalBet = function(ctx) {
        this.BetIdx = ctx.currentIdx;
        this.TotalBet = ctx.currentTotalBet;
        GameManager_alchemist_1.default.GM.TotalBet.string = GameManager_alchemist_1.default.toStringThousandth(this.TotalBet);
      };
      GameServer_alchemist.prototype.hasFreeGameResult = function() {
        return Object.keys(this.ServerResult).length > 0;
      };
      GameServer_alchemist.prototype.getTotalBet = function() {
        return this.TotalBet;
      };
      GameServer_alchemist.prototype.getLineBet = function() {
        return this.TotalBet / 50;
      };
      GameServer_alchemist.prototype.addBet = function() {
        if (GameManager_alchemist_1.default.GM.ServerPortocolMgr.offline) ; else {
          this.BetIdx += 1;
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSSetTotalBet", {
            betIndex: this.BetIdx
          });
        }
      };
      GameServer_alchemist.prototype.subBet = function() {
        if (GameManager_alchemist_1.default.GM.ServerPortocolMgr.offline) ; else {
          this.BetIdx -= 1;
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSSetTotalBet", {
            betIndex: this.BetIdx
          });
        }
      };
      GameServer_alchemist.prototype.setBet = function(idxValue) {
        this.BetIdx = idxValue;
        GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSSetTotalBet", {
          betIndex: this.BetIdx
        });
      };
      GameServer_alchemist.prototype.updateCredit = function() {
        GameManager_alchemist_1.default.GM.SendCheckcoin();
      };
      GameServer_alchemist.prototype.PlayerSetting = function(playerData) {
        this.UserCredit = playerData.playerMoney;
        this.Bet_list = playerData.betLadder;
        this.TotalBet = this.Bet_list[0];
        this.BuyFreeGamePay = playerData.BuyFreeGamePay;
        var cbs = new CommonGameBarData_alchemist_1.CommonGameBarCallBack_alchemist(this.setCallBack_BetSetting, this.setCallBack_ClickSpinBtnAction, this.setCallBack_AutoTimeSetting, this.setCallBack_Turbo, this.setCallBack_Audio, function() {
          console.log("\u9ede\u64ca\u56de\u9996\u9801");
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.socket.close();
        });
        var payTable = new CommonGameBarData_alchemist_1.CommonGameBarPayTableInfo_alchemist(new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 500, 300, 100 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 300, 100, 50 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 100, 50, 30 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 50, 30, 10 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 30, 10, 5 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 10, 5, 3 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 5, 3, 2 ]), new CommonGameBarData_alchemist_1.CommonGameBarSymbolInfo_alchemist([ 5, 4, 3 ], [ 3, 2, 1 ]));
        var data = new CommonGameBarData_alchemist_1.CommonGameBarData_alchemist(this.UserCredit, this.Bet_list, 0, [ 10, 20, 30, 40, -1 ], "USD", false, cbs, payTable);
        GameManager_alchemist_1.default.GM.commonGameBarManager = cc.find("Canvas/Mask/SoftStarCommonGameBarUI").getComponent(CommonGameBarManager_alchemist_1.default);
        GameManager_alchemist_1.default.GM.commonGameBarManager.init(data);
        GameManager_alchemist_1.default.GM.ServerPortocolMgr.language = "zh-CHT";
        var bundle = cc.assetManager.getBundle("alchemist");
        bundle.load(GameManager_alchemist_1.default.GM.ServerPortocolMgr.language, function(err, language) {
          err && console.warn("language Loading Failed " + err);
          GameManager_alchemist_1.default.GM.userUI.language_assets = language.json;
          GameManager_alchemist_1.default.GM.userUI.SetLanguage();
        });
        var languageList = [ "zh-CHT", "zh-CHS", "id-ID", "th-TH", "vi-VN", "ms-MY", "en-US", "ko-KR", "pt-BR" ];
        GameManager_alchemist_1.default.GM.GameReady = true;
        EventSystem_alchemist_1.EventSystem_alchemist.emit(GameManager_alchemist_1.default.GM.node, EventSystem_alchemist_1.EventType_alchemist.clientReady);
      };
      GameServer_alchemist.self = null;
      GameServer_alchemist = __decorate([ ccclass ], GameServer_alchemist);
      return GameServer_alchemist;
    }();
    exports.default = GameServer_alchemist;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../CommonGameBar/CommonGameBarData_alchemist": "CommonGameBarData_alchemist",
    "../CommonGameBar/CommonGameBarManager_alchemist": "CommonGameBarManager_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "../Roller_alchemist": "Roller_alchemist",
    "../ServerDataFormat_alchemist": "ServerDataFormat_alchemist"
  } ],
  Game_Introduced_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0f61eXq74BGuL68gM1aMUo4", "Game_Introduced_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var RemoteAssetManager_alchemist_1 = require("../RemoteAssetManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Game_Introduced = function(_super) {
      __extends(Game_Introduced, _super);
      function Game_Introduced() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.PageH = [];
        _this.PageV = [];
        _this.PageIndex = 0;
        _this.safeBlock = null;
        _this.PageMaxLimit = 0;
        _this.startButton = null;
        _this.LButton = null;
        _this.RButton = null;
        return _this;
      }
      Game_Introduced.prototype.onLoad = function() {
        var _this = this;
        this.PageMaxLimit = this.PageH.length;
        this.LButton = this.node.getChildByName("startLbutton").getComponent(cc.Button);
        this.RButton = this.node.getChildByName("startRbutton").getComponent(cc.Button);
        this.startButton = this.node.getChildByName("Start_btn").getComponent(cc.Button);
        this.startButton.node.on("click", function() {
          _this.node.active = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME);
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.LButton.node.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.PageIndex - 1 > -1 && (_this.PageIndex -= 1);
          _this.ShowCurrentPage(_this.PageIndex);
        });
        this.RButton.node.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.PageIndex + 1 < _this.PageMaxLimit && (_this.PageIndex += 1);
          _this.ShowCurrentPage(_this.PageIndex);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.AssetLoaded, function() {
          _this.init_Spr();
          _this.DetectGameLayout();
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.ScreenChange, function() {
          _this.DetectGameLayout();
        });
      };
      Game_Introduced.prototype.update = function(dt) {};
      Game_Introduced.prototype.DetectGameLayout = function() {
        if (GameManager_alchemist_1.default.GM.currentGameScreenLayout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal) {
          this.node.getChildByName("hori").active = true;
          this.node.getChildByName("verti").active = false;
          this.startButton.node.setPosition(0, -302.6);
          this.LButton.node.setPosition(-518.751, 74.457);
          this.RButton.node.setPosition(525.556, 67.32);
        } else {
          this.node.getChildByName("hori").active = false;
          this.node.getChildByName("verti").active = true;
          this.startButton.node.setPosition(0, -333.5);
          this.LButton.node.setPosition(-292, -40.507);
          this.RButton.node.setPosition(300, -40);
        }
      };
      Game_Introduced.prototype.init_Spr = function() {
        var content = this.node.getChildByName("verti");
        content.getChildByName("1").getComponentInChildren(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("IntroScreen01_Portrait");
        content.getChildByName("2").getComponentInChildren(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("IntroScreen02_Portrait");
        content = this.node.getChildByName("hori");
        content.getChildByName("1").getComponentInChildren(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("IntroScreen01");
        content.getChildByName("2").getComponentInChildren(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("IntroScreen02");
        this.node.getChildByName("hori").getChildByName("1").active = true;
        this.node.getChildByName("verti").getChildByName("1").active = true;
      };
      Game_Introduced.prototype.ShowCurrentPage = function(currentPageIndex) {
        console.log(currentPageIndex);
        for (var i = 0; i < this.PageMaxLimit; i++) if (currentPageIndex == i) {
          this.PageH[i].active = true;
          this.PageV[i].active = true;
        } else {
          this.PageH[i].active = false;
          this.PageV[i].active = false;
        }
      };
      Game_Introduced.prototype.onDisable = function() {
        this.safeBlock.node.active = false;
      };
      __decorate([ property([ cc.Node ]) ], Game_Introduced.prototype, "PageH", void 0);
      __decorate([ property([ cc.Node ]) ], Game_Introduced.prototype, "PageV", void 0);
      __decorate([ property(cc.BlockInputEvents) ], Game_Introduced.prototype, "safeBlock", void 0);
      Game_Introduced = __decorate([ ccclass ], Game_Introduced);
      return Game_Introduced;
    }(cc.Component);
    exports.default = Game_Introduced;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "../RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist"
  } ],
  InfoPage_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "51f44dWA1lPzLDr3ZpdfArg", "InfoPage_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var infopage = function(_super) {
      __extends(infopage, _super);
      function infopage() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.backButton = null;
        _this.nextButton = null;
        _this.closeButton = null;
        _this.m_pageview = null;
        _this.m_pageviewLength = 0;
        _this.infopage = null;
        _this.PayLinePageNumber = null;
        return _this;
      }
      infopage.prototype.initScreen = function(Layout) {
        Layout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal;
        for (var i = 0; i < this.PayLinePageNumber.children.length; i++) this.PayLinePageNumber.children[i].getComponent(cc.Label).string = (i + 1).toString();
      };
      infopage.prototype.update = function() {};
      infopage.prototype.onLoad = function() {
        var _this = this;
        this.initScreen(GameManager_alchemist_1.default.GM.currentGameScreenLayout);
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.ScreenChange, function(Layout) {
          Layout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal;
        });
        this.closeButton.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          console.log("close");
          _this.infopage.active = false;
        });
        this.m_pageview = this.node.getComponent(cc.PageView);
        this.m_pageviewLength = this.m_pageview.node.getChildByName("view").getChildByName("content").children.length;
        this.backButton.on("click", function() {
          _this.m_pageview.getCurrentPageIndex() - 1 < 0 ? _this.m_pageview.setCurrentPageIndex(_this.m_pageviewLength - 1) : _this.m_pageview.setCurrentPageIndex(_this.m_pageview.getCurrentPageIndex() - 1);
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.nextButton.on("click", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.m_pageview.getCurrentPageIndex() + 1 > _this.m_pageviewLength - 1 ? _this.m_pageview.setCurrentPageIndex(0) : _this.m_pageview.setCurrentPageIndex(_this.m_pageview.getCurrentPageIndex() + 1);
        });
      };
      __decorate([ property(cc.Node) ], infopage.prototype, "backButton", void 0);
      __decorate([ property(cc.Node) ], infopage.prototype, "nextButton", void 0);
      __decorate([ property(cc.Node) ], infopage.prototype, "closeButton", void 0);
      __decorate([ property(cc.Node) ], infopage.prototype, "infopage", void 0);
      __decorate([ property(cc.Node) ], infopage.prototype, "PayLinePageNumber", void 0);
      infopage = __decorate([ ccclass ], infopage);
      return infopage;
    }(cc.Component);
    exports.default = infopage;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist"
  } ],
  LoadBundleScene_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9ec10h4n69OwbbUglP1SYJQ", "LoadBundleScene_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadBundleScene_alchemist = function(_super) {
      __extends(LoadBundleScene_alchemist, _super);
      function LoadBundleScene_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.txt_SceneLoading = null;
        _this.txt_BundleLoading = null;
        _this.RecordMap = new Map();
        return _this;
      }
      LoadBundleScene_alchemist.prototype.start = function() {
        return __awaiter(this, void 0, void 0, function() {
          var bundle;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              return [ 4, this.loadBundleSync("https://rd07.zwai.com.tw/SoftStar/alchemist_1213/assets/alchemist", this.RecordMap) ];

             case 1:
              bundle = _a.sent();
              bundle.loadScene("MainScene", function(CompletedCount, totalCount, item) {
                _this.txt_SceneLoading.string = "\u5834\u666f\u9032\u5ea6 " + CompletedCount + "/" + totalCount + " : " + item.url;
              }, function(Error, scene) {
                if (Error) {
                  console.log("\u5834\u666f\u52a0\u8f09\u5931\u6557");
                  return;
                }
                cc.director.runScene(scene);
              });
              return [ 2 ];
            }
          });
        });
      };
      LoadBundleScene_alchemist.prototype.loadBundleSync = function(url, options) {
        return new Promise(function(resolve, reject) {
          cc.assetManager.loadBundle(url, options, function(err, bundle) {
            if (err) {
              cc.error("\u52a0\u8f09Bundle\u5931\u6557 , url:" + url + " , err:" + err);
              resolve(null);
            } else {
              console.log(bundle);
              console.log(options);
              resolve(bundle);
            }
          });
        });
      };
      __decorate([ property(cc.Label) ], LoadBundleScene_alchemist.prototype, "txt_SceneLoading", void 0);
      __decorate([ property(cc.Label) ], LoadBundleScene_alchemist.prototype, "txt_BundleLoading", void 0);
      LoadBundleScene_alchemist = __decorate([ ccclass ], LoadBundleScene_alchemist);
      return LoadBundleScene_alchemist;
    }(cc.Component);
    exports.default = LoadBundleScene_alchemist;
    cc._RF.pop();
  }, {} ],
  LoadingPage_ViewController_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "41685r8xF9AkLvXr6dH6lSs", "LoadingPage_ViewController_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadingPage_ViewController = function(_super) {
      __extends(LoadingPage_ViewController, _super);
      function LoadingPage_ViewController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.LoadingPage = null;
        _this.ProgressBar = null;
        return _this;
      }
      LoadingPage_ViewController.prototype.onLoad = function() {
        this.LoadingPage = this.node;
        this.ProgressBar = this.node.getComponentInChildren(cc.ProgressBar);
        GameManager_alchemist_1.default.GM.ChangeScreenSize(GameManager_alchemist_1.default.GM.currentGameScreenLayout);
      };
      LoadingPage_ViewController = __decorate([ ccclass ], LoadingPage_ViewController);
      return LoadingPage_ViewController;
    }(cc.Component);
    exports.default = LoadingPage_ViewController;
    cc._RF.pop();
  }, {
    "../GameManager_alchemist": "GameManager_alchemist"
  } ],
  NumImgJumper_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "88708yC5j5ODKsrUOBt32QU", "NumImgJumper_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NumImgJumper_alchemist = void 0;
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NumImgJumper_alchemist = function(_super) {
      __extends(NumImgJumper_alchemist, _super);
      function NumImgJumper_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ParentNode = null;
        _this.numSpriteArray = [];
        _this.needPrecisionStr = true;
        _this.numImgScale = 1;
        _this.m_Time = 0;
        _this.m_Duration = 0;
        _this.m_StartNum = 0;
        _this.m_EndNum = 0;
        return _this;
      }
      NumImgJumper_alchemist.prototype.startJumpingNum = function(start, end, duration, callback) {
        void 0 != callback && (this._callback = callback);
        this.m_StartNum = start;
        this.m_EndNum = end;
        this.m_Duration = duration;
        this.m_Time = 0;
      };
      NumImgJumper_alchemist.prototype.lateUpdate = function(dt) {
        var scale = .5;
        if (this.m_Time < this.m_Duration) {
          this.m_Time = Math.min(this.m_Duration, this.m_Time + dt);
          var t = cc.misc.clamp01(this.m_Time / this.m_Duration);
          var num = cc.misc.lerp(this.m_StartNum, this.m_EndNum, t);
          var valueStr = "";
          valueStr = (this.needPrecisionStr && GameServer_alchemist_1.default.self.getTotalBet() < 100, 
          num.toString());
          if (valueStr.length <= 7) scale = 1; else {
            var length = valueStr.length - 7;
            scale = 1 - .05 * length;
          }
          this.updateNumImgs(valueStr, scale);
        } else if (void 0 != this._callback) {
          this._callback();
          this._callback = void 0;
        }
      };
      NumImgJumper_alchemist.prototype.updateNumImgs = function(valueStr, scale) {
        var parent = this.ParentNode;
        if (null != parent) {
          parent.scale = scale;
          parent.destroyAllChildren();
          for (var _i = 0, valueStr_1 = valueStr; _i < valueStr_1.length; _i++) {
            var char = valueStr_1[_i];
            var charNode = new cc.Node();
            charNode.setParent(parent);
            charNode.scale = this.numImgScale;
            var spr = charNode.addComponent(cc.Sprite);
            spr.trim = false;
            spr.sizeMode = cc.Sprite.SizeMode.RAW;
            var tex = this.getSpriteByChar(char);
            tex && (spr.spriteFrame = tex);
          }
        }
      };
      NumImgJumper_alchemist.prototype.getSpriteByChar = function(char) {
        if (char.match(/[0-9]/)) {
          var num = Number.parseInt(char);
          return this.numSpriteArray[num];
        }
        if ("," === char) return this.numSpriteArray[10];
        if ("." === char) return this.numSpriteArray[11];
        return null;
      };
      __decorate([ property(cc.Node) ], NumImgJumper_alchemist.prototype, "ParentNode", void 0);
      __decorate([ property([ cc.SpriteFrame ]) ], NumImgJumper_alchemist.prototype, "numSpriteArray", void 0);
      __decorate([ property(cc.Boolean) ], NumImgJumper_alchemist.prototype, "needPrecisionStr", void 0);
      __decorate([ property ], NumImgJumper_alchemist.prototype, "numImgScale", void 0);
      NumImgJumper_alchemist = __decorate([ ccclass ], NumImgJumper_alchemist);
      return NumImgJumper_alchemist;
    }(cc.Component);
    exports.NumImgJumper_alchemist = NumImgJumper_alchemist;
    cc._RF.pop();
  }, {
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist"
  } ],
  NumImgUpdate_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e3a5c0IpK1COrhYe0gjvXEc", "NumImgUpdate_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NumImgUpdate_alchemist = function(_super) {
      __extends(NumImgUpdate_alchemist, _super);
      function NumImgUpdate_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Digital_SpriteFrames = [];
        _this.Parent = null;
        _this.DigitalLayout = null;
        _this.Lable = null;
        _this.DigitalScale = 1;
        return _this;
      }
      NumImgUpdate_alchemist.prototype.onLoad = function() {
        this.Parent = this.node;
        this.Parent.scale = this.DigitalScale;
        this.Lable = this.node.getComponent(cc.Label);
        this.DigitalLayout = this.node.getComponent(cc.Layout);
        this.DigitalLayout.type = cc.Layout.Type.HORIZONTAL;
        this.DigitalLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
        this.DigitalLayout.spacingX = -10;
      };
      NumImgUpdate_alchemist.prototype.font_Transfer_to_texture = function(valueStr) {
        this.updateNumImgs(valueStr);
      };
      NumImgUpdate_alchemist.prototype.updateNumImgs = function(valueStr) {
        if (null != this.Parent) {
          this.Parent.destroyAllChildren();
          for (var _i = 0, valueStr_1 = valueStr; _i < valueStr_1.length; _i++) {
            var char = valueStr_1[_i];
            var charNode = new cc.Node();
            charNode.setParent(this.Parent);
            var spr = charNode.addComponent(cc.Sprite);
            var tex = this.getSpriteByChar(char);
            if (tex) {
              spr.spriteFrame = tex;
              spr.sizeMode = cc.Sprite.SizeMode.TRIMMED;
              spr.trim = true;
              spr.node.anchorY = .5;
            }
          }
        }
      };
      NumImgUpdate_alchemist.prototype.getSpriteByChar = function(char) {
        if (char.match(/[0-9]/)) {
          var num = Number.parseInt(char);
          return this.determineSpr(num);
        }
        return null;
      };
      NumImgUpdate_alchemist.prototype.determineSpr = function(num) {
        return this.Digital_SpriteFrames[num];
      };
      NumImgUpdate_alchemist.prototype.update = function(dt) {
        this.font_Transfer_to_texture(this.node.getComponent(cc.Label).string);
      };
      __decorate([ property([ cc.SpriteFrame ]) ], NumImgUpdate_alchemist.prototype, "Digital_SpriteFrames", void 0);
      __decorate([ property(cc.Float) ], NumImgUpdate_alchemist.prototype, "DigitalScale", void 0);
      NumImgUpdate_alchemist = __decorate([ ccclass ], NumImgUpdate_alchemist);
      return NumImgUpdate_alchemist;
    }(cc.Component);
    exports.default = NumImgUpdate_alchemist;
    cc._RF.pop();
  }, {} ],
  PayLineData_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "668316vH5FA5L8MMOfFJguX", "PayLineData_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayLineData_alchemist = function() {
      function PayLineData_alchemist() {
        this.LineIndex = 0;
        this.LineNodes = [];
        this.LineEffects = [];
        this.LineNodesWinFrames = [];
      }
      PayLineData_alchemist = __decorate([ ccclass ], PayLineData_alchemist);
      return PayLineData_alchemist;
    }();
    exports.default = PayLineData_alchemist;
    cc._RF.pop();
  }, {} ],
  PayTable_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d88d5wWJBxGlbwQIsASn1Zy", "PayTable_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PayTable_alchemist = function() {
      function PayTable_alchemist() {}
      PayTable_alchemist.CompareSymbol = function(id, count) {
        var Mulit = 0;
        switch (id) {
         case 9:
          switch (count) {
           case 3:
            Mulit = 5;
            break;

           case 4:
            Mulit = 30;
            break;

           case 5:
            Mulit = 50;
          }
          break;

         case 8:
          switch (count) {
           case 3:
            Mulit = 8;
            break;

           case 4:
            Mulit = 30;
            break;

           case 5:
            Mulit = 50;
          }
          break;

         case 7:
          switch (count) {
           case 3:
            Mulit = 8;
            break;

           case 4:
            Mulit = 30;
            break;

           case 5:
            Mulit = 60;
          }
          break;

         case 6:
          switch (count) {
           case 3:
            Mulit = 10;
            break;

           case 4:
            Mulit = 40;
            break;

           case 5:
            Mulit = 60;
          }
          break;

         case 5:
          switch (count) {
           case 3:
            Mulit = 10;
            break;

           case 4:
            Mulit = 40;
            break;

           case 5:
            Mulit = 80;
          }
          break;

         case 4:
          switch (count) {
           case 3:
            Mulit = 20;
            break;

           case 4:
            Mulit = 50;
            break;

           case 5:
            Mulit = 80;
          }
          break;

         case 3:
          switch (count) {
           case 3:
            Mulit = 20;
            break;

           case 4:
            Mulit = 50;
            break;

           case 5:
            Mulit = 100;
          }
          break;

         case 2:
          switch (count) {
           case 3:
            Mulit = 30;
            break;

           case 4:
            Mulit = 60;
            break;

           case 5:
            Mulit = 120;
          }
          break;

         case 1:
          switch (count) {
           case 3:
            Mulit = 30;
            break;

           case 4:
            Mulit = 80;
            break;

           case 5:
            Mulit = 150;
          }
          break;

         case 0:
          switch (count) {
           case 3:
            Mulit = 40;
            break;

           case 4:
            Mulit = 100;
            break;

           case 5:
            Mulit = 200;
          }
        }
        return Mulit;
      };
      PayTable_alchemist = __decorate([ ccclass ], PayTable_alchemist);
      return PayTable_alchemist;
    }();
    exports.default = PayTable_alchemist;
    cc._RF.pop();
  }, {} ],
  PotionDigital_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "17edfGdXzVMGbAZT5LV25ld", "PotionDigital_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PotionDigital_alchemist = function(_super) {
      __extends(PotionDigital_alchemist, _super);
      function PotionDigital_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Digital_SpriteFrames = [];
        _this.DigitalLayout = null;
        _this.DigitalString = "0";
        return _this;
      }
      Object.defineProperty(PotionDigital_alchemist.prototype, "DigitalValue", {
        get: function() {
          return this._DigitalValue;
        },
        set: function(v) {
          this._DigitalValue = v;
          this.DigitalString = GameManager_alchemist_1.default.toStringThousandth(v);
          this.node.getChildByName("Layout").getComponent(cc.Label).string = this.DigitalString;
        },
        enumerable: false,
        configurable: true
      });
      PotionDigital_alchemist.prototype.onLoad = function() {};
      PotionDigital_alchemist.prototype.updateNumImgs = function(valueStr) {
        if (null != this.DigitalLayout.node) {
          this.DigitalLayout.node.destroyAllChildren();
          for (var _i = 0, valueStr_1 = valueStr; _i < valueStr_1.length; _i++) {
            var char = valueStr_1[_i];
            var charNode = new cc.Node();
            charNode.setParent(this.DigitalLayout.node);
            var spr = charNode.addComponent(cc.Sprite);
            var tex = this.getSpriteByChar(char);
            if (tex) {
              spr.spriteFrame = tex;
              spr.sizeMode = cc.Sprite.SizeMode.TRIMMED;
              spr.trim = true;
              spr.node.anchorY = .5;
            }
          }
        }
      };
      PotionDigital_alchemist.prototype.getSpriteByChar = function(char) {
        if (char.match(/[0-9]/)) {
          var num = Number.parseInt(char);
          return this.determineSpr(num);
        }
        if ("," === char) return this.determineSpr(10);
        if ("." === char) return this.determineSpr(11);
        if ("k" === char) return this.determineSpr(12);
        return null;
      };
      PotionDigital_alchemist.prototype.determineSpr = function(num) {
        return this.Digital_SpriteFrames[num];
      };
      __decorate([ property(cc.Layout) ], PotionDigital_alchemist.prototype, "DigitalLayout", void 0);
      PotionDigital_alchemist = __decorate([ ccclass ], PotionDigital_alchemist);
      return PotionDigital_alchemist;
    }(cc.Component);
    exports.default = PotionDigital_alchemist;
    cc._RF.pop();
  }, {
    "../GameManager_alchemist": "GameManager_alchemist"
  } ],
  RemoteAssetManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "233ef9QVPNHT49m+fy0jd8u", "RemoteAssetManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var AssetEntry_alchemist = function() {
      function AssetEntry_alchemist(key, url) {
        this.key = "";
        this.url = "";
        this.key = key;
        this.url = url;
      }
      return AssetEntry_alchemist;
    }();
    var RemoteAssetJSON = function() {
      function RemoteAssetJSON() {
        this.remoteHost = "";
        this.assets = null;
      }
      return RemoteAssetJSON;
    }();
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RemoteAssetManager_alchemist = function(_super) {
      __extends(RemoteAssetManager_alchemist, _super);
      function RemoteAssetManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._self = null;
        _this.JsonPath = {
          remoteHost: "https://rd07.zwai.com.tw/backup0222/",
          SpineAssets: {
            Extra_Free_Spins: "Spine/Extra_Free_Spins",
            Scatter: "Spine/Scatter",
            H1: "Spine/H1",
            H2: "Spine/H2",
            H3: "Spine/H3",
            H4: "Spine/H4",
            L1: "Spine/L1",
            L2: "Spine/L2",
            L3: "Spine/L3",
            L4: "Spine/L4",
            L5: "Spine/L5",
            Wild: "Spine/Wild",
            Anticipation: "Spine/Anticipation",
            payline: "Spine/payline",
            bigWin: "Spine/bigWin",
            MainGame_Background_Landscape: "Spine/MainGame_Background_Landscape",
            MainGame_Background_Portrait_Idle: "Spine/MainGame_Background_Portrait_Idle",
            BonusGame_Background_Landscape: "Spine/BonusGame_Background_Landscape",
            BonusGame_Background_Portrait: "Spine/BonusGame_Background_Portrait"
          },
          assets: {
            symbol_0: "Texture/S0",
            symbol_1: "Texture/S1",
            symbol_2: "Texture/S2",
            symbol_3: "Texture/S3",
            symbol_4: "Texture/S4",
            symbol_5: "Texture/S5",
            symbol_6: "Texture/S6",
            symbol_7: "Texture/S7",
            symbol_8: "Texture/S8",
            symbol_9: "Texture/S9",
            symbol_10: "Texture/S10",
            symbol_11: "Texture/S11",
            symbol_12: "Texture/S12",
            symbol_13: "Texture/S13",
            blursymbol_0: "Texture/blurS0",
            blursymbol_1: "Texture/blurS1",
            blursymbol_2: "Texture/blurS2",
            blursymbol_3: "Texture/blurS3",
            blursymbol_4: "Texture/blurS4",
            blursymbol_5: "Texture/blurS5",
            blursymbol_6: "Texture/blurS6",
            blursymbol_7: "Texture/blurS7",
            blursymbol_8: "Texture/blurS8",
            blursymbol_9: "Texture/blurS9",
            blursymbol_10: "Texture/blurS10",
            blursymbol_11: "Texture/blurS11",
            blursymbol_12: "Texture/blurS12",
            blursymbol_13: "Texture/blurS13",
            IntroScreen01_Portrait: "uiTexture/IntroScreen01_Portrait",
            IntroScreen02_Portrait: "uiTexture/IntroScreen02_Portrait",
            IntroScreen01: "uiTexture/IntroScreen01",
            IntroScreen02: "uiTexture/IntroScreen02",
            arrow_hover: "uiTexture/arrow_hover",
            arrow_normal: "uiTexture/arrow_normal",
            confirm_btn: "uiTexture/confirm_btn",
            cancel_btn: "uiTexture/cancel_btn",
            confirm_icon: "uiTexture/confirm_icon",
            cancel_icon: "uiTexture/cancel_icon",
            frame: "uiTexture/frame",
            PayTableBackground: "uiTexture/PayTableBackground",
            PayTableBackgroundPortrait: "uiTexture/PayTableBackgroundPortrait",
            Buy_Freespin: "uiTexture/Buy_Freespin",
            PayTable: "uiTexture/PayTable"
          },
          language: {
            "zh-CHT": "zh-CHT",
            "zh-CHS": "zh-CHS",
            "en-US": "en-US",
            "th-TH": "th-TH",
            "vi-VN": "vi-VN",
            "pt-BR": "pt-BR",
            "id-ID": "id-ID",
            "ko-KR": "ko-KR"
          },
          AudioAssets: {
            MAINGAME: "Audio/Music/MAINGAME",
            FREEGAME: "Audio/Music/FREEGAME",
            Particle01: "Audio/Music/Particle01",
            Particle02: "Audio/Music/Particle02",
            ParticleEnd: "Audio/Music/ParticleEnd",
            SPIN_START: "Audio/Sound/SPIN_START",
            SPIN_STOP: "Audio/Sound/SPIN_STOP",
            CLICK_BUTTON: "Audio/Sound/CLICK_BUTTON",
            WinLine: "Audio/Sound/WinLine",
            BigWinLevelUp: "Audio/Sound/BigWinLevelUp",
            ScatterListent: "Audio/Sound/ScatterListent",
            ScatterReward: "Audio/Sound/ScatterReward",
            Scatter01: "Audio/Sound/Scatter01",
            Scatter02: "Audio/Sound/Scatter02",
            Scatter03: "Audio/Sound/Scatter03",
            Scatter04: "Audio/Sound/Scatter04",
            Scatter05: "Audio/Sound/Scatter05",
            FreeGamePlus: "Audio/Sound/FreeGamePlus",
            WildStick: "Audio/Sound/WildStick",
            Flash_to_FG: "Audio/Sound/Flash_to_FG",
            FreeGameResult: "Audio/Sound/FreeGameResult"
          }
        };
        _this.isLoaded = false;
        _this.assetJson = null;
        _this.assetMap = new Map();
        _this.spriteAssetMap = new Map();
        _this.spineAssetMap = new Map();
        _this.configJson = null;
        _this.DomainName = "";
        _this.isAssetLoaded = false;
        _this.downloadedCount = 0;
        _this.TotalCount = 0;
        _this.temp_bundle = null;
        _this.BundleLoaded = function() {
          console.log(_this.temp_bundle);
          _this.resTotalCount += Object.keys(_this.JsonPath.assets).length;
          _this.resTotalCount += Object.keys(_this.JsonPath.SpineAssets).length;
          _this.resTotalCount += Object.keys(_this.JsonPath.AudioAssets).length;
          var _loop_1 = function(asset) {
            _this.temp_bundle.load("" + _this.JsonPath.assets[asset], cc.Texture2D, function(err, res) {
              err && console.log("loadTError\n" + _this.JsonPath.assets[asset]);
              res && _this.assetMap.set(asset, res);
              _this.resDownloadedCount += 1;
              _this.DownloadProgressCallback();
            });
          };
          for (var asset in _this.JsonPath.assets) _loop_1(asset);
          var _loop_2 = function(asset) {
            _this.temp_bundle.load("" + _this.JsonPath.SpineAssets[asset], sp.SkeletonData, function(err, res) {
              err && console.log("loadTError\n" + _this.JsonPath.SpineAssets[asset]);
              res.textures.forEach(function(_texture) {
                _texture.setPremultiplyAlpha(false);
              });
              _this.assetMap.set(asset, res);
              _this.resDownloadedCount += 1;
              _this.DownloadProgressCallback();
            });
          };
          for (var asset in _this.JsonPath.SpineAssets) _loop_2(asset);
          var _loop_3 = function(asset) {
            _this.temp_bundle.load("" + _this.JsonPath.AudioAssets[asset], cc.AudioClip, function(err, res) {
              err && console.log("loadTError\n" + _this.JsonPath.AudioAssets[asset]);
              console.log(res);
              _this.assetMap.set(asset, res);
              _this.resDownloadedCount += 1;
              _this.DownloadProgressCallback();
            });
          };
          for (var asset in _this.JsonPath.AudioAssets) _loop_3(asset);
        };
        _this.resTotalCount = 0;
        _this.resDownloadedCount = 0;
        return _this;
      }
      RemoteAssetManager_alchemist_1 = RemoteAssetManager_alchemist;
      RemoteAssetManager_alchemist.prototype.start = function() {
        this._self = this.node.getComponent(RemoteAssetManager_alchemist_1);
        RemoteAssetManager_alchemist_1.self = this._self;
        this.temp_bundle = cc.assetManager.getBundle("alchemist");
        this.BundleLoaded();
      };
      RemoteAssetManager_alchemist.prototype.CreatPaths = function(DomainName, Path, Remote_imgName, SheetLength, ext) {
        void 0 === ext && (ext = ".png");
        var ResourcesPaths = [];
        for (var count = 0; count < SheetLength; count++) {
          var Quene = "_000";
          Quene = count > 99 ? "_" + count.toString() : count > 9 ? "_0" + count.toString() : "_00" + count.toString();
          ResourcesPaths[count] = DomainName + Path + Remote_imgName + Quene + ext;
        }
        return ResourcesPaths;
      };
      RemoteAssetManager_alchemist.prototype.downloadSequenceImgs = function(Paths, Out_SeuqnceImgs) {
        var _this = this;
        return new Promise(function(resolve, rej) {
          cc.loader.load(Paths, function(completecount, totalcount) {}, function(err, res) {
            err && console.error(Paths + ", !Download Failed!");
            for (var a in res._map) if (Object.prototype.hasOwnProperty.call(res._map, a)) {
              var _sprFrame = null;
              _sprFrame = new cc.SpriteFrame(res._map[a]);
              Out_SeuqnceImgs.push(_sprFrame);
            }
            _this.downloadedCount += Out_SeuqnceImgs.length;
            var completePercent = Math.round(_this.downloadedCount / _this.TotalCount * 100) / 100;
            GameManager_alchemist_1.default.GM.LoadingPage.ProgressBar.progress = completePercent;
            resolve("");
          });
        });
      };
      RemoteAssetManager_alchemist.prototype.DownloadProgressCallback = function() {
        var _this = this;
        var completePercent = Math.round(this.resDownloadedCount / this.resTotalCount * 100) / 100;
        GameManager_alchemist_1.default.GM.LoadingPage.ProgressBar.progress = completePercent;
        this.resDownloadedCount >= this.resTotalCount && false == this.isAssetLoaded && this.scheduleOnce(function() {
          _this.isAssetLoaded = true;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.AssetLoaded);
        }, 3);
      };
      RemoteAssetManager_alchemist.prototype.creatAnimationClip = function(SprFrames, _ClipName, _Fps, isLoop) {
        void 0 === _Fps && (_Fps = 20);
        void 0 === isLoop && (isLoop = true);
        var clip = cc.AnimationClip.createWithSpriteFrames(SprFrames, _Fps);
        clip.name = _ClipName;
        clip.wrapMode = isLoop ? cc.WrapMode.Loop : cc.WrapMode.Default;
        return clip;
      };
      RemoteAssetManager_alchemist.prototype.loadRemoteAssets = function(assetEntries) {
        var _this = this;
        var urlList = [];
        for (var idx = 0; idx < assetEntries.length; idx++) urlList.push(this.DomainName + assetEntries[idx].url);
        this.resTotalCount = urlList.length;
        var _loop_4 = function(idx) {
          cc.assetManager.loadRemote(urlList[idx], function(error, results) {
            if (error) {
              cc.error("Error URL " + urlList[idx]);
              return;
            }
            _this.assetMap.set(assetEntries[idx].key, results);
            _this.resDownloadedCount += 1;
            _this.DownloadProgressCallback();
          });
        };
        for (var idx = 0; idx < urlList.length; idx++) _loop_4(idx);
      };
      RemoteAssetManager_alchemist.prototype.getSpriteFrame = function(fileName) {
        if (this.spriteAssetMap.has(fileName)) return this.spriteAssetMap.get(fileName);
        if (this.assetMap.has(fileName)) {
          var sprite = this.getAsset(fileName);
          var frame = new cc.SpriteFrame(sprite);
          this.spriteAssetMap.set(fileName, frame);
          return frame;
        }
        return null;
      };
      RemoteAssetManager_alchemist.prototype.getSpine = function(fileName) {
        var file = this.assetMap.get(fileName);
        return file;
      };
      RemoteAssetManager_alchemist.prototype.getAsset = function(fileName) {
        return this.assetMap.get(fileName);
      };
      var RemoteAssetManager_alchemist_1;
      RemoteAssetManager_alchemist.self = null;
      RemoteAssetManager_alchemist.Symbols = new Map();
      __decorate([ property(RemoteAssetManager_alchemist_1) ], RemoteAssetManager_alchemist.prototype, "_self", void 0);
      RemoteAssetManager_alchemist = RemoteAssetManager_alchemist_1 = __decorate([ ccclass ], RemoteAssetManager_alchemist);
      return RemoteAssetManager_alchemist;
    }(cc.Component);
    exports.default = RemoteAssetManager_alchemist;
    cc._RF.pop();
  }, {
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist"
  } ],
  RewardData_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "641408+f9ZNPrLwgqqHrKjj", "RewardData_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RewardData_alchemist = function() {
      function RewardData_alchemist() {}
      RewardData_alchemist = __decorate([ ccclass ], RewardData_alchemist);
      return RewardData_alchemist;
    }();
    exports.default = RewardData_alchemist;
    cc._RF.pop();
  }, {} ],
  RewardMarqueen_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a24c2cQScVID6WRaJFFJINH", "RewardMarqueen_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RewardMarqueen_alchemist = function(_super) {
      __extends(RewardMarqueen_alchemist, _super);
      function RewardMarqueen_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.BackGround = null;
        _this.congratulateTips = null;
        _this.m_PaylineTrigger = false;
        _this.m_changetrigger = false;
        _this.m_showindex = 0;
        _this.m_timeCounter = 0;
        _this.m_Enable_ShowAllPayLine = false;
        _this.m_ShowAllPayLine_TimeCount = 0;
        _this.m_ShowAllPayLine_EndTime = 2;
        _this.m_ShowAllPayLine_TimeTrigger = false;
        return _this;
      }
      RewardMarqueen_alchemist.prototype.init = function() {
        this.BackGround = cc.find("Canvas/Mask/UI_interface/top_infobar/BackGround").getComponent(cc.Sprite);
        this.congratulateTips = cc.find("Canvas/Mask/UI_interface/congratulateTips/New Label").getComponent(cc.Label);
        this.pay_symbol = cc.find("Canvas/Mask/UI_interface/top_infobar/Award_info/pay_symbol").getComponent(cc.Sprite);
        this.pay = cc.find("Canvas/Mask/UI_interface/top_infobar/Award_info/pay").getComponent(cc.RichText);
        this.EnableDisplay(false);
      };
      RewardMarqueen_alchemist.prototype.EnableDisplay = function(boolean) {
        this.BackGround.node.opacity = boolean ? 100 : 0;
        this.congratulateTips.node.opacity = boolean ? 255 : 0;
        this.pay_symbol.node.opacity = boolean ? 255 : 0;
        this.pay.node.opacity = boolean ? 255 : 0;
      };
      RewardMarqueen_alchemist.prototype.showSingleLine = function(Datas) {
        var needTurnOffSymbol;
        this.EnableDisplay(true);
        if (GameManager_alchemist_1.default.GM.saveGameResult.length > 0) {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLine_Lines_DisableAll();
          GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLine_Lines_ShowLine(Datas.whichLine);
          GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLineEffect(Datas, needTurnOffSymbol, GameManager_alchemist_1.default.GM.Instance_WheelManager.ServerResultFormatTo4x5(Datas.whichLine), true);
          this.pay.node.parent.active = true;
          this.pay_symbol.spriteFrame = GameManager_alchemist_1.default.GM.Instance_WheelManager.static_Symbol[Datas.Symbol_ID - 1];
          this.pay_symbol.node.setContentSize(40, 40);
          this.pay.string = "x " + Datas.howmany + "  " + GameManager_alchemist_1.default.GM.language_LINE + " " + Datas.whichLine + "  " + GameManager_alchemist_1.default.GM.language_PAYS + " " + GameManager_alchemist_1.default.toStringThousandth(Datas.LineAward) + "  ";
          this.BackGround.node.width = this.pay.node.width + this.pay_symbol.node.width;
        }
      };
      RewardMarqueen_alchemist.prototype.ShowAllPayLine = function(Datas) {
        var lbl_freetimeleft = GameManager_alchemist_1.default.GM.userUI.top_infobar.getChildByName("lbl_FreeSpinLeft").getComponent(cc.Label);
        lbl_freetimeleft.string = "";
        this.pay_symbol.spriteFrame = null;
        this.pay.string = "";
        this.EnableDisplay(false);
        GameManager_alchemist_1.default.GM.congratulateTips.string = "";
        var needTurnOffSymbol = [];
        0 != Datas.length && GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLineDatas.forEach(function(Data) {
          Data.LineNodes.forEach(function(node) {
            node.opacity = 100;
          });
        });
        if (0 == Datas.length) {
          cc.log("\u6c92\u4e2d\u734e");
          return;
        }
        GameManager_alchemist_1.default.GM.hasFreeGameFlag && false == GameManager_alchemist_1.default.GM.isFreeGameState && GameManager_alchemist_1.default.GM.ScatterReward();
        for (var i = 0; i < Datas.length; i++) {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLine_Lines_ShowLine(Datas[i].whichLine);
          var Result = GameManager_alchemist_1.default.GM.Instance_WheelManager.ServerResultFormatTo4x5(Datas[i].whichLine);
          GameManager_alchemist_1.default.GM.Instance_WheelManager.PayLineEffect(Datas[i], needTurnOffSymbol, Result);
          needTurnOffSymbol.forEach(function(node) {
            node.active = false;
          });
        }
        GameManager_alchemist_1.default.GM.anim_WinScore(true);
      };
      RewardMarqueen_alchemist.prototype.activeShowAllPayLine = function() {
        this.m_Enable_ShowAllPayLine = true;
      };
      RewardMarqueen_alchemist.prototype.startLoopSingleLine = function() {
        this.m_Enable_ShowAllPayLine = false;
        this.m_ShowAllPayLine_TimeTrigger = false;
        this.m_ShowAllPayLine_TimeCount = 0;
        this.SingleLineOpenCounter();
      };
      RewardMarqueen_alchemist.prototype.update = function(dt) {
        if (this.m_Enable_ShowAllPayLine) {
          this.ShowAllPayLine(GameManager_alchemist_1.default.GM.saveGameResult);
          this.m_Enable_ShowAllPayLine = false;
          this.m_ShowAllPayLine_TimeTrigger = true;
        }
        if (this.m_ShowAllPayLine_TimeTrigger) if (this.m_ShowAllPayLine_TimeCount > this.m_ShowAllPayLine_EndTime) {
          this.m_ShowAllPayLine_TimeTrigger = false;
          this.m_ShowAllPayLine_TimeCount = 0;
          this.startLoopSingleLine();
        } else this.m_ShowAllPayLine_TimeCount += dt;
        if (this.m_changetrigger) {
          this.showSingleLine(GameManager_alchemist_1.default.GM.saveGameResult[this.m_showindex % GameManager_alchemist_1.default.GM.saveGameResult.length]);
          this.m_changetrigger = false;
        }
        if (this.m_PaylineTrigger) {
          this.m_timeCounter += dt;
          if (this.m_timeCounter > 2) {
            this.m_timeCounter = 0;
            this.m_showindex += 1;
            if (this.m_showindex > GameManager_alchemist_1.default.GM.saveGameResult.length) {
              this.closecounter();
              this.activeShowAllPayLine();
              console.log("showSingleLine");
              return;
            }
            this.m_changetrigger = true;
          }
        }
      };
      RewardMarqueen_alchemist.prototype.resetcounter = function() {
        this.m_timeCounter = 0;
        this.m_showindex = 0;
      };
      RewardMarqueen_alchemist.prototype.SingleLineOpenCounter = function() {
        this.resetcounter();
        this.m_PaylineTrigger = true;
        this.m_changetrigger = true;
      };
      RewardMarqueen_alchemist.prototype.closecounter = function() {
        this.resetcounter();
        this.m_PaylineTrigger = false;
        this.m_changetrigger = false;
      };
      RewardMarqueen_alchemist.prototype.initcounter = function() {
        this.m_timeCounter = 0;
        this.m_showindex = 0;
        this.m_ShowAllPayLine_TimeCount = 0;
        this.m_PaylineTrigger = false;
        this.m_changetrigger = false;
        this.m_Enable_ShowAllPayLine = false;
        this.m_ShowAllPayLine_TimeTrigger = false;
      };
      RewardMarqueen_alchemist = __decorate([ ccclass ], RewardMarqueen_alchemist);
      return RewardMarqueen_alchemist;
    }(cc.Component);
    exports.default = RewardMarqueen_alchemist;
    cc._RF.pop();
  }, {
    "./GameManager_alchemist": "GameManager_alchemist"
  } ],
  Roller_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e04a3EQ9ZtECJNtFv2/muSw", "Roller_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Symbol_ID = exports.RollerName = void 0;
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var RemoteAssetManager_alchemist_1 = require("./RemoteAssetManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var RollerName;
    (function(RollerName) {
      RollerName[RollerName["axis1"] = 0] = "axis1";
      RollerName[RollerName["axis2"] = 1] = "axis2";
      RollerName[RollerName["axis3"] = 2] = "axis3";
      RollerName[RollerName["axis4"] = 3] = "axis4";
      RollerName[RollerName["axis5"] = 4] = "axis5";
    })(RollerName = exports.RollerName || (exports.RollerName = {}));
    var Symbol_ID;
    (function(Symbol_ID) {
      Symbol_ID[Symbol_ID["High1"] = 1] = "High1";
      Symbol_ID[Symbol_ID["High2"] = 2] = "High2";
      Symbol_ID[Symbol_ID["High3"] = 3] = "High3";
      Symbol_ID[Symbol_ID["High4"] = 4] = "High4";
      Symbol_ID[Symbol_ID["Low1"] = 5] = "Low1";
      Symbol_ID[Symbol_ID["Low2"] = 6] = "Low2";
      Symbol_ID[Symbol_ID["Low3"] = 7] = "Low3";
      Symbol_ID[Symbol_ID["Low4"] = 8] = "Low4";
      Symbol_ID[Symbol_ID["Low5"] = 9] = "Low5";
      Symbol_ID[Symbol_ID["Wild"] = 10] = "Wild";
      Symbol_ID[Symbol_ID["Wildx2"] = 11] = "Wildx2";
      Symbol_ID[Symbol_ID["Wildx3"] = 12] = "Wildx3";
      Symbol_ID[Symbol_ID["Wildx5"] = 13] = "Wildx5";
      Symbol_ID[Symbol_ID["Scatter"] = 14] = "Scatter";
    })(Symbol_ID = exports.Symbol_ID || (exports.Symbol_ID = {}));
    var Roller = function(_super) {
      __extends(Roller, _super);
      function Roller() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.SymbolMaxTypeCount = 14;
        _this.Symbol_column_count = 6;
        _this.Symbol_migration_distance = 141.75;
        _this.Column_Symbols = [];
        _this.ColumnData = [];
        _this.m_Sprite = [];
        _this.mblur_Sprite = [];
        _this.m_stoped = false;
        _this.myName = -1;
        _this.m_rollTempoUnit = 4;
        _this.checkScatter = function(ResultTable) {
          var _listenFreeGame = [];
          var ScaterCount = 0;
          for (var i = 0; i < 5; i++) {
            ScaterCount >= 2 ? _listenFreeGame.push(true) : _listenFreeGame.push(false);
            for (var j = 4 * i; j < 4 * (i + 1); j++) if (ResultTable[j] == Symbol_ID.Scatter) {
              ScaterCount += 1;
              break;
            }
          }
          return _listenFreeGame;
        };
        _this.check_Listen_roll_time = function(ListenArray) {
          var MultiTime = 1;
          var ListenLength = [];
          for (var i = 0; i < 5; i++) {
            ListenArray[i] && (MultiTime += 1);
            ListenLength.push(MultiTime);
          }
          return ListenLength;
        };
        return _this;
      }
      Roller.prototype.onLoad = function() {
        var _this = this;
        this.node.children.forEach(function(childNode) {
          _this.Column_Symbols.push(childNode);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.AssetLoaded, function() {
          _this.init();
        });
      };
      Roller.prototype.init = function() {
        for (var i = 0; i < this.SymbolMaxTypeCount; i++) {
          var texture2D = RemoteAssetManager_alchemist_1.default.self.getAsset("symbol_" + i);
          var img = new cc.SpriteFrame(texture2D);
          img.name = "symbol_" + i;
          this.m_Sprite.push(img);
        }
        for (var i = 0; i < this.SymbolMaxTypeCount; i++) {
          var texture2D = RemoteAssetManager_alchemist_1.default.self.getAsset("blursymbol_" + i);
          var img = new cc.SpriteFrame(texture2D);
          img.name = "blursymbol_" + i;
          this.mblur_Sprite.push(img);
        }
        this.ColumnData = this.firstGameResult();
        GameManager_alchemist_1.default.GM.count_Rollerinit += 1;
      };
      Roller.prototype.TurnWheel = function(targetNode, TurnSpeed, rollerIdx) {
        return __awaiter(this, void 0, void 0, function() {
          var RollRound, times, Table, ServerResult, i, num, ListenFreeGame, ListenLength, _a, i, axis1_symbol_ID_1, axis1_ListIdx_1, times, i, axis2_symbol_ID_1, axis2_ListIdx_1, times, times, i, axis3_symbol_ID_1, axis3_ListIdx_1, times, times, i, axis4_symbol_ID_1, axis4_ListIdx_1, times, times, i, axis5_symbol_ID_1, axis5_ListIdx_1;
          return __generator(this, function(_b) {
            switch (_b.label) {
             case 0:
              this.myName = rollerIdx;
              RollRound = 4;
              GameManager_alchemist_1.default.GM.userUI.QuickSpinFlag && !GameManager_alchemist_1.default.GM.isFreeGameState && (this.m_stoped = true);
              return [ 4, this.DropUp(targetNode) ];

             case 1:
              _b.sent();
              times = 0;
              _b.label = 2;

             case 2:
              if (!(times < RollRound * this.m_rollTempoUnit)) return [ 3, 5 ];
              if (this.m_stoped) return [ 3, 5 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 3:
              _b.sent();
              _b.label = 4;

             case 4:
              times++;
              return [ 3, 2 ];

             case 5:
              if (!!GameManager_alchemist_1.default.GM.hasResult) return [ 3, 8 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed) ];

             case 6:
              _b.sent();
              _b.label = 7;

             case 7:
              return [ 3, 5 ];

             case 8:
              Table = [];
              ServerResult = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex].betNumber;
              for (i = 0; i < ServerResult.length; i++) {
                num = ServerResult[i] - 1;
                Table.push(num);
              }
              ListenFreeGame = this.checkScatter(Table);
              ListenLength = this.check_Listen_roll_time(ListenFreeGame);
              _a = this.myName;
              switch (_a) {
               case RollerName.axis1:
                return [ 3, 9 ];

               case RollerName.axis2:
                return [ 3, 16 ];

               case RollerName.axis3:
                return [ 3, 27 ];

               case RollerName.axis4:
                return [ 3, 42 ];

               case RollerName.axis5:
                return [ 3, 57 ];
              }
              return [ 3, 72 ];

             case 9:
              i = 3;
              _b.label = 10;

             case 10:
              if (!(i >= 0)) return [ 3, 13 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, Table[i]) ];

             case 11:
              _b.sent();
              _b.label = 12;

             case 12:
              i--;
              return [ 3, 10 ];

             case 13:
              axis1_symbol_ID_1 = [];
              axis1_ListIdx_1 = [];
              return [ 4, this.DropDown(targetNode, TurnSpeed).then(function() {
                AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_STOP);
                for (var i = 0; i <= 3; i++) {
                  axis1_symbol_ID_1.push(Table[i]);
                  axis1_ListIdx_1.push(i);
                }
              }) ];

             case 14:
              _b.sent();
              return [ 4, this.DampUp(targetNode) ];

             case 15:
              _b.sent();
              this.rollerStopedCheck(axis1_ListIdx_1, axis1_symbol_ID_1);
              return [ 3, 72 ];

             case 16:
              console.log("axis2");
              times = 0;
              _b.label = 17;

             case 17:
              if (!(times < 2)) return [ 3, 20 ];
              if (this.m_stoped) return [ 3, 20 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 18:
              _b.sent();
              _b.label = 19;

             case 19:
              times++;
              return [ 3, 17 ];

             case 20:
              i = 7;
              _b.label = 21;

             case 21:
              if (!(i >= 4)) return [ 3, 24 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, Table[i]) ];

             case 22:
              _b.sent();
              _b.label = 23;

             case 23:
              i--;
              return [ 3, 21 ];

             case 24:
              axis2_symbol_ID_1 = [];
              axis2_ListIdx_1 = [];
              return [ 4, this.DropDown(targetNode, TurnSpeed).then(function() {
                AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_STOP);
                for (var i = 4; i <= 7; i++) {
                  axis2_symbol_ID_1.push(Table[i]);
                  axis2_ListIdx_1.push(i);
                }
                if (ListenFreeGame[2]) {
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[2].node.active = true;
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[2].setAnimation(0, "animation", true);
                  AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.ScatterListent, true);
                }
              }) ];

             case 25:
              _b.sent();
              return [ 4, this.DampUp(targetNode) ];

             case 26:
              _b.sent();
              this.rollerStopedCheck(axis2_ListIdx_1, axis2_symbol_ID_1);
              return [ 3, 72 ];

             case 27:
              console.log("axis3");
              times = 0;
              _b.label = 28;

             case 28:
              if (!(times < 4)) return [ 3, 31 ];
              if (this.m_stoped) return [ 3, 31 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 29:
              _b.sent();
              _b.label = 30;

             case 30:
              times++;
              return [ 3, 28 ];

             case 31:
              if (!ListenFreeGame[2]) return [ 3, 35 ];
              times = 0;
              _b.label = 32;

             case 32:
              if (!(times < 5 * this.m_rollTempoUnit * ListenLength[2])) return [ 3, 35 ];
              if (this.m_stoped) return [ 3, 35 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 33:
              _b.sent();
              _b.label = 34;

             case 34:
              times++;
              return [ 3, 32 ];

             case 35:
              i = 11;
              _b.label = 36;

             case 36:
              if (!(i >= 8)) return [ 3, 39 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, Table[i]) ];

             case 37:
              _b.sent();
              _b.label = 38;

             case 38:
              i--;
              return [ 3, 36 ];

             case 39:
              axis3_symbol_ID_1 = [];
              axis3_ListIdx_1 = [];
              return [ 4, this.DropDown(targetNode, TurnSpeed).then(function() {
                AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_STOP);
                for (var i = 8; i <= 11; i++) {
                  axis3_symbol_ID_1.push(Table[i]);
                  axis3_ListIdx_1.push(i);
                }
                if (ListenFreeGame[3]) {
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[3].node.active = true;
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[3].setAnimation(0, "animation", true);
                  AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.ScatterListent, true);
                }
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[2].node.active = false;
              }) ];

             case 40:
              _b.sent();
              return [ 4, this.DampUp(targetNode) ];

             case 41:
              _b.sent();
              this.rollerStopedCheck(axis3_ListIdx_1, axis3_symbol_ID_1);
              return [ 3, 72 ];

             case 42:
              console.log("axis4");
              times = 0;
              _b.label = 43;

             case 43:
              if (!(times < 6)) return [ 3, 46 ];
              if (this.m_stoped) return [ 3, 46 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 44:
              _b.sent();
              _b.label = 45;

             case 45:
              times++;
              return [ 3, 43 ];

             case 46:
              if (!ListenFreeGame[3]) return [ 3, 50 ];
              times = 0;
              _b.label = 47;

             case 47:
              if (!(times < 5 * this.m_rollTempoUnit * ListenLength[3])) return [ 3, 50 ];
              if (this.m_stoped) return [ 3, 50 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 48:
              _b.sent();
              _b.label = 49;

             case 49:
              times++;
              return [ 3, 47 ];

             case 50:
              i = 15;
              _b.label = 51;

             case 51:
              if (!(i >= 12)) return [ 3, 54 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, Table[i]) ];

             case 52:
              _b.sent();
              _b.label = 53;

             case 53:
              i--;
              return [ 3, 51 ];

             case 54:
              axis4_symbol_ID_1 = [];
              axis4_ListIdx_1 = [];
              return [ 4, this.DropDown(targetNode, TurnSpeed).then(function() {
                AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_STOP);
                for (var i = 12; i <= 15; i++) {
                  axis4_symbol_ID_1.push(Table[i]);
                  axis4_ListIdx_1.push(i);
                }
                if (ListenFreeGame[4]) {
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[4].node.active = true;
                  GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[4].setAnimation(0, "animation", true);
                  AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.ScatterListent, true);
                }
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[2].node.active = false;
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[3].node.active = false;
              }) ];

             case 55:
              _b.sent();
              return [ 4, this.DampUp(targetNode) ];

             case 56:
              _b.sent();
              this.rollerStopedCheck(axis4_ListIdx_1, axis4_symbol_ID_1);
              return [ 3, 72 ];

             case 57:
              console.log("axis5");
              times = 0;
              _b.label = 58;

             case 58:
              if (!(times < 8)) return [ 3, 61 ];
              if (this.m_stoped) return [ 3, 61 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 59:
              _b.sent();
              _b.label = 60;

             case 60:
              times++;
              return [ 3, 58 ];

             case 61:
              if (!ListenFreeGame[4]) return [ 3, 65 ];
              times = 0;
              _b.label = 62;

             case 62:
              if (!(times < 5 * this.m_rollTempoUnit * ListenLength[4])) return [ 3, 65 ];
              if (this.m_stoped) return [ 3, 65 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, -1, true) ];

             case 63:
              _b.sent();
              _b.label = 64;

             case 64:
              times++;
              return [ 3, 62 ];

             case 65:
              i = 19;
              _b.label = 66;

             case 66:
              if (!(i >= 16)) return [ 3, 69 ];
              return [ 4, this.DropDown(targetNode, TurnSpeed, Table[i]) ];

             case 67:
              _b.sent();
              _b.label = 68;

             case 68:
              i--;
              return [ 3, 66 ];

             case 69:
              axis5_symbol_ID_1 = [];
              axis5_ListIdx_1 = [];
              return [ 4, this.DropDown(targetNode, TurnSpeed).then(function() {
                AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.SPIN_STOP);
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[2].node.active = false;
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[3].node.active = false;
                GameManager_alchemist_1.default.GM.Instance_WheelManager.ListenFreeGameEffect[4].node.active = false;
                for (var i = 16; i <= 19; i++) {
                  axis5_symbol_ID_1.push(Table[i]);
                  axis5_ListIdx_1.push(i);
                }
              }) ];

             case 70:
              _b.sent();
              return [ 4, this.DampUp(targetNode) ];

             case 71:
              _b.sent();
              this.rollerStopedCheck(axis5_ListIdx_1, axis5_symbol_ID_1);
              return [ 3, 72 ];

             case 72:
              return [ 2 ];
            }
          });
        });
      };
      Roller.prototype.DropUp = function(targetNode) {
        var Orignalposition = targetNode.position;
        return new Promise(function(resolve, reject) {
          cc.tween(targetNode).by(.1, {
            position: cc.v3(0, 20, 0)
          }).delay(.05).to(.05, {
            position: Orignalposition
          }).call(resolve).start();
        });
      };
      Roller.prototype.DropDown = function(targetNode, speed, result, _blur) {
        var _this = this;
        void 0 === result && (result = -1);
        void 0 === _blur && (_blur = false);
        var Orignalposition = targetNode.position;
        var fps = 60;
        var dumpoffset = .8 * fps;
        var offset = targetNode.y - this.Symbol_migration_distance / fps * dumpoffset;
        return new Promise(function(resolve, reject) {
          cc.tween(targetNode).to(speed, {
            position: cc.v3(Orignalposition.x, offset, 0)
          }).to(0, {
            position: Orignalposition
          }).call(function() {
            -1 != result ? _this.ChangeSymbol(result) : _this.ChangeSymbol(-1, _blur);
            resolve("");
          }).start();
        });
      };
      Roller.prototype.DampUp = function(targetNode) {
        return __awaiter(this, void 0, void 0, function() {
          var frame, moveDown_time, moveUp_time, offset, Orignalposition;
          return __generator(this, function(_a) {
            frame = .0167;
            moveDown_time = 2 * frame;
            moveUp_time = 6 * frame;
            offset = .1 * -this.Symbol_migration_distance;
            Orignalposition = targetNode.position;
            return [ 2, new Promise(function(resolve, reject) {
              cc.tween(targetNode).by(moveDown_time, {
                position: cc.v3(0, offset, 0)
              }).to(moveUp_time, {
                position: Orignalposition
              }).call(function() {
                resolve("");
              }).start();
            }) ];
          });
        });
      };
      Roller.prototype.rollerStopedCheck = function(ListIndex, symbol_ID) {
        void 0 === ListIndex && (ListIndex = []);
        void 0 === symbol_ID && (symbol_ID = []);
        if (symbol_ID.includes(Symbol_ID.Scatter)) {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.ScatterCollectCount += 1;
          var pos = symbol_ID.findIndex(function(ID) {
            return ID == Symbol_ID.Scatter;
          });
          if (pos > -1) switch (this.myName) {
           case RollerName.axis1:
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[0].children[pos + 1].active = true;
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[0].children[pos + 1].getComponent(sp.Skeleton).skeletonData = GameManager_alchemist_1.default.GM.Instance_WheelManager.SpineDatas[13];
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[0].children[pos + 1].getComponent(sp.Skeleton).setAnimation(0, GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win, false);
            break;

           case RollerName.axis2:
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[1].children[pos + 1].active = true;
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[1].children[pos + 1].getComponent(sp.Skeleton).skeletonData = GameManager_alchemist_1.default.GM.Instance_WheelManager.SpineDatas[13];
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[1].children[pos + 1].getComponent(sp.Skeleton).setAnimation(0, GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win, false);
            break;

           case RollerName.axis3:
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[2].children[pos + 1].active = true;
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[2].children[pos + 1].getComponent(sp.Skeleton).skeletonData = GameManager_alchemist_1.default.GM.Instance_WheelManager.SpineDatas[13];
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[2].children[pos + 1].getComponent(sp.Skeleton).setAnimation(0, GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win, false);
            break;

           case RollerName.axis4:
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[3].children[pos + 1].active = true;
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[3].children[pos + 1].getComponent(sp.Skeleton).skeletonData = GameManager_alchemist_1.default.GM.Instance_WheelManager.SpineDatas[13];
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[3].children[pos + 1].getComponent(sp.Skeleton).setAnimation(0, GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win, false);
            break;

           case RollerName.axis5:
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[4].children[pos + 1].active = true;
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[4].children[pos + 1].getComponent(sp.Skeleton).skeletonData = GameManager_alchemist_1.default.GM.Instance_WheelManager.SpineDatas[13];
            GameManager_alchemist_1.default.GM.Instance_WheelManager.anim_rollers[4].children[pos + 1].getComponent(sp.Skeleton).setAnimation(0, GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win, false);
          }
          switch (GameManager_alchemist_1.default.GM.Instance_WheelManager.ScatterCollectCount) {
           case 1:
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Scatter01);
            break;

           case 2:
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Scatter02);
            break;

           case 3:
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Scatter03);
            break;

           case 4:
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Scatter04);
            break;

           case 5:
            AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.Scatter05);
          }
        }
        if (this.myName == RollerName.axis5) {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.dropBookCount = 0;
          GameManager_alchemist_1.default.GM.isRollerStoped = true;
          AudioManager_alchemist_1.AudioManager_alchemist.stopSound(AudioType_alchemist_1.SoundType_alchemist.ScatterListent);
          GameManager_alchemist_1.default.GM.Instance_WheelManager.ScatterCollectCount = 0;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.Stoped);
          GameManager_alchemist_1.default.GM.RecordFlag = false;
          GameManager_alchemist_1.default.GM.RecordTime = 0;
          GameManager_alchemist_1.default.GM.Instance_WheelManager.resetStopPara();
          var Result = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["betNumber"];
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.FreeGameCheckWildAccumulated, Result);
        }
      };
      Roller.prototype.ChangeSymbol = function(result, _blur) {
        void 0 === result && (result = -1);
        void 0 === _blur && (_blur = false);
        var newSymbol;
        newSymbol = this.Random(9, 0);
        -1 != result && (newSymbol = result);
        this.ColumnData.pop();
        this.ColumnData.splice(0, 0, newSymbol);
        this.updateSymbols(_blur);
      };
      Roller.prototype.updateSymbols = function(_blur) {
        void 0 === _blur && (_blur = false);
        if (_blur) for (var i = 0; i < this.ColumnData.length; i++) {
          this.Column_Symbols[i].getComponentInChildren(cc.Sprite).spriteFrame = this.mblur_Sprite[this.ColumnData[i]];
          this.Column_Symbols[i].anchorY = .5;
        } else for (var i = 0; i < this.ColumnData.length; i++) {
          this.Column_Symbols[i].getComponentInChildren(cc.Sprite).spriteFrame = this.m_Sprite[this.ColumnData[i]];
          this.Column_Symbols[i].anchorY = .5;
        }
      };
      Roller.prototype.updateSymbols_FreeGamelastResult = function() {
        for (var i = 1; i < 6; i++) {
          this.Column_Symbols[i].getComponentInChildren(cc.Sprite).spriteFrame = this.m_Sprite[this.ColumnData[i]];
          this.Column_Symbols[i].anchorY = .5;
        }
      };
      Roller.prototype.firstGameResult = function() {
        var RandonIndexArray = [];
        for (var i = 0; i < this.Symbol_column_count; i++) {
          RandonIndexArray[i] = this.Random(9, 1);
          this.Column_Symbols[i].getComponentInChildren(cc.Sprite).spriteFrame = this.m_Sprite[RandonIndexArray[i]];
        }
        return RandonIndexArray;
      };
      Roller.prototype.Random = function(max, min) {
        return Math.round(Math.random() * (max - min) + min);
      };
      Roller = __decorate([ ccclass ], Roller);
      return Roller;
    }(cc.Component);
    exports.default = Roller;
    cc._RF.pop();
  }, {
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist"
  } ],
  ServerDataFormat_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f56echO4gBHYqdKB5KsDKiE", "ServerDataFormat_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FreeResultFormat_alchemist = void 0;
    var ServerDataFormat_alchemist = function() {
      function ServerDataFormat_alchemist() {}
      ServerDataFormat_alchemist.prototype.setData = function(Sdata) {
        this.data = Sdata;
      };
      return ServerDataFormat_alchemist;
    }();
    exports.default = ServerDataFormat_alchemist;
    var FreeResultFormat_alchemist = function() {
      function FreeResultFormat_alchemist() {}
      return FreeResultFormat_alchemist;
    }();
    exports.FreeResultFormat_alchemist = FreeResultFormat_alchemist;
    cc._RF.pop();
  }, {} ],
  ServerPortocolManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef7dd/leoRMi6COKQ0Z7CZj", "ServerPortocolManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DeviceType_alchemist = void 0;
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var UI_interface_alchemist_1 = require("./UI/UI_interface_alchemist");
    var cryptor_1 = require("./cryptor");
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var DeviceType_alchemist;
    (function(DeviceType_alchemist) {
      DeviceType_alchemist[DeviceType_alchemist["offline"] = 0] = "offline";
      DeviceType_alchemist[DeviceType_alchemist["Web"] = 1] = "Web";
      DeviceType_alchemist[DeviceType_alchemist["APK"] = 2] = "APK";
    })(DeviceType_alchemist = exports.DeviceType_alchemist || (exports.DeviceType_alchemist = {}));
    var ServerPortocolManager_alchemist = function(_super) {
      __extends(ServerPortocolManager_alchemist, _super);
      function ServerPortocolManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this._DEV = true;
        _this.offline = true;
        _this.WebMode = false;
        _this.APKMode = false;
        _this._DevicePlayType = DeviceType_alchemist.offline;
        _this.cryptor = null;
        _this.socket = null;
        _this.Token = "ce637a79-b1af-4374-b7e1-d26f773c3d4c";
        _this.userID = "EZWIN2U_43";
        _this.language = "";
        _this.devCodes = [ "desktop", "mobile", "mobile", "desktop", "desktop" ];
        _this.ready = false;
        _this.HistoryURL = "";
        _this.HomeURL = "";
        _this.hosturl = "http://103.147.199.17/preview/1676959549/?language=en-US&token=1676959549";
        _this.serverurl = "ws://103.147.199.17:8021";
        _this.address = "";
        _this.newServerFlag = 0;
        _this.secret = "m6AeyWh49G+Xzf%Z";
        _this.LoadingPage = null;
        _this.config = null;
        _this.agents = cc.Enum({
          Windows: 0,
          Android: 1,
          iPhone: 2,
          Mac: 3
        });
        _this.DemoResult = [];
        _this.error = {
          MainResult: {
            betNumber: [ 8, 6, 1, 4, 5, 3, 14, 10, 1, 5, 8, 5, 8, 4, 7, 12, 4, 7, 2, 2 ],
            TotalWin: .75,
            LineNumber: [ 40 ],
            LineScore: [ .75 ],
            LineEffectCount: [ 4 ],
            SymbolNumber: [ 8 ]
          },
          FreeResult: [],
          TotalWin: .75,
          round: "186a579989c000001",
          result: {
            last_credit: 9999.75
          }
        };
        _this.PayLineTest = {
          MainResult: {
            betNumber: [ 5, 7, 8, 3, 14, 8, 4, 4, 4, 3, 10, 2, 3, 1, 9, 14, 8, 2, 7, 14 ],
            TotalWin: 5.1,
            LineNumber: [ 8, 41 ],
            LineScore: [ .1, 5 ],
            LineEffectCount: [ 3, 3 ],
            SymbolNumber: [ 8, 14 ],
            hitFreeCnt: 8
          },
          FreeResult: [ {
            betNumber: [ 4, 6, 6, 5, 5, 9, 6, 6, 2, 6, 3, 4, 6, 7, 8, 5, 5, 2, 5, 2 ],
            TotalWin: .45,
            FreeGamePlus: false,
            LineNumber: [ 7, 22, 33 ],
            LineScore: [ .15, .15, .15 ],
            LineEffectCount: [ 3, 3, 3 ],
            SymbolNumber: [ 6, 6, 6 ]
          }, {
            betNumber: [ 9, 9, 8, 7, 7, 4, 3, 1, 2, 3, 5, 4, 8, 6, 5, 9, 9, 2, 3, 10 ],
            TotalWin: 0,
            FreeGamePlus: false,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          }, {
            betNumber: [ 5, 9, 1, 6, 6, 10, 5, 8, 3, 3, 9, 1, 4, 3, 9, 10, 4, 3, 9, 10 ],
            TotalWin: .1,
            FreeGamePlus: false,
            LineNumber: [ 18 ],
            LineScore: [ .1 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ 9 ]
          }, {
            betNumber: [ 7, 9, 1, 1, 10, 10, 2, 6, 9, 8, 9, 1, 5, 10, 1, 10, 2, 7, 5, 10 ],
            TotalWin: 22.1,
            FreeGamePlus: true,
            LineNumber: [ 12, 18, 23, 31, 36 ],
            LineScore: [ 1.5, .25, .25, .1, 20 ],
            LineEffectCount: [ 3, 4, 4, 3, 5 ],
            SymbolNumber: [ 1, 9, 9, 9, 1 ]
          }, {
            betNumber: [ 9, 7, 3, 8, 10, 10, 1, 6, 2, 7, 9, 5, 9, 10, 10, 10, 1, 5, 4, 10 ],
            TotalWin: .85,
            FreeGamePlus: false,
            LineNumber: [ 2, 6, 13, 38 ],
            LineScore: [ .25, .1, .25, .25 ],
            LineEffectCount: [ 4, 3, 4, 4 ],
            SymbolNumber: [ 7, 7, 9, 9 ]
          }, {
            betNumber: [ 7, 4, 9, 6, 10, 10, 3, 3, 7, 2, 3, 4, 4, 10, 10, 10, 9, 1, 7, 10 ],
            TotalWin: .35,
            FreeGamePlus: false,
            LineNumber: [ 1, 5 ],
            LineScore: [ .1, .25 ],
            LineEffectCount: [ 3, 4 ],
            SymbolNumber: [ 7, 7 ]
          }, {
            betNumber: [ 5, 9, 3, 3, 10, 10, 1, 8, 3, 1, 1, 4, 6, 10, 10, 10, 6, 3, 5, 10 ],
            TotalWin: 1.75,
            FreeGamePlus: false,
            LineNumber: [ 15, 28 ],
            LineScore: [ 1.25, .5 ],
            LineEffectCount: [ 4, 3 ],
            SymbolNumber: [ 3, 3 ]
          }, {
            betNumber: [ 1, 7, 2, 3, 10, 10, 5, 10, 7, 6, 9, 5, 5, 10, 10, 10, 5, 2, 1, 10 ],
            TotalWin: .35,
            FreeGamePlus: false,
            LineNumber: [ 23, 31 ],
            LineScore: [ .25, .1 ],
            LineEffectCount: [ 4, 3 ],
            SymbolNumber: [ 7, 7 ]
          }, {
            betNumber: [ 2, 1, 1, 1, 10, 10, 8, 10, 9, 3, 10, 7, 5, 10, 10, 10, 7, 7, 2, 10 ],
            TotalWin: 56.5,
            FreeGamePlus: true,
            LineNumber: [ 8, 9, 13, 18, 21, 35, 38, 40 ],
            LineScore: [ 5, 5, 3.75, 5, 20, 1.5, 12.5, 3.75 ],
            LineEffectCount: [ 4, 4, 4, 4, 5, 3, 5, 4 ],
            SymbolNumber: [ 1, 1, 2, 1, 1, 1, 2, 2 ]
          }, {
            betNumber: [ 7, 5, 4, 2, 10, 10, 8, 10, 4, 7, 10, 7, 3, 10, 10, 10, 5, 6, 6, 10 ],
            TotalWin: 16,
            FreeGamePlus: false,
            LineNumber: [ 8, 9, 13, 15, 17, 18, 21, 24, 25, 32, 35, 38, 40 ],
            LineScore: [ .5, .5, .25, .5, .1, .3, 12.5, .1, .25, .25, .25, .25, .25 ],
            LineEffectCount: [ 4, 4, 4, 4, 3, 4, 5, 3, 4, 4, 3, 4, 4 ],
            SymbolNumber: [ 4, 4, 7, 4, 7, 5, 2, 7, 7, 7, 4, 7, 7 ]
          }, {
            betNumber: [ 3, 8, 7, 5, 10, 10, 10, 10, 9, 3, 10, 5, 2, 10, 10, 10, 9, 4, 1, 10 ],
            TotalWin: 14.5,
            FreeGamePlus: false,
            LineNumber: [ 3, 4, 8, 9, 10, 12, 13, 17, 18, 21, 25, 26, 29, 35, 36, 38, 40 ],
            LineScore: [ .25, 1.5, .25, .25, 1.5, .15, 1.25, .5, .25, 1.5, 1.25, .25, 1.5, .1, 1.5, 1.25, 1.25 ],
            LineEffectCount: [ 4, 5, 4, 4, 5, 3, 4, 3, 4, 5, 4, 4, 5, 3, 5, 4, 4 ],
            SymbolNumber: [ 7, 5, 7, 7, 5, 5, 3, 3, 8, 5, 3, 8, 5, 7, 5, 3, 3 ]
          }, {
            betNumber: [ 1, 9, 1, 7, 10, 10, 10, 10, 7, 8, 10, 8, 7, 10, 10, 10, 9, 1, 8, 10 ],
            TotalWin: 36,
            FreeGamePlus: false,
            LineNumber: [ 3, 8, 9, 13, 18, 20, 21, 26, 28, 29, 35, 38, 40 ],
            LineScore: [ 5, 5, 5, 5, .25, 1, 1, .25, 1, 1, 1.5, 5, 5 ],
            LineEffectCount: [ 4, 4, 4, 4, 4, 5, 5, 4, 5, 5, 3, 4, 4 ],
            SymbolNumber: [ 1, 1, 1, 1, 9, 7, 7, 9, 7, 7, 1, 1, 1 ]
          } ],
          TotalWin: 154.05,
          round: "18682d5a939000013",
          result: {
            last_credit: 1153.05
          }
        };
        _this.Line0 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 6, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 5, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "2", "6", "7", "6", "2", "2", "10", "5", "10", "4", "7", "9", "1", "7", "8", "4", "4", "1", "10", "3" ],
            TotalWin: 83333.35,
            LineNumber: [ 1, 2, 3, 4, 12, 13, 31, 32, 33, 34, 37 ],
            LineScore: [ 12500, 12500, 12500, 12500, 12500, 12500, 1666.67, 1666.67, 1666.67, 1666.67, 1666.67 ],
            LineEffectCount: [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],
            SymbolNumber: [ "2", "2", "2", "2", "2", "2", "7", "7", "7", "7", "7" ]
          },
          FreeResult: [],
          TotalWin: 83333.35,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 83333.35,
          round: "18c490b66e0000002",
          result: {
            last_credit: 9983333.35
          }
        };
        _this.Line1 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 1, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 1, 1, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 1, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "6", "9", "4", "4", "10", "9", "6", "1", "1", "1", "10", "1", "10", "3", "8", "8", "5", "1", "8", "14" ],
            TotalWin: 24166.66,
            LineNumber: [ 6, 15, 21, 42 ],
            LineScore: [ 8333.33, 2500, 833.33, 12500 ],
            LineEffectCount: [ 4, 3, 3, 4 ],
            SymbolNumber: [ "6", "6", "9", "4" ]
          },
          FreeResult: [],
          TotalWin: 24166.66,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 24166.66,
          round: "18c490b66e0000003",
          result: {
            last_credit: 9957500.01
          }
        };
        _this.Line2 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 1, 0, 0 ],
            3: [ 2, 1, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 1, 0, 1 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "4", "8", "3", "2", "3", "8", "5", "10", "7", "2", "3", "8", "10", "8", "8", "1", "2", "10", "4", "6" ],
            TotalWin: 54999.99,
            LineNumber: [ 22, 28, 39, 40, 42, 51 ],
            LineScore: [ 8333.33, 833.33, 8333.33, 8333.33, 16666.67, 12500 ],
            LineEffectCount: [ 5, 3, 3, 3, 4, 3 ],
            SymbolNumber: [ "8", "8", "3", "3", "3", "2" ]
          },
          FreeResult: [],
          TotalWin: 54999.99,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 54999.99,
          round: "18c490b66e0000004",
          result: {
            last_credit: 9962500
          }
        };
        _this.Line3 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 1, 1 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 1, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "3", "3", "7", "9", "14", "7", "3", "2", "2", "1", "10", "4", "2", "3", "10", "3", "9", "10", "2", "2" ],
            TotalWin: 60000.01,
            LineNumber: [ 15, 29, 41 ],
            LineScore: [ 16666.67, 41666.67, 1666.67 ],
            LineEffectCount: [ 4, 5, 3 ],
            SymbolNumber: [ "3", "3", "7" ]
          },
          FreeResult: [],
          TotalWin: 60000.01,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 60000.01,
          round: "18c490b66e0000005",
          result: {
            last_credit: 9972500.01
          }
        };
        _this.Line4 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 0, 1, 0 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "7", "8", "8", "1", "3", "4", "2", "8", "6", "8", "1", "1", "6", "4", "2", "8", "1", "9", "4", "5" ],
            TotalWin: 4166.67,
            LineNumber: [ 27 ],
            LineScore: [ 4166.67 ],
            LineEffectCount: [ 4 ],
            SymbolNumber: [ "8" ]
          },
          FreeResult: [],
          TotalWin: 4166.67,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 4166.67,
          round: "18c490b66e0000006",
          result: {
            last_credit: 9926666.68
          }
        };
        _this.Line5 = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 2, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "9", "7", "8", "14", "2", "9", "9", "1", "10", "6", "2", "3", "1", "2", "5", "10", "10", "9", "8", "1" ],
            TotalWin: 1666.66,
            LineNumber: [ 12, 13 ],
            LineScore: [ 833.33, 833.33 ],
            LineEffectCount: [ 3, 3 ],
            SymbolNumber: [ "9", "9" ]
          },
          FreeResult: [],
          TotalWin: 1666.66,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 1666.66,
          round: "18c490b66e0000007",
          result: {
            last_credit: 9878333.34
          }
        };
        _this.Line6 = {
          MainResult: {
            1: [ 1, 1, 4 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "1", "7", "4", "1", "10", "8", "1", "3", "1", "9", "5", "3", "1", "1", "5", "9", "1", "1", "5", "10" ],
            TotalWin: 750000.02,
            LineNumber: [ 1, 2, 3, 4, 12, 59 ],
            LineScore: [ 166666.67, 166666.67, 66666.67, 166666.67, 16666.67, 166666.67 ],
            LineEffectCount: [ 5, 5, 4, 5, 3, 5 ],
            SymbolNumber: [ "1", "1", "1", "1", "1", "1" ]
          },
          FreeResult: [],
          TotalWin: 750000.02,
          FreeGameCount: 0,
          FreeGameWin: 0,
          MainGameWin: 750000.02,
          round: "18c49106f98000005",
          result: {
            last_credit: 10516666.69
          }
        };
        _this.FreeGame = {
          MainResult: {
            1: [ 0, 0, 0 ],
            2: [ 0, 0, 0 ],
            3: [ 0, 0, 0 ],
            4: [ 0, 0, 0 ],
            5: [ 0, 0, 0 ],
            6: [ 0, 0, 0 ],
            7: [ 0, 0, 0 ],
            8: [ 0, 0, 0 ],
            9: [ 0, 0, 0 ],
            10: [ 0, 0, 0 ],
            14: [ 0, 0, 0 ],
            betNumber: [ "2", "7", "1", "14", "14", "10", "2", "8", "14", "8", "3", "5", "1", "1", "1", "8", "1", "2", "9", "3" ],
            TotalWin: 4166.666666666667,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          },
          FreeResult: [ {
            betNumber: [ "7", "9", "1", "8", "7", "2", "1", "6", "4", "9", "7", "6", "3", "7", "6", "7", "9", "4", "9", "9" ],
            TotalWin: 1666.67,
            LineNumber: [ 6 ],
            LineScore: [ 1666.67 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ "7" ]
          }, {
            betNumber: [ "1", "3", "3", "5", "6", "2", "1", "7", "2", "6", "1", "6", "1", "9", "4", "1", "4", "9", "6", "2" ],
            TotalWin: 16666.67,
            LineNumber: [ 15 ],
            LineScore: [ 16666.67 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ "1" ]
          }, {
            betNumber: [ "3", "7", "9", "2", "1", "8", "8", "1", "8", "1", "8", "7", "5", "1", "5", "6", "3", "1", "8", "7" ],
            TotalWin: 0,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          }, {
            betNumber: [ "8", "8", "7", "8", "4", "3", "5", "2", "8", "3", "5", "3", "6", "5", "5", "1", "2", "2", "7", "2" ],
            TotalWin: 0,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          }, {
            betNumber: [ "3", "1", "7", "2", "5", "1", "9", "3", "1", "6", "1", "5", "9", "7", "6", "2", "5", "5", "2", "1" ],
            TotalWin: 33333.34,
            LineNumber: [ 20, 21 ],
            LineScore: [ 16666.67, 16666.67 ],
            LineEffectCount: [ 3, 3 ],
            SymbolNumber: [ "1", "1" ]
          }, {
            betNumber: [ "7", "1", "2", "8", "1", "8", "3", "4", "3", "4", "5", "4", "7", "5", "6", "1", "2", "8", "7", "4" ],
            TotalWin: 0,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          }, {
            betNumber: [ "8", "3", "3", "1", "2", "6", "1", "6", "1", "6", "3", "1", "1", "2", "2", "4", "1", "6", "4", "3" ],
            TotalWin: 16666.67,
            LineNumber: [ 58 ],
            LineScore: [ 16666.67 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ "1" ]
          }, {
            betNumber: [ "5", "2", "9", "1", "6", "7", "5", "2", "5", "4", "7", "3", "6", "1", "1", "6", "1", "8", "5", "7" ],
            TotalWin: 2500,
            LineNumber: [ 12 ],
            LineScore: [ 2500 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ "5" ]
          }, {
            betNumber: [ "9", "1", "3", "1", "6", "6", "2", "6", "1", "1", "6", "9", "4", "4", "2", "4", "9", "9", "4", "3" ],
            TotalWin: 0,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          }, {
            betNumber: [ "9", "6", "5", "7", "7", "10", "7", "7", "3", "3", "1", "1", "1", "1", "3", "3", "5", "8", "3", "5" ],
            TotalWin: 0,
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: []
          } ],
          TotalWin: 75000.02,
          FreeGameCount: 10,
          FreeGameWin: 70833.35,
          MainGameWin: 4166.67,
          round: "18c43e20561000004",
          result: {
            last_credit: 9885833.35
          }
        };
        _this.FreeGameDemo = {
          MainResult: {
            betNumber: [ 14, 7, 4, 8, 7, 14, 10, 9, 14, 3, 2, 9, 3, 1, 1, 7, 1, 4, 4, 12 ],
            LineNumber: [ 41 ],
            LineScore: [ 35 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ 14 ],
            TotalWin: 35
          },
          FreeResult: [ {
            betNumber: [ 6, 4, 7, 5, 3, 6, 8, 8, 5, 7, 1, 5, 3, 4, 9, 6, 9, 3, 3, 3 ],
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: [],
            TotalWin: 0,
            FreeGamePlus: false
          }, {
            betNumber: [ 1, 6, 3, 9, 1, 6, 2, 8, 2, 2, 6, 2, 8, 5, 12, 3, 6, 3, 7, 3 ],
            LineNumber: [ 18 ],
            LineScore: [ 1.05 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ 6 ],
            TotalWin: 1.05,
            FreeGamePlus: false
          }, {
            betNumber: [ 6, 5, 1, 9, 6, 10, 12, 4, 6, 7, 2, 3, 1, 2, 12, 5, 5, 5, 9, 8 ],
            LineNumber: [ 1, 5, 34 ],
            LineScore: [ 1.05, 1.05, 18.9 ],
            LineEffectCount: [ 3, 3, 4 ],
            SymbolNumber: [ 6, 6, 6 ],
            TotalWin: 21,
            FreeGamePlus: false
          }, {
            betNumber: [ 1, 2, 4, 7, 1, 10, 12, 7, 5, 3, 2, 5, 7, 7, 12, 4, 5, 9, 1, 8 ],
            LineNumber: [ 18, 26 ],
            LineScore: [ 8.75, 236.25 ],
            LineEffectCount: [ 3, 4 ],
            SymbolNumber: [ 2, 2 ],
            TotalWin: 245,
            FreeGamePlus: false
          }, {
            betNumber: [ 7, 2, 8, 6, 4, 10, 12, 2, 5, 8, 3, 8, 1, 9, 12, 1, 10, 2, 2, 1 ],
            LineNumber: [ 19, 22, 30 ],
            LineScore: [ 15.75, 15.75, .7 ],
            LineEffectCount: [ 4, 4, 3 ],
            SymbolNumber: [ 8, 8, 8 ],
            TotalWin: 32.2,
            FreeGamePlus: true
          }, {
            betNumber: [ 1, 5, 9, 5, 1, 10, 12, 6, 8, 2, 4, 3, 3, 8, 12, 1, 10, 4, 2, 2 ],
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: [],
            TotalWin: 0,
            FreeGamePlus: false
          }, {
            betNumber: [ 5, 9, 8, 8, 8, 10, 12, 7, 9, 7, 3, 1, 9, 1, 12, 2, 10, 9, 9, 4 ],
            LineNumber: [ 23 ],
            LineScore: [ .7 ],
            LineEffectCount: [ 3 ],
            SymbolNumber: [ 9 ],
            TotalWin: .7,
            FreeGamePlus: false
          }, {
            betNumber: [ 3, 4, 8, 6, 5, 10, 12, 7, 6, 1, 2, 7, 2, 8, 12, 8, 10, 9, 5, 3 ],
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: [],
            TotalWin: 0,
            FreeGamePlus: false
          }, {
            betNumber: [ 8, 8, 8, 9, 6, 10, 12, 5, 4, 6, 4, 1, 3, 1, 12, 5, 10, 8, 7, 5 ],
            LineNumber: [],
            LineScore: [],
            LineEffectCount: [],
            SymbolNumber: [],
            TotalWin: 0,
            FreeGamePlus: false
          }, {
            betNumber: [ 9, 7, 8, 9, 1, 10, 12, 8, 2, 5, 2, 8, 5, 3, 12, 6, 10, 9, 4, 4 ],
            LineNumber: [ 19, 27 ],
            LineScore: [ 15.75, .7 ],
            LineEffectCount: [ 4, 3 ],
            SymbolNumber: [ 8, 8 ],
            TotalWin: 16.45,
            FreeGamePlus: false
          } ],
          TotalWin: 351.4,
          round: "1889a130d59000042",
          result: {
            last_credit: 8274.9
          }
        };
        return _this;
      }
      Object.defineProperty(ServerPortocolManager_alchemist.prototype, "DevicePlayType", {
        get: function() {
          return this._DevicePlayType;
        },
        set: function(v) {
          this._DevicePlayType = v;
          switch (this._DevicePlayType) {
           case DeviceType_alchemist.offline:
            this.offline = true;
            this.WebMode = false;
            this.APKMode = false;
            break;

           case DeviceType_alchemist.Web:
            this.offline = false;
            this.WebMode = true;
            this.APKMode = false;
            break;

           case DeviceType_alchemist.APK:
            this.offline = false;
            this.WebMode = false;
            this.APKMode = true;
          }
        },
        enumerable: false,
        configurable: true
      });
      ServerPortocolManager_alchemist.prototype.start = function() {
        return __awaiter(this, void 0, void 0, function() {
          var href, check_language, self;
          var _this = this;
          return __generator(this, function(_a) {
            switch (_a.label) {
             case 0:
              this.LoadingPage.active || (this.LoadingPage.active = true);
              if (false == this._DEV) {
                this.hosturl = window.location.href;
                href = new URL(this.hosturl);
                check_language = "";
                switch (this.newServerFlag) {
                 case 0:
                  this.Token = href.searchParams.get("token");
                  check_language = href.searchParams.get("language");
                  break;

                 case 1:
                  this.Token = href.searchParams.get("access_token");
                  check_language = href.searchParams.get("lang");
                }
                switch (check_language) {
                 case "en-US":
                 case "ko-KR":
                 case "th-TH":
                 case "vi-VN":
                 case "zh-CHT":
                 case "zh-CHS":
                 case "ms-MY":
                 case "id-ID":
                 case "pt-BR":
                  this.language = check_language;
                  break;

                 default:
                  this.language = "en-US";
                }
              }
              self = this;
              if (!(false == this.offline)) return [ 3, 4 ];
              this.cryptor = new cryptor_1.default(this.secret);
              if (!this.WebMode) return [ 3, 2 ];
              return [ 4, this.waitRespone() ];

             case 1:
              _a.sent();
              return [ 3, 3 ];

             case 2:
              if (this.APKMode) {
                null === this.hosturl && (this.hosturl = this.config.json.hosturl);
                this.Token = Softstar_Player.Instance.PlayerInfo.GameToken;
                this.userID = Softstar_Player.Instance.PlayerInfo.PlatformUID;
              } else if (this.offline) return [ 2 ];
              _a.label = 3;

             case 3:
              null === this.hosturl && (this.hosturl = this.config.json.hosturl);
              this.address = this.serverurl.toString();
              this.socket = new WebSocket(this.address);
              console.log("\u9023\u7dda\u4e2d2 : " + this.Token);
              this.socket.onopen = function() {
                console.log("\u6210\u529f\u9023\u7dda : " + _this.Token);
                GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSAuth", {
                  charset: navigator.language,
                  url: self.hosturl,
                  deviceInfo: navigator.userAgent,
                  device: self.getDevice(),
                  ipInfo: "IngoreipInfo"
                });
                _this.socket.onclose = function() {
                  console.log("Socket\u65b7\u7dda \u8fd4\u56de\u5927\u5ef3");
                  Softstar_EventSystem.emit(Softstar_EventType.BACK_TO_LOBBY);
                };
              };
              this.socket.onmessage = function(event) {
                GameManager_alchemist_1.default.GM.ServerPortocolMgr.onCommand(event.data);
              };
              _a.label = 4;

             case 4:
              return [ 2 ];
            }
          });
        });
      };
      ServerPortocolManager_alchemist.prototype.waitRespone = function() {
        var _this = this;
        return new Promise(function(res, rej) {
          var httpRequest = new XMLHttpRequest();
          httpRequest.open("POST", "http://103.147.199.17/api/login", true);
          httpRequest.setRequestHeader("Content-Type", "application/json");
          httpRequest.setRequestHeader("access-token", "RB257HPHrZvss5Hn");
          httpRequest.onload = function() {
            if (200 === httpRequest.status) {
              var response = JSON.parse(httpRequest.responseText);
              _this.Token = response.data.token;
              res(console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\n", response.data));
            }
          };
          var data = JSON.stringify({
            player: "player05",
            balance: 1e7,
            gameId: "ALK037",
            language: "en-US"
          });
          httpRequest.send(data);
        });
      };
      ServerPortocolManager_alchemist.prototype.onCommand = function(ctx) {
        console.log("receive:" + ctx);
        console.log("receive:" + this.cryptor.decrypt(ctx));
        try {
          var pack = JSON.parse(this.cryptor.decrypt(ctx));
        } catch (error) {
          return console.log("package parse fail", error);
        }
        cc.log("%c[" + pack.cmd + "]", "color:#D721FF; font-weight:bold;");
        switch (pack.cmd) {
         case "SCDisconnect":
          cc.director.pause();
          break;

         case "error":
          break;

         case "SCAuth":
          this.Token = pack.token;
          console.log("receive new token", pack);
          console.log("receive new token " + this.Token + " from server on confirm");
          this.clientReady();
          break;

         case "SCAlert":
          GameManager_alchemist_1.default.GM.Msg_notEnoughBalance(pack.data.message);
          GameManager_alchemist_1.default.GM.Spin.node.active = true;
          GameManager_alchemist_1.default.GM.userUI.btn_Stop.node.active = false;
          UI_interface_alchemist_1.default.self.btn_Auto.node.active = true;
          UI_interface_alchemist_1.default.self.btn_Bet.node.active = true;
          UI_interface_alchemist_1.default.self.LoopTimes = 0;
          break;

         case "notice":
          break;

         case "SCPlayerSetting":
          console.log(JSON.stringify(pack.data));
          GameServer_alchemist_1.default.self.PlayerData = pack.data;
          if (this.getDevice()) {
            GameManager_alchemist_1.default.GM.userUI.SystemSetting.exitgame.node.active = true;
            GameManager_alchemist_1.default.GM.userUI.SystemSetting.btn_History.node.active = true;
            this.HomeURL = this.HistoryURL = "http://www.google.com";
          } else {
            void 0 != pack.data.BackButtonURL && "" != pack.data.BackButtonURL ? this.HomeURL = pack.data.BackButtonURL : GameManager_alchemist_1.default.GM.userUI.SystemSetting.exitgame.node.active = false;
            void 0 != pack.data.HistoryURL && "" != pack.data.HistoryURL ? this.HistoryURL = pack.data.HistoryURL : GameManager_alchemist_1.default.GM.userUI.SystemSetting.btn_History.node.active = false;
          }
          break;

         case "SCCheckCanBet":
          EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.CheckCanBet, pack.data);
          break;

         case "SCBetResult":
          console.log(JSON.stringify(pack.data));
          GameServer_alchemist_1.default.self.SetResult(this.Line3);
          break;

         case "SCSetLineBet":
          break;

         case "SCSetTotalBet":
          GameServer_alchemist_1.default.self.setTotalBet(pack.data);
          break;

         case "SCCheckCoin":
          GameManager_alchemist_1.default.GM.SetBalance(pack.data.coin);
          break;

         case "lastGameState":
         case "CSetState":
          break;

         case "KeepAlive":
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("KeepAlive", null);
          break;

         case "SCIsAlive":
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSIsAlive", {
            status: "Alive"
          });
          break;

         default:
          console.log("receive " + ctx + " from server");
        }
      };
      ServerPortocolManager_alchemist.prototype.send = function(cmd, ctx) {
        if (null == this.socket) return;
        var jsonCtx = {
          cmd: cmd,
          timestamp: new Date().toISOString().replace(/T/, " ").replace(/Z/, ""),
          token: this.Token,
          userId: this.userID,
          data: ctx
        };
        var textMsg = JSON.stringify(jsonCtx);
        console.log("send: " + textMsg);
        "CSAuth" == cmd ? this.socket.send(textMsg) : this.socket.send(this.cryptor.encrypt(textMsg));
      };
      ServerPortocolManager_alchemist.prototype.getDevice = function() {
        var i, devices = Object.keys(this.agents);
        for (i = 0; i < devices.length; i++) if (-1 != navigator.userAgent.indexOf(devices[i])) break;
        var val = i < devices.length ? this.agents[devices[i]] : i;
        switch (val) {
         case this.agents.Mac:
          -1 !== navigator.userAgent.indexOf("iPhone") && (val = this.agents.iPhone);
          break;

         case this.agents.Windows:
         case this.agents.Android:
         case this.agents.iPhone:
        }
        return this.devCodes[val];
      };
      ServerPortocolManager_alchemist.prototype.clientReady = function() {
        if (null != this.socket && false == this.ready) {
          this.ready = true;
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.send("CSReady", null);
        } else this.offline && false == this.ready && this.offLineDemo();
        if (cc.sys.os == cc.sys.OS_ANDROID) {
          AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME);
          GameManager_alchemist_1.default.GM.isWindowFocus = true;
        } else if (cc.sys.os == cc.sys.OS_ANDROID) {
          AudioManager_alchemist_1.AudioManager_alchemist.playMusic(AudioType_alchemist_1.MusicType_alchemist.MAINGAME);
          GameManager_alchemist_1.default.GM.isWindowFocus = true;
        }
      };
      ServerPortocolManager_alchemist.prototype.checkDev = function() {
        return this._DEV;
      };
      ServerPortocolManager_alchemist.prototype.RanodmResult = function(length) {
        var max = length;
        var min = 0;
        return Math.round(Math.random() * (max - min) + min);
      };
      ServerPortocolManager_alchemist.prototype.offLineDemo = function() {
        console.log("offLineDemo");
        this.DemoResult.push(this.Line0, this.Line1, this.Line2, this.Line3, this.Line4, this.Line5, this.Line6, this.FreeGameDemo);
      };
      __decorate([ property({
        visible: false
      }) ], ServerPortocolManager_alchemist.prototype, "offline", void 0);
      __decorate([ property({
        visible: false
      }) ], ServerPortocolManager_alchemist.prototype, "WebMode", void 0);
      __decorate([ property({
        visible: false
      }) ], ServerPortocolManager_alchemist.prototype, "APKMode", void 0);
      __decorate([ property({
        visible: false,
        type: cc.Enum(DeviceType_alchemist)
      }) ], ServerPortocolManager_alchemist.prototype, "_DevicePlayType", void 0);
      __decorate([ property({
        type: cc.Enum(DeviceType_alchemist)
      }) ], ServerPortocolManager_alchemist.prototype, "DevicePlayType", null);
      __decorate([ property(cc.Node) ], ServerPortocolManager_alchemist.prototype, "LoadingPage", void 0);
      __decorate([ property(cc.JsonAsset) ], ServerPortocolManager_alchemist.prototype, "config", void 0);
      ServerPortocolManager_alchemist = __decorate([ ccclass ], ServerPortocolManager_alchemist);
      return ServerPortocolManager_alchemist;
    }(cc.Component);
    exports.default = ServerPortocolManager_alchemist;
    cc._RF.pop();
  }, {
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./UI/UI_interface_alchemist": "UI_interface_alchemist",
    "./cryptor": "cryptor"
  } ],
  ShinyEffect_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3b91v9qptPoLcdjW26WuDU", "ShinyEffect_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var ShinyEffect__alchemist = function(_super) {
      __extends(ShinyEffect__alchemist, _super);
      function ShinyEffect__alchemist() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ShinyEffect__alchemist.prototype.onEnable = function() {
        cc.dynamicAtlasManager.enabled = false;
        var obj = {
          x: 0
        };
        var material = this.node.getComponent(cc.RenderComponent).getMaterial(0);
        cc.tween(obj).repeatForever(cc.tween(obj).to(1, {
          x: 1
        }, {
          progress: function(start, end, current, time) {
            material.setProperty("lightCenterPoint", cc.v2(start + (end - start) * time, start + (end - start) * time));
            return start + (end - start) * time;
          }
        }).call(function() {
          obj.x = 0;
        })).start();
      };
      ShinyEffect__alchemist = __decorate([ ccclass ], ShinyEffect__alchemist);
      return ShinyEffect__alchemist;
    }(cc.Component);
    exports.default = ShinyEffect__alchemist;
    cc._RF.pop();
  }, {} ],
  SystemSetting_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f6adOjP75FCoHeHjfCqVUA", "SystemSetting_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var GameServer_alchemist_1 = require("../FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var UI_interface_alchemist_1 = require("./UI_interface_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var SystemSetting_TS = function(_super) {
      __extends(SystemSetting_TS, _super);
      function SystemSetting_TS() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tgl_quickspin = null;
        _this.tgl_sound = null;
        _this.tgl_music = null;
        _this.value_totalbet = null;
        _this.btn_Add = null;
        _this.btn_Sub = null;
        _this.btn_close = null;
        _this.btn_History = null;
        _this.exitgame = null;
        return _this;
      }
      SystemSetting_TS.prototype.init = function() {
        var _this = this;
        this.value_totalbet.string = GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet());
        this.tgl_quickspin.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          UI_interface_alchemist_1.default.self.QuickSpinFlag = !UI_interface_alchemist_1.default.self.QuickSpinFlag;
          UI_interface_alchemist_1.default.self.AutoSetting.tgl_quickspin.isChecked = UI_interface_alchemist_1.default.self.SystemSetting.tgl_quickspin.isChecked = UI_interface_alchemist_1.default.self.QuickSpinFlag;
          GameManager_alchemist_1.default.GM.Instance_WheelManager.resetStopPara();
        });
        this.tgl_sound.node.on("toggle", function() {
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.tgl_sound.isChecked != _this.tgl_sound.isChecked;
          _this.tgl_sound.isChecked ? AudioManager_alchemist_1.AudioManager_alchemist.setSoundVolume(1) : AudioManager_alchemist_1.AudioManager_alchemist.setSoundVolume(0);
        });
        this.tgl_music.node.on("toggle", function() {
          _this.tgl_music.isChecked != _this.tgl_music.isChecked;
          _this.tgl_music.isChecked ? AudioManager_alchemist_1.AudioManager_alchemist.setMusicVolume(1) : AudioManager_alchemist_1.AudioManager_alchemist.setMusicVolume(0);
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_close.node.on("click", function() {
          _this.node.getChildByName("tgl_System").getComponent(cc.Toggle).isChecked = false;
          _this.node.getChildByName("Page_System (\u7cfb\u7d71\u9801\u9762)").active = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_History.node.on("click", function() {
          console.log("clickHistory");
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          window.open("" + GameManager_alchemist_1.default.GM.ServerPortocolMgr.HistoryURL);
        });
        this.exitgame.node.on("click", function() {
          console.log("home");
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          GameManager_alchemist_1.default.GM.ServerPortocolMgr.socket.close();
        });
      };
      __decorate([ property(cc.Toggle) ], SystemSetting_TS.prototype, "tgl_quickspin", void 0);
      __decorate([ property(cc.Toggle) ], SystemSetting_TS.prototype, "tgl_sound", void 0);
      __decorate([ property(cc.Toggle) ], SystemSetting_TS.prototype, "tgl_music", void 0);
      __decorate([ property(cc.Label) ], SystemSetting_TS.prototype, "value_totalbet", void 0);
      __decorate([ property(cc.Button) ], SystemSetting_TS.prototype, "btn_Add", void 0);
      __decorate([ property(cc.Button) ], SystemSetting_TS.prototype, "btn_Sub", void 0);
      __decorate([ property(cc.Button) ], SystemSetting_TS.prototype, "btn_close", void 0);
      __decorate([ property(cc.Button) ], SystemSetting_TS.prototype, "btn_History", void 0);
      __decorate([ property(cc.Button) ], SystemSetting_TS.prototype, "exitgame", void 0);
      SystemSetting_TS = __decorate([ ccclass ], SystemSetting_TS);
      return SystemSetting_TS;
    }(cc.Component);
    exports.default = SystemSetting_TS;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "./UI_interface_alchemist": "UI_interface_alchemist"
  } ],
  TopUI_ViewController_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3447e1pQalMsbLYPqpvqcqt", "TopUI_ViewController_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TopUI_ViewController = function(_super) {
      __extends(TopUI_ViewController, _super);
      function TopUI_ViewController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.TopUI = null;
        _this.TopUI_hori = null;
        _this.TopUI_Verti = null;
        return _this;
      }
      TopUI_ViewController.prototype.start = function() {
        var _this = this;
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.ScreenChange, function() {
          if (GameManager_alchemist_1.default.GM.currentGameScreenLayout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal) {
            _this.TopUI.setPosition(_this.TopUI_hori.getPosition(cc.v3()));
            _this.TopUI.setScale(_this.TopUI_hori.getScale(cc.v3()));
            _this.TopUI.getChildByName("TopSpr").scale = 1;
            _this.TopUI.getChildByName("TopSpr").setContentSize(1e3, 80);
            _this.TopUI.children[0].setPosition(_this.TopUI_hori.children[0].getPosition());
            _this.TopUI.children[1].setPosition(_this.TopUI_hori.children[1].getPosition());
            _this.TopUI.children[2].setPosition(_this.TopUI_hori.children[2].getPosition());
            _this.TopUI.children[3].setPosition(_this.TopUI_hori.children[3].getPosition());
          } else {
            _this.TopUI.setPosition(_this.TopUI_Verti.getPosition(cc.v3()));
            _this.TopUI.setScale(_this.TopUI_Verti.getScale(cc.v3()));
            _this.TopUI.getChildByName("TopSpr").scale = 1.3333;
            _this.TopUI.getChildByName("TopSpr").setContentSize(750, 96);
            _this.TopUI.children[0].setPosition(_this.TopUI_Verti.children[0].getPosition());
            _this.TopUI.children[1].setPosition(_this.TopUI_Verti.children[1].getPosition());
            _this.TopUI.children[2].setPosition(_this.TopUI_Verti.children[2].getPosition());
            _this.TopUI.children[3].setPosition(_this.TopUI_Verti.children[3].getPosition());
          }
        });
      };
      __decorate([ property(cc.Node) ], TopUI_ViewController.prototype, "TopUI", void 0);
      __decorate([ property(cc.Node) ], TopUI_ViewController.prototype, "TopUI_hori", void 0);
      __decorate([ property(cc.Node) ], TopUI_ViewController.prototype, "TopUI_Verti", void 0);
      TopUI_ViewController = __decorate([ ccclass ], TopUI_ViewController);
      return TopUI_ViewController;
    }(cc.Component);
    exports.default = TopUI_ViewController;
    cc._RF.pop();
  }, {
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist"
  } ],
  UI_interface_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7e7e0NTBtdJKrjASCkK+gWV", "UI_interface_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AudioManager_alchemist_1 = require("../Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("../Audio/AudioType_alchemist");
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameServer_alchemist_1 = require("../FakeServer/GameServer_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var RemoteAssetManager_alchemist_1 = require("../RemoteAssetManager_alchemist");
    var AutoPlay_Setting_alchemist_1 = require("./AutoPlay_Setting_alchemist");
    var Bet_Setting_alchemist_1 = require("./Bet_Setting_alchemist");
    var SystemSetting_alchemist_1 = require("./SystemSetting_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UI_interface = function(_super) {
      __extends(UI_interface, _super);
      function UI_interface() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.language_assets = null;
        _this._self = _this;
        _this.LoopTimes = 0;
        _this.pageAuto = null;
        _this.pageSystemSetting = null;
        _this.pageInfo = null;
        _this.pageBet = null;
        _this.btn_Auto = null;
        _this.btn_SystemSetting = null;
        _this.btn_Info = null;
        _this.btn_Bet = null;
        _this.btn_Spin = null;
        _this.btn_Stop = null;
        _this.AutoSetting = null;
        _this.BetSetting = null;
        _this.SystemSetting = null;
        _this.UI_TotalBet = null;
        _this.UI_Credit = null;
        _this.UI_AutoTimes = null;
        _this.top_infobar = null;
        _this.QuickSpinFlag = false;
        _this.UI_title_CREDIT = null;
        _this.UI_title_BET = null;
        _this.PayTablePage_hori = [];
        _this.PayTablePage_verti = [];
        _this.UserPressStopBtn = false;
        _this.currency = "RM";
        _this.message_SpinToWin = "SPIN TO WIN";
        _this.message_GoodLuck = "GOOD LUCK";
        _this.message_TOTALWIN = "TOTAL WIN";
        _this.message_WIN = "WIN";
        _this.OddsTab = [ [] ];
        _this.Update_UI = function() {
          _this.UI_TotalBet.string = "" + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet());
          _this.UI_Credit.string = "" + GameServer_alchemist_1.default.self.UserCredit.toFixed(2);
          _this.UI_AutoTimes.string = _this.LoopTimes.toString();
          _this.LoopTimes <= 0 && (_this.UI_AutoTimes.string = "");
          if (_this.LoopTimes > 999) {
            _this.UI_AutoTimes.string = "";
            _this.UI_AutoTimes.node.children[0].active = true;
          } else _this.UI_AutoTimes.node.children[0].active = false;
        };
        _this.SmallerTag = false;
        _this.BiggerTag = false;
        return _this;
      }
      UI_interface_1 = UI_interface;
      UI_interface.prototype.onLoad = function() {
        this._self = this.node.getComponent(UI_interface_1);
        UI_interface_1.self = this._self;
      };
      UI_interface.prototype.UI_Interface_init = function() {
        var _this = this;
        UI_interface_1.self = this._self;
        this.OddsTab = GameServer_alchemist_1.default.self.PlayerData.OddsTab;
        console.log(GameServer_alchemist_1.default.self.PlayerData);
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.UpdateUI, this.Update_UI);
        this.btn_Auto.node.on("toggle", function() {
          cc.log("touch");
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.pageAuto.active = _this.btn_Auto.isChecked;
          _this.btn_Auto.isChecked && _this.AutoSetting.init_AutoPlaySetting();
        });
        this.btn_Stop.node.on("click", function() {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.StopWheel();
          false == _this.UserPressStopBtn && AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
          _this.UserPressStopBtn = true;
          _this.LoopTimes = 0;
          GameManager_alchemist_1.default.GM.commonGameBarManager.updateAutoTimes(_this.LoopTimes);
          _this.Update_UI();
          GameManager_alchemist_1.default.GM.DelayTimeTrigger && !GameManager_alchemist_1.default.GM.isFreeGameState && (GameManager_alchemist_1.default.GM.DelayEndTime = GameManager_alchemist_1.default.GM.DelayTime);
        });
        this.btn_SystemSetting.node.on("toggle", function() {
          _this.pageSystemSetting.active = _this.btn_SystemSetting.isChecked;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_Info.node.on("toggle", function() {
          _this.pageInfo.active = true;
          UI_interface_1.self.PayTableDataUpdate(UI_interface_1.self.OddsTab);
          _this.pageSystemSetting.active = _this.btn_SystemSetting.isChecked = false;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.btn_Bet.node.on("toggle", function() {
          _this.pageBet.active = _this.btn_Bet.isChecked;
          AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.CLICK_BUTTON);
        });
        this.AutoSetting.init();
        this.BetSetting.init();
        this.SystemSetting.init();
        this.PayTableInit();
        this.UI_TotalBet.string = "" + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet());
        this.UI_Credit.string = "" + GameServer_alchemist_1.default.self.UserCredit.toFixed(2);
        this.Update_UI();
        GameManager_alchemist_1.default.GM.commonGameBarManager.updateBalanceLabel(GameServer_alchemist_1.default.self.UserCredit);
      };
      UI_interface.prototype.ResetPlayerSetting = function() {
        this.SmallerTag = false;
        this.BiggerTag = false;
        this.AutoSetting.init_AutoPlaySetting();
        this.LoopTimes = 0;
        this.UI_AutoTimes.string = "";
      };
      UI_interface.prototype.SetLanguage = function() {
        var BigTitles = this.pageAuto.getChildByName("Titles");
        var lblComponets = BigTitles.getComponentsInChildren(cc.Label);
        lblComponets[0].string = this.language_assets.AUTOPLAY_SETTINGS;
        lblComponets[1].string = this.language_assets.NUMBER_OF_AUTOSPINS;
        lblComponets[2].string = this.language_assets.AUTOSTOP_SETTINGS;
        this.pageAuto.getChildByName("tgl_bonus").getChildByName("lbl_title").getComponent(cc.Label).string = this.language_assets.BONUS_CONTINUES;
        this.pageAuto.getChildByName("QuickSpin").getChildByName("lbl_title").getComponent(cc.Label).string = this.language_assets.AUTO_QUICK_SPIN;
        this.pageAuto.getChildByName("SkipScreens").getChildByName("title").getComponent(cc.Label).string = this.language_assets.SKIP_SCREENS;
        this.pageAuto.getChildByName("Bigger").getChildByName("title").getComponent(cc.Label).string = this.language_assets.AUTO_CREDIT;
        this.pageAuto.getChildByName("Smaller").getChildByName("title").getComponent(cc.Label).string = this.language_assets.AUTO_CREDIT;
        var str = this.language_assets.START_AUTOPLAY + " (" + this.AutoSetting.times[0].toString() + ")";
        this.pageAuto.getChildByName("Confirm").getChildByName("Background").getChildByName("lbl_looptimes").getComponent(cc.Label).string = str;
        BigTitles = this.pageSystemSetting.getChildByName("Titles");
        BigTitles.getChildByName("QUICK SPIN").getComponent(cc.Label).string = this.language_assets.QUICK_SPIN;
        BigTitles.getChildByName("QUICK SPIN").getComponentInChildren(cc.Label).string = this.language_assets.QUICK_SPIN_INFO;
        BigTitles.getChildByName("SYSTEM SETTINGS").getComponent(cc.Label).string = this.language_assets.SYSTEM_SETTINGS;
        BigTitles.getChildByName("SOUND").getComponent(cc.Label).string = this.language_assets.SOUND;
        BigTitles.getChildByName("SOUND").getComponentInChildren(cc.Label).string = this.language_assets.SOUND_INFO;
        BigTitles.getChildByName("MUSIC").getComponent(cc.Label).string = this.language_assets.MUSIC;
        BigTitles.getChildByName("MUSIC").getComponentInChildren(cc.Label).string = this.language_assets.MUSIC_INFO;
        BigTitles.getChildByName("TOTAL BET").getComponent(cc.Label).string = this.language_assets.TOTAL_BET;
        this.pageSystemSetting.getChildByName("HOME").getChildByName("title_HOME").getComponent(cc.Label).string = this.language_assets.HOME;
        this.pageSystemSetting.getChildByName("tgl_info").getChildByName("title_GAME INFO").getComponent(cc.Label).string = this.language_assets.GAME_INFO;
        this.pageSystemSetting.getChildByName("btn_History").getChildByName("title_History").getComponent(cc.Label).string = this.language_assets.HISTORY;
        this.pageBet.getChildByName("OK").getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = this.language_assets.OK;
        this.pageBet.getChildByName("Titles").getChildByName("title_TOTALBET").getComponent(cc.Label).string = this.language_assets.TOTAL_BET;
        this.UI_title_CREDIT.string = this.language_assets.CREDIT;
        this.UI_title_BET.string = this.language_assets.BET;
        this.message_SpinToWin = this.language_assets.SPIN_TO_WIN;
        this.message_GoodLuck = this.language_assets.GOOD_LUCK;
        this.message_TOTALWIN = this.language_assets.TOTAL_WIN;
        this.message_WIN = this.language_assets.WIN;
        GameManager_alchemist_1.default.GM.TotalBet.string = GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.TotalBet);
        GameManager_alchemist_1.default.GM.language_PAYS = this.language_assets.PAYS;
        GameManager_alchemist_1.default.GM.language_LINE = this.language_assets.LINE;
        UI_interface_1.self.node.getChildByName("congratulateTips").getComponentInChildren(cc.Label).string = this.language_assets.SPIN_TO_WIN;
        var content = this.pageInfo.getChildByName("PageView_hori").getChildByName("pageView").getChildByName("view").getChildByName("content");
        this.PayTableLanguageSetting(content);
        content = this.pageInfo.getChildByName("PageView_verti").getChildByName("pageView").getChildByName("view").getChildByName("content");
        this.PayTableLanguageSetting(content);
        var BuyFreeGameConfirmPage = cc.find("Canvas/Mask/BuyFreeGamePage");
        BuyFreeGameConfirmPage.getChildByName("New Label").getComponent(cc.Label).string = this.language_assets.BuyFreeGameConfirmPage_Tip1;
      };
      UI_interface.prototype.PayTableLanguageSetting = function(content) {
        var page1 = content.getChildByName("page_1");
        page1.getChildByName("text").getComponent(cc.Label).string = this.language_assets.InfoPage1_Tip1;
        page1.getChildByName("title").getComponent(cc.Label).string = this.language_assets.InfoTitle_PayTable;
        var page2 = content.getChildByName("page_2");
        page2.getChildByName("text").getComponent(cc.Label).string = this.language_assets.InfoPage2_Tip1;
        page2.getChildByName("title").getComponent(cc.Label).string = this.language_assets.InfoTitle_PayTable;
        var page3 = content.getChildByName("page_3");
        page3.getChildByName("Tip1_Tittle").getComponent(cc.Label).string = this.language_assets.InfoPage3_Title1;
        page3.getChildByName("Tip1_text").getComponent(cc.Label).string = this.language_assets.InfoPage3_Tip1;
        page3.getChildByName("Tip2_Tittle").getComponent(cc.Label).string = this.language_assets.InfoPage3_Title2;
        page3.getChildByName("Tip2_text").getComponent(cc.Label).string = this.language_assets.InfoPage3_Tip2;
        page3.getChildByName("Tip3_Tittle").getComponent(cc.Label).string = this.language_assets.InfoPage3_Title3;
        page3.getChildByName("Tip3_text").getComponent(cc.Label).string = this.language_assets.InfoPage3_Tip3;
        var page4 = content.getChildByName("page_4");
        page4.getChildByName("Tip1_Tittle").getComponent(cc.Label).string = this.language_assets.InfoPage4_Title1;
        page4.getChildByName("Tip1_text").getComponent(cc.Label).string = this.language_assets.InfoPage4_Tip1;
        page4.getChildByName("Tip2_Tittle").getComponent(cc.Label).string = this.language_assets.InfoPage4_Title2;
        page4.getChildByName("Tip2_text").getComponent(cc.Label).string = this.language_assets.InfoPage4_Tip2;
        var startpage = cc.find("Canvas/Mask/GameIntroduced");
        startpage.getChildByName("hori").getChildByName("1").getComponentInChildren(cc.Label).string = this.language_assets.StartPage1_Tip1;
        startpage.getChildByName("hori").getChildByName("2").getComponentInChildren(cc.Label).string = this.language_assets.StartPage2_Tip1;
        startpage.getChildByName("verti").getChildByName("1").getComponentInChildren(cc.Label).string = this.language_assets.StartPage1_Tip1;
        startpage.getChildByName("verti").getChildByName("2").getComponentInChildren(cc.Label).string = this.language_assets.StartPage2_Tip1;
      };
      UI_interface.prototype.PayTableInit = function() {
        var content = this.pageInfo.getChildByName("PageView_hori").getChildByName("pageView").getChildByName("view").getChildByName("content");
        var contentChild = content.getChildByName("page_1").children;
        for (var i = 0; i < 4; i++) {
          if ("text" == contentChild[i].name) continue;
          if ("title" == contentChild[i].name) continue;
          this.PayTablePage_hori.push(contentChild[i]);
        }
        contentChild = content.getChildByName("page_2").children;
        for (var i = 0; i < 5; i++) {
          if ("text" == contentChild[i].name) continue;
          if ("title" == contentChild[i].name) continue;
          this.PayTablePage_hori.push(contentChild[i]);
        }
        var Page3 = content.getChildByName("page_3");
        Page3.getChildByName("Tip1_icon").getComponent(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_11");
        Page3.getChildByName("Tip2_icon").getComponent(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_13");
        var contentVerti = this.pageInfo.getChildByName("PageView_verti").getChildByName("pageView").getChildByName("view").getChildByName("content");
        contentChild = contentVerti.getChildByName("page_1").children;
        for (var i = 0; i < 4; i++) {
          if ("text" == contentChild[i].name) continue;
          if ("title" == contentChild[i].name) continue;
          this.PayTablePage_verti.push(contentChild[i]);
        }
        contentChild = contentVerti.getChildByName("page_2").children;
        for (var i = 0; i < 5; i++) {
          if ("text" == contentChild[i].name) continue;
          if ("title" == contentChild[i].name) continue;
          this.PayTablePage_verti.push(contentChild[i]);
        }
        Page3 = contentVerti.getChildByName("page_3");
        Page3.getChildByName("Tip1_icon").getComponent(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_11");
        Page3.getChildByName("Tip2_icon").getComponent(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_13");
        this.PayTableDatainit(this.OddsTab);
      };
      UI_interface.prototype.PayTableDatainit = function(_OddTab) {
        var StaticSymbols = [];
        for (var i = 0; i < 9; i++) StaticSymbols.push(RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("symbol_" + i));
        for (var i = 0; i < this.PayTablePage_hori.length; i++) {
          var currentPayTableSymbolParent = this.PayTablePage_hori[i];
          currentPayTableSymbolParent.getChildByName("x5").getComponent(cc.Label).string = "X5  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][4]);
          currentPayTableSymbolParent.getChildByName("x4").getComponent(cc.Label).string = "X4  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][3]);
          currentPayTableSymbolParent.getChildByName("x3").getComponent(cc.Label).string = "X3  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][2]);
          currentPayTableSymbolParent.getChildByName("Symbol").getComponent(cc.Sprite).spriteFrame = StaticSymbols[i];
        }
        for (var i = 0; i < this.PayTablePage_verti.length; i++) {
          var currentPayTableSymbolParent = this.PayTablePage_verti[i];
          currentPayTableSymbolParent.getChildByName("x5").getComponent(cc.Label).string = "X5  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][4]);
          currentPayTableSymbolParent.getChildByName("x4").getComponent(cc.Label).string = "X4  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][3]);
          currentPayTableSymbolParent.getChildByName("x3").getComponent(cc.Label).string = "X3  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[i][2]);
          currentPayTableSymbolParent.getChildByName("Symbol").getComponent(cc.Sprite).spriteFrame = StaticSymbols[i];
        }
      };
      UI_interface.prototype.PayTableDataUpdate = function(_OddTab) {
        this.PayTablePage_hori.forEach(function(PayTableSymbolParent, idx) {
          PayTableSymbolParent.getChildByName("x5").getComponent(cc.Label).string = "X5  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][4]);
          PayTableSymbolParent.getChildByName("x4").getComponent(cc.Label).string = "X4  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][3]);
          PayTableSymbolParent.getChildByName("x3").getComponent(cc.Label).string = "X3  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][2]);
        });
        this.PayTablePage_verti.forEach(function(PayTableSymbolParent, idx) {
          PayTableSymbolParent.getChildByName("x5").getComponent(cc.Label).string = "X5  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][4]);
          PayTableSymbolParent.getChildByName("x4").getComponent(cc.Label).string = "X4  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][3]);
          PayTableSymbolParent.getChildByName("x3").getComponent(cc.Label).string = "X3  " + GameManager_alchemist_1.default.toStringThousandth(GameServer_alchemist_1.default.self.getTotalBet() * _OddTab[idx][2]);
        });
      };
      var UI_interface_1;
      UI_interface.self = null;
      __decorate([ property(cc.Node) ], UI_interface.prototype, "pageAuto", void 0);
      __decorate([ property(cc.Node) ], UI_interface.prototype, "pageSystemSetting", void 0);
      __decorate([ property(cc.Node) ], UI_interface.prototype, "pageInfo", void 0);
      __decorate([ property(cc.Node) ], UI_interface.prototype, "pageBet", void 0);
      __decorate([ property(cc.Toggle) ], UI_interface.prototype, "btn_Auto", void 0);
      __decorate([ property(cc.Toggle) ], UI_interface.prototype, "btn_SystemSetting", void 0);
      __decorate([ property(cc.Toggle) ], UI_interface.prototype, "btn_Info", void 0);
      __decorate([ property(cc.Toggle) ], UI_interface.prototype, "btn_Bet", void 0);
      __decorate([ property(cc.Button) ], UI_interface.prototype, "btn_Spin", void 0);
      __decorate([ property(cc.Button) ], UI_interface.prototype, "btn_Stop", void 0);
      __decorate([ property(AutoPlay_Setting_alchemist_1.default) ], UI_interface.prototype, "AutoSetting", void 0);
      __decorate([ property(Bet_Setting_alchemist_1.default) ], UI_interface.prototype, "BetSetting", void 0);
      __decorate([ property(SystemSetting_alchemist_1.default) ], UI_interface.prototype, "SystemSetting", void 0);
      __decorate([ property(cc.Label) ], UI_interface.prototype, "UI_TotalBet", void 0);
      __decorate([ property(cc.Label) ], UI_interface.prototype, "UI_Credit", void 0);
      __decorate([ property(cc.Label) ], UI_interface.prototype, "UI_AutoTimes", void 0);
      __decorate([ property(cc.Node) ], UI_interface.prototype, "top_infobar", void 0);
      __decorate([ property(cc.Label) ], UI_interface.prototype, "UI_title_CREDIT", void 0);
      __decorate([ property(cc.Label) ], UI_interface.prototype, "UI_title_BET", void 0);
      UI_interface = UI_interface_1 = __decorate([ ccclass ], UI_interface);
      return UI_interface;
    }(cc.Component);
    exports.default = UI_interface;
    cc._RF.pop();
  }, {
    "../Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "../Audio/AudioType_alchemist": "AudioType_alchemist",
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "../RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist",
    "./AutoPlay_Setting_alchemist": "AutoPlay_Setting_alchemist",
    "./Bet_Setting_alchemist": "Bet_Setting_alchemist",
    "./SystemSetting_alchemist": "SystemSetting_alchemist"
  } ],
  WheelManager_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da755vlgwlJB6VgCAOceQ87", "WheelManager_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var Roller_alchemist_1 = require("./Roller_alchemist");
    var RewardData_alchemist_1 = require("./UI/RewardData_alchemist");
    var GameServer_alchemist_1 = require("./FakeServer/GameServer_alchemist");
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var UI_interface_alchemist_1 = require("./UI/UI_interface_alchemist");
    var PayLineData_alchemist_1 = require("./PayLineData_alchemist");
    var RemoteAssetManager_alchemist_1 = require("./RemoteAssetManager_alchemist");
    var WildLock_alchemist_1 = require("./WildLock_alchemist");
    var payline_reset_alchemist_1 = require("./payline_reset_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WheelManager_alchemist = function(_super) {
      __extends(WheelManager_alchemist, _super);
      function WheelManager_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Rollers = [];
        _this.FG_WildLock = null;
        _this.dropBookCount = 0;
        _this.anim_rollers = [];
        _this.SpineDatas = [];
        _this.symbol_spineComponet_FormatToServerResult = [];
        _this.ListenEffectSpine = null;
        _this.ListenFreeGameEffect = [];
        _this.Max_RewardLine = 60;
        _this.PayLineTable = [ [ 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 2 ], [ 0, 0, 0, 0, 3 ], [ 0, 0, 1, 0, 0 ], [ 0, 0, 2, 0, 0 ], [ 0, 0, 3, 0, 0 ], [ 0, 1, 2, 3, 2 ], [ 0, 0, 1, 2, 3 ], [ 0, 3, 2, 1, 0 ], [ 0, 3, 0, 3, 0 ], [ 0, 2, 0, 2, 0 ], [ 0, 1, 0, 1, 0 ], [ 0, 3, 3, 3, 0 ], [ 0, 2, 2, 2, 0 ], [ 1, 1, 1, 1, 1 ], [ 1, 1, 1, 1, 0 ], [ 1, 1, 1, 1, 2 ], [ 1, 1, 1, 1, 3 ], [ 1, 1, 0, 1, 1 ], [ 1, 1, 2, 1, 1 ], [ 1, 1, 3, 1, 1 ], [ 1, 2, 3, 2, 1 ], [ 1, 0, 1, 0, 1 ], [ 1, 0, 1, 2, 3 ], [ 1, 2, 1, 0, 1 ], [ 1, 3, 1, 3, 1 ], [ 1, 3, 3, 3, 1 ], [ 1, 2, 2, 2, 1 ], [ 1, 0, 0, 0, 1 ], [ 2, 2, 2, 2, 2 ], [ 2, 2, 2, 2, 3 ], [ 2, 2, 2, 2, 1 ], [ 2, 2, 2, 2, 0 ], [ 2, 2, 3, 2, 2 ], [ 2, 2, 1, 2, 2 ], [ 2, 2, 0, 2, 2 ], [ 2, 1, 0, 1, 2 ], [ 2, 3, 2, 3, 2 ], [ 2, 3, 2, 1, 0 ], [ 2, 1, 2, 3, 2 ], [ 2, 0, 2, 0, 2 ], [ 2, 0, 0, 0, 2 ], [ 2, 1, 1, 1, 2 ], [ 2, 3, 3, 3, 2 ], [ 3, 3, 3, 3, 3 ], [ 3, 3, 3, 3, 0 ], [ 3, 3, 3, 3, 1 ], [ 3, 3, 3, 3, 2 ], [ 3, 3, 0, 3, 3 ], [ 3, 3, 1, 3, 3 ], [ 3, 3, 2, 3, 3 ], [ 3, 2, 1, 0, 1 ], [ 3, 3, 2, 1, 0 ], [ 3, 0, 1, 2, 3 ], [ 3, 0, 3, 0, 3 ], [ 3, 1, 3, 1, 3 ], [ 3, 2, 3, 2, 3 ], [ 3, 0, 0, 0, 3 ], [ 3, 1, 1, 1, 3 ] ];
        _this.Nodes_WildExpand = [];
        _this.PayLine_Lines_textures = [];
        _this.PayLineGroup = [];
        _this.TopRowQueen = [ false, false, false, false, false ];
        _this.PayLineDatas = [];
        _this.ScatterCollectCount = 0;
        _this.static_Symbol = [];
        _this.ShinyMaterial = null;
        return _this;
      }
      WheelManager_alchemist.prototype.onLoad = function() {
        var _this = this;
        this.anim_rollers = this.node.getChildByName("EffectSymbol_Sprite").children;
        var AxisParent = this.node.getChildByName("Mask").getChildByName("Slot");
        AxisParent.getChildByName("axis1").getComponent(cc.Layout).enabled = false;
        AxisParent.getChildByName("axis2").getComponent(cc.Layout).enabled = false;
        AxisParent.getChildByName("axis3").getComponent(cc.Layout).enabled = false;
        AxisParent.getChildByName("axis4").getComponent(cc.Layout).enabled = false;
        AxisParent.getChildByName("axis5").getComponent(cc.Layout).enabled = false;
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.AssetLoaded, function() {
          _this.WheelManager_init();
        });
      };
      WheelManager_alchemist.prototype.WheelManager_init = function() {
        var _this = this;
        cc.log("GameState->WheelManager Init");
        this.Define_Axis_Transform40Line_staticSymbol();
        this.Define_Axis_Transform40Line_anim();
        this.PayLine_Lines_LoadedTextures();
        for (var i = 0; i <= 12; i++) {
          var texture2D = RemoteAssetManager_alchemist_1.default.self.getAsset("symbol_" + i);
          var img = new cc.SpriteFrame(texture2D);
          img.name = "symbol_" + i;
          this.static_Symbol.push(img);
        }
        var EffectParent = cc.find("Canvas/Mask/WheelManager/EffectSymbol_Sprite");
        for (var index = 0; index < EffectParent.children.length; index++) for (var j = 1; j < 5; j++) {
          var anim = EffectParent.children[index].children[j].getComponent(sp.Skeleton);
          this.symbol_spineComponet_FormatToServerResult.push(anim);
        }
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("H1"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("H2"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("H3"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("H4"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("L1"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("L2"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("L3"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("L4"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("L5"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("Wild"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("Wild"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("Wild"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("Wild"));
        this.SpineDatas.push(RemoteAssetManager_alchemist_1.default.self.getSpine("Scatter"));
        this.ListenEffectSpine = RemoteAssetManager_alchemist_1.default.self.getSpine("Anticipation");
        this.node.getChildByName("listenFreeGameEffect").children.forEach(function(child, idx) {
          child.getComponent(sp.Skeleton).skeletonData = _this.ListenEffectSpine;
          _this.ListenFreeGameEffect[idx] = child.getComponent(sp.Skeleton);
        });
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.BackToNormal, function() {
          _this.resetStopPara();
        });
      };
      WheelManager_alchemist.prototype.Define_Axis_Transform40Line_staticSymbol = function() {
        for (var LineIdx = 0; LineIdx < this.PayLineTable.length; LineIdx++) {
          var _payline = [];
          for (var NodeIdx = 0; NodeIdx < this.PayLineTable[LineIdx].length; NodeIdx++) _payline.push(this.Rollers[NodeIdx].Column_Symbols[this.PayLineTable[LineIdx][NodeIdx] + 1]);
          this.PayLineDatas.push(new PayLineData_alchemist_1.default());
          this.PayLineDatas[LineIdx].LineNodes = _payline;
        }
        cc.log("GameState->AxisTransform40Line");
      };
      WheelManager_alchemist.prototype.Define_Axis_Transform40Line_anim = function() {
        for (var LineIdx = 0; LineIdx < this.PayLineTable.length; LineIdx++) {
          var effect_spine = [];
          for (var j = 0; j < this.PayLineTable[LineIdx].length; j++) {
            var spine = this.anim_rollers[j].children[this.PayLineTable[LineIdx][j] + 1].getComponent(sp.Skeleton);
            effect_spine.push(spine);
          }
          this.PayLineDatas[LineIdx].LineEffects = effect_spine;
        }
        cc.log("GameState->EffectLineinit");
      };
      WheelManager_alchemist.prototype.PayLineChecker = function() {
        var RewardDatas = [];
        var result = GameServer_alchemist_1.default.self.ServerResult;
        var _index = GameServer_alchemist_1.default.self.ServerDataIndex;
        if (null != result[_index]["LineNumber"]) {
          var Length = Object.keys(result[_index]["LineNumber"]).length;
          for (var i = 0; i < Length; i++) {
            var Data = new RewardData_alchemist_1.default();
            Data.whichLine = result[_index]["LineNumber"][i];
            Data.howmany = result[_index]["LineEffectCount"][i];
            Data.Symbol_ID = result[_index]["SymbolNumber"][i];
            Data.LineAward = result[_index]["LineScore"][i];
            RewardDatas.push(Data);
          }
        }
        GameManager_alchemist_1.default.GM.SaveGameResultData(RewardDatas);
        var hasPlus = this.FreeGameCheckTimePlus();
        return RewardDatas;
      };
      WheelManager_alchemist.prototype.CompareSymbol = function(Datas) {
        EventSystem_alchemist_1.EventSystem_alchemist.emit(this.node, EventSystem_alchemist_1.EventType_alchemist.CheckBigWin);
      };
      WheelManager_alchemist.prototype.ServerResultFormatTo4x5 = function(_whichLine) {
        var WheelResult = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["betNumber"];
        var Table = [ [], [], [], [] ];
        Table[0][0] = WheelResult[0];
        Table[1][0] = WheelResult[1];
        Table[2][0] = WheelResult[2];
        Table[3][0] = WheelResult[3];
        Table[0][1] = WheelResult[4];
        Table[1][1] = WheelResult[5];
        Table[2][1] = WheelResult[6];
        Table[3][1] = WheelResult[7];
        Table[0][2] = WheelResult[8];
        Table[1][2] = WheelResult[9];
        Table[2][2] = WheelResult[10];
        Table[3][2] = WheelResult[11];
        Table[0][3] = WheelResult[12];
        Table[1][3] = WheelResult[13];
        Table[2][3] = WheelResult[14];
        Table[3][3] = WheelResult[15];
        Table[0][4] = WheelResult[16];
        Table[1][4] = WheelResult[17];
        Table[2][4] = WheelResult[18];
        Table[3][4] = WheelResult[19];
        var Array_Symbol_ID = [];
        for (var i = 0; i < 5; i++) {
          var LineQuene = this.PayLineTable[_whichLine - 1][i];
          Array_Symbol_ID.push(Table[LineQuene][i] - 1);
        }
        return Array_Symbol_ID;
      };
      WheelManager_alchemist.prototype.ShowAllPayLine = function(Datas) {
        var lbl_freetimeleft = GameManager_alchemist_1.default.GM.userUI.top_infobar.getChildByName("lbl_FreeSpinLeft").getComponent(cc.Label);
        lbl_freetimeleft.string = "";
        GameManager_alchemist_1.default.GM.congratulateTips.string = "";
        var needTurnOffSymbol = [];
        0 != Datas.length && this.PayLineDatas.forEach(function(Data) {
          Data.LineNodes.forEach(function(node) {
            node.opacity = 100;
          });
        });
        if (0 == Datas.length) {
          cc.log("\u6c92\u4e2d\u734e");
          this.CompareSymbol(GameManager_alchemist_1.default.GM.saveGameResult);
          return;
        }
        var WinLine_SoundType = AudioType_alchemist_1.SoundType_alchemist.WinLine;
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(WinLine_SoundType);
        for (var i = 0; i < Datas.length; i++) {
          GameManager_alchemist_1.default.GM.RewardMarqueen.activeShowAllPayLine();
          cc.log("GameState->onPayLineEffect");
          needTurnOffSymbol.forEach(function(node) {
            node.active = false;
          });
        }
        if (GameManager_alchemist_1.default.GM.isFreeGameState) {
          GameManager_alchemist_1.default.GM.anim_WinScore(true);
          GameManager_alchemist_1.default.GM.setRoundScore(GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["TotalWin"]);
          GameManager_alchemist_1.default.GM.DelayEndTime = 2;
          GameManager_alchemist_1.default.GM.DelayTimeTrigger = true;
        } else {
          GameManager_alchemist_1.default.GM.anim_WinScore(true);
          0 != GameManager_alchemist_1.default.GM.userUI.LoopTimes ? GameManager_alchemist_1.default.GM.DelayEndTime = 2 : GameManager_alchemist_1.default.GM.DelayEndTime = 0;
          GameManager_alchemist_1.default.GM.DelayTimeTrigger = true;
        }
        GameManager_alchemist_1.default.GM.setScore(GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["TotalWin"]);
        this.scheduleOnce(function() {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.CompareSymbol(GameManager_alchemist_1.default.GM.saveGameResult);
        }, GameManager_alchemist_1.default.GM.DelayEndTime);
      };
      WheelManager_alchemist.prototype.FreeGameCheckTimePlus = function() {
        if (void 0 == GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["FreeGamePlus"]) return false;
        var hasFreePlus = GameServer_alchemist_1.default.self.ServerResult[GameServer_alchemist_1.default.self.ServerDataIndex]["FreeGamePlus"];
        return hasFreePlus;
      };
      WheelManager_alchemist.prototype.onShowFreeGamePlus = function() {
        var _this = this;
        AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.FreeGamePlus);
        var plus2 = GameManager_alchemist_1.default.GM.FreeGamePlus2CutScene;
        var anim = plus2.getChildByName("Extra-Free-Spins").getComponent(sp.Skeleton);
        plus2.active = true;
        anim.setAnimation(0, "Intro", false);
        anim.addAnimation(0, "Loop", false);
        var track = anim.addAnimation(0, "Outro", false);
        anim.setTrackCompleteListener(track, function() {
          plus2.active = false;
          EventSystem_alchemist_1.EventSystem_alchemist.emit(_this.node, EventSystem_alchemist_1.EventType_alchemist.FreeGameState);
          anim.setTrackCompleteListener(anim, null);
        });
      };
      WheelManager_alchemist.prototype.PayLineEffect = function(Data, needTurnOffSymbol, symbolID, isSingleLine) {
        void 0 === isSingleLine && (isSingleLine = false);
        var WinLine = this.PayLineDatas[Data.whichLine - 1].LineNodes;
        var light = Data.howmany;
        this.Rollers.forEach(function(roller) {
          roller.Column_Symbols.forEach(function(Node_Symbol) {
            Node_Symbol.active = true;
          });
        });
        if (isSingleLine) {
          var effectChild = this.node.getChildByName("EffectSymbol_Sprite").children;
          for (var i = 0; i < 5; i++) for (var j = 1; j < 5; j++) effectChild[i].children[j].active = false;
        }
        for (var effect = 0; effect < light; effect++) {
          this.PayLineDatas[Data.whichLine - 1].LineEffects[effect].node.active = true;
          this.PayLineDatas[Data.whichLine - 1].LineEffects[effect].skeletonData = this.SpineDatas[symbolID[effect]];
          var animName = "";
          switch (symbolID[effect]) {
           case 9:
            animName = GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Wildx1;
            break;

           case 10:
            animName = GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Wildx2;
            break;

           case 11:
            animName = GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Wildx3;
            break;

           case 12:
            animName = GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Wildx5;
            break;

           default:
            animName = GameManager_alchemist_1.BackgroundSpineEnum_alchemist.Symbol_Win;
          }
          this.PayLineDatas[Data.whichLine - 1].LineEffects[effect].setAnimation(0, animName, true);
          this.PayLineDatas[Data.whichLine - 1].LineEffects[effect].node.opacity = 255;
        }
        if (!isSingleLine) for (var i = 0; i < light; i++) needTurnOffSymbol.push(WinLine[i]);
        console.log("needTurnOffSymbol=>\n" + needTurnOffSymbol);
      };
      WheelManager_alchemist.prototype.StopWheel = function() {
        this.Rollers.forEach(function(roller) {
          roller.m_stoped = true;
        });
      };
      WheelManager_alchemist.prototype.resetStopPara = function() {
        this.Rollers.forEach(function(roller) {
          roller.m_stoped = UI_interface_alchemist_1.default.self.QuickSpinFlag && !GameManager_alchemist_1.default.GM.isFreeGameState;
        });
      };
      WheelManager_alchemist.prototype.PayLine_Lines_LoadedTextures = function() {
        var _this = this;
        var ParentNode = this.node.getChildByName("PayLine_Lines");
        var CreateSpr_in_PayLineNodes = function(MaxCount, ParentNode) {
          for (var i = 0; i < MaxCount; i++) {
            var newNode = new cc.Node("payline" + i);
            var spr = newNode.addComponent(cc.Sprite);
            newNode.parent = ParentNode;
            _this.PayLineGroup.push(newNode);
            _this.PayLineGroup[i].getComponent(cc.Sprite).trim = true;
            _this.PayLineGroup[i].getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.TRIMMED;
            _this.PayLineGroup[i].getComponent(cc.Sprite).spriteFrame = RemoteAssetManager_alchemist_1.default.self.getSpriteFrame("payline_" + i);
            _this.PayLineGroup[i].setPosition(0, 0);
          }
        };
        var CreateSpine_in_PayLineNodes = function(MaxCount, ParentNode) {
          var spineFile = RemoteAssetManager_alchemist_1.default.self.getSpine("payline");
          for (var i = 0; i < MaxCount; i++) {
            var newNode = new cc.Node("payline" + i);
            var spineComp = newNode.addComponent(sp.Skeleton);
            spineComp.addComponent(payline_reset_alchemist_1.default);
            newNode.parent = ParentNode;
            _this.PayLineGroup.push(newNode);
            _this.PayLineGroup[i].getComponent(sp.Skeleton).skeletonData = spineFile;
            _this.PayLineGroup[i].getComponent(sp.Skeleton).premultipliedAlpha = false;
            _this.PayLineGroup[i].getComponent(sp.Skeleton).defaultAnimation = "win/payline_" + (i + 1);
            _this.PayLineGroup[i].getComponent(payline_reset_alchemist_1.default).LineAnimIndex = "win/payline_" + (i + 1);
            _this.PayLineGroup[i].getComponent(sp.Skeleton).setAnimation(0, "win/payline_" + (i + 1), true);
            _this.PayLineGroup[i].setPosition(0, 0);
          }
        };
        CreateSpine_in_PayLineNodes(60, ParentNode);
        this.PayLine_Lines_DisableAll();
      };
      WheelManager_alchemist.prototype.PayLine_Lines_ShowLine = function(_which_pay_line) {
        console.log("1019_whichPayLine=>\n" + _which_pay_line);
        _which_pay_line <= this.Max_RewardLine && (this.PayLineGroup[_which_pay_line - 1].active = true);
      };
      WheelManager_alchemist.prototype.PayLine_Lines_DisableAll = function() {
        this.PayLineGroup.forEach(function(all_line) {
          all_line.active = false;
        });
      };
      __decorate([ property([ Roller_alchemist_1.default ]) ], WheelManager_alchemist.prototype, "Rollers", void 0);
      __decorate([ property(WildLock_alchemist_1.default) ], WheelManager_alchemist.prototype, "FG_WildLock", void 0);
      __decorate([ property(cc.Material) ], WheelManager_alchemist.prototype, "ShinyMaterial", void 0);
      WheelManager_alchemist = __decorate([ ccclass ], WheelManager_alchemist);
      return WheelManager_alchemist;
    }(cc.Component);
    exports.default = WheelManager_alchemist;
    cc._RF.pop();
  }, {
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./FakeServer/GameServer_alchemist": "GameServer_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./PayLineData_alchemist": "PayLineData_alchemist",
    "./RemoteAssetManager_alchemist": "RemoteAssetManager_alchemist",
    "./Roller_alchemist": "Roller_alchemist",
    "./UI/RewardData_alchemist": "RewardData_alchemist",
    "./UI/UI_interface_alchemist": "UI_interface_alchemist",
    "./WildLock_alchemist": "WildLock_alchemist",
    "./payline_reset_alchemist": "payline_reset_alchemist"
  } ],
  Wheel_ViewController_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b55c53O7pBHsbbe1ybHUpWE", "Wheel_ViewController_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("../EventSystem_alchemist");
    var GameManager_alchemist_1 = require("../GameManager_alchemist");
    var CommonUI_ViewController_alchemist_1 = require("./CommonUI_ViewController_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Wheel_ViewController = function(_super) {
      __extends(Wheel_ViewController, _super);
      function Wheel_ViewController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.PayLine_Group = null;
        _this.other_commonUI_PanleLayoutSetting = function() {
          if (GameManager_alchemist_1.default.GM.currentGameScreenLayout == GameManager_alchemist_1.GameScreenLayout_alchemist.Horizontal) {
            _this.PayLine_Group.setScale(1);
            _this.PayLine_Group.setPosition(0, 0);
          } else {
            _this.PayLine_Group.setScale(.7);
            _this.PayLine_Group.setPosition(0, 235);
          }
        };
        return _this;
      }
      Wheel_ViewController.prototype.start = function() {
        var _this = this;
        this.PayLine_Group = GameManager_alchemist_1.default.GM.Instance_WheelManager.node.getChildByName("PayLine_Lines");
        this.ingoreNodeName = [ "Symbol_0", "Symbol_1", "Symbol_2", "Symbol_3", "Symbol_4", "Symbol_5", "effect_axis1", "effect_axis2", "effect_axis3", "effect_axis4", "effect_axis5", "PayLine_Lines" ];
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.ScreenChange, function() {
          _this.commonUI_PanleLayoutSetting();
        });
      };
      Wheel_ViewController = __decorate([ ccclass ], Wheel_ViewController);
      return Wheel_ViewController;
    }(CommonUI_ViewController_alchemist_1.default);
    exports.default = Wheel_ViewController;
    cc._RF.pop();
  }, {
    "../EventSystem_alchemist": "EventSystem_alchemist",
    "../GameManager_alchemist": "GameManager_alchemist",
    "./CommonUI_ViewController_alchemist": "CommonUI_ViewController_alchemist"
  } ],
  WildLock_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7a4fcY8J5lLLKepEcHMlP5J", "WildLock_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WildAnimName = void 0;
    var AudioManager_alchemist_1 = require("./Audio/AudioManager_alchemist");
    var AudioType_alchemist_1 = require("./Audio/AudioType_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var Roller_alchemist_1 = require("./Roller_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var WildLock_alchemist = function(_super) {
      __extends(WildLock_alchemist, _super);
      function WildLock_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Wilds = [];
        _this.WildLockList = [];
        _this.temp_FreeGameLastResult = [];
        _this.updateFreeGameWildList = function(ListIdx, symbol_id) {
          var name = "";
          switch (symbol_id) {
           case Roller_alchemist_1.Symbol_ID.Wild:
            name = WildAnimName.Wild;
            break;

           case Roller_alchemist_1.Symbol_ID.Wildx2:
            name = WildAnimName.Wildx2;
            break;

           case Roller_alchemist_1.Symbol_ID.Wildx3:
            name = WildAnimName.Wildx3;
          }
          if ("" != name) {
            if (255 != _this.Wilds[ListIdx].node.opacity) {
              _this.Wilds[ListIdx].setAnimation(0, name, false);
              AudioManager_alchemist_1.AudioManager_alchemist.playSound(AudioType_alchemist_1.SoundType_alchemist.WildStick);
            }
            _this.Wilds[ListIdx].node.opacity = 255;
            _this.WildLockList[ListIdx] = true;
          }
        };
        _this.resetFreeGameWildList = function() {
          GameManager_alchemist_1.default.GM.Instance_WheelManager.Rollers.forEach(function(roller) {
            console.log(roller.ColumnData);
          });
          for (var idx_roll = 0; idx_roll < 5; idx_roll++) for (var symbol_position = 1; symbol_position < 5; symbol_position++) GameManager_alchemist_1.default.GM.Instance_WheelManager.Rollers[idx_roll].ColumnData[symbol_position] = _this.temp_FreeGameLastResult.shift() - 1;
          GameManager_alchemist_1.default.GM.Instance_WheelManager.Rollers.forEach(function(roller) {
            roller.updateSymbols_FreeGamelastResult();
          });
          _this.Wilds.forEach(function(wild) {
            wild.node.opacity = 0;
          });
          for (var i = 0; i < 20; i++) _this.WildLockList[i] = false;
        };
        return _this;
      }
      WildLock_alchemist.prototype.FreeGameWildinit = function() {
        var WildAxisParent = GameManager_alchemist_1.default.GM.Instance_WheelManager.node.getChildByName("Wilds_Lock");
        var WildAxis = WildAxisParent.children;
        console.log(WildAxis);
        for (var idx = 0; idx < WildAxis.length; idx++) for (var j = 0; j < WildAxis[idx].children.length; j++) {
          var Axis = WildAxis[idx].children[j].getComponent(sp.Skeleton);
          Axis.node.opacity = 0;
          this.Wilds.push(Axis);
        }
        for (var i = 0; i < 20; i++) this.WildLockList.push(false);
      };
      WildLock_alchemist = __decorate([ ccclass ], WildLock_alchemist);
      return WildLock_alchemist;
    }(cc.Component);
    exports.default = WildLock_alchemist;
    var WildAnimName;
    (function(WildAnimName) {
      WildAnimName["Wild"] = "Win";
      WildAnimName["Wildx2"] = "Win_x2";
      WildAnimName["Wildx3"] = "Win_x3";
    })(WildAnimName = exports.WildAnimName || (exports.WildAnimName = {}));
    cc._RF.pop();
  }, {
    "./Audio/AudioManager_alchemist": "AudioManager_alchemist",
    "./Audio/AudioType_alchemist": "AudioType_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./Roller_alchemist": "Roller_alchemist"
  } ],
  Wildaccumulated_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e15d4s7BuxB/bjSrRKJWaRg", "Wildaccumulated_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventSystem_alchemist_1 = require("./EventSystem_alchemist");
    var GameManager_alchemist_1 = require("./GameManager_alchemist");
    var Roller_alchemist_1 = require("./Roller_alchemist");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Wildaccumulated_alchemist = function(_super) {
      __extends(Wildaccumulated_alchemist, _super);
      function Wildaccumulated_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Title = null;
        _this.lbl_num = null;
        _this._num = 0;
        _this.CheckFreeGameWildAccumulated = function(BetNumber) {
          console.log(BetNumber);
          if (GameManager_alchemist_1.default.GM.isFreeGameState) {
            var count_1 = 0;
            BetNumber.forEach(function(Symbol) {
              Symbol >= Roller_alchemist_1.Symbol_ID.Wild && count_1++;
            });
            _this.num += count_1;
          }
        };
        _this.ResetCount = function() {
          _this.num = 0;
        };
        _this.DisplayUI = function(bool) {
          _this.node.opacity = bool ? 255 : 0;
          bool && _this.ResetCount();
        };
        return _this;
      }
      Object.defineProperty(Wildaccumulated_alchemist.prototype, "num", {
        get: function() {
          return this._num;
        },
        set: function(v) {
          this._num = v;
          this.lbl_num.string = this._num.toString();
        },
        enumerable: false,
        configurable: true
      });
      Wildaccumulated_alchemist.prototype.init = function() {
        this.Title = this.node.getChildByName("Title").getComponent(cc.Label);
        this.lbl_num = this.node.getChildByName("num").getComponent(cc.Label);
        EventSystem_alchemist_1.EventSystem_alchemist.on(EventSystem_alchemist_1.EventType_alchemist.FreeGameCheckWildAccumulated, this.CheckFreeGameWildAccumulated);
        this.DisplayUI(false);
      };
      Wildaccumulated_alchemist = __decorate([ ccclass ], Wildaccumulated_alchemist);
      return Wildaccumulated_alchemist;
    }(cc.Component);
    exports.default = Wildaccumulated_alchemist;
    cc._RF.pop();
  }, {
    "./EventSystem_alchemist": "EventSystem_alchemist",
    "./GameManager_alchemist": "GameManager_alchemist",
    "./Roller_alchemist": "Roller_alchemist"
  } ],
  cryptor: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "eb287ow3m9BAZKZ66/G4LgO", "cryptor");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var CryptoJS = require("crypto-js");
    var Cryptor = function(_super) {
      __extends(Cryptor, _super);
      function Cryptor(passwd) {
        var _this = _super.call(this) || this;
        _this.secret = null;
        _this.secret = passwd;
        return _this;
      }
      Cryptor.prototype.encrypt = function(src) {
        if (null == this.secret) return src;
        var encryptedData = CryptoJS.AES.encrypt(src, CryptoJS.enc.Utf8.parse(this.secret), {
          iv: CryptoJS.enc.Utf8.parse(this.secret),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        });
        return encryptedData.toString();
      };
      Cryptor.prototype.decrypt = function(encryped) {
        if (null == this.secret) return encryped;
        var result = CryptoJS.AES.decrypt(encryped, CryptoJS.enc.Utf8.parse(this.secret), {
          iv: CryptoJS.enc.Utf8.parse(this.secret),
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        });
        return result.toString(CryptoJS.enc.Utf8);
      };
      return Cryptor;
    }(cc.Component);
    exports.default = Cryptor;
    cc._RF.pop();
  }, {
    "crypto-js": 12
  } ],
  payline_reset_alchemist: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fab71CZHnpNpYMsxds0+fix", "payline_reset_alchemist");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var payline_reset_alchemist = function(_super) {
      __extends(payline_reset_alchemist, _super);
      function payline_reset_alchemist() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.LineAnimIndex = "";
        _this.SpineComp = null;
        return _this;
      }
      payline_reset_alchemist.prototype.start = function() {
        this.SpineComp = this.node.getComponent(sp.Skeleton);
      };
      payline_reset_alchemist.prototype.onEnable = function() {
        null != this.SpineComp && this.SpineComp.setAnimation(0, this.LineAnimIndex, true);
      };
      payline_reset_alchemist.prototype.onDisable = function() {
        if (null != this.SpineComp) {
          this.SpineComp.clearTracks();
          this.SpineComp.setToSetupPose();
        }
      };
      payline_reset_alchemist = __decorate([ ccclass ], payline_reset_alchemist);
      return payline_reset_alchemist;
    }(cc.Component);
    exports.default = payline_reset_alchemist;
    cc._RF.pop();
  }, {} ]
}, {}, [ "LoadBundleScene_alchemist", "AudioManager_alchemist", "AudioType_alchemist", "AxisListManager_alchemist", "BigWinManager_alchemist", "BonusManager_alchemist", "BonusRoller_alchemist", "BoosterController_alchemist", "BubbleNumberJumper_alchemist", "ColorAssembler2D_alchemist", "ButtonControllBase_alchemist", "CommonPopupControlBase_alchemist", "CommonPopupType_alchemist", "CommonAudioUI_alchemist", "CommonAutoButton_alchemist", "CommonAutoUI_alchemist", "CommonBetUI_alchemist", "CommonGameBarControl_alchemist", "CommonGameBarData_alchemist", "CommonGameBarManager_alchemist", "CommonGameBarUtils_alchemist", "CommonGameInfoUI_alchemist", "CommonSpinUI_alchemist", "CommonSymbolInfoUI_alchemist", "CommonTurboUI_alchemist", "CommonUI_ViewController_alchemist", "LoadingPage_ViewController_alchemist", "TopUI_ViewController_alchemist", "Wheel_ViewController_alchemist", "EventSystem_alchemist", "GameServer_alchemist", "FreeAxisManager_alchemist", "FreeSpinDigital_alchemist", "GameManager_alchemist", "CocosUtil_alchemist", "NumImgJumper_alchemist", "NumImgUpdate_alchemist", "PayLineData_alchemist", "RemoteAssetManager_alchemist", "RewardMarqueen_alchemist", "Roller_alchemist", "ServerDataFormat_alchemist", "ServerPortocolManager_alchemist", "ShinyEffect_alchemist", "AutoPlay_Setting_alchemist", "Bet_Setting_alchemist", "Game_Introduced_alchemist", "InfoPage_alchemist", "PayTable_alchemist", "PotionDigital_alchemist", "RewardData_alchemist", "SystemSetting_alchemist", "UI_interface_alchemist", "WheelManager_alchemist", "WildLock_alchemist", "Wildaccumulated_alchemist", "cryptor", "payline_reset_alchemist" ]);