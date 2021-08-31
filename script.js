const word =document.getElementById('word');
const text = document.getElementById('text');
const scoreE1 = document.getElementById('score');
const timeE1 = document.getElementById('time');
const endgameE1 = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//list of words for game .....
const words = [
    'dependent',
    'silver',
    'drag',
    'loving',
    'tense',
    'ball',
    'juice',
    'superficial',
    'eight',
    'admit',
    'bad',
    'ability',
    'agency',
    'behavior',
    'budget',
    'candidate',
    'challenge',
    'conference',
    'democratic',
    'environmental',
    'identify'

];
let randomword;
let score = 0;
let time = 10;

// Set difficulty to value in ls or medium

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//when page loads the cursor will move here
text.focus();

const timeInterval = setInterval(updatetime1,1000);
//random word from array
function getrandomWord()
{
   return words[Math.floor(Math.random() * words.length)];
}
//add word to dom
function addwordToDom()
{
    randomword = getrandomWord();
    word.innerHTML = randomword;
}
//score.......
function updatescore()
{
    score++; //score
    scoreE1.innerHTML = score;


}



//update time.......

function updatetime1() {
    time--;
    timeE1.innerHTML = time + 's';
  
    if (time === 0) {
      clearInterval(timeInterval);
      // end game
      gameover();
    }
  }
//game over.....
function gameover()
{
    endgameE1.innerHTML = 
    `<h1> Time Ran Out </h1>
    <p> YOUR FINAL SCORE IS ${score} </p>
    <button onClick="location.reload()">Reload</button> 
    `;
    endgameE1.style.display = 'flex';
    console.log('over');
}


addwordToDom();
//typing

text.addEventListener('input' , e =>{
    const insertedText = e.target.value;

    if(insertedText === randomword)
    {
        addwordToDom();
        updatescore();
        e.target.value = '';

        if(difficulty === 'hard')
        {
            time +=2;
        }
        else if(difficulty === 'medium')
        {
            time +=3;
        }
        else
        {
            time += 5;
        }
        
        updatetime1();
    }
});


//settingsBtn click event
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
