import {QuestionData} from './data.js';
import {Option} from './option.js';
import {_del as del, quiz} from './quiz.js';

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
      //this.Options.push(new Option(_ind,i));
      this.Options = [...this.Options, new Option(_ind,i)];
    }

    if (_ind == QuestionData.length-1){
      this.lastQuestion = true;
    }
  }

  drawOptions(el,del) {
    $('#optionHolder button').addClass('old');
    for (const option of this.Options){
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
      .delay((this.Options.length * del * 3))
      .queue( function(next){
        $(this)
          .removeClass('fadeIn')
          .addClass('zoomOutDown');
        next();
      });
      return this;
  }

  imgIn() {
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
