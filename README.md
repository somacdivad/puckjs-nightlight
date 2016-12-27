# puckjs-nightlight
A color changing night light for Puck.js.

## About this project
I wanted to make something fun for my 9-year-old daughter with my Puck.js and had the idea for a color changing night light that she could turn on and off easily. Pressing the Puck.js button turns the night light on. When activated, the Puck lights up and slowly changes color. Pressing the button again turns off the night light. Each time the night light is activated, the starting color, color sequence and fade times are randomized. We found that the night light looks best when the silicon cover is removed and set on top of the Puck to allow greater diffusion of the LEDs. This makes it more difficult to turn the night light on and off, so a second Puck.js can be used as a remote control.

## Installation
Upload nightlight.js to the Puck.js you want to be the night light, and (optionally) upload controller.js to the Puck.js you want to be the controller and replace ```_NAME = 'Puck.js 9fb2'``` with the name of the Puck.js used as the night light. Nightlight.js has been tested on firmware 1v88 and up, and controller.js has been tested on firmware 1v90.5.
