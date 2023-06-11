#!/bin/sh

rm -rf build/
mkdir build/
mkdir build/assets/
cp -r src/html/* build/
cp -r src/assets/* build/assets/
tsc