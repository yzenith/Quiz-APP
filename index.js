'use strict';  //prevent globel variables

// Questions Information in STORE Array
const STORE = [
  {question:"What is the capital of Turkey?",answer1:"Beijing",answer2:"Alaska",answer3:"Tokyo",answer4:"Ankara",right:"Ankara"},
  {question:"What is the national animal of China?",answer1:"Giant panda",answer2:"Small panda",answer3:"Siberia Tiger",answer4:"Crested Ibis",right:"Giant panda"},
  {question:"Which Turkish city has the name of a cartoon character?",answer1:"Batman",answer2:"tweety",answer3:"Bender",answer4:"Goofy",right:"Batman"},
  {question:"What is the noisiest city in the world?",answer1:"Hong Kong",answer2:"New York",answer3:"Tokyo",answer4:"Seoul",right:"Hong Kong"},
  {question:"What is the name of the desert area in Mexico?",answer1:"Sonora",answer2:"Sahara",answer3:"Namib",answer4:"Gobi",right:"Sonora"},
  {question:"What is a very cold part of Russia?",answer1:"Moscow",answer2:"Siberia",answer3:"Samara",answer4:"Novosibirsk",right:"Siberia"},
  {question:"How many continents are there?",answer1:"Five",answer2:"Six",answer3:"Seven",answer4:"Eight",right:"Seven"},
  {question:"How many time zones are there in the world?",answer1:"18",answer2:"20",answer3:"22",answer4:"24",right:"24"},
  {question:"Which is the largest desert on earth?",answer1:"Sonora",answer2:"Namib",answer3:"Sahara",answer4:"Gobi",right:"Sahara"},
  {question:"What is the largest state of the United States?",answer1:"New York",answer2:"Texas",answer3:"California",answer4:"Alaska",right:"Alaska"}
];

let indexCounter = 0;
let scoreNumber = 0;

loadStartPage ();

// load question index and score number
function questionIndexAndScore () {
  console.log('first function => about index and score');
  $('.quiz-info').find('progress').val(`${indexCounter}`);
  $('.quiz-info').find('.index').html(`${indexCounter}`);
  $('.quiz-info').find('.score-number').html(`${scoreNumber}`);
}


// start button event
function startQuizButton () {
   $('main').on('click','.start-quiz',function (event) {
     console.log('second function? => start button');
        event.preventDefault();
        $('.start-page').remove();
        loadQuestions ();
      })
}

// load questions
function loadQuestions () {
  $('main').html(generateQuestions);
}

// make question page
function generateQuestions () {
  console.log("generateQuestions run");
  return `<section role="region" class="question-page toggle-hide">
    <form action="/" method="post" class="question-form">
          <header>${STORE[indexCounter].question}</header>
          
          <fieldset>
            <div class="option-line"><input class="answer" id="answer1" type="radio" name="answer" value="${STORE[indexCounter].answer1}" checked aria-checked="true" tabindex="0">
            <label for="answer1" aria-labelledby="answer1">${STORE[indexCounter].answer1}</label></div>
            
            <div class="option-line"><input class="answer" id="answer2" type="radio" name="answer" value="${STORE[indexCounter].answer2}" aria-checked="false" tabindex="1">
            <label for="answer2" aria-labelledby="answer2">${STORE[indexCounter].answer2}</label></div>

            <div class="option-line"><input class="answer" id="answer3" type="radio" name="answer" value="${STORE[indexCounter].answer3}" aria-checked="false" tabindex="2">
            <label for="answer3" aria-labelledby="answer3">${STORE[indexCounter].answer3}</label></div>

            <div class="option-line"><input class="answer" id="answer4" type="radio" name="answer" value="${STORE[indexCounter].answer4}" aria-checked="false" tabindex="3">
            <label for="answer4" aria-labelledby="answer4">${STORE[indexCounter].answer4}</label></div>
          </fieldset>

          <button type="submit" class="submit-answer" aria-describedby="submitQuestion" tabindex="4">Submit</button>
        </form>
      </section>`;
}

// submit answer
function submitAnswer () {
  $('main').on('click','.submit-answer',function(event){
    event.preventDefault();
    answerFeedbackPage ();
  })
}

// create answer feedback page
function answerFeedbackPage () {
  console.log('answerFeedbackPage run');
  $('main').html( answerFeedback () );

}

// score update
function scoreUpdate () {
  scoreNumber++;
  $('.score-number').html(scoreNumber);
}

// indexCounter update
function indexCounterUpdate () {
  indexCounter++;
  $('.quiz-info').find('progress').val(indexCounter+1);
  $('.quiz-info').find('.index').html(indexCounter+1);
}

// answer feedback page
function answerFeedback () {
  const choosed = $('input:checked');
  const choosedVal = choosed.val();
  console.log(choosedVal === STORE[indexCounter].right);

  if (choosedVal === STORE[indexCounter].right) {
    rightAnswer();
    scoreUpdate();
  }else{
    wrongAnswer();
  }
}

// right answer
function rightAnswer () {
  $('main').html( 
    `<section role="region" class="feedback-page toggle-hide">
        <p class="feedback-answer">Your answer is</p> <p>right!</p>
        <button type="submit" class="next-question" aria-describedby="nextQuestion">Next Question</button>
      </section>`);
}

// wrong answer
function wrongAnswer () {
  $('main').html( 
    `<section role="region" class="feedback-page toggle-hide">
        <p class="feedback-answer">Sorry, your answer is wrong,</p> <p>it should be <b>${STORE[indexCounter].right}</b></p>
        <button type="submit" class="next-question" aria-describedby="nextQuestion">Next Question</button>
      </section>`);
}

// nextQuestion
function nextQuestion () {
  $('main').on('click','.next-question',function (event) {
    event.preventDefault();
    ifLastQuestion();
  })
}

// if is the last question, should create result page
function ifLastQuestion () {
  if (indexCounter < STORE.length - 1) {
    indexCounterUpdate();
    $('main').html( generateQuestions () );
  }else{
    createResultPage();
  }
}

// create result page
function createResultPage () {
  $('main').html(`<section role="region" class="final-page toggle-hide">
        <p>You got <span class="final-score">${scoreNumber}!</span></p>

        <button type="submit" class="start-over" aria-describedby="startOverQuiz">Start Over</button>
      </section>`);
}

// startOver function
function startOver () {
  $('main').on('click','.start-over',function (event) {
    event.preventDefault();
    resetIndexAndScore();
    loadStartPage ();
    
  })
}

function loadStartPage () {
  $('main').html(`<section role="region" class="start-page">
          <h1>Try this geography quiz, find out how good you are on geography!</h1>
          <button type="submit" class="start-quiz" aria-describedby="start-Quiz">Start</button>
      </section>`);
}


function resetIndexAndScore () {
  indexCounter = 0;
  $('.quiz-info').find('progress').val(indexCounter+1);
  $('.quiz-info').find('.index').html(indexCounter+1);
  scoreNumber = 0;
  $('.score-number').html(scoreNumber);
}



function loadFunctions () {
  loadStartPage ();
  questionIndexAndScore ();
  startQuizButton ();
  submitAnswer ();
  // answerFeedbackPage ();
  nextQuestion ();
  startOver ();
}

$(loadFunctions)


