function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
// slider

    const slider = document.querySelector(container),
    btnPrev = slider.querySelector(prevArrow),
    btnNext = slider.querySelector(nextArrow),
    current = slider.querySelector(currentCounter),
    total = slider.querySelector(totalCounter),
    slides = slider.querySelectorAll(slide),
    slidesWrapper = slider.querySelector(wrapper),
    slidesField = slider.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width;

    let id = 1;

    let offset = 0;

    if (slides.length < 10) {
        total.textContent =  `0${slides.length}`;
        current.textContent = `0${id}`;
    } else {
        total.textContent =  slides.length;
        current.textContent = id;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
    dots = [];

    function styleDots () {
    dots.forEach(dot => dot.style.opacity = '.5');
        dots[id - 1].style.opacity = 1;
    };

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;

        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    };

    btnNext.addEventListener('click', () => {
        if (offset === deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (id == slides.length) {
            id = 1;
        } else {
            id++;
        }

        if(slides.length < 10) {
            current.textContent = `0${id}`;
        } else {
            current.textContent = id;
        }
        styleDots();
    });  

    btnPrev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (id == 1) {
            id = slides.length;
        } else {
            id--;
        }

        if(slides.length < 10) {
            current.textContent = `0${id}`;
        } else {
            current.textContent = id;
        }

        styleDots();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            id = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;
            
            if(slides.length < 10) {
                current.textContent = `0${id}`;
            } else {
                current.textContent = id;
            }

            styleDots();            
        });
    });
}

export default slider;