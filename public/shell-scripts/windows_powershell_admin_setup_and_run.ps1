# Function to install Chocolatey if not already installed
function Install-Chocolatey {
    if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
        Write-Output "Installing Chocolatey..."
        Set-ExecutionPolicy Bypass -Scope Process -Force
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
        Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    } else {
        Write-Output "Chocolatey is already installed."
    }
}

# Function to install a package using Chocolatey
function Install-PackageIfNotInstalled {
    param (
        [string]$packageName
    )
    if (-not (choco list --local-only | Select-String $packageName)) {
        Write-Output "Installing $packageName..."
        choco install $packageName -y
    } else {
        Write-Output "$packageName is already installed."
    }
}

# Install Chocolatey
Install-Chocolatey

# Install Node.js, FFmpeg, and Git
Install-PackageIfNotInstalled -packageName "nodejs"
Install-PackageIfNotInstalled -packageName "ffmpeg"
Install-PackageIfNotInstalled -packageName "git"

# Step 1: Clone the project
Write-Output "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-edit.git

# Step 2: Go to the project folder
Write-Output "Navigating to the project folder..."
Set-Location batch-video-clips

# Step 3: Install dependencies
Write-Output "Installing dependencies..."
npm install

# Step 4: Build the project
Write-Output "Building the project..."
npm run build

# Step 5: Start the project
Write-Output "Starting the project..."
Start-Process "npm" "run start"

# Step 6: Open the project in the default web browser
Write-Output "Opening http://localhost:3000/ in the default web browser..."
Start-Process "http://localhost:3000/"

Write-Output "Project setup and started successfully."
