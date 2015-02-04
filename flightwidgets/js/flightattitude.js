define(function(require) {
    var widget = require("widgets/js/widget");

    var FlightAttitudeView = widget.DOMWidgetView.extend({
        render: function() {

            // Create the viewing frame.
            this.$frame = $('<div/>')
                .css({
                    overflow: 'hidden',
                    width: 300,
                    height: 300,
                    border: '2px solid black'
                }).appendTo(this.$el);

            // Create the backdrop div.
            this.$backdrop = $('<div/>')
                .css({
                    position: 'relative',
                    width: 1000,
                    height: 1000,
                    top: -350,
                    left: -350
                })
                .append($('<div/>')
                    .css({
                        position: 'relative',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '50%',
                        background: 'skyblue'
                    })
                ).append($('<div/>')
                    .css({
                        position: 'relative',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '50%',
                        background: 'brown'
                    })
                ).appendTo(this.$frame);

            // Create horizontal lines in the backdrop.
            var that = this;
            var make_line = function(thickness, degrees, width) {
                width = width || 150;
                return $('<div/>')
                    .css({
                        background: 'white',
                        height: thickness,
                        width: width,
                        position: 'absolute',
                        left: 500 - (width / 2),
                        top: (500 + degrees * 4) - (thickness / 2)
                    }).appendTo(that.$backdrop);
            };
            // First create a thick ground line.
            make_line(5, 0, 200);
            // Ticks
            var angle;
            for (angle = -180; angle <= 180; angle+=2) {
                if (angle!==0) {
                    if (angle % 10 === 0) {
                        // Major
                        make_line(2, angle);
                    } else {
                        // Minor
                        make_line(1, angle, 100);
                    }
                }
            }

            // Create the overlay div.
            this.$overlay = $('<div/>')
                .css({
                    position: 'relative',
                    width: 150,
                    height: 4,
                    top: -852,
                    left: 75,
                    background: 'orange'
                }).append(
                    $('<div/>')
                        .css({
                            background: 'yellow',
                            left: 73,
                            top: -2,
                            height: 8,
                            width: 8,
                            position: 'relative'
                        })
                ).appendTo(this.$frame);

            this.model.on('change:pitch', this._move, this);
            this.model.on('change:roll', this._move, this);
            this._move();
        },

        _move: function() {
            var roll = -this.model.get('roll');
            this.$backdrop.css({'-webkit-transform' : 'rotate('+ roll +'deg)',
                 '-moz-transform' : 'rotate('+ roll +'deg)',
                 '-ms-transform' : 'rotate('+ roll +'deg)',
                 'transform' : 'rotate('+ roll +'deg)'});

            var pitch = this.model.get('pitch');
            var top = -350;
            var left = -350;
            var roll_rad = roll/180*Math.PI;
            top += pitch * 4 * Math.cos(roll_rad);
            left -= pitch * 4 * Math.sin(roll_rad);
            this.$backdrop.css({
                left: left, 
                top: top
            });
        },
    });

    return {
        FlightAttitudeView: FlightAttitudeView
    };
});