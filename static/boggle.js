$('#submit-btn').click(submitClick);

let gameState = 'init'




async function submitClick(e) {
	e.preventDefault();
    if (gameState == 'over') return
	let res = await axios.get('/game/guess', {
		params: {
			guess: $('#guess').val()
		}
	});
    console.log(res.data)
	return updateScore(res.data.result);
}

function updateScore(result) {
    if (gameState == 'over') return
	if (result == 'ok') {
        $('#feedback').text('Correct!')
        setTimeout(()=>{$('#feedback').text('')},6000)
		currentScore = $('#score').text();
		currentScore = parseInt(currentScore) + 1;
		$('#score').text(currentScore);
	} else {
        $('#feedback').text('Try Again!')
        setTimeout(()=>{$('#feedback').text('')},6000)
    }
}

function runTimer(){
    let clock = setInterval(()=>{
        timer = $('#timer').text();
		timer = parseInt(timer) - 1;
		$('#timer').text(timer);  
        if (parseInt(timer) == 0){
            gameState = 'over'
            return clearInterval(clock)
        }
    },1000)
}
runTimer()