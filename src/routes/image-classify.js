import { Router } from 'express';
import fs from 'fs';
import http from 'https';
import { classifyImage } from '../../controllers/classifyScript';

const imageRouter = new Router();

imageRouter.post('/', (req, res, next) => {
  console.log(req.body);
  if (req.body.photoUrl !== undefined) {
    const url = req.body.photoUrl;
    classifyImage(url);
    const result = fs.readFileSync('torch/result.txt', 'utf8');
    res.json({ result });
  }
});

export default imageRouter;
