// end turn after  attack
var logWindow = $('.narration-window');

function Character(options) {
  options = options || {};
  var hitPoints = options.hitPoints || 100;
  this.weapons = options.weapons || {};
  this.maxHitPoints = hitPoints;
  this.logDamage = function(damage) {
    logWindow.html(this + 'takes' + damage + 'points of damage');
  };

  this.takeDamage = function(damage) { hitPoints -=  damage; };

  this.on('attacked', function(amount) {
    this.takeDamage(amount);
    this.logDamage(amount);
  });

  this.getHealth = function() {return hitPoints;};
}

Character.prototype = _.extend({
  constructor: Character,

  getAttackStrength: function(weaponIndex) {
    if (this.weapons[weaponIndex]) {
      return this.weapons[weaponIndex].damage;
    }

    return 5;
  }
}, Backbone.Events);

function Hero(options) {
  Character.call(this, options);
}

Hero.prototype = _.defaults({
  constructor: Hero,

  attack: function(hostile, weapon) {
    hostile.trigger('attacked', this.getAttackStrength(weapon));
  }

}, Character.prototype);

var mal = new Hero({
  hitPoints: 120,
  weapons: [{name: 'sidearm', damage: 15}, {name: 'fist', damage: 5}],
  image: 'http://photos1.blogger.com/img/122/2967/320/Malcolm%20Reynolds.jpg',
  title: 'Captain',
  firstname: 'Malcolm',
  lastname: 'Reynolds',
  nickname: 'Mal'
});

var jayne = new Hero({
  hitPoints: 80,
  weapons: [{name: 'Vera', damage: 25}, {name: 'fist', damage: 8}],
  image: 'http://static.comicvine.com/uploads/original/3/31274/1365260-serenity_promo_s_adam_baldwin_2007567_261_400.jpg',
  title: '',
  firstname: 'Jayne',
  lastname: 'Cobb',
  nickname: 'Jayne'
});

var zoe = new Hero({
  hitPoints: 100,
  weapons: [{name: 'maresLeg', damage: 20}, {name: 'stockStrike', damage: 8}],
  image: 'https://s-media-cache-ak0.pinimg.com/736x/af/e1/b1/afe1b19c2e51b89b274dab86850e82ba.jpg',
  title: '',
  firstname: 'Zoe',
  lastname: 'Washburne',
  nickname: 'Zoe'
});

function Enemy(options) {
  Character.call(this, options);
}

Enemy.prototype = _.defaults({
  constructor: Enemy,

  attack: function(hostile, weapon) {
    hostile.trigger('attacked', this.getAttackStrength());
  },

  getAttackStrength: function() {
    return _.sample(this.weapons).damage;
  }

}, Character.prototype);

var allianceSoldier = new Enemy({
  hitPoints: 80,
  image:'http://i198.photobucket.com/albums/aa160/pennausamike/trainjob190.jpg',
  weapons: [{name: 'Rifle', damage: 10}]
});

var reaver = new Enemy({
  hitPoints: 60,
  image:'http://www.toymania.com/news/images/0905_dst_reaver1_sm.jpg',
  weapons: [{name: 'feralAttack', damage: 20}]
});

