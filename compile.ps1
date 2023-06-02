Remove-Item -Recurse -Force build/ -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path build/
New-Item -ItemType Directory -Path build/assets/
Copy-Item -Path -Recurse src/html/* -Destination build/
Copy-Item -Path -Recurse src/assets/* -Destination build/assets/
tsc