# Slider

Demo: https://netscriptpl.github.io/slider/

## Requirements
* jQuery

## User guide

#### Creating new slider

Add some style to your slider.
```html
<link rel="stylesheet" href="slider.css">
```

Create your slider anywhere you want.
```html
<div id="mySlider" class="slider">
    <div class="slider-elements-wrapper">
        <!-- Controls to slide left/right -->
        <div class="slide slide-left"><img src="img/arrow-left.png" alt="slide left"></div>
        <div class="slide slide-right"><img src="img/arrow-right.png" alt="slide right"></div>
        
        <div class="slider-elements">
            <!-- Add your own slides here -->
            <div class="slider-element">
                <img src="img/server.png" alt="survival działki">

                <h4>Slide #0</h4>
            </div>
        </div>
    </div>

    <!-- Slide indicators will be automatically created here -->
    <div class="controls"></div>
</div>
```

#### Initializing slider

```javascript
const sliderElement = document.getElementById('mySlider');

const slider = new Slider(sliderElement, 5); // 5 = slider elements visible
slider.init();
```

You can also set interval to automatically slide elements
```javascript
setInterval(function() {
    slider.slideRight();
}, 7000);
```

#### Slider functions

Slide left
```javascript
slider.slideLeft();
```

Slide right
```javascript
slider.slideLeft();
```

Slide to chosen slide (slides start counting from 0)
```javascript
slider.slideTo(3);
```
