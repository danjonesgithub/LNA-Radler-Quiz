import {QuestionData} from '/module/data.js';
import {Option} from '/module/class_option.js';
import {_del as del, quiz} from '/module/program.js';

//--------------------
// Question Class
//--------------------

export class Question {
  constructor(_ind) {
    this.ind = _ind;
    this.txt = QuestionData[this.ind].txt;
    this.img = QuestionData[this.ind].img;
    this.correct = false;
    this.myAnswer = 0;
    this.lastQuestion = false;
    this.Options = [];

    for(let i=0; i<QuestionData[_ind].Options.length; i++){
      this.Options = [...this.Options, new Option(_ind,i)];
    }

    if (_ind == QuestionData.length-1){
      this.lastQuestion = true;
    }
  }

  drawOptions(el,del) {
    $('#optionHolder button').addClass('old');
    for (let option of this.Options){
      option.drawOption(el,del);
    }
    if(this.lastQuestion){
      $('#nextButton').html('Show Scores');
    }
    return this;
  }

  clearOptions() {
    for(let option of this.Options){
      option.clearOption();
    }
    return this;
  }

  imgOut() {
    $('#picHolder img')
      .removeClass('fadeIn')
      .addClass('zoomOutDown');
    return this;
  }

  imgIn() {
    var _img = document.createElement('img');
    $(_img).attr('src', '/image/' + quiz.Questions[quiz.qNo].img)  //preload image src
    setTimeout(function(){ //wait for imgOut to finish
      $('#picHolder').html('').append(_img);
      $('#picHolder img').addClass('fadeIn animated');
      $('#question').html(quiz.Questions[quiz.qNo].txt);
    }, (this.Options.length * del * 3) + 1000);
    return this;
  }

  showAnswer() {
    let i = 0;
    for(let option of this.Options){
      if(option.res == true){
        $('button#option' + i).addClass('true');
      }
      $('button#option' + i).addClass('inactive');
      i++;
    }
    return this;
  }

  scDrawResult() {
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
    return this;

  }

  scShowQuestion() {
    $('#scOptionHolder').html('');
    this
      .drawOptions('scOptionHolder',0)
      .showAnswer();
    $('#scOptionHolder button').off();
    $('button#option' + this.myAnswer).addClass('selected');
    $('#scQuestion').html(this.txt);
    return this;
  }
}
