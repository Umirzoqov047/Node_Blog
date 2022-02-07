const express = require("express");
const expressSession = require("express-session");
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const mongoStore = require("connect-mongo");
const connectFlash = require("connect-flash");

const validateCreatePostMiddleware = require("./middleware/validateMiddleware")
const authMiddleware = require("./middleware/auth");
const redirectMiddleware = require("./middleware/redirect");

const homePageController = require("./controllers/homePage");
const getPostController = require("./controllers/getPost");
const createPostController = require("./controllers/createPost");
const postsNewController = require("./controllers/postNew");
const registrController = require("./controllers/registr");
const userStoreController = require("./controllers/userStore");
const loginController = require("./controllers/login");
const loginStoreController = require("./controllers/loginStore");
const logoutController = require("./controllers/logout")

const MongoUrl = "mongodb+srv://Elyor:ghZkST3picZ3Pv6p@cluster0.nbdk7.mongodb.net/node-blog-test";
const app = express();

mongoose.connect(MongoUrl);

app.use(
  expressSession({
    secret: "Elyor",
    store: mongoStore.create({
      mongoUrl: MongoUrl,
    }),
  })
);

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(connectFlash());
app.use((req, res, next) => {
  app.locals.auth = req.session.userId;
  next()
})

app.set("views"), `${__dirname}/views`;

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", authMiddleware, postsNewController);
app.post("/posts/create", validateCreatePostMiddleware, createPostController);
app.get("/reg",redirectMiddleware,  registrController );
app.post("/auth/reg", userStoreController);
app.get("/login", redirectMiddleware, loginController );
app.post("/auth/log", loginStoreController);
app.get("/logout",  logoutController)

app.use((req, res) => {
  res.render("notFound")
})

app.listen(5000, () => {
  console.log("server has been started on port 5000");
});
//Elyor elyor12@gmail.com
//password 1234
