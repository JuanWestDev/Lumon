const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const totalSlides = slides.length;

function updateCarousel(){
    console.log(`Current Index: ${currentIndex}`); // Debug: Check the current index
    console.log(`TranslateX: -${currentIndex * 100}%`); // Debug: Check the transform value
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

updateCarousel();

nextBtn.addEventListener('click', () =>{
    currentIndex = (currentIndex + 1) % totalSlides; //Loop back to the first slide
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop to the last slide
    updateCarousel();
});