#!/bin/bash

# Step 1: Clone the project
echo "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-edit.git

# Step 2: Go to the project folder
echo "Navigating to the project folder..."
cd batch-video-edit

# Step 3: Install dependencies
echo "Installing dependencies..."
npm install

# Step 4: Build the project
echo "Building the project..."
npm run build

# Step 5: Start the project
echo "Starting the project..."
npm run start &

# Step 6: Open the project in the default web browser
echo "Opening http://localhost:3000/ in the default web browser..."
open http://localhost:3000/

echo "Project setup and started successfully."
