import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/User";
export const createUser = async (req: Request, res: Response) => {
    await check("email").isEmail().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const _user = await User.findOne({ email: req.body.email });
    if (_user) {
        return res.status(422).json({ errors: [{msg: "Email is in use!"}] });
    }

    const user = new User();
    user.email = req.body.email;
    await user.save();
    res.json(user);
};

export const createVoucherByUserId = async (req: Request, res: Response) => {
    await check("email").isEmail().run(req);
    await check("vouchers.*.value").isNumeric().not().isEmpty().run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.params.email });
    if (!user) {
        return res.status(404).json({ errors: [{msg: "User not found!"}] });
    }

    for (const voucher of req.body.vouchers) {
        user.vouchers.push(voucher);
    }
    await user.save();

    res.json(user);
};
