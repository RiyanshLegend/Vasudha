/* ==========================================================
   SMART HOME & AI AUTOMATION
   Version 4.0
   Part 1A
==========================================================*/

// ==============================
// DOM ELEMENTS
// ==============================

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

    chat: document.getElementById("chat"),

    aiInput: document.getElementById("aiInput"),

    doorStatus: document.getElementById("doorStatus"),

    lightStatus: document.getElementById("lightStatus"),

    indoorTemp: document.getElementById("indoorTemp"),

    power: document.getElementById("power"),

    water: document.getElementById("water"),

    fireStatus: document.getElementById("fireStatus"),

    temperature: document.getElementById("temperature"),

    humidity: document.getElementById("humidity"),

    windSpeed: document.getElementById("windSpeed"),

    weatherCondition: document.getElementById("weatherCondition")

};

// ==============================
// APP STATE
// ==============================

const state={

    loggedIn:false,

    currentHouse:"",

    doorLocked:true,

    lights:false,

    emergency:false,

    weather:{},

    temperature:27,

    humidity:55,

    power:2.1,

    water:82

};

// ==============================
// PASSWORDS
// ==============================

const PASSWORDS={

    "House 1":"1234",

    "House 2":"2345",

    "House 3":"3456",

    "House 4":"4567",

    "House 5":"5678"

};

// ==============================
// START APP
// ==============================

window.addEventListener("DOMContentLoaded",()=>{

    setupLoader();

    setupPasswordToggle();

    setupKeyboard();

    checkSavedLogin();

    updateClock();

    updateDate();

    updateGreeting();

    setInterval(updateClock,1000);

    setInterval(updateGreeting,60000);

    if(app.aiInput){

        app.aiInput.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                sendAI();

            }

        });

    }

});

// ==============================
// LOADER
// ==============================

function setupLoader(){

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            if(app.loader){

                app.loader.style.opacity="0";

                setTimeout(()=>{

                    app.loader.style.display="none";

                },700);

            }

        },2000);

    });

}

// ==============================
// LOGIN
// ==============================

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

        initializeDashboard();

        showNotification("🏠 Welcome to "+house);

    }

    else{

        app.error.textContent="Incorrect Password";

        shake(app.password);

        app.password.value="";

    }

}

function checkSavedLogin(){

    if(localStorage.getItem("loggedIn")==="true"){

        state.loggedIn=true;

        state.currentHouse=localStorage.getItem("house");

        app.loginPage.style.display="none";

        app.dashboard.style.display="block";

        initializeDashboard();

    }

}

function logout(){

    localStorage.clear();

    location.reload();

}

// ==============================
// PASSWORD
// ==============================

function setupPasswordToggle(){

    if(!app.togglePassword) return;

    app.togglePassword.onclick=()=>{

        if(app.password.type==="password"){

            app.password.type="text";

            app.togglePassword.innerHTML="<i class='fa-solid fa-eye-slash'></i>";

        }else{

            app.password.type="password";

            app.togglePassword.innerHTML="<i class='fa-solid fa-eye'></i>";

        }

    };

}

function setupKeyboard(){

    if(!app.password) return;

    app.password.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            login();

        }

    });

}

// ==============================
// CLOCK
// ==============================

function updateClock(){

    if(!app.clock) return;

    app.clock.textContent=new Date().toLocaleTimeString();

}

function updateDate(){

    if(!app.liveDate) return;

    app.liveDate.textContent=new Date().toDateString();

}

function updateGreeting(){

    if(!app.greeting) return;

    const h=new Date().getHours();

    if(h<12){

        app.greeting.textContent="☀️ Good Morning";

    }

    else if(h<17){

        app.greeting.textContent="🌤 Good Afternoon";

    }

    else{

        app.greeting.textContent="🌙 Good Evening";

    }

}

// ==========================================================
// PART 1B
// Dashboard Controls + Notifications
// ==========================================================

// ==============================
// DASHBOARD
// ==============================

function initializeDashboard(){

    updateDashboard();

    fetchWeather();

    createCharts();

    showNotification("🏠 Dashboard Connected");

}

// ==============================
// UPDATE DASHBOARD
// ==============================

function updateDashboard(){

    if(app.indoorTemp)
        app.indoorTemp.textContent=state.temperature+"°C";

    if(app.power)
        app.power.textContent=state.power.toFixed(1)+" kWh";

    if(app.water)
        app.water.textContent=state.water+"%";

}

// ==============================
// DOOR CONTROL
// ==============================

function toggleDoor(){

    state.doorLocked=!state.doorLocked;

    if(app.doorStatus){

        if(state.doorLocked){

            app.doorStatus.textContent="Locked";
            app.doorStatus.style.color="#ff4d4d";

            showNotification("🚪 Door Locked");

        }else{

            app.doorStatus.textContent="Unlocked";
            app.doorStatus.style.color="#00ff88";

            showNotification("🚪 Door Unlocked");

        }

    }

}

// ==============================
// LIGHT CONTROL
// ==============================

function toggleLight(){

    state.lights=!state.lights;

    if(app.lightStatus){

        if(state.lights){

            app.lightStatus.textContent="ON";
            app.lightStatus.style.color="#FFD700";

            document.body.classList.add("lightsOn");

            showNotification("💡 Lights Turned ON");

        }else{

            app.lightStatus.textContent="OFF";
            app.lightStatus.style.color="#ffffff";

            document.body.classList.remove("lightsOn");

            showNotification("💡 Lights Turned OFF");

        }

    }

}

