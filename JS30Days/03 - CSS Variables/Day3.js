const inputs = document.querySelectorAll('input')
//Event Listener
inputs.forEach(input => input.addEventListener('change', eventHandler));
inputs.forEach(input => input.addEventListener('mousemove', eventHandler));
//function 
function eventHandler(){
    const sizing = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing );
}