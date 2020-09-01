import "./styles/style.scss";
import "./read_skylander_script";
import "./create_skylander_script";
const xhr = new XMLHttpRequest();
const url =
  "https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/skylander";
const collectionURL =
  "https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/user/collection";
const wishListURL =
  "https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/user/wishlist";

const getAllSkylanders = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allSkylanders = data;
      if (document.getElementById("allSkylanders")) {
        renderSkylanders(data);
        renderModalButtons();
      }
    })
    .catch((err) => console.log(err));
};

const populateOtherSkylanders = () => {
  const userCollectionUrl = `https://ghaxe3clq5.execute-api.us-east-2.amazonaws.com/Test/user/${
    JSON.parse(atob(localStorage.user.split(".")[1])).sub
  }`;
  fetch(userCollectionUrl)
    .then((response) => response.json())
    .then((data) => {
      let collectedSkylanders = [];
      let wishlistSkylanders = [];
      data.wishlistSkylanders.L.forEach((skylander) => {
        let object = {
          element: skylander.M.element.S,
          game: skylander.M.game.S,
          image: skylander.M.image.S,
          name: skylander.M.name.S,
          series: skylander.M.series.S,
          skylanderId: skylander.M.skylanderId.S,
          skylanderName: skylander.M.skylanderName.S,
          type: skylander.M.type.S,
        };
        wishlistSkylanders.push(object);
      });
      data.collectedSkylanders.L.forEach((skylander) => {
        let object = {
          element: skylander.M.element.S,
          game: skylander.M.game.S,
          image: skylander.M.image.S,
          name: skylander.M.name.S,
          series: skylander.M.series.S,
          skylanderId: skylander.M.skylanderId.S,
          skylanderName: skylander.M.skylanderName.S,
          type: skylander.M.type.S,
        };
        collectedSkylanders.push(object);
      });
      if (document.getElementById("collection-view-all")) {
        getCollection(collectedSkylanders);
        getWishList(wishlistSkylanders);
      } else if (document.getElementById("skylandersCollection")) {
        renderSkylanders(collectedSkylanders);
      } else if (document.getElementById("skylandersWishList")) {
        renderSkylanders(wishlistSkylanders);
      }
      collectionOfSkylanders = collectedSkylanders;
      wishlistOfSkylanders = wishlistSkylanders;
      renderModalButtons();
    })
    .catch((err) => console.log(err));
};

let allSkylanders;
let collectionOfSkylanders;
let wishlistOfSkylanders;
getAllSkylanders();
populateOtherSkylanders();

const addSkylanderToRender = (skylander, headerSize) => `
  <div id='${skylander.skylanderName}' class='individual-skylander border-${skylander.element}'>
    <img class='individual-skylander-pic' src='${skylander.image}' />
    <${headerSize} class='title'>${skylander.name}</${headerSize}>
  </div>
`;

//If user is logged in or not display appropreate cards
if (document.getElementById("index-holder")) {
  const loggedIn = `
    <a class="card" href="skylandersCollection.html">
      <h3>My Collection</h3>
    </a>
    <a id="view-all" class="card" href="./allSkylanders.html">
      <h3>View All Skylanders</h3>
    </a>
    <a class="card" href="profile.html">
      <h3>My Profile</h3>
    </a>
  `;
  const notLoggedIn = `
    <a class="card" href="https://skylanderslogin.auth.us-east-2.amazoncognito.com/signup?response_type=token&client_id=3ji2631ri9svh40ne024kgta6c&redirect_uri=http://localhost:3000/">
      <h3>Sign Up</h3>
    </a>
    <a id="view-all" class="card" href="./allSkylanders.html">
      <h3>View All Skylanders</h3>
    </a>
    <a class="card" href="https://skylanderslogin.auth.us-east-2.amazoncognito.com/login?response_type=token&client_id=3ji2631ri9svh40ne024kgta6c&redirect_uri=http://localhost:3000/">
      <h3>Log In</h3>
    </a>
  `;
  const logMeIn = () => {
    const jwt = window.location.hash.split("=")[1];
    localStorage.setItem("user", jwt);
    return loggedIn;
  };
  document.getElementById("index-holder").innerHTML = window.location.hash
    ? logMeIn()
    : localStorage.user
    ? loggedIn
    : notLoggedIn;
}

//#region profile

