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