// ==============================
// EMERGENCY MODE
// ==============================

function emergency(){

    state.emergency=!state.emergency;

    if(app.fireStatus){

        if(state.emergency){

            app.fireStatus.textContent="🚨 FIRE DETECTED";

            app.fireStatus.classList.remove("fireSafe");

            app.fireStatus.classList.add("fireDanger");

            showNotification("🚨 Emergency Mode Activated");

        }else{

            app.fireStatus.textContent="No Fire Detected";

            app.fireStatus.classList.remove("fireDanger");

            app.fireStatus.classList.add("fireSafe");

            showNotification("✅ Emergency Cleared");

        }

    }

}

// ==============================
// SETTINGS
// ==============================

function openSettings(){

    if(app.settingsModal){

        app.settingsModal.style.display="flex";

    }

}

function closeSettings(){

    if(app.settingsModal){

        app.settingsModal.style.display="none";

    }

}

// ==============================
// DARK MODE
// ==============================

if(app.darkSwitch){

    app.darkSwitch.addEventListener("change",()=>{

        document.body.classList.toggle("night");

    });

}

// ==============================
// NOTIFICATIONS
// ==============================

function showNotification(message){

    const note=document.createElement("div");

    note.className="notification";

    note.innerHTML=message;

    document.body.appendChild(note);

    setTimeout(()=>{

        note.classList.add("show");

    },100);

    setTimeout(()=>{

        note.classList.remove("show");

        setTimeout(()=>{

            note.remove();

        },500);

    },3000);

}

// ==============================
// SHAKE ANIMATION
// ==============================

function shake(element){

    if(!element) return;

    element.animate([

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(0px)"}

    ],{

        duration:350

    });

}

// ==========================================================
// PART 1C
// Weather + AI + Voice + Charts
// ==========================================================

// ==============================
// WEATHER (Open-Meteo)
// ==============================

async function fetchWeather(){

    try{

        const url="https://api.open-meteo.com/v1/forecast?latitude=28.46&longitude=77.03&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

        const response=await fetch(url);

        const data=await response.json();

        app.temperature.textContent=data.current.temperature_2m+"°C";

        app.humidity.textContent=data.current.relative_humidity_2m+"%";

        app.windSpeed.textContent=data.current.wind_speed_10m+" km/h";

        app.weatherCondition.textContent="Sunny";

    }

    catch(err){

        console.log(err);

        app.weatherCondition.textContent="Offline";

    }

}

// ==============================
// SIMPLE AI
// ==============================

function sendAI(){

    if(!app.aiInput || !app.chat) return;

    const message=app.aiInput.value.trim();

    if(message==="") return;

    const user=document.createElement("div");

    user.className="userMessage";

    user.textContent=message;

    app.chat.appendChild(user);

    app.aiInput.value="";

    app.chat.scrollTop=app.chat.scrollHeight;

    setTimeout(()=>{

        const ai=document.createElement("div");

        ai.className="aiMessage";

        const text=message.toLowerCase();

        if(text.includes("hello")||text.includes("hi")){

            ai.textContent="👋 Hello! I'm AIVA.";

        }

        else if(text.includes("weather")){

            ai.textContent="🌤 The live weather has been updated.";

            fetchWeather();

        }

        else if(text.includes("door")){

            toggleDoor();

            ai.textContent="🚪 Door status changed.";

        }

        else if(text.includes("light")){

            toggleLight();

            ai.textContent="💡 Lights updated.";

        }

        else if(text.includes("temperature")){

            ai.textContent="🌡 Indoor temperature is "+app.indoorTemp.textContent;

        }

        else if(text.includes("power")){

            ai.textContent="⚡ Current power usage is "+app.power.textContent;

        }

        else if(text.includes("water")){

            ai.textContent="💧 Water tank level is "+app.water.textContent;

        }

        else{

            ai.textContent="🤖 I understand basic Smart Home commands.";

        }

        app.chat.appendChild(ai);

        app.chat.scrollTop=app.chat.scrollHeight;

    },600);

}

// ==============================
// VOICE
// ==============================

function startVoiceRecognition(){

    if(!("webkitSpeechRecognition" in window)){

        alert("Voice recognition not supported.");

        return;

    }

    const recognition=new webkitSpeechRecognition();

    recognition.lang="en-US";

    recognition.start();

    recognition.onresult=(event)=>{

        app.aiInput.value=event.results[0][0].transcript;

        sendAI();

    };

}

// ==============================
// CHARTS
// ==============================

let powerChart;

let waterChart;

function createCharts(){

    if(typeof Chart==="undefined") return;

    if(document.getElementById("powerChart")){

        powerChart=new Chart(

            document.getElementById("powerChart"),

            {

                type:"line",

                data:{

                    labels:["6","8","10","12","2","4","6"],

                    datasets:[{

                        label:"Power",

                        data:[1.2,1.5,2.0,2.1,1.8,2.4,2.0]

                    }]

                }

            }

        );

    }

    if(document.getElementById("waterChart")){

        waterChart=new Chart(

            document.getElementById("waterChart"),

            {

                type:"bar",

                data:{

                    labels:["Mon","Tue","Wed","Thu","Fri"],

                    datasets:[{

                        label:"Water",

                        data:[80,75,82,70,85]

                    }]

                }

            }

        );

    }

}

