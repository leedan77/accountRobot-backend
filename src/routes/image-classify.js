import { Router } from 'express';
import fs from 'fs';
import http from 'https';
import { classifyImage } from '../controllers/classifyScript';

const imageRouter = new Router();

imageRouter.post('/', (req, res) => {
  console.log(req.body);
  if (req.body.photoUrl !== undefined) {
    const url = req.body.photoUrl;
    classifyImage(url);
    let result = fs.readFileSync('../torch/result.txt', 'utf8');
    result = result.split('\n');
    res.json({ result });
  }
});

export default imageRouter;
