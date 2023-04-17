Remove-Item -Recurse -Force build/ -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path build/
Copy-Item -Path src/html/* -Destination build/
tsc