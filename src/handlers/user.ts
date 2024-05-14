import prisma from "../db";

/**
 *
 * @param req Get all users
 * @param res
 */
export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.json({ data: users });
};

/**
 * @param req Get user by id
 * @param res
 */
export const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: user });
};

/**
 *
 * @param req update user
 * @param res
 */
export const updateUser = async (req, res) => {
  const updated = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
      phonenumber: req.body.phoneNumber,
    },
  });

  res.json({ data: updated });
};

/**
 *
 * @param req delete user
 * @param res
 */
export const deleteUser = async (req, res) => {
  const deleted = await prisma.user.delete({
    where: {
        id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
