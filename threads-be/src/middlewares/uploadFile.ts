import { NextFunction, Request, Response } from "express";
import multer = require ("multer");
// import * as multer from "multer";

export const upload = (fieldName: string) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads/");
        },
        filename: function (req, file, cb) {
            const suffix = Date.now();
            cb(null, file.fieldname + "-" + suffix + ".png");
        },
    });
    
    const uploadFile = multer({storage: storage})
    
    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.single(fieldName)(req, res, function (error) {
            if (error) {
                return res.status(400).json({ error:"File upload failed."});
            }

            res.locals.filename = req.file.filename;
            next();
        });
    };
};