$(function(){
    var game = new Game()
    game.init();
    window.game = game;
});

function Game() {
    
}

Game.prototype = {
 armies: [],
 init: function() {
     var a1 = new Army("Mark", "Nids");
     var a2 = new Army("Jon", "Eld");

     a1.addUnit("Hive Tyrant");
     a1.addUnit("Gaunts");

     for (var u in a1.units) {
         var unit = a1.units[u];
         console.log(unit.toString());
     }

     this.armies.push(a1);
     this.armies.push(a2);
 },

}

function Army(player, faction) {
    this.player = player;
    this.faction = faction;
}

Army.prototype = {
    faction: "N/A",
    player: "N/A",
    units: [],
    addUnit: function(stats) {
        var unit = new Unit(stats);
        this.units.push(unit);
    }
}

function Unit(name, stats) {
    this.name = name;
    if (stats) {
        this.stats = stats;
    }
}

Unit.prototype = {
    stats: {
        M: 6,
        WS: 4,
        BS: 5,
        A: 3,
        W: 2,
        LD: 9
    },
    name: "Unnamed",
    getRef: function() {
        var words = this.name.split(" ");
        var ref = "";
        for (w in words) {
            var word = words[w];
            ref += word[0].toUpperCase();
        }
        return ref;
    },
    getStatLine() {
        var stats = [];
        for (var p in this.stats) {
            stats.push(p + ":" + this.stats[p]);
        }
        return stats.join(" ");
    },
    charge: function(metric) {
        switch (metric) {
            case "min":
                return 2
            case "max":
                return 12
            default:
                //average
                return 6;
        }
    },
    toString: function() {
        return this.getRef() + " - " + this.getStatLine();
    }
}

function Die(num) {
    if (num) {
        this.num = num;
    }
    return this;
}

Die.prototype = {
    num: 6,
    result: false,
    rerolled: false,
    roll: function() {
        if (this.rerolled) {
            throw "Die can only be rerolled once";
        }
        if (this.result) {
            this.rerolled = true;
        }
        this.result = Math.ceil(Math.random() * this.num);
        this.result;
    }
}

function DieRoll(type, qty) {
    this.dice = [];
    for (var i = 0; i < qty; i++) {
        this.addDie(type);
    }
    return this;
}

DieRoll.prototype = {
    type: "D6",
    qty: 1,
    dice: [],
    total: false,
    countByResult: function(result) {
        var count = 0;
        for (var d in this.dice) {
            if (this.dice[d].result == result) {
                count++;
            }
        }
        return count;
    },
    countGreaterOrEqualTo: function(result) {
        var count = 0;
        for (var d in this.dice) {
            if (this.dice[d].result >= result) {
                count++;
            }
        }
        return count;
    },
    countLessOrEqualTo: function(result) {
        var count = 0;
        for (var d in this.dice) {
            if (this.dice[d].result <= result) {
                count++;
            }
        }
        return count;
    },
    addDie: function(dieType) {
        var die = new Die(parseInt(dieType.replace("D", "")));
        this.dice.push(die);
    },
    roll: function() {
        this.total = 0;
        for (var d in this.dice) {
            var die = this.dice[d];
            die.roll();
            this.total += die.result;
        }
        return this.total;
    }
}