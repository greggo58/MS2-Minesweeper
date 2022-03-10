$(document).ready(function () {
    console.log('DOM loaded');

    // find the div with class 'grid'
    const grid = $('.grid');

    // find the anchor tags from the navbar
    const anchorTags = $('ul.nav li a');

    // iterating over each anchor tag, add the Event Listener
    for (anchorTag of anchorTags) {
        anchorTag.addEventListener('click', function (e) {
            // cancel default behaviour, only if it can be cancelled
            if (e.cancelable) e.preventDefault();
            let currentLevelBefore = $('.link-primary').attr('id');
            // add class 'link-primary' (only if it does not exist) for my selected navbar link (blue)
            $(e.target).toggleClass('link-primary', true);
            // remove class 'link-dark' (only if it exists) for my selected navbar link (dark gray)
            $(e.target).toggleClass('link-dark', false);
            // new game
            isGameOver = false;
            switch (e.target.id) {
                case 'Easy':
                    gameReset(10);
                    break;
                case 'Medium':
                    gameReset(15);
                    break;
                case 'Hard':
                    gameReset(20);
                    break;
                case 'Insane':
                    gameReset(25);
                    break;
                default:
                    alert('Unidentified link');
            }
            // clear grid of squares
            grid.children().remove();
            // reload squares into grid
            loadGrid();
            /* get the anchor tag cousins - look up to parent (li), get sibling (li) tags,
            list the anchor tag children per sibling */
            anchorCousins = $(e.target).parent().siblings('li').children('a');
            // for each cousin do the reverse
            for (let anchorCousin of anchorCousins) {
                // remove class 'link-primary' (only if it exists) for my selected navbar link (blue)
                $(`#${anchorCousin.id}`).toggleClass('link-primary', false);
                // add class 'link-dark' (only if it exists) for my selected navbar link (dark gray)
                $(`#${anchorCousin.id}`).toggleClass('link-dark', true);
            }
            let currentLevelAfter = $('.link-primary').attr('id');
            if (currentLevelBefore !== currentLevelAfter) $('#best').text('0');
        });
    }

    //************************************************************************
    // initialization
    //************************************************************************

    // dimensionWHensions of grid
    let squares = [];
    let dimensionWH = 10;

    // count of bombs and empty squares = total squares (dimensionWH * dimensionWH)
    let bombsCount = parseInt('10');
    let emptyCount = (dimensionWH * dimensionWH) - bombsCount;

    // Time

    // Flags
    $('#flags').text(`${bombsCount}`);
    $('#best').text(`0`);

    // Game Over?
    let isGameOver = false;

    //************************************************************************
    // build grid
    //************************************************************************

    // function to build grid from squares array
    function loadGrid() {
        // create array of bomb 'squares'
        bombsArray = Array(bombsCount).fill('bomb');
        // create array of empty 'squares'
        emptyArray = Array(emptyCount).fill('empty');
        // concatenate above arrays into a grid array
        gridArray = emptyArray.concat(bombsArray);

        // shuffle the grid array evenly
        gridArray.sort(function () {
            return 0.5 - Math.random();
        });

        // build all the required divs (total divs = dimensionWH * dimensionWH)
        for (let i = 0; i < dimensionWH * dimensionWH; i++) {
            // define a square as a div
            const square = document.createElement('div');
            // give each div (square) a unique id per the iteration of i
            $(square).attr('id', i);
            // add class 'empty' / 'bomb' depending on gridArray position [i]
            $(square).addClass(gridArray[i]);
            // add event to register normal / left click
            square.addEventListener('click', function () {
                // execute click function
                click(square);
            });
            // add event to register context menu / right click
            square.addEventListener('contextmenu', function (e) {
                // prevent right-click / context menu popping up
                e.preventDefault();
                // execute right-click function
                rightClick(square);
            });
            
            // with each iteration the grid is filled with another square
            $(grid).append(square);
            // build out squares array to match the grid full of div squares
            squares.push(square);
        }
        // function to add bomb count numbers
        addBombs(squares);
    }

    
    // run function to build grid on page
    loadGrid();

});