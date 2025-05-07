//fixed header
let hq = window.matchMedia('all and (max-width: 1024px)');
if (hq.matches) {
    
} else {
  $(window).scroll(function(){  
    if ($(this).scrollTop()>0)
    {    
      $("header").addClass("fixed")
      $(".h_cat_popup, .h_menu").addClass("short") 
    }else{
      $("header").removeClass("fixed")
      $(".h_cat_popup, .h_menu").removeClass("short") 
    }
  });
}


//body no_scroll
function toggleScroll() {
  $('body').toggleClass('no_scroll', $('.burger').hasClass('opened') || $('.h_cat_btn').hasClass('opened'))
}
//mobile menu
$(".burger").on('click', function() {
  $(this).toggleClass('opened')
  $(".h_menu").slideToggle(300)
  $('.h_cat_popup').slideUp(300)
  $('.h_cat_btn').removeClass('opened')
  toggleScroll()
})
//h_cat_popup
$('.h_cat_btn').on('click', function() {
  $(this).toggleClass('opened')
  $('.h_cat_popup').slideToggle(300)
  $(".h_menu").slideUp(300)
  $('.burger').removeClass('opened')
  toggleScroll()
})


//h_search popup
$('.hs_input').on('input', function() {
  if ($(this).val().trim() !== '') {
    $('.hs_popup').addClass('opened');
  } else {
    $('.hs_popup').removeClass('opened');
  }
});


//digits rise animation
$('.mti_digit > span').each(function() {
  var $this = $(this)
  var target = parseInt($this.text())
  var duration = 2000
  var start = 0
  var increment = target / (duration / 16)  
  $this.text('0')  
  var timer = setInterval(function() {
    start += increment
    if (start >= target) {
      clearInterval(timer)
      start = target
    }
    $this.text(Math.floor(start))
  }, 16)
})


//show more goods_list
$(".show_more").on('click', function() {
  $(this).hide()
  $('.goods_list').addClass('show_all')
})


//phone mask
$(function($){
  if ($(".phone").length) {
    $(".phone").mask("+7 (999) 999-9999");
  }
});



//modal
$('[data-modal=modal]').click(function(e) {
  e.preventDefault();
  var id = $(this).attr('data-pop');
  var maskHeight = $(document).height();
  var maskWidth = $(window).width();
  $('.mask').css({'width':maskWidth,'height':maskHeight});
  $('.mask').fadeIn(0);
  var winH = $(window).height();
  var winW = $(window).width();
  $(id).css('top',  winH/2-$(id).height()/2);
  $(id).css('left', winW/2-$(id).width()/2);
  $(id).fadeIn(200);
  $("body").css({"overflow":"hidden"});
});
$('.window .close, .mask').click(function (e) {
  e.preventDefault();
  $('.mask, .window').hide();
  $("body").css({"overflow":"auto"});
});






//owl controls setup
function setupCustomOwlControls(sliderClass) {
  const $slider = $(sliderClass);
  const $nav = $slider.find('.owl-nav');
  const $dots = $slider.find('.owl-dots');
  const $customNavContainer = $('<div class="custom-nav-container"></div>');
  
  $nav.find('.owl-prev').appendTo($customNavContainer);
  $dots.appendTo($customNavContainer);
  $nav.find('.owl-next').appendTo($customNavContainer);
  $nav.replaceWith($customNavContainer);
}

//owl sliders
$('.great_slider').addClass('owl-carousel');
$('.great_slider').owlCarousel({
    center: false,
    items: 4,
    loop: false,    
    margin: 15,
    autoWidth: false,
    responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 2,
          margin: 10,
        },
        768: {
          items: 3,
        },
        1200: {
          margin: 35,
        }
    }
});

$('.rev_slider').addClass('owl-carousel');
$('.rev_slider').owlCarousel({
    center: false,
    items: 3,
    loop: false,    
    margin: 15,
    autoWidth: false,
    responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 2,
          margin: 10,
        },
        1200: {
          margin: 22,
        }
    }
});

$('.materials_slider').addClass('owl-carousel');
$('.materials_slider').owlCarousel({
    center: false,
    items: 3,
    loop: false,    
    margin: 15,
    autoWidth: false,
    responsive: {
        0: {
          items: 1,
        },
        480: {
          items: 2,
          margin: 10,
        },
        1200: {
          margin: 22,
        }
    }
});

// turn on custom controls for sliders:
setupCustomOwlControls('.great_slider');
setupCustomOwlControls('.rev_slider');
setupCustomOwlControls('.materials_slider');


//good slider (synced)
var sync1 = $("#sync1");
var sync2 = $("#sync2");
var slidesPerPage = 3; //globaly define number of elements per page
var syncedSecondary = true;

sync1.owlCarousel({
    items: 1,
    slideSpeed: 2000,
    nav: false,
    autoplay: false,
    dots: true,
    loop: false,
    responsiveRefreshRate: 200,
}).on('changed.owl.carousel', syncPosition);

sync2
    .on('initialized.owl.carousel', function() {
        sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
        items: 3,
        dots: false,
        nav: true,
        smartSpeed: 100,
        slideSpeed: 100,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 5,
        vertical: true,
        verticalSwiping: true,
        responsiveRefreshRate: 100,
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
      var current = el.item.index;
      sync2
          .find(".owl-item")
          .removeClass("current")
          .eq(current)
          .addClass("current");
      var onscreen = sync2.find('.owl-item.active').length - 1;
      var start = sync2.find('.owl-item.active').first().index();
      var end = sync2.find('.owl-item.active').last().index();
      if (current >= 2) {
          sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
          sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
  }

function syncPosition2(el) {
    if (syncedSecondary) {
        var number = el.item.index;
        sync1.data('owl.carousel').to(number, 100, true);
    }
}

sync2.on("click", ".owl-item", function(e) {
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
});