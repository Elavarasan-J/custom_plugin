// Things should be consider while making new jquery plugin
// 1. (function($){}(jQuery))-> Immediately Invoked function expression
// 2. $.fn.functionName
// 3. To create options use $.extend method


(function($){                       
	$.fn.greenify = function(options){
		var settings = $.extend({   
			color:'green',
			bg:'white'
		}, options );
		return this.css({color:settings.color,backgroundColor:settings.bg});
	};
	$('.green').greenify({
		color:'red',
		bg:'#fff'
	});
}(jQuery));


// Custom selectbox
(function($){
	$.fn.ejsSelect = function(options){
		
		// Plugin options
		
		var defaultOptions = {maxWidth:300};
		var pluginOptions = $.extend({
			
			onChange : function(){
				console.log('onChanged callback function');
				console.log($('form').serialize());
			}
			
		},defaultOptions,options); 
		
		this.each(function(){
			 
			var optionLength, customElement, initialValue, selectedValue, optionElement, optionList, listElement,listOption;
			var _ = $(this);
			optionLength = _.children('option').length;
			
			// Add 'hidden' class to select and wrap it with in 'div'
			_.addClass('hidden');
			_.wrap('<div class="customSelect" style="max-width:'+pluginOptions.maxWidth+'px"></div>');

			// Selected value
			customElement = '<div class="selectedValue"></div>';
			_.after(customElement);

			// Get initial select value
			initialValue = _.find("option:selected").text();
			selectedValue = _.next('.selectedValue');
			$(selectedValue).text(initialValue);


			// Create ul
			optionElement = '<ul class="optionList"></ul>';
			$(optionElement).insertAfter(selectedValue);	
			optionList = _.siblings('.optionList'),listElement, listOption;;
			for(var i=0; i < optionLength; i++){
				listElement = '<li data-value="'+_.children().eq(i).val()+'">'+_.children().eq(i).text()+'</li>';
				$(listElement).appendTo(optionList);
			}
			listOption = optionList.children('li');	
			
			// Click event for 'selectedValue'
			$(selectedValue).click(function(){				 
				$(this).toggleClass('active').next().slideToggle();
			});

			// Click event for 'listOption'
			$(listOption).click(function(){
				$(listOption).removeClass('selected');
				$(this).addClass('selected')
				$(selectedValue).text($(this).text());
				_.val($(this).attr('data-value'));
				$(optionList).slideUp();
				
				// callback function
				pluginOptions.onChange.call(this);
			});
			  
			return this;
		});
	};
	
	$('select').ejsSelect({
		maxWidth:200,
		onChange:function(){
			console.log('onChanged callback function');
			console.log($('form').serialize());
		}
	});
	
}(jQuery));





// Jquery customModal
(function($){
	$.fn.ejsModal = function(){
		var defaultSettings = $.extend({
			onOpened : function(){
				console.log('Modal Opened !');
			},
			onClosed : function(){
				console.log('Modal Closed !');
			}
		});
		
		this.each(function(){
			var _this = $(this), targetWrapper, closeButton,_html = $('html');
			
			// open Modal
			_this.click(function(){
				targetWrapper = _this.data('content');
			 	$(targetWrapper).addClass('open');
				 
				
				// close button event
				closeButton = _this.children().find('.ejsModal-close').selector;
				$(closeButton).click(function(e){
					e.preventDefault();
					$(targetWrapper).removeClass('open');
				});

			});
			
			_html.on('click',function(event){
				if($(event.target).hasClass('ejsModal-wrapper')){
					 $(targetWrapper).removeClass('open');
				}
			});
			
			return this;
		});
	};
	$('.modalBox').ejsModal();
}(jQuery));	



