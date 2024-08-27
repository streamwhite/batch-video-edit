# Set-ExecutionPolicy Bypass -Scope Process -Force

# run this script in PowerShell with administrator privileges

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
