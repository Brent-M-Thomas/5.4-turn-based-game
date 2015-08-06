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
