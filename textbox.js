

$(function() {

	

	typeWriter = function() {
		
		
		
		var txt = "During this global pandemic, we need all the help we can get...so you'll have to do";
		
		$("#textBox").append(txt);
		
		var speed = 50;
		for (var i = 0; i < txt.length; i++) {
				$("#textBox").append("txt.charAt(i)");
		}
			
	}
	
});