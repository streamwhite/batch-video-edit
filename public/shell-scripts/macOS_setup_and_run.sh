#!/bin/bash

# Function to install Homebrew if not already installed
install_homebrew() {
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    else
        echo "Homebrew is already installed."
    fi
}

# Function to install a package using Homebrew
install_package() {
    local package=$1
    if ! brew list $package &> /dev/null; then
        echo "Installing $package..."
        brew install $package
    else
        echo "$package is already installed."
    fi
}

# Install Homebrew
install_homebrew

# Install Node.js, FFmpeg, and Git
install_package "node"
install_package "ffmpeg"
install_package "git"

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
