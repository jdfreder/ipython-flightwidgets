define(function(require) {
    var widget = require("widgets/js/widget");

    var FlightAttitudeView = widget.DOMWidgetView.extend({
        render: function() {
            var backdrop_size = 3000;
            var frame_size = 300;
            this.backdrop_size = backdrop_size;
            this.frame_size = frame_size;

            // Create the viewing frame.
            this.$frame = $('<div/>')
                .css({
                    overflow: 'hidden',
                    width: frame_size,
                    height: frame_size,
                    border: '2px solid black'
                }).appendTo(this.$el);

            // Create the backdrop div.
            this.$backdrop = $('<div/>')
                .css({
                    position: 'relative',
                    width: backdrop_size,
                    height: backdrop_size,
                    top: frame_size/2-backdrop_size/2,
                    left: frame_size/2-backdrop_size/2
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
                width = width || frame_size/2;
                return $('<div/>')
                    .css({
                        background: 'white',
                        height: thickness,
                        width: width,
                        position: 'absolute',
                        left: backdrop_size/2 - (width / 2),
                        top: (backdrop_size/2 + degrees * 4) - (thickness / 2)
                    }).appendTo(that.$backdrop);
            };
            // First create a thick ground line.
            make_line(5, 0, 2*frame_size/3);
            // Ticks
            var angle;
            for (angle = -180; angle <= 180; angle+=2) {
                if (angle!==0) {
                    if (angle % 10 === 0) {
                        // Major
                        make_line(2, angle);
                    } else {
                        // Minor
                        make_line(1, angle, frame_size/3);
                    }
                }
            }

            // Create the overlay div.
            this.$overlay = $('<div/>')
                .css({
                    position: 'relative',
                    width: 150,
                    height: 4,
                    top: frame_size/2-backdrop_size,
                    left: frame_size/2-75,
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
            var top = this.frame_size/2-this.backdrop_size/2;
            var left = this.frame_size/2-this.backdrop_size/2;
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