// ==========================================================
// PART 2A1
// LIVE SMART HOME SENSOR SYSTEM
// ==========================================================

// ==============================
// LIVE SENSOR VALUES
// ==============================

setInterval(updateSensors,5000);

function updateSensors(){

    // Indoor Temperature
    state.temperature=
    (25+Math.random()*5).toFixed(1);

    // Power
    state.power=
    (1.5+Math.random()*1.5).toFixed(1);

    // Water
    state.water=
    Math.max(35,
    Math.min(
        100,
        state.water+Math.floor(Math.random()*5)-2
    ));

    updateDashboard();

    updateProgressBars();

}

// ==============================
// UPDATE PROGRESS BARS
// ==============================

function updateProgressBars(){

    const powerFill=
    document.getElementById("powerFill");

    const waterFill=
    document.getElementById("waterFill");

    if(powerFill){

        const width=
        Math.min(state.power*30,100);

        powerFill.style.width=
        width+"%";

    }

    if(waterFill){

        waterFill.style.width=
        state.water+"%";

    }

}

// ==============================
// AUTO STATUS
// ==============================

setInterval(()=>{

    const powerStatus=
    document.getElementById("powerStatus");

    const waterStatus=
    document.getElementById("waterStatus");

    if(powerStatus){

        if(state.power<2){

            powerStatus.innerHTML="Excellent";

        }

        else if(state.power<3){

            powerStatus.innerHTML="Normal";

        }

        else{

            powerStatus.innerHTML="High Usage";

        }

    }

    if(waterStatus){

        if(state.water>60){

            waterStatus.innerHTML="Normal";

        }

        else if(state.water>30){

            waterStatus.innerHTML="Low";

        }

        else{

            waterStatus.innerHTML="Critical";

        }

    }

},3000);

// ==============================
// CAMERA SIMULATION
// ==============================

const cameraMessages=[

"Monitoring Home",

"Face Detected",

"Motion Detected",

"Everything Secure",

"Scanning..."

];

setInterval(()=>{

    const cam=
    document.getElementById("cameraStatus");

    if(cam){

        cam.innerHTML=

        cameraMessages[
            Math.floor(
                Math.random()*
                cameraMessages.length
            )
        ];

    }

},4000);

// ==============================
// RANDOM AI NOTIFICATIONS
// ==============================

const aiTips=[

"🤖 All systems operating normally.",

"⚡ Energy usage is optimal.",

"💧 Water tank is healthy.",

"🛡 Security scan completed.",

"🌤 Weather updated."

];

setInterval(()=>{

    if(state.loggedIn){

        showNotification(

            aiTips[
                Math.floor(
                    Math.random()*aiTips.length
                )
            ]

        );

    }

},30000);

// ==============================
// START EVERYTHING
// ==============================

updateSensors();
updateProgressBars();

// ==========================================================
// PART 2A2
// SMART HOME ANIMATIONS
// ==========================================================

// ==============================
// HOUSE IMAGE
// ==============================

const houseImage=document.querySelector(".houseImage");

// ==============================
// DOOR ANIMATION
// ==============================

const doorHotspot=document.querySelector(".doorHotspot");

function animateDoor(){

    if(!doorHotspot) return;

    doorHotspot.animate([

        {transform:"scale(1) rotate(0deg)"},

        {transform:"scale(1.25) rotate(-15deg)"},

        {transform:"scale(1) rotate(0deg)"}

    ],{

        duration:600,

        easing:"ease"

    });

}

const oldDoor=toggleDoor;

toggleDoor=function(){

    oldDoor();

    animateDoor();

};

// ==============================
// LIGHT ANIMATION
// ==============================

const lightHotspot=document.querySelector(".lightHotspot");

function animateLight(){

    if(!lightHotspot) return;

    lightHotspot.animate([

        {transform:"scale(1)"},

        {transform:"scale(1.35)"},

        {transform:"scale(1)"}

    ],{

        duration:500

    });

}

const oldLight=toggleLight;

toggleLight=function(){

    oldLight();

    animateLight();

    if(state.lights){

        document.body.classList.add("lightsGlow");

    }

    else{

        document.body.classList.remove("lightsGlow");

    }

};

// ==============================
// CAMERA FLASH
// ==============================

const camera=document.querySelector(".cameraWindow");

setInterval(()=>{

    if(!camera) return;

    camera.animate([

        {opacity:1},

        {opacity:.55},

        {opacity:1}

    ],{

        duration:1200

    });

},2500);

// ==============================
// WATER ANIMATION
// ==============================

const waterHotspot=document.querySelector(".waterHotspot");

setInterval(()=>{

    if(!waterHotspot) return;

    waterHotspot.animate([

        {transform:"translateY(0px)"},

        {transform:"translateY(-6px)"},

        {transform:"translateY(0px)"}

    ],{

        duration:900

    });

},1800);

// ==============================
// SOLAR PANEL
// ==============================

const solar=document.querySelector(".solarHotspot");

setInterval(()=>{

    if(!solar) return;

    solar.style.transform=

    `rotate(${Date.now()/70%360}deg)`;

},30);

// ==============================
// HOUSE FLOATING
// ==============================

