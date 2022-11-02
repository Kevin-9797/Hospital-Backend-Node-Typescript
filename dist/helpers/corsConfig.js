"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const whitelistDomains = [`http://localhost:3030`, `http://localhost:8080`, 'https://heroku.com//puzzle'];
exports.corsConfig = {
    origin: (origin, callback) => {
        if (whitelistDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by cors'));
        }
    },
};
//# sourceMappingURL=corsConfig.js.map