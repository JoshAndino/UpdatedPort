$(document).ready(function() {
  $("#remaining-time").hide();
  $("#start").on("click", trivia.startGame);
  $(document).on("click", ".option", trivia.guessChecker);
});

//button that switches the question
$(document).on("click",".nextQuestion", function()
{
    trivia.currentSet += 1;

    trivia.nextQuestion();

    $("#results").empty();
    
})

var trivia = {
  //trivia properties

  correct: 0,
  wrong: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 15,
  timerOn: false,
  timerId: "",

  // question list

  question: {
    q1: "What is another name for Superman?",
    q2: "Batman protects what city?",
    q3: "How did Spiderman get his superpowers?",
    q4: "Which superhero carries an indestrutible shield?"
  },

  // chocies for player

  choice: {
    q1: [
      "Man of Steel",
      "The Red Redeemer",
      "The Masked Avenger",
      "The Caped Crusader"
    ],
    q2: ["Chicago", "Metropolis", "Gotham City", "New York City"],
    q3: [
      "He was bombarded by comsic rays",
      "He was born with his powers",
      "He was cought in a chemical explosion",
      "He was bitten by a radioactive spider"
    ],
    q4: ["The Green Lantern", "Captain America", "Wonder Woman", "Batman"]
  },
  // correct answers
  answer: {
    q1: "Man of Steel",
    q2: "Gotham City",
    q3: "He was bitten by a radioactive spider",
    q4: "Captain America"
  },

  // start game

  startGame: function() {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.wrong = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    // show game
    $("#game").show();

    //reset results
    $("#results").html("");

    //show tmer
    $("#timer").text(trivia.timer);

    // hide start
    $("#start").hide();

    //remaining time show
    $("#remaining-time").show();

    //show first question
    trivia.nextQuestion();
  },

  nextQuestion: function() {
    $(".nextQuestion").remove()
    //set timer to 15 secs
    trivia.timer = 15;
    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);

    //timer speed
    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    // matches questons with answers
    var questionContent = Object.values(trivia.question)[trivia.currentSet];
    $("#question").text(questionContent);

    //array for options for question
    // var questionChoice = Object.values(trivia.choice)[trivia.currentSet]
    var questionChoices = Object.values(trivia.choice)[trivia.currentSet];

    questionChoices.forEach(choice => {
      console.log(choice);
      $("#question").append(
        `<button class="option btn btn-info btn-lg" value="${choice}">${choice}</button>`
      );
    });
    console.log(questionChoices);

    //creates guess options in the html

    // $.each(questionChoice, function(index, key)
    // {
    //     $('#option').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    // })
  },

  timerRunning: function() {
    //if timer has time and questions still to answer
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.question).length
    ) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }
    }

    // timer out w/ unanswered questions
    else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.results = false;
      clearInterval(trivia.timerId);
      resultsId = setTimeout(trivia.wordCheck, 1000);
      $("#results").html(
        "<h3>OHH NO!! out of time!! The correct answer was " +
          Object.values(trivia.answer)[trivia.currentSet] +
          "</h3>"
      );
    }
    // if all questons have been answered, show results
    else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      //results of game
      $("#results").html(
        "<h3> Thank you for playing!</h3>" +
          "<p> Correct: " +
          trivia.correct +
          "</p>" +
          "<p> Incorrect: " +
          trivia.wrong +
          "</p>" +
          "<p> Unaswered: " +
          trivia.unanswered +
          "</p>" +
          "<p> Please play again!</p>"
      );

      //hide game ui
      $("#game").hide();

      //show start button
      $("#start").show();
    }
  },

  guessChecker: function() {
    // timer id for game results, settimer
    var resultId;

    // the answer for current question
    var currentAnswer = Object.values(trivia.answer)[trivia.currentSet];
    console.log(currentAnswer);
    console.log(this);
    // if correct answer is picked
    if ($(this).val() === currentAnswer) {
      //turn green if correct
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");

      trivia.correct++;
      console.log(trivia.correct);
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessChecker, 1000);
      $("#results").html("<h3> You got it correct " + currentAnswer + "</h3>");

      $("#question").after(`<button class="nextQuestion btn btn-info btn-lg">Next Question</button>`
      );
    }

    //if pick wrong answer
    else {
      //turn red if incorrect
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");

      trivia.wrong++;
      console.log(trivia.wrong);
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessChecker, 1000);
      $("#results").html(
        "<h3> Better luck next time! " + currentAnswer + "</h3>"
        );
        $("#question").after(`<button class="nextQuestion btn btn-info btn-lg">Next Question</button>`
        );   
    }
  },

  guessResult: function() {
    $(".choice").remove();
    $("#results h3").remove();

    trivia.nextQuestion;
  }
};
