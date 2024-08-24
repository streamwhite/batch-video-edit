#!/bin/bash

# Function to install Node.js, FFmpeg, and Git on Linux using apt (Debian/Ubuntu)
install_dependencies() {
    # Update package list
    echo "Updating package list..."
    sudo apt update

    # Install Node.js
    echo "Installing Node.js..."
    sudo apt install -y nodejs npm

    # Install FFmpeg
    echo "Installing FFmpeg..."
    sudo apt install -y ffmpeg

    # Install Git
    echo "Installing Git..."
    sudo apt install -y git
}

# Install Node.js, FFmpeg, and Git
install_dependencies

# Step 1: Clone the project
echo "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-clips.git

# Step 2: Go to the project folder
echo "Navigating to the project folder..."
cd batch-video-clips

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
xdg-open http://localhost:3000/ &> /dev/null

echo "Project setup and started successfully."
