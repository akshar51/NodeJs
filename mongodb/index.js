const express = require("express");
const db = require("./config/db");
const Books = require("./models/bookSchema");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.post("/addBooks", (req, res) => {
  // let obj = {
  //     book_name : req.body.book_name,
  //     book_price : req.body.book_price,
  // }

  if (!req.body.editId) {
    Books.create(req.body)
      .then(() => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/");
      });
  } else {
    Books.findByIdAndUpdate(req.body.editId, req.body, { new: true })
      .then(() => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/");
      });
  }
});

app.get("/", (req, res) => {
  Books.find({})
    .then((books) => {
      return res.render("addBooks", { books });
    })
    .catch((err) => {
      console.log(err);
      return res.render("addBooks", { books: [] });
    });
});

app.get("/book/delete/:id", (req, res) => {
  const { id } = req.params;
  Books.findByIdAndDelete(id)
    .then(() => {
      return res.redirect(req.get("Referrer") || "/");
    })
    .catch((err) => {
      console.log(err);
      return res.redirect(req.get("Referrer") || "/");
    });
});

app.get("/book/edit/:id", (req, res) => {
  const { id } = req.params;
  Books.findById(id)
    .then((book) => {
      return res.render("editBooks", { book });
    })
    .catch((err) => {
      console.log(err);
      return res.redirect(req.get("Referrer") || "/");
    });
});

app.listen(port, (err) => {
  if (!err) {
    db;
    console.log("http://localhost:" + port);
  }
});
