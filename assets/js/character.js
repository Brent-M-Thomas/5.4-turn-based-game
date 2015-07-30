function Person(first, last) {
  this.firstName = first;
  this.lastName = last;
}

var h = new Person('Homer', 'Simpson');

var withNewName = function(person) {
  var cp = new Person(person.firstName, person.lastName);

  cp.firstName = 'y';
  return cp;
};

h = withNewName(h);

// Do some code here...

h.firstName = 'something else';

h = withNewName(h);

function Character(options) {
    options = options || {};
    var hitPoints = options.hitPoints || 100;
    this.weapons = options.weapons || {};

    this.takeDamage = function(damage) { hitPoints -=  damage; };

    this.getAttackStrength = function(weaponName) {
      if (this.weapons[weaponName]) {
        return this.weapons[weaponName];
      }

      return 5;
    };

    this.on('attacked', function(amount) {
      this.takeDamage(amount);
    });

    this.getHealth = function() {return hitPoints;};
  }

Character.prototype = _.extend({
  constructor: Character,

  attack: function(hostile, weapon) {
    // tell the enemy that they've been attacked
    hostile.trigger('attacked', this.getAttackStrength(weapon));

    //Directly damaging the enemy
    // hostile.takeDamage(this.getAttackStrength(weapon));
  }
}, Backbone.Events);

char = new Character({hitPoints: 200, weapons: {hammer: 20, sword: 15}});
enemy = new Character({weapons: {hands: 11, sword: 15}});
enemy.on('attacked', function(amount) {
  if (amount > 10) {
    console.log('You are a strong foe!');
  }
});

char.attack(enemy, 'hammer');
enemy.attack(char, 'hands');

console.log('character: ', char.getHealth());
console.log('enemy: ', enemy.getHealth());
