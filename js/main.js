$(function(){
    var game = new Game()
    game.init();
    window.game = game;

    var board = new Board();
    board.init("boardElement");

    //10cm
    var left = board.toScale(100);
    var top = board.toScale(100);

    //30cm
    var spaceBetweenUnits = board.toScale(300);

    var colors = ['#fe2d80', '#505eb0', '#50b05e'];
    var colorCounter = 0;

    for (var u in game.armies[0].units) {
        var color = colors[colorCounter % colors.length];
        colorCounter += 1;
        var unit = game.armies[0].units[u];
        
        left += spaceBetweenUnits;

        board.drawUnit(unit, {left: left, top: top}, color);
    }
});