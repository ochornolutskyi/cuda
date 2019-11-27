$(function() {
  //SCROLLING
  //scrolling navigation scroll
  $("#nav>ul>li:not(:first-child)").on("click", "a", function(event) {
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

  //CONTACT FORM BACK BUTTON
  $(window).ready(function() {
    $(".back-button").show(500);
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
  let lockButton = function(getElement) {
    if (getElement.is("a")) return getElement.css("pointer-events", "none");
    if (getElement.is("button")) return getElement.attr("disabled", true);
  };
  let unlockButton = function(getElement) {
    if (getElement.is("a")) return getElement.css("pointer-events", "auto");
    if (getElement.is("button")) return getElement.removeAttr("disabled");
  };
  //errors block
  $("#blogLink").click(function(event) {
    event.preventDefault();
    message = "we have not blog page :(";
    lockButton($(this));
    $(addError(message));
    hideError(() => {
      unlockButton($(this));
    });
  });
  $(".gallery-button").click(function(event) {
    event.preventDefault();
    message = "no more projects";
    lockButton($(this));
    $(addError(message));
    hideError(() => {
      unlockButton($(this));
    });
  });
  $("#dribble").click(function(event) {
    event.preventDefault();
    message = "dribble account will add soon";
    lockButton($(this));
    $(addError(message));
    hideError(() => {
      unlockButton($(this));
    });
  });
  $("#behance").click(function(event) {
    event.preventDefault();
    message = "behance account will add soon";
    lockButton($(this));
    addError(message);
    hideError(() => {
      unlockButton($(this));
    });
  });
  $("#google").click(function(event) {
    event.preventDefault();
    message = "googlePlus account will add soon";
    lockButton($(this));
    addError(message);
    hideError(() => {
      unlockButton($(this));
    });
  });
  $("#twitter").click(function(event) {
    event.preventDefault();
    message = "twitter account will add soon";
    lockButton($(this));
    addError(message);
    hideError(() => {
      unlockButton($(this));
    });
  });
  //GALLERY CHANGE SLIDES
  $(".portfolio-content__menu-button").click(function() {
    //change button activity
    $(".portfolio-content__menu-button").removeClass("active");
    $(this).addClass("active");
    //change current gallery content
    let idButton = $(this).attr("id");
    $(".gallery-item").css({ display: "none" });
    let classElement = "";
    switch (idButton) {
      case "buttonAll":
        classElement = ".gallery-item";
        break;
      case "buttonWeb":
        classElement = ".gallery-item__web";
        break;
      case "buttonApps":
        classElement = ".gallery-item__apps";
        break;
      case "buttonIcons":
        classElement = ".gallery-item__icons";
        break;
    }
    return $(classElement)
      .fadeIn(500)
      .css({ display: "block" });
  });

  //SLICK-SLIDER CONFIG
  $(".about-content__slider").slick({
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    rows: 2,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          rows: 4,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          rows: 2,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      },
      {
        breakpoint: 481,
        settings: {
          rows: 2,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true
        }
      }
    ]
  });
});
