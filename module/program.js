import {QuestionData} from '/module/data.js';
import {Question} from '/module/class_question.js';
import {Option} from '/module/class_option.js';

//--------------------
// Main Quiz Object
//--------------------

export let quiz = {
  qNo               : 0,
  qTot              : 0,
  Questions         : [],

  init              : function() {
                        this.qNo = 0;
                        this.Questions = [];
                        for(let j=0; j<QuestionData.length; j++){
                          this.Questions = [...this.Questions, new Question(j)];
                        }
                        this.qTot = this.Questions.length;
                        return this;
                      },

  start             : function(){
                        this
                          .init();

                        $('#intro, #scoreCard').hide();
                        $('#quiz').show();
                        $('#nextButton').html('Next Question');

                        this
                          .drawQuestion()
                          .updateProgressBar();

                        _del = 75;
                        return this;
                      },

  nextQuestion      : function(){
                        let currQ = this.Questions[this.qNo];
                        if (!currQ.lastQuestion){

                          currQ.clearOptions();

                          delay( //wait for clearOptions to finish
                            currQ.imgOut,
                            currQ.Options.length * del * 3
                          );

                          this.qNo++;
                          currQ = this.Questions[this.qNo];

                          delay( //wait for imgOut to finish
                            this.drawQuestion,
                            (currQ.Options.length * del * 3) + 1000
                          );

                        } else {
                          this.finish();
                        }
                        return this;
                      },


  drawQuestion      : function(){
                        this.Questions[this.qNo]
                          .drawOptions('optionHolder')
                          .imgIn();

                        $('#nextButton')
                          .addClass('disabled')
                          .off('click', nextQuestion);

                        this.updateProgressBar();
                        return this;
                      },

  updateProgressBar : function(){
                        $('progress').attr({
                          'value' :this.qNo + 1,
                          'max'   :this.qTot
                        });
                        $('#qNo').html(this.qNo + 1);
                        $('#qTot').html(this.qTot);
                        return this;
                      },

  getScore          : function(){
                        let _score = 0;
                        for (let question of this.Questions) {
                          if (question.correct){
                            _score++;
                          }
                        }
                        return parseInt((_score/this.qTot) * 100) + '%';
                      },

  finish            : function(){
                        $('#scResultHolder, #scQuestion, #scOptionHolder, #optionHolder, #question').html('');
                        $('#picHolder img').attr('src','');

                        for (let question of this.Questions){
                          question.scDrawResult();
                        }

                        $('#scScore').html(this.getScore());
                        $('#quiz').hide();
                        $('#scoreCard').show();
                        return this;
                      }
};


//--------------------
// Initialisation Functions
//--------------------

export var _del = 0;
export var nextQuestion = function(){
  quiz.nextQuestion()
}

export var delay = function(_callBack,_delay){
  setTimeout(_callback,_delay);
}

$(document).ready(function(){
  $('#startButton, #playAgain').on('click', function(){
    quiz.start();
  });
});
