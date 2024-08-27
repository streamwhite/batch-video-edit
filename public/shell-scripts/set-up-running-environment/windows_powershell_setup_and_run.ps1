# Set-ExecutionPolicy Bypass -Scope Process -Force

# run this script in PowerShell with administrator privileges

# install Chocolatey and verify the installation
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
choco --version

# Function to check if a package is installed and install it if not
function Install-ChocoPackageIfNotInstalled {
    param (
        [string]$packageName
    )

    $package = choco list --local-only | Select-String $packageName
    if (-not $package) {
        Write-Output "Installing $packageName..."
        choco install $packageName -y
    } else {
        Write-Output "$packageName is already installed."
    }
}

# Check and install Git
Install-ChocoPackageIfNotInstalled -packageName "git"

# Check and install Node.js (which includes npm)
Install-ChocoPackageIfNotInstalled -packageName "nodejs"

# Check and install FFmpeg
Install-ChocoPackageIfNotInstalled -packageName "ffmpeg-full"

# Clone the project
Write-Output "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-edit.git

# Change the working directory to the project directory
Write-Output "Changing the working directory to the project directory..."
cd "batch-video-edit"

Write-Output "Installing dependencies..."
npm install

Write-Output "Building the project..."
npm run build

Write-Output "Starting the project..."
Start-Process "npm" "run start"

Write-Output "Opening http://localhost:3000/ in the default web browser..."
Start-Process "http://localhost:3000/"

Write-Output "Project setup and started successfully."
