const server = require("./api/server");

const port = 9000;

// START YOUR SERVER HERE / SUNUCUNUZU BURADA BAŞLATIN
server.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