if(houseImage){

    houseImage.animate([

        {transform:"translateY(0px)"},

        {transform:"translateY(-12px)"},

        {transform:"translateY(0px)"}

    ],{

        duration:3500,

        iterations:Infinity

    });

}

// ==============================
// STATUS COLORS
// ==============================

setInterval(()=>{

    if(state.water<40){

        document.getElementById("water").style.color="#ff5555";

    }

    else{

        document.getElementById("water").style.color="#00e5ff";

    }

    if(state.power>3){

        document.getElementById("power").style.color="#ffb000";

    }

    else{

        document.getElementById("power").style.color="#00ff88";

    }

},2000);

// ==============================
// CAMERA SCAN LINE
// ==============================

const scan=document.querySelector(".scanLine");

if(scan){

    setInterval(()=>{

        scan.animate([

            {top:"0%"},

            {top:"90%"}

        ],{

            duration:2000

        });

    },2000);

}

// ==============================
// AI BOOT MESSAGE
// ==============================


// ==========================================================
// PART 2A3
// ADVANCED SMART HOME AUTOMATION
// ==========================================================

// ==============================
// AUTO DAY / NIGHT MODE
// ==============================

function updateDayNight(){

    const hour=new Date().getHours();

    if(hour>=18 || hour<6){

        document.body.classList.add("night");

    }else{

        document.body.classList.remove("night");

    }

}

updateDayNight();

setInterval(updateDayNight,60000);

// ==============================
// AUTO LIGHTS
// ==============================

setInterval(()=>{

    const hour=new Date().getHours();

    if(hour>=19 && !state.lights){

        toggleLight();

        showNotification("🌙 AIVA turned ON the lights.");

    }

    if(hour>=7 && hour<18 && state.lights){

        toggleLight();

        showNotification("☀️ AIVA turned OFF the lights.");

    }

},60000);

// ==============================
// WATER WARNING
// ==============================

function checkWaterLevel(){

    if(state.water<=25){

        showNotification("💧 Warning: Water Tank is Low!");

    }

}

setInterval(checkWaterLevel,10000);

// ==============================
// HIGH POWER WARNING
// ==============================

function checkPowerUsage(){

    if(state.power>=3){

        showNotification("⚡ High Power Consumption Detected!");

    }

}

setInterval(checkPowerUsage,12000);

// ==============================
// SYSTEM HEALTH
// ==============================

const systemHealth=document.getElementById("systemHealth");

function updateSystemHealth(){

    if(!systemHealth) return;

    let value=99+Math.random();

    systemHealth.innerHTML=value.toFixed(1)+"% Healthy";

}

updateSystemHealth();

setInterval(updateSystemHealth,5000);

// ==============================
// HOTSPOT HOVER EFFECT
// ==============================

document.querySelectorAll(".hotspot").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="scale(1.2)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="scale(1)";

    });

});

// ==============================
// LIVE STATUS BAR
// ==============================

document.querySelectorAll(".status span").forEach(status=>{

    setInterval(()=>{

        status.style.opacity="0.5";

        setTimeout(()=>{

            status.style.opacity="1";

        },500);

    },3000);

});

// ==============================
// RANDOM SMART HOME EVENTS
// ==============================

const smartEvents=[

    "📹 Camera completed a security scan.",

    "🛡 Security system is functioning normally.",

    "🌤 Weather synchronized successfully.",

    "💡 Smart lighting optimized energy usage.",

    "⚡ Solar panel efficiency updated.",

    "💧 Water tank levels synchronized.",

    "🤖 AIVA performed a routine system check."

];

setInterval(()=>{

    if(state.loggedIn){

        showNotification(

            smartEvents[

                Math.floor(

                    Math.random()*smartEvents.length

                )

            ]

        );

    }

},45000);

// ==============================
// BOOT SEQUENCE
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showNotification("🤖 AIVA Online");

    },3000);

    setTimeout(()=>{

        showNotification("🏠 Smart Home Connected");

    },5000);

    setTimeout(()=>{

        showNotification("🛡 Security System Active");

    },7000);

});

// ==========================================================
// PART 2B1
// AIVA PRO - SMART AI
// ==========================================================

// ==============================
// AI MEMORY
// ==============================

let aiMemory=[];

// ==============================
// AI TYPING EFFECT
// ==============================

function addAIMessage(text){

    if(!app.chat) return;

    const typing=document.createElement("div");

    typing.className="aiMessage";

    typing.innerHTML="🤖 Typing...";

    app.chat.appendChild(typing);

    app.chat.scrollTop=app.chat.scrollHeight;

    setTimeout(()=>{

        typing.innerHTML=text;

        app.chat.scrollTop=app.chat.scrollHeight;

    },800);

}

// ==============================
// USER MESSAGE
// ==============================

function addUserMessage(text){

    const user=document.createElement("div");

    user.className="userMessage";

    user.innerHTML=text;

    app.chat.appendChild(user);

    app.chat.scrollTop=app.chat.scrollHeight;

}

// ==============================
// SMART AI RESPONSE
// ==============================

