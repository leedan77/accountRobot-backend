import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import http from 'https';

const upload = multer({ dest: 'pic/' });
const photoRouter = new Router();

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  const request = http.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', (err) => { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

photoRouter.post('/', (req, res, next) => {
  console.log(req.body);
  if (req.body.photoUrl !== undefined) {
    const stream = fs.createWriteStream("pic/tasks.txt");
    const photo = req.body;
    
    const id = photo.id;
    const url = photo.photoUrl;
    const dest = `pic/${id}`;
    stream.write(`${id}\n`);
    download(url, dest, (err) => {
      if (err) console.log(err);
    });
    
    stream.end();
    
  } else {
    next();
  }
});

export default photoRouter;
