/* COLOR-CHANGING NIGHT LIGHT
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * Color-changing night light for Puck.js. Pressing the button toggles the night
 * light. When activated, the night light slowly changes color. Each time the light 
 * is activated, the starting color and fade time is randomized slightly.
 */

const _LED = [LED1, LED2, LED3];
const _X = 5;  // maximum interval between parameter increments (milliseconds)
const _Y = 0.0001; // maximum parameter increment; make smaller for longer fades

var ivalRef = [null, null, null],  // references to intervals set by setInterval
    on = false;  // records whether or not the night light is on

// utility function for generating a random number between 0 and n
function rand(n) {
  return n * Math.random();
}

// function for running the night light
function runLights() {
  let t = [0, 0, 0],  // parameters for light value function
      interval = [rand(_X), rand(_X), rand(_X)], // intervals for LEDs 1, 2 and 3
      increment = [rand(_Y), rand(_Y), rand(_Y)]; // parameter increments for LEDs 1, 2 and 3

  // set light intensity to the absolute value of the sin of the corresponding parameter
  // and increment the parameter by the corresponding increment value
  function cycle(n) {
    return () => {
      var val = Math.abs(Math.sin(t[n]));
      analogWrite(_LED[n], val);
      t[n] += increment[n];
    };
  }

  // set an interval for calling the cycle function
  function fade(n, t) {
    return () => {
      ivalRef[n] = setInterval(cycle(n), t);
    };
  }

  // start the fade for each LED
  for (var i in _LED)
    fade(i, interval[i]).call();
}

// handler for button press; if the the night light on, run the lights; otherwise, 
// clear intervals and turn the lights off.
function btnHandler() {
  on = !on;
  if (on)
    runLights();
  else
    for (var i in _LED) {
      clearInterval(ivalRef[i]);
      _LED[i].reset();
    }
}

// listen for button press
setWatch(btnHandler, BTN, { edge: 'rising', debounce: 50, repeat: true });