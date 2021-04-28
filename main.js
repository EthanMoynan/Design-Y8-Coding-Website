// Typewriter effect that types out the landing page headline on load of the website (uncomment it if you want to see it)
// Really cool effect

// document.addEventListener('DOMContentLoaded', (event) => {
//     const text = ["Clean Water and Sanitation"];

//     function typeWriter(text, i, fnCallback) {
//         if(i < (text.length)) {
//             document.querySelector(".hero h1").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"><span>';
//             setTimeout(() => {
//                 typeWriter(text, i + 1,fnCallback);
//             }, 100);
//         } else if(typeof fnCallback == 'function') {
//             setTimeout(fnCallback, 700);
//         }
//     }

//     function startTypeWriter(i) {
//         if(typeof text[i] == 'undefined') {
//             setTimeout(() => {
//                 startTypeWriter(0);
//             }, 20000);
//         }
//         if(i < text[i].length) {
//             typeWriter(text[i], 0, () => {
//                 startTypeWriter(i + 1);                
//             });
//         }
//     }
//     startTypeWriter(0);
// });

// Slide Functionality for the Information Carousel in #about Section

let currentSlide = 1;

function slideToNextSlide(slideDirection) {
    document.getElementsByClassName("visible")[0].classList.remove("visible"); // remove slide with visible class
    if(slideDirection == 0) {
        // Prev
        if(currentSlide == 1) {
            currentSlide = 6;
        } else {
            --currentSlide;
        }
    } else {
        // Next
        if(currentSlide == 6) {
            currentSlide = 1;
        } else {
            ++currentSlide;
        }
    }
    document.getElementsByClassName("slide-" + currentSlide)[0].classList.add("visible"); // display currentSlide
}

// Visible Statistic Counter (runs when #stats section first appears on screen)
$(function () {
    let visibilityIds = ['.stats']; // section
    let counterClass = '.counter'; // counter target
    let defaultSpeed = 4000; // time it takes (in ms) to count to number

    $(window).on('scroll', function () {
        getVisibilityStatus();
    });

    getVisibilityStatus();
    
    // Checks if #stats section is on the screen
    function getVisibilityStatus() {
        elValFromTop = [];
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();

        visibilityIds.forEach(function (item, index) {
            try { 
                elValFromTop[index] = Math.ceil($(item).offset().top);
            } catch (err) {
                return;
            }
            if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                initCounter(item);
            }
        });
    }

    // Helper function to add the necessary classes on target
    function initCounter(groupId) {
        let num, speed, direction, index = 0;
        $(counterClass).each(function () {
            num = $(this).attr('data-TargetNum');
            speed = $(this).attr('data-Speed');
            direction = $(this).attr('data-Direction');
            easing = $(this).attr('data-Easing');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass('c_' + index);
            doCount(num, index, speed, groupId, direction, easing);
            index++;
        });
    }

    // Counting effect (had to look this one up on stack overflow :\ )
    function doCount(num, index, speed, groupClass, direction, easing) {
        let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
        if(easing == undefined) easing = "swing";
        $(className).animate({
            num
        }, {
            duration: +speed,
            easing: easing,
            step: function (now) {
                if (direction == 'reverse') {
                    $(this).text(num - Math.floor(now));
                } else {
                    $(this).text(Math.floor(now));
                }
            },
            complete: doCount
        });
    }
})