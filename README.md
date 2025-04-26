# README #

**Gestion de suplencias 662**  
Aplicación backend desarrollada con [Express.js](https://expressjs.com/)

### Requisitos previos
- [Node.js](https://nodejs.org/) instalado (v14 o superior recomendado)
- [npm](https://www.npmjs.com/) (v6 o superior)

### Instalación
1. Clonar el repositorio desde https://bitbucket.org/applicacionesmoviles/backend662/src/main/
2. npm install
3. Ejecutar desde terminal la carga de departamentos y ciudades de ./src/utils/populateDatabase.js:
   node node src/utils/node src/utils/populateDatabase.js
4. npm run dev

### Consideraciones
Verificar variables de entorno en .env para apuntar a conexiones locales o de producción según corresponda.
Verificar llamada en package.json según corresponda ejecutar dev.js o index.js (este ultimo usado para deploy en Vercel).