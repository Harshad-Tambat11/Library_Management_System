# Library_Management_System

  this is library management API Backend for the management of user and the books

# Routs and Endpoints 

## /users

GET: Get all the list of users in system
POST: Create/Register a new user

## /users/{id}

GET: Get a user by ID
PUT: Updating a user by their ID
DELETE: Deleting a user by thier ID (Check if the still has an issued book) && (is there any fine/penalty to be collected)

## /users/subscription-details/{ID}

GET: Get a user subscription details bu their ID >> Date of subscription >> Valid till ? >> Fine if any ?

## /books

GET: Get all the books in system
POST: Add a new book to the system

## /books/{id}

GET: Get s book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID

## /books/issued

GET: Get all the issued books 

## /books/issued/withFine

GET: Get all issued books with thei fine amount

### Subscription Types
    
    >> Basic (3 months)
    >> standard (6 months)
    >> Premium (12 months)

> > If a user missed the renewal date, then user should be collecten with ₹100
> > If a user missed the subscription, then user is expected to pay ₹100
> > If a user missed both renewal & subscription, then the collected amount should be ₹200


# commands:

npm init
npm i express
npm i nodemon --save-dev


npm run dev

to restore the node_modyle and package-lock.json --> npm i/npm install 
