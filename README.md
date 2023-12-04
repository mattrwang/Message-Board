# Message Board

## Overview

This is an application that allows users from all over the world to post to the same message board. It supports account creation and logging in, as well as deleting your own posts.

### Required Components

The components for the required parts of the challenge are Form, Message, and MessageStack.

- Form takes in the message that the user wants to send, ensures it is of valid length, and then communicates with Supabase, a database manager, to insert the message, the date and time, and the username into the database.
- MessageStack communicates with Supabase as well and retrieves all the information from the messages table. It then makes the corresponding number of Message components by passing each message's information as props.
- Message takes in the string, date/time, and user as props from MessageStack and creates a styled message box. It also communicates with Supabase to support an additional feature of being able to delete your own posts. It does this by checking if the user who created the post is the same as the user logged in, and if so, it includes a delete button that removes the entry from Supabase.

These components all come together in App.tsx, where it organizes the components.

### Additional Components

The components for additional features are Login, SignUpScreen, LoginScreen, and UserManagement.

- Login contains the Sign Up and the Login button and control whether LoginScreen and SignUpScreen appear on the screen by handling the actions after the buttons are clicked.
- LoginScreen and SignUpScreen both communicate with Supabase. SignUpScreen takes in two inputs, a username and a password, ensure that they are of valid length and valid entries, then insert the information into Supabase. LoginScreen also take in a username and password, check if they are valid and match to a created user, then allows the user to login if they match and sends an alert if not.
- After a user is logged in, UserManagement is used to display the username that is currently logged in, and also a Log Out button that allows the user to log out.

The way these components interact is also controlled in App.tsx. Functions are sent as props to the LoginScreen and SignUpScreen components to retrieve the username, and then the username is sent to UserManagement to display.

## Requirements

My project fulfills all requirements.

- Users are able to type a message and then hit Send for it to appear on the Message Board.
  - Empty messages and messages over 128 characters are not sent.
- All users can see all previous messages from most to least recent.
- Users on different computers are able to see the exact same messages and are able to post to the same Message Board. This is achieved by using a database and fetching all previous messages when the app is loaded, and it listens for realtime changes and updates it accordingly when messages are added/deleted.

## Running the Application

### Running locally:

- Run `npm install`
- Run `npm start`

### Using a link:

- Go to https://mattrwang-messageboard.netlify.app/

## Additional Features

I added:

- A user management system where users can create accounts, log in, post under their username, and delete their own posts
- A profanity filter
- Hitting "Enter" on your keyboard sends a message or logs you in
- Deploying and hosting my application
