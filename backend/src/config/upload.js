const multer = require('multer');
const path = require('path');

module.exports = {
  //Necessário para se lidar com imagens, pois express não tem essa capacidade nativamente
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'), // .. -> não necessita de colocar barras pois já entende qual é o SO envolvido e qual o formato correto de caminho de pastas
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(
        null,
        /* `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}` */
        `${name}-${Date.now()}${ext}`
      );
    },
  }),
};
