import { NextFunction, Request, Response } from "express";
import multer = require ("multer");
// import * as multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";


// cloudinary.config({
//     cloud_name: 'dxxzathkv',
//     api_key: '366726983258683',
//     api_secret: 'xEdX9FlYf-HCQ5_-mIFqiRsJYR4'
// })

interface Params {
    allowedFormats: string[];
    transformation: { width: number; height: number; crop: string }[];
    folder: string;
  }
  
export const upload = (image: string) => {
    cloudinary.config({
        cloud_name: 'dxxzathkv',
        api_key: '366726983258683',
        api_secret: 'xEdX9FlYf-HCQ5_-mIFqiRsJYR4',
    })

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
        folder: "circle",
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        } as Params,
    });

    const uploadFile = multer({ storage: storage });

    return (req: Request, res: Response, next: NextFunction) => {
        uploadFile.single(image)(req, res, function (err: any) {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "file upload failed.", err });
        }
        const locals = Object.assign({}, res.locals, req.body);
        res.locals = locals;
        if (req.file) {
            res.locals.filename = req.file.filename;
            res.locals.cloudinaryUrl = req.file.path; // URL Cloudinary untuk file yang diupload
        }
        next();
        });
    };
};

// export const upload = (fieldName: string) => {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, "./uploads/");
//         },
//         filename: function (req, file, cb) {
//             const suffix = Date.now();
//             cb(null, file.fieldname + "-" + suffix + ".png");
//         },
//     });
    
//     const uploadFile = multer({storage: storage})
    
//     return (req: Request, res: Response, next: NextFunction) => {
//         uploadFile.single(fieldName)(req, res, function (error) {
//             try {
//                 cloudinary.uploader.upload(req.file.path, (error, result) => {
//                     if (error) {
//                         // return res.status(400).json({ error });
//                         return res.status(500).json({ error:"File upload failed."});
//                     }
    
//                     console.log("Result", result)
    
//                     res.locals.filename = result.secure_url
//                     next()
//                 })    
//             } catch (err) {
//                 return res.status(400).json({err})
//             }
//         });

//         // uploadFile.single(fieldName)(req, res, function (error) {
//         //     if (error) {
//         //         return res.status(400).json({ error:"File upload failed."});
//         //     }

//         //     res.locals.filename = req.file.filename;
//         //     next();
//         // });
//     };
// };