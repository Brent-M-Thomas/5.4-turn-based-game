(function() {
var weapon1 = $('.weapon1');
var weapon2 = $('.weapon2');
var special = $('.special');

var heroes = [mal];
var enemies = [allianceSoldier];

var gameOver = function() {
  if (heroes.length < 1 && enemies.length >= 1) {
    logWindow.html('You Lose!');
  } else if (enemies.length < 1 && heroes.length >= 1) {
    logWindow.html('You Win!');
  } else {
    logWindow.append('The battle continues...');
  }
};

function Game() {
  this.on('takeTurnWithWeapon', function() {
    heroes[0].attack(enemies[0]);
  });

}

//need to remember to remove characters from array once defeated
// end turn after attack function

var takeTurnWithWeapon = function(weaponIndex) {

};

weapon1.on('click', function() {
  takeTurnWithWeapon(0);
});

weapon2.on('click', function() {
  takeTurnWithWeapon(1);
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
