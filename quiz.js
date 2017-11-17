//--------------------
// Data
//--------------------

var lnaQuestions = [
  {ind: 0, txt: 'this is question 1', img: 'img1.jpg', lnaOptions:[
    {ind: 0, txt: 'option 1-1', res: true},
    {ind: 1, txt: 'option 1-2', res: false},
    {ind: 2, txt: 'option 1-3', res: false}
  ]},
  {ind: 0, txt: 'this is question 2', img: 'img2.jpg', lnaOptions:[
    {ind: 0, txt: 'option 2-1', res: false},
    {ind: 1, txt: 'option 2-2', res: true},
    {ind: 2, txt: 'option 2-3', res: false}
  ]},
  {ind: 0, txt: 'this is question 3', img: 'img3.jpg', lnaOptions:[
    {ind: 0, txt: 'option 3-1', res: false},
    {ind: 1, txt: 'option 3-2', res: false},
    {ind: 2, txt: 'option 3-3', res: true}
  ]}
];


//--------------------
// Global Variables
//--------------------

var currentQuestion;


//--------------------
// Object Constructors
//--------------------

function lnaQuestion(_ind){
  this.ind = _ind;
  this.txt = lnaQuestions[this.ind].txt;
  this.img = lnaQuestions[this.ind].img;
  this.lnaOptions = [];
  for(i=0; i<lnaQuestions[this.ind].lnaOptions.length; i++){
    this.lnaOptions.push(new lnaOption(this.ind,i));
  }
}

lnaQuestion.prototype.drawOptions = function(){
  for(i=0; i<this.lnaOptions.length; i++){
    this.lnaOptions[i].drawOption();
  }
}

lnaQuestion.prototype.showAnswers = function(){
  for(i=0; i<this.lnaOptions.length; i++){
    if(this.lnaOptions[i].res == true){
      this.lnaOptions[i].makeTrue();
    } else {
      this.lnaOptions[i].makeFalse();
    }
  }
}

function lnaOption(_qu,_ind){
  this.qu = _qu;
  this.ind = _ind;
  this.txt = lnaQuestions[this.qu].lnaOptions[this.ind].txt;
  this.res = lnaQuestions[this.qu].lnaOptions[this.ind].res;
}

lnaOption.prototype.drawOption = function(){
  var btn = document.createElement('Button');
  $('#optionHolder').append(btn);
  $(btn).attr('id','option' + this.ind);
  $(btn).html(this.txt);
  $(btn).on('click',function(){
    currentQuestion.lnaOptions[this.id.replace('option','')].clickOption();
  });
}

lnaOption.prototype.makeTrue = function(){
    $('button#option' + this.ind).addClass('true');
}

lnaOption.prototype.makeFalse = function(){
    $('button#option' + this.ind).addClass('false');
}

lnaOption.prototype.makeSelected = function(){
    $('button#option' + this.ind).addClass('selected');
    $('#optionHolder button').off();
}

lnaOption.prototype.clickOption = function(){
    this.makeSelected();
    currentQuestion.showAnswers()

    if(this.res == true){
      console.log('Congratulations!');
    } else {
      console.log('Wrong Answer!');
    }

    $('#nextButton').removeClass('disabled').on('click',nextQuestion);
}

function nextQuestion(){
  console.log('Next!!');
}

//--------------------
// Initialisation Functions
//--------------------

$(document).ready(function(){
  currentQuestion = new lnaQuestion(0);
  currentQuestion.drawOptions();
});
