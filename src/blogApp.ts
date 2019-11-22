import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";

// Controllers (route handlers)
import * as blogController from "./controllers/blog";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.BLOG_PORT || 3001);
app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", blogController.index);
app.get("/blog/:blog_index", blogController.show);

export default app;
