import express from 'express';
const router= express.Router();
import { loginUser,AdduserRole, myprofile} from '../controllers/auth.js';
import { isAuth } from '../middlewares/isAuth.js';
  
  router.post('/login',loginUser);
  router.put("/add/role",isAuth,AdduserRole);
  router.get("/me", isAuth, myprofile);
export default router;
