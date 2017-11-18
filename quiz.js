//--------------------
// Data
//--------------------

var Questions = [
  {ind: 0, txt: 'this is question 1', img: 'img1.jpg', Options:[
    {ind: 0, txt: 'option 1-1', res: true},
    {ind: 1, txt: 'option 1-2', res: false},
    {ind: 2, txt: 'option 1-3', res: false}
  ]},
  {ind: 0, txt: 'this is question 2', img: 'img2.jpg', Options:[
    {ind: 0, txt: 'option 2-1', res: false},
    {ind: 1, txt: 'option 2-2', res: true},
    {ind: 2, txt: 'option 2-3', res: false}
  ]},
  {ind: 0, txt: 'this is question 3', img: 'img3.jpg', Options:[
    {ind: 0, txt: 'option 3-1', res: false},
    {ind: 1, txt: 'option 3-2', res: false},
    {ind: 2, txt: 'option 3-3', res: true}
  ]}
];

//--------------------
// Object Constructors
//--------------------
function Quiz(){
  this.qNo = 0;
  this.score = 0;
  this.Questions = [];

  for(j=0; j<Questions.length; j++){
    this.Questions.push(new Question(j));
  }

  this.qTot = this.Questions.length;

  this.nextQuestion = function(){
    this.clearOptions();
    if (!this.Questions[this.qNo].lastQuestion){
      this.qNo++;
      this.drawQuestion();
      this.updateProgressBar();
    } else {
      this.showScoreboard();
    }
  }

  this.drawQuestion = function(){
    $('#question').html(this.Questions[this.qNo].txt);
    this.Questions[this.qNo].drawOptions();
    $('#nextButton').addClass('disabled').off('click',nextQuestion);
  }

  this.updateProgressBar = function(){
    $('progress').attr({'value':this.qNo + 1,'max':this.qTot});
    $('#qNo').html(this.qNo + 1);
    $('#qTot').html(this.qTot);
  }

  this.start = function(){
    this.drawQuestion();
    this.updateProgressBar();
  }

  this.showScoreboard = function(){
    this.clearOptions();
    for (i=0; i<this.Questions.length; i++){
      console.log('Question ' + i + ': ' + this.Questions[i].correct)
      if (this.Questions[i].correct){
        this.score++;
      }
    }
    console.log('your score was: ' + this.score);
  }

  this.clearOptions = function(){
    $('#optionHolder').html('');
  }
}

function Question(_ind){
  this.ind = _ind;
  this.txt = Questions[this.ind].txt;
  this.img = Questions[this.ind].img;
  this.correct = false;
  this.lastQuestion = false;
  this.Options = [];

  for(i=0; i<Questions[this.ind].Options.length; i++){
    this.Options.push(new Option(this.ind,i));
  }

  if (this.ind == Questions.length-1){
    this.lastQuestion = true;
  }
}

Question.prototype.drawOptions = function(){
  for(i=0; i<this.Options.length; i++){
    this.Options[i].drawOption();
  }
  if(this.lastQuestion){
    $('#nextButton').html('Show Scores');
  }
}

Question.prototype.showAnswers = function(){
  for(i=0; i<this.Options.length; i++){
    if(this.Options[i].res == true){
      this.Options[i].makeTrue();
    } else {
      this.Options[i].makeFalse();
    }
  }
}

function Option(_q,_ind){
  this.q = _q;
  this.ind = _ind;
  this.txt = Questions[this.q].Options[this.ind].txt;
  this.res = Questions[this.q].Options[this.ind].res;
}

Option.prototype.drawOption = function(){
  var btn = document.createElement('Button');
  $('#optionHolder').append(btn);
  $(btn).attr('id','option' + this.ind);
  $(btn).html(this.txt);
  $(btn).on('click',function(){
    quiz.Questions[quiz.qNo].Options[this.id.replace('option','')].clickOption();
  });
}

Option.prototype.makeTrue = function(){
    $('button#option' + this.ind).addClass('true');
}

Option.prototype.makeFalse = function(){
    $('button#option' + this.ind).addClass('false');
}

Option.prototype.makeSelected = function(){
    $('button#option' + this.ind).addClass('selected');
    $('#optionHolder button').off();
}

Option.prototype.clickOption = function(){
    this.makeSelected();
    quiz.Questions[this.q].showAnswers()

    if(this.res == true){
      quiz.Questions[this.q].correct = true;
    }

    $('#nextButton').removeClass('disabled').on('click',nextQuestion);
}

function nextQuestion(){
  quiz.nextQuestion();
}

//--------------------
// Initialisation Functions
//--------------------

var quiz = new Quiz();

$(document).ready(function(){
  quiz.start();
});
