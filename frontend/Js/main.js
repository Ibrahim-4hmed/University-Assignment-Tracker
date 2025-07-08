// All Variables
let addCoursePopUp = document.getElementById("course-popup"); // Course popup
let addAssignPopUp = document.getElementById("assignment-popup"); // Assign popup
let overlay = document.getElementById("overlay");
let cardsContaier = document.querySelector(".cards-box"); // Courses Container

// inputs For Course
let courseName = document.getElementById("course-name");
let semster = document.getElementById("semester");

// inputs For Assignments
let assignName = document.getElementById("assign-name");
let startdate = document.getElementById("start-date");
let deadline = document.getElementById("end-date");

let currentCard = null;

// To Cancel Adding Course
document.querySelector(".course-head > i").onclick = _ => cancel();
document.querySelector(".cancel").onclick = _ => cancel();

document.querySelector(".cancelAS").onclick = _ => cancelAS();
document.querySelector(".assign-head > i").onclick = _ => cancelAS();

// Show course popup
document.querySelector('.add-course').addEventListener("click", () => showCoursePopup());
document.querySelector(".add").addEventListener("click", () => addOneCourse());
document.querySelector(".assignment-addBtn").addEventListener("click", () => addAssign());

// Functions

// Create Popup Course Function 
function showCoursePopup() {
    overlay.style.display = "block";
    addCoursePopUp.style.display = 'block';
}

// Create Popup Assignment
function showAssignPopup() {
    overlay.style.display = "block";
    addAssignPopUp.style.display = 'block';
}

function cancel() {
    addCoursePopUp.style.display = 'none';
    overlay.style.display = "none";
}

function cancelAS() {
    addAssignPopUp.style.display = 'none';
    overlay.style.display = "none";
}

// Add course
function addOneCourse() {
    if (courseName.value && semster.value) {
        let courseCard = document.createElement("div");
        let testContainer = document.createElement('div');
        let btn = document.createElement('button');
        courseCard.className = 'card';
        testContainer.className = 'assignments';
        btn.innerHTML = '+ Add Assignment';
        btn.className = "add-assign";
        courseCard.innerHTML = `
            <div class="card-head">
                <i class="fa-solid fa-book-open"></i>
                <h2>${courseName.value}<br><i style="margin-right:10px;" class="fa-regular fa-calendar"></i><span>${semster.value}</span></h2>
            </div>
        `;
        courseCard.appendChild(testContainer);
        btn.addEventListener("click", () => {
            currentCard = courseCard;
            showAssignPopup();
        });
        courseCard.appendChild(btn);
        cardsContaier.appendChild(courseCard);
    }
    cancel();
    saveData();   
    courseName.value = "";
    semster.value = "";
}

// Add assignment 
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
        let assignContainer = currentCard.querySelector(".assignments");
        if (!assignContainer) {
            assignContainer = document.createElement("div");
            assignContainer.className = "assignments";
            currentCard.insertBefore(assignContainer, currentCard.querySelector("button"));
        }
        assignContainer.appendChild(assignment);
    } else {
        console.log("error");
    }
    assignName.value = "";
    startdate.value = "";
    deadline.value = "";
    cancelAS();
    saveData(); 
}

document.addEventListener("click", (e) => {
    if (e.target.className == "add-assign") {
        overlay.style.display = "block";
        addAssignPopUp.style.display = 'block';
    }
});

function rebindAssignButtons() {
    document.querySelectorAll('.add-assign').forEach(btn => {
        btn.addEventListener("click", () => {
            currentCard = btn.closest(".card");
            showAssignPopup();
        });
    });
}

// ====================
// ✅ New: SAVE DATA to backend
// ====================
async function saveData() {
    const courses = [];
    document.querySelectorAll('.card').forEach(card => {
        const courseName = card.querySelector('.card-head h2').childNodes[0].nodeValue.trim();
        const semester = card.querySelector('.card-head span').innerText.trim();

        const assignments = [];
        card.querySelectorAll('.assignment').forEach(assignEl => {
            const assignName = assignEl.querySelector('h3').childNodes[1].nodeValue.trim();
            const startDate = assignEl.querySelectorAll('.time span')[0].innerText.replace(/^\D*/, '').trim();
            const endDate = assignEl.querySelectorAll('.time span')[1].innerText.replace(/^\D*/, '').trim();

            assignments.push({
                assignName,
                startDate,
                endDate
            });
        });

        courses.push({
            courseName,
            semester,
            assignments
        });
    });

    try {
        await fetch('data.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courses)
        });
        console.log('Data saved to server');
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// ====================
// ✅ New: LOAD DATA from backend
// ====================
async function showTask() {
    try {
        const response = await fetch('data.json');
        const courses = await response.json();

        cardsContaier.innerHTML = '';

        courses.forEach(course => {
            const courseCard = document.createElement("div");
            const testContainer = document.createElement('div');
            const btn = document.createElement('button');
            courseCard.className = 'card';
            testContainer.className = 'assignments';
            btn.innerHTML = '+ Add Assignment';
            btn.className = "add-assign";

            courseCard.innerHTML = `
                <div class="card-head">
                    <i class="fa-solid fa-book-open"></i>
                    <h2>${course.courseName}<br><i style="margin-right:10px;" class="fa-regular fa-calendar"></i><span>${course.semester}</span></h2>
                </div>
            `;

            course.assignments.forEach(assignment => {
                const assignmentEl = document.createElement("div");
                assignmentEl.className = "assignment";
                assignmentEl.innerHTML = `
                    <h3><i class="fa-regular fa-clock"></i>${assignment.assignName} <span>Active</span></h3>
                    <div class="time">
                        <span><i class="fa-regular fa-calendar"></i>${assignment.startDate}</span>
                        <span><i class="fa-regular fa-calendar"></i>${assignment.endDate}</span>
                    </div>`;
                testContainer.appendChild(assignmentEl);
            });

            courseCard.appendChild(testContainer);
            btn.addEventListener("click", () => {
                currentCard = courseCard;
                showAssignPopup();
            });
            courseCard.appendChild(btn);
            cardsContaier.appendChild(courseCard);
        });

        rebindAssignButtons();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Initial load
showTask();
