# PowerShell Script to Auto-Push Changes to Git
param (
    [string]$Message = "Update madrasa system"
)

git add .
git commit -m "$Message"
git push origin main

Write-Host "Successfully pushed to GitHub: https://github.com/mannanimuhsin-sys/madrasa" -ForegroundColor Green
