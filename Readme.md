# Project Description

● A REST api to be consumed by a mobile app, which is somewhat similar to various popular apps which tell you if a number is spam, or allow you to find a person’s name by searching for their phone number.

## Terminology and assumptions:->

● Each registered user of the app can have zero or more personal “contacts”.
● The “global database” is basically the combination of all the registered users and their personal contacts (who may or may not be registered users).

## Data to be stored for each user:

● Name, Phone Number, Email Address. 

## Registration and Profile:

● A user has to register with at least name and phone number, along with a password, before using. He can optionally add an email address.
● Only one user can register on the app with a particular phone number.
● A user needs to be logged in to do anything; there is no public access to anything.
● User’s phone contacts will be automatically imported into the app’s database - don’t need to implement importing the contacts.

## Spam:

● A user should be able to mark a number as spam so that other users can identify spammers via the global database. Note that the number may or may not belong to any registered user or a contact - it could be a random number.

## Search:

● A user can search for a person by name in the global database. Search results display the name, phone number and spam likelihood for each result matching that name completely or partially.
● Results should first show people whose names start with the search query, and then people whose names contain but don’t start with the search query.

● A user can search for a person by phone number in the global database. If there is a registered user with that phone number, show only that result. Otherwise, show all results matching that phone number completely - note that there can be multiple names for a particular phone number in the global database, since contact books of multiple registered users may have different names
for the same phone number.
● Clicking a search result displays all the details for that person along with the spam likelihood. But the person’s email is only displayed if the person is a registered user and the user who is searching is in the person’s contact list.


## To run the code, simply 

1. run the comman `npm install` 
2. then `node index.js`
3. after that use the different api to get the outcome
   
## API's are

get:- user/user `to get all the user`
post:- user/register `to register a new user`
post:- user/login `to login a user`
put:- user/addemail `to update a email address`
post:- contact/addconcat `to add a contact in the your contact list`
get:- contact/:phoneno `to get all the user who have this num in their phone-book`
get:- user/getallcontact `to get all contacts of this number`
post:- spam/markspam `to mark a number as spam`
search:- /search `to search a number or name`
