var size;
var num = 0;
var skillnum = [380, 380, 10];
var suu = 0;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();
    var size = cc.director.getWinSize();

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {
    if (this.skillCnt == 1) {

     this.skillParticle(this.skillSelect);
    }
    if ((this.skillCnt % skillnum[suu]) == 0) {
      this.skillCnt = 0;

      this.removeAllChildren();
      this.skillSelect++;
      suu++;
      this.skillSelect = this.skillSelect % 3;
      if(suu > 2) suu = 0;

    }
    //フレームをカウントする
    this.skillCnt++;
  },
//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib) {
    var skillName = ["fire", "laser", "exp"];
    var x = [472, 472, 472, 370, 350, 357, 370, 431, 272, 579];
    var y = [90, 90, 90, 155 , 155, 155, 155, 200, 347, 339];
    var num2 = [4, 5, 4];
    for(var i = 1; i < num2[attrib]; i++){
      var sName = "res." + skillName[attrib] + "_particl" + i;
      var tempParticle = new cc.ParticleSystem(eval(sName));
      tempParticle.setPosition(x[num], y[num]);
      num++;
      if(num > 9) num = 0;
      tempParticle.setDuration(5);
      this.addChild(tempParticle, 20);
      tempParticle.setAutoRemoveOnFinish(true);
    }
  },
});
