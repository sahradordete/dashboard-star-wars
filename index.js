const charactersContador = document.getElementById('characters');
const moonsContador = document.getElementById('moons');
const planetsContador = document.getElementById('planets');
const spaceshipsContador = document.getElementById('spaceships');

preencherContadores();
preencherTabela();

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

async function drawChart() {
  const response = await swapiGet("vehicles/");
  const vehiclesArray = response.data.results;
  console.log(vehiclesArray);

  const dataArray = [];
  dataArray.push(["Vehicles", "Passengers"]);
  vehiclesArray.forEach((vehicle) => {
    dataArray.push([vehicle.name, Number(vehicle.passengers)]);
  })


  var data = google.visualization.arrayToDataTable(dataArray);

  var options = {
    title: 'Biggest vehicles',
    legend: "none"
  };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
}

function preencherContadores() {
    Promise.all([
      swapiGet('people/'),
      swapiGet('vehicles/'),
      swapiGet('planets/'),
      swapiGet('starships/')
    ]).then(function (results) {
    console.log(results)
    charactersContador.innerHTML = results[0].data.count;
    moonsContador.innerHTML = results[1].data.count;
    planetsContador.innerHTML = results[2].data.count;
    spaceshipsContador.innerHTML = results[3].data.count;
  });
}

async function preencherTabela() {
  const response = await swapiGet("films/");
  const tableData = response.data.results;
  console.log(tableData);
  tableData.forEach((film) => {
  $("#filmsTable").append(`<tr>
  <td>${film.title}</td>
  <td>${moment(film.release_date).format("DD/MM/YYYY")}</td>
  <td>${film.director}</td>
  <td>${film.episode_id}</td>
  </tr>`);
  });
}


function swapiGet(param) {
    return axios.get(`https://swapi.dev/api/${param}`)

}
    
