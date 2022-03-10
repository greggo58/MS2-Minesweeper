$(document).ready(function () {
    console.log('DOM loaded');

    // find the div with class 'grid'
    const grid = $('.grid');

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