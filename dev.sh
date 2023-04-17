#!/bin/bash

rm -rf build/
mkdir build/
cp src/html/* build/
tsc --watch