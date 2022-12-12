const snowBtn = document.getElementById("snow-btn")
const heroDiv = document.getElementById('hero')

snowBtn.addEventListener("click", function () {
    let snowflake = document.createElement('img')
    snowflake.src = 'media/snowflake.png'
    snowflake.className = 'snowflake'
    snowflake.style.right = `${Math.random() * window.innerWidth}px`
    heroDiv.appendChild(snowflake)
})