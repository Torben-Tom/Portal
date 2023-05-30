#!/bin/bash

rm -rf build/
mkdir build/
mkdir build/assets/
cp src/html/* build/
cp src/assets/* build/assets/
tsc