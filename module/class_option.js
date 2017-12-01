import {QuestionData} from '/module/data.js';
import {_del as del, nextQuestion, quiz} from '/module/program.js';

//--------------------
// Option Class
//--------------------

export class Option {
  constructor(_q,_ind) {
    this.q = _q;
    this.ind = _ind;
    this.txt = QuestionData[_q].Options[_ind].txt;
    this.res = QuestionData[_q].Options[_ind].res;
  }

  drawOption(el,d = del) {
    let _this = this;

    setTimeout(function(){
      let _btn = document.createElement('button');
      $('#' + el).append(_btn);

      $(_btn)
        .attr('id','option' + _this.ind)
        .html(_this.txt)
        .addClass('hide')
        .data({
            'q'   :_this.q,
            'ind' :_this.ind
        })
        .on('click', function(){
            quiz.Questions[$(this).data('q')].Options[$(this).data('ind')].selectOption();
        });

      $('#optionHolder button.old').remove();
      $('#optionHolder button').removeClass('hide');
      $(_btn).addClass('bounceIn animated');
    },(quiz.Questions[_this.q].Options.length * d * 3) + (1000/del) * d + (_this.ind * d));

    return this;
  }

  clearOption(){
    let _this = this;

    setTimeout(function(){
      $('button#option' + _this.ind)
        .removeClass('bounceIn')
        .addClass('bounceOutDown');
    },_this.ind * del * 3);

    return this;
  }

  selectOption() {
    quiz.Questions[this.q].myAnswer = this.ind;

    if(this.res == true){
      quiz.Questions[this.q].correct = true;
    }

    quiz.Questions[this.q].showAnswer();

    $('button#option' + this.ind).addClass('selected');
    $('#nextButton').removeClass('disabled').on('click', nextQuestion);
    return this;
  }
}
