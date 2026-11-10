/*
  To upload to your Gemma:
  1) Select the proper board from the Tools->Board Menu (Adafruit Gemma 8MHz)
  2) Select the uploader from the Tools->Programmer "USBtinyISP")
  3) Plug in the Gemma into USB, make sure you see the green LED lit
  4) For windows, make sure you install the right Gemma drivers
  5) Press the button on the Gemma/Trinket - verify you see
     the red LED pulse. This means it is ready to receive data
  6) Click the upload button above within 10 seconds
*/

/* SEQUIN SETUP */

//data line setup
int onLights = 2;             
int fadeLights = 1;
int blinkLights = 0;           

//setup for sequins that stay on
int onBrightness = 200;       // can be any value between 0 (off) and 255 (full brightness)

//setup for fading sequins
int fadeBrightness = 0;       // how bright the LED is
int fadeAmount = 5;           // how many points to fade the LED by

// the setup routine runs once when you press reset:
void setup() {
  // initialize sequins
  pinMode(onLights, OUTPUT);
  pinMode(fadeLights, OUTPUT);
  pinMode(blinkLights, OUTPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  /* ~~~ Code for ON Sequins ~~~ */
  analogWrite(onLights, onBrightness);
  /* ~~~ End of code for ON Sequins ~~~ */


  /* ~~~ Code for Fading Sequins ~~~ */
  // set the fadeBrightness of fading sequins:
  analogWrite(fadeLights, fadeBrightness);

  // change the fadeBrightness for next time through the loop:
  fadeBrightness = fadeBrightness + fadeAmount;

  // reverse the direction of the fading at the ends of the fade:
  if (fadeBrightness == 0 || fadeBrightness == 255) {
    fadeAmount = -fadeAmount ;
    digitalWrite(blinkLights, HIGH);
  } else {
    digitalWrite(blinkLights, LOW);
  }
  
  // wait for 30 milliseconds to see the dimming effect
  delay(20);
  /* ~~ End of code for Fading Sequins ~~~ */

  /* ~~~ Code for Blinking Sequins ~~~ */

}

