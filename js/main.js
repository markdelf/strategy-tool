$(function(){
    var board = new Board();
    board.init("boardElement");

    //30cm
    var spaceBetweenUnits = board.toScale(50);
    
    var onArmyLoaded = function(army) {
        var colors = ['#fe2d80', '#505eb0', '#50b05e'];
        var colorCounter = 0;

        
        var top = board.toScale((game.armies.length == 1) ? 100 : 3800);
        var left = board.toScale(100);
        
        for (var u in army.units) {
            var color = colors[colorCounter % colors.length];
            colorCounter += 1;
            var unit = army.units[u];
            unit.color = color;
            unit.position.left = left;
            unit.position.top = top;
    
            
            board.drawUnit(unit);
            
            left += spaceBetweenUnits + unit.size.width;
    
        }
    }

    
    
    var game = new Game()
    game.init(onArmyLoaded);
    game.loadArmy("data/cult2k.json");
    game.loadArmy("data/cult2k.json");
    window.game = game;
});