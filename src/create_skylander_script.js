const xhr = new XMLHttpRequest();
const url =
  "https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/skylander";
let currentSkylanderId = "";

xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    window.location.href = "readSkylanderData.html";
  }
};

const postJSONData = (event) => {
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  let data = JSON.stringify({
    skylanderId: currentSkylanderId,
    name: document.getElementById("name").value,
    skylanderName: document.getElementById("skylanderName").value,
    element: document.getElementById("element").value,
    type: document.getElementById("type").value,
    game: document.getElementById("game").value,
    series: document.getElementById("series").value,
    image: document.getElementById("image").value,
  });

  xhr.send(data);
};

const urlQuery = new URLSearchParams(window.location.search);

if (document.getElementById("creatingSkylander")) {
  if (urlQuery.has("id")) {
    const id = urlQuery.get("id");
    fetch(`${url}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        currentSkylanderId = data.skylanderId;
        // document.getElementById(
        //   "id"
        // ).innerHTML = `skylanderId: ${data.skylanderId}`;
        document.getElementById("name").value = data.name;
        document.getElementById("skylanderName").value = data.skylanderName;
        document.getElementById("element").value = data.element;
        document.getElementById("type").value = data.type;
        document.getElementById("game").selectedIndex = data.game-1;
        document.getElementById("series").value = data.series;
        document.getElementById("image").value = data.image;
        document
          .getElementById("submit")
          .addEventListener("click", postJSONData);
      })
      .catch((err) => console.log(err));
  } else {
    document.getElementById("submit").addEventListener("click", postJSONData);
  }
}
