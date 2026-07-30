/* ==========================================================
   SMART HOME & AI AUTOMATION
   Version 4.0
   PART 1A1
   CORE ENGINE
==========================================================*/

"use strict";

/* ==========================================================
   DOM ELEMENTS
==========================================================*/
const PASSWORDS = {
    "House 1":"1234",
    "House 2":"2345",
    "House 3":"3456",
    "House 4":"4567",
    "House 5":"5678"
};
function login() {
    const house = document.getElementById("houseSelect").value;
    const password = document.getElementById("password").value.trim();
    const error = document.getElementById("error");

    if (password === PASSWORDS[house]) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        error.textContent = "";
    } else {
        error.textContent = "❌ Incorrect Password";
    }
}
console.log("JS.WORKING"); 
const app = {

    // Loader
    loader: document.getElementById("loader"),

    // Login
    loginPage: document.getElementById("loginPage"),
    dashboard: document.getElementById("dashboard"),

    houseSelect: document.getElementById("houseSelect"),
    password: document.getElementById("password"),
    unlockButton: document.getElementById("unlockButton"),
    togglePassword: document.getElementById("togglePassword"),
    error: document.getElementById("error"),

    // Header
    greeting: document.getElementById("greeting"),
    clock: document.getElementById("clock"),
    liveDate: document.getElementById("liveDate"),

    // Weather
    temperature: document.getElementById("temperature"),
    humidity: document.getElementById("humidity"),
    windSpeed: document.getElementById("windSpeed"),
    weatherCondition: document.getElementById("weatherCondition"),

    // Indoor
    indoorTemp: document.getElementById("indoorTemp"),

    // Power
    power: document.getElementById("power"),
    powerFill: document.getElementById("powerFill"),
    powerStatus: document.getElementById("powerStatus"),

    // Water
    water: document.getElementById("water"),
    waterFill: document.getElementById("waterFill"),
    waterStatus: document.getElementById("waterStatus"),

    // Devices
    doorStatus: document.getElementById("doorStatus"),
    lightStatus: document.getElementById("lightStatus"),
    fireStatus: document.getElementById("fireStatus"),
    systemHealth: document.getElementById("systemHealth"),

    // AI
    chat: document.getElementById("chat"),
    aiInput: document.getElementById("aiInput"),

    // Settings
    settingsModal: document.getElementById("settingsModal"),
    darkSwitch: document.getElementById("darkSwitch"),

    // Notifications
    notificationArea: document.getElementById("notificationArea")

};

/* ==========================================================
   APP STATE
==========================================================*/

const state={

    loggedIn:false,

    currentHouse:"",

    weather:null,

    temperature:27,

    humidity:58,

    wind:9,

    power:2.1,

    water:82,

    lights:false,

    doorLocked:true,

    emergency:false,

    darkMode:false

};

/* ==========================================================
   PASSWORD DATABASE
==========================================================*/




/* ==========================================================
   START APPLICATION
==========================================================*/

document.addEventListener("DOMContentLoaded",initializeApp);

function initializeApp(){

    initializeLoader();

    initializeClock();

    initializeGreeting();

    initializePasswordToggle();

    initializeKeyboard();

    initializeDarkMode();

    checkSavedLogin();

    console.log("Smart Home Engine Loaded");

}

/* ==========================================================
   LOADER
==========================================================*/

function initializeLoader(){

    if(!app.loader) return;

    window.addEventListener("load",()=>{

        setTimeout(()=>{

            app.loader.style.opacity="0";

            setTimeout(()=>{

                app.loader.style.display="none";

            },700);

        },2000);

    });

}

/* ==========================================================
   LOGIN
==========================================================*/

function login(){

    const house=app.houseSelect.value;

    const password=app.password.value.trim();

    if(password===PASSWORDS[house]){

        state.loggedIn=true;

        state.currentHouse=house;

        localStorage.setItem("loggedIn","true");

        localStorage.setItem("house",house);

        app.loginPage.style.display="none";

        app.dashboard.style.display="block";

        initializeDashboard();

        showNotification("🏠 Welcome Home");

        return;

    }

    app.error.textContent="Incorrect Password";

    app.password.value="";

    shake(app.password);

}

/* ==========================================================
   AUTO LOGIN
==========================================================*/

function checkSavedLogin(){

    if(localStorage.getItem("loggedIn")!=="true") return;

    state.loggedIn=true;

    state.currentHouse=localStorage.getItem("house");

    app.loginPage.style.display="none";

    app.dashboard.style.display="block";

    initializeDashboard();

}

/* ==========================================================
   LOGOUT
==========================================================*/

function logout(){

    localStorage.clear();

    location.reload();

}

/* ==========================================================
   PASSWORD TOGGLE
==========================================================*/

function initializePasswordToggle(){

    if(!app.togglePassword) return;

    app.togglePassword.onclick=function(){

        if(app.password.type==="password"){

            app.password.type="text";

            this.innerHTML="<i class='fa-solid fa-eye-slash'></i>";

        }

        else{

            app.password.type="password";

            this.innerHTML="<i class='fa-solid fa-eye'></i>";

        }

    };

}

/* ==========================================================
   ENTER KEY LOGIN
==========================================================*/

function initializeKeyboard(){

    app.password.addEventListener("keydown",e=>{

        if(e.key==="Enter"){

            login();

        }

    });

}

/* ==========================================================
   PLACEHOLDERS
   (Completed in Part 1A2)
==========================================================*/

function initializeDashboard(){}

function initializeClock(){}

function initializeGreeting(){}

function initializeDarkMode(){}

function showNotification(message){}

function shake(element){}

/* ==========================================================
   PART 1A2
   DASHBOARD INITIALIZATION
==========================================================*/

/* ==========================================================
   DASHBOARD STARTUP
==========================================================*/

function initializeDashboard(){

    initializeClock();

    initializeGreeting();

    updateDashboard();

    setInterval(updateClock,1000);

    setInterval(updateGreeting,60000);

    setInterval(updateDashboard,3000);

    showNotification("✅ Dashboard Connected");

}

/* ==========================================================
   CLOCK
==========================================================*/

function initializeClock(){

    updateClock();

    updateDate();

}

function updateClock(){

    if(!app.clock) return;

    const now=new Date();

    app.clock.innerHTML=now.toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    });

}

function updateDate(){

    if(!app.liveDate) return;

    const now=new Date();

    app.liveDate.innerHTML=

    now.toLocaleDateString("en-US",{

        weekday:"long",

        month:"long",

        day:"numeric",

        year:"numeric"

    });

}

/* ==========================================================
   GREETING
==========================================================*/

function initializeGreeting(){

    updateGreeting();

}

function updateGreeting(){

    if(!app.greeting) return;

    const hour=new Date().getHours();

    let greeting="";

    if(hour<12){

        greeting="☀️ Good Morning";

    }

    else if(hour<17){

        greeting="🌤 Good Afternoon";

    }

    else{

        greeting="🌙 Good Evening";

    }

    app.greeting.innerHTML=

    greeting+

    " • "+

    state.currentHouse;

}

/* ==========================================================
   DARK MODE
==========================================================*/

function initializeDarkMode(){

    if(!app.darkSwitch) return;

    const saved=

    localStorage.getItem("darkMode");

    if(saved==="true"){

        document.body.classList.add("night");

        app.darkSwitch.checked=true;

    }

    app.darkSwitch.addEventListener("change",()=>{

        document.body.classList.toggle("night");

        localStorage.setItem(

            "darkMode",

            document.body.classList.contains("night")

        );

    });

}

/* ==========================================================
   SETTINGS
==========================================================*/

function openSettings(){

    if(!app.settingsModal) return;

    app.settingsModal.style.display="flex";

}

function closeSettings(){

    if(!app.settingsModal) return;

    app.settingsModal.style.display="none";

}

/* ==========================================================
   NOTIFICATIONS
==========================================================*/

function showNotification(message){

    const note=document.createElement("div");

    note.className="notification";

    note.innerHTML=message;

    document.body.appendChild(note);

    setTimeout(()=>{

        note.classList.add("show");

    },50);

    setTimeout(()=>{

        note.classList.remove("show");

        setTimeout(()=>{

            note.remove();

        },500);

    },3500);

}

/* ==========================================================
   SHAKE EFFECT
==========================================================*/

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

/* ==========================================================
   DASHBOARD UPDATE
==========================================================*/

function updateDashboard(){

    if(app.indoorTemp){

        app.indoorTemp.innerHTML=

        state.temperature.toFixed(1)+"°C";

    }

    if(app.power){

        app.power.innerHTML=

        state.power.toFixed(2)+" kWh";

    }

    if(app.water){

        app.water.innerHTML=

        Math.round(state.water)+"%";

    }

    if(app.doorStatus){

        app.doorStatus.innerHTML=

        state.doorLocked ?

        "🔒 Locked"

        :

        "🔓 Unlocked";

    }

    if(app.lightStatus){

        app.lightStatus.innerHTML=

        state.lights ?

        "ON"

        :

        "OFF";

    }

    if(app.systemHealth){

        app.systemHealth.innerHTML=

        "99.9%";

    }

}