function getAIResponse(message){

    const text=message.toLowerCase();

    aiMemory.push(text);

    // Greetings
    if(text.includes("hi") || text.includes("hello")){

        return "👋 Hello! I'm AIVA. How can I help you today?";

    }

    // Name
    if(text.includes("your name")){

        return "🤖 My name is AIVA. I manage your Smart Home.";

    }

    // Weather
    if(text.includes("weather")){

        fetchWeather();

        return "🌤 I've updated the live weather.";

    }

    // Door
    if(text.includes("door")){

        toggleDoor();

        return state.doorLocked
        ? "🚪 Door has been locked."
        : "🚪 Door has been unlocked.";

    }

    // Lights
    if(text.includes("light")){

        toggleLight();

        return state.lights
        ? "💡 Lights are now ON."
        : "💡 Lights are now OFF.";

    }

    // Temperature
    if(text.includes("temperature")){

        return "🌡 Indoor temperature is " +
        app.indoorTemp.textContent;

    }

    // Water
    if(text.includes("water")){

        return "💧 Water Tank: " +
        app.water.textContent;

    }

    // Power
    if(text.includes("power")){

        return "⚡ Current Power Usage: " +
        app.power.textContent;

    }

    // Camera
    if(text.includes("camera")){

        return "📹 Security Camera is monitoring the house.";

    }

    // Fire
    if(text.includes("fire")){

        return "🔥 Fire Detection System is active.";

    }

    // Time
    if(text.includes("time")){

        return "🕒 " +
        new Date().toLocaleTimeString();

    }

    // Date
    if(text.includes("date")){

        return "📅 " +
        new Date().toDateString();

    }

    // Thanks
    if(text.includes("thank")){

        return "😊 You're welcome!";

    }

    // Bye
    if(text.includes("bye")){

        return "👋 Goodbye! Have a great day.";

    }

    return "🤖 Sorry, I don't understand that yet. Try asking about weather, lights, door, power, water, temperature, camera, date or time.";

}

// ==============================
// NEW sendAI()
// ==============================

function sendAI(){

    if(!app.aiInput || !app.chat) return;

    const message=app.aiInput.value.trim();

    if(message==="") return;

    addUserMessage(message);

    app.aiInput.value="";

    const reply=getAIResponse(message);

    addAIMessage(reply);

    // Voice Response
    if("speechSynthesis" in window){

        speechSynthesis.cancel();

        const speech=new SpeechSynthesisUtterance(reply);

        speech.rate=1;

        speech.pitch=1;

        speechSynthesis.speak(speech);

    }

}

// ==========================================================
// PART 2B2
// AIVA PRO MAX
// ==========================================================

// ==============================
// SMART COMMANDS
// ==============================

function executeCommand(text){

    text=text.toLowerCase();

    // Multi Command

    if(text.includes("lights") && text.includes("door")){

        toggleLight();

        toggleDoor();

        return "💡 Lights updated and 🚪 Door status changed.";

    }

    if(text.includes("emergency")){

        emergency();

        return "🚨 Emergency Mode Activated.";

    }

    if(text.includes("lock")){

        if(!state.doorLocked){

            toggleDoor();

        }

        return "🚪 Door Locked.";

    }

    if(text.includes("unlock")){

        if(state.doorLocked){

            toggleDoor();

        }

        return "🚪 Door Unlocked.";

    }

    if(text.includes("turn on lights")){

        if(!state.lights){

            toggleLight();

        }

        return "💡 Lights Turned ON.";

    }

    if(text.includes("turn off lights")){

        if(state.lights){

            toggleLight();

        }

        return "💡 Lights Turned OFF.";

    }

    return null;

}

// ==============================
// SMART HOME SUMMARY
// ==============================

function homeSummary(){

    return `
🏠 Home Summary

🌡 Temperature : ${app.indoorTemp.textContent}

⚡ Power : ${app.power.textContent}

💧 Water : ${app.water.textContent}

🚪 Door : ${state.doorLocked ? "Locked" : "Unlocked"}

💡 Lights : ${state.lights ? "ON" : "OFF"}

🛡 Security : Active
`;

}

// ==============================
// UPGRADE AI RESPONSE
// ==============================

const oldAI=getAIResponse;

getAIResponse=function(message){

    const command=executeCommand(message);

    if(command){

        return command;

    }

    const text=message.toLowerCase();

    if(text.includes("status")){

        return homeSummary();

    }

    if(text.includes("everything")){

        return homeSummary();

    }

    if(text.includes("summary")){

        return homeSummary();

    }

    if(text.includes("how are you")){

        return "😊 I'm functioning perfectly and monitoring your Smart Home.";

    }

    if(text.includes("good morning")){

        return "☀️ Good Morning! All Smart Home systems are online.";

    }

    if(text.includes("good night")){

        return "🌙 Good Night! Your home has been secured.";

    }

    if(text.includes("who made you")){

        return "🤖 I was created for the Smart Home & AI Automation project.";

    }

    if(text.includes("help")){

        return `I can help with:

💡 Lights
🚪 Door
🌤 Weather
🌡 Temperature
⚡ Power
💧 Water
📹 Camera
🛡 Security
📊 Status
🕒 Time
📅 Date`;

    }

    return oldAI(message);

};

// ==============================
// WELCOME MESSAGE
// ==============================

window.addEventListener("load",()=>{

    if(!app.chat) return;

    setTimeout(()=>{

        addAIMessage(

            "👋 Hello! I'm AIVA Pro. Ask me about your Smart Home."

        );

    },3000);

});

// ==============================
// RANDOM AI FACTS
// ==============================

