$(window).load(function() {
   $("#styleDivTitle").css({
		"border-bottom": "5px solid black",
		"padding": ".25em 5px .25em 5px"
		});
	$("body").has("#styleDivTitle").has("#styleDivScrolling").css({
		"overflow": "hidden",
		"margin": "0px",
		"padding": "0px"
	});
	$("#styleDivScrolling").css({
		"overflow-y": "scroll",
		"padding": "5px"
		});
	setScrollingDivHeight();
	$(window).resize(setScrollingDivHeight);	
});

function setScrollingDivHeight() {
	//IE in quirks mode doesn't take padding into account correctly. Compensating for that.
	var padding=($.browser.msie && !jQuery.support.boxModel) ? 0 : 10; //Hard-coding the padding to reflect the styles I write above
	$("#styleDivScrolling").height($(window).height()-$("#styleDivTitle").outerHeight()-padding);
}

function AdjustScroll() {
	setScrollingDivHeight();
}

function adjustScroll() {
	setScrollingDivHeight();
}