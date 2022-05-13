//=====EXAMPLE:1=====
//Promise: Geolocation API
const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const myPosition = () => {
  //套用Promise取得的資料
  getPosition()
    .then(res => {
      console.log(res);
      const { latitude: lat, longitude: lng } = res.coords;
      //Call AJAX
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
};
// myPosition();

//=====EXAMPLE:2=====
//Promise: IMG API

const img1 = 'https://picsum.photos/300/200';
const img2 = 'https://picsum.photos/id/237/300/200';

// const wait = second => {
//   return new Promise(resolve => {
//     setTimeout(resolve, second * 1000);
//   });
// };

// const loadImgs = url => {
//   return new Promise((resolve, reject) => {
//     const div = document.querySelector('div');
//     const img = document.createElement('img');
//     img.src = url;

//     img.addEventListener('load', () => {
//       div.append(img);
//       resolve(img);
//     });
//     img.addEventListener('error', () => {
//       reject(new Error('IMG lost'));
//     });
//   });
// };
// let currentImg;

// loadImgs(img1)
//   .then(img => {
//     currentImg = img;
//     console.log(img);
//     return wait(4);
//   })
//   .then(() => {
//     currentImg.style.display = 'none';
//     return loadImgs(img2);
//   })
//   .then(img => {
//     console.log(img);
//   })
//   .catch(err => console.log(err));

//=====EXAMPLE:3=====
//Async Function (Always return Promise(pending))

const getCountry = async function () {
  try {
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const myPosition = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    ).then(res => res.json());
    console.log(myPosition);

    const myCountry = await fetch(
      `https://restcountries.com/v2/name/${myPosition.country}`
    ).then(res => res.json());
    console.log(myCountry);
    return `${myPosition.country}`;
  } catch (err) {
    console.log(err);
  }
};
// const city = getCountry();
// console.log(city);
// getCountry().then(city => console.log(city));

//=====EXAMPLE:4=====
// Promise.All
//其中一個失敗整組就會失敗

const getJSON = function (url, errorMsg = "Can't Find") {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error(`${errorMsg} ${res.status}`);
    return res.json();
  });
};
const get3countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log(data1, data2, data3);

    const data = await Promise.all([
      //return Array
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
// get3countries('Taiwan', 'Canada', 'British');

//=====EXAMPLE:5=====
// Promise.race (return Array)
//執行最快載入的其中一個Promise
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/Taiwan`),
    getJSON(`https://restcountries.com/v2/name/Japan`),
  ]);
  // console.log(res);
})();

//伺服器請求速度
const timeout = second => {
  return new Promise(reject => {
    setTimeout(() => {
      reject(new Error('Request is too long!'));
    }, second * 1000);
  });
};
//當API讀取速度小於timeout，show Error。
Promise.race([getJSON(`https://restcountries.com/v2/name/USA`), timeout(1)])
  .then(res => {
    // console.log(res);
  })
  .catch(err => console.log(err));

//=====EXAMPLE:6=====
// Promise.allSettled
//類似Promise.all，但allSettled其中一個失敗還是會返回整組。

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Sucess'),
]).then(res => console.log(res));

//=====EXAMPLE:7=====
// Promise.any
//類似Promise.race，但只會回傳成功的，不會回傳Reject

//===== Test try to load All images ======
const imgArr = [
  'https://picsum.photos/300/200',
  'https://picsum.photos/300/200',
  'https://picsum.photos/300/200',
];
const wait = sec => {
  return new Promise(resolve => {
    setTimeout(resolve, sec * 1000);
  });
};
//Methods : 1 (Promise)
const loadImage = url => {
  return new Promise((resolve, reject) => {
    const container = document.querySelector('div');
    const img = document.createElement('img');
    img.src = url;
    img.addEventListener('load', () => {
      // console.log(img);
      resolve(img);
      container.append(img);
    });
  });
};

// let currentIMg;
// loadImage(img1)
//   .then(img => {
//     console.log(img);
//     currentIMg = img;
//     return wait(4);
//   })
//   .then(res => {
//     currentIMg.style.display = 'none';
//     return loadImage(img2);
//   })
//   .then(img => {
//     console.log(img);
//     currentIMg = img;
//   });

//Methods : 2 (Async Await)
const loadParse = async function () {
  try {
    let img = await loadImage(img1);
    console.log(img);
    await wait(4);
    img.style.display = 'none';
    img = await loadImage(img2);
    await wait(4);
    // img.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};
// loadParse();

const loadAll = async imgArr => {
  try {
    const imgs = imgArr.map(async img => await loadImage(img));
    console.log(imgs);

    //從“Promise陣列"取得元素：
    const imgsElements = await Promise.all(imgs);
    console.log(imgsElements);
    imgsElements.forEach(img => {
      img.style.display = 'flex';
    });
  } catch (err) {
    log.error(err);
  }
};
loadAll(imgArr);
