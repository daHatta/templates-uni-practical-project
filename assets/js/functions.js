
$(function () {
    // Show on console
    console.log('Document is ready to use');

    // Click on menu-button
    $('button.site-header__toggle-bar_menu-button').on('click', function () {

        var menu = document.getElementById('menu-list');
        $(menu).toggleClass('open');

        if ($('#menu-list').hasClass('open')) {
            $(this).children('i').removeClass('fa-bars');
            $(this).children('i').addClass('fa-times');
        } else {
            $(this).children('i').removeClass('fa-times');
            $(this).children('i').addClass('fa-bars');
        }
    });

    // Click on sub-menu-link
    $('#menu-list .menu-item-has-children a').on('click', function () {

        var sub = $(this).siblings();

        if (sub.length == 1) {
            $(sub).toggleClass('open-sub');
        }
    });

    // Click on search-toggle-button
    $('button.site-header__toggle-bar_search-button').on('click', function () {
        console.log('Search Bar')
        $('.site-header__search').toggleClass('open-search');

        if ($('.site-header__search').hasClass('open-search')){
            $(this).children('i').removeClass('fa-bars');
            $(this).children('i').addClass('fa-times');
        } else {
            $(this).children('i').removeClass('fa-times');
            $(this).children('i').addClass('fa-bars');
        }
    });

    // Grundriss Image-Map
    // Settings
    var clickedItemIndex = 0;

    // Click on a circle
    $('circle.cls-2').on('click', function () {

        // get all slides
        var slides = document.getElementsByClassName('overlay__content_slide');
        // make lightbox visible
        $('.overlay__background').css('display', 'block');
        // get index of clicked item
        clickedItemIndex = $(this).parent().index();
        //console.log("clickedItemIndex");
        console.log(clickedItemIndex);
        //var clickedItemId = $(this).parent().attr('id');
        //console.log(clickedItemId);

        // all slides invisble and tagged by class from id
        for (var i = 0; i < slides.length; i++) {
            $(slides[i]).css('display', 'none');
        }

        // involved slide
        var neededSlide = slides[clickedItemIndex-1];
        //console.log($(neededSlide).children('div.overlay__image_wrapper').find('img'));
        // clicked slide visible or not depending of a contained image
        if ($(neededSlide).children('div.overlay__image_wrapper').find('img').length != 0) {
            // show if image available
            $(slides[clickedItemIndex-1]).css('display', 'block');
        } else {
            // hide if no image and leave lightbox
            $(slides[clickedItemIndex-1]).css('display', 'none');
            $('.overlay__background').css('display', 'none');
        }

    // Transition of circles
    }).on('mouseenter', function () {
    $(this).css({'r': '24', 'transition': '0.5s ease'});
    }).on('mouseleave', function () {
    $(this).css({'r': '12', 'transition': '1s ease'});
    });


    // Image-gallery
    // Set width of image list
    function galleryResize() {

        $('.image-gallery__wrapper').each(function () {

            //console.log(this);
            var numberOfItems = $(this).children('ul').children('li').length;
            // width of single list item
            var listItemWidth = $(this).children('ul').children('li').width();
            // width of the gallery based on number of list-items
            // multiplied width single width including margin-right
            var galleryWidth = numberOfItems * (listItemWidth + 30);

            console.log(numberOfItems);
            // set width of gallery ul
            hideButtons($(this), numberOfItems, galleryWidth);

        });

    }

    //hide buttons if less then 3 list-items
    function hideButtons($wrapper, $number, $width) {
        if ($number <= 3) {
            $($wrapper).children('ul').css('width', $width);
            $($wrapper).children('button').css('display', 'none');
        }
    }

    // Make Buttons transparent if hover on image list
    $('.image-gallery__list').mouseenter(function () {
        var gallery = $(this).parent();
        gallery.addClass('gallery-effekt');
    });
    $('.image-gallery__list').mouseleave(function () {
        var gallery = $(this).parent();
        gallery.removeClass('gallery-effekt');
    });

    // Call Function
    galleryResize();

    // Click on left gallery button
    $('button.image-gallery__button_left').on('click', function () {
        showPrevious(this);
    });

    // Click on right gallery button
    $('button.image-gallery__button_right').on('click', function () {
        showNext(this);
    });

    // Show previous image
    function showPrevious($button) {

        var galleryId = $($button).parent().attr('id');
        var idBasedUl = '#' + galleryId + ' ul';
        var itemWidth = $(idBasedUl).children('li').width();
        var lastItem = $($button).siblings('ul').children('li:last-child');

        $(idBasedUl).animate({
            left: + itemWidth
        }, 200, function () {
            $(lastItem).prependTo(idBasedUl);
            $(idBasedUl).css('left', '');
        });

    }

    // Show next image
    function showNext($button) {

        var galleryId = $($button).parent().attr('id');
        var idBasedUl = '#' + galleryId + ' ul';
        var itemWidth = $(idBasedUl).children('li').width();
        var firstItem = $($button).siblings('ul').find('li:first-child');

        $(idBasedUl).animate({
            left: - itemWidth
        }, 200, function () {
            $(firstItem).appendTo(idBasedUl);
            $(idBasedUl).css('left', '');
        });
    }

    // Click on buttons of accordion-items
    $('button.accordion__item_trigger').on('click', function () {
        $(this).addClass('active');
        accordion(this);
    });

    // Function for Accordion
    function accordion($clickItem) {
        // Functionality for each Button
        $('button.accordion__item_trigger').each(function () {
            // Get
            var content = $(this).parent().parent().parent().children('div.accordion__item_region');

            if ($(this).is($clickItem) || $(this).hasClass('active')) {
                content.toggleClass('hidden');
                if (content.hasClass('hidden')) {
                    $(this).removeClass('active');
                }
            }

        });

    }

    // Function for Overlay
    $('a.image-gallery__list_link').on('click', function () {
        $('.overlay__background').css('display', 'block');
    })

    $('button.overlay__button_close').on('click', function () {
        $('.overlay__background').css('display', 'none');
    })

    // Functionality of Overlay Galerie
    var slideIndex = 1;
    showSlides(slideIndex);

    // Next Slide
    $('button.image-gallery__button_left').on('click', function () {
        showSlides(slideIndex += 1);
    });

    // Next Slide
    $('button.image-gallery__button_right').on('click', function () {
        showSlides(slideIndex -= 1);
    });

    function showSlides(item) {

        // Get all slides
        var slides = document.getElementsByClassName('overlay__content_slide');

        // No buttons if only one slide
        if (slides.length <= 1) {
            $('.overlay__gallery .image-gallery__button').css('display', 'none');
        }

        // Set index if higher than length
        if (item > slides.length) {
            slideIndex = 1;
        }
        // Set index if lower than one
        if (item < 1) {
            slideIndex = slides.length;
        }

        for (var i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex-1].style.display = "block";

    }

    // Window resize
    $(window).bind('resize', galleryResize);


});