const getCollection = (collected) => {
  document.getElementById("collection-view-all").innerHTML = `
    <div id='view-all-collection' class='individual-skylander border-none'>
      <img id='image' />
      <h4 class='title'>View All</h4>
    </div>
  `;

  collected.forEach((skylander) => {
    document.getElementById(
      "collection-view-all"
    ).innerHTML += addSkylanderToRender(skylander, "h4");
  });

  document
    .getElementById("view-all-collection")
    .addEventListener("click", () => {
      window.location.href = "skylandersCollection.html";
    });
};

const getWishList = (wishedFor) => {
  document.getElementById("wish-list-view-all").innerHTML = `
    <div id='view-all-wish-list' class='individual-skylander border-none'>
      <img />
      <h4 class='title'>View All</h4>
    </div>
  `;

  wishedFor.forEach((skylander) => {
    document.getElementById(
      "wish-list-view-all"
    ).innerHTML += addSkylanderToRender(skylander, "h4");
  });

  document
    .getElementById("view-all-wish-list")
    .addEventListener("click", () => {
      window.location.href = "skylandersWishList.html";
    });
};

if (document.getElementById("collection-view-all")) {
  document.getElementById("view-all-right").addEventListener("click", () => {
    document.getElementById("collection-view-all").scrollLeft += 300;
  });

  document.getElementById("view-all-left").addEventListener("click", () => {
    document.getElementById("collection-view-all").scrollLeft -= 300;
  });

  document.getElementById("wish-list-right").addEventListener("click", () => {
    document.getElementById("wish-list-view-all").scrollLeft += 300;
  });

  document.getElementById("wish-list-left").addEventListener("click", () => {
    document.getElementById("wish-list-view-all").scrollLeft -= 300;
  });
}

//#endregion

//#region allSkylanders

let currentElementSelected = "";
let currentGameSelected = 0;
let currentTypeSelected = "skylanders";
let currentlyRenderedSkylanders;

const renderSkylanders = (skylandersToRender) => {
  currentlyRenderedSkylanders = skylandersToRender;
  document.getElementById("skylander-holder").innerHTML = "";
  skylandersToRender.forEach((skylander) => {
    if (currentElementSelected === "") {
      if (currentGameSelected === 0) {
        document.getElementById(
          "skylander-holder"
        ).innerHTML += addSkylanderToRender(skylander, "h4");
      } else if (currentGameSelected == skylander.game) {
        document.getElementById(
          "skylander-holder"
        ).innerHTML += addSkylanderToRender(skylander, "h4");
      }
    } else if (currentElementSelected === skylander.element.toLowerCase()) {
      if (currentGameSelected === 0) {
        document.getElementById(
          "skylander-holder"
        ).innerHTML += addSkylanderToRender(skylander, "h4");
      } else if (currentGameSelected == skylander.game) {
        document.getElementById(
          "skylander-holder"
        ).innerHTML += addSkylanderToRender(skylander, "h4");
      }
    }
  });
  renderModalButtons();
};

//#region buttons and selection

const elementButtons = document.getElementsByClassName("element");
const selectingElement = (event) => {
  currentElementSelected =
    currentElementSelected === event.target.id ? "" : event.target.id;
  if (currentElementSelected !== event.target.id) {
    for (let i = 0; i < elementButtons.length; i++) {
      elementButtons[i].classList.remove("disabled");
    }
  } else {
    for (let i = 0; i < elementButtons.length; i++) {
      if (elementButtons[i].id !== event.target.id) {
        elementButtons[i].classList.add("disabled");
      } else {
        elementButtons[i].classList.remove("disabled");
      }
    }
  }
  renderSkylanders(currentlyRenderedSkylanders);
};

for (let i = 0; i < elementButtons.length; i++) {
  elementButtons[i].addEventListener("click", selectingElement);
}

const gameButtons = document.getElementsByClassName("game");
const selectingGame = (event) => {
  switch (event.target.id) {
    case "spyro":
      currentGameSelected = currentGameSelected === 1 ? 0 : 1;
      break;
    case "giants":
      currentGameSelected = currentGameSelected === 2 ? 0 : 2;
      break;
    case "swapforce":
      currentGameSelected = currentGameSelected === 3 ? 0 : 3;
      break;
    case "trapteam":
      currentGameSelected = currentGameSelected === 4 ? 0 : 4;
      break;
    case "superchargers":
      currentGameSelected = currentGameSelected === 5 ? 0 : 5;
      break;
    case "imaginators":
      currentGameSelected = currentGameSelected === 6 ? 0 : 6;
      break;
  }

  if (currentGameSelected === 0) {
    for (let i = 0; i < gameButtons.length; i++) {
      gameButtons[i].classList.remove("disabled");
    }
  } else {
    for (let i = 0; i < gameButtons.length; i++) {
      if (gameButtons[i].id !== event.target.id) {
        gameButtons[i].classList.add("disabled");
      } else {
        gameButtons[i].classList.remove("disabled");
      }
    }
  }

  renderSkylanders(currentlyRenderedSkylanders);
};

