# Mootor UI components

## NavBar

Navigation bar for header and footer.

http://emi420.github.io/Mootor/demo/#uinavbar

### Header

    <header>
        <h1>Header</h1>
    </header>

* If you place a *<header>* HTML object the main html file (index.html), that will be the default header for all the views that dont have one.
* Check UINavBar for navigation elements.

### Footer

Same way you add a header, you can add a footer:

    <footer>
        <nav>
            <a class="m-button" href="#my-view">
                Go to My View
            </a>
        </nav>>
    </footer>
    
### Icons

Create navigation bars with icons:

    <header or footer>
        <nav>
            <a href="#icons">
                <span class="m-icon-map-white">
            </a>
            <a href="#icons">
                <span class="m-icon-cloud-upload-white">
            </a>
        </nav>
    </header or footer>
        

## Icons

Include the icons CSS:

    <link rel="stylesheet" href="css/icons.css">

Add an icon using *m-icon-<icon>* class, this way:

    <span class="m-icon-map"></span>

White color:

* m-icon-\<icon>-white

    <span class="m-icon-map-white"></span>

2 more sizes:

* m-icon-\<icon>-small
* m-icon-\<icon>-large

    <span class="m-icon-map-large"></span>

Color and size:

* m-icon-\<icon>-large-white

    <span class="m-icon-map-large-white"></span>


A **free collection of 87 icons**, 2 colors, 3 sizes, with media queries for HD screens.

* https://mootor.voolks.com/uiicons/
* https://github.com/emi420/Mootor/tree/master/source/img/icons/black/32x32
* http://emi420.github.io/Mootor/demo/#icons

## Text

You can put text on the content area and use the default styles for H1, H2, H3 ,H4, H5, H6, p, a, strong, q and blockquote.

http://emi420.github.io/Mootor/demo/#text

## Buttons

Add the *m-button* class to an element and use the color and styles system, this way:

* .m-button.m-button-primary.m-button-outline

You can combine all this options for buttons:

* m-button
* m-button-primary
* m-button-success
* m-button-warning
* m-button-info
* m-button-danger
* m-button-clear
* m-button-block
* m-button-outline
* m-button-block
* m-button-fullwidth
* m-button-small

http://emi420.github.io/Mootor/demo/#buttons

### Icons

    <button class="m-button m-button-danger">
      <span class="m-icon-chat-small-white"></span>
      Add a comment
    </button>


## Colors

You can add foreground, background or border colors, this way:

* m-bg-color-\<background color>
* m-border-color-\<border color>
* m-color-\<foreground color>

The color name must be one of each:

* gray
* primary
* success
* warning
* info
* danger

For example

    <h2 class="m-color-success">Success!</h2>

And each one has 4 more options: 

* lighter
* light
* dark
* darker

For example:

    <button class="m-button m-bg-success-lighter">Success!</button>

Other useful colors are:

* black
* cream
* white
* transparent


http://emi420.github.io/Mootor/demo/#colors

## Navigation list

For a simple navigation list, use *m-list* class

    <nav class="m-list">
        <a href="#chat">
            <span class="m-icon-chat"></span>
            Chat now
        </a>
        <a href="#my-account">
            <span class="m-icon-ok-circle"></span>
            My account
        </a>
    </nav>


## Form

A simple form will be:

    <form class="m-form m-padding">
        <div class="m-field">
            <label>Text</label>
            <input class="m-text" placeholder="Text here" />
        </div>
    </form>

Using *m-padding* class you can add a default padding to any element.

For top labels:

    <fieldset class="m-form-top-labels">
        ... your form here ...
    </fieldset>

http://emi420.github.io/Mootor/demo/#form

### Input text

    <div class="m-field">
        <label>Text</label>
        <input class="m-text" placeholder="Text here" />
    </div>

#### Without label

    <div class="m-field">
        <input class="m-text" placeholder="Text without label" />
    </div>

### Textarea

    <div class="m-field">
        <label>TextArea</label>
        <textarea class="m-textarea" placeholder="Text here"></textarea>
    </div>

### Select

    <div class="m-field">
        <label for="select2">Select</label>
        <select class="m-select" id="select2" placeholder="Select...">
            <option value="01">Option 1</option>
            <option value="02">Option 2</option>
            <option value="03">Option 3</option>
        </select>
    </div>

### Checkboxes and radio buttons

    <div class="m-field">
        <input id="checkbox1" checked="true" value="Check value 2" type="checkbox" class="m-checkbox" />
        <label for="checkbox1">Multiple check 1</label>
        <input id="checkbox2" value="Check value 2" type="checkbox" class="m-checkbox" />
        <label for="checkbox2">Multiple check 2</label>
        <input id="checkbox3" value="Check value 3" type="checkbox" class="m-checkbox" />
        <label for="checkbox3">Multiple check 2</label>
    </div>

    <div class="m-field">
        <input name="radiogroup2" id="radio4" checked="true" value="01" type="radio" class="m-option" />
        <label for="radio4">Other radio 1</label>
        <input name="radiogroup2" id="radio5" value="02" type="radio" class="m-option" />
        <label for="radio5">Other radio 2</label>
    </div>

### Other controls

        
    <div class="m-field">
        <label>Date</label>
        <input type="date" class="m-date" placeholder="Date here" />
    </div>

    <div class="m-field">
        <label>Time</label>
        <input class="m-time" type="time" placeholder="Time here" />
    </div>

    <div class="m-field">
        <label>Month</label>
        <input type="month" class="m-date" type="time" placeholder="Month here" />
    </div>
    
    <div class="m-field">
        <label>Phone</label>
        <input type="tel" class="m-text" placeholder="Phone here" />
    </div>

    <div class="m-field">
        <label>E-mail</label>
        <input type="email" class="m-text" placeholder="E-mail here" />
    </div>

    <div class="m-field">
        <label>Number</label>
        <input type="number" class="m-text" placeholder="Number here" />
    </div>

## Custom form controls

### Camera single

    <div class="m-field">
        <label>Camera single</label>
        <input type="file" class="m-camera-single" accept="image/*" placeholder="Sample picture" />
        <img class="m-camera-single-img" src="" />
    </div>

This control can be used to take pictures with a camera. After a picture is taken, it can be updated or cancelled. If you run this app on a device using Apache Cordova, install Camera and File plugins, so the pictures can be taken using the Cordova plugin and saved on the app storage. 

### Geo

    <div class="m-field">
        <label>Geolocation</label>
        <input type="text" class="m-geo m-button-block m-button-outline m-button" value="Search location" />
    </div>

Get location values. If using Apache Cordova, install the Geolocation plugin.

### Draw

    <div class="m-field">
        <label>Draw</label>
        <input class="m-draw" accept="image/*" type="file" />
        <img id="draw1" src="" title="Draw" />
    </div>
        
Simple canvas for drawing, useful for signatures.

