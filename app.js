const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

// console.log(date());

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = [];
const workItems = [];


app.get("/", (req, res) => {
  
  res.render("list", { listTitle: date(), newListItems: items });
});

app.post("/", (req, res) => {
  console.log(req.body.list);

  let item = req.body.newItem;

  
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", (req, res) => {
  res.render("about");
});
// app.post('/work', (req, res) => {
//   let item = req.body.newItem;
//   workItems.push(item);
//   res.redirect('/work');
// });

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});



// check for empty list
// if (!item || item.trim() === "") {
  //   res.send(`
  //   <html>
  //     <head>
  //       <script>
  //         alert('Please add something!');
  //         window.location.href = '/';
  //       </script>
  //     </head>
  //     <body></body>
  //   </html>
  // `);
  // } 