/* ==========================================================
   PART 1A3
   SMART DEVICES & LIVE SENSOR ENGINE
==========================================================*/

/* ==========================================================
   DOOR CONTROL
==========================================================*/

function toggleDoor(){

    state.doorLocked=!state.doorLocked;

    if(app.doorStatus){

        app.doorStatus.innerHTML=
        state.doorLocked ?
        "🔒 Locked" :
        "🔓 Unlocked";

    }

    showNotification(

        state.doorLocked ?

        "🚪 Door Locked"

        :

        "🚪 Door Unlocked"

    );

}

/* ==========================================================
   LIGHT CONTROL
==========================================================*/

function toggleLight(){

    state.lights=!state.lights;

    if(app.lightStatus){

        app.lightStatus.innerHTML=

        state.lights ?

        "ON"

        :

        "OFF";

    }

    showNotification(

        state.lights ?

        "💡 Lights Turned ON"

        :

        "💡 Lights Turned OFF"

    );

}

/* ==========================================================
   FIRE SYSTEM
==========================================================*/

function emergency(){

    state.emergency=!state.emergency;

    if(!app.fireStatus) return;

    if(state.emergency){

        app.fireStatus.innerHTML="🚨 EMERGENCY";

        app.fireStatus.style.color="#ff3b3b";

        showNotification("🚨 Emergency Mode Activated");

    }

    else{

        app.fireStatus.innerHTML="No Fire Detected";

        app.fireStatus.style.color="#00ff88";

        showNotification("✅ Emergency Cleared");

    }

}

/* ==========================================================
   SENSOR SIMULATION
==========================================================*/

function simulateSensors(){

    // Indoor Temperature

    state.temperature+=

    (Math.random()-0.5)*0.5;

    state.temperature=Math.max(

        22,

        Math.min(32,state.temperature)

    );

    // Power

    state.power+=

    (Math.random()-0.5)*0.2;

    state.power=Math.max(

        1.2,

        Math.min(4.5,state.power)

    );

    // Water

    state.water-=Math.random()*0.15;

    if(state.water<15){

        state.water=100;

        showNotification("💧 Water Tank Refilled");

    }

    updateDashboard();

}

setInterval(simulateSensors,4000);

/* ==========================================================
   PROGRESS BARS
==========================================================*/

function updateProgressBars(){

    if(app.powerFill){

        app.powerFill.style.width=

        (state.power/5*100)+"%";

    }

    if(app.waterFill){

        app.waterFill.style.width=

        state.water+"%";

    }

}

setInterval(updateProgressBars,1000);

/* ==========================================================
   STATUS TEXT
==========================================================*/

setInterval(()=>{

    if(app.powerStatus){

        if(state.power<2){

            app.powerStatus.innerHTML="Excellent";

        }

        else if(state.power<3){

            app.powerStatus.innerHTML="Normal";

        }

        else{

            app.powerStatus.innerHTML="High Usage";

        }

    }

    if(app.waterStatus){

        if(state.water>60){

            app.waterStatus.innerHTML="Normal";

        }

        else if(state.water>30){

            app.waterStatus.innerHTML="Moderate";

        }

        else{

            app.waterStatus.innerHTML="Low";

        }

    }

},3000);

/* ==========================================================
   LIVE SYSTEM HEALTH
==========================================================*/

setInterval(()=>{

    if(!app.systemHealth) return;

    const value=

    (99.4+Math.random()*0.5).toFixed(1);

    app.systemHealth.innerHTML=

    value+"%";

},5000);

/* ==========================================================
   QUICK SHORTCUTS
==========================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.key.toLowerCase()){

        case "l":

            toggleLight();

            break;

        case "d":

            toggleDoor();

            break;

        case "e":

            emergency();

            break;

    }

});

/* ==========================================================
   START ENGINE
==========================================================*/

simulateSensors();

updateProgressBars();

updateDashboard();

console.log("✅ Smart Device Engine Loaded");

/* ==========================================================
   PART 2A1.1
   LIVE WEATHER ENGINE
==========================================================*/

/* ==========================================================
   WEATHER ICONS
==========================================================*/

const WEATHER_CODES={

    0:{icon:"☀️",text:"Clear Sky"},
    1:{icon:"🌤",text:"Mainly Clear"},
    2:{icon:"⛅",text:"Partly Cloudy"},
    3:{icon:"☁️",text:"Cloudy"},
    45:{icon:"🌫",text:"Fog"},
    48:{icon:"🌫",text:"Fog"},
    51:{icon:"🌦",text:"Light Drizzle"},
    61:{icon:"🌧",text:"Rain"},
    63:{icon:"🌧",text:"Moderate Rain"},
    65:{icon:"🌧",text:"Heavy Rain"},
    71:{icon:"❄️",text:"Snow"},
    80:{icon:"🌦",text:"Rain Showers"},
    95:{icon:"⛈",text:"Thunderstorm"}

};

/* ==========================================================
   LOCATION
==========================================================*/

const DEFAULT_LOCATION={

    latitude:28.6139,

    longitude:77.2090,

    city:"New Delhi"

};

/* ==========================================================
   START WEATHER
==========================================================*/

function initializeWeather(){

    if(!navigator.geolocation){

        loadWeather(

            DEFAULT_LOCATION.latitude,

            DEFAULT_LOCATION.longitude

        );

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position=>{

            loadWeather(

                position.coords.latitude,

                position.coords.longitude

            );

        },

        ()=>{

            loadWeather(

                DEFAULT_LOCATION.latitude,

                DEFAULT_LOCATION.longitude

            );

        }

    );

}

/* ==========================================================
   LOAD WEATHER
==========================================================*/

async function loadWeather(latitude,longitude){

    try{

        const url=

        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

        const response=await fetch(url);

        const data=await response.json();

        updateWeather(data.current);

    }

    catch(error){

        console.error(error);

        showNotification("⚠ Unable to load weather.");

    }

}

/* ==========================================================
   UPDATE WEATHER
==========================================================*/

function updateWeather(current){

    if(!current) return;

    state.weather=current;

    const info=

    WEATHER_CODES[current.weather_code] ||

    {

        icon:"🌤",

        text:"Unknown"

    };

    if(app.temperature){

        app.temperature.innerHTML=

        `${info.icon} ${current.temperature_2m}°C`;

    }

    if(app.humidity){

        app.humidity.innerHTML=

        current.relative_humidity_2m+"%";

    }

    if(app.windSpeed){

        app.windSpeed.innerHTML=

        current.wind_speed_10m+" km/h";

    }

    if(app.weatherCondition){

        app.weatherCondition.innerHTML=

        info.text;

    }

    showNotification("🌤 Weather Updated");

}

/* ==========================================================
   AUTO REFRESH
==========================================================*/

initializeWeather();

setInterval(

    initializeWeather,

    600000

);

/* ==========================================================
   PART 2A1.2
   ADVANCED WEATHER SYSTEM
==========================================================*/

/* ==========================================================
   WEATHER THEMES
==========================================================*/

function applyWeatherTheme(code){

    const body=document.body;

    body.classList.remove(

        "weather-clear",
        "weather-cloudy",
        "weather-rain",
        "weather-storm",
        "weather-snow"

    );

    if(code===0){

        body.classList.add("weather-clear");

    }

    else if(code<=3){

        body.classList.add("weather-cloudy");

    }

    else if(code>=61 && code<=82){

        body.classList.add("weather-rain");

    }

    else if(code>=95){

        body.classList.add("weather-storm");

    }

    else if(code>=71 && code<=77){

        body.classList.add("weather-snow");

    }

}

/* ==========================================================
   WEATHER QUALITY
==========================================================*/

function weatherMessage(temp){

    if(temp<=10){

        return "🥶 Very Cold";

    }

    if(temp<=20){

        return "😊 Pleasant";

    }

    if(temp<=30){

        return "☀ Comfortable";

    }

    return "🥵 Hot";

}

/* ==========================================================
   UPDATE WEATHER CARD
==========================================================*/

function updateWeatherCard(current){

    if(!current) return;

    const info=

        WEATHER_CODES[current.weather_code] ||

        {

            icon:"🌤",

            text:"Unknown"

        };

    if(app.temperature){

        app.temperature.innerHTML=

            `${info.icon} ${current.temperature_2m}°C`;

    }

    if(app.humidity){

        app.humidity.innerHTML=

            current.relative_humidity_2m+"%";

    }

    if(app.windSpeed){

        app.windSpeed.innerHTML=

            current.wind_speed_10m+" km/h";

    }

    if(app.weatherCondition){

        app.weatherCondition.innerHTML=

            info.text+

            "<br><small>"+

            weatherMessage(current.temperature_2m)+

            "</small>";

    }

    applyWeatherTheme(current.weather_code);

}

