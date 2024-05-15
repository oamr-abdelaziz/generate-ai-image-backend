import prisma from "../db";
import Replicate from "replicate";

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
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        numberOfTokens: true,
      },
    });

    if (user.numberOfTokens > 0) {
    //recieves image from frontend
    // send it to the api either directly or by saving it first to server

      const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
      });
      const output = await replicate.run(
        "zsxkib/instant-id:491ddf5be6b827f8931f088ef10c6d015f6d99685e6454e6f04c8ac298979686",
        {
          input: {
            image: req.body.url,
              // "https://replicate.delivery/pbxt/KIIutO7jIleskKaWebhvurgBUlHR6M6KN7KHaMMWSt4OnVrF/musk_resize.jpeg",
            // scheduler: "EulerDiscreteScheduler",
            // enable_lcm: false,
            // num_outputs: 1,
            // sdxl_weights: "stable-diffusion-xl-base-1.0",
            // output_format: "webp",
            // pose_strength: 0.4,
            // canny_strength: 0.3,
            // depth_strength: 0.5,
            // guidance_scale: 7.5,
            // output_quality: 80,
            // ip_adapter_scale: 0.8,
            // lcm_guidance_scale: 1.5,
            // num_inference_steps: 30,
            // enable_pose_controlnet: true,
            // enhance_nonface_region: true,
            // enable_canny_controlnet: false,
            // enable_depth_controlnet: false,
            // lcm_num_inference_steps: 5,
            // controlnet_conditioning_scale: 0.8
          },
        }
      );
      console.log(output[0]);
      // if we will add the image
      // const image = await prisma.image.create({
      //   data: {
      //     url: req.body.url,
      //     belongsToId: req.user.id,
      //   },
      // });

      res.json({ data: output[0] });
    }
    else {
      let error = Error("no tokens left")
      next(error);
    }
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
