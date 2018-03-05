/*
// 1) Question Constructor

var Question = function(question, answerChoices, correctAns) {
    this.question = question;
    this.answerChoices = answerChoices;
    this.correctAns = correctAns;
};

// 2) Construct Questions
var question1 = new Question( 
    'How many fingers am I holding up? ||||/', 
    ['5', '4', '13'], 
    2
);

var question2 = new Question(
    'How long until mom gets home?',
    ['20mins', '45mins', 'She\'s never coming back'],
    1
);

var question3 = new Question(
    'What am I most excited about today?',
    ['Finishing my JS course', 'Working on websites', 'Eating foods', 'Spending time with my wife and doggos.'],
    4
);

// 3) Store in Array
var questionsArr = [question1, question2, question3];


// 4) Function to select question at random
var displayQ = function() {
    var q = questionsArr[Math.round(Math.random() * 2)]
    console.log(q.question);
    for (var i=0; i<q.answerChoices.length; i++){
        console.log(i+1 + ': ' + q.answerChoices[i]); 
    }
    
    // 5) Prompt Function
    var ans = prompt("Enter the correct answer choice");
    
    // 6) Check if answer is correct
    if(ans == q.correctAns){
        console.log("Correct! Congrats!");
    } else {
        console.log("Nope! Nice try tho...");   
    }  
}
displayQ();


// 7) Convert above to IIFE for privacy.

(function() {
    
    var question1, question2, question3, questionsArr, q, ans;
    
    var Question = function(question, answerChoices, correctAns) {
        this.question = question;
        this.answerChoices = answerChoices;
        this.correctAns = correctAns;
    };

    question1 = new Question( 
        'How many fingers am I holding up? ||||/', 
        ['5', '4', '13'], 
        2
    );

    question2 = new Question(
        'How long until mom gets home?',
        ['20mins', '45mins', 'She\'s never coming back'],
        1
    );

    question3 = new Question(
        'What am I most excited about today?',
        ['Finishing my JS course', 'Working on websites', 'Eating foods', 'Spending time with my wife and doggos.'],
        4
    );
    
    
    questionsArr = [question1, question2, question3];
    
    
    q = questionsArr[Math.round(Math.random() * 2)]
    console.log(q.question);
    for (var i=0; i<q.answerChoices.length; i++){
        console.log(i+1 + ': ' + q.answerChoices[i]); 
    }
    
    ans = prompt("Enter the correct answer choice");
    
    if(ans == q.correctAns){
        console.log("Correct! Congrats!");
    } else {
        console.log("Nope! Nice try tho...");   
    }  
})();
*/

/////////////////
// EXPERT LEVEL

// 8) Continue to display random questions after each question so the program never ends.
    (function() {
        
        var Question = function(question, answerChoices, correctAns) {
            this.question = question;
            this.answerChoices = answerChoices;
            this.correctAns = correctAns;
        };
        
        Question.prototype.displayQuestion = function() {
            console.log(this.question);
            for (var i=0; i < this.answerChoices.length; i++) {
                console.log(i+1 + ': ' + this.answerChoices[i]); 
            }
        }
        
        Question.prototype.checkAnswer = function(n, callback) {
            var sc;
            
            if (this.correctAns === n) {
                console.log('Correct! Great Job!');
                sc = callback(true);
            } else {
                console.log('Nope! Nice try.');
                sc = callback(false);
            }
            
            this.displayScore(sc);
        }
        
        Question.prototype.displayScore = function(score) {
            console.log('Your current score is: ' + score);
            console.log('-------------------------');
        }
        
        var question1 = new Question( 
            'How many fingers am I holding up? ||||/', 
            ['5', '4', '13'], 
            2
        );

        var question2 = new Question(
            'How long until mom gets home?',
            ['20mins', '45mins', 'She\'s never coming back'],
            1
        );

        var question3 = new Question(
            'What am I most excited about today?',
            ['Finishing my JS course', 'Working on websites', 'Eating foods', 'Spending time with my wife and doggos.'],
            4
        );

        var questionsArr = [question1, question2, question3];
        
        function score() {
            var sc = 0;
            return function(correct) {
                if (correct) {
                    sc++;
                }
                return sc;
            }
        }
        
        var keepScore = score();
        
        function nextQuestion() {
            var q = Math.floor(Math.random() * questionsArr.length);
            
            questionsArr[q].displayQuestion();
            
            var ans = prompt("Enter the correct answer choice.");
            
            if (ans !== 'exit'){
                questionsArr[q].checkAnswer(parseInt(ans), keepScore);
                nextQuestion();
            }
        }
        
        nextQuestion();
    })();
