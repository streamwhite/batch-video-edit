#!/bin/bash



# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the project
echo "Building the project..."
npm run build

# Step 3: Start the project
echo "Starting the project..."
npm run start &

# Step 4: Open the project in the default web browser
echo "Opening http://localhost:3000/ in the default web browser..."
open http://localhost:3000/

echo "Project setup and started successfully."
