# Speichert stdout und stderr in Dateien
vercel deploy > deployment-url.txt 2> error.txt

# Überprüft den Exit-Code
$code = $?
if ($code -eq 0) {
    # Verwendung der Deployment-URL aus stdout für den nächsten Schritt des Workflows
    $deploymentUrl = Get-Content deployment-url.txt
    vercel alias $deploymentUrl wostbrot.de
} else {
    # Fehlerbehandlung
    $errorMessage = Get-Content error.txt
    Write-Output "Es gab einen Fehler: $errorMessage"
}
