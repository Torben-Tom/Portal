Remove-Item -Recurse -Force build/ -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path build/
New-Item -ItemType Directory -Path build/assets/
Copy-Item -Recurse -Path src/html/* -Destination build/
Copy-Item -Recurse -Path src/assets/* -Destination build/assets/
tsc