
    var startButtonEl = document.querySelector("#start-btn");
    var timerEl = document.querySelector("#timer");
    var questionEl = document.querySelector("#question");
    var scoreboardEl = document.querySelector("#scoreboard");
    var ansBut1El = document.querySelector("#a1");
    var ansBut2El = document.querySelector("#a2");
    var ansBut3El = document.querySelector("#a3");
    var ansBut4El = document.querySelector("#a4");
    var validEl = document.querySelector("#ansValidity")
    var ansButtonsEl = document.querySelector(".answerContainer");
    var introEl = document.querySelector("#intro");
    var scoreInputEl = document.querySelector("#scoreInput");
    var submitEl = document.querySelector("#submitButton");
    var nameInputEl = document.querySelector("#nameInput");
    var isDone = false;
    var timeStart = 60; //seconds
    var score = 0;
    var questionIndex = 0;
    var questionsArray = [
        "What term is usually used in programming to refer to attributes and values?", 
        "Which HTML tag is used to define an Internal style sheet?", 
        "Which of the following elements will directly affect the vertical spacing in an HTML layout?" 
    ];
    var answersArray = ["Array Properties Syntax Boolean", "<look> <design> <style> <nav>", "<br> break <b> split()"]
    var correctAnswers = ["Properties", "<style>", "<br>"]
    var nameScore = {
        initials: '',
        score: '',
    };
    var oldScores = [];
    var nameStorage;
    
    
    // starts timer 

    function startTimer(timeStart){
        var timeLeft = timeStart;
        var timeInterval = setInterval(function(){
            if (timeLeft > 1 && !isDone){
                timerEl.textContent = timeLeft + " seconds remaining";
                timeLeft--;
                score = timeLeft;
            }else if (timeLeft === 1 && !isDone){
                timerEl.textContent = timeLeft + " second remaining";
                timeLeft--;
                score = timeLeft;
            }else if(timeLeft > 0 && isDone){
                clearInterval(timeInterval);
                score = timeLeft;
            }else {
                timerEl.textContent ='';
                clearInterval(timeInterval);
                loadScoreboard();  
            }
        }, 1000);
        return score;
    }
    
    function isCorrect(){
        validEl.textContent = "Correct!";
        nextQuestion();
    }
    
    function isIncorrect(){
        validEl.textContent = "Incorrect!";
        nextQuestion();
    }
    
    function nextQuestion(){
        questionIndex++;
        if (questionsArray.length >= questionIndex){
            loadQuestion(questionIndex);
        }else{
            loadScoreboard();
        }
        
    }
    
    function loadScoreboard(){
        questionEl.textContent = "";
        scoreInputEl.style.display = "block";
        ansBut1El.style.display = "none";
        ansBut2El.style.display = "none";
        ansBut3El.style.display = "none";
        ansBut4El.style.display = "none";
        startButtonEl.disabled = false;
        isDone = true;
        
        submitEl.addEventListener('click', function(event){
            event.preventDefault();
            nameScore.initials = nameInputEl;
            nameScore.score = score;
            localStorage.setItem("highscore", JSON.stringify(nameScore));
            oldScores = JSON.parse(localStorage.getItem("highscore"));
            for(i = 0; i < oldScores.length; i++){
                var scoreInList = oldScores[i];
                var li = document.createElement("li");
                li.textContent = scoreInList;
                li.setAttribute("data-index", i);
                scoreboardEl.appendChild(li);
                
            }
        });
    }
    
    function loadQuestion(i){
        answerChosen = 4;
        questionEl.textContent = questionsArray[i];
        if(i < questionsArray.length){
        var tempArray = answersArray[i].split(' ');
        for (j = 0; j < tempArray.length; j++){
            if (j === 0){
                    ansBut1El.textContent = tempArray[j];
                }else if (j === 1)
                {
                    ansBut2El.textContent = tempArray[j];
                }else if (j === 2)
                {
                    ansBut3El.textContent = tempArray[j];
                }else
                {
                    ansBut4El.textContent = tempArray[j];
                }
            }
        }else{
            tempArray = answersArray[i-1].split(' ');
        }
        ansBut1El.addEventListener("click", function(){
            answerChosen = tempArray[0];
            if (answerChosen === correctAnswers[i]){
                isCorrect();
            }else{
                isIncorrect();
            }
         });
         ansBut2El.addEventListener("click", function(){
            answerChosen = tempArray[1];
            if (answerChosen === correctAnswers[i]){
                isCorrect();
            }else{
                isIncorrect();
            }
         });
         ansBut3El.addEventListener("click", function(){
            answerChosen = tempArray[2];
            if (answerChosen === correctAnswers[i]){
                isCorrect();
            }else{
                isIncorrect();
            }
         });
         ansBut4El.addEventListener("click", function(){
            answerChosen = tempArray[3];
            if (answerChosen === correctAnswers[i]){
                isCorrect();
            }else{
                isIncorrect();
            }
         });
    }
    
    function startGame(){
        startTimer(timeStart);
        questionIndex = 0;
        startButtonEl.disabled = true;
        introEl.style.display = "none";
        ansBut1El.style.display = "inline";
        ansBut2El.style.display = "inline";
        ansBut3El.style.display = "inline";
        ansBut4El.style.display = "inline";
        isDone = false;
        loadQuestion(questionIndex);
    }
    
    
    //Starts game on click
    startButtonEl.addEventListener("click",startGame);
    