for (let i = 0; i < gameButtons.length; i++) {
  gameButtons[i].addEventListener("click", selectingGame);
}

const selectingType = (event) => {
  currentTypeSelected = event.target.id;
  console.log("selected type: ", currentTypeSelected);
  console.log("not rendering yet");
};

const typeButtons = document.getElementsByClassName("type");
for (let i = 0; i < typeButtons.length; i++) {
  typeButtons[i].addEventListener("click", selectingType);
}

//#endregion

//#endregion

//#region Modal works

const renderModalButtons = () => {
  const individualSkylanderButtons = document.getElementsByClassName(
    "individual-skylander"
  );
  for (let i = 0; i < individualSkylanderButtons.length; i++) {
    individualSkylanderButtons[i].addEventListener("click", openModal);
  }
};

const openModal = (event) => {
  console.log('in modal');
  document.getElementById('overlay').style.display = 'block';
  let sameNamed = allSkylanders.filter(skylander => event.target.id === skylander.skylanderName);

  let modal = `
    <div class='flex-row header'>
      <h3>${sameNamed[0].name}</h3>
      <span id="close">&times;</span>
    </div>
    <div id='skylander-modal'>
  `;
  sameNamed.forEach(skylander => {
    // if skylander is not in collection
    // if skylander is not in wishlist
    modal += 
    `
      <div id='${skylander.skylanderName}' class='individual-skylander-modal'>
        <div class='border-${skylander.element}'>
          <img class='individual-skylander-pic' src='${skylander.image}' />
        </div>
        <div class='buttons'>
          <h4>${skylander.name}</h4>
    `;
    if(document.getElementById('allSkylanders')){
      let isInCollection = collectionOfSkylanders.filter(sky => skylander.skylanderId === sky.skylanderId).length > 0;
      if(!isInCollection){
        modal += `<div id='${skylander.skylanderId}' class='button'>Add to collection</div>`;
      }
      let isInWishlist = wishlistOfSkylanders.filter(sky => skylander.skylanderId === sky.skylanderId).length > 0;
      if(!isInWishlist) {
        modal += `<div id='${skylander.skylanderId}' class='button'>Add to Wishlist</div>`;
      }
    }
    modal+= `</div></div>`;
  });
  // console.log('rendered skylander: ', );


  modal += '</div>';
  document.getElementById('modal').innerHTML = modal;
  document.getElementById('modal').style.display = 'block';
  document.getElementById('close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  });
  console.log('all skylanders', allSkylanders);
  console.log('collected', collectionOfSkylanders);
  console.log('wishlist', wishlistOfSkylanders);

  const buttonClass = document.getElementsByClassName("button");
  console.log(buttonClass.length);
  const addToListClick = event => {
    console.log('in button click');
    console.log(currentlyRenderedSkylanders);
    let foundSkylander = currentlyRenderedSkylanders.find(sky => sky.skylanderId === event.target.id);
    if(event.target.innerHTML.toLowerCase().includes('collection')) {
      addToList('collection', foundSkylander);
    } else if(event.target.innerHTML.toLowerCase().includes('wish')) {
      addToList('wish', foundSkylander);
    } else {
      console.log('uhhhhh not sure what your about....');
    }
  };
  for(let i = 0; i < buttonClass.length; i++) {
    buttonClass[i].addEventListener('click', addToListClick);
  }
  // window.addEventListener('click', event => {
  //   console.log('in window', event.target);
  // });

};

//#endregion

// xhr.onreadystatechange = () => {
//   if (xhr.readyState == 4 && xhr.status == 200) {
//     window.location.href = "allSkylanders.html";
//   }
// };

const addToList = (listName, skylanderToAdd) => {
  console.log("adding: ", listName, skylanderToAdd);
  const info = JSON.parse(atob(localStorage.user.split(".")[1]));

  let url = listName === "collection" ? collectionURL : wishListURL;

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  let data = JSON.stringify({
    userId: info.sub,
    skylander: skylanderToAdd,
  });

  xhr.send(data);
};
