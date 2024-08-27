#!/bin/bash

# Go to the project directory and run this script to update the project

# Update the project
git pull origin main

# Install dependencies
npm install

# Rebuild the application
npm run build

# Start the application
npm start
