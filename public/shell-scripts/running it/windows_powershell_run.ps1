# go to the project directory and run this script

# run this script in PowerShell

Write-Output "Starting the project..."
Start-Process "npm" "run start"

Write-Output "Opening http://localhost:3000/ in the default web browser..."
Start-Process "http://localhost:3000/"

Write-Output "Project setup and started successfully."