/* ==========================================================
   CONNECTION CHECK
==========================================================*/

function monitorInternet(){

    window.addEventListener("online",()=>{

        showNotification("🌐 Internet Connected");

        initializeWeather();

    });

    window.addEventListener("offline",()=>{

        showNotification("📴 Internet Disconnected");

    });

}

monitorInternet();

/* ==========================================================
   WEATHER REFRESH BUTTON
==========================================================*/

function fetchWeather(){

    showNotification("🔄 Refreshing Weather...");

    initializeWeather();

}

/* ==========================================================
   WEATHER ANIMATION
==========================================================*/

setInterval(()=>{

    const card=document.querySelector(".weatherCard");

    if(!card) return;

    card.animate(

        [

            {

                transform:"translateY(0px)"

            },

            {

                transform:"translateY(-4px)"

            },

            {

                transform:"translateY(0px)"

            }

        ],

        {

            duration:2500

        }

    );

},6000);

/* ==========================================================
   WEATHER STATUS LOG
==========================================================*/

setInterval(()=>{

    if(state.weather){

        console.log(

            "Weather Updated:",

            state.weather.temperature_2m+"°C"

        );

    }

},60000);

/* ==========================================================
   PART 2A1.3
   PREMIUM WEATHER FEATURES
==========================================================*/

/* ==========================================================
   EXTRA WEATHER ELEMENTS
==========================================================*/

const weatherExtras={

    city:null,

    lastUpdated:null,

    feelsLike:null,

    pressure:null,

    sunrise:null,

    sunset:null

};

/* ==========================================================
   GET CITY NAME
==========================================================*/

