const { Jimp, rgbaToInt } = require('jimp');

async function removeWhiteBg() {
  try {
    const imgPath = './src/assets/Logo 3DUTOPIA 2 tes.png';
    const image = await Jimp.read(imgPath);

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      if (red > 240 && green > 240 && blue > 240) {
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.write('./src/assets/Logo 3DUTOPIA 2 tes.png');
    console.log('Background removed successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

removeWhiteBg();
