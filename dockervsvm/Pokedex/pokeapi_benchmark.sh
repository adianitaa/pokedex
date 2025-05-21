#!/bin/bash

echo "🚀 Iniciando pruebas de rendimiento de tu app Next.js con PokéAPI..."

URL="http://localhost:3000/api/pokemon"  # Cambiá esto si usás otro endpoint
COUNT=50

# Archivos de salida
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
CSV_FILE="resultados_benchmark_${TIMESTAMP}.csv"
TXT_FILE="resumen_benchmark_${TIMESTAMP}.txt"

# Encabezado del CSV
echo "Petición,Duración(ms)" > "$CSV_FILE"

total_time=0
max_time=0
min_time=1000000

echo "📡 Haciendo $COUNT peticiones a $URL..."
for i in $(seq 1 $COUNT); do
  start=$(date +%s%3N)
  curl -s -o /dev/null $URL
  end=$(date +%s%3N)
  duration=$((end - start))

  total_time=$((total_time + duration))
  if [ $duration -gt $max_time ]; then max_time=$duration; fi
  if [ $duration -lt $min_time ]; then min_time=$duration; fi

  echo "$i,$duration" >> "$CSV_FILE"
  echo "⏱️  $i: $duration ms"
done

avg_time=$((total_time / COUNT))

# Guardar resumen
echo "====== RESUMEN DE BENCHMARK ======" > "$TXT_FILE"
echo "🔗 URL probada: $URL" >> "$TXT_FILE"
echo "🔁 Cantidad de peticiones: $COUNT" >> "$TXT_FILE"
echo "📈 Tiempo promedio: $avg_time ms" >> "$TXT_FILE"
echo "🔼 Máximo: $max_time ms" >> "$TXT_FILE"
echo "🔽 Mínimo: $min_time ms" >> "$TXT_FILE"
echo "🕒 Fecha: $(date)" >> "$TXT_FILE"
echo "==================================" >> "$TXT_FILE"

echo
echo "✅ Benchmark completado."
echo "📁 Resultados guardados en:"
echo "   - 📊 $CSV_FILE"
echo "   - 📝 $TXT_FILE"