async function getCityName(latitude,longitude){

    try{

        const response=await fetch(

        `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);

        const data=await response.json();

        weatherExtras.city=

        data.address.city ||

        data.address.town ||

        data.address.village ||

        "Unknown Location";

        updateCity();

    }

    catch{

        weatherExtras.city="Unknown";

    }

}

/* ==========================================================
   UPDATE CITY
==========================================================*/

function updateCity(){

    let city=document.getElementById("cityName");

    if(!city){

        city=document.createElement("p");

        city.id="cityName";

        city.style.marginTop="10px";

        city.style.fontWeight="600";

        city.style.opacity=".8";

        document

        .querySelector(".weatherCard")

        ?.appendChild(city);

    }

    city.innerHTML=

    "📍 "+weatherExtras.city;

}

/* ==========================================================
   LAST UPDATED
==========================================================*/

function updateWeatherTime(){

    weatherExtras.lastUpdated=

    new Date().toLocaleTimeString();

    let update=document.getElementById("weatherUpdate");

    if(!update){

        update=document.createElement("small");

        update.id="weatherUpdate";

        update.style.display="block";

        update.style.marginTop="8px";

        update.style.opacity=".7";

        document

        .querySelector(".weatherCard")

        ?.appendChild(update);

    }

    update.innerHTML=

    "Updated: "+weatherExtras.lastUpdated;

}

/* ==========================================================
   DAY / NIGHT MODE
==========================================================*/

function updateDayNight(){

    const hour=new Date().getHours();

    const icon=document.querySelector(".weatherIcon");

    if(!icon) return;

    if(hour>=6 && hour<18){

        icon.style.filter="brightness(1)";

    }

    else{

        icon.style.filter="brightness(.6)";

    }

}

/* ==========================================================
   WEATHER CARD ANIMATION
==========================================================*/

function animateWeatherCard(){

    const card=document.querySelector(".weatherCard");

    if(!card) return;

    card.animate([

        {

            transform:"translateY(0px)"

        },

        {

            transform:"translateY(-5px)"

        },

        {

            transform:"translateY(0px)"

        }

    ],{

        duration:3000

    });

}

/* ==========================================================
   WEATHER SUMMARY
==========================================================*/

function generateWeatherSummary(){

    if(!state.weather) return;

    const temp=

    state.weather.temperature_2m;

    let text="";

    if(temp<15){

        text="🥶 Wear warm clothes today.";

    }

    else if(temp<28){

        text="😊 Weather is comfortable.";

    }

    else{

        text="☀ Stay hydrated today.";

    }

    let summary=document.getElementById(

        "weatherSummary"

    );

    if(!summary){

        summary=document.createElement("p");

        summary.id="weatherSummary";

        summary.style.marginTop="12px";

        summary.style.fontSize=".9rem";

        document

        .querySelector(".weatherCard")

        ?.appendChild(summary);

    }

    summary.innerHTML=text;

}

/* ==========================================================
   WEATHER REFRESH
==========================================================*/

const oldWeather=updateWeather;

updateWeather=function(current){

    oldWeather(current);

    updateWeatherTime();

    updateDayNight();

    animateWeatherCard();

    generateWeatherSummary();

};

/* ==========================================================
   START PREMIUM WEATHER
==========================================================*/

navigator.geolocation.getCurrentPosition(

    pos=>{

        getCityName(

            pos.coords.latitude,

            pos.coords.longitude

        );

    },

    ()=>{

        weatherExtras.city="Unknown";

    }

);

setInterval(updateDayNight,60000);

/* ==========================================================
   PART 2A2
   SMART HOME INTELLIGENCE ENGINE
==========================================================*/

/* ==========================================================
   AI HOME ENGINE
==========================================================*/

const smartHome={

    autoLights:true,

    autoDoor:false,

    ecoMode:false,

    vacationMode:false,

    securityLevel:"HIGH"

};

/* ==========================================================
   AUTO LIGHTS
==========================================================*/

function autoLights(){

    if(!smartHome.autoLights) return;

    const hour=new Date().getHours();

    if(hour>=18 || hour<6){

        if(!state.lights){

            state.lights=true;

            showNotification("🌙 Auto Lights Enabled");

        }

    }

    else{

        if(state.lights){

            state.lights=false;

            showNotification("☀️ Auto Lights Disabled");

        }

    }

    updateDashboard();

}

setInterval(autoLights,60000);

/* ==========================================================
   SMART TEMPERATURE
==========================================================*/

function regulateTemperature(){

    if(state.temperature>29){

        state.temperature-=0.4;

        showNotification("❄ Cooling Room");

    }

    else if(state.temperature<22){

        state.temperature+=0.4;

        showNotification("🔥 Heating Room");

    }

}

setInterval(regulateTemperature,8000);

/* ==========================================================
   ENERGY MONITOR
==========================================================*/

function energyMonitor(){

    if(state.lights){

        state.power+=0.08;

    }

    else{

        state.power-=0.05;

    }

    state.power=Math.max(

        1.0,

        Math.min(5.0,state.power)

    );

    updateDashboard();

}

setInterval(energyMonitor,5000);

/* ==========================================================
   WATER MONITOR
==========================================================*/

function waterMonitor(){

    state.water-=Math.random()*0.4;

    if(state.water<20){

        showNotification("💧 Water Tank Low");

    }

    if(state.water<=5){

        state.water=100;

        showNotification("🚰 Water Tank Refilled");

    }

    updateDashboard();

}

setInterval(waterMonitor,10000);

/* ==========================================================
   DEVICE HEALTH
==========================================================*/

function deviceHealth(){

    const value=(98+Math.random()*2).toFixed(1);

    if(app.systemHealth){

        app.systemHealth.innerHTML=value+"%";

    }

}

setInterval(deviceHealth,15000);

/* ==========================================================
   AI HOME SUGGESTIONS
==========================================================*/

const suggestions=[

"💡 Turn off unused lights to save energy.",

"🌡 Indoor temperature is comfortable.",

"🔒 Remember to lock the main door.",

"⚡ Energy usage is within limits.",

"🌤 Great weather for solar charging."

];

function randomSuggestion(){

    const tip=

    suggestions[

        Math.floor(

            Math.random()*suggestions.length

        )

    ];

    showNotification(tip);

}

setInterval(randomSuggestion,90000);

/* ==========================================================
   SECURITY MONITOR
==========================================================*/

function securityMonitor(){

    if(Math.random()<0.03){

        showNotification("📹 Motion Detected");

    }

}

setInterval(securityMonitor,30000);

/* ==========================================================
   QUICK ACTIONS
==========================================================*/

function enableEcoMode(){

    smartHome.ecoMode=true;

    state.power*=0.85;

    showNotification("🌿 Eco Mode Enabled");

    updateDashboard();

}

function disableEcoMode(){

    smartHome.ecoMode=false;

    showNotification("⚡ Eco Mode Disabled");

}

/* ==========================================================
   START SMART HOME ENGINE
==========================================================*/

console.log("✅ Smart Home AI Engine Running");

/* ==========================================================
   PART 2A3
   ADVANCED HOME AUTOMATION
==========================================================*/

/* ==========================================================
   SMART SCENES
==========================================================*/

const scenes={

    normal:true,

    movie:false,

    night:false,

    away:false,

    party:false

};

function resetScenes(){

    for(const scene in scenes){

        scenes[scene]=false;

    }

}

/* ==========================================================
   MOVIE MODE
==========================================================*/

function movieMode(){

    resetScenes();

    scenes.movie=true;

    state.lights=false;

    state.doorLocked=true;

    state.temperature=23;

    updateDashboard();

    showNotification("🎬 Movie Mode Activated");

}

/* ==========================================================
   NIGHT MODE
==========================================================*/

function nightMode(){

    resetScenes();

    scenes.night=true;

    state.lights=false;

    state.doorLocked=true;

    state.temperature=22;

    updateDashboard();

    showNotification("🌙 Night Mode Activated");

}

/* ==========================================================
   AWAY MODE
==========================================================*/

function awayMode(){

    resetScenes();

    scenes.away=true;

    state.lights=false;

    state.doorLocked=true;

    smartHome.securityLevel="MAXIMUM";

    updateDashboard();

    showNotification("🚗 Away Mode Enabled");

}

/* ==========================================================
   PARTY MODE
==========================================================*/

function partyMode(){

    resetScenes();

    scenes.party=true;

    state.lights=true;

    updateDashboard();

    showNotification("🎉 Party Mode Started");

}

/* ==========================================================
   AUTO SECURITY
==========================================================*/

function autoSecurity(){

    const hour=new Date().getHours();

    if(hour>=23 || hour<5){

        if(!state.doorLocked){

            state.doorLocked=true;

            updateDashboard();

            showNotification("🔒 Door Locked Automatically");

        }

    }

}

setInterval(autoSecurity,60000);

/* ==========================================================
   ENERGY SAVER
==========================================================*/

function energySaver(){

    if(state.power>3.5){

        state.power-=0.25;

        showNotification("⚡ AI Reduced Power Consumption");

    }

}

setInterval(energySaver,15000);

/* ==========================================================
   WATER SAVER
==========================================================*/

function waterSaver(){

    if(state.water<30){

        showNotification("💧 Water Saving Mode Enabled");

    }

}

setInterval(waterSaver,30000);

/* ==========================================================
   SMART ALERTS
==========================================================*/

function smartAlerts(){

    if(state.temperature>30){

        showNotification("🌡 Indoor Temperature High");

    }

    if(state.power>4){

        showNotification("⚠ High Energy Usage");

    }

    if(state.water<15){

        showNotification("🚨 Water Critically Low");

    }

}

setInterval(smartAlerts,12000);

/* ==========================================================
   RANDOM AI CHECK
==========================================================*/

const aiChecks=[

"🤖 All systems operating normally.",

"🛡 Security scan completed.",

"⚡ Energy optimization successful.",

"🌤 Weather synchronized.",

"📹 Cameras online.",

"💧 Water system functioning normally."

];

function aiHealthCheck(){

    const msg=

    aiChecks[

        Math.floor(

            Math.random()*aiChecks.length

        )

    ];

    console.log(msg);

}

setInterval(aiHealthCheck,45000);

/* ==========================================================
   DASHBOARD ANIMATION
==========================================================*/

setInterval(()=>{

    document.querySelectorAll(".glassCard").forEach(card=>{

        card.animate([

            {transform:"translateY(0px)"},

            {transform:"translateY(-3px)"},

            {transform:"translateY(0px)"}

        ],{

            duration:1500

        });

    });

},10000);

/* ==========================================================
   SMART HOME READY
==========================================================*/

showNotification("🏠 Advanced Home Automation Ready");

console.log("✅ Part 2A3 Loaded");

/* ==========================================================
   PART 3A1.1A1
   AIVA CORE ENGINE
==========================================================*/

const AIVA = {

    active: true,

    version: "4.0",

    name: "AIVA",

    memory: [],

    history: [],

    typing: false

};

/* ==========================================
   CHAT ELEMENTS
==========================================*/

const ai = {

    chat: document.getElementById("chat"),

    input: document.getElementById("aiInput")

};

/* ==========================================
   SEND MESSAGE
==========================================*/

function sendAI(){

    if(!ai.input || !ai.chat) return;

    const message = ai.input.value.trim();

    if(message==="") return;

    addUserMessage(message);

    ai.input.value="";

    processAI(message);

}

/* ==========================================
   USER MESSAGE
==========================================*/

function addUserMessage(text){

    const div=document.createElement("div");

    div.className="userMessage";

    div.innerHTML=text;

    ai.chat.appendChild(div);

    ai.chat.scrollTop=ai.chat.scrollHeight;

    AIVA.history.push({

        role:"user",

        text:text

    });

}

/* ==========================================
   AI MESSAGE
==========================================*/

function addAIMessage(text){

    const div=document.createElement("div");

    div.className="aiMessage";

    div.innerHTML=text;

    ai.chat.appendChild(div);

    ai.chat.scrollTop=ai.chat.scrollHeight;

    AIVA.history.push({

        role:"assistant",

        text:text

    });

}

/* ==========================================
   TYPING EFFECT
==========================================*/

function aiTyping(callback){

    if(AIVA.typing) return;

    AIVA.typing=true;

    const typing=document.createElement("div");

    typing.className="aiMessage";

    typing.id="typing";

    typing.innerHTML="🤖 AIVA is typing...";

    ai.chat.appendChild(typing);

    ai.chat.scrollTop=ai.chat.scrollHeight;

    setTimeout(()=>{

        typing.remove();

        AIVA.typing=false;

        callback();

    },700);

}

/* ==========================================
   PROCESS REQUEST
==========================================*/

function processAI(message){

    const text=message.toLowerCase();

    aiTyping(()=>{

        if(text.includes("hello") || text.includes("hi")){

            addAIMessage("👋 Hello! How can I help you today?");

        }

        else if(text.includes("door")){

            toggleDoor();

            addAIMessage("🚪 Door status changed.");

        }

        else if(text.includes("light")){

            toggleLight();

            addAIMessage("💡 Lights updated.");

        }

        else if(text.includes("weather")){

            fetchWeather();

            addAIMessage("🌤 Refreshing live weather.");

        }

        else{

            addAIMessage("🤖 I'm still learning. More commands will be added soon.");

        }

    });

}

/* ==========================================
   ENTER KEY
==========================================*/

ai.input?.addEventListener("keydown",e=>{

    if(e.key==="Enter"){

        sendAI();

    }

});

console.log("✅ Part 3A1.1A1 Loaded");

/* ==========================================================
   PART 3A1.1A2
   AIVA COMMAND ENGINE
==========================================================*/

/* ==========================================
   HELPER FUNCTIONS
==========================================*/

function aiReply(text){

    aiTyping(()=>{

        addAIMessage(text);

    });

}

function contains(text,words){

    return words.some(word=>text.includes(word));

}

/* ==========================================
   COMMAND DATABASE
==========================================*/

const greetings=[

    "hello","hi","hey","good morning",

    "good afternoon","good evening"

];

const thanks=[

    "thanks","thank you","thx"

];

const jokes=[

    "😂 Why did the AI stay home? It lost its cache.",

    "😂 Smart homes never gossip... they already know everything.",

    "😂 I would tell you a UDP joke... but you might not get it."

];

/* ==========================================
   ADVANCED AI PROCESSOR
==========================================*/

function processAI(message){

    const text=message.toLowerCase().trim();

    /* Greetings */

    if(contains(text,greetings)){

        return aiReply(

            "👋 Hello! I'm AIVA. How can I help you today?"

        );

    }

    /* Thanks */

    if(contains(text,thanks)){

        return aiReply(

            "😊 You're welcome!"

        );

    }

    /* Time */

    if(text.includes("time")){

        return aiReply(

            "🕒 "+new Date().toLocaleTimeString()

        );

    }

    /* Date */

    if(text.includes("date") ||

       text.includes("day")){

        return aiReply(

            "📅 "+new Date().toDateString()

        );

    }

    /* Weather */

    if(text.includes("weather")){

        fetchWeather();

        return aiReply(

            "🌤 Refreshing live weather..."

        );

    }

    /* Door */

    if(text.includes("door")){

        toggleDoor();

        return aiReply(

            state.doorLocked ?

            "🚪 The door is now locked."

            :

            "🚪 The door is now unlocked."

        );

    }

    /* Lights */

    if(text.includes("light")){

        toggleLight();

        return aiReply(

            state.lights ?

            "💡 Lights switched ON."

            :

            "💡 Lights switched OFF."

        );

    }

    /* Temperature */

    if(text.includes("temperature")){

        return aiReply(

            "🌡 Indoor temperature is "

            +state.temperature.toFixed(1)

            +"°C."

        );

    }

    /* Water */

    if(text.includes("water")){

        return aiReply(

            "💧 Water tank level is "

            +Math.round(state.water)

            +"%."

        );

    }

    /* Power */

    if(text.includes("power") ||

       text.includes("energy")){

        return aiReply(

            "⚡ Current power usage is "

            +state.power.toFixed(2)

            +" kWh."

        );

    }

    /* Joke */

    if(text.includes("joke")){

        return aiReply(

            jokes[Math.floor(Math.random()*jokes.length)]

        );

    }

    /* Bye */

    if(text.includes("bye")){

        return aiReply(

            "👋 Goodbye! Have a great day."

        );

    }

    /* Default */

    aiReply(

        "🤖 Sorry, I don't understand that yet. Try asking about the weather, door, lights, temperature, water, power, date, time, or tell me to tell a joke."

    );

}

console.log("✅ Part 3A1.1A2 Loaded");

/* ==========================================================
   PART 3A1.1A3
   ADVANCED AIVA FEATURES
==========================================================*/

/* ==========================================
   MEMORY
==========================================*/

AIVA.memory = AIVA.memory || {};

function remember(key,value){

    AIVA.memory[key]=value;

}

function recall(key){

    return AIVA.memory[key];

}

/* ==========================================
   HELP
==========================================*/

function showHelp(){

    aiReply(

`📖 Available Commands

👋 hello
🚪 door
💡 light
🌤 weather
🌡 temperature
💧 water
⚡ power
🕒 time
📅 date
😂 joke
➕ calculate 5+8
🎬 movie mode
🌙 night mode
🚗 away mode
🎉 party mode
🧠 remember my name is Alex
❓ what is my name`

    );

}

/* ==========================================
   CALCULATOR
==========================================*/

function aiCalculator(text){

    const expression=text

        .replace("calculate","")

        .replace("=","")

        .trim();

    try{

        const answer=Function(

            '"use strict";return ('+

            expression+

            ')'

        )();

        aiReply(

            "🧮 Answer: "+answer

        );

    }

    catch{

        aiReply(

            "❌ Invalid calculation."

        );

    }

}

/* ==========================================
   MEMORY COMMANDS
==========================================*/

function aiMemory(text){

    if(text.includes("remember my name is")){

        const name=text

        .split("remember my name is")[1]

        .trim();

        remember("name",name);

        aiReply(

            "😊 I'll remember your name, "+name+"."

        );

        return true;

    }

    if(text.includes("what is my name")){

        const name=recall("name");

        aiReply(

            name ?

            "👤 Your name is "+name+"." :

            "🤔 I don't know your name yet."

        );

        return true;

    }

    return false;

}

/* ==========================================
   SCENE COMMANDS
==========================================*/

function aiScenes(text){

    if(text.includes("movie mode")){

        movieMode();

        aiReply("🎬 Movie Mode Activated.");

        return true;

    }

    if(text.includes("night mode")){

        nightMode();

        aiReply("🌙 Night Mode Activated.");

        return true;

    }

    if(text.includes("away mode")){

        awayMode();

        aiReply("🚗 Away Mode Activated.");

        return true;

    }

    if(text.includes("party mode")){

        partyMode();

        aiReply("🎉 Party Mode Activated.");

        return true;

    }

    return false;

}

/* ==========================================
   OVERRIDE PROCESS AI
==========================================*/

const previousProcessAI=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="help"){

        showHelp();

        return;

    }

    if(text.startsWith("calculate")){

        aiCalculator(text);

        return;

    }

    if(aiMemory(text)){

        return;

    }

    if(aiScenes(text)){

        return;

    }

    previousProcessAI(message);

};

/* ==========================================
   VOICE SHORTCUT
==========================================*/

function startVoiceRecognition(){

    if(!('webkitSpeechRecognition' in window)){

        alert("Voice Recognition is not supported.");

        return;

    }

    const recognition=new webkitSpeechRecognition();

    recognition.lang="en-US";

    recognition.start();

    recognition.onresult=function(event){

        ai.input.value=

        event.results[0][0].transcript;

        sendAI();

    };

}

console.log("✅ Part 3A1.1A3 Loaded");

/* ==========================================================
   PART 3A2
   AIVA NATURAL INTELLIGENCE ENGINE
==========================================================*/

/* ==========================================
   AI PERSONALITY
==========================================*/

AIVA.personality={

    mood:"Happy",

    confidence:100,

    humor:true,

    intelligence:"Advanced"

};

/* ==========================================
   RANDOM GREETINGS
==========================================*/

const randomGreetings=[

    "😊 Nice to see you again!",

    "🤖 I'm ready to help.",

    "👋 Welcome back!",

    "🏠 Your smart home is online.",

    "⚡ Everything looks good!"

];

/* ==========================================
   RANDOM FACTS
==========================================*/

const facts=[

    "💡 LEDs use around 75% less electricity than incandescent bulbs.",

    "🌍 Smart homes can reduce energy consumption.",

    "🤖 AI stands for Artificial Intelligence.",

    "⚡ Solar panels generate electricity from sunlight.",

    "📶 IoT means Internet of Things."

];

/* ==========================================
   HOME TIPS
==========================================*/

const homeTips=[

    "💡 Switch off unused lights to save electricity.",

    "🚪 Keep your doors locked when away.",

    "🌡 Maintain room temperature between 22°C and 26°C.",

    "💧 Check your water tank regularly.",

    "📹 Keep your security cameras clean."

];

/* ==========================================
   AI CONVERSATION
==========================================*/

function conversationReply(text){

    if(text.includes("how are you")){

        return "😊 I'm functioning perfectly!";

    }

    if(text.includes("who are you")){

        return "🤖 I'm AIVA, your Smart Home AI Assistant.";

    }

    if(text.includes("what can you do")){

        return "🏠 I can control lights, doors, weather, monitor your home and answer questions.";

    }

    if(text.includes("your name")){

        return "🤖 My name is AIVA.";

    }

    if(text.includes("good morning")){

        return "☀️ Good morning! Have an amazing day.";

    }

    if(text.includes("good night")){

        return "🌙 Good night! Your home is secure.";

    }

    return null;

}

/* ==========================================
   AI EXTRA COMMANDS
==========================================*/

const oldProcessAI2=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    const reply=

    conversationReply(text);

    if(reply){

        aiReply(reply);

        return;

    }

    if(text==="fact"){

        aiReply(

            facts[

                Math.floor(Math.random()*facts.length)

            ]

        );

        return;

    }

    if(text==="tip"){

        aiReply(

            homeTips[

                Math.floor(Math.random()*homeTips.length)

            ]

        );

        return;

    }

    if(text==="status"){

        aiReply(

            `🏠 Home Status

Door : ${state.doorLocked?"Locked":"Unlocked"}

Lights : ${state.lights?"ON":"OFF"}

Temp : ${state.temperature.toFixed(1)}°C

Power : ${state.power.toFixed(2)} kWh

Water : ${Math.round(state.water)}%`

        );

        return;

    }

    if(text==="greet me"){

        aiReply(

            randomGreetings[

                Math.floor(Math.random()*randomGreetings.length)

            ]

        );

        return;

    }

    oldProcessAI2(message);

};

/* ==========================================
   AUTO AI CHECK-IN
==========================================*/

setInterval(()=>{

    if(!ai.chat) return;

    if(Math.random()<0.25){

        addAIMessage(

            randomGreetings[

                Math.floor(

                    Math.random()*randomGreetings.length

                )

            ]

        );

    }

},300000);

/* ==========================================
   STARTUP MESSAGE
==========================================*/

setTimeout(()=>{

    if(ai.chat){

        addAIMessage(

            "🤖 AIVA Natural Intelligence Loaded Successfully."

        );

    }

},1500);

console.log("✅ Part 3A2 Loaded");

/* ==========================================================
   PART 3A3
   AIVA PRO INTELLIGENCE ENGINE
==========================================================*/

/* ==========================================
   CONTEXT MEMORY
==========================================*/

AIVA.context = {

    lastCommand: "",

    lastReply: "",

    mood: "happy",

    conversationCount: 0

};

/* ==========================================
   SAVE CONTEXT
==========================================*/

function saveContext(command, reply){

    AIVA.context.lastCommand = command;

    AIVA.context.lastReply = reply;

    AIVA.context.conversationCount++;

}

/* ==========================================
   MOOD DETECTION
==========================================*/

function detectMood(text){

    text = text.toLowerCase();

    if(text.includes("sad") ||
       text.includes("upset") ||
       text.includes("bad")){

        return "sad";

    }

    if(text.includes("happy") ||
       text.includes("awesome") ||
       text.includes("great")){

        return "happy";

    }

    if(text.includes("angry") ||
       text.includes("mad")){

        return "angry";

    }

    return "neutral";

}

/* ==========================================
   NATURAL RESPONSES
==========================================*/

function emotionalReply(mood){

    switch(mood){

        case "happy":

            return "😄 That's awesome to hear!";

        case "sad":

            return "💙 I'm here if you need any help.";

        case "angry":

            return "🙂 Let's solve it together.";

        default:

            return null;

    }

}

/* ==========================================
   FOLLOW-UP QUESTIONS
==========================================*/

function followUp(text){

    text=text.toLowerCase();

    if(text.includes("weather")){

        return "☂ Would you also like humidity and wind details?";

    }

    if(text.includes("door")){

        return "🔒 Security check completed.";

    }

    if(text.includes("light")){

        return "💡 Energy usage has been updated.";

    }

    return "";

}

/* ==========================================
   SMART RESPONSE WRAPPER
==========================================*/

const processAI3 = processAI;

processAI = function(message){

    const mood = detectMood(message);

    const emotion = emotionalReply(mood);

    if(emotion){

        saveContext(message,emotion);

        aiReply(emotion);

        return;

    }

    processAI3(message);

    const extra = followUp(message);

    if(extra){

        setTimeout(()=>{

            addAIMessage(extra);

        },1200);

    }

};

/* ==========================================
   AI GREETING
==========================================*/

function welcomeUser(){

    const hour = new Date().getHours();

    let msg = "";

    if(hour < 12){

        msg = "☀️ Good Morning!";

    }

    else if(hour < 18){

        msg = "🌤 Good Afternoon!";

    }

    else{

        msg = "🌙 Good Evening!";

    }

    addAIMessage(

        msg +

        " I'm AIVA. Everything is running normally."

    );

}

/* ==========================================
   RANDOM CHECKUPS
==========================================*/

const checkups=[

"🔋 Battery backup is healthy.",

"📹 Cameras are online.",

"🌐 Internet connection stable.",

"💧 Water tank operating normally.",

"⚡ Power consumption is within limits."

];

setInterval(()=>{

    if(Math.random()<0.20){

        addAIMessage(

            checkups[

                Math.floor(

                    Math.random()*checkups.length

                )

            ]

        );

    }

},180000);

/* ==========================================
   SHORTCUT COMMANDS
==========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.ctrlKey && e.key==="1"){

        movieMode();

        addAIMessage("🎬 Movie Mode Enabled");

    }

    if(e.ctrlKey && e.key==="2"){

        nightMode();

        addAIMessage("🌙 Night Mode Enabled");

    }

    if(e.ctrlKey && e.key==="3"){

        awayMode();

        addAIMessage("🚗 Away Mode Enabled");

    }

});

/* ==========================================
   STARTUP
==========================================*/

setTimeout(welcomeUser,1000);

console.log("✅ Part 3A3 Loaded");

/* ==========================================================
   PART 4A1
   SECURITY & AUTOMATION ENGINE
==========================================================*/

/* ==========================================
   SECURITY STATE
==========================================*/

const security={

    armed:true,

    alarm:false,

    motion:false,

    lastEvent:"None"

};

/* ==========================================
   UPDATE SECURITY PANEL
==========================================*/

function updateSecurity(){

    const fire=document.getElementById("fireStatus");

    const door=document.getElementById("doorStatus");

    const camera=document.getElementById("cameraStatus");

    if(door){

        door.innerHTML=

        state.doorLocked ?

        "🔒 Locked"

        :

        "🔓 Unlocked";

    }

    if(camera){

        camera.innerHTML=

        security.motion ?

        "📹 Motion Detected"

        :

        "📹 Monitoring";

    }

    if(fire && !state.emergency){

        fire.innerHTML="✅ Safe";

    }

}

/* ==========================================
   MOTION DETECTOR
==========================================*/

function detectMotion(){

    if(!security.armed) return;

    if(Math.random()<0.08){

        security.motion=true;

        security.lastEvent=

        new Date().toLocaleTimeString();

        showNotification(

            "📹 Motion Detected"

        );

        addAIMessage(

            "📹 Motion detected near the entrance."

        );

    }

    else{

        security.motion=false;

    }

    updateSecurity();

}

setInterval(detectMotion,10000);

/* ==========================================
   SMART ALARM
==========================================*/

function triggerAlarm(){

    security.alarm=true;

    document.body.classList.add("alarm");

    showNotification(

        "🚨 SECURITY ALARM"

    );

    addAIMessage(

        "🚨 Alarm Activated!"

    );

}

function stopAlarm(){

    security.alarm=false;

    document.body.classList.remove("alarm");

    showNotification(

        "✅ Alarm Stopped"

    );

}

/* ==========================================
   AUTO ALARM
==========================================*/

setInterval(()=>{

    if(

        security.motion &&

        !state.doorLocked

    ){

        triggerAlarm();

    }

},4000);

/* ==========================================
   ARM / DISARM
==========================================*/

function armSecurity(){

    security.armed=true;

    showNotification(

        "🛡 Security Armed"

    );

}

function disarmSecurity(){

    security.armed=false;

    stopAlarm();

    showNotification(

        "🔓 Security Disarmed"

    );

}

/* ==========================================
   CAMERA SIMULATION
==========================================*/

setInterval(()=>{

    const line=document.querySelector(".scanLine");

    if(!line) return;

    line.animate([

        {

            top:"0%"

        },

        {

            top:"100%"

        }

    ],{

        duration:2500

    });

},2600);

/* ==========================================
   SECURITY REPORT
==========================================*/

function securityReport(){

    addAIMessage(

`🛡 Security Report

Status : ${security.armed?"Armed":"Disarmed"}

Door : ${state.doorLocked?"Locked":"Unlocked"}

Motion : ${security.motion?"Detected":"None"}

Alarm : ${security.alarm?"ON":"OFF"}

Last Event : ${security.lastEvent}`

    );

}

/* ==========================================
   AI COMMANDS
==========================================*/

const oldAI=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="security"){

        securityReport();

        return;

    }

    if(text==="arm"){

        armSecurity();

        addAIMessage(

            "🛡 Home Security Armed."

        );

        return;

    }

    if(text==="disarm"){

        disarmSecurity();

        addAIMessage(

            "🔓 Home Security Disarmed."

        );

        return;

    }

    oldAI(message);

};

console.log("✅ Part 4A1 Loaded");

/* ==========================================================
   PART 4A2
   ADVANCED SECURITY ENGINE
==========================================================*/

/* ==========================================
   FACE ID SIMULATION
==========================================*/

const auth={

    faceID:true,

    pin:"1234",

    failedAttempts:0,

    maxAttempts:3

};

/* ==========================================
   VISITOR LOG
==========================================*/

const visitorHistory=[];

function logVisitor(type){

    visitorHistory.unshift({

        type:type,

        time:new Date().toLocaleString()

    });

    if(visitorHistory.length>20){

        visitorHistory.pop();

    }

}

/* ==========================================
   FACE SCAN
==========================================*/

function faceScan(){

    showNotification("📷 Scanning Face...");

    setTimeout(()=>{

        const success=Math.random()>0.15;

        if(success){

            showNotification("✅ Face Recognized");

            addAIMessage("👤 Authorized user detected.");

            logVisitor("Authorized");

        }

        else{

            showNotification("❌ Face Not Recognized");

            addAIMessage("⚠ Unknown visitor detected.");

            logVisitor("Unknown");

        }

    },2000);

}

/* ==========================================
   PIN CHECK
==========================================*/

function verifyPIN(pin){

    if(pin===auth.pin){

        auth.failedAttempts=0;

        addAIMessage("✅ PIN Accepted");

        return true;

    }

    auth.failedAttempts++;

    addAIMessage(

        "❌ Incorrect PIN ("+

        auth.failedAttempts+

        "/"+

        auth.maxAttempts+

        ")"

    );

    if(auth.failedAttempts>=auth.maxAttempts){

        emergencyLockdown();

    }

    return false;

}

/* ==========================================
   LOCKDOWN
==========================================*/

function emergencyLockdown(){

    state.doorLocked=true;

    security.alarm=true;

    document.body.classList.add("alarm");

    showNotification("🚨 EMERGENCY LOCKDOWN");

    addAIMessage(

        "🚨 Home locked due to repeated failed authentication."

    );

}

/* ==========================================
   INTRUSION REPORT
==========================================*/

function intrusionReport(){

    let report="🛡 Visitor History<br><br>";

    if(visitorHistory.length===0){

        report+="No visitors recorded.";

    }

    else{

        visitorHistory.forEach(item=>{

            report+=

            "• "+item.type+

            " - "+item.time+

            "<br>";

        });

    }

    addAIMessage(report);

}

/* ==========================================
   THREAT ANALYSIS
==========================================*/

function threatAnalysis(){

    let score=0;

    if(security.motion) score+=40;

    if(!state.doorLocked) score+=25;

    if(security.alarm) score+=35;

    let level="LOW";

    if(score>=70) level="HIGH";

    else if(score>=40) level="MEDIUM";

    addAIMessage(

        "🛡 Threat Level: <b>"+

        level+

        "</b> ("+

        score+

        "%)"

    );

}

/* ==========================================
   AI SECURITY COMMANDS
==========================================*/

const processAI4=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="face id"){

        faceScan();

        return;

    }

    if(text==="visitor log"){

        intrusionReport();

        return;

    }

    if(text==="threat"){

        threatAnalysis();

        return;

    }

    processAI4(message);

};

/* ==========================================
   AUTO FACE SCAN
==========================================*/

setInterval(()=>{

    if(Math.random()<0.03){

        faceScan();

    }

},180000);

console.log("✅ Part 4A2 Loaded");

/* ==========================================================
   PART 4A3
   EMERGENCY & DISASTER MANAGEMENT
==========================================================*/

/* ==========================================
   SENSOR STATUS
==========================================*/

const sensors={

    fire:false,

    smoke:false,

    gas:false,

    flood:false,

    power:true

};

/* ==========================================
   FIRE DETECTION
==========================================*/

function detectFire(){

    if(Math.random()<0.015){

        sensors.fire=true;

        state.emergency=true;

        showNotification("🔥 FIRE DETECTED");

        addAIMessage("🔥 Fire detected! Evacuate immediately.");

        document.getElementById("fireStatus").innerHTML="🔥 FIRE";

    }

}

setInterval(detectFire,15000);

/* ==========================================
   GAS LEAK
==========================================*/

function detectGas(){

    if(Math.random()<0.01){

        sensors.gas=true;

        showNotification("☣ Gas Leak Detected");

        addAIMessage("☣ Dangerous gas leak detected.");

    }

}

setInterval(detectGas,20000);

/* ==========================================
   FLOOD SENSOR
==========================================*/

function detectFlood(){

    if(Math.random()<0.01){

        sensors.flood=true;

        showNotification("🌊 Flood Warning");

        addAIMessage("🌊 Water detected in basement.");

    }

}

setInterval(detectFlood,25000);

/* ==========================================
   POWER FAILURE
==========================================*/

function powerFailure(){

    sensors.power=false;

    showNotification("⚡ Power Failure");

    addAIMessage("🔋 Switching to backup battery.");

    setTimeout(()=>{

        sensors.power=true;

        showNotification("✅ Power Restored");

        addAIMessage("⚡ Main electricity restored.");

    },6000);

}

/* ==========================================
   SOS
==========================================*/

function emergency(){

    state.emergency=true;

    triggerAlarm();

    state.doorLocked=false;

    updateDashboard();

    showNotification("🚨 SOS ACTIVATED");

    addAIMessage("🚨 Emergency Mode Activated.");

}

/* ==========================================
   RESET EMERGENCY
==========================================*/

function resetEmergency(){

    state.emergency=false;

    sensors.fire=false;

    sensors.gas=false;

    sensors.flood=false;

    stopAlarm();

    updateDashboard();

    document.getElementById("fireStatus").innerHTML=

    "✅ Safe";

    addAIMessage("✅ Emergency Cleared.");

}

/* ==========================================
   AI COMMANDS
==========================================*/

const processAI5=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="sos"){

        emergency();

        return;

    }

    if(text==="reset emergency"){

        resetEmergency();

        return;

    }

    if(text==="power outage"){

        powerFailure();

        return;

    }

    processAI5(message);

};

/* ==========================================
   RANDOM POWER FAILURE
==========================================*/

setInterval(()=>{

    if(Math.random()<0.02){

        powerFailure();

    }

},120000);

console.log("✅ Part 4A3 Loaded");

/* ==========================================================
   PART 5A1
   LIVE DASHBOARD ANALYTICS
==========================================================*/

/* ==========================================
   LIVE DATA ENGINE
==========================================*/

state.temperature = state.temperature || 26;
state.humidity = state.humidity || 58;
state.power = state.power || 2.15;
state.water = state.water || 82;
state.internet = 98;
state.battery = 100;
state.solar = 74;

/* ==========================================
   RANDOM NUMBER
==========================================*/

function random(min,max){

    return Math.random()*(max-min)+min;

}

/* ==========================================
   UPDATE LIVE VALUES
==========================================*/

function updateLiveData(){

    state.temperature += random(-0.3,0.3);
    state.humidity += random(-1,1);
    state.power += random(-0.08,0.08);
    state.water -= random(0,0.03);
    state.internet = 95 + Math.random()*5;
    state.battery -= 0.005;
    state.solar = 65 + Math.random()*30;

    state.temperature=Math.max(18,Math.min(35,state.temperature));
    state.humidity=Math.max(30,Math.min(90,state.humidity));
    state.power=Math.max(0.5,state.power);
    state.water=Math.max(0,state.water);
    state.battery=Math.max(0,state.battery);

    refreshDashboard();

}

/* ==========================================
   REFRESH DASHBOARD
==========================================*/

function refreshDashboard(){

    const set=(id,value)=>{

        const el=document.getElementById(id);

        if(el) el.innerHTML=value;

    };

    set("indoorTemp",state.temperature.toFixed(1)+"°C");

    set("humidity",Math.round(state.humidity)+"%");

    set("power",state.power.toFixed(2)+" kWh");

    set("water",Math.round(state.water)+"%");

    set("temperature",state.temperature.toFixed(1)+"°C");

    set("powerStatus",

        state.power<2.5 ? "Excellent" :

        state.power<4 ? "Normal" :

        "High"

    );

    set("waterStatus",

        state.water>60 ? "Normal" :

        state.water>30 ? "Low" :

        "Critical"

    );

}

/* ==========================================
   PROGRESS BARS
==========================================*/

function updateProgressBars(){

    const powerFill=document.getElementById("powerFill");

    const waterFill=document.getElementById("waterFill");

    if(powerFill){

        powerFill.style.width=

        Math.min(state.power*25,100)+"%";

    }

    if(waterFill){

        waterFill.style.width=

        state.water+"%";

    }

}

/* ==========================================
   LIVE COUNTERS
==========================================*/

setInterval(()=>{

    updateLiveData();

    updateProgressBars();

},3000);

/* ==========================================
   SYSTEM SCORE
==========================================*/

function getSystemHealth(){

    let score=100;

    if(state.power>4) score-=15;

    if(state.water<30) score-=20;

    if(state.temperature>32) score-=10;

    if(security.alarm) score-=25;

    return Math.max(score,0);

}

setInterval(()=>{

    const health=document.getElementById("systemHealth");

    const value=document.querySelector(".bigValue");

    if(health){

        health.innerHTML=

        getSystemHealth()>90 ?

        "Excellent":

        getSystemHealth()>70 ?

        "Good":

        "Attention Needed";

    }

},5000);

/* ==========================================
   AI HEALTH REPORT
==========================================*/

function dashboardReport(){

    addAIMessage(

`📊 Dashboard Report

🌡 Temperature : ${state.temperature.toFixed(1)}°C

💧 Humidity : ${Math.round(state.humidity)}%

⚡ Power : ${state.power.toFixed(2)} kWh

🚰 Water : ${Math.round(state.water)}%

🔋 Battery : ${Math.round(state.battery)}%

☀ Solar : ${Math.round(state.solar)}%

🛡 Health : ${getSystemHealth()}%`

    );

}

/* ==========================================
   AI COMMAND
==========================================*/

const processAI6=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="dashboard"){

        dashboardReport();

        return;

    }

    processAI6(message);

};

console.log("✅ Part 5A1 Loaded");

/* ==========================================================
   PART 5A2
   LIVE CHART ANALYTICS ENGINE
==========================================================*/

/* ==========================================
   CHART DATA
==========================================*/

let powerHistory = [];
let waterHistory = [];
let tempHistory = [];
let labels = [];

let powerChart = null;
let waterChart = null;

/* ==========================================
   CREATE CHARTS
==========================================*/

function createCharts(){

    const powerCanvas = document.getElementById("powerChart");
    const waterCanvas = document.getElementById("waterChart");

    if(!powerCanvas || !waterCanvas) return;

    powerChart = new Chart(powerCanvas,{

        type:"line",

        data:{

            labels:labels,

            datasets:[{

                label:"Power (kWh)",

                data:powerHistory,

                borderColor:"#4FC3F7",

                backgroundColor:"rgba(79,195,247,.15)",

                tension:.35,

                fill:true

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
                    ticks:{
                        color:"#ffffff"
                    }
                },

                y:{
                    ticks:{
                        color:"#ffffff"
                    }
                }

            }

        }

    });

    waterChart = new Chart(waterCanvas,{

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:"Water %",

                data:waterHistory,

                backgroundColor:"#29B6F6"

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
                    ticks:{
                        color:"#ffffff"
                    }
                },

                y:{
                    max:100,

                    ticks:{
                        color:"#ffffff"
                    }
                }

            }

        }

    });

}

/* ==========================================
   UPDATE CHARTS
==========================================*/

function updateCharts(){

    const now=new Date();

    labels.push(

        now.getHours()+":"+

        now.getMinutes()+":"+

        now.getSeconds()

    );

    powerHistory.push(

        Number(state.power.toFixed(2))

    );

    waterHistory.push(

        Math.round(state.water)

    );

    tempHistory.push(

        Number(state.temperature.toFixed(1))

    );

    if(labels.length>12){

        labels.shift();
        powerHistory.shift();
        waterHistory.shift();
        tempHistory.shift();

    }

    if(powerChart){

        powerChart.update();

    }

    if(waterChart){

        waterChart.update();

    }

}

/* ==========================================
   CHART STARTUP
==========================================*/

window.addEventListener("load",()=>{

    setTimeout(()=>{

        createCharts();

    },500);

});

/* ==========================================
   LIVE UPDATE
==========================================*/

setInterval(()=>{

    updateCharts();

},3000);

/* ==========================================
   AI ANALYTICS
==========================================*/

function analyticsReport(){

    const avgPower = (

        powerHistory.reduce((a,b)=>a+b,0) ||

        state.power

    ) / Math.max(powerHistory.length,1);

    const avgWater = (

        waterHistory.reduce((a,b)=>a+b,0) ||

        state.water

    ) / Math.max(waterHistory.length,1);

    addAIMessage(

`📈 Analytics Report

⚡ Average Power : ${avgPower.toFixed(2)} kWh

💧 Average Water : ${avgWater.toFixed(0)}%

🌡 Current Temp : ${state.temperature.toFixed(1)}°C

📊 Samples : ${labels.length}`

    );

}

/* ==========================================
   AI COMMAND
==========================================*/

const processAI7 = processAI;

processAI = function(message){

    const text = message.toLowerCase();

    if(text==="analytics"){

        analyticsReport();

        return;

    }

    processAI7(message);

};

console.log("✅ Part 5A2 Loaded");

/* ==========================================================
   PART 5A3
   AI RECOMMENDATION & REPORT ENGINE
==========================================================*/

/* ==========================================
   AI SCORE ENGINE
==========================================*/

function calculateEfficiency(){

    let score = 100;

    if(state.power > 4) score -= 20;
    if(state.water < 30) score -= 20;
    if(state.temperature > 31) score -= 10;
    if(!state.doorLocked) score -= 10;
    if(state.lights) score -= 5;
    if(security.alarm) score -= 35;

    return Math.max(score,0);

}

/* ==========================================
   RECOMMENDATIONS
==========================================*/

function getRecommendations(){

    let tips=[];

    if(state.power>3.5)
        tips.push("⚡ Reduce electricity usage.");

    if(state.water<40)
        tips.push("💧 Refill the water tank soon.");

    if(state.temperature>30)
        tips.push("🌡 Turn on cooling for comfort.");

    if(!state.doorLocked)
        tips.push("🚪 Lock the main door.");

    if(state.lights)
        tips.push("💡 Switch off unused lights.");

    if(tips.length===0)
        tips.push("✅ Home is running efficiently.");

    return tips;

}

/* ==========================================
   DAILY REPORT
==========================================*/

function generateDailyReport(){

    const report=`
📋 DAILY REPORT

🛡 System Health : ${getSystemHealth()}%

🏆 Efficiency : ${calculateEfficiency()}%

🌡 Temperature : ${state.temperature.toFixed(1)}°C

💧 Water : ${Math.round(state.water)}%

⚡ Power : ${state.power.toFixed(2)} kWh

🔋 Battery : ${Math.round(state.battery)}%

☀ Solar : ${Math.round(state.solar)}%

🚪 Door : ${state.doorLocked?"Locked":"Unlocked"}

💡 Lights : ${state.lights?"ON":"OFF"}
`;

    addAIMessage(report);

}

/* ==========================================
   AI ADVICE
==========================================*/

function aiRecommendation(){

    const tips=getRecommendations();

    let message="🤖 AI Recommendations\n\n";

    tips.forEach(t=>{

        message+="• "+t+"\n";

    });

    addAIMessage(message);

}

/* ==========================================
   ENERGY FORECAST
==========================================*/

function energyForecast(){

    const predicted=

    (state.power+Math.random()*0.8).toFixed(2);

    addAIMessage(

        "📈 Predicted next-hour energy usage: "

        +predicted+

        " kWh"

    );

}

/* ==========================================
   WATER FORECAST
==========================================*/

function waterForecast(){

    const predicted=

    Math.max(

        0,

        state.water-random(1,4)

    ).toFixed(0);

    addAIMessage(

        "💧 Estimated water level in one hour: "

        +predicted+

        "%"

    );

}

/* ==========================================
   WEEKLY SUMMARY
==========================================*/

function weeklySummary(){

    addAIMessage(

`📅 Weekly Summary

⚡ Average Power : ${(state.power*0.95).toFixed(2)} kWh

💧 Average Water : ${Math.round(state.water)}%

🌡 Avg Temperature : ${state.temperature.toFixed(1)}°C

🏆 Efficiency : ${calculateEfficiency()}%`

    );

}

/* ==========================================
   AUTO AI TIPS
==========================================*/

setInterval(()=>{

    if(Math.random()<0.30){

        const tips=getRecommendations();

        addAIMessage(

            "💡 "+tips[

                Math.floor(Math.random()*tips.length)

            ]

        );

    }

},240000);

/* ==========================================
   AIVA COMMANDS
==========================================*/

const processAI8=processAI;

processAI=function(message){

    const text=message.toLowerCase();

    if(text==="report"){

        generateDailyReport();

        return;

    }

    if(text==="recommend"){

        aiRecommendation();

        return;

    }

    if(text==="forecast"){

        energyForecast();

        return;

    }

    if(text==="water forecast"){

        waterForecast();

        return;

    }

    if(text==="weekly"){

        weeklySummary();

        return;

    }

    processAI8(message);

};

console.log("✅ Part 5A3 Loaded");

/* ==========================================================
   PART 5A4
   DASHBOARD POLISH & PREMIUM ANIMATIONS
==========================================================*/

/* ==========================================
   FADE-IN ANIMATION
==========================================*/

function animateCards(){

    const cards=document.querySelectorAll(".glassCard");

    cards.forEach((card,index)=>{

        card.style.opacity="0";
        card.style.transform="translateY(30px)";

        setTimeout(()=>{

            card.style.transition=
                "all .6s ease";

            card.style.opacity="1";
            card.style.transform="translateY(0)";

        },index*120);

    });

}

/* ==========================================
   CARD HOVER EFFECT
==========================================*/

function enableCardHover(){

    document.querySelectorAll(".glassCard")
    .forEach(card=>{

        card.addEventListener("mouseenter",()=>{

            card.style.transform="translateY(-8px) scale(1.02)";
            card.style.boxShadow=
            "0 15px 40px rgba(0,255,255,.25)";

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="translateY(0) scale(1)";
            card.style.boxShadow="";

        });

    });

}

/* ==========================================
   COUNT-UP ANIMATION
==========================================*/

function animateValue(id,end,suffix=""){

    const el=document.getElementById(id);

    if(!el) return;

    let value=0;

    const timer=setInterval(()=>{

        value+=Math.max(end/40,1);

        if(value>=end){

            value=end;

            clearInterval(timer);

        }

        el.innerHTML=

        Number(value).toFixed(

            suffix==="%"?0:1

        )+suffix;

    },25);

}

/* ==========================================
   STATUS GLOW
==========================================*/

function pulseStatus(){

    document.querySelectorAll(".status")
    .forEach(item=>{

        item.animate([

            {transform:"scale(1)"},

            {transform:"scale(1.04)"},

            {transform:"scale(1)"}

        ],{

            duration:2200

        });

    });

}

/* ==========================================
   FLOATING ICONS
==========================================*/

function floatIcons(){

    document.querySelectorAll(".hotspot")
    .forEach(icon=>{

        icon.animate([

            {transform:"translateY(0)"},

            {transform:"translateY(-6px)"},

            {transform:"translateY(0)"}

        ],{

            duration:2000+Math.random()*1000,

            iterations:Infinity

        });

    });

}

/* ==========================================
   AUTO REFRESH ANIMATION
==========================================*/

function refreshAnimation(){

    const dashboard=

    document.getElementById("dashboard");

    if(!dashboard) return;

    dashboard.animate([

        {opacity:.96},

        {opacity:1}

    ],{

        duration:600

    });

}

/* ==========================================
   WELCOME SEQUENCE
==========================================*/

function premiumStartup(){

    animateCards();

    enableCardHover();

    floatIcons();

    pulseStatus();

    animateValue(

        "indoorTemp",

        state.temperature,

        "°C"

    );

    animateValue(

        "water",

        state.water,

        "%"

    );

}

/* ==========================================
   AUTO EFFECTS
==========================================*/

setInterval(()=>{

    pulseStatus();

    refreshAnimation();

},8000);

/* ==========================================
   PERFORMANCE MONITOR
==========================================*/

function monitorPerformance(){

    const fps=Math.floor(

        58+Math.random()*3

    );

    console.log(

        "Dashboard FPS:",fps

    );

}

setInterval(

    monitorPerformance,

    10000

);

/* ==========================================
   STARTUP
==========================================*/

window.addEventListener(

    "load",

    ()=>{

        setTimeout(

            premiumStartup,

            800

        );

    }

);

console.log("✅ Part 5A4 Loaded");
