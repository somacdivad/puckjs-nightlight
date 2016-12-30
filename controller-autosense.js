/* COLOR CHANGING NIGHT LIGHT
 * Auto sense script
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * Control the color changing night light via a second Puck.js and UART
 * utilizing the pucks light sensor to trigger the night light based on
 * ambient light intensity.
 */

const _NAME = 'Puck.js 9fb2';  // name of the puck to be controlled
const _SENSE_INTERVAL = 1000;  // time between light sensor readings
const _SENSE_TRIGGER = 0.3;    // light trigger intensity for toggling night light on/off

var uart = require('ble_simple_uart'),
    ambTimeout = false,
    on = false,
    busy = false;

// function for sending toggleLights command to remote puck via UART
function sendToggle() {
  if (!busy) {
    busy = true;
    try {
      NRF.requestDevice({ filters: [{ name: _NAME }] }).then((dev) => {
        uart.write(dev, 'toggleNightlight()\n');
      }).then(() => {
        on = !on;
        busy = false;
        ambientSense();
      }).catch((e) => {
        busy = false;
        console.log('error', e);
        ambientSense();
      });
    } catch (e) {
      busy = false;
      console.log('error', e);
      ambientSense();
    }
  }
}

// function for starting ambient light sensor
function ambientSense() {
  ambTimeout = setInterval(() => {
    var l = Puck.light(),
        turnOn = (l <= _SENSE_TRIGGER) && !on,
        turnOff = (l > _SENSE_TRIGGER) && on;
    if (turnOn || turnOff) {
      if (ambTimeout) clearInterval(ambTimeout);
      sendToggle();
    }
  }, _SENSE_INTERVAL);
}

ambientSense();
