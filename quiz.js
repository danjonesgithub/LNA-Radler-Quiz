//--------------------
// Data
//--------------------

var QuestionData = [
  {txt: 'How many HL of beer mixes were sold by Heineken in 2016?', img: 'img-q1.png', Options:[
    {txt: '2.2 MHLs', res: false},
    {txt: '3.8 MHLs', res: true},
    {txt: '5.4 MHLs', res: false}
  ]},
  {txt: 'What is Heineken volume ms in beer mixes?', img: 'img-q2.png', Options:[
    {txt: '33.9%', res: true},
    {txt: '60.2%', res: false},
    {txt: '35.7%', res: false}
  ]},
  {txt: 'What was the first brand to launch Radler in Heineken', img: 'img-q3.png', Options:[
    {txt: 'Zipfer', res: false},
    {txt: 'Zlaty Bazant', res: false},
    {txt: 'Gosser', res: true}
  ]},
  {txt: 'How was the Rev/HL of beermixes vs. total beer & cider in 2016?', img: 'img-q4.png', Options:[
    {txt: 'Above average', res: true},
    {txt: 'Same', res: false},
    {txt: 'Below average', res: false}
  ]},
  {txt: 'How was the GP/HL of beer mixes vs. total beer & cider in 2016?', img: 'img-q5.png', Options:[
    {txt: 'Above average', res: false},
    {txt: 'Same', res: false},
    {txt: 'Below average', res: true}
  ]},
  {txt: 'What was the roll-out split of beer/lemonade in 2% Radler in 2013?', img: 'img-q6.png', Options:[
    {txt: '50/50', res: false},
    {txt: '70/30', res: false},
    {txt: '40/60', res: true}
  ]},
  {txt: 'What is the YTD 2016 Radler qrowth in Spain?', img: 'img-q7.png', Options:[
    {txt: '73 KHLs', res: true},
    {txt: '46 KHLs', res: false},
    {txt: '38 KHLs', res: false}
  ]},
  {txt: 'What is the growth of Radler 0.0 in Heineken in 2016?', img: 'img-q8.png', Options:[
    {txt: '11.4%', res: false},
    {txt: '36%', res: true},
    {txt: '22.8%', res: false}
  ]},
  {txt: 'What is the additional volume in % that Radler brings to beer?', img: 'img-q9.png', Options:[
    {txt: '75%', res: true},
    {txt: '50%', res: false},
    {txt: '60%', res: false}
  ]},
  {txt: 'What is the incremental vol. in Radler 0.0 with PET un HU16?', img: 'img-q10.png', Options:[
    {txt: '16%', res: true},
    {txt: '5%', res: false},
    {txt: '38%', res: false}
  ]},
  {txt: 'What was the sugar reduction % by Netherlands in Radler 0.0 in 2017?', img: 'img-q11.png', Options:[
    {txt: '10%', res: false},
    {txt: '15%', res: false},
    {txt: '20%', res: true}
  ]},
  {txt: 'What was the sugar of double citrus in the Netherlands?', img: 'img-q12.png', Options:[
    {txt: '25%', res: false},
    {txt: '35%', res: true},
    {txt: '50%', res: false}
  ]},
  {txt: 'How many different species of citrus exist?', img: 'img-q13.png', Options:[
    {txt: '10', res: false},
    {txt: '45', res: false},
    {txt: 'More than 100', res: true}
  ]},
  {txt: 'How long has citrus existed on Earth? (ref. Earth is 4.5 billion years old)', img: 'img-q14.png', Options:[
    {txt: '1.5m years', res: false},
    {txt: '15m years', res: true},
    {txt: '150m years', res: false}
   ]}
];

//--------------------
// Question Constructor
//--------------------

function Question(_ind){
  this.ind = _ind;
  this.txt = QuestionData[this.ind].txt;
  this.img = QuestionData[this.ind].img;
  this.correct = false;
  this.myAnswer = 0;
  this.lastQuestion = false;
  this.Options = [];

  for(i=0; i<QuestionData[this.ind].Options.length; i++){
    this.Options.push(new Option(this.ind,i));
  }

  if (this.ind == QuestionData.length-1){
    this.lastQuestion = true;
  }
}

Question.prototype.drawOptions = function(el,del){
  $('#optionHolder button').addClass('old');
  for(i=0; i<this.Options.length; i++){
    this.Options[i].drawOption(el,del);
  }

  if(this.lastQuestion){
    $('#nextButton').html('Show Scores');
  }
}

Question.prototype.clearOptions = function(){
  for(i=0; i<this.Options.length; i++){
    this.Options[i].clearOption();
  }
}

Question.prototype.imgOut = function(){
  $('#picHolder img')
    .delay((this.Options.length * del * 3))
    .queue( function(next){
      $(this)
        .removeClass('fadeIn')
        .addClass('zoomOutDown');
      next();
    });
}

Question.prototype.imgIn = function(){
  $('#picHolder img')
    .delay(this.Options.length * del * 4)
    .queue( function(next){
      $(this)
        .attr('src', 'image/' + quiz.Questions[quiz.qNo].img)
        .removeClass('zoomOutDown')
        .addClass('fadeIn');
      $('#question').html(quiz.Questions[quiz.qNo].txt);
      next();
    });
}

