
$(document).ready(function() {
 
        //options( 1 - ON , 0 - OFF)
        var auto_slide = 1;
            var hover_pause = 1;
        var key_slide = 1;
 
        //speed of auto slide(
        var auto_slide_seconds = 5000;
        /* IMPORTANT: i know the variable is called ...seconds but it's
        in milliseconds ( multiplied with 1000) '*/
 
        /*move the last list item before the first item. The purpose of this is
        if the user clicks to slide left he will be able to see the last item.*/
        $('#carousel ul li:first').before($('#carousel ul li:last'));
 
        //check if auto sliding is enabled
        if(auto_slide == 1){
            /*set the interval (loop) to call function slide with option 'right'
            and set the interval time to the variable we declared previously */
            var timer = setInterval('slide("right")', auto_slide_seconds);
 
            /*and change the value of our hidden field that hold info about
            the interval, setting it to the number of milliseconds we declared previously*/
            $('#hidden_auto_slide_seconds').val(auto_slide_seconds);
        }
 
        //check if hover pause is enabled
        if(hover_pause == 1){
            //when hovered over the list
            $('#carousel ul').hover(function(){
                //stop the interval
                clearInterval(timer)
            },function(){
                //and when mouseout start it again
                timer = setInterval('slide("right")', auto_slide_seconds);
            });
 
        }
 
        //check if key sliding is enabled
        if(key_slide == 1){
 
            //binding keypress function
            $(document).bind('keypress', function(e) {
                //keyCode for left arrow is 37 and for right it's 39 '
                if(e.keyCode==37){
                        //initialize the slide to left function
                        slide('left');
                }else if(e.keyCode==39){
                        //initialize the slide to right function
                        slide('right');
                }
            });
 
        }
 
  });
 
//FUNCTIONS BELLOW
 
//slide function
function slide(where){
 
            //get the item width
            var item_width = $('#carousel ul li').outerWidth() + 10;
 
            /* using a if statement and the where variable check
            we will check where the user wants to slide (left or right)*/
            if(where == 'left'){
                //...calculating the new left indent of the unordered list (ul) for left sliding
                var left_indent = parseInt($('#carousel ul').css('left')) + item_width;
            }else{
                //...calculating the new left indent of the unordered list (ul) for right sliding
                var left_indent = parseInt($('#carousel ul').css('left')) - item_width;
 
            }
 
            //make the sliding effect using jQuery's animate function... '
            $('#carousel ul:not(:animated)').animate({'left' : left_indent},1000,function(){
 
                /* when the animation finishes use the if statement again, and make an ilussion
                of infinity by changing place of last or first item*/
                if(where == 'left'){
                    //...and if it slided to left we put the last item before the first item
                    $('#carousel ul li:first').before($('#carousel ul li:last'));
                }else{
                    //...and if it slided to right we put the first item after the last item
                    $('#carousel ul li:last').after($('#carousel ul li:first'));
                }
 
                //...and then just get back the default left indent
                $('#carousel ul').css("left","-247px");
            });
 
}
function showPassword() {
    
    var key_attr = $('#key').attr('type');
    
    if(key_attr != 'text') {
        
        $('.checkbox').addClass('show');
        $('#key').attr('type', 'text');
        
    } else {
        
        $('.checkbox').removeClass('show');
        $('#key').attr('type', 'password');
        
    }
    
}

$(document).ready(function(){

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current){
        $('#show-previous-image, #show-next-image').show();
        if(counter_max == counter_current){
            $('#show-next-image').hide();
        } else if (counter_current == 1){
            $('#show-previous-image').hide();
        }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr){
        var current_image,
            selector,
            counter = 0;

        $('#show-next-image, #show-previous-image').click(function(){
            if($(this).attr('id') == 'show-previous-image'){
                current_image--;
            } else {
                current_image++;
            }

            selector = $('[data-image-id="' + current_image + '"]');
            updateGallery(selector);
        });

        function updateGallery(selector) {
            var $sel = selector;
            current_image = $sel.data('image-id');
            $('#image-gallery-caption').text($sel.data('caption'));
            $('#image-gallery-title').text($sel.data('title'));
            $('#image-gallery-image').attr('src', $sel.data('image'));
            disableButtons(counter, $sel.data('image-id'));
        }

        if(setIDs == true){
            $('[data-image-id]').each(function(){
                counter++;
                $(this).attr('data-image-id',counter);
            });
        }
        $(setClickAttr).on('click',function(){
            updateGallery($(this));
        });
    }
});



// Create a clone of the menu, right next to original.
$('.menu').addClass('original').clone().insertAfter('.menu').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();

scrollIntervalID = setInterval(stickIt, 10);


function stickIt() {

  var orgElementPos = $('.original').offset();
  orgElementTop = orgElementPos.top;               

  if ($(window).scrollTop() >= (orgElementTop)) {
    // scrolled past the original position; now only show the cloned, sticky element.

    // Cloned element should always have same left position and width as original element.     
    orgElement = $('.original');
    coordsOrgElement = orgElement.offset();
    leftOrgElement = coordsOrgElement.left;  
    widthOrgElement = orgElement.css('width');
    $('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
    $('.original').css('visibility','hidden');
  } else {
    // not scrolled past the menu; only show the original menu.
    $('.cloned').hide();
    $('.original').css('visibility','visible');
  }
}

// $(document).ready(function () {
//     $('#myCarousel').carousel({
//         interval: 10000
//     })
//     $('.fdi-Carousel .item').each(function () {
//         var next = $(this).next();
//         if (!next.length) {
//             next = $(this).siblings(':first');
//         }
//         next.children(':first-child').clone().appendTo($(this));

//         if (next.next().length > 0) {
//             next.next().children(':first-child').clone().appendTo($(this));
//         }
//         else {
//             $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
//         }
//     });
// });
$(document).ready(function(){
      $('body').append('<div id="toTop" class="btn btn-warning hidden-lg hidden-md hidden-sm"><span class="glyphicon glyphicon-chevron-up"></span></div>');
        $(window).scroll(function () {
            if ($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();
            } else {
                $('#toTop').fadeOut();
            }
        }); 
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 2000);
        return false;
    });
});








$(document).ready(function() {
  $('#olvidado').click(function(e) {
    e.preventDefault();
    $('div#form-olvidado').toggle('500');
  });
  $('#acceso').click(function(e) {
    e.preventDefault();
    $('div#form-olvidado').toggle('500');
  });
});














