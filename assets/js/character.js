// end turn after  attack
var logWindow = $('.narration-window');

function Character(options) {
  options = options || {};
  var hitPoints = options.hitPoints || 100;
  this.weapons = options.weapons || {};
  this.logDamage = function(damage) {
    logWindow.html(this + 'takes' + damage + 'points of damage');
  };

  this.takeDamage = function(damage) { hitPoints -=  damage; };

  this.getAttackStrength = function(weaponName) {
    if (this.weapons[weaponName]) {
      return this.weapons[weaponName];
    }

    return 5;
  };

  this.on('attacked', function(amount) {
    this.takeDamage(amount);
    this.logDamage(amount);
    this.isDead();

  });

  this.getHealth = function() {return hitPoints;};
}

function Hero() {
}

Hero.prototype = _.extend({
  constructor: Character,

  attack: function(hostile, weapon) {
    hostile.trigger('attacked', this.getAttackStrength(weapon));
  },

  isDead: function() {
    if (heroes[0].hitPoints <= 0) {
      heroes.shift();
      gameOver();
    } else if (enemies[0].hitPoints <= 0) {
      enemies.shift();
      gameOver();
    } else {
      logWindow.append(this + 'exclaims \"Go shi\!  That hurt\!\"  ');
    }
  }
}, Backbone.Events);

var mal = new Hero({
  maxHitPoints: 120,
  hitPoints: 120,
  weapons: {sidearm: 15, fist: 5},
  special: {serenityFlyby: 25},
  image: 'http://photos1.blogger.com/img/122/2967/320/Malcolm%20Reynolds.jpg',
  title: 'Captain',
  firstname: 'Malcolm',
  lastname: 'Reynolds',
  nickname: 'Mal'
});

var jayne = new Hero({
  maxHitPoints: 80,
  hitPoints: 80,
  weapons: {gun: 25, fist: 8},
  special: {Vera: 25},
  image: 'http://static.comicvine.com/uploads/original/3/31274/1365260-serenity_promo_s_adam_baldwin_2007567_261_400.jpg',
  title: '',
  firstname: 'Jayne',
  lastname: 'Cobb',
  nickname: 'Jayne'
});

var zoe = new Hero({
  maxHitPoints: 100,
  hitPoints: 100,
  weapons: {maresLeg: 20, stockStrike: 8},
  special: {gunsBlazing: 25},
  image: 'https://s-media-cache-ak0.pinimg.com/736x/af/e1/b1/afe1b19c2e51b89b274dab86850e82ba.jpg',
  title: '',
  firstname: 'Zoe',
  lastname: 'Washburne',
  nickname: 'Zoe'
});

function Enemy() {
}

Enemy.prototype = _.extend({
  constructor: Character,

  attack: function(hostile, weapon) {
    hostile.trigger('attacked', this.getAttackStrength(weapon));
  },

  isDead: function() {
    if (this.hitPoints <= 0) {
      enemies.shift();
    } else {
      logWindow.append(this + 'exclaims \"Go shi\!\"  ');
    }
  }
}, Backbone.Events);

var allianceSoldier = new Enemy({
  maxHitPoints: 80,
  hitPoints: 80,
  image:'http://i198.photobucket.com/albums/aa160/pennausamike/trainjob190.jpg',
  weapons: {Rifle: 10}
});

var reaver = new Enemy({
  maxHitPoints: 60,
  hitPoints: 60,
  image:'http://www.toymania.com/news/images/0905_dst_reaver1_sm.jpg',
  weapons: {feralAttack: 20}
});

