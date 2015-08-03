(function() {
var weapon1 = $('.weapon1');
var weapon2 = $('.weapon2');
var special = $('.special');
// var heroes = [heroes];
// var enemies = [enemies];
// var players = [ heroes and enemies ];
// var roundNumber = turn / players.length;

//need to remember to remove characters from array once defeated

function heroTurn(heroturn) {
  if (heroturn % 2 === 0) {
  heroes[heroturn] = isActive;
};
  else if (heroturn % 3 === 0) {
    heroes[heroturn] = isActive;
  } else {
    heroes[heroturn] = isActive;
  };
};
function enemyTurn(enemyturn) {
  if (enemyturn % 2 === 0) {
  heroes[enemyturn] = isActive;
};
  elseif (enemyturn % 3 === 0) {
    heroes[enemyturn] = isActive;
  } else {
    heroes[enemyturn] = isActive;
  };
};

function isActive {
  weapon1.on('click', attack(enemies[1], hero.weapon[1]));
  weapon2.on('click', attack(enemies[1], hero.weapon[2]));
  if ((hitPoints / maxHitPoints) <= .3) {
    special.on('click', attack(enemies[1], hero.special))
  }

}
})();
