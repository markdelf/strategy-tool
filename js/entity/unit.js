function Unit(name, models) {
    this.name = name;
    this.position = {
        coords: {x: 0, y: 0},
        angle: 0
    };
    this.layout = 'ranks-4'; // ranks/cluster/line/around
    if (models) {
        this.models = models;
        this.activeModels = models;
    } else {    
        this.models = [];
        this.activeModels = [];
    }
}

Unit.prototype = {
    models: [],
    activeModels: [],
    name: "Unnamed",
    layout: 'ranks-4',
    position: {},
    getRef: function() {
        var words = this.name.split(" ");
        var ref = "";
        for (w in words) {
            var word = words[w];
            ref += word[0].toUpperCase();
        }
        return ref;
    },
    getModels(includeInactive) {
        if (includeInactive) return this.models;
        return this.activeModels;
    },
    getModelCount(includeInactive) {
        return this.getModels(includeInactive).length;
    },
    addModel(model) {
        this.models.push(model);
        this.activeModels.push(model);
    },
    removeModel(model, includeInactive) {
        if (includeInactive) {
            var index = this.models.indexOf(model);
            this.models.splice(index,1);
        }

        var activeIndex = this.activeModels.indexOf(model);
        this.activeModels.splice(activeIndex,1);
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
        return this.getRef() + " (x" + this.getModelCount() + ")";
    }
}