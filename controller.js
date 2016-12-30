/* COLOR CHANGING NIGHT LIGHT
 * Remote control script
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * Control the color changing night light via a second Puck.js and UART
 */

var uart = require('ble_simple_uart');

const _NAME = 'Puck.js 9fb2';  // rename this to match the Puck.js night light
const _RESET_TIMEOUT = 5000;

var tmReset = false;          // timeout id for setTimeout used to reset puck

// handle errors
function err(e) {
  console.log('error', e);
  digitalPulse(LED1, 1, [125, 125, 125, 125, 125]); // flash red light 3 times
}

// send toggle command to remote puck via UART
function sendToggle() {
  try {
    NRF.requestDevice({ filters: [{ name: _NAME }] }).then((dev) => {
      uart.write(dev, 'toggleNightlight()\n');
    }).catch((e) => {
      err(e);
    });
  } catch (e) {
    err(e);
  }
}

// function for handling button presses
function btnRising() {
  tmReset = setTimeout(() => {
    tmReset = false;
    digitalPulse(LED3, 1, [125, 125, 125, 125, 125]); // flash blue light
    setTimeout(load, 2000); // reset the puck
  }, _RESET_TIMEOUT);
}

// function for handling button lifts
function btnFalling() {
  if (tmReset) {
    clearTimeout(tmReset);
    sendToggle();
  }
}

// watch for button events
setWatch(btnRising, BTN, { edge:"rising", debounce:50, repeat: true });
setWatch(btnFalling, BTN, { edge:"falling", debounce:50, repeat: true });

// pulse green light to indicate puck is ready
E.on('init', () => {
  digitalPulse(LED2, 1, 250);
});
