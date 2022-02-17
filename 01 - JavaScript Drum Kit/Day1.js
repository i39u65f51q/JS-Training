window.addEventListener('keydown', function(e){
    console.log(e);
    const key = this.document.querySelector(`div[data-key="${e.keyCode}"]`)
    const audio = this.document.querySelector(`audio[data-key="${e.keyCode}"]`)
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
})
function removeTransistion(e){
    e.target.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(function(item){
    item.addEventListener('transitionend', removeTransistion)
})