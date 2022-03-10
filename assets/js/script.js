$(document).ready(function () {
    console.log('DOM loaded');

    // find the div with class 'grid'
    const grid = $('.grid');

    // find the anchor tags from the navbar
    const anchorTags = $('ul.nav li a');

    // find reset button
    const resetButton = $('#play-again-button');

    // find instructions button
    const instructionsButton = $('#instructions-button');

    function gameReset(resetVal) {
        bombsCount = parseInt(resetVal);
        emptyCount = (dimensionWH * dimensionWH) - bombsCount;
        squares = [];
        clearInterval(timerRec);
        secondCounter = 0;
        $('#time').text(`${secondCounter}`);
        $('#flags').text(`${bombsCount}`);
        $('#game-result').text('');
        $('#game-result-div').removeClass('alert-danger');
        $('#game-result-div').removeClass('alert-success');
    }

    resetButton.click(function () {
        isGameOver = false;
        let currentLevel = $('ul.nav li a.link-primary').attr('id');
        switch (currentLevel) {
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
        // reoload squares into grid
        loadGrid();
    });

    instructionsButton.click(function () { 
        alert(`
        Welcome to Minesweeper (Replica)
        
        - Only click squares you believe to be empty of bombs!
        - Right-click squares to flag a potential bomb square
        to avoid a bad outcome ;)
        - Flag all bomb squares or click all clear ones to
        win the game!
        
        Click / touch to check a square
        Right-Click / long-touch to flag a square

        GL HF
        `);
    });

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
            // reoload squares into grid
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
        gridArray.sort(function () { return 0.5 - Math.random(); });

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
            // add event to register finger touching screen
            square.addEventListener('touchstart', onTouchSquare, true);
            // add event to register finger dragging over screen
            square.addEventListener('touchmove', onTouchSquare, true);
            // add event to register finger leaving screen
            square.addEventListener('touchend', onTouchSquare, true);

            // with each iteration the grid is filled with another square
            $(grid).append(square);
            // build out squares array to match the grid full of div squares
            squares.push(square);
        }
        // function to add bomb count numbers
        addBombs(squares);
    }

    //************************************************************************
    //touch screen capabilities
    //************************************************************************

    let timerFunc;
    let touchDuration = 500; //length of time we want the user to touch before we do something
    let touchLimitReached;
    let touchMoved = false;

    function onTouchSquare(e) {
        // cancel default behaviour, only if it can be cancelled
        if (e.cancelable) e.preventDefault();
        // if more than one finger ir touch device is touching the screen at any moment, ignore
        if (e.touches.length > 1 || (e.type == "touchend" && e.touches.length > 0))
            return;

        // mimic the touches as mouse click events
        let newEvent = document.createEvent("MouseEvents");
        let type = null;
        let touch = null;

        switch (e.type) {
            case "touchstart":
                type = "mousedown";
                touch = e.changedTouches[0];
                // initialising tests
                touchLimitReached = false;
                touchMoved = false;
                // wait for some time to register a long touch as a "right-click"
                timerFunc = setTimeout(() => {
                    // replicate touch as a mouse click event
                    // moved the newEvent into the case block to grab the newEvent for the functions
                    newEvent.initMouseEvent(type, true, true, e.window, 0,
                        touch.screenX, touch.screenY, touch.clientX, touch.clientY,
                        e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                    e.target.dispatchEvent(newEvent);
                    // right-click function
                    onLongTouch(newEvent);
                    // long touch time reached
                    touchLimitReached = true;
                }, touchDuration);
                break;
            case "touchmove":
                type = "mousemove";
                touch = e.changedTouches[0];
                // if moving finger over screen (scrolling screen), clear timer for long touch
                if (timerFunc) clearTimeout(timerFunc);
                // register finger moved over screen
                touchMoved = true;
                break;
            case "touchend":
                type = "mouseup";
                touch = e.changedTouches[0];
                // if finger lifts off clear timer
                if (timerFunc) clearTimeout(timerFunc);
                // replicate touch as a mouse click event
                // moved the newEvent into the case block to grab the newEvent for the functions
                newEvent.initMouseEvent(type, true, true, e.window, 0,
                    touch.screenX, touch.screenY, touch.clientX, touch.clientY,
                    e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                e.target.dispatchEvent(newEvent);
                /* if the long touch timer duration was not reached and the finger was not moved over the screen,
                run the click(square) function */
                if (!touchLimitReached && !touchMoved) onShortTouch(newEvent);
                break;
        }
    }

    function onLongTouch(newEvent) {
        // identify target square from the touch and run the function as though the square was right-clicked
        /* placed in try block because of Font Awesome HTML element added
        - path[0] is for no Font Awesome HTML element existing */
        try {
            const touchedId = squares[parseInt(newEvent.path[0].id)].id;
            const touchedSquare = $(`#${touchedId}`);
            rightClick(touchedSquare);
        } catch {
            const touchedId = squares[parseInt(newEvent.path[1].id)].id;
            const touchedSquare = $(`#${touchedId}`);
            rightClick(touchedSquare);
        }
    }

    function onShortTouch(newEvent) {
        // identify target square from the touch and run the function as though the square was clicked
        /* placed in try block because of Font Awesome HTML element added
        - path[0] is for no Font Awesome HTML element existing */
        try {
            const touchedId = squares[parseInt(newEvent.path[0].id)].id;
            const touchedSquare = $(`#${touchedId}`);
            click(touchedSquare);
        } catch {
            const touchedId = squares[parseInt(newEvent.path[1].id)].id;
            const touchedSquare = $(`#${touchedId}`);
            click(touchedSquare);
        }
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
    // right-click function from event listener
    //************************************************************************
    function rightClick(square) {
        // Game over? Do nothing more...
        if (isGameOver) return;
        // Square is already checked? Do nothing to the square...
        if ($(square).hasClass('checked')) return;
        // Square is already flagged? Remove '.flagged' class - vice versa
        $(square).toggleClass('flagged');
        $('#flags').text(`${bombsCount - $('.flagged').length}`);
        if ($(square).hasClass('flagged')) {
            $(square).html('<i class="fas fa-flag"></i>');
        } else {
            $(square).text('');
        }
        // all bomb squares flagged only - player has won and the game is over...
        if ($('.bomb.flagged').length === bombsCount && $('.flagged').length === bombsCount) {
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
    }

    //************************************************************************
    // function to check neighbouring squares
    //************************************************************************
    function checkNeighbour(square, currentId) {
        // are we on a square in the 1st column (West edge)?
        const isWestEdge = currentId % dimensionWH === 0;
        // are we on a square in the last column (East edge)?
        const isEastEdge = currentId % dimensionWH === dimensionWH - 1;
        // are we on a square in the 1st row (North edge)?
        const isNorthEdge = currentId < dimensionWH;
        // are we on a square in the last row (South edge)?
        const isSouthEdge = currentId > (squares.length - 1) - dimensionWH;

        // add or subtract 1 to move 1 square to the right or left, respectively
        // add or subtract dimensionWH to move 1 row to down or up, respectively

        setTimeout(() => {
            // simulate click on West square
            if (!isWestEdge) {
                const newId = squares[parseInt(currentId) - 1].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on South West square
            if (!isSouthEdge && !isWestEdge) {
                const newId = squares[parseInt(currentId) - 1 + dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on South square
            if (!isSouthEdge) {
                const newId = squares[parseInt(currentId) + dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on South East square
            if (!isSouthEdge && !isEastEdge) {
                const newId = squares[parseInt(currentId) + 1 + dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on East square
            if (!isEastEdge) {
                const newId = squares[parseInt(currentId) + 1].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on North East square
            if (!isNorthEdge && !isEastEdge) {
                const newId = squares[parseInt(currentId) + 1 - dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // // simulate click on North square
            if (!isNorthEdge) {
                const newId = squares[parseInt(currentId) - dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
            // simulate click on North West square
            if (!isNorthEdge && !isWestEdge) {
                const newId = squares[parseInt(currentId) - 1 - dimensionWH].id;
                const newSquare = $(`#${newId}`);
                click(newSquare);
            }
        }, 10);
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
