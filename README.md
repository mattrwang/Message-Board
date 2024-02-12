# Message Board

## Overview

This is an application that allows users from all over the world to post to the same message board. It supports account creation and logging in, as well as deleting your own posts.

## Features

- Users are able to type a message and then hit Send for it to appear on the Message Board.
  - Empty messages and messages over 128 characters are not sent.
- All users can see all previous messages from most to least recent.
- Users on different computers can see the same messages and can post to the same Message Board. This is achieved by using a database and fetching all previous messages when the app is loaded, and it listens for real-time changes and updates it accordingly when messages are added/deleted.

## Running the Application

### Running locally:

- Run `npm install`
- Run `npm start`

### Using a link:

- Go to https://mattrwang-messageboard.netlify.app/
