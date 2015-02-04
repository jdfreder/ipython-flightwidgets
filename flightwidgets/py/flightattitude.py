from IPython.html.widgets import DOMWidget
from IPython.utils.traitlets import Float, Unicode

class FlightAttitudeWidget(DOMWidget):
    _view_module = Unicode('nbextensions/flightwidgets/flightattitude', sync=True)
    _view_name = Unicode('FlightAttitudeView', sync=True)
    pitch = Float(0., sync=True)
    roll = Float(0., sync=True)
