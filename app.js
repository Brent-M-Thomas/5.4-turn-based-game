var AppTemplates = {};

AppTemplates['hero-battle'] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});
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


(function() {
var weapon1 = $('.weapon1');
var weapon2 = $('.weapon2');
var special = $('.special');
var healthBar = $('.health-bar-current');

var heroes = [mal];
mal.takeDamage(10);
var enemies = [allianceSoldier];
var healthPct = function(character) {
  return character.getHealth() / character.maxHitPoints * 100 ;
};

function Game() {
  this.on('takeTurnWithWeapon', function(weaponIndex) {
    heroes[0].attack(enemies[0], weaponIndex);
    this.checkEnemyDead();
    enemies[0].attack(heroes[0]);
    this.checkHeroDead();

    this.trigger('change');
  });
}

Game.prototype = _.extend({
  constructor: Game,
  checkEnemyDead: function() {
    if (enemies[0].isDead === true) {
      enemies.shift();
      game.trigger('change'); /*is this right?*/
    } else {
      return;
    }
  },

  checkHeroDead: function() {
    if (heroes[0].isDead === true) {
      heroes.shift();
      game.trigger('change'); /*is this right?*/
    } else {
      return;
    }
  },

  gameOver: function() {
    if (enemies.length <= 0) {
      this.heroWins = true;
    }

    return this.heroWins || heroes.length <= 0;
  }
}, Backbone.Events);

var game = new Game();

game.on('change', function() {
  healthBar.css('width', (healthPct(heroes[0]) + '%'));
  if (!game.gameOver()) {
    logWindow.append('The battle continues...');
    return;
  }

  if (game.heroWins) {
    logWindow.html('You Win!');
  } else {
    logWindow.html('You Lose!');
  }
});

weapon1.on('click', function() {
  game.trigger('takeTurnWithWeapon', 0);
});

weapon2.on('click', function() {
  game.trigger('takeTurnWithWeapon', 1);
});

// function heroTurn(heroturn) {
//   if (heroturn === 1) {
//     isActive();
//   }
//   else if (heroturn === 2 && heroes.length > 1) {
//     isActive();
//   }
//   else if (heroturn === 3  && heroes.length > 2) {
//     isActive();
//   } else {
//     enemyTurn(1);
//   }
// }

// function enemyTurn(enemyturn) {
//   if (enemyturn === 1) {
//     enemies[enemyturn] = isActive;
//   }
//   else if (enemyturn === 2 && enemies.length > 1) {
//     enemies[enemyturn] = isActive;
//   }
//   else if (enemyturn === 3 && enemies.length > 2) {
//     enemies[enemyturn] = isActive;
//   } else if (enemyturn > 3) {
//     heroTurn(1);
//   }
// }

// heroTurn(1);
})();
//# sourceMappingURL=app.map