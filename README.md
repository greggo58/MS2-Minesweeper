# MINESWEEPER Replica!

This site hopes to show my rendition of the classic minesweeper game. The game is simplistic, and yet, so addictive. Its purpose is as a general time-waster and something of a mental stimulator.
I hope you enjoy this as much as it was fun coding it.

The base code used started from the tutorial posted by Ania and Traversy. [Build Minesweeper with JavaScript](https://www.youtube.com/watch?v=W0No1JDc6vE).

As a principal resource, I used [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).

For some ideas on ways to accomplish tasks I used the [Stackoverflow](https://stackoverflow.com/) blog site.

I used a mix of jQuery and javascript.

I had issues with GitPod and so I wrote this mainly in VS Code on my local PC.

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
...

## User Experience (UX)

-   ### User stories

    -   #### First Time Visitor Goals

        1. As a First Time Visitor, I want to easily understand the main purpose of the site and be ready to play a simple game.
        2. As a First Time Visitor, I want to be able to easily navigate throughout the site to adjust difficulty and give myself a challenge.
    -   #### Returning Visitor Goals

        1. As a Returning Visitor, I want to load the page quickly and adjust to a higher difficulty.

    -   #### Frequent User Goals
        1. As a Frequent User, I want to return each time for a quick and simple game to kill some time.

### Design Choices

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

### Testing User Stories from User Experience (UX) Section

- ### First Time Visitor Goals

    1. As a First Time Visitor, I want to easily understand the main purpose of the site and be ready to play a simple game.
        1. As a First Time Visitor, I can easily see the well-known game of Minesweeper and unserstand that the purpose is to play a simple game.
    2. As a First Time Visitor, I want to be able to easily navigate throughout the site to adjust difficulty and give myself a challenge.
        1. As a First Time Visitor, I can clearly see the navigation and action buttons and know what they will do.

- ### Returning Visitor Goals

    1. As a Returning Visitor, I want to load the page quickly and adjust to a higher difficulty.
        1. As a Returning Visitor, I see the page loading quickly and I am able to set the difficulty to my preference using the navigation.

- ### Frequent User Goals

    1. As a Frequent User, I want to return each time for a quick and simple game to kill some time.
        1. As a Frequent User, I am easily able to return to this site and play a game quickly, without setup, configuration, or too much fuss.

### Unfixed Bugs

+ Issue with smaller screen phones
    + Very difficult to touch the squares rendered on a smaller screen
    + Possible solution is a "center of mass" of the touch to identify the target

## Deployment

### GitHub Pages

The project was deployed to GitHub Pages using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/)
2. At the top of the Repository (not top of page), locate the "Settings" Button on the menu.
    - Alternatively Click [Here](https://raw.githubusercontent.com/) for a GIF demonstrating the process starting from Step 2.
3. Scroll down the Settings page until you locate the "GitHub Pages" Section.
4. Under "Source", click the dropdown called "None" and select "Master Branch".
5. The page will automatically refresh.
6. Scroll back down through the page to locate the now published site [link](https://github.com) in the "GitHub Pages" section.

### Forking the GitHub Repository

By forking the GitHub Repository we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original repository by using the following steps...

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/)
2. Under the repository name, click "Clone or download".
3. To clone the repository using HTTPS, under "Clone with HTTPS", copy the link.
4. Open Git Bash
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type `git clone`, and then paste the URL you copied in Step 3.

```
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```

7. Press Enter. Your local clone will be created.

```
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `CI-Clone`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Click [Here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository#cloning-a-repository-to-github-desktop) to retrieve pictures for some of the buttons and more detailed explanations of the above process.

## Credits

### Languages Used

-   [HTML5](https://en.wikipedia.org/wiki/HTML5)
-   [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
-   [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

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

 - Main page - [View](https://github.com/greggo58/MS2-Minesweeper/blob/main/wireframes/Minesweeper%20Wireframe.png)
