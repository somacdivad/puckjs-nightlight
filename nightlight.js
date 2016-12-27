/* COLOR CHANGING NIGHT LIGHT
 *
 * David Amos, 2016
 * somacdivad@gmail.com
 * https://github.com/somacdivad/puckjs-nightlight
 *
 * A color changing night light for Puck.js. Automatically turns on when low
 * ambient light is detected.
 */

const _LED = [LED1, LED2, LED3];
const _X = 5;  // maximum interval between parameter increments (milliseconds)
const _Y = 0.0001; // maximum parameter increment; make smaller for longer fades

var ivalRef = [null, null, null],  // references to intervals set by setInterval
    on = false;

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

// toggle the night light; if the the night light on, run the lights; otherwise, 
// clear intervals and turn the lights off.
function toggleLights() {
  on = !on;
  if (on) {
    runLights();
  }
  else {
    for (var i in _LED) {
      if (ivalRef[i]) clearInterval(ivalRef[i]);
      _LED[i].reset();
    }
  }
}

// function for probing ambient light and turning on the night light if
// low light is detected
function probeAmbientLight() {
  let l = Puck.light();
  if (l < 0.2 && !on) {
    console.log(l);
    if (ivalProbeLight) clearInterval(ivalProbeLight);
    ivalProbeLight = false;
    toggleLights();
  }
}

// watch for button events
setWatch(toggleLights, BTN, { edge: 'rising', debounce: 50, repeat: true });
