const video = document.querySelector('.viewer')
const playButton = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('.skip')
const progressBar = document.querySelector('.progress__filled')
const ranges = document.querySelectorAll('.player__slider')
const progress = document.querySelector('.progress')

//function
function togglePlay(){
    if(video.paused){
        video.play();
        playButton.innerText = '❚ ❚';
     }else{
         video.pause();
         playButton.innerText = '►' ;
     }
}
function handleProgress(){
    let videoTime = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${videoTime}%`;
    
}
function handleRangeUpdate(){
    video[this.name] = this.value;
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e.offsetX, progress.offsetWidth );
}

//Event
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)

playButton.addEventListener('click', togglePlay)
window.addEventListener('keyup',(e)=>{
    // console.log(e);
    if(e.keyCode == 32){
        togglePlay();
    }
})

skipButtons.forEach((button) => {
    button.addEventListener('click', ()=>{
        video.currentTime += parseInt(button.dataset.skip);
    })
})

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub)
progress.addEventListener('mousedown', ()=> mousedown = true)
progress.addEventListener('mousemove', () => {
    if(mousedown){
        scrub();
    }
})
progress.addEventListener('mouseup', () => mousedown = false)