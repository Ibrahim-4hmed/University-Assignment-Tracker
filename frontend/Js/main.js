//All Variables
let addCoursePopUp = document.getElementById("course-popup");//Course popup
let addAssignPopUp = document.getElementById("assignment-popup");//Assign popup
let overlay = document.getElementById("overlay");
let cardsContaier = document.querySelector(".cards-box");//Courses Container
//inputs For Course
let courseName = document.getElementById("course-name");
let semster = document.getElementById("semester");
//inputs For Assignments
let assignName = document.getElementById("assign-name");
let startdate = document.getElementById("start-date");
let deadline = document.getElementById("end-date");

let currentCard = null;



// To Cancel Adding Course
document.querySelector(".course-head > i").onclick = _ => cancel();
document.querySelector(".cancel").onclick = _ => cancel();

document.querySelector(".cancelAS").onclick = _ => cancelAS();
document.querySelector(".assign-head > i").onclick = _ => cancelAS();

//show course popup
document.querySelector('.add-course').addEventListener("click",() => showCoursePopup());
document.querySelector(".add").addEventListener( "click",() => addOneCourse());

document.querySelector(".assignment-addBtn").addEventListener("click",() => addAssign());


//functions
//Create Popup Course Function 
function showCoursePopup(){
    // console.log("hello");
    overlay.style.display = "block";
    addCoursePopUp.style.display = 'block';
}
//Create Popup Assignment
function showAssignPopup(){
    overlay.style.display = "block";
    addAssignPopUp.style.display = 'block';
}

function cancel(){
    addCoursePopUp.style.display = 'none';
    overlay.style.display = "none";
}
function cancelAS(){
    addAssignPopUp.style.display = 'none';
    overlay.style.display = "none";
}
// localStorage.clear();
//add course
function addOneCourse(){
    courseName.focus();
    if (courseName.value && semster.value) {
        let courseCard = document.createElement("div");
        let testContainer = document.createElement('div');
        let btn = document.createElement('button');
        courseCard.className = 'card';
        testContainer.className ='assignments'
        btn.innerHTML = '+ Add Assignment'
        btn.className = "add-assign";
        courseCard.innerHTML = `
                <div class="card-head">
                    <i class="fa-solid fa-book-open"></i>
                    <h2>${courseName.value}<br><i style="margin-right:10px;" class="fa-regular fa-calendar"></i><span>${semster.value}</span></h2>
                </div>
        `;
        courseCard.appendChild(testContainer);
        // btn.addEventListener("click", () => {
        //     currentCard = courseCard;
        //     showAssignPopup();
        // })
        courseCard.appendChild(btn);
        cardsContaier.appendChild(courseCard);
    }
    cancel();
    saveData();   
    courseName.value = "";
    semster.value = "";
}
document.addEventListener("click",(e)=> {
    //show Assignment popup
    if (e.target.className == "add-assign") {
        overlay.style.display = "block";
        addAssignPopUp.style.display = 'block';
    }
});

// let currentCourseCard = null;


// document.addEventListener("click", (e) => {
//     if (e.target.className == "add-assign") {
//         currentCourseCard = e.target.closest(".card"); // store the card being assigned
//         overlay.style.display = "block";
//         addAssignPopUp.style.display = 'block';
//     }
// });


//add assignment 
function addAssign() {
    if (assignName.value && startdate.value && deadline.value) {
        let assignment = document.createElement("div");
        assignment.className = "assignment";

        assignment.innerHTML = `
            <h3><i class="fa-regular fa-clock"></i>${assignName.value} <span>Active</span></h3>
            <div class="time">
                <span><i class="fa-regular fa-calendar"></i>${startdate.value}</span>
                <span><i class="fa-regular fa-calendar"></i>${deadline.value}</span>
            </div>`;

        // Find or create assignment container
        let assignContainer = currentCard.querySelector(".assignments");
        if (!assignContainer) {
            assignContainer = document.createElement("div");
            assignContainer.className = "assignments";
            currentCard.insertBefore(assignContainer, currentCard.querySelector("button"));
        }

        assignContainer.appendChild(assignment);
    } else {
        console.log("error")
    }

    assignName.value = "";
    startdate.value = "";
    deadline.value = "";
    cancelAS();
    saveData(); 
}

    





function saveData(){
    localStorage.setItem('data',cardsContaier.innerHTML)
}

function showTask() {
    cardsContaier.innerHTML = localStorage.getItem('data');
    
}

showTask();