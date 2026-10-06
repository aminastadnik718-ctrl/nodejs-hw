import { Router } from 'express';


import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { updateAvatar } from '../controllers/userController.js';

const router = Router();

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateAvatar,
);

export default router;