// Jquery customTooltip
(function($){
	$.fn.ejsTooltip = function(options){
		
		this.each(function(){
			var _this = $(this), targetTooltip, targetPlacement, elementTop, elementLeft, elementWidth, elementHeight, tooltipWidth, tooltipHeight, elementNewLeft, targetTooltipWidth,tooltipTop, tooltipLeft, targetTitle;
			
			// Open Tooltip
			_this.mouseenter(function(e){				
				e.preventDefault();
				
				// targetWrapper
				targetTooltip = _this.data('content');
				targetTitle = _this.data('title');
				targetPlacement = _this.data('placement');
				
				$(targetTooltip+'>p').html(targetTitle);
				$(targetTooltip).addClass('open').toggleClass(targetPlacement);
				
				// Calculating position
				elementTop = e.target.offsetTop;
				elementLeft = e.target.offsetLeft;
				elementWidth = e.target.offsetWidth;
				elementHeight = e.target.offsetHeight;
				
				
				tooltipWidth = $(targetTooltip).outerWidth();
				tooltipHeight = $(targetTooltip).outerHeight();
				
			 	tooltipLeft = (elementLeft - (tooltipWidth / 2)) + (elementWidth / 2);
					
				if(targetPlacement == 'bottom'){
					tooltipTop = elementTop + elementHeight;	
				}
				
				else if(targetPlacement == 'top'){
					tooltipTop = elementTop - tooltipHeight;
				}
				else if (targetPlacement == 'left'){
					tooltipLeft = elementLeft - tooltipWidth;
					tooltipTop = (elementTop - (tooltipHeight / 2)) + (elementHeight /2);
				}
				else{
					tooltipLeft = elementLeft + elementWidth;
					tooltipTop = (elementTop - (tooltipHeight / 2)) + (elementHeight /2);
				}
				
				// Append the top & left value
				$(targetTooltip).css({top:tooltipTop,left:tooltipLeft}); 
			});
			_this.mouseleave(function(e){
				targetTooltip = _this.data('content');
				targetPlacement = _this.data('placement');
				$(targetTooltip).removeClass('open').removeClass(targetPlacement);
			});
			return this;
		});
	};
	
	$('[data-toggle="tooltip"]').ejsTooltip();
	
}(jQuery));



// Slider
(function($){
	$.fn.ejsSlider = function(){
		
		this.each(function(){
			var _this = $(this), currentSlider = 0, slideItem , slideItemLength, autoSliding;
			
			slideItem = _this.children().children();
			slideItemLength = slideItem.length;
			
			function slideEffect(){
				slideItem.removeClass('active');
				slideItem.eq(currentSlider).addClass('active');
			}
			
			autoSliding = setInterval(function(){
				currentSlider += 1;				
				 if(currentSlider == slideItemLength){
					currentSlider = 0;
				 }
				 
				slideEffect();
			},3000);
			
			_this.children('.ejsNext').click(function(e){
				console.log('Next button clicked');
				e.preventDefault();
				clearInterval(autoSliding);
				currentSlider += 1;
				if(currentSlider == slideItemLength){
					currentSlider = 0;
				 }
				slideEffect();
			});
			
			_this.children('.ejsPrev').click(function(e){
				console.log('Prev button clicked')
				e.preventDefault();
				clearInterval(autoSliding);
				currentSlider -= 1;
				if(currentSlider < 0){
					currentSlider = slideItemLength - 1;
				 }
				slideEffect();
			});
			
			return this;
		});
	};
	
	$('.ejsSlider').ejsSlider();
	
}(jQuery));


// Jquery customPopover
(function($){
	$.fn.ejsPopover = function(options){
		
		this.each(function(){
			var _this = $(this), targetPopover, targetPlacement, elementTop, elementLeft, elementWidth, elementHeight, popoverWidth, popoverHeight, elementNewLeft, targetPopoverWidth,popoverTop, popoverLeft;
			
			// Open Popover
			_this.click(function(e){				
				e.preventDefault();
				
				// targetWrapper
				targetPopover = _this.data('content');
				targetPlacement = _this.data('placement');
				$(targetPopover).toggleClass('open').toggleClass(targetPlacement);
				
				// Calculating position
				elementTop = e.target.offsetTop;
				elementLeft = e.target.offsetLeft;
				elementWidth = e.target.offsetWidth;
				elementHeight = e.target.offsetHeight;
				console.log(e)
				console.log(targetPlacement);
				popoverWidth = $(targetPopover).outerWidth();
				popoverHeight = $(targetPopover).outerHeight();
				
			 	popoverLeft = (elementLeft - (popoverWidth / 2)) + (elementWidth / 2);
					
				if(targetPlacement == 'bottom'){
					popoverTop = elementTop + elementHeight;	
				}
				
				else if(targetPlacement == 'top'){
					popoverTop = elementTop - popoverHeight;
				}
				else if (targetPlacement == 'left'){
					popoverLeft = elementLeft - popoverWidth;
					popoverTop = (elementTop - (popoverHeight / 2)) + (elementHeight /2);
				}
				else{
					popoverLeft = elementLeft + elementWidth;
					popoverTop = (elementTop - (popoverHeight / 2)) + (elementHeight /2);
				}
				
				// Append the top & left value
				$(targetPopover).css({top:popoverTop,left:popoverLeft});
				 
			});
			return this;
		});
	};
	
	$('.customPopover').ejsPopover();
	
}(jQuery));
