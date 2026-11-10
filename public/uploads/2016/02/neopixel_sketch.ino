/* Don't do anything to these first few lines, 
 *  they import the libraries needed to make neopixels work
 */
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
  #include <avr/power.h>
#endif   

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

/* NEOPIXEL SETUP */
#define PIN 1                 //the data line the neopixels are attached to
int numPixels = 5;             //how many neopixels you have used

Adafruit_NeoPixel strip = Adafruit_NeoPixel(numPixels, PIN, NEO_GRB + NEO_KHZ800); //don't change this line
 
void setup() {
  //initialize neopixels
  strip.begin();
  strip.show(); // Initialize all pixels to 'off'

  //initialize lights on pin 2
  pinMode(2, OUTPUT);
}
 
// this is the code your gemma is running
// it runs over and over again from the time you turn it on until you turn it off
void loop() {
  //turn on lights attached to D2
  analogWrite(2, 200);
 
  /* Animations start here. You can either delete or comment out any animations you 
     don't wan't running (comment by addding // to the beginning of the line.
     You can also repeat or add animations you like by repeating lines. */

  //color wipes fill pixels one after another with color
  //colors are (Red, Green, Blue) values. 255 is full brightness, 0 is off
  colorWipe(strip.Color(255, 0, 0), 200); // Red with 200 millisecond delay
  colorWipe(strip.Color(0, 255, 0), 100); // Green with 100 millisecond delay
  colorWipe(strip.Color(0, 0, 255), 400); // Blue with 400 millisecond delay
  
  //theater chase is a blinking animation
  theaterChase(strip.Color(127, 127, 127), 50); // White, 50 millisecond on all delays
  theaterChase(strip.Color(175, 60, 0), 50); //Orange
  theaterChase(strip.Color(60, 0, 175), 50); //Purple
  theaterChase(strip.Color(127, 100, 0), 50); //Yellow

  //all pixels cycle through the rainbow
  rainbow(20); //cycle for 20 seconds

  //rainbow cycle evenly distributes a rainbow across your pixels,
  // and then cycles through the rainbow across all of them
  // (it's the best)
  rainbowCycle(20); //cycle for 20 seconds

  // blinking rainbow
  theaterChaseRainbow(50); //chase for 20 seconds

  /* ~~~ end code for neopixel animations ~~~*/
}

/* ~~~ Everything below here is the actual programming for the animations. 
 *  I recommend not changing anything, unless you are a confident programmer :)
 */

void colorWipe(uint32_t c, uint8_t wait) {
  for(uint16_t i=0; i<strip.numPixels(); i++) {
    strip.setPixelColor(i, c);
    strip.show();
    delay(wait);
  }
}
void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i+j) & 255));
    }
    strip.show();
    delay(wait);
  }
}
void rainbowCycle(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256*5; j++) { // 5 cycles of all colors on wheel
    for(i=0; i< strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel(((i * 256 / strip.numPixels()) + j) & 255));
    }
    strip.show();
    delay(wait);
  }
}
void theaterChase(uint32_t c, uint8_t wait) {
  for (int j=0; j<10; j++) {  //do 10 cycles of chasing
    for (int q=0; q < 3; q++) {
      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, c);    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}
void theaterChaseRainbow(uint8_t wait) {
  for (int j=0; j < 256; j++) {     // cycle all 256 colors in the wheel
    for (int q=0; q < 3; q++) {
      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, Wheel( (i+j) % 255));    //turn every third pixel on
      }
      strip.show();

      delay(wait);

      for (int i=0; i < strip.numPixels(); i=i+3) {
        strip.setPixelColor(i+q, 0);        //turn every third pixel off
      }
    }
  }
}
uint32_t Wheel(byte WheelPos) {
  WheelPos = 255 - WheelPos;
  if(WheelPos < 85) {
    return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  }
  if(WheelPos < 170) {
    WheelPos -= 85;
    return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
  WheelPos -= 170;
  return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
}
