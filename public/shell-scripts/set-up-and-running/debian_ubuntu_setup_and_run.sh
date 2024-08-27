#!/bin/bash

# Function to install Node.js, FFmpeg, and Git on Linux using apt (Debian/Ubuntu)
install_dependencies() {
    # Update package list
    echo "Updating package list..."
    sudo apt update

    # Install Node.js and npm if not already installed
    if ! command -v node &> /dev/null; then
        echo "Installing Node.js and npm..."
        sudo apt install -y nodejs npm
    else
        echo "Node.js and npm are already installed."
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

echo "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-edit.git

cd batch-video-edit

echo "Installing dependencies..."
npm install

echo "Building the project..."
npm run build

echo "Starting the project..."
npm run start &

echo "Opening http://localhost:3000/ in the default web browser..."
xdg-open http://localhost:3000/ &> /dev/null

echo "Project setup and started successfully."
