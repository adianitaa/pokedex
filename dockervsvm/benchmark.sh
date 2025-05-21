#!/bin/bash

RESULTS_DIR="/app/results"
mkdir -p "$RESULTS_DIR"

echo "Ejecutando benchmark dentro del contenedor Docker..."

CPU_RESULT=$(sysbench cpu --cpu-max-prime=20000 run | grep "events per second" | awk '{print $4}')

dd if=/dev/zero of=$RESULTS_DIR/testfile bs=1M count=100 oflag=direct status=none

iperf3 -c host.docker.internal -t 5 > $RESULTS_DIR/iperf3_net.log 2>&1

MEM_USAGE=$(free -h | grep Mem | awk '{print $3 "/" $2}')
MYSQL_STATUS=$(service mysql status | grep Active || echo "MySQL no instalado o no activo")

cat << EOM > $RESULTS_DIR/benchmark_summary.txt
====== RESUMEN DE BENCHMARK - DOCKER ======
🔸 CPU (sysbench): $CPU_RESULT events/sec
🔸 Memoria usada: $MEM_USAGE
🔸 MySQL está corriendo: $MYSQL_STATUS
==============================================
EOM

echo "Benchmark en Docker terminado. Resultados en $RESULTS_DIR"