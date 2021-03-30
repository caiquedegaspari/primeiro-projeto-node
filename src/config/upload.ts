import path from 'path'; // direto do node, para padronizar os caminhos para diretórios
import crypto from 'crypto' //direto do node,para gerar hashs
import multer from 'multer'; //biblioteca para fazer os uploads

const tmpFolder = path.resolve(__dirname,'..','..','tmp');

export default {
  directory:tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename (request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null,filename);
    },
  }),
};