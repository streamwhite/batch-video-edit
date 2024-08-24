#!/bin/bash

# Function to install Node.js, FFmpeg, and Git on Linux using apt (Debian/Ubuntu)
install_dependencies() {
    # Update package list
    echo "Updating package list..."
    sudo apt update

    # Install curl if not already installed
    if ! command -v curl &> /dev/null; then
        echo "Installing curl..."
        sudo apt install -y curl
    else
        echo "curl is already installed."
    fi

    # install nvm
    if ! command -v nvm &> /dev/null; then
        echo "Installing nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh  | bash
        . ~/.bashrc
    else
        echo "nvm is already installed."
    fi

    # Install Node.js if not already installed
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js..."
        nvm install --lts
        nvm use --lts
    else
        echo "Node.js is already installed."
    fi


    # Install FFmpeg if not already installed
    if ! command -v ffmpeg &> /dev/null; then
        echo "Installing FFmpeg..."
        sudo apt install -y ffmpeg
    else
        echo "FFmpeg is already installed."
    fi

    # Install Git if not already installed
    if ! command -v git &> /dev/null; then
        echo "Installing Git..."
        sudo apt install -y git
    else
        echo "Git is already installed."
    fi
}

# Install Node.js, FFmpeg, and Git
install_dependencies

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
xdg-open http://localhost:3000/ &> /dev/null

echo "Project setup and started successfully."
