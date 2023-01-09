let snowflakeCount = 1000

const snowBtn = document.getElementById("snow-btn")
const heroDiv = document.getElementById('hero')

// variables needed from the code I borrowed
let bodyHeightPx = document.body.offsetHeight;
let pageHeightVH = (100 * bodyHeightPx / window.innerHeight);

function spawnSnow(amount) {
    for (let i = 0; i < amount; i++) {
        let snowflake = document.createElement('img')
        let draw = Math.floor(Math.random() * 3) + 1
        let result = draw === 1 ? "red" : draw === 2 ? "blue" : "white"
        snowflake.src = `media/${result}_confetti.png`
        snowflake.className = 'snowflake'
        heroDiv.appendChild(snowflake)
    }
}

// Append style for each snowflake to the head
function addCss(rule) {
    let css = document.createElement('style');
    css.textContent += rule
    document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100) {
    return Math.floor(Math.random() * value) + 1;
    // returns a number in range [1-100]
}

function randomIntRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    // used for fall duration
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
    // used for randomYoyoTime
}

// Create style for snowflake
function spawnSnowCSS(snowDensity = 200) {
    let snowflakeName = "snowflake";
    let rule = ``;

    for (let i = 1; i < snowDensity; i++) {
        let randomX = Math.random() * 90; // vw
        let randomOffset = Math.random() * 10 // vw;
        let randomXEnd = randomX + randomOffset;
        let randomXEndYoyo = randomX + (randomOffset / 2);
        let randomYoyoTime = getRandomArbitrary(0.3, 0.8);
        let randomYoyoY = randomYoyoTime * pageHeightVH; // vh
        let randomScale = Math.random();
        let fallDuration = randomIntRange(10, pageHeightVH / 10 * 3); // s
        let fallDelay = randomInt(pageHeightVH / 10 * 3) * -1; // s

        rule += `
        .${snowflakeName}:nth-child(${i}) {
            transform: translate(${randomX}vw, -10px) scale(${randomScale});
            animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
        }
        @keyframes fall-${i} {
            ${randomYoyoTime * 100}% {
                transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
            }
            to {
                transform: translate(${randomXEndYoyo}vw, ${pageHeightVH}vh) scale(${randomScale});
            }
        }
        `
    }
    addCss(rule);
}

// start snow
snowBtn.addEventListener("click", function () {
    if (heroDiv.querySelectorAll(".snowflake").length) {
        for (let i of document.querySelectorAll(".snowflake")) {
            heroDiv.removeChild(i)
        }
    }
    else {
        spawnSnowCSS(snowflakeCount)
        spawnSnow(snowflakeCount)
    }
})