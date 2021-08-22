# MINESWEEPER Replica!

This site hopes to show my rendition of the classic minesweeper game. The game is simplistic, and yet, so addictive. Its purpose is as a general time-waster and something of a mental stimulator.
I hope you enjoy this as much as it was fun coding it.

The base code used started from the tutorial posted by Ania and Traversy. [Build Minesweeper with JavaScript](https://www.youtube.com/watch?v=W0No1JDc6vE).

I then added in some touch screen functionalities (mobile first approach) and extra flairs with flag counters, a timer, and best time tracker, and a reset button.

I used a mix of jQuery and javascript.

### Existing Features

+ __Navigation Bar__

    + Main page title with a false navigation list for all of the levels.
    + The buttons are be styled in such a way to make it easily distinguishable which page you are on and to provide context to the content on the page below.
    + The buttons have an on-hover event with radial shadow
    + The navigation buttons are large and coloured separately to make them easy to select on mobile devices.
    + Use of device navigation is unnecessary as the navigation is intuitive and easy to understand.

+ __Game Settings Area__

    + Timer
        + Seconds-only timer
    + Flags
        + Flags to mark bombs (equal to bomb count)
        + If all flags are used but some flagged squares are not bombs, the game will not end. If more flags are used the flag counter goes into negative numbers
    + Best time
        + Records the timer value at game end if less than the original time.
    + Reset button
        + Resets grid
    + Instructions alert
        + Pop up alert with simple instructions for player

+ __Minesweeper Grid__

    + Hidden game result message that shows success or failure depending on game outcome
    + Grid div filled with small square divs (wrapped at 10 divs)

### Features Left to Implement

## Design Choices

+ Very basic page design and colouring (Bootstrap) to rather place the focus on the minesweeper grid.
+ Page header is the title and navbar.
+ Main section is the game parameters above the mine grid (mobile)
    + Desktop screen shows the game parameters on the left.
+ Minesweeper squares are styled to be similar to the original minesweeper squares.
    + Raised bevel for unclicked squares
    + Flagged squares show a blue flag icon with a light-blue background and remain as raised bevels.
        + No further action can occur unless the square is unflagged
    + Revealed bombs are no longer beveled and have a dark red bomb icon with a light yellow background.
    + Checked squares without bombs have no bevels and are green in the background.
        + The numbers in the squares (showing amount of neighbouring bombs) are standard black text.

## Testing

### Validator Testing

+ HTML passed
    + [W3Schools HTML](https://validator.w3.org/#validate_by_input)
+ CSS passed
    + [W3Schools CSS](https://jigsaw.w3.org/css-validator/#validate_by_input)
+ Javascript passed (ES6 and ES10 warnings ignored)
    + [Beautify Tools](https://beautifytools.com/javascript-validator.php)

### Unfixed Bugs

+ Issue with smaller screen phones
    + Very difficult to touch the squares rendered on a smaller screen
    + Possible solution is a "center of mass" of the touch to identify the target

## Deployment

Coming soon...

## Credits

### Reference Sites

+ [GitHub](https://github.com/)
+ [GitPod](https://gitpod.io/)
+ [Bootstrap](https://getbootstrap.com/)
+ [Font Awesome](https://fontawesome.com/)
+ [Google Fonts](https://fonts.google.com/)
+ [cdjns](https://cdnjs.com/)

### Content

+ README file help
    + [Code Institute README Template](https://github.com/Code-Institute-Solutions/readme-template)
    + [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
    + [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

### Media

### Wireframes
