import errorHandler from "errorhandler";

import mainApp from "./mainApp";
import blogApp from "./blogApp";
import { MAIN_PORT, BLOG_PORT } from "./util/secrets";

/**
 * Error Handler. Provides full stack - remove for production
 */
mainApp.use(errorHandler());
blogApp.use(errorHandler());

/**
 * Start Express server.
 */ 
export const mainServer = mainApp.listen(MAIN_PORT, () => {
    console.log(
        "  Main App is running at http://localhost:%d in %s mode",
        MAIN_PORT,
        mainApp.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export const blogServer = blogApp.listen(BLOG_PORT, () => {
    console.log(
        "  Blog App is running at http://localhost:%d in %s mode",
        BLOG_PORT,
        blogApp.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

