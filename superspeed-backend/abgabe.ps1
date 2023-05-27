param(
  [Parameter(Mandatory=$true)]
  [String]$assignmentName,
  [Parameter(Mandatory=$true)]
  [String]$studentName
)
$source = [System.Environment]::CurrentDirectory
$destination = Split-Path -Path $source -Parent
$destination = "${destination}\${assignmentName}_${studentName}_$(get-date -f yyyy-MM-dd)"
write-output $destination

$exclude=@(".angular", "node_modules",".idea")
Get-ChildItem $source |
           where { $_.Name -notin $exclude} |
              Compress-Archive -DestinationPath $destination -Update



