process.on('message', (msg) => {
  const result = getRandom(msg);
  process.send(result);

  setTimeout(() => {
    process.exit();
  }, 5000);
});

const getRandom = (cant) => {
  const numberArray = [];
  for (let i = 0; i < cant; i++) {
    numberArray.push(Math.floor(Math.random() * 1000) + 1);
  }
  //contar cuantas veces salió cada numero
  return numberArray.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
};

export default getRandom;
