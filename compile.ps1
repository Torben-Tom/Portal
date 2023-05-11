Remove-Item -Recurse -Force build/ -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path build/
New-Item -ItemType Directory -Path build/assets/
Copy-Item -Path src/html/* -Destination build/
Copy-Item -Path src/assets/* -Destination build/assets/
tsc