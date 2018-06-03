function Army(player, faction) {
    this.player = player;
    this.faction = faction;
    this.units = [];
}

Army.prototype = {
    faction: "N/A",
    player: "N/A",
    units: [],
    addUnit: function(unit) {
        this.units.push(unit);
        return this;
    }
}