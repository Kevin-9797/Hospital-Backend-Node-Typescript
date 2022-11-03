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
Object.defineProperty(exports, "__esModule", { value: true });
const { request, response } = require("express");
const path = require('path');
const { v4: uuiv4 } = require('uuid');
const processFile = (files, extensionsValid = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameCort = file.name.split('.');
        const extension = nameCort[nameCort.length - 1];
        if (extensionsValid.includes(extension)) {
            reject(`Extension ${extension} not valid - extensions valid ${extensionsValid}`);
        }
        const nameTemp = uuiv4() + '.' + extension;
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);
        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });
});
module.exports = {
    processFile
};
//# sourceMappingURL=upload-file.js.map