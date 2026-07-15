const { Jimp } = require('jimp');

async function changeColor() {
  try {
    const imgPath = './src/assets/Logo 3DUTOPIA 2 tes.png';
    const image = await Jimp.read(imgPath);

    image.color([
      { apply: 'hue', params: [-20] }
    ]);

    await image.write('./src/assets/Logo 3DUTOPIA 2 tes.png');
    console.log('Logo color reverted successfully back to yellow!');
  } catch (error) {
    console.error('Error:', error);
  }
}

changeColor();
