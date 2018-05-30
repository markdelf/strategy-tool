function Game() {
    
}

Game.prototype = {
 armies: [],
 init: function() {
     var a1 = new Army("Mark", "Nids");
     var a2 = new Army("Jon", "Eld");

     var htUnit = a1.addUnit("Hive Tyrant");
     
     var htModel = new Model("Hive Tyrant");
     htModel.baseSize = 56;
     htUnit.addModel(htModel);

     var gauntsUnit = a1.addUnit("Gaunts");
     gauntsUnit.layout = "ranks-10"
     for (var i = 0; i < 30; i++) {
        var gauntModel = new Model("Gaunt");
        gauntsUnit.addModel(gauntModel);
     }

     for (var u in a1.units) {
         var unit = a1.units[u];
         console.log(unit.toString());
     }

     this.armies.push(a1);
     this.armies.push(a2);
 },

}