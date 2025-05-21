# Usa una imagen base liviana con Node
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto de la app
COPY . .

# Compila la app para producción
RUN npm run build

# Expone el puerto 3000 (el default en Next.js)
EXPOSE 3000

# Comando para arrancar la app
CMD ["npm", "start"]
