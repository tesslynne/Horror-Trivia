window.onload = function() {
    //define variables
    var questionArea = document.getElementsByClassName("questions")[0],

        answerArea = document.getElementsByClassName("answers")[0],
        checker = document.getElementsByClassName("checker")[0],
        current = 0,

        // An object that holds all the questions + possible answers.
        // In the array --> last digit gives the correct answer-position
        quizContent = {
            "Who directed the original Night of the Living Dead?": [
                "Bela Lugosi", "Ingmar Bergman", "George Romero",
                "James Stewart", 2],
            "Who was the killer in the first Friday the 13th movie?": [
                "Norman Bates", "Jason Voorhees", "Michael Myers",
                "Pamela Voorhees", 3],
            "Which 1987 movie tells the story of a puzzle box that opens a portal to Hell?": [
                "Drag Me To Hell", "Hellraiser", "Evil Dead 2",
                "Prince of Darkness", 1],
            "In which film did Johnny Depp's character get eaten by a bed?": [
                "Nightmare on Elm Street",
                "What's Eating Gilbert Grape?", "Ninth Gate",
                "From Hell", 0],
            "Which horror movie character bends over backwards and 'spider walks' down a flight of stairs?": [
                "Carol Anne in Poltergeist", "Helen in Candyman",
                "Reagan in The Exorcist", "Sidney in Scream", 2],
            "Which sci-fi/horror flick had the marketing tagline, 'in space, no one car hear you scream'?": [
                "Event Horizon", "Planet of the Vampires",
                "Killer Klownz from Outer Space", "Alien", 3],
            "Which 'sin' did Brad Pitt's Agent Mills represent in the movie Se7en?" : [
                "Lust", "Gluttony", "Sloth", "Pride", "Wrath", "Envy",
                "Greed", 4],
            "Who was the primary killer in Silence of the Lambs?" : ["Buffalo Bill", "Hannibal Lecter", "Patrick Bateman", "Tyler Durden", 0]
        }


function loadQuestion(curr) {
    // This function loads all the question into the questionArea
    // It grabs the current question based on the 'current'-variable
    // This variable grabs all the keys of an object and put it in an array
    // The [curr] at the end will give us the current question :)
    var question = Object.keys(quizContent)[curr]
        //remove everything in the question area
    questionArea.innerHTML = ""
        //add current question!
    questionArea.innerHTML = question
}

function loadAnswers(curr) {
    //this loads all possible answers of given question
    //it should grab the answer array necessary with the help of the 'current' var
    //answers will be added with an onclick function
    //grab the answers
    var answers = quizContent[Object.keys(quizContent)[curr]]
        //empty the answer field
    answerArea.innerHTML = ""
        //add all possible answers the the answer area
    for ( i = 0; i < answers.length - 1; i += 1) {
        var createDiv = document.createElement("div"),
            text = document.createTextNode(answers[i])
        createDiv.appendChild(text)
            //this adds onclick function on the answer, executing a function to check correctness
        createDiv.addEventListener("click", checkAnswer(i, answers))
        answerArea.appendChild(createDiv)
    }
}

function checkAnswer(i, arr) {
    //this is the function that'll run when one of the answers is clicked
    //check if givenanswer is same as correct answer
    //after this, check if it's the last question of the quiz
    //if it is the last wuestion, empty the answer Area and let user know it's over
    return function() {
        var userAnswer = i,
            correctAnswer = arr[arr.length - 1]
        if (userAnswer === correctAnswer) {
            addChecker(true)
        } else {
            addChecker(false)
        }
        if (current < Object.keys(quizContent).length - 1) {
            current += 1
            loadQuestion(current)
            loadAnswers(current)
        } else {
            questionArea.innerHTML = "you made it... or did you?"
            answerArea.innerHTML = ""
        }
    }
}

function addChecker(bool) {
    //add a div element to the page to see if true/false
    var createDiv = document.createElement("div"),
        txt = document.createTextNode(current + 1)
    createDiv.appendChild(txt)
    if (bool) {
        createDiv.className += "correct"
        checker.appendChild(createDiv)
    } else {
        createDiv.className += "false"
        checker.appendChild(createDiv)
    }
}
//start quiz right away
loadQuestion(current)
loadAnswers(current)
}