import { Router } from 'express';
import userRouter from './users';
import photoRouter from './photo';

const router = new Router();

router.get('/', (req, res) => {
  res.json({
    message: 'this is a backend template',
  });
});

router.use('/users', userRouter);
router.use('/photo', photoRouter);

export default router;

