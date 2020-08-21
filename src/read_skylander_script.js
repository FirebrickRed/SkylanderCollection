const url = 'https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/skylander';

const buildTable = data => {
  let content = `
    <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Skylander Name</th>
      <th>Element</th>
      <th>Type</th>
      <th>Game</th>
      <th>Series</th>
      <th></th>
      <th></th>
    </tr>
  `;

  data.forEach(element => {
    content += `
      <tr>
        <td>${element.skylanderId}</td>
        <td>${element.name}</td>
        <td>${element.skylanderName}</td>
        <td>${element.element}</td>
        <td>${element.type}</td>
        <td>${element.game}</td>
        <td>${element.series}</td>
        <td><a href='editSkylander.html?id=${element.skylanderId}'>edit</a></td>
        <td>delete</td>
      </tr>
    `;
  });

  document.getElementById('data_table').innerHTML = content;
};

const getAllData = () => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      buildTable(data);
    })
    .catch(err => console.log(err));
}

if(document.getElementById('data_table')){
  getAllData();
}