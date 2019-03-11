var panel = $("#quiz-area");
var countStartNumber = 30;
 



var questions = [{
  question:"What player scored the most points in one game?",
  answers: ["Wilt Chamberlain", "Michael Jordan", "Larry Bird", "Magic Johnson"],
  correctAnswer: "Wilt Chamberlain",
  image: "Assets/Images/wilt.jpg"
}, {
  question: "Who has the most coaching titles?",
  answers: ["Kevin Love", "Tim Duncan", "Phil Jackson", "Doc Rivers"],
  correctAnswer: "Phil Jackson",
  image: "Assets/Images/phil.jpg"
}, {
  question: "Who is the shortest player of all-time?",
  answers: ["Tyron Lue", "Tyrone Muggsy Bogues", "Big Fish", "Derek Jeter"],
  correctAnswer: "Tyrone Muggsy Bogues",
  image: "Assets/Images/muggsy.jpg"
}, {
  question: "What team has the best record in one season?",
  answers: ["Golden State Warriors", "Chicago Bulls", "NY Knicks", "LA Lakers"],
  correctAnswer: "Golden State Warriors",
  image: "Assets/Images/warriors.jpg"
}, {
  question: "Who has the most career rebounds?",
  answers: ["Wilt Chamberlain", "Yao Ming", "Jerry West", "Charles Barkley"],
  correctAnswer: "Wilt Chamberlain",
  image: "Assets/Images/wiltball.jpg"
}, {
  question: "Who was the tallest player of all-time?",
  answers: ["Chris Webber", "Jokim Noah", "Gheorghe Muresan", "Kyrie Irvin"],
  correctAnswer: "Gheorghe Muresan",
  image: "Assets/Images/george.jpg"
}, {
  question: "Who has the most coaching wins?",
  answers: ["Kareem Abdul Jabbar", "Don Nelson", "Jason Kidd", "David West"],
  correctAnswer: "Don Nelson",
  image: "Assets/Images/don.jpg"
}, {
  question: "What team drafted Ray Allen?",
  answers: ["LA Sparks", "Houston Rockets","DC United", "Minnesota Timberwolves"],
  correctAnswer: "Minnesota Timberwolves",
  image: "Assets/Images/wolves.jpg"
}, {
  question: "Who won the most NBA Finals MVP's?",
  answers: ["Patrick Ewing", "Michael Jordan", "James Harden", "LeBron James"],
  correctAnswer: "Michael Jordan",
  image: "Assets/Images/mj.jpg"
}, {
  question: "What team won the first NBA championship?",
  answers: ["76ers", "Atlanta Hawks", "Boston Celtics", "Washington Wizards"],
  correctAnswer: "76ers",
  image: "Assets/Images/76ers.jpg"
}];


var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

 countdown: function() {
    this.counter--;
    $("#counter-number").html(this.counter);
    if (this.counter === 0) {
      alert("TIME UP");
      this.timeUp();
      this.results();  
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);
    panel.html( "<h2 class='animated bounceInLeft'>" + questions[this.currentQuestion].question + "</h2>");
    
    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button btn btn-outline-secondary animated bounceInRight' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
   }
    panel.append("<br><br><button class='btn btn-primary btn-sm' id='btn'>" + "Question  " + (this.currentQuestion + 1)  + " / " + questions.length +"</button>");
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").html(this.counter);
    this.currentQuestion++;
    this.loadQuestion().on(this);

  },

  timeUp: function() {

       clearInterval(window.timer);
       panel.html("<h2> Time up </h2>");
       panel.append( "<h3> correct answer is " + questions[this.currentQuestion].correctAnswer);
    //    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
       if (this.currentQuestion === questions.length-1) {
        setTimeout(this.results, 3*1000);
       } 
       else {  
        setTimeout(this.nextQuestion,3*1000);  
       }
  },

  results: function() {
    
    clearInterval(window.timer);
    
    panel.html( "<h2>All done, here is your result!</h2>");
    $("#counter-number").html(this.counter);
    $("#done").remove();
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
    panel.append("<br><button id='start-over' class='animated  pulse infinite'>Play Again </button>");
  },
 
  clicked: function(e) {
    clearInterval(window.timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    this.incorrect++;
    clearInterval(window.timer);
    panel.html("<h2>Wrong!</h2>");
    panel.append( "<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(window.timer);
    this.correct++;
    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");
    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    }
    else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

// RESET 
  reset: function() {
    location.reload();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  
  $("#sub-wrapper").prepend( "<h4 id='done'> You have [ <span id='counter-number'>30</span> ] Seconds</h4>");
  $("#sub-wrapper").prepend("<p> " + $('#name').val() + "</p><br>");
  $("#sub-wrapper").prepend("<img src='assets/images/now.gif' id='now' >");
  game.loadQuestion().on(game);
});