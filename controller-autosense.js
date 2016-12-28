/* COLOR CHANGING NIGHT LIGHT
 * Remote control script
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * Control the color changing night light via a second Puck.js and UART
 */

const _NAME = 'Puck.js 9fb2',  // name of the puck to be controlled
      _TRIGGER = 0.3;

var uart = require('ble_simple_uart'),
    ambTimeout = false,
    on = false;

// function for sending toggleLights command to remote puck via UART
function sendToggle() {
  try {
    NRF.requestDevice({ timeout: 5000, filters: [{ name: _NAME }] }).then((dev) => {
      uart.write(dev, 'toggleLights()\n');
    }).then(() => {
      on = !on;
      ambTimeout = ambientSense();
    }).catch((e) => {
      console.log('error', e);
      ambTimeout = ambientSense();
    });
  } catch (e) {
    console.log('error', e);
    ambTimeout = ambientSense();
  }
}

function ambientSense() {
  var timeout = setInterval(() => {
    var l = Puck.light(),
        turnOn = (l <= _TRIGGER) && !on,
        turnOff = (l > _TRIGGER) && on;
    if (turnOn || turnOff) {
      if (ambTimeout) clearInterval(ambTimeout);
      sendToggle();
    }
  });
   return timeout;
}

ambTimeout = ambientSense();