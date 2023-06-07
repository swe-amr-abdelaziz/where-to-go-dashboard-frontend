const slides = document.querySelectorAll('.slide')
const arrows = document.querySelectorAll('.arrow')
const body = document.body

let i = 0
setBgToBody()
arrows.forEach((arrow) => {
  arrow.addEventListener('click', () => {
    slides.forEach((slide) => {
      slide.classList.remove('active')
    })
    if (arrow.classList.contains('left-arrow')) {
      i--
      if (i < 0) {
        i = slides.length - 1
      }
      slides[i].classList.add('active')
    } else {
      i++
      if (i >= slides.length) {
        i = 0
      }
      slides[i].classList.add('active')
    }
    setBgToBody()
  })
})

function setBgToBody() {
  body.style.backgroundImage = slides[i].style.backgroundImage
}
