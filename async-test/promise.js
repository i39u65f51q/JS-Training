//同步
// function sync() {
//   console.log(1);
//   setTimeout(time2, 5000);
//   setTimeout(time3, 2000);
// }
// function time2() {
//   console.log(2);
// }
// function time3() {
//   console.log(3);
// }
// sync();

//Promise寫法：
// const myPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Succ');
//     reject('Error');
//   }, 1000);
// });

// myPromise
//   .then(succ => {
//     console.log(succ);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//多個Promise處理方式：
const task1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Succ1');
    }, 1000);
  });
};
const task2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Succ2');
    }, 1000);
  });
};
const task3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Succ3');
    }, 1000);
  });
};

//完整性 Promise.ALL：
Promise.all([task1(), task2(), task3()]).then(
  succ => {
    console.log(succ);
  },
  err => {
    console.log(err);
  }
);

// 順序性：
// task1()
//   .then(succ => {
//     console.log(succ);
//     return task2();
//   })
//   .then(succ => {
//     console.log(succ);
//     return task3();
//   });
