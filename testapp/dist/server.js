"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var express = require("express");
var http = require("http");
var cors = require("cors");
var morgan = require("morgan");
var mongoose = require("mongoose");
var Server = (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = this;
        var app = express();
        _this = _super.call(this, app) || this;
        _this.app = app;
        _this.isDBConnected = false;
        return _this;
    }
    Server.prototype.setDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongodbOptions, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongodbOptions = {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                            useCreateIndex: true,
                            useFindAndModify: false,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, mongoose.connect(config_1.default.MONGO_URL, mongodbOptions)];
                    case 2:
                        _a.sent();
                        mongoose.set('debug', true);
                        console.log('✅ Connected to DB');
                        this.isDBConnected = true;
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("\u274C Error on DB Connection:" + error_1);
                        this.isDBConnected = false;
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    Server.prototype.setRouter = function () {
        var _this = this;
        this.app
            .get('/', function (req, res) {
            res.status(200).json({
                message: 'hello server',
                nodeEnv: config_1.default.NODE_ENV,
                method: req.method,
                isDBConnected: _this.isDBConnected,
                requestProtocol: req.protocol,
                requestHeaders: req.headers,
                requestBody: req.body,
            });
        })
            .post('/', function (req, res) {
            console.log(req.headers);
            res.status(200).json({
                message: 'hello server',
                nodeEnv: config_1.default.NODE_ENV,
                method: req.method,
                isDBConnected: _this.isDBConnected,
                requestProtocol: req.protocol,
                requestHeaders: req.headers,
                requestBody: req.body,
            });
        });
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(morgan('dev'));
        this.app.use(cors({
            origin: true,
            credentials: true,
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.setRouter();
    };
    Server.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.app.set('port', config_1.default.PORT);
                this.setDatabase();
                this.setMiddleware();
                return [2, this.app.listen(this.app.get('port'), function () {
                        console.log("\u2728 " + config_1.default.NODE_ENV + " server is on...");
                    })];
            });
        });
    };
    return Server;
}(http.Server));
exports.default = Server;
//# sourceMappingURL=server.js.map