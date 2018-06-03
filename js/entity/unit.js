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
    this.position = {left: 0, top: 0};
    this.size = {rows: 1, cols: 1, width: 0, height: 0}
    this.color = "#000000";
    this.canvasObj = false;
}

Unit.prototype = {
    models: [],
    activeModels: [],
    name: "Unnamed",
    layout: 'ranks-4',
    position: {},
    color: "#000000",
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
    setCanvasObj(obj) {
        this.canvasObj = obj;
        return this;
    },
    getCanvasObj() {
        return this.canvasObj;
    },
    createCanvasObj: function(scaleModifier) {        
        var unitElements = [];
        var models = this.getModels();
    
        //10mm
        var spaceBetweenModels = 25 * scaleModifier;
    
        this.size.cols = models.length;
        if (this.layout.indexOf("ranks-") >= 0) {
            this.size.cols = parseInt(this.layout.replace("ranks-", ""));
            this.size.rows = Math.ceil(models.length / this.size.cols);
        }
    
        // Prepare Ranks
        var rows = [];
        for (var i = 0; i < this.size.rows; i++) {
            var modelIndexStart = i * this.size.cols;
            var row = [];
            for (var m = 0; m<this.size.cols; m++) {
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
        var baseSize = models[0].baseSize * scaleModifier;
        var top = 0;
        for (var r = 0; r < rows.length; r++) {
            var row = rows[r];
            
            top += baseSize + spaceBetweenModels + (baseSize/2);
            this.size.height += baseSize + spaceBetweenModels + (baseSize/2);

            var left = 0;
    
    
            for (var m = 0; m < row.length; m++) {
                var model = row[m];
    
                left += baseSize + spaceBetweenModels + (baseSize/2);

                if (r == 0) {
                    //Only first row affects width
                    this.size.width += baseSize + spaceBetweenModels + (baseSize/2);
                }

                var obj = model.getCanvasObj();
                if (!obj) {
                    obj = model.createCanvasObj(baseSize, this.color, left, top);
                    model.setCanvasObj(obj);
                }
        
                unitElements.push(obj);
            }
        }
    
        var group = new fabric.Group(unitElements, {
            left: this.position.left,
            top: this.position.top,
            lockScalingX: true,
            lockScalingY: true,
            hasControls: true,
            title: this.getRef()
        });

        var that = this;
        group.on("mouseover", function(){
           console.log(that.getRef()); 
        });
        
        group.setControlsVisibility({
            mtr: models.length > 1, //no need to rotate if 1 model only
            tl: false,
            tr: false,
            bl: false,
            br: false,
            ml: false,
            mr: false,
            mb: false,
            mt: false
        });
        return group;
    },
    toString: function() {
        return this.getRef() + " (x" + this.getModelCount() + ")";
    }
}