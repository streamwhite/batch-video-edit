#!/bin/bash

# Function to install Node.js, FFmpeg, and Git on Fedora-like Linux using dnf
install_dependencies() {
    # Update package list
    echo "Updating package list..."
    sudo dnf update -y

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        # Install Node.js
        echo "Installing Node.js..."
        sudo dnf install -y nodejs npm
    else
        echo "Node.js is already installed."
    fi

    # Check if FFmpeg is installed
    if ! command -v ffmpeg &> /dev/null; then
        # Install FFmpeg
        echo "Installing FFmpeg..."
        sudo dnf install -y ffmpeg
    else
        echo "FFmpeg is already installed."
    fi

    # Check if Git is installed
    if ! command -v git &> /dev/null; then
        # Install Git
        echo "Installing Git..."
        sudo dnf install -y git
    else
        echo "Git is already installed."
    fi

    # Check if xdg-utils is installed
    if ! command -v xdg-open &> /dev/null; then
        # Install xdg-utils
        echo "Installing xdg-utils..."
        sudo dnf install -y xdg-utils
    else
        echo "xdg-utils is already installed."
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
