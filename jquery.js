var setupOverlay;

$(function() {
    setupOverlay = function(canvW, canvH) {
		$("#overlay").css({'width': canvW });
		$("#overlay").css({'height': canvH });
		$("#overlay").css({'opacity': 0 });
	}
})

$(function() {
    overlayGameOver = function(canvW, canvH) {
		$("#overlay").css({'opacity': '30%' });
		$("#overlay").css({'backgroundColor': '#FB662E' });
	}
})

$(function() {
    overlayWin = function(canvW, canvH) {
		$("#overlay").css({'opacity': '30%' });
		$("#overlay").css({'backgroundColor': '#7DCEA0' });
	}
})

