const fs = require("fs");
const filePath = "./src/files/PRECIOS.txt";

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error leyendo el archivo:', err);
      return;
    }
  
    // Expresión regular para capturar los datos de cada fila
    const regex = /:\s*(\d+)\s+(.+?)\s+UNI\s+([\d.,]+)\s+([\d.,]+)\s+([\d.,]*)\s+([\d.,]+)\s+:/g;
    
    let match;
    const items = [];
  
    while ((match = regex.exec(data)) !== null) {
      // Convertir los valores numéricos a floats
      const toFloat = str => parseFloat(str.replace(/\./g, '').replace(/,/g, '.'));
  
      items.push({
        articulo: match[1].trim(),
        descripcion: match[2].trim(),
        precio: toFloat(match[3]),
        importeIva: toFloat(match[4]),
        impInt: match[5] ? toFloat(match[5]) : 0,  // Algunos valores de "Imp. Int." están vacíos
        precioFinal: toFloat(match[6])
      });
    }
  
    // Mostrar el array de objetos extraído de la tabla
    console.log(items);
  });
  