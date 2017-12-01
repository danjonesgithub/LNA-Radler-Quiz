import {QuestionData} from './data.js';
import {_del as del, nextQuestion, quiz} from './quiz.js';

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

  drawOption(el,d) {
    d = typeof d == 'undefined' ? del : d;
    var _btn = document.createElement('Button');
    $('#' + el).append(_btn);

    $(_btn)
      .attr('id','option' + this.ind)
      .html(this.txt)
      .addClass('hide')
      .data({
          'q'   :this.q,
          'ind' :this.ind
      })
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
      return this;
  }

  clearOption(){
    $('button#option' + this.ind)
      .delay(this.ind * del * 3)
      .queue( function(next){
        $(this)
          .removeClass('bounceIn')
          .addClass('bounceOutDown');
        next();
      });
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
