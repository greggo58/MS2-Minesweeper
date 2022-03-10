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

    //************************************************************************
    // click function from click event listener
    //************************************************************************

    let secondCounter = 0;

    let timerRec;

    function gameTimer() {
        let seconds = Math.floor(secondCounter);
        $('#time').text(`${Math.floor(seconds / 100)}`);
        secondCounter++;
    }

    function click(square) {
        let currentId = $(square).attr('id');

        if ($('.checked').length < 1) timerRec = setInterval(gameTimer, 10);

        // Game over? Do nothing more but show bombs...
        if (isGameOver) return;
        // Square is already checked / flagged? Do nothing to the square...
        if ($(square).hasClass('checked') || $(square).hasClass('flagged')) return;
        /* Was a bomb square clicked? Game over.
        If not, insert a number if a bomb is in a nearby square or
        simulate a click on a 'zero' total square and repeat */
        if ($(square).hasClass('bomb')) {
            clearInterval(timerRec);
            // this will show all other bombs
            $('.bomb').html('<i class="fas fa-bomb"></i>');
            $('.bomb').css('color', 'darkred');
            $('.bomb').css('border-style', 'inset');
            $('.bomb').css('background-color', 'lightgoldenrodyellow');
            $('.flagged').css('background-color', 'lightskyblue');
            $('#game-result').text('BOOM! Game over! :(');
            $('#game-result-div').addClass('alert-danger');
            console.log('Game over, try again!');
            isGameOver = true;
        } else {
            let total = $(square).attr('data');

            if (total != 0) {
                // square is checked with a normal / left click
                $(square).addClass('checked');
                $('.checked').css('border-style', 'inset');
                // show the number of bombs in immediate surrounding squares
                $(square).text(total);
                // if all possible squares are checked, player has won and the game is over...
                if ($('.empty.checked').length === emptyCount) {
                    clearInterval(timerRec);
                    if (parseInt($('#best').text()) === 0) {
                        $('#best').text(parseInt($('#time').text()));
                    } else if (parseInt($('#time').text()) < parseInt($('#best').text())) {
                        $('#best').text(parseInt($('#time').text()));
                    }
                    $('#game-result').text('YAY! Game over, you win!');
                    $('#game-result-div').addClass('alert-success');
                    console.log('Game over, you win!');
                    isGameOver = true;
                }
                // return out the function...
                return;
            }
            // no bombs in the immediate surrounding squares (i.e. total = 0)? Check all the neighbours...
            checkNeighbour(square, currentId);
            // consider this square as checked
            $(square).addClass('checked');
            $('.checked').css('border-style', 'inset');
        }
    }

    //************************************************************************
    // add bomb count to squares surrounding bombs
    //************************************************************************
    function addBombs(squares) {
        for (i in squares) {
            i = parseInt(i);

            // are we on a square in the 1st column (West edge)?
            const isWestEdge = i % dimensionWH === 0;
            // are we on a square in the last column (East edge)?
            const isEastEdge = i % dimensionWH === dimensionWH - 1;
            // are we on a square in the 1st row (North edge)?
            const isNorthEdge = i < dimensionWH;
            // are we on a square in the last row (South edge)?
            const isSouthEdge = i > (squares.length - 1) - dimensionWH;

            // initialise total bombs
            total = 0;

            // add or subtract 1 to move 1 square to the right or left, respectively
            // add or subtract dimensionWH to move 1 row to down or up, respectively

            //only count bombs in empty squares, then return the number in the innerHTML
            if (squares[i].classList.contains('empty')) {
                // bomb on West square? - Cannot be on West Edge because no West square exists there!
                if (!isWestEdge && squares[i - 1].classList.contains('bomb')) total++;
                // bomb on South West square? - Cannot be on West / South Edge because no West / South square exists there!
                if (!isSouthEdge && !isWestEdge && squares[i - 1 + dimensionWH].classList.contains('bomb')) total++;
                // bomb on South square? - Cannot be on South Edge because no South square exists there!
                if (!isSouthEdge && squares[i + dimensionWH].classList.contains('bomb')) total++;
                // bomb on South East square? - Cannot be on South East Edge because no South East square exists there!
                if (!isSouthEdge && !isEastEdge && squares[i + 1 + dimensionWH].classList.contains('bomb')) total++;
                // bomb on East square? - Cannot be on East Edge because no East square exists there!
                if (!isEastEdge && squares[i + 1].classList.contains('bomb')) total++;
                // bomb on North East square? - Cannot be on North East Edge because no North / East square exists there!
                if (!isNorthEdge && !isEastEdge && squares[i + 1 - dimensionWH].classList.contains('bomb')) total++;
                // bomb on North square? - Cannot be on North Edge because no North square exists there!
                if (!isNorthEdge && squares[i - dimensionWH].classList.contains('bomb')) total++;
                // bomb on North West square? - Cannot be on North West Edge because no North / West square exists there!
                if (!isNorthEdge && !isWestEdge && squares[i - 1 - dimensionWH].classList.contains('bomb')) total++;
                squares[i].setAttribute('data', total);
            }
        }
    }

    //************************************************************************
    // test mode activation to see bombs || when clicking a bomb
    //************************************************************************
    let showBombs = false;

    if (showBombs) {
        $('.bomb').html('<i class="fas fa-bomb"></i>');
        $('.bomb').css('color', 'darkred');
    }

});