# run this script in PowerShell

# Step 1: Clone the project
Write-Output "Cloning the project..."
git clone https://github.com/streamwhite/batch-video-edit.git

# Step 2: Go to the project folder
Write-Output "Navigating to the project folder..."
Set-Location batch-video-edit

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
