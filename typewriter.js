var speed = 75;
var i = 0;

let text0 = 'Welcome to CoronaSweeper: A Minesweeper clone with a contagious twist...';
let text1 = 'Select a difficulty using the buttons on the top right - this controls the size of the grid';
let text2 = 'Use the slider to adjust the level of infection: the higher it is, the more virus cells there are.';
let text3 = 'Press New Game to begin a new game with your selected settings.';

function typeWriter() {

	if (i < text0.length) {
		document.getElementById('textBox').innerHTML += text0.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
}

typeWriter();