import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "./modules/middleware";
import { createImage, deleteImage, getImageById, getImages, updateImage } from "./handlers/image";
import { deleteUser, getUserById, getUsers, updateUser } from "./handlers/user";

//add a validation file and use it here or add inline input validation

const router = Router();

/**
 * User
 */
router.get("/users",getUsers);

router.get("/users/:id", getUserById);
router.put("/users/:id", body("phonenumber").isNumeric(), handleInputErrors, updateUser);
router.delete("/users/:id", deleteUser);

/**
 * Image
 */
router.get("/image", getImages);
router.get("/image/:id",getImageById);
router.put("/image/:id",updateImage);
router.post("/image", body("url").isString(), handleInputErrors, createImage);
router.delete("/image/:id",deleteImage);

router.use((err, req, res, next)=> {
  if(err.type === 'auth') {
      res.status('401').json({message: 'unauthorized'})
  } else if (err.type === 'input') {
      res.status('400').json({message: 'invalid input'})
  } else {
      res.status('500').json({message: 'server error'})
  }
})

export default router;