Question.prototype.showAnswer = function(){
  for(i=0; i<this.Options.length; i++){
    if(this.Options[i].res == true){
      $('button#option' + i).addClass('true');
    }
    $('button#option' + i).addClass('inactive');
  }
}

Question.prototype.scDrawResult = function(){

  var _spn = document.createElement('span');
  $('#scResultHolder').append(_spn);

  $(_spn).attr('id','option' + this.ind)
    .html(this.ind + 1)
    .data('ind',this.ind)
    .on('click', function(){
      quiz.Questions[$(this).data('ind')].scShowQuestion();
    });

  if(this.correct){
    $(_spn).addClass('correct');
  } else {
    $(_spn).addClass('incorrect');
  }

}

Question.prototype.scShowQuestion = function(){
  $('#scOptionHolder').html('');
  this.drawOptions('scOptionHolder',0);
  this.showAnswer()
  $('#scOptionHolder button').off();
  $('button#option' + this.myAnswer).addClass('selected');
  $('#scQuestion').html(this.txt);
}



//--------------------
// Option Constructor
//--------------------

function Option(_q,_ind){
  this.q = _q;
  this.ind = _ind;
  this.txt = QuestionData[this.q].Options[this.ind].txt;
  this.res = QuestionData[this.q].Options[this.ind].res;
}

Option.prototype.drawOption = function(el,d){
  d = typeof d == 'undefined' ? del : d;
  var _btn = document.createElement('Button');
  $('#' + el).append(_btn);

  $(_btn)
    .attr('id','option' + this.ind)
    .html(this.txt)
    .addClass('hide')
    .data({'q':this.q,'ind':this.ind})
    .on('click', function(){
        quiz.Questions[$(this).data('q')].Options[$(this).data('ind')].selectOption();
    })
    .delay((quiz.Questions[this.q].Options.length * d * 6) + this.ind * d)
    .queue( function(next){
      $('#optionHolder button.old').remove();
      $('#optionHolder button').removeClass('hide');
      $(this).addClass('bounceIn animated');
      next();
    });
}

Option.prototype.clearOption = function(){
  $('button#option' + this.ind)
    .delay(this.ind * del * 3)
    .queue( function(next){
      $(this)
        .removeClass('bounceIn')
        .addClass('bounceOutDown');
      next();
    });
}

Option.prototype.selectOption = function(){
  quiz.Questions[this.q].myAnswer = this.ind;

  if(this.res == true){
    quiz.Questions[this.q].correct = true;
  }

  quiz.Questions[this.q].showAnswer();

  $('button#option' + this.ind).addClass('selected');
  $('#nextButton').removeClass('disabled').on('click', nextQuestion);
}

//--------------------
// Main Quiz Object
//--------------------


var quiz = {
  qNo               : 0,
  qTot              : 0,
  Questions         : [],

  init              : function() {
                        this.qNo = 0;
                        this.Questions = [];
                        for(j=0; j<QuestionData.length; j++){
                          this.Questions.push(new Question(j));
                        }
                        this.qTot = this.Questions.length;
                      },

  start             : function(){
                        this.init();

                        $('#intro, #scoreCard').hide();
                        $('#quiz').show();
                        $('#nextButton').html('Next Question');

                        this.drawQuestion();
                        this.updateProgressBar();
                      },

  drawQuestion      : function(){
                        this.Questions[this.qNo].drawOptions('optionHolder');
                        this.Questions[this.qNo].imgIn();
                        $('#nextButton').addClass('disabled').off('click',nextQuestion);
                      },

  nextQuestion      : function(){
                        if (!this.Questions[this.qNo].lastQuestion){
                          this.Questions[this.qNo].clearOptions();
                          this.Questions[this.qNo].imgOut();
                          this.qNo++;
                          this.drawQuestion();
                          this.updateProgressBar();
                        } else {
                          this.finish();
                        }
                      },

  updateProgressBar : function(){
                        $('progress').attr({'value':this.qNo + 1,'max':this.qTot});
                        $('#qNo').html(this.qNo + 1);
                        $('#qTot').html(this.qTot);
                      },

  getScore          : function(){
                        var _score = 0;
                        for (i=0; i<this.Questions.length; i++){
                          if (this.Questions[i].correct){
                            _score++;
                          }
                        }
                        return parseInt((_score/this.qTot) * 100) + '%';
                      },

  finish            : function(){
                        $('#scResultHolder, #scQuestion, #scOptionHolder, #optionHolder, #question').html('');
                        $('#picHolder img').attr('src','');

                        for (i=0; i<this.Questions.length; i++){
                          this.Questions[i].scDrawResult();
                        }

                        $('#scScore').html(this.getScore());

                        $('#quiz').hide();
                        $('#scoreCard').show();
                      }
}


//--------------------
// Initialisation Functions
//--------------------


var del = 100;

var nextQuestion = function(){
  quiz.nextQuestion()
}

$(document).ready(function(){
  $('#startButton, #playAgain').on('click', function(){
    quiz.start();
  });
});