const aiFacts=[

"💡 Tip: LED lights save up to 80% more energy.",

"⚡ Solar energy can reduce electricity bills.",

"💧 Smart water monitoring prevents wastage.",

"🛡 Smart locks improve home security.",

"🌤 Weather automation helps save energy."

];

setInterval(()=>{

    if(state.loggedIn){

        addAIMessage(

            aiFacts[

                Math.floor(

                    Math.random()*aiFacts.length

                )

            ]

        );

       // ==========================================================
// PART 2C1
// ADVANCED VOICE COMMANDS
// ==========================================================

// ==============================
// VOICE SUPPORT CHECK
// ==============================

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

// ==============================
// START VOICE
// ==============================

function startVoiceRecognition(){

    if(!SpeechRecognition){

        alert("Voice Recognition is not supported.");

        return;

    }

    const recognition=new SpeechRecognition();

    recognition.lang="en-US";

    recognition.interimResults=false;

    recognition.maxAlternatives=1;

    showNotification("🎤 Listening...");

    recognition.start();

    recognition.onresult=function(event){

        const command=
        event.results[0][0].transcript;

        app.aiInput.value=command;

        processVoiceCommand(command);

    };

    recognition.onerror=function(){

        showNotification("❌ Voice Recognition Failed");

    };

}

// ==============================
// PROCESS COMMAND
// ==============================

function processVoiceCommand(command){

    command=command.toLowerCase();

    addUserMessage("🎤 "+command);

    // Lights

    if(command.includes("turn on lights")){

        if(!state.lights){

            toggleLight();

        }

        addAIMessage("💡 Lights turned ON.");

        return;

    }

    if(command.includes("turn off lights")){

        if(state.lights){

            toggleLight();

        }

        addAIMessage("💡 Lights turned OFF.");

        return;

    }

    // Door

    if(command.includes("lock door")){

        if(!state.doorLocked){

            toggleDoor();

        }

        addAIMessage("🚪 Door Locked.");

        return;

    }

    if(command.includes("unlock door")){

        if(state.doorLocked){

            toggleDoor();

        }

        addAIMessage("🚪 Door Unlocked.");

        return;

    }

    // Weather

    if(command.includes("weather")){

        fetchWeather();

        addAIMessage("🌤 Updating Weather.");

        return;

    }

    // Temperature

    if(command.includes("temperature")){

        addAIMessage(

            "🌡 Temperature is "+

            app.indoorTemp.textContent

        );

        return;

    }

    // Power

    if(command.includes("power")){

        addAIMessage(

            "⚡ Power Usage is "+

            app.power.textContent

        );

        return;

    }

    // Water

    if(command.includes("water")){

        addAIMessage(

            "💧 Water Tank is "+

            app.water.textContent

        );

        return;

    }

    // Summary

    if(command.includes("status")){

        addAIMessage(homeSummary());

        return;

    }

    // Emergency

    if(command.includes("emergency")){

        emergency();

        addAIMessage("🚨 Emergency Mode Activated.");

        return;

    }

    // Default

    sendAI();

}

// ==============================
// VOICE BUTTON ANIMATION
// ==============================

const micButton=
document.querySelector(".fa-microphone")?.parentElement;

if(micButton){

    micButton.addEventListener("click",()=>{

        micButton.classList.add("recording");

        setTimeout(()=>{

            micButton.classList.remove("recording");

        },4000);

    });

}

// ==============================
// SPEAK AI
// ==============================

function speak(text){

    if(!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();

    const voice=
    new SpeechSynthesisUtterance(text);

    voice.rate=1;

    voice.pitch=1;

    voice.volume=1;

    speechSynthesis.speak(voice);

}

       // ==========================================================
// PART 2C2
// AIVA VOICE PRO
// ==========================================================

// ==============================
// WAKE WORDS
// ==============================

const wakeWords=[

    "hey aiva",

    "ok aiva",

    "hello aiva",

    "aiva"

];

// ==============================
// NATURAL LANGUAGE
// ==============================

function normalizeVoice(command){

    command=command.toLowerCase();

    wakeWords.forEach(word=>{

        command=command.replace(word,"");

    });

    return command.trim();

}

// ==============================
// ADVANCED VOICE PROCESSOR
// ==============================

const oldProcessVoice=processVoiceCommand;

processVoiceCommand=function(command){

    command=normalizeVoice(command);

    // Stop Speaking

    if(command.includes("stop talking") ||

       command.includes("stop speaking") ||

       command.includes("be quiet")){

        speechSynthesis.cancel();

        addAIMessage("🔇 Voice stopped.");

        return;

    }

    // Multiple Commands

    if(command.includes("and")){

        const commands=command.split("and");

        commands.forEach(c=>{

            oldProcessVoice(c.trim());

        });

        return;

    }

    // Home Summary

    if(command.includes("how is my home")){

        addAIMessage(homeSummary());

        speak(homeSummary());

        return;

    }

    // Good Morning

    if(command.includes("good morning")){

        const msg="☀️ Good Morning! All Smart Home systems are online.";

        addAIMessage(msg);

        speak(msg);

        return;

    }

    // Good Night

    if(command.includes("good night")){

        const msg="🌙 Good Night! Security has been activated.";

        addAIMessage(msg);

        speak(msg);

        return;

    }

    // Who are you?

    if(command.includes("who are you")){

        const msg="🤖 I am AIVA, your Smart Home AI Assistant.";

        addAIMessage(msg);

        speak(msg);

        return;

    }

    // Help

    if(command.includes("help")){

        const msg=

`You can ask me:

💡 Turn on lights

🚪 Unlock door

🌤 Weather

🌡 Temperature

⚡ Power

💧 Water

📊 Home Status

🚨 Emergency`;

        addAIMessage(msg);

        speak("I have displayed the available commands.");

        return;

    }

    oldProcessVoice(command);

};

// ==============================
// GREETING
// ==============================

window.addEventListener("load",()=>{

    if(!state.loggedIn) return;

    setTimeout(()=>{

        speak("AIVA Voice System Ready");

    },3500);

});

// ==============================
// VOICE FEEDBACK
// ==============================

document.querySelectorAll(".assistantInput button").forEach(btn=>{

    btn.addEventListener("click",()=>{

        btn.animate([

            {transform:"scale(1)"},

            {transform:"scale(1.2)"},

            {transform:"scale(1)"}

        ],{

            duration:300

        });

    });

});

       // ==========================================================
// PART 2D
// LIVE ANALYTICS & SMART DASHBOARD
// ==========================================================

// ==============================
// CHART DATA
// ==============================

let powerData=[2.0,2.1,1.9,2.3,2.2,2.0,2.1];
let waterData=[82,81,80,79,78,77,76];
let labels=["1","2","3","4","5","6","7"];

// ==============================
// CREATE ADVANCED CHARTS
// ==============================

function createCharts(){

    if(typeof Chart==="undefined") return;

    if(window.powerChart){
        powerChart.destroy();
    }

    if(window.waterChart){
        waterChart.destroy();
    }

    // POWER CHART
    const powerCanvas=document.getElementById("powerChart");

    if(powerCanvas){

        window.powerChart=new Chart(powerCanvas,{

            type:"line",

            data:{
                labels:labels,
                datasets:[{
                    label:"Power (kWh)",
                    data:powerData,
                    borderColor:"#00e5ff",
                    backgroundColor:"rgba(0,229,255,.15)",
                    fill:true,
                    tension:.4
                }]
            },

            options:{
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        labels:{
                            color:"#ffffff"
                        }
                    }
                },
                scales:{
                    x:{
                        ticks:{color:"#ffffff"}
                    },
                    y:{
                        ticks:{color:"#ffffff"}
                    }
                }

            }

        });

    }

    // WATER CHART
    const waterCanvas=document.getElementById("waterChart");

    if(waterCanvas){

        window.waterChart=new Chart(waterCanvas,{

            type:"bar",

            data:{
                labels:labels,
                datasets:[{
                    label:"Water %",
                    data:waterData,
                    backgroundColor:"#4fc3f7"
                }]
            },

            options:{
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        labels:{
                            color:"#ffffff"
                        }
                    }
                },
                scales:{
                    x:{
                        ticks:{color:"#ffffff"}
                    },
                    y:{
                        ticks:{color:"#ffffff"}
                    }
                }
            }

        });

    }

}

