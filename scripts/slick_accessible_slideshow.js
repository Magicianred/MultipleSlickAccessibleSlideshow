$(document).ready(function(){
  var currentPosition = 0;
  var slide_class = "slide";
  var slidesContainer_class = "slidesContainer";
  var slideWidth = 560;
  var slidesContainers = $("."+slidesContainer_class);

  $( window ).resize(function() {
		slideWidth = ($( window ).width())/1.7;
		$('.'+slide_class).css({
     'width' : slideWidth
    });
	});

  // Remove scrollbar in JS
  $('.'+slidesContainer_class).css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div for each slidersContainer
	$.each(slidesContainers, function( index, value ) {
		container = slidesContainers.eq(index);
		container.attr('data-currentPosition',0);
		slides = container.find('.'+slide_class);
		numberOfSlides = slides.length;
		slides
			.wrapAll('<div id="slideInner_'+ container.attr('id') +'" class="slideInner" data-numberOfSlides="'+numberOfSlides+'"></div>')
			// Float left to display horizontally, readjust .slides width
		.css({
				'float' : 'left',
				'width' : slideWidth
			});

		// Insert controls in the DOM
		container.parent('.slideshow')
			.prepend('<span id="leftControl_'+container.attr('id')+'" class="control leftControl">Clicking moves left</span>')
			.append('<span id="rightControl_'+container.attr('id')+'" class="control rightControl">Clicking moves right</span>');

		currentPosition = 0;
		// Hide left arrow control on first load
		manageControls(container,currentPosition);

		// Set #slideInner width equal to total width of all slides
		container.find('.slideInner').css('width', slideWidth * numberOfSlides);

	});



  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    // Determine new position
    $container = $(this).parent('.slideshow').find('.'+slidesContainer_class);
    currentPosition = parseInt($container.attr('data-currentPosition'));
		currentPosition = ($(this).attr('class')=='control rightControl') ? (currentPosition)+1 : (currentPosition)-1;
		$container.attr('data-currentPosition',currentPosition);

		// Hide / show controls
			manageControls($container,currentPosition);
			// Move slideInner using margin-left
			$container.find('.slideInner').animate({
				'marginLeft' : slideWidth*(-currentPosition)
			});
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(container, position){
				// Hide left arrow if position is first slide
			if(position==0){
				container.parent('.slideshow').find('.leftControl').hide() } else{ container.parent('.slideshow').find('.leftControl').show() }
			// Hide right arrow if position is last slide
			if(position==container.find('.slideInner').attr('data-numberOfSlides')-1){
				container.parent('.slideshow').find('.rightControl').hide()
			} else{
				container.parent('.slideshow').find('.rightControl').show()
			}
	}
});