# City Search

City Search is a web app that aims to make it easier for people to find well-reviewed activities and/or places in a given city.
The user will input an activity or type of place (e.g. tennis courts or Italian restaurant) and a city and will be returned a 
list of the five best-reviewed instances of said activity or type of place within the inputted city.  These results will also 
be displayed on a map.  The idea is to save the user from having to spend time sifting through a "dump" of search results by
returning the top 5 best reviewed results.

This site targets anyone who lives in a city and who enjoys discovering new places and activities.  The site is also perfect 
for tourists who want to find the best places to go quickly and easily.

The site aims to achieve its goal by having good, crisp UX which produces a positive reaction in the user, powerful and well-
designed search and filtering functionality and responsive design to allow the site to be accessed on any screen size.

## User Stories

### First-time-users
1. As a first time user, I want to have a positive emotional response when visiting the site (be impressed with the quality
 of the website) so that I am encourgaed to return.
2. As a first time user, I want to be able to easily understand the aim and idea behind the site.
3. As a first time user, I want to be able to use the search function in order to quickly find high-rated places and to 
see where these places are on a map.

### Returning-users
1.  As a first time user, I want to be able to repeatedly use the search function with running into any bugs and without 
any negative effect on UX.
2. As a Returning Visitor, I want to be able to contact the site owner and be able to find and use their social meadia links.
3. As a Returning Visitor, I want to be able to access the website on various different screen sizes and for it to evoke a 
positive response.

## Features
The site is formed of one page and has a header, footer and main body. 

### Responsive nabar 

This is contained in the header section and has a "hamburger" toggle that allows the user to access a "Home" link and an "About"
link.  The former refreshes the markers on the map and resets the "The Top 5" column (more on this below).  The "About" link 
opens up a Bootstrap modal which contains text relating to the purpose and idea behind the site.

### Title and subtitle
There is a clear title displaying the name of the site for the user to see as well as a smaller subtitle which gives more
information about the site without overloading the user.

### Map section
The map section displays a map which is used to show the location of each of the results that are returned from the 
search function.  This is achieved by placing pointers or "markers" on the map.  This allows the results to be displayed visually as well as in text format thus improving UX by 
adding to the visual intrigue of the site.  The map also obviously shows where the places/activities are 
within the city meaning the user does not need to visit another site for directions.

### Form section
The form section allows the user to input the city that they would like to search as welll as what type of place/activity 
there are looking for.  The form has two clearly labelled inputs and a submit button.  There is also a "Refresh Markers"
button which deletes any markers that have been already placed on the map and which also renews the list of results in 
the "Top 5 Results" section.

### Copyright and contact sections
Clearly displays copyright and contact information.  In the contact section there is also a link that opens an email 
platform with an email addressed to Jonasitoelprogramdor@journeyman.com.  This facilitates the user sending an email
and thus encourages the user to send an email.

### Links section
Displays icons that open up their respective social media pages in a new tab on clicking.  This allows the user to 
easily post about, share or find out additional information about the site.

### Note on APIs
This project uses two different APIs in order to provide the functionality explained above.  How these APIs are
manipulated can be observed in maps.js section of this app, however, I will briefly explain in words the role of
the APIs in this project.

### Google Maps Javascript API
This is an API provided by Google.  This project uses the Places Library within the Gmaps JS API which contains 
various functions that allow the user to search for places within a given area.  This application uses the 
TextSearch function where a search string, the coordinates of a given city and search radius are inputted 
and an array of objects is returned (the search string and city are inputted by the user).  Each object 
represents a place that matches the search string within the specified radius (in this app the radius is set to
10km).

Each object in this array of objects has both a "rating" (the average of all of the review scores for that place) 
property and a "user_ratings_total" (the number of review scores) property and this is what is used to filter the
objects.  That is, any object with a user_ratings_total of less than 15 is immediately discarded in order to 
ensure reliability of the rating values.  The five objects with the highest ratings are then selected and passed
to a function that represents these places on the site. 
Nb. If there is more than one object with the same rating value, the object(s) with a higher number of reviews is
prioritized for selection.

More information via this link: https://developers.google.com/maps/documentation/javascript/places?hl=en#TextSearchRequests.

### Open Cage Geocoding API
The second API in this project is used to transform the "city" value which is inputted via an HTML form by the user 
from a string to coordinates.  This is necessary because the Gmaps API TextSearch takes coordinates for the location
parameter in its request.