// ==============================
// LIVE CHART UPDATES
// ==============================

setInterval(()=>{

    powerData.push(Number(state.power));

    powerData.shift();

    waterData.push(Number(state.water));

    waterData.shift();

    if(window.powerChart){

        powerChart.data.datasets[0].data=powerData;

        powerChart.update();

    }

    if(window.waterChart){

        waterChart.data.datasets[0].data=waterData;

        waterChart.update();

    }

},5000);

// ==============================
// ENERGY PREDICTION
// ==============================

function predictEnergy(){

    const avg=

    powerData.reduce((a,b)=>a+b,0)/powerData.length;

    if(avg<2){

        return "Excellent";

    }

    if(avg<3){

        return "Normal";

    }

    return "High Usage";

}

// ==============================
// UPDATE ANALYTICS
// ==============================

setInterval(()=>{

    const status=document.getElementById("powerStatus");

    if(status){

        status.innerHTML=

        "Prediction: "+predictEnergy();

    }

},5000);

// ==============================
// LIVE COUNTERS
// ==============================

function animateNumber(id,value,suffix=""){

    const element=document.getElementById(id);

    if(!element) return;

    element.textContent=value+suffix;

}

// ==============================
// DASHBOARD REFRESH
// ==============================

const oldDashboardUpdate=updateDashboard;

updateDashboard=function(){

    oldDashboardUpdate();

    animateNumber(

        "indoorTemp",

        state.temperature,

        "°C"

    );

    animateNumber(

        "power",

        state.power,

        " kWh"

    );

    animateNumber(

        "water",

        state.water,

        "%"

    );

};

// ==============================
// START ANALYTICS
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        createCharts();

    },1000);

});

       // ==========================================================
// PART 2E
// PREMIUM EFFECTS & PRESENTATION MODE
// ==========================================================

// ==============================
// LIVE CLOCK ANIMATION
// ==============================

setInterval(()=>{

    if(app.clock){

        app.clock.animate([
            {transform:"scale(1)"},
            {transform:"scale(1.08)"},
            {transform:"scale(1)"}
        ],{
            duration:500
        });

    }

},1000);

// ==============================
// CARD HOVER EFFECT
// ==============================

document.querySelectorAll(".glassCard").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-8px) scale(1.02)";
        card.style.boxShadow="0 0 35px rgba(0,255,255,.35)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="";
        card.style.boxShadow="";

    });

});

