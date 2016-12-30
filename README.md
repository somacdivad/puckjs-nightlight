# puckjs-nightlight
A color changing night light for Puck.js.

![Puck.js night light](img/nightlight.jpg?raw=true)

## About this project
I wanted to make something fun for my 9-year-old daughter with my Puck.js and had the idea for a color changing night light that she could turn on and off easily. Although simple, this project does make use of various capabilites of the Puck.js. The night light can work in standalone mode, or can be combined with a second puck for remote control.

## Installation
Upload nightlight.js to the Puck.js you want to be the night light, and (optionally) upload controller.js or controller-autosense.js to the Puck.js you want to be the controller and replace ```_NAME = 'Puck.js 9fb2'``` with the name of the Puck.js used as the night light. This project was tested on pucks running formware 1v90.5 (found on this [comment](http://forum.espruino.com/comments/13375822/) from the Puck.js forum) but should work fine on formware 1v89 and up.

## Using the night light
There are three ways to use the night light: standalone, remote control and auto sense. Both remote control and auto sense require two pucks. In all three cases the night light shuts off automatically. Currently this will confuse the auto sense controller and the puck will be turned on when the lights come on and off when they are turned off. This bug will be fixed shortly.

### Standalone
Use the Espruino WEB IDE to send nightlight.js to the Puck. Once running, press the button to toggle the night light on and off. The silicon cap that comes with the Puck.js does not diffuse the light from the onboard LEDs well enough to get the full effect. I found that removing the cap and setting in just on top of the puck works much better (see picture abovr). There is also a nice hack [here](http://forum.espruino.com/conversations/297639/) that uses a modified ping pong ball for better light diffusion. This does lower the brightness of the LEDs, however.

### Remote controlled
This requires two pucks. Send nightlight.js to the puck you want to use as the night light and controller.js to the puck you want to use as the controller. Before sending controller.js, first change ```_NAME = 'Puck.js 9fbc'``` to the name of the puck you are using as the night light. The night light puck can still be toggles by pressing its button, but the controller puck can also be pressed in order to toggle the lights. The puck will flash red three times if there was an error in the bluetooth transmission. If you get a lot of errors, the controller puck can be reset by pressing and holding the button for about 5 seconds until it flashes blue three times. It will flash green once when ready again.

### Auto sense
This also requires two pucks. As before, send nightlight.js to the night light puck and send controller-autosense.js to the second puck. Before sending, change ```_NAME = 'Puck.js 9fbc'``` to the name of the puck you are using as the night light and make sure the night light is turned off. Set the night light up wherever you want and put the other puck somewhere it can best measure the ambient light. That's it! When you turn the lights off, the night light will come on after a few seconds and turn itself back on when the lights come on.
