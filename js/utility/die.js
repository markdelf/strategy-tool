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