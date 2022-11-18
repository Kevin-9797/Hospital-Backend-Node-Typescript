"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileCloudinary = exports.updateImgCloudinary = exports.uploadFile = void 0;
const request_1 = __importDefault(require("request"));
const hospital_1 = require("../models/hospital");
const medical_1 = require("../models/medical");
const cloudinary_1 = __importDefault(require("cloudinary"));
const user_1 = require("../models/user");
const path_1 = __importDefault(require("path"));
cloudinary_1.default.v2.config(process.env.CLOUDINARY_URL);
const uploadFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection = '' } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.UserModel.findById(id.match(/^[0-9a-fA-F]{24}$/));
            console.log(id.match(/^[0-9a-fA-F]{24}$/));
            if (!model) {
                return res.status(400).json({
                    msg: `User id ${id} not exist`
                });
            }
            break;
        case 'medicals':
            model = yield medical_1.Medical.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product id ${id} not exist`
                });
            }
            break;
        case 'hospitals':
            model = yield hospital_1.Hospital.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: `Product id ${id} not exist`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Internal server error'
            });
    }
    if (model.img) {
        const nameArr = model.img.split('/');
        console.log(nameArr);
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        console.log(`node-cafe/${collection}/${public_id}`);
        cloudinary_1.default.v2.uploader.destroy(`node-cafe/${collection}/${public_id}`, { invalidate: true, resource_type: "image" });
    }
    const archivo = req.files.file;
    console.log(archivo);
});
exports.uploadFile = uploadFile;
const updateImgCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, collection = '' } = req.params;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.UserModel.findById(id.match(/^[0-9a-fA-F]{24}$/));
            console.log(model);
            if (!model) {
                return res.status(400).json({
                    msg: `User id ${id} not exist`
                });
            }
            break;
        case 'medicals':
            model = yield medical_1.Medical.findById(id.match(/^[0-9a-fA-F]{24}$/));
            if (!model) {
                return res.status(400).json({
                    msg: `Product id ${id} not exist`
                });
            }
            break;
        case 'hospitals':
            model = yield hospital_1.Hospital.findById(id.match(/^[0-9a-fA-F]{24}$/));
            if (!model) {
                return res.status(400).json({
                    msg: `Product id ${id} not exist`
                });
            }
            break;
        default:
            return res.status(500).json({
                msg: 'Internal server error'
            });
    }
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        console.log(public_id);
        console.log(`node-cafe/${collection}/${public_id}`);
        cloudinary_1.default.v2.uploader.destroy(`node-hospital/${collection}/${public_id}`, { invalidate: true, resource_type: "image" });
    }
    try {
        const archivo = req.files.file;
        const { secure_url } = yield cloudinary_1.default.v2.uploader.upload(archivo.tempFilePath, { folder: `node-hospital/${collection}` });
        console.log(secure_url);
        model.img = secure_url.toString();
        yield model.save();
        res.json(model);
    }
    catch (error) {
        return res.status(500).json({
            msg: 'Internal server error',
        });
    }
    // const name = await processFile( req.files, undefined ,colection );
    // model.img = name;
    // await model.save();
});
exports.updateImgCloudinary = updateImgCloudinary;
const getFileCloudinary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { collection, id } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = yield user_1.UserModel.findById(id.match(/^[0-9a-fA-F]{24}$/));
            break;
        case 'medicals':
            model = yield medical_1.Medical.findById(id.match(/^[0-9a-fA-F]{24}$/));
            break;
        case 'hospitals':
            model = yield hospital_1.Hospital.findById(id.match(/^[0-9a-fA-F]{24}$/));
            break;
        default:
            return res.status(400).json({
                msg: 'Prrogrammer error',
            });
    }
    if (!model) {
        return res.status(401).json({
            msg: 'The submitted model id does not exist in the database'
        });
    }
    if (model.img) {
        (0, request_1.default)({
            url: model.img,
            encoding: null
        }, (err, resp, buffer) => {
            if (!err && resp.statusCode === 200) {
                res.set('Content-Type', 'image/jpeg');
                res.send(resp.body);
            }
        });
        // res.sendFile( model.img );
    }
    else {
        const notFoundImage = path_1.default.join(__dirname, '../assets/images/not_found.jpg');
        res.sendFile(notFoundImage);
    }
});
exports.getFileCloudinary = getFileCloudinary;
//# sourceMappingURL=uploads.js.map