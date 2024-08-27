#!/bin/bash

echo "Starting the project..."
npm run start &

# Step 4: Open the project in the default web browser
echo "Opening http://localhost:3000/ in the default web browser..."
xdg-open http://localhost:3000/ &> /dev/null

echo "Project setup and started successfully."
