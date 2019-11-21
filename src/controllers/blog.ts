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
    res.render(req.params.blog_name, {
        tab: 2
    });
};

