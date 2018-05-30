function Board() {
    
}

Board.prototype = {
 fabricCanvas: null,
 actualSize: {w: 6400, h: 4266},
 size: {w: 1200, h: 800},
 init: function(canvasId) {
    this.fabricCanvas = new fabric.Canvas(canvasId);
 },
 toScale(size) {
    var ratio = this.size.w / this.actualSize.w;

    return size * ratio;
 },
 drawUnit: function(unit, unitPosition, unitColor) {
    var models = unit.getModels();

    // TO DO: create group

    //10mm
    var spaceBetweenModels = this.toScale(25);

    var modelsPerRow = models.length;
    var rowCount = 1;
    if (unit.layout.indexOf("ranks-") >= 0) {
        modelsPerRow = parseInt(unit.layout.replace("ranks-", ""));
        rowCount = Math.ceil(models.length / modelsPerRow);
    }


    // Prepare Ranks
    var rows = [];
    for (var i = 0; i < rowCount; i++) {
        var modelIndexStart = i * modelsPerRow;
        var row = [];
        for (var m = 0; m<modelsPerRow; m++) {
            var modelIndex = modelIndexStart + m;
            if (modelIndex < models.length) {
                var model = models[modelIndex];
                row.push(model);
            }
        }
        rows.push(row);
    }

    // Render

    // Assuming all models same base size
    var baseSize = this.toScale(models[0].baseSize);
    var top = unitPosition.top;
    for (var r = 0; r < rows.length; r++) {
        var row = rows[r];
        
        top += baseSize + spaceBetweenModels + (baseSize/2);
        var left = unitPosition.left;


        for (var m = 0; m < row.length; m++) {
            var model = row[m];

            left += baseSize + spaceBetweenModels + (baseSize/2);
            var obj = model.getCanvasObj();
            if (!obj) {
                obj = this.createModelObj(baseSize, unitColor, left, top);
                model.setCanvasObj(obj);
            }
    
            this.fabricCanvas.add(obj);
        }

    }
 },
 createModelObj(baseSize, unitColor, left, top) {
    return new fabric.Circle({
        radius: baseSize, fill: unitColor, left: left, top: top,
        selectable: true
    });
 }
}