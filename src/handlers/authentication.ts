import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

/**
 * 
 * @param req Create New User (Sign Up)
 * @param res 
 * @param next 
 */
export const signup = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        phonenumber: req.body.phoneNumber,
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch(e) {

    // update more to get exact error
    e.type = 'input'
    next(e)
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "either username or passowrd is incorrect" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
