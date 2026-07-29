/* ==========================================================
   SMART HOME & AI AUTOMATION
   Version 3.0
   Part 1 - Core System
==========================================================*/

// =======================================
// DOM ELEMENTS
// =======================================

const app = {

    loader: document.getElementById("loader"),

    loginPage: document.getElementById("loginPage"),

    dashboard: document.getElementById("dashboard"),

    houseSelect: document.getElementById("houseSelect"),

    password: document.getElementById("password"),

    error: document.getElementById("error"),

    unlockButton: document.getElementById("unlockButton"),

    togglePassword: document.getElementById("togglePassword"),

    greeting: document.getElementById("greeting"),

    clock: document.getElementById("clock"),

    liveDate: document.getElementById("liveDate"),

    settingsModal: document.getElementById("settingsModal"),

    darkSwitch: document.getElementById("darkSwitch"),

    notificationArea: document.getElementById("notificationArea")

};

// =======================================
// APP STATE
// =======================================

const state = {

    loggedIn:false,

    currentHouse:"",

    weather:null,

    lights:false,

    doorLocked:true,

    emergency:false,

    darkMode:false

};

// =======================================
// HOUSE PASSWORDS
// =======================================

const PASSWORDS={

    "House 1":"1234",

    "House 2":"2345",

    "House 3":"3456",

    "House 4":"4567",

    "House 5":"5678"

};

// =======================================
// STARTUP
// =======================================

window.addEventListener("DOMContentLoaded",()=>{

    setupLoader();

    setupPasswordToggle();

    setupKeyboard();

    updateClock();

    updateDate();

    updateGreeting();

    checkSavedLogin();

    setInterval(updateClock,1000);

    setInterval(updateGreeting,60000);

});

// =======================================
// LOADER
// =======================================

function setupLoader(){

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            app.loader.style.opacity="0";

            setTimeout(()=>{

                app.loader.style.display="none";

            },700);

        },2200);

    });

}

// =======================================
// LOGIN
// =======================================

function login(){

    const house=app.houseSelect.value;

    const pass=app.password.value.trim();

    if(pass===PASSWORDS[house]){

        state.loggedIn=true;

        state.currentHouse=house;

        localStorage.setItem("loggedIn","true");

        localStorage.setItem("house",house);

        app.loginPage.style.display="none";

        app.dashboard.style.display="block";

        showNotification("Welcome Home!");

        initializeDashboard();

    }

    else{

        app.error.innerHTML="Incorrect Password";

        app.password.value="";

        app.password.focus();

        shake(app.password);

    }

}

// =======================================
// CHECK SAVED LOGIN
// =======================================

function checkSavedLogin(){

    if(localStorage.getItem("loggedIn")==="true"){

        state.loggedIn=true;

        state.currentHouse=localStorage.getItem("house");

        app.loginPage.style.display="none";

        app.dashboard.style.display="block";

        initializeDashboard();

    }

}

// =======================================
// LOGOUT
// =======================================

function logout(){

    localStorage.clear();

    location.reload();

}

// =======================================
// PASSWORD TOGGLE
// =======================================

function setupPasswordToggle(){

    app.togglePassword.addEventListener("click",()=>{

        if(app.password.type==="password"){

            app.password.type="text";

            app.togglePassword.innerHTML="<i class='fa-solid fa-eye-slash'></i>";

        }

        else{

            app.password.type="password";

            app.togglePassword.innerHTML="<i class='fa-solid fa-eye'></i>";

        }

    });

}

// =======================================
// ENTER KEY
// =======================================

function setupKeyboard(){

    app.password.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            login();

        }

    });

}

// =======================================
// CLOCK
// =======================================

function updateClock(){

    if(!app.clock) return;

    const now=new Date();

    app.clock.textContent=now.toLocaleTimeString();

}

// =======================================
// DATE
// =======================================

function updateDate(){

    if(!app.liveDate) return;

    const now=new Date();

    app.liveDate.textContent=now.toDateString();

}

// =======================================
// GREETING
// =======================================

function updateGreeting(){

    if(!app.greeting) return;

    const hour=new Date().getHours();

    let text="";

    if(hour<12){

        text="☀️ Good Morning";

    }

    else if(hour<17){

        text="🌤 Good Afternoon";

    }

    else{

        text="🌙 Good Evening";

    }

    app.greeting.textContent=text;

}

// =======================================
// SETTINGS
// =======================================

function openSettings(){

    app.settingsModal.style.display="flex";

}

function closeSettings(){

    app.settingsModal.style.display="none";

}

// =======================================
// DARK MODE
// =======================================

app.darkSwitch?.addEventListener("change",()=>{

    document.body.classList.toggle("night");

});

// =======================================
// NOTIFICATIONS
// =======================================

function showNotification(text){

    const note=document.createElement("div");

    note.className="notification";

    note.textContent=text;

    document.body.appendChild(note);

    setTimeout(()=>{

        note.classList.add("show");

    },100);

    setTimeout(()=>{

        note.classList.remove("show");

        setTimeout(()=>{

            note.remove();

        },500);

    },3500);

}

// =======================================
// SHAKE EFFECT
// =======================================

function shake(element){

    element.animate([

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(0)"}

    ],{

        duration:350

    });

}

// =======================================
// DASHBOARD INIT
// =======================================

function initializeDashboard(){

    showNotification("Dashboard Online");

    // Weather
    // Charts
    // AI
    // Controls

    // (Added in Part 2)

}

// =======================================
// PLACEHOLDERS
// =======================================

function fetchWeather(){}

function toggleDoor(){}

function toggleLight(){}

function emergency(){}

function sendAI(){}

function startVoiceRecognition(){}

function createCharts(){}

function updateDashboard(){}
