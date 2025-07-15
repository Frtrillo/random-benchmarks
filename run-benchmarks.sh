#!/bin/bash

# Usage: ./run-benchmarks.sh [iterations]
ITER=${1:-10000}

set -e

# Node.js/Bun benchmark
echo "=== Node.js/Bun Benchmark ==="
bun run ./nodejs-or-bun/jwt-bench.js $ITER

echo ""
echo "=== Java Benchmark ==="
# Compile Java (assumes dependencies in lib/ and source in java/)
javac -cp "lib/*" java/App.java -d java/
# Run Java benchmark
java -cp "lib/*:java/" com.mycompany.app.App $ITER 