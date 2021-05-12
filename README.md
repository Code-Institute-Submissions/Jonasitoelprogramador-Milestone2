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

## Features
The site is formed of one page and has a header, footer and main body. 

# Resposive nabar 

This is contained in the header section and has a "hamburger" toggle that allows the user to access a "Home" link and an "About"
link.  The former refreshes the markers on the map and resets the "The Top 5" column (more on this below).  The "About" link 
opens up a Bootstrap modal which contains text relating to the purpose and idea behind the site.

## Title and subtitle
There is a clear title displaying the name of the site for the user to see as well as a smaller subtitle which gives more
information about the site without overloading the user.

## Map section
The map section displays a map which is used to show the location of each of the results that are returned from the 
search function.  This is achieved by placing pointers or "markers" on the map.  This allows the results to be displayed visually as well as in text format thus improving UX by 
adding to the visual intrigue of the site.  The map also obviously shows where the places/activities are 
within the city meaning the user does not need to visit another site for directions.

## Form section
The form section allows the user to input the city that they would like to search as welll as what type of place/activity 
there are looking for.  The form has two clearly labelled inputs and a submit button.  There is also a "Refresh Markers"
button which deletes any markers that have been already placed on the map and which also renews the list of results in 
the "Top 5 Results" section.

## Copyright and contact sections
Clearly displays copyright and contact information.  In the contact section there is also a link that opens an email 
platform with an email addressed to Jonasitoelprogramdor@journeyman.com.  This facilitates the user sending an email
and thus encourages the user to send an email.


`python3 -m http.server`

