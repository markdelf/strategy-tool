function Game() {
    this.armies = [];
    this.armyCallBack = false;
}

Game.prototype = {
 armies: [],
 init: function(armyAddedCallback) {
    this.armyCallback = armyAddedCallback;
 },
 loadArmy(filePath) {
    var that = this;
    $.getJSON(filePath, function(armyData){
        var a1 = new Army(armyData.name, armyData.faction);
        for(var u in armyData.units) {
            var unitData = armyData.units[u];

            var unit = new Unit(unitData.name);
            if (unitData.layout) {
                unit.layout = unitData.layout;
            }

            for (var m in unitData.models) {
                var modelData = unitData.models[m];
                for (var i = 0; i < modelData.qty; i++) {
                    var model = new Model(modelData.name);
                    model.baseSize = modelData.baseSize;
                    unit.addModel(model);
                }
            }
            a1.addUnit(unit);
        }
        that.armies.push(a1);
        if (that.armyCallback) {
            that.armyCallback(a1);
        }
    });
 }
}