More information re this API via this link: https://opencagedata.com/api.

## Testing

### Search functionality testing
The search function and display in the app is interactive, uses two different APIs and manipulates and filters various
different data types.  This section needs to be tested robustly in order to ensure consistent functionality.
Therefore, I have devised various specific tests in order to ensure this feature is not buggy:

1. Test:  Input of a valid city and valid type of place before pressing submit.    
Result: The function returns a set of markers correctly distributed on the map as well as a list of results in the 
respective section
[(screenshot evidence)](./assets/images/screenshots/testing/preliminary-submit.png). 

2. Test: Input of a valid city and valid type of place before pressing submit (directly after first submit).  
Result: As above
[(screenshot evidence)](./assets/images/screenshots/testing/secondary-submit.png).

3. Test: Input of a string which does not correspond to a real place.  
Result: Javascript alert with "Invalid City or Type of Place"
[(screenshot evidence)](./assets/images/screenshots/testing/invalid-input.png).

4. Test: No input.   
Result: This is caught by the HTML form "required parameter"
[(screenshot evidence)](./assets/images/screenshots/testing/no-input.png).

5. Test: Click on the "refresh markers" button.  
Result: Markers, map centre and text in "The Top Five" section are refreshed.
[(screenshot evidence)](./assets/images/screenshots/testing/refresh-markers.png).

6. Test: Use the search function directly after having clicked the "refresh markers" button.  
Result: Same result as in first and second tests.

7. Test: Throughout the above tests, ensure the loading animation behaves correctly.  
Result: No issues.

### User Story Testing
1. As a first time user, I want to have a positive emotional response when visiting the site (be impressed with the quality
 of the website) so that I am encourgaed to return.
    * The website uses a variety of different fonts as well as a colour schemata in order to give the impression of quality.
    * There are various styled interactive parts of the website such as a "burger" navbar toggle and a Bootstrap modal box [(screenshot evidence)](../assets/images/screenshots/testing/navbar.png).
      There is also a hover effect on the submit and refresh marker buttons as well as on the media links.

2. As a first time user, I want to be able to easily understand the aim and idea behind the site.
    * There is a clearly labelled "About" link in the navbar which brings up a Bootstap modal with text explaining the objective
    and reasoning behind the site [(screenshot evidence)](../assets/images/screenshots/testing/modal-box.png).
    * There is a selection of media links in the footer to allow the user to quickly access social media in order to find out
    more information about the site [(screenshot evidence)](../assets/images/screenshots/testing/media-links.png).

3. As a first time user, I want to be able to use the search function in order to quickly find high-rated places and to 
see where these places are on a map.
    * Easily legible titles with high contrast so the user can locate and use interactive areas of the site.
    * Intuitive form and buttons which are easily recognisable across the web.
    * HTML and Javascript alerts in order to aid the user with invalid inputs.
    * Clear loading animation that is activated on clicking of the submit button demontrating to user responsiveness of the 
    site [image link](./assets/images/screenshots/testing/loader.png).

4. As a first time user, I want to be able to repeatedly use the search function with running into any bugs and without 
any negative effect on UX.
    * See Search functionality testing section of readMe for detailed description of robust testing for search functionality 
    of the app.

5. As a Returning Visitor, I want to be able to contact the site owner and be able to find and use their social meadia links.
    * The social media links are clearly displayed in the footer of the site.  There are represented by icons which make 
    them more eye-catching for the user.  In addition the icons/link change colour when hovered over.
    * There is a clearly-labelled "Contact" section which contains a link which takes the user to their email platform
    with a pre-inputted email addressed to the owner of the site.
    [media links image link](../assets/images/screenshots/testing/media-links.png)
    [contact image link](../assets/images/screenshots/testing/contact.png)

6. As a Returning Visitor, I want to be able to access the website on various different screen sizes and for it to evoke a 
positive response.
    * The site uses a combination of Bootstrap responsive design and media queries in order to ensure UX remains consistent
    and of high quality on any screen-size. 
    [image link](../assets/images/screenshots/testing/responsive-design.png)

