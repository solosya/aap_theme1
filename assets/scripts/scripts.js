$('document').ready(function() {
    var isMenuBroken, isScrolledPass, stickHeader, isMobile;
    var sbCustomMenuBreakPoint = 1310;
    var mobileView = 620;

    isMenuBroken = function(){
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            return false;
        }
        return true;
    };

    isScrolledPass = function(){
        var scroll = $(window).scrollTop();
        if (scroll >= 40) {
            return true;
        }
        return false;
    };

    isMobile = function(){
        if (window.innerWidth < mobileView) {
            return true;
        }
        return false;
    };

    isHomePage = function(){
        var body = $("body");
        if ( body.hasClass("home") && !body.hasClass("blog") && !body.hasClass("channel") ) {
            return true;
        } else {
            return false;
        }
    };

    stickHeader = function(){
        if ( !isHomePage() || isMobile() ) {
            $("#masthead").addClass("stick");
        } else {
            if ( isScrolledPass() ) {
                $("#masthead").addClass("stick");
            } else {
                $("#masthead").removeClass("stick");
            }
        }
        return false;
    };

    $(".scroll-to-top").on("click", function (e) {
         $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

    $(".menu-mobile").on("click", function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        $(this).toggleClass("active");
        $(thisMenuElem).find('ul.menu').toggleClass("show-on-tablet");
        $(thisMenuElem).toggleClass('open');
        // e.preventDefault();
    });

    //Onload and resize events
    $(window).on("resize", function () {
        stickHeader();
    }).resize();

    //On Scroll
    $(window).scroll(function() {
        stickHeader();
    });

    $(".sb-custom-menu > ul").before("<a href=\"#\" class=\"menu-mobile\"><span class=\"sr-only\">MENU</span></a>");

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');

    // $(".sb-custom-menu > ul > li").hover(function (e) {
    //     if (window.innerWidth > sbCustomMenuBreakPoint) {
    //         $(this).children("ul").stop(true, false).slideToggle(225);
    //         $(this).toggleClass('now-active');
    //         e.preventDefault();
    //     }
    // });

    $("li.menu-item-search").bind("mouseenter focus mouseleave",function () {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $("input#header-search").focus();
            return false;
        }
    });

    //Mobile related
    $( "ul.menu > li.menu-item-has-children > ul.sub-menu" ).each(function( index ) {
        
            var prevElem, newBackLink, chilmenuContainer;

            prevElem =  $( this ).prev().html();
            chilmenuContainer = $( this ).children('.back-button-mobile');
            newBackLink = '<div class="bank-btn-mobile-wrpr"><div class="menu-item back-to-parent"><a href="#">Back</a></div>';
            newBackLink += '<div class="menu-item title-menu-mobile">'+prevElem+'</div></div>';

            $( chilmenuContainer ).prepend( newBackLink );
        
    });

    $('.menu > ul > li:has( > ul)').addClass('menu-dropdown-icon');

    $(".menu-mobile").click(function (e) {
        var thisMenuElem = $(this).parent('.sb-custom-menu');
        $(thisMenuElem).children('ul').toggleClass('show-on-tablet');
        $(thisMenuElem).toggleClass('open');
        // e.preventDefault();
    });

    $(".sb-custom-menu > ul > li > a").click(function(e) {
        if (window.innerWidth < sbCustomMenuBreakPoint) {
            $(this).parent().children('ul').addClass('pushed');
            $(this).parents('ul').addClass('big-menu-pushed');
        }
        // e.preventDefault();
    });

    //On mobile close menu for login popup
    $(".login-link").click(function (e) {
        if (window.innerWidth < sbCustomMenuBreakPoint) {
            var thisMenuElem = $(this).parents('.sb-custom-menu');
            $(thisMenuElem).children('ul').toggleClass('show-on-tablet');
            $(thisMenuElem).toggleClass('open');
        }
    });

    //Go back
    $(".sb-custom-menu .back-to-parent > a").click(function(e) {
        if (window.innerWidth < sbCustomMenuBreakPoint) {
            $(this).parents().children('ul.sub-menu').removeClass('pushed');
            $(this).parents('ul.menu').removeClass('big-menu-pushed');
        }
        // e.preventDefault();
    });
    //For accessibility
    $(".sb-custom-menu > ul > li > a").focus(function(e) {
        if (window.innerWidth > sbCustomMenuBreakPoint) {
            $('ul.menu > li').children('ul.sub-menu').stop(true,true).slideUp('fast');
            $(this).parent().children('ul').stop(true,true).slideDown('fast');
            // e.preventDefault();
        }
    });



    $('#profile').on('click', function(e) {
        console.log('clicked');
        $('#header__menu').toggleClass('Profile_Open');
        $('body').toggleClass('no_profile');
        e.preventDefault();
    });

    cardHolder = '';
    clearTimeout(cardHolder);
    cardHolder = setTimeout((function() {
        $('.card p, .card h2').dotdotdot({
            watch: true
        });
    }), 750);


    //Main slider
    var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            effect: 'fade',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            pagination: '.swiper-pagination',
            paginationType: "bullets",
            bulletClass : "pagination-item",
            bulletActiveClass : "active",
            paginationBulletRender: function (swiper, index, className) {
                var names = [];
                $(".swiper-slide").each(function(i) {
                  names.push($(this).data("title"));
                });
                return '<div class="'+className+'"><h2>' + names[index] + '</h2></div>';
            }
        });

    $(".pagination-item").on("click", function(){
        var slideToSlide = $(this).data("slide");
        swiper.slideTo(slideToSlide);
    });

});
