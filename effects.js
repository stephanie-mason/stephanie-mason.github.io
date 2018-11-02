$(document).ready(function(){
  $.preloadImages = function() {
    for (var i = 0; i < arguments.length; i++) {
      $("<img />").attr("src", arguments[i]);
    }
  }

  $.preloadImages("images/hat.jpg",
  "images/muzak.jpg",
  "images/cyberpunk",
  "images/blackspace.jpg",
  "images/fit.jpg",
  "images/galaxy.jpg",
  "images/glitchlich.jpg",
  "images/pank.jpg",
  "images/temporary.jpg",
  "images/threedee.jpg",
  "images/whitespace.jpg");

  $("#about-link").click(function(){ $("#about").show() });
  $("#contact-link").click(function(){ $("#contact").show() });
  $(".close").click(function(){ $(this).parent().hide() });

  function Section(bgImage, menuColor, menuText, menuPos) {
    this.bgImage = bgImage;
    this.menuColor = menuColor;
    this.menuText = menuText;
    this.intersectSet;
    this.selected = false;
    this.menuPos = menuPos;
  };

  var art = new Section("temporary.jpg", "red", "black", 0);
  var textiles = new Section("threedee.jpg", "aqua", "black", 1);
  var electronics = new Section("glitchlich.jpg", "lime", "white", 2);
  var code = new Section("muzak.jpg", "lime", "black", 3);
  var web = new Section("pank.jpg", "magenta", "black", 4);
  var design = new Section("fit.jpg", "red", "black", 5);
  var science = new Section("galaxy.jpg", "aqua", "white", 6);
  var random = new Section("hat.jpg", "deeppink", "black", 7);

  art["intersectSet"] = [textiles];
  science["intersectSet"] = [design];
  textiles["intersectSet"] = [art, electronics, design];
  code["intersectSet"] = [];
  electronics["intersectSet"] = [textiles];
  web["intersectSet"] = [design];
  design["intersectSet"] = [science, web, textiles];
  random["intersectSet"] = [];


  var sectionSet = [art, science, textiles, code, electronics, web, design, random];
  var currentlySelected = [];

  /* HOVERING OVER THE MENU MAKES THINGS HAPPEN */
  $('.main-nav li').mouseenter(function(){
    var buttonId = eval($(this).attr("id").split("-")[0]);
    var bgUrl = 'url("images/' + buttonId["bgImage"] + '")';
    var menuUrl = buttonId["menuText"] == "white" ? 'url("images/blackspace.jpg")' : 'url("images/whitespace.jpg")'
    var bgPos = ((sectionSet.indexOf(buttonId)/sectionSet.length) * 100 + "%");

    $(this).find("span").show();
    $('.right-side').css('background-image', bgUrl);
    $('.main-nav').css('background-image', menuUrl).css('color', buttonId["menuText"]).css('background-position-y', bgPos);
  });

  $('.main-nav li').mouseleave(function(){
    var buttonId = eval($(this).attr("id").split("-")[0]);
    if(!buttonId["selected"]) $(this).find("span").hide();
  });


  /* CLICKING BUTTONS DOES SOME SPECIAL THINGS TOO */
  $('.main-nav li').on('click', function(){
    var sectionName = $(this).attr("id").split("-")[0];
    var section = eval(sectionName);

    $('.scroll-down').show();

    // Nothing clicked yet
    if(currentlySelected.length == 0) {
      $(this).css('background-color', section["menuColor"]).find("span").show();
      $("#" + sectionName).show();
      section["selected"] = true;
      currentlySelected.push(sectionName);
    }

    else if (currentlySelected.length == 1){
      currentSelection = currentlySelected[0];
      newSelection = section;

      // Something selected, but no joint projects with the new thing
      //if(eval(currentSelection)["intersectSet"].indexOf(newSelection) == -1) {
      // deselect the current selection and hide the content
      $("#" + currentSelection + "-button").css('background-color', 'transparent').find("span").hide();
      $("#" + currentSelection).hide();
      currentSelection["selected"] = false;
      currentlySelected.pop();

      // select the new thing and show the content
      $(this).css('background-color', newSelection["menuColor"]).find("span").show();
      $("#" + sectionName).show();
      newSelection["selected"] = true;
      currentlySelected.push(sectionName);
      //}

      // Something selected, has joint projects with the new thing
      //else {
      //  if (newSelection["menuPos"] > eval(currentSelection)["menuPos"]) {
      //    $("#" + currentSelection + "-button").find("span").hide();
      //    $(this).find("span").show();
      //    eval(currentSelection)["selected"] = false;
      //    newSelection["selected"] = true;
      //  }

      //  $(this).css('background-color', section["menuColor"]).find("span").show()
      //  currentlySelected.push(sectionName);

      //  $("#" + sectionName + "-" + currentSelection).show();
      //  $("#" + currentSelection + "-" + sectionName).show();
      //  $("#" + currentSelection).hide();
      //};
    }

    // A third thing gets clicked...
    //else {
    //  var oldSelectionOne = currentlySelected.pop()
    //  var oldSelectionTwo = currentlySelected.pop()
    //  $("#" + oldSelectionOne + "-button").css('background-color', 'transparent').find("span").hide();
    //  $("#" + oldSelectionTwo + "-button").css('background-color', 'transparent').find("span").hide();
    //  $("#" + oldSelectionOne + "-" + oldSelectionTwo).hide();
    //  $("#" + oldSelectionTwo + "-" + oldSelectionOne).hide();
    //  eval(oldSelectionOne)["selected"] = false;
    //  eval(oldSelectionTwo)["selected"] = false;
    //
    //  $(this).css('background-color', section["menuColor"]).find("span").show();
    //  $("#" + sectionName).show();
    //  section["selected"] = true;
    //  currentlySelected.push(sectionName);
    //}
  });

  console.log("hey cutie.");
  console.log("I see u, peepin my back end ;)");


});
