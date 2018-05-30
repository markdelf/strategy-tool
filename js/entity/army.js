function Army(player, faction) {
    this.player = player;
    this.faction = faction;
}

Army.prototype = {
    faction: "N/A",
    player: "N/A",
    units: [],
    addUnit: function(unitName) {
        var unit = new Unit(unitName);
        this.units.push(unit);
        return unit;
    }
}