### Automated testing
The HTML and the CSS code were put through the W3C schools HTML and CSS validators respectively to eliminated any potential syntax errors.
(HTML: https://validator.w3.org/)
(CSS: https://jigsaw.w3.org/css-validator/)

The javascript code was put through a code beautifier also to eliminate syntax errors (link:https://beautifytools.com/javascript-validator.php).

### Bugs

Bug: The "The Top 5" section would only occupy half of its intended column width after submit button was pressed when
screen width was less than 990px.  
Fix: The rightmost column in the upper Bootsrap row was not being assigned the correct width at smaller breakpoints. 
Javascript code was modified at line 53, 91 in order to rectify this.

Bug: The javascript alert that is called when the input of the "City" field is not valid was causing the loading 
animation to continue despite code removing it (the loading-screen class) from the DOM.  
Fix: A timeout of 100ms was set in order to give the JS code time to remove the loading-screen class from the
DOM before the alert prevented this from happening.     

Bug: The textsearch function would only return 20 results rather than the maximum of 60.  
Fix: I used a pagination method (JS lines 87-89) inside the callback function (JS lines 81) in order to access all 
of the returned results. 

## Technologies

### Languages

HTML5 was used in order to provide the text content the structure of the site.   
CSS3 was used to add styling.
Javascript (ECMAScript 2018) was used in order to add interactivity and to manipulate the API functionailty and 
output.

### Frameworks, Libraries and Programs

Bootstrap: was used to add responsivess and to aid with the structure of the site. 
(link: https://getbootstrap.com/docs/4.4/getting-started/introduction/)

Hover.CSS3: was used on the media links in the header and the social media links in the footer in order that they
take on a different colour when hovered over. (link: https://ianlunn.github.io/Hover/)

Google Fonts: was used in order to import one of the fonts that is used across the website ('Abril Fatface'). 
(link: https://fonts.google.com/).

Git: was used to save changes in the website's files. Gitpod terminal was used to save changes to Git and Push to send these changes to GitHub. (link: https://git-scm.com/)

GitHub: where the files are stored after being "pushed". (link: https://github.com/)

The Places Library service within the Google Maps API was used to search for different places within a given area and return the 
results. (link: https://developers.google.com/maps/documentation/javascript/places?hl=en#TextSearchRequests).

Google Maps API was used in order to display the interactive map. (link: https://developers.google.com/maps/documentation/javascript/overview?hl=en)

OpenCage Geocoding API was used to convert the string inputted by the user into coordinates. (link: https://opencagedata.com/api)

Color-Calculator was used to find a harmonious colour scheme: (link: https://www.sessions.edu/color-calculator/)

## Design

### Colour Scheme

There are three main colours: white, violet and pastel blue. These colours was chosen both for their colour harmony and to allow for high levels
of contrast for UX purposes.

### Typography

The two fonts used across the site are "Abril Fatface" and "Courier New" with backup fonts being "cursive" and "Courier, monospace" respectively.
The former is used more for titles and prominent links and the latter any other text.

## Wireframes

[Wireframes image link](./assets/images/wireframes/)

## Deployment

The project was deployed to GitHub Pages using the following steps...

Log in to GitHub and locate the GitHub Repository At the top of the Repository (not top of page), locate the "Settings" Button 
on the menu...Scroll down the Settings page until you locate the "GitHub Pages" Section. Under "Source", click the dropdown 
called "None" and select "Master Branch". The page will automatically refresh. Scroll back down through the page to locate the 
now published site link in the "GitHub Pages" section.

## Accessibility

The aim of this project with regards to accessibility is to ensure that there is text explanation across all features to build 
a site that is usable for people that use screen readers.  If a feature already has a title/text explaining its function there
is no need to add additional text.  However, in certain cases, such as in the case of the media links, there is no text explaining
the function of the link.  Therefore, an aria-label has been added to each link to explain its function.  

In addition, there are two input fields in the site, each of which corresponds to a label element.  The relationship between these
two elements can be unclear for a user with a screen reader so the class "labelledby" has been added to both of the input fields 
in order to show their relationship to their respective label elements. 

## Credits

### Content

Please set the inline comments across the CSS, HTML and JS files for any code that has been taken from third parties.  Any borrowed code is
clearly labelled as such.

### ReadMe

The "Deployment" section of the Readme file is obtained from the Code Institue SampleREADME document which can be found: (https://github.com/Code-Institute-Solutions/SampleREADME/blob/master/README.md).

Use the following code to run the project in server: `python3 -m http.server`

