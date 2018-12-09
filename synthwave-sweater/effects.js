$(document).ready(function(){
  /* All of the cool taglines I want to rotate through */
  var taglines = [
    "I would knit to be with you",
    "Will you come to tech knit with me",
    "I want to drive you through the knit",
    "You gotta knit for your life",
    "Silhouette into the Stitch",
    "I'm picking... up... the stitch ",
    "I am your knit purl, rip my heart out",
    "The right kind of purl to steal my dreams away",
    "Darkness falling yet another knit ",
    "You're the Turbo Knitter",
    "And to knitting we'll return"
  ];

  /* Pick one randomly */
  var pick = Math.floor(Math.random() * 10);

  /* Make it the tagline */
  $(".tagline").text(taglines[pick]);
});
