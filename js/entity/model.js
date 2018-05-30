function Model(name, stats) {
    this.name = name;
    if (stats) {
        this.stats = stats;
    }
    this.baseSize = 32;
}

Model.prototype = {
    canvasObj: false,
    stats: {
        M: 6,
        WS: 4,
        BS: 5,
        A: 3,
        W: 2,
        LD: 9
    },
    setCanvasObj(obj) {
        this.canvasObj = obj;
        return this;
    },
    getCanvasObj() {
        return this.canvasObj;
    },
    baseSize: 32,
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
    toString: function() {
        return this.getRef() + " - " + this.getStatLine();
    }
}