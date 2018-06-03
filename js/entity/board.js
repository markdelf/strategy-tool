function Board() {
    this.fabricCanvas = null;
    this.actualSize = {w: 6400, h: 4266};
    this.size = {w: 1200, h: 800};
}

Board.prototype = {
 init: function(canvasId) {
    this.fabricCanvas = new fabric.Canvas(canvasId);
    var that = this;
    fabric.Image.fromURL("/img/6x4.png", function(img) {
        // add background image
        that.fabricCanvas.setBackgroundImage(img, that.fabricCanvas.renderAll.bind(that.fabricCanvas), {
            scaleX: that.fabricCanvas.width / img.width,
            scaleY: that.fabricCanvas.height / img.height
        });
    });
 },
 getScaleModifier() {
     return this.size.w / this.actualSize.w;
 },
 toScale(size) {
    return size * this.getScaleModifier();
 },
 drawUnit: function(unit) {
    var canvasObj = unit.getCanvasObj();
    if (!canvasObj) {
        canvasObj = unit.createCanvasObj(this.getScaleModifier());
        unit.setCanvasObj(canvasObj);
    }
    this.fabricCanvas.add(canvasObj);
    return canvasObj;
 }
}