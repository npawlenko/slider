/**
 * @copyright 2021 netscript.pl
 * @author blinkz8 <kontakt@netscript.pl>
 * @license MIT
 *
 * @website https://netscript.pl
 * @link https://github.com/netscriptpl
 */
class Slider {
    static get directionLeft() { return 'left'; }
    static get directionRight() { return 'right'; }


    constructor(Slider, visibleElements) {
        this.slider = Slider;
        this.toSee = visibleElements;

        if(visibleElements < 1)
            throw new Error('visibleElements should be greater than 0');
        if(visibleElements % 2 == 0)
            throw new Error('visibleElements should be odd');
    }

    init() {
        const controls = this.slider.querySelector('.controls'),
            elements = this.slider.querySelectorAll('.slider-element');

        this.center = this.toSee < elements.length ? Math.round((this.toSee-1)/2) : Math.round((elements.length-1)/2);

        for(let j=0; j<elements.length; j++) {
            // Create controls
            let c = document.createElement('span');
            c.dataset.slide = j.toString();
            c.classList.add('control');

            // Init element
            if(j == this.center) {
                c.classList.add('active');
                elements[j].classList.add('active');
            }
            controls.appendChild(c);


            if(this.toSee-1 < j)
                elements[j].style.display = 'none';

            elements[j].dataset.slide = j.toString();
            elements[j].style.maxWidth = (100/this.toSee)+'%';
        }


        // Add event listeners
        let $this = this;
        this.slider.querySelectorAll('.slide-left').forEach(function(element) {
            element.addEventListener('click', $this.slideLeft.bind($this));
        });
        this.slider.querySelectorAll('.slide-right').forEach(function(element) {
            element.addEventListener('click', $this.slideRight.bind($this));
        });
        this.slider.querySelectorAll('.controls .control').forEach(function(element) {
            let numSlide = element.dataset.slide;
            element.addEventListener('click', function() { $this.slideTo(numSlide) });
        });
    }

    slide(direction) {
        const activeNo = Number.parseInt(this.slider.querySelector('.controls .active').dataset.slide),
            slides = this.slider.querySelectorAll('.slider-element').length,
            elements = this.slider.querySelector('.slider-elements'),
            slider = $(this.slider),
            next = direction == Slider.directionRight ?
                        activeNo+1 > slides-1 ?
                            0 : activeNo+1
                        : direction == Slider.directionLeft ?
                            activeNo-1 < 0 ?
                                slides-1 : activeNo-1
                        : false;

        if(slides < 2 || next === false)
            return false;


        // Refresh active states
        slider.find('.control.active, .slider-element.active').removeClass('active');
        slider.find(`.control[data-slide=${ next }], .slider-element[data-slide=${ next }]`).addClass('active');

        if(direction == Slider.directionRight) {
            // Slide right
            const first = $(slider.find('.slider-element')[0]),
                firstClone = first.clone()[0];
            const firstUnvisible = this.toSee < slides-1 ? this.toSee : null,
                firstUnvisibleEl = $(slider.find('.slider-element')[firstUnvisible]);


            if(this.toSee >= slides) {
                // No unvisible elements
                first.animate({width: 'toggle'}, 100, function () {
                    // Move last
                    first.remove();
                    elements.append(firstClone);
                    $(firstClone).hide();
                    $(firstClone).animate({width: 'toggle'}, 100);
                });
            }
            else {
                // Contains unvisible elements
                first.animate({width: 'toggle'}, 100, function () {
                    first.remove();
                    elements.append(firstClone);
                    $(firstClone).hide();

                    firstUnvisibleEl.animate({width: 'toggle'}, 100);

                });
            }
        }
        else if(direction == Slider.directionLeft) {
            // Slide left
            const lastVisible = this.toSee < slides ? this.toSee-1 : slides-1;
            const last = $(slider.find('.slider-element')[slides-1]),
                lastClone = last.clone()[0];


            if(this.toSee >= slides) {
                // No unvisible elements
                last.animate({width: 'toggle'}, 100, function () {
                    // Move last
                    last.remove();

                    elements.prepend(lastClone);
                    $(lastClone).hide();
                    $(lastClone).animate({width: 'toggle'}, 100);
                });
            }
            else {
                // Contains unvisible elements
                $(slider.find('.slider-element')[lastVisible]).animate({width: 'toggle'}, 100, function () {
                    last.remove();

                    elements.prepend(lastClone);
                    $(lastClone).hide();
                    $(lastClone).animate({width: 'toggle'}, 100);
                });
            }
        }

        return true;
    }

    slideLeft() {
        return this.slide(Slider.directionLeft);
    }

    slideRight() {
        return this.slide(Slider.directionRight);
    }

    slideTo(numSlide) {
        numSlide = Number.parseInt(numSlide);

        if(this.toSee < 2)
            return;

        const slides = this.slider.querySelectorAll('.slider-element').length,
            $this = this;

        if(numSlide < 0 || numSlide > slides-1)
            throw new Error('Slide number ' + numSlide + ' doesn\'t exist');


        let activeNo = Number.parseInt(this.slider.querySelector('.controls .active').dataset.slide);
        const distanceLeft = activeNo < numSlide ? activeNo+slides-numSlide : activeNo-numSlide,
            distanceRight = activeNo > numSlide ? slides-activeNo+numSlide: numSlide-activeNo;

        if(distanceLeft >= distanceRight) {
            // slide right
            (function slideRightLoop() {
                setTimeout(function() {
                    if(activeNo != numSlide) {
                        $this.slideRight();
                        activeNo = activeNo+1 > slides-1 ? 0 : activeNo+1
                    }

                    slideRightLoop();
                }, 200);
            })();

        }
        else {
            // slide left
            (function slideLeftLoop() {
                setTimeout(function() {
                    if(activeNo != numSlide) {
                        $this.slideLeft();
                        activeNo = activeNo-1 < 0 ? slides-1 : activeNo-1
                    }


                    slideLeftLoop();
                }, 200);
            })();
        }
    }
}