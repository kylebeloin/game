import { Direction } from "@/utils";
import { Settings } from "@/settings";

const options = {
  resizeWidth: Settings.grid.tileSize,
};

async function WalkingDownAnimation(image: HTMLImageElement) {
  const sprites = await Promise.all([
    createImageBitmap(image, 0, 0, 64, 64, options),
    createImageBitmap(image, 64, 0, 64, 64, options),
    createImageBitmap(image, 128, 0, 64, 64, options),
    createImageBitmap(image, 192, 0, 64, 64, options),
  ]).then((sprites) => {
    return sprites;
  });
  return sprites;
}

async function WalkingLeftAnimation(image: HTMLImageElement) {
  const sprites = await Promise.all([
    createImageBitmap(image, 0, 64, 64, 64, options),
    createImageBitmap(image, 64, 64, 64, 64, options),
    createImageBitmap(image, 128, 64, 64, 64, options),
    createImageBitmap(image, 192, 64, 64, 64, options),
  ]).then((sprites) => {
    return sprites;
  });
  return sprites;
}

async function WalkingRightAnimation(image: HTMLImageElement) {
  const sprites = await Promise.all([
    createImageBitmap(image, 0, 128, 64, 64, options),
    createImageBitmap(image, 64, 128, 64, 64, options),
    createImageBitmap(image, 128, 128, 64, 64, options),
    createImageBitmap(image, 192, 128, 64, 64, options),
  ]).then((sprites) => {
    return sprites;
  });
  return sprites;
}

async function WalkingUpAnimation(image: HTMLImageElement) {
  const sprites = await Promise.all([
    createImageBitmap(image, 0, 192, 64, 64, options),
    createImageBitmap(image, 64, 192, 64, 64, options),
    createImageBitmap(image, 128, 192, 64, 64, options),
    createImageBitmap(image, 192, 192, 64, 64, options),
  ]).then((sprites) => {
    return sprites;
  });
  return sprites;
}

export const getSprites = async (image: HTMLImageElement) => {
  return await Promise.all([
    WalkingDownAnimation(image),
    WalkingLeftAnimation(image),
    WalkingRightAnimation(image),
    WalkingUpAnimation(image),
  ]).then((sprites) => {
    return {
      [Direction.Down]: sprites[0],
      [Direction.Left]: sprites[1],
      [Direction.Right]: sprites[2],
      [Direction.Up]: sprites[3],
    };
  });
};
