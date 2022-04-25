const url =
  'http://api.weatherapi.com/v1/current.json?key=87f95b1f1cba48228b043348222504&q=Taiwan';

function getdataFromJSON() {
  fetch(url, {
    method: 'GET',
  })
    .then(succ => succ.json())
    .then(data => weatherInfo(data));
}
function weatherInfo(item) {
  const weather = `
    <h4>Location Info:</h4>
    <h5>Name:${item.location.name}</h5>
    <h5>LocalTime:${item.location.localtime}</h5>
    <h5>Temperature C:${item.current.temp_c}</h5>
    <h5>Temperature F:${item.current.temp_f}</h5>
    <img src="${item.current.condition.icon}" alt="icon" />`;

  const itemWrap = document.querySelector('.item');
  itemWrap.innerHTML = weather;
}
getdataFromJSON();
