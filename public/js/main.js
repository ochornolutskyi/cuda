$(function() {
  //SCROLLING
  //scrolling navigation scroll
  $("#nav").on("click", "a", function(event) {
    event.preventDefault();
    let id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 750);
  });
  //scrolling header button scroll
  $(".header-content__button").click(function(event) {
    event.preventDefault();
    let top = $("#contact").offset().top;
    $("body,html").animate({ scrollTop: top }, 750);
  });
  //scrolling top scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $(".scrollUp").fadeIn();
    } else {
      $(".scrollUp").fadeOut();
    }
  });
  $(".scrollUp").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 750);
    return false;
  });

  //ERRORS
  let addError = function(message) {
    return $(
      '<div class="error-block">Whoops, ' +
        message +
        '<div class="error-block__button">Close</div></div>'
    )
      .hide()
      .appendTo("body")
      .fadeIn(500);
  };
  let hideError = function(callback) {
    $(".error-block__button").click(function() {
      $(".error-block").fadeOut(500);
      callback();
    });
  };
  let notActive = function(getElement) {
    if (getElement.is("a")) return getElement.css("pointer-events", "none");
    if (getElement.is("button")) return getElement.attr("disabled", true);
  };
  let isActive = function(getElement) {
    if (getElement.is("a")) return getElement.css("pointer-events", "auto");
    if (getElement.is("button")) return getElement.removeAttr("disabled");
  };
  $("#blogLink").click(function(event) {
    event.preventDefault();
    message = "we have not blog page :(";
    notActive($(this));
    $(addError(message));
    hideError(() => {
      isActive($(this));
    });
  });
  $(".gallery-button").click(function(event) {
    event.preventDefault();
    message = "no more projects";
    notActive($(this));
    $(addError(message));
    hideError(() => {
      isActive($(this));
    });
  });

  //GALLERY CHANGES
  $(".portfolio-content__menu-button").click(function() {
    //gallery menu button changes on active
    $(".portfolio-content__menu-button").removeClass("active");
    $(this).addClass("active");
    //current gallery content
    let id = $(this).attr("id");
    $(".gallery-item").css({ display: "none" });
    let elementName = "";
    switch (id) {
      case "buttonAll":
        elementName = ".gallery-item";
        break;
      case "buttonWeb":
        elementName = ".gallery-item__web";
        break;
      case "buttonApps":
        elementName = ".gallery-item__apps";
        break;
      case "buttonIcons":
        elementName = ".gallery-item__icons";
        break;
    }
    return $(elementName)
      .fadeIn(500)
      .css({ display: "block" });
  });
});