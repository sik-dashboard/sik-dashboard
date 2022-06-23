const UNSPLASH_API_KEY =
  "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body"),
  locationContainer = document.querySelector(".js-location span");

  const imgArr = [
    'https://user-images.githubusercontent.com/53857239/175189259-38f14020-6138-4345-b066-bd9f16c7fd3c.png',
    'https://user-images.githubusercontent.com/53857239/175189270-f32c73ea-4121-48f7-8e83-06ad971081e6.png',
    'https://user-images.githubusercontent.com/53857239/175189274-56e681ce-dbad-429a-b5a1-c385ebbb4fbc.png',
    'https://user-images.githubusercontent.com/53857239/175189281-5895318e-352a-425f-a0a0-31d087f10e18.png',
    'https://user-images.githubusercontent.com/53857239/175189283-b90627cf-c08f-4853-8003-5f6db3cffc09.png',
    'https://user-images.githubusercontent.com/53857239/175189285-f09dc65d-c9ad-4cbf-b589-011ae2561fbd.png'
];

function loadBackground() {
  const savedImage = localStorage.getItem("bg");
 
  if (savedImage === null) {
    getBackground();
  } else {
    const parsedImage = JSON.parse(savedImage);
    const today = new Date();
    if (today > parsedImage.expiresOn) {
      getBackground();
    } else {
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
        parsedImage.url
      })`;
      // locationContainer.innerHTML = `${parsedImage.name}, ${
      //   parsedImage.city
      // }, ${parsedImage.country}`;
      locationContainer.innerHTML = `현식, 천재, 배포`;
    }
  }
  return;
}

// function saveBackground(imageUrl, city, country, name) {
//   const savedImage = localStorage.getItem("bg");
//   if (savedImage !== null) {
//     localStorage.removeItem("bg");
//   }
//   const expirationDate = new Date();
//   expirationDate.setDate(expirationDate.getDate() + 1);
//   const imageObject = {
//     url: imageUrl,
//     expiresOn: expirationDate,
//     city,
//     country,
//     name
//   };
//   localStorage.setItem("bg", JSON.stringify(imageObject));
//   loadBackground();
//   return;
// }

function saveBackground(imageUrl) {
  const savedImage = localStorage.getItem("bg");
  if (savedImage !== null) {
    localStorage.removeItem("bg");
  }
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const imageObject = {
    url: imageUrl
  };
  localStorage.setItem("bg", JSON.stringify(imageObject));
  loadBackground();
  return;
}

function getBackground() {
  // fetch(UNSPLASH_URL)
  //   .then(response => response.json())
  //   .then(json => {
  //     const image = json;
  //     if (image.urls && image.urls.full && image.location) {
  //       const fullUrl = image.urls.full;
  //       const location = image.location;
  //       const city = location.city;
  //       const country = location.country;
  //       const name = location.name;
  //       saveBackground(fullUrl, city, country, name);
  //     } else {
  //       getBackground();
  //     }
  //   });
  let index = Math.floor(Math.random() * 6);
  let fullUrl = imgArr[index];
  // saveBackground(fullUrl, city, country, name);
  saveBackground(fullUrl);
  return;
}

function initApp() {
  loadBackground();
  setInterval(localStorage.removeItem("bg"), 5000);
  return;
}

initApp();