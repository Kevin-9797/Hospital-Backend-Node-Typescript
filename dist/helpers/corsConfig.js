"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const whitelistDomains = [`http://localhost:4200`, `http://localhost:62625`, `http://localhost:8080`, 'https://heroku.com/hospitalApp'];
exports.corsConfig = {
    origin: (origin, callback) => {
        console.log(origin);
        if (whitelistDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by cors'));
        }
    },
};
//# sourceMappingURL=corsConfig.js.map