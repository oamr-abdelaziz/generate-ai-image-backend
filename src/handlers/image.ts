import prisma from "../db";

/**
 *
 * @param req Get all images
 * @param res
 */
export const getImages = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      images: true,
    },
  });

  res.json({ data: user.images });
};

/**
 * @param req Get image by Id
 * @param res
 */
export const getImageById = async (req, res) => {
  const id = req.params.id;
  const image = await prisma.image.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: image });
};

/**
 *
 * @param req create image
 * @param res
 */
export const createImage = async (req, res, next) => {
  try {
    const image = await prisma.image.create({
      data: {
        url: req.body.url,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: image });
  } catch (e) {
    next(e);
  }
};

/**
 *
 * @param req update image
 * @param res
 */
export const updateImage = async (req, res) => {
  const updated = await prisma.image.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      url: req.body.url,
    },
  });

  res.json({ data: updated });
};

/**
 *
 * @param req delete image
 * @param res
 */
export const deleteImage = async (req, res) => {
  const deleted = await prisma.image.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });

  res.json({ data: deleted });
};
