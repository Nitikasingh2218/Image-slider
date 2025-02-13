let nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    mountain = document.querySelector('.mountain'),
    list = document.querySelector('.list'),
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.timerunning');

let timeRunning = 3000;
let timeAutoNext = 7000;

nextBtn.onclick = function() {
    showSlider('next');
};

prevBtn.onclick = function() {
    showSlider('prev');
};

let runTimeOut;

let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

function resetTimeAnimation() {
    runningTime.style.animation = 'none';
    runningTime.offsetHeight;  // Force reflow
    runningTime.style.animation = 'runningTime 4s linear 1 forwards';
}

function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.mountain .list .item');
    if (type === 'next') {
        list.appendChild(sliderItemsDom[0]);
        mountain.classList.add('next');
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        mountain.classList.add('prev');
    }
    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        mountain.classList.remove('next');
        mountain.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
}

// Touch support for swipe functionality
let touchStartX = 0;
let touchEndX = 0;

mountain.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

mountain.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swiped left -> Next image
        showSlider('next');
    }
    if (touchEndX > touchStartX) {
        // Swiped right -> Previous image
        showSlider('prev');
    }
}
