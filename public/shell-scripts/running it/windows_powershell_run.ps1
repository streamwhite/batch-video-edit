# run this script in PowerShell


# Step 1: Install dependencies
Write-Output "Installing dependencies..."
npm install

# Step 2: Build the project
Write-Output "Building the project..."
npm run build

# Step 3: Start the project
Write-Output "Starting the project..."
Start-Process "npm" "run start"

# Step 4: Open the project in the default web browser
Write-Output "Opening http://localhost:3000/ in the default web browser..."
Start-Process "http://localhost:3000/"

Write-Output "Project setup and started successfully."
