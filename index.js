// import express
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(__dirname + '/public'));

const jokes = require('./jokes');

// let randomAge = () => Math.floor(Math.random() * 100) + 1;
const mainPath = path.join(__dirname, 'public', 'mainPage.html')

console.log('mainpath:', mainPath)

// what happens with '/'
  app.get("/", (request, response) => {
    response.sendFile(mainPath);
  });

app.get("/:language/:age", (request, response) => {
  const { language, age } = request.params;
  let joke = selectJoke(language, age, jokes);

  const page = render(joke);
  response.send(page);
});

app.get("/:x/:y/:z", (request, response) => {
  const { x, y, z } = request.params;

  response.sendFile(mainPath);
});



// register GET /hello endpoint
app.get(
  '/test', // route
  (request, response) => { // handler callback
    console.log(request.path)
    response.send(document)
  }
)

// 3000 is common
const port = process.env.PORT || 3000

// start listening
app.listen(
  port,
  () => console.log(`Listening on :${port}`)
)

function selectJoke(language, age, jokes) {
    const randomNumber = () => Math.floor(Math.random() * 3) + 1;
    if (language === "en") {
        return age > 20 ? jokes.en[randomNumber()] : jokes.en[1]
    } else {
        return age > 20 ? jokes.nl[randomNumber()] : jokes.nl[1]
    }
}


function render(joke) {

    const { title, setup, punchline } = joke;
    const page = `
    <head>
    <link rel="stylesheet" type="text/css"   href="/css/style.css">
    <link href="styles/font-awesome.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Zilla+Slab:ital,wght@0,300;0,600;0,700;1,300&display=swap" rel="stylesheet"> 
      <title>${title}</title>
    </head>

    <body>
    <table cellspacing="0" cellpadding="0" width="100%" height="100%" class="table">

    <thead class="thead-light">
    </thead>

    <tbody>
        <tr>
            <td class="cel">Marinus Eigenraam</td>
            <td class="social"><a href="https://www.facebook.com/rinus.eigenraam" class="fa fa-facebook-official"></a></td>
          <td class="social"><a href="https://www.linkedin.com/in/rinus-eigenraam-27238290" class="fa fa-linkedin"></a></td>
          <td class="social"><a href="https://github.com/MarinusEIgenraam" class="fa fa-github"></a></td>


        </tr>
    </tbody>
  </table>
    <div class="container">
      <div class="center">
        <h1>${title}</h1>
        <h2>${setup}</h2>
        <h3>${punchline}</h3>
      </div>
    </div>
    </body>
  </html>
    `;
  
    return page;
  }

  