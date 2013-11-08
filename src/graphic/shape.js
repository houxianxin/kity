define(function(require, exports, module) {
    var svg = require('graphic/svg');
    var Paper = require('graphic/paper');
    var EventHandler = require('graphic/eventhandler');
    var Styled = require('graphic/styled');
    var Matrix = require('graphic/matrix');

    return require('core/class').createClass( 'Shape', {
        mixins: [EventHandler, Styled],
        constructor: function( tagName ) {
            this.node = svg.createNode( tagName );
            this.node.shape = this;
        },
        getNode: function() {
            return this.node;
        },
        getType: function() {
            throw new Error("abstract method called");
        },
        getBoundaryBox: function() {
            var box = this.node.getBBox();
            return box;
        },
        getRenderBox: function() {
            // TODO: may be implement later
        },
        getWidth: function() {
            return this.getBoundaryBox().width;
        },
        getHeight: function() {
            return this.getBoundaryBox().height;
        },
        getSize: function() {
            var box = this.getBoundaryBox();
            delete box.x;
            delete box.y;
            return box;
        },
        getPaper: function() {
            var parent = this.parent;
            while(parent && !(parent instanceof Paper)) {
                parent = parent.parent;
            }
            return parent || null;
        },
        getTransform: function() {
            return new Matrix(this.node.getAttribute("transform"));
        },
        setTransform: function(matrix) {
            this.node.setAttribute("transform", matrix);
            return this;
        },
        mergeTransform: function(matrix) {
            return this.setTransform(this.getTransform().merge(matrix));
        },
        translate: function(dx, dy) {
            return this.mergeTransform(new Matrix().addTranslate(dx, dy));
        },
        rotate: function( deg, cx, cy ) {
            return this.mergeTransform(new Matrix().addRotate(deg, cx, cy));
        },
        scale: function( sx, sy ) {
            if(sy === undefined) {
                sy = sx;
            }
            return this.mergeTransform(new Matrix().addScale(sx, sy));
        },
        skew: function( sx, sy ) {
            if(sy === undefined) {
                sy = sx;
            }
            return this.mergeTransform(new Matrix().addSkew(sx, sy));
        }
    });
});