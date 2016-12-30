/* COLOR CHANGING NIGHT LIGHT
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * A color changing night light for Puck.js.
 */

const _OFF_TIMEOUT = 1800000; // turn off nightlight after 30 minutes
const _FREQ = 23;
const _INCR_MAX = 0.001;
const _INCR_MIN = 0.000005;

var led = [LED1, LED2, LED3],
    intervalRef = [null, null, null], // led value update intervals
    tmOffRef = false,  // off timeout
    on = false; // are we on?

// utility function for Fisher-Yates shuffling an array
// happily borrowed from Frank Mitchell
// https://www.frankmitchell.org/2015/01/fisher-yates/
function shuffle (array) {
  let i = 0,
      j = 0,
      temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

// randomly generate number between _INCR_MIN and _INCR_MAX for LED value increments
function randIncr() {
  return _INCR_MIN + (_INCR_MAX - _INCR_MIN) * Math.random();
}

// turn night light on
function nightlightOn() {
  let t = [0, 0, 0],
      increment = [randIncr(), randIncr(), randIncr()];

  function setValue(i) {
    analogWrite(led[i], Math.abs(Math.sin(t[i])));
    t[i] += increment[i];
  }

  function fade(i) {
    intervalRef[i] = setInterval(setValue, _FREQ, i);
  }

  shuffle(led);

  for (let i in led) {
    // fade the first led immediately and the remaining two randomly between 1 and 10 seconds;
    let timeout = (i == 0) ? 100 : 9999 * Math.random() + 1;
    setTimeout(fade, timeout, i);
  }

  // turn night light off after _OFF_TIMEOUT seconds
  tmOffRef = setTimeout(nightlightOff, _OFF_TIMEOUT)
}

// turn night light off
function nightlightOff() {
  on = false;
  if (tmOffRef) {
    clearTimeout(tmOffRef);
    tmOffRef = false;
  }
  for (let i in led) {
    if (intervalRef[i]) {
      clearInterval(intervalRef[i]);
      intervalRef[i] = false;
    }
    led[i].reset();
  }
}

// toggle the night light
function toggleNightlight() {
  on = !on;
  if (on)
    nightlightOn();
  else
    nightlightOff();
}

// watch for button events
setWatch(toggleNightlight, BTN, { edge: 'rising', debounce: 50, repeat: true });
