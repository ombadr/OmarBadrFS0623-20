// change header background color on scroll

window.addEventListener('scroll', function () {
    let header = document.querySelector('header');
    let banner = document.getElementById('banner');
    let button = document.querySelector('header button');

    let bannerBottom = banner.getBoundingClientRect().bottom;
    // Check if the bottom of the banner section is above or at the top of the viewport
    if (bannerBottom <= 110) {
        // Add a class to the header to change its background color to white
        header.style.backgroundColor = 'white'
        button.style.backgroundColor = 'green';
    } else {
        // Remove the class when the banner section is visible
        header.style.backgroundColor = '#ffc017'
        button.style.backgroundColor = 'black';
    }
});


// create letter M inside the banner section

function createLetterM() {
    const nameSpaceSVG = 'http://www.w3.org/2000/svg';
    const svg = document.getElementById('container-svg');
    const existingLetters = Array.from(svg.getElementsByTagName('text')); // get the array of current letters

    let x, y;
    let attempts = 0;
    const maxAttempts = 50;
    const fontSize = 24;


    // generate random position and check if it is not overlapping
    while (true) {
        x = Math.random() * (400 - fontSize); // generate random x position
        y = Math.random() * (400 - fontSize); // generate random y position

        // check if two letters are overlapping
        const isOverlapping = existingLetters.some((letter) => {
            const letterX = parseFloat(letter.getAttribute('x'));
            const letterY = parseFloat(letter.getAttribute('y'));
            const distance = Math.sqrt((x - letterX) ** 2 + (y - letterY) ** 2); // calculate the distance between two points in a 2d plane
            return distance < fontSize;
        });

        attempts++;
        if (!isOverlapping || attempts > maxAttempts) {
            break;
        }
    }

    if (attempts <= maxAttempts) {
        const text = document.createElementNS(nameSpaceSVG, 'text'); // creat text inside the svg container
        text.setAttribute('x', x); // set x position
        text.setAttribute('y', y); // set y position
        text.setAttribute('font-size', fontSize); // set font size
        text.setAttribute('fill', 'black'); // set fill color
        text.textContent = 'M';

        svg.appendChild(text);
    } else {
        console.log(
            'Error'
        );
    }
}

function removeRandomLetter() {
    const svg = document.getElementById('container-svg');
    const existingLetters = Array.from(svg.getElementsByTagName('text')); // get the array of current letters

    if (existingLetters.length > 0) {
        const randomIndex = Math.floor( // generate random index
            Math.random() * existingLetters.length
        );
        const letterToRemove = existingLetters[randomIndex]; // letter to remove from the array
        svg.removeChild(letterToRemove); // remove the letter
    }
}

setInterval(createLetterM, 500); // add new letter every 500ms
setInterval(removeRandomLetter, 1500); // remove a letter every 1.5 seconds
