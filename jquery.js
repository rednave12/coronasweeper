$(function() {
    setupOverlay = function(canvW, canvH) {
		$("#overlay").css({'width': canvW });
		$("#overlay").css({'height': canvH });
		$("#overlay").css({'opacity': 0 });
	}
})

$(function() {
    overlayGameOver = function() {
		$("#overlay").css({'opacity': '45%' });
		$("#overlay").css({'backgroundColor': '#FB662E' });
	}
})

$(function() {
    overlayWin = function() {
		$("#overlay").css({'opacity': '45%' });
		$("#overlay").css({'backgroundColor': '#7DCEA0' });
	}
})

$(function() {
	var w = $("#textBox").width();
	
    resizeTextBox = function(canvW) {
		var windowW = $(window).innerWidth();
		var availW = windowW / 2 - canvW / 2;
		
		$("#textBox").css({'width': 0.8 * availW});
		
		var newW = $("#textBox").width();
		
		$("#textBox").css({'left': 0.075 * availW });
	}
})


$(function() {
	var prevText;
	
	var b = "10x10";
	var i = "20x15";
	var e = "30x20";
	
	var w;
	
	$('.button').hover(function() {
		prevText = $(this).text();
		w = $(this).outerWidth();
		
		$(this).css({'color': 'rgba(0, 0, 0, 0.75)'})
		
		if (prevText == "Beginner") {
			$(this).text(b);
			$(this).css({'width': w});
		} else if (prevText == "Intermediate") {
			$(this).text(i);
			$(this).css({'width': w});
		} else if (prevText == "Expert") {
			$(this).text(e);
			$(this).css({'width': w});
		}
		
	}, function() {
		$(this).text(prevText);
		$(this).css({'color': '#000000'})
	});
})


$(window).resize(function() {
		//resize overlay
		$("#overlay").css({'width': canvW });
		$("#overlay").css({'height': canvH });
		
		//resize background canvas
		$("#bg").css({'width': window.innerWidth });
		$("#bg").css({'height': 'auto' });
		bgReset();
		
		//resize game canvas
		//NOT WORKING
		$("#myCanvas").css({'width': canvW });
		$("#myCanvas").css({'height': canvH });
		
		//RESET BUTTON WIDTH
		
		//RESET TEXT BOX
		resizeTextBox(canvW);
});

$( window ).on( "load", function() {
	reset();
});