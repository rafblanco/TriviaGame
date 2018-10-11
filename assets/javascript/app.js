$(document).ready(function () {
    // Have an array of objects with questions
    var triviaQs = [
        {
            question: "What is Michael Scott's middle name?",
            choices: ["Gary", "Alejandro", "John", "Jim"],
            answer: "Gary"
        },
        {
            question: "Where does the show take place?",
            choices: ["New York", "Philadelphia", "Scranton", "Albany"],
            answer: "Scranton"
        },
        {
            question: "What substance does Jim put office supplies owned by Dwight and Andy into?",
            choices: ["Glue", "Jello", "Pudding", "Milk"],
            answer: "Jello"
        },
        {
            question: "Who does Jim have a crush on and reveals his crush to at the end of Season 2?",
            choices: ["Angela", "Phyllis", "Pam", "Erin"],
            answer: "Pam"
        },
        {
            question: "What is the name of the paper company where The Office takes place?",
            choices: ["Xerox", "Dunder-Mifflin", "Staples", "Dell"],
            answer: "Dunder-Mifflin"
        },
        {
            question: "Dwight owns and runs a farm in his spare time. What does this farm primarily produce?",
            choices: ["Corn", "Tomatoes", "Apples", "Beets"],
            answer: "Beets"
        }
    ];

    var index = 0;
    var count = 30;
    var intervalId;

    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    //Initialize function that will have a start button 
    function initialize() {
        $("#choices").html("<button id='start-btn'> Start Game </button>");

    }

    $(document).on("click", "#start-btn", function () {
        $("#choices").empty();
        newQuestion();
        timer();


    });
    // $("#start-btn").on("click", function () {
    //     // Start timer function
    //     // First Question and answer
    //     // hide button 
    //     //

    //     console.log(triviaQs[index].question);
    // });

    $(document).on("click", ".options", function () {
        stop();
        //Increments to the next question
        //if (answer == correct)
        if ($(this).text() === triviaQs[index].answer) {
            correct++;
            $("#questionaire").html("Correct!");
            // html to the choices show gif from the question
            var correctGif = $("<img>").attr("src", "assets/images/correct.gif");
            $("#choices").html(correctGif);
            index++;
            if (index === 6) {
                
                //Call the final score function 
                setTimeout(finalScore, 5000);
            } else {
            setTimeout(newQuestion, 5000);
            }
        }
        // else(answer == wrong)
        else {
            incorrect++;
            $("#questionaire").html("Wrong!");
            //html the choices shows gif
            var wrongText = $("<p>").text("The Correct Answer was: " + triviaQs[index].answer);
            var wrongGif = $("<img>").attr("src", "assets/images/dwight-false.gif");
            $("#choices").html(wrongText, wrongGif);
            index++;
            if (index === 6) {
                //Call the final score function 
                setTimeout(finalScore, 5000);
            } else{
            setTimeout(newQuestion, 5000);
            }
        }
    });


    function newQuestion() {
        reset();
        timer();
        $("#choices").empty();
        // Prints question
        $("#questionaire").html(triviaQs[index].question);
        // Prints the question choices
        for (var i = 0; i < 5; i++) {
            var textC = $("<p class='options'>").text(triviaQs[index].choices[i]);
            $("#choices").append(textC);
        }

    }

    //Timer Functionality
    function timer() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function reset() {
        // sets the count back to 30
        count === 30;
    }

    function stop() {
        clearInterval(intervalId)
    }

    function decrement() {
        count--;
        if (count === 0) {
            stop();
            unanswered++;
            index++;
            // show the correct answer and gif
            setTimeout(newQuestion, 5000);
        } else {
            $("#timer").html("Time Remaining: " + count + " seconds");
        }
    }

    // when there are no more questions left 


    $(document).on("click", "#restart", function () {
        incorrect = 0;
        correct = 0;
        unanswered = 0;
        newQuestion();

    });

    function finalScore() {
        $("#choices").empty();
        var correctAns = $("<p>").text("Number of correct answers: " + correct);
        var incorrectAns = $("<p>").text("Number of incorrect answers: " + incorrect);
        var unansweredText = $("<p>").text("Number of unanswered: " + unanswered);

        $("#choices").html(correctAns, incorrectAns, unansweredText);
        index === 0;
        $("#choices").append("<button id='restart'> Start Over? </button>");

    }
    initialize();
});