// ==============================
// HOTSPOT PULSE
// ==============================

document.querySelectorAll(".hotspot").forEach(btn=>{

    setInterval(()=>{

        btn.animate([
            {transform:"scale(1)"},
            {transform:"scale(1.15)"},
            {transform:"scale(1)"}
        ],{
            duration:1200
        });

    },4000);

});

// ==============================
// PRESENTATION MODE
// ==============================

let presentationMode=false;

function togglePresentationMode(){

    presentationMode=!presentationMode;

    if(presentationMode){

        showNotification("🎬 Presentation Mode Enabled");

        autoDemo();

    }else{

        showNotification("Presentation Mode Disabled");

    }

}

function autoDemo(){

    if(!presentationMode) return;

    toggleLight();

    setTimeout(toggleDoor,2000);
    setTimeout(fetchWeather,4000);
    setTimeout(()=>showNotification("🤖 AIVA completed a demo sequence."),6000);

    setTimeout(autoDemo,12000);

}

// ==============================
// KEYBOARD SHORTCUT
// Press P
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.key.toLowerCase()==="p"){

        togglePresentationMode();

    }

});

// ==============================
// LOGIN CELEBRATION
// ==============================

function celebrateLogin(){

    showNotification("🎉 Welcome to Smart Home!");

    document.body.animate([
        {opacity:.7},
        {opacity:1}
    ],{
        duration:800
    });

}

// Replace initializeDashboard
const oldInit=initializeDashboard;

initializeDashboard=function(){

    oldInit();

    celebrateLogin();

};

// ==============================
// CAMERA RANDOM ALERT
// ==============================

setInterval(()=>{

    if(!state.loggedIn) return;

    if(Math.random()<0.15){

        showNotification("📹 Motion detected near the entrance.");

    }

},30000);

// ==============================
// AIVA DAILY TIP
// ==============================

const premiumTips=[

"💡 Turn off unused lights to save energy.",

"🌡 Maintain 24–26°C for better efficiency.",

"💧 Check water levels regularly.",

"🔒 Keep your smart lock updated.",

"⚡ Monitor peak-hour electricity usage."

];

setInterval(()=>{

    if(state.loggedIn){

        addAIMessage(

            premiumTips[

                Math.floor(Math.random()*premiumTips.length)

            ]

        );

    }

},90000);

// ==============================
// FINAL SYSTEM CHECK
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showNotification("✅ All Smart Home Systems Ready");

    },3500);

});

       // ==========================================================
// PART 2E2
// ULTIMATE PREMIUM EFFECTS
// ==========================================================

// ==============================
// LIVE BACKGROUND COLORS
// ==============================

const colors=[

"#00e5ff",

"#00ffb3",

"#4facfe",

"#8a2be2"

];

let colorIndex=0;

setInterval(()=>{

    document.documentElement.style.setProperty(

        "--accent",

        colors[colorIndex]

    );

    colorIndex++;

    if(colorIndex>=colors.length){

        colorIndex=0;

    }

},8000);

// ==============================
// CARD GLOW
// ==============================

document.querySelectorAll(".glassCard").forEach(card=>{

    setInterval(()=>{

        card.animate([

            {

                boxShadow:"0 0 15px rgba(0,229,255,.25)"

            },

            {

                boxShadow:"0 0 35px rgba(0,229,255,.55)"

            },

            {

                boxShadow:"0 0 15px rgba(0,229,255,.25)"

            }

        ],{

            duration:2500

        });

    },3000);

});

// ==============================
// RANDOM SYSTEM MESSAGES
// ==============================

const systemMessages=[

"🤖 AI Optimization Complete",

"⚡ Energy Consumption Balanced",

"🛡 Security Scan Successful",

"🌤 Weather Synced",

"📡 IoT Devices Connected",

"💧 Water System Healthy"

];

setInterval(()=>{

    if(state.loggedIn){

        showNotification(

            systemMessages[

                Math.floor(

                    Math.random()*

                    systemMessages.length

                )

            ]

        );

    }

},60000);

// ==============================
// LIVE STATUS DOTS
// ==============================

document.querySelectorAll(".status span").forEach(dot=>{

    setInterval(()=>{

        dot.animate([

            {opacity:1},

            {opacity:.35},

            {opacity:1}

        ],{

            duration:1200

        });

    },2500);

});

// ==============================
// SMART HOUSE FLOAT
// ==============================

const house=document.querySelector(".houseImage");

if(house){

    house.animate([

        {

            transform:"translateY(0px)"

        },

        {

            transform:"translateY(-10px)"

        },

        {

            transform:"translateY(0px)"

        }

    ],{

        duration:5000,

        iterations:Infinity

    });

}

// ==============================
// AIVA AUTO GREETING
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        if(state.loggedIn){

            addAIMessage(

                "🤖 Welcome back! All Smart Home systems are operating normally."

            );

        }

    },4500);

});

// ==============================
// PERFORMANCE MONITOR
// ==============================

setInterval(()=>{

    console.log(

        "System Running |",

        new Date().toLocaleTimeString()

    );

},30000);

// ==============================
// FINAL PRESENTATION MESSAGE
// ==============================

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showNotification(

            "🏆 Smart Home & AI Automation Ready for Presentation"

        );

    },6000);

});

    }

},120000);

