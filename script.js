//[] -create a list
//[] -create a dictionary that stores key-value pairs

const database1 =[
    {
        question : "What is the name of Naruto's ninja village",
        options : ["Sand village" ,"Mist Village", "Leaf Village" ,"Cloud Village"],
        answer : "Leaf Village"
    },

    {
        question : "Who is Naruto’s first team leader (sensei)",
        options : ["Orochimaru" ,"Kakashi", "Jiraya", "Asuma"],
        answer : "Kakashi"
    },

    {
        question : "What animal is sealed inside Naruto", 
        options : ["One-tailed Shukaku", "Eight-tailed Ox", "Nine-tailed Fox", "Ten-tailed Beast"],
        answer : "Nine-tailed Fox"
    },

    {
        question : "What is the name of Naruto’s best friend and rival",
        options : ["Neji", "Gara", "Sasuke", "Shikamaru"],
        answer : "Sasuke"
    },

    {
        question : "what is sasuke's signiture move",
        options : ["Shadow Clone", "Chidori", "Reaper Death Seal", "Amaterasu"],
        answer : "Chidori"
    },
]

const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerText = document.getElementById("timer-text");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container")
const ProgressBarfill = document.getElementById("progress-bar-fill")
const ScoreLabel = document.getElementById("score-label")
const FeedbackLabel = document.getElementById("feedback-label")
const BgmDropdown = document.getElementById("bgm-selector")
const BgmButton = document.getElementById("music-btn")


let CurrentSong = null;
let IsBgmPlaying = false;

// what happens when people select a soundtrack
BgmDropdown.addEventListener("change", () => {
    const SelectedSong = BgmDropdown.value;

    //if the song cannot be found,abort function
    if(!SelectedSong) return;

    //stop and reset previous song if it exsists
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0
    }

    // load and play the selected song
    CurrentSong = new Audio (SelectedSong)
    CurrentSong .loop = true
    CurrentSong.volume = 0.2
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🎙️Naruto music on🔊"
    BgmButton.style.backgroundColor = "lime";
});

BgmButton.addEventListener("click",()=>{
    if(IsBgmPlaying)
    {
        CurrentSong.pause();
        BgmButton.textContent = "🎙️Naruto music off🔇"
        BgmButton.style.backgroundColor = "black";
        IsBgmPlaying = false;
    } else
    {
        CurrentSong.play();
        BgmButton.textContent = "🎙️Naruto music on🔊"
        BgmButton.style.backgroundColor = "lime";
        IsBgmPlaying = true;
    }
});


StartButton.addEventListener("click", StartQuiz);

let timer;
let question_index = 0;
let score = 0

function StartQuiz()
{    
    StartButton.style.display = 'none';
    DropDown.style.display = 'none';
    LoadQuestion();
}

function LoadQuestion()
{
    // check if there're question in the database that is yet to be loaded
    if(question_index < database1.length)
    {
        //clear feedback label
        FeedbackLabel.textContent="";

        // reset timer
        TimerText.textContent = 30;

        // update progress bar
        ProgressBarfill.style.width = `${((question_index +1)/ database1.length) * 100 }%`;  

        // load a question from the database
        const CurrentQuestionSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;
    
        // erase previous option buttons
        OptionContainer.innerHTML= ' ';

        //clone all option button associated to the question
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add('option-btn')
            OptionContainer.appendChild(button);



            button.addEventListener('click',()=>{
                DisableAllOptionButtons()
                CheckAnswer(item);
            })
        });
    
        // turn on the timer
        timer =setInterval(() =>{
            //reduce timer text by 1
            TimerText.textContent = parseInt(TimerText.textContent) -1;

            if(parseInt(TimerText.textContent) === 0)
            {
                clearInterval(timer);//to stop the timer
                DisableAllOptionButtons();
                CheckAnswer(null);
            }
        },1000);
    }else
    {
        EndQuiz();
    }
}




function EndQuiz()
{
    clearInterval(timer);
    QuestionLabel.textContent = "you are now the leader of the foundation😭";
    FeedbackLabel.style.display = 'none';
    OptionContainer.style.display = 'none';
    TimerText.textContent = "🫠😭🫠";
}








function DisableAllOptionButtons()
{
    const all_options_button = document.querySelectorAll('.option-btn');

    all_options_button.forEach(button =>{
        button.disabled=true;
    })
}


// item -> player selected option
function CheckAnswer(item)
{
    clearInterval(timer)
    const actual_ans = database1[question_index].answer
    let message;

    if(item === actual_ans)
    {
        score = score + 1
        message="you are now a hokage😃"
    } else if (item === null)
    {
        message="you are not fast enough to be a hokage🏃🏻"
    } else
    {
        message="you have no brains to be a hokage🧠"
    }   

    FeedbackLabel.textContent = message;
    ScoreLabel.textContent = `you just handled an S-rank mission🤩`; 

    setTimeout(() => {
        question_index = question_index+1;
        LoadQuestion();
    }, 3000);
    
}