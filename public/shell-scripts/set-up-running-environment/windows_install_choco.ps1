

# Step 1: Set the execution policy to allow the script to run
Set-ExecutionPolicy Bypass -Scope Process -Force

# Step 2: Download and execute the Chocolatey installation script
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Step 3: Verify the installation
choco
