import { Request, Response } from "express";

/** 
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
    res.render("./blog-index", {
        tab: 2
    });
};

export const show = (req: Request, res: Response) => {
    const blogDict: {[key: string]: string} = {
        "1": "blog-1",
        "2": "blog-2",
        "3": "blog-3"
    };
    const templateName = blogDict[String(req.params.blog_index)];
    if (!templateName) {
        return res.redirect("/");
    }
    res.render(templateName, {
        tab: 2
    });
};

