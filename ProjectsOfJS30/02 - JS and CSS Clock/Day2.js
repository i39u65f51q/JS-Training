const second = document.querySelector('.second-hand')
const minute = document.querySelector('.min-hand')
const hour = document.querySelector('.hour-hand')

function setClock(){
    const now = new Date()
    const secondDeg = now.getSeconds() * 6 
    const minuteDeg = now.getMinutes() * 6 + now.getSeconds() * 6 / 60
    const hourDeg = now.getHours() * 30 + now.getMinutes() * 30 / 60

    second.style.transform = `rotate(${secondDeg}deg)`
    minute.style.transform = `rotate(${minuteDeg}deg)`
    hour.style.transform = `rotate(${hourDeg}deg)`
} 
setClock();
setInterval(setClock,1000);