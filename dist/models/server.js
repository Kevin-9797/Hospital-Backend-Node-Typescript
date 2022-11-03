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
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = require("../database/config");
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = require("../helpers/corsConfig");
class Server {
    constructor() {
        var _a;
        this._app = (0, express_1.default)();
        this.port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8080;
        this.apiRoutes = {
            apiUser: '/api/users',
            apiAuth: '/api/auth',
            apiSearch: '/api/search',
            apiMedical: '/api/medical',
            apiHospital: '/api/hospital',
            apiToken: 'apiToken'
        };
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    routes() {
        this._app.use(this.apiRoutes.apiUser, require('../routes/users.api.routes'));
        this._app.use(this.apiRoutes.apiAuth, require('../routes/auth.api.routes'));
        this._app.use(this.apiRoutes.apiHospital, require('../routes/hospital.api.routes'));
        this._app.use(this.apiRoutes.apiMedical, require('../routes/medical.api.routes'));
        this._app.use(this.apiRoutes.apiSearch, require('../routes/searchs.api.routes'));
    }
    middlewares() {
        this._app.use((0, cors_1.default)(corsConfig_1.corsConfig));
        this._app.use(express_1.default.json());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, config_1.databaseConnection)();
        });
    }
    listen() {
        this._app.listen(this.port, () => {
            console.log('Server run in port: ' + this.port);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map