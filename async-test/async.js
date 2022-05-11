async function run() {
  return 'hello';
}
async function fail() {
  throw 'error';
}

(async () => {
  //step 1
  let a = await run();
  //step 2
  try {
    let b = await failed();
  } catch (e) {
    console.log(e);
  }
  //step 3
  let c = await failed();
})();
