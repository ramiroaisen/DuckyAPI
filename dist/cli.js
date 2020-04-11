/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 106);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(__webpack_require__(53));
const dotenv_1 = __importDefault(__webpack_require__(54));
const fs_1 = __importDefault(__webpack_require__(55));
const JoiCoerce = joi_1.default.extend({
    type: 'object',
    base: joi_1.default.object(),
    coerce: {
        from: 'string',
        method(value) {
            if (value[0] !== '{' && !/^\s*\{/.test(value)) {
                return;
            }
            try {
                return { value: JSON.parse(value) };
            }
            catch (error) {
                console.error('Invalid JSON!');
                console.error(error);
            }
        },
    },
}).extend({
    type: 'array',
    base: joi_1.default.array(),
    coerce: {
        from: 'string',
        method(value) {
            if (typeof value !== 'string' || (value[0] !== '[' && !/^\s*\[/.test(value))) {
                return;
            }
            try {
                return { value: JSON.parse(value) };
            }
            catch (error) {
                console.error('Invalid JSON!');
                console.error(error);
            }
        },
    },
});
class ConfigService {
    constructor(filePath) {
        const config = dotenv_1.default.parse(fs_1.default.readFileSync(filePath));
        this.envConfig = this.validateInput(config);
    }
    validateInput(envConfig) {
        const envVarsSchema = JoiCoerce.object({
            NODE_ENV: joi_1.default.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            PORT: joi_1.default.number().default(3000),
            BASE_URL: joi_1.default.string().default('/'),
            TOKEN_SECRET: joi_1.default.string()
                .disallow('CHANGE-ME-PLEASE!')
                .required(),
            MONGODB_URL: joi_1.default.string().required(),
            REDIS_URL: joi_1.default.string().required(),
            WILDDUCK_API_URL: joi_1.default.string()
                .uri()
                .required(),
            WILDDUCK_API_TOKEN: joi_1.default.string().required(),
            ALLOW_UNSAFE_ACCOUNT_PASSWORDS: joi_1.default.boolean().default(true),
            ALLOW_FORWARDER_WILDCARD: joi_1.default.boolean().default(true),
            MAX_QUOTA: joi_1.default.number(),
            MAX_SEND: joi_1.default.number(),
            MAX_FORWARD: joi_1.default.number(),
            MAX_RECEIVE: joi_1.default.number(),
            ARENA_ENABLED: joi_1.default.boolean().default(false),
            ARENA_USER: joi_1.default.string(),
            ARENA_PASSWORD: joi_1.default.string().when('ARENA_USER', { then: joi_1.default.string().required() }),
            MX_RECORDS: JoiCoerce.array()
                .min(1)
                .items(JoiCoerce.object({
                exchange: joi_1.default.string().required(),
                priority: joi_1.default.number().required(),
            }))
                .required(),
            SPF_CORRECT_VALUE: joi_1.default.string().required(),
            SPF_REGEX: joi_1.default.string(),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        if (validatedEnvConfig.BASE_URL.startsWith('/')) {
            validatedEnvConfig.BASE_URL = validatedEnvConfig.BASE_URL.slice(1);
        }
        if (validatedEnvConfig.BASE_URL.endsWith('/')) {
            validatedEnvConfig.BASE_URL = validatedEnvConfig.BASE_URL.slice(0, -1);
        }
        return validatedEnvConfig;
    }
    get(key) {
        return this.envConfig[key];
    }
}
exports.ConfigService = ConfigService;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const swagger_1 = __webpack_require__(0);
const bcrypt_1 = __importDefault(__webpack_require__(34));
const mongodb_1 = __webpack_require__(14);
const domain_entity_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(11);
let User = class User {
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                this.password = yield bcrypt_1.default.hash(this.password, 10);
            }
        });
    }
    setDefaultInsertValues() {
        return __awaiter(this, void 0, void 0, function* () {
            this.minTokenDate = new Date();
            if (!this.domains) {
                this.domains = [];
            }
        });
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    swagger_1.ApiPropertyOptional({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Unique id for this user',
        readOnly: true,
    }),
    __metadata("design:type", String)
], User.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'johndoe', description: 'The username for this user' }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({
        example: 'supersecret',
        description: 'The password for this user',
        writeOnly: true,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User.prototype, "minTokenDate", void 0);
__decorate([
    typeorm_1.Column(() => domain_entity_1.Domain),
    swagger_1.ApiPropertyOptional({
        type: domain_entity_1.Domain,
        isArray: true,
        description: 'Domains this user can manage',
        readOnly: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "domains", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectId)
], User.prototype, "package", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiPropertyOptional({
        example: 1073741824,
        description: 'Storage quota in bytes',
        readOnly: true,
    }),
    __metadata("design:type", Number)
], User.prototype, "quota", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({
        example: ['user'],
        description: 'User roles',
        readOnly: true,
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "setDefaultInsertValues", null);
User = __decorate([
    typeorm_1.Entity('users')
], User);
exports.User = User;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
exports.Roles = (...roles) => common_1.SetMetadata('roles', roles);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(49);
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        let roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            roles = this.reflector.get('roles', context.getClass());
        }
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user.user;
        const hasRole = () => user.roles.some(role => roles.includes(role));
        if (user && user.roles && hasRole()) {
            return true;
        }
        throw new common_1.ForbiddenException('You do not have the permission to access this resource.', 'PermissionForbidden');
    }
};
RolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
exports.ReqUser = common_1.createParamDecorator((data, req) => req.user.user);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const mongodb_1 = __webpack_require__(14);
const nanoid_1 = __importDefault(__webpack_require__(18));
const packages_service_1 = __webpack_require__(28);
const typeorm_2 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(5);
let UsersService = UsersService_1 = class UsersService {
    constructor(userRepository, packagesService) {
        this.userRepository = userRepository;
        this.packagesService = packagesService;
        this.logger = new common_1.Logger(UsersService_1.name, true);
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            username = username.toLowerCase();
            return this.userRepository.findOne({
                username: username,
            });
        });
    }
    findByPackage(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find({
                where: {
                    package: new mongodb_1.ObjectId(packageId),
                },
            });
        });
    }
    countByPackage(packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.count({
                where: {
                    package: new mongodb_1.ObjectId(packageId),
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne(id);
        });
    }
    findByIdNoPassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne(id);
            delete user.password;
            return user;
        });
    }
    findByDomain(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find({
                where: {
                    $or: [
                        {
                            'domains.domain': domain,
                        },
                        {
                            'domains.aliases': domain,
                        },
                    ],
                },
            });
        });
    }
    countByDomain(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.count({
                $or: [
                    {
                        'domains.domain': domain,
                    },
                    {
                        'domains.aliases': domain,
                    },
                ],
            });
        });
    }
    pushDomain(userId, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.domains.push(domain);
            try {
                return yield this.userRepository.save(userEntity);
            }
            catch (error) {
                const errorId = nanoid_1.default();
                this.logger.error(`${errorId}: ${error.message}`);
                throw new common_1.InternalServerErrorException(`Unknown error: ${errorId}`);
            }
        });
    }
    pullDomain(userId, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.domains = userEntity.domains.filter(domainObject => domainObject.domain !== domain);
            try {
                return this.userRepository.save(userEntity);
            }
            catch (error) {
                const errorId = nanoid_1.default();
                this.logger.error(`${errorId}: ${error.message}`);
                throw new common_1.InternalServerErrorException(`Unknown error: ${errorId}`);
            }
        });
    }
    pushAlias(userId, domain, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.domains = userEntity.domains.map(userDomain => {
                if (userDomain.domain === domain) {
                    if (!userDomain.aliases) {
                        userDomain.aliases = [];
                    }
                    userDomain.aliases.push(alias);
                }
                return userDomain;
            });
            try {
                return yield this.userRepository.save(userEntity);
            }
            catch (error) {
                const errorId = nanoid_1.default();
                this.logger.error(`${errorId}: ${error.message}`);
                throw new common_1.InternalServerErrorException(`Unknown error: ${errorId}`);
            }
        });
    }
    pullAlias(userId, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.domains = userEntity.domains.map(userDomain => {
                if (userDomain.aliases) {
                    userDomain.aliases = userDomain.aliases.filter(domainAlias => domainAlias.domain !== alias);
                }
                return userDomain;
            });
            try {
                return this.userRepository.save(userEntity);
            }
            catch (error) {
                const errorId = nanoid_1.default();
                this.logger.error(`${errorId}: ${error.message}`);
                throw new common_1.InternalServerErrorException(`Unknown error: ${errorId}`);
            }
        });
    }
    updateMinTokenDate(userId, date = new Date()) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.minTokenDate = date;
            try {
                return yield this.userRepository.save(userEntity);
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Unknown error');
            }
        });
    }
    createUser(createUserDto, admin = false) {
        return __awaiter(this, void 0, void 0, function* () {
            createUserDto.username = createUserDto.username.toLowerCase();
            let userPackage;
            if (!admin) {
                userPackage = yield this.packagesService.getPackageById(createUserDto.packageId);
                if (!userPackage) {
                    throw new common_1.BadRequestException(`No package found with id ${createUserDto.packageId}`, 'PackageNotFoundError');
                }
            }
            const newUser = {
                package: !admin ? new mongodb_1.ObjectId(createUserDto.packageId) : undefined,
                quota: !admin ? userPackage.quota : undefined,
                roles: admin ? ['admin'] : ['user'],
            };
            Object.assign(newUser, createUserDto);
            const createdUser = this.userRepository.create(newUser);
            try {
                return yield this.userRepository.save(createdUser);
            }
            catch (error) {
                switch (error.code) {
                    case 11000:
                        throw new common_1.BadRequestException('This user already exists', 'UserExistsError');
                    default:
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    updateUsernameOrPassword(userId, updateuserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findByIdNoPassword(userId);
            if (!user) {
                throw new common_1.NotFoundException(`No user found with id: ${userId}`);
            }
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            if (updateuserDto.username) {
                updateuserDto.username = updateuserDto.username.toLowerCase();
                userEntity.username = updateuserDto.username;
            }
            if (updateuserDto.password) {
                userEntity.password = updateuserDto.password;
            }
            try {
                return yield this.userRepository.save(userEntity);
            }
            catch (error) {
                switch (error.code) {
                    case 11000:
                        throw new common_1.BadRequestException('This username is already taken', 'UserExistsError');
                    default:
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    updatePackage(userId, packageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPackage = yield this.packagesService.getPackageById(packageId);
            if (!userPackage) {
                throw new common_1.BadRequestException(`No package found with id ${packageId}`, 'PackageNotFoundError');
            }
            const user = yield this.findByIdNoPassword(userId);
            if (!user) {
                throw new common_1.NotFoundException(`No user found with id: ${userId}`);
            }
            const userEntity = new user_entity_1.User();
            Object.assign(userEntity, user);
            userEntity.package = new mongodb_1.ObjectId(packageId);
            userEntity.quota = userPackage.quota;
            return this.userRepository.save(userEntity);
        });
    }
    replaceQuotasForPackage(packageId, oldQuota, newQuota) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userRepository.update({
                package: new mongodb_1.ObjectID(packageId),
                quota: oldQuota,
            }, {
                quota: newQuota,
            });
        });
    }
};
UsersService = UsersService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, common_1.Inject(common_1.forwardRef(() => packages_service_1.PackagesService))),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        packages_service_1.PackagesService])
], UsersService);
exports.UsersService = UsersService;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DomainsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __webpack_require__(25);
const common_1 = __webpack_require__(1);
const dns_1 = __webpack_require__(58);
const config_service_1 = __webpack_require__(4);
const dkim_service_1 = __webpack_require__(27);
const users_service_1 = __webpack_require__(9);
let DomainsService = DomainsService_1 = class DomainsService {
    constructor(usersService, dkimService, config, httpService, taskQueue) {
        this.usersService = usersService;
        this.dkimService = dkimService;
        this.config = config;
        this.httpService = httpService;
        this.taskQueue = taskQueue;
        this.logger = new common_1.Logger(DomainsService_1.name, true);
    }
    getDomains(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const domains = user.domains;
            if (domains.length === 0) {
                return [];
            }
            const dkimKeyPromises = [];
            for (const [domainIndex, domain] of domains.entries()) {
                dkimKeyPromises.push(this.dkimService
                    .resolveDkimId(domain.domain)
                    .catch((error) => {
                    if (error.response.error !== 'DkimNotFoundError') {
                        throw error;
                    }
                })
                    .then((dkimId) => {
                    if (dkimId) {
                        domains[domainIndex].dkim = true;
                    }
                    else {
                        domains[domainIndex].dkim = false;
                    }
                }));
                if (domain.aliases) {
                    for (const [aliasIndex, alias] of domain.aliases.entries()) {
                        dkimKeyPromises.push(this.dkimService
                            .resolveDkimId(alias.domain)
                            .catch((error) => {
                            if (error.response.error !== 'DkimNotFoundError') {
                                throw error;
                            }
                        })
                            .then((dkimId) => {
                            if (dkimId) {
                                domains[domainIndex].aliases[aliasIndex].dkim = true;
                            }
                            else {
                                domains[domainIndex].aliases[aliasIndex].dkim = false;
                            }
                        }));
                    }
                }
            }
            yield Promise.all(dkimKeyPromises);
            return domains;
        });
    }
    checkDns(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfDomainIsAddedToUser(user, domain, true);
            const dnsCheck = {
                correctValues: {
                    mx: this.config.get('MX_RECORDS'),
                    spf: this.config.get('SPF_CORRECT_VALUE'),
                    dkim: undefined,
                },
                currentValues: {
                    mx: undefined,
                    spf: undefined,
                    dkim: undefined,
                },
                errors: [],
                warnings: [],
            };
            const dkimKey = yield this.dkimService.getDKIM(user, domain).catch((error) => {
                if (error.response.error !== 'DkimNotFoundError') {
                    throw error;
                }
            });
            if (dkimKey) {
                dnsCheck.correctValues.dkim = {
                    selector: dkimKey.selector,
                    value: dkimKey.dnsTxt.value,
                };
            }
            const nsRecords = yield dns_1.promises.resolveNs(domain).catch((error) => {
                switch (error.code) {
                    case 'ENODATA':
                    case 'ENOTFOUND':
                        return [];
                    default:
                        throw error;
                }
            });
            if (nsRecords.length === 0) {
                dnsCheck.errors.push({
                    type: 'ns',
                    error: 'NsNotFound',
                    message: `No nameservers found for ${domain}. You need them for your domain to work.`,
                });
                return dnsCheck;
            }
            const dnsCheckPromises = [];
            if (dkimKey) {
                dnsCheckPromises.push(dns_1.promises
                    .resolveTxt(`${dkimKey.selector}._domainkey.${domain}`)
                    .catch((error) => {
                    switch (error.code) {
                        case 'ENODATA':
                        case 'ENOTFOUND':
                            return [[]];
                        default:
                            throw error;
                    }
                })
                    .then((txtRecords) => __awaiter(this, void 0, void 0, function* () {
                    const combinedTxtRecords = txtRecords.map((item) => item.join(''));
                    const dkimTxtRecords = combinedTxtRecords.filter((value) => value.includes('v=DKIM1'));
                    dnsCheck.currentValues.dkim = {
                        selector: dkimKey.selector,
                        value: dkimTxtRecords.join(),
                    };
                    if (dkimTxtRecords.length === 0) {
                        dnsCheck.errors.push({
                            type: 'dkim',
                            error: 'DkimNotFound',
                            message: `DKIM signing is enabled on the server, but no DKIM record is configured on ${dkimKey.selector}._domainkey.${domain}.`,
                        });
                        return;
                    }
                    if (dkimTxtRecords.length > 1) {
                        dnsCheck.errors.push({
                            type: 'dkim',
                            error: 'DkimMultipleFound',
                            message: 'Multiple DKIM records found for this domain and selector, only one is allowed. The rest of the checks will be done on the first record.',
                        });
                    }
                    if (dkimTxtRecords[0] !== dkimKey.dnsTxt.value) {
                        dnsCheck.errors.push({
                            type: 'dkim',
                            error: 'DkimInvalid',
                            message: 'The DKIM record does not match the one above. Check for differences.',
                        });
                    }
                })));
            }
            dnsCheckPromises.push(dns_1.promises
                .resolveMx(domain)
                .catch((error) => {
                switch (error.code) {
                    case 'ENODATA':
                    case 'ENOTFOUND':
                        return [];
                    default:
                        throw error;
                }
            })
                .then((mxRecords) => {
                dnsCheck.currentValues.mx = mxRecords;
                if (mxRecords.length === 0) {
                    dnsCheck.errors.push({
                        type: 'mx',
                        error: 'MxNotFound',
                        message: 'No MX record(s) found for this domain. You need these to receive email.',
                    });
                    return;
                }
                for (const correctMxRecord of this.config.get('MX_RECORDS')) {
                    if (!mxRecords.some((mxRecord) => mxRecord.exchange === correctMxRecord.exchange)) {
                        dnsCheck.errors.push({
                            type: 'mx',
                            error: 'MxNotFound',
                            message: `${correctMxRecord.exchange} was not found in the current MX records. Valid MX records are needed to receive email.`,
                        });
                    }
                }
            }));
            dnsCheckPromises.push(dns_1.promises
                .resolveTxt(domain)
                .catch((error) => {
                switch (error.code) {
                    case 'ENODATA':
                    case 'ENOTFOUND':
                        return [[]];
                    default:
                        throw error;
                }
            })
                .then((txtRecords) => __awaiter(this, void 0, void 0, function* () {
                const combinedTxtRecords = txtRecords.map((item) => item.join(''));
                const spfTxtRecords = combinedTxtRecords.filter((value) => value.includes('v=spf1'));
                dnsCheck.currentValues.spf = spfTxtRecords.join();
                if (spfTxtRecords.length === 0) {
                    dnsCheck.errors.push({
                        type: 'spf',
                        error: 'SpfNotFound',
                        message: 'No SPF record found for this domain. You need this to send email.',
                    });
                    return;
                }
                if (spfTxtRecords.length > 1) {
                    dnsCheck.errors.push({
                        type: 'spf',
                        error: 'SpfMultipleFound',
                        message: 'Multiple SPF records found for this domain, only one is allowed. The rest of the checks will be done on the first record.',
                    });
                }
                if (this.config.get('SPF_REGEX') &&
                    new RegExp(this.config.get('SPF_REGEX')).test(spfTxtRecords[0])) {
                    dnsCheck.errors.push({
                        type: 'spf',
                        error: 'SpfInvalid',
                        message: `The SPF record is invalid. You need a valid SPF record to send email.`,
                    });
                }
            })));
            yield Promise.all(dnsCheckPromises);
            return dnsCheck;
        });
    }
    checkIfDomainAlreadyExists(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.domains.some((userdomain) => userdomain.domain === domain)) {
                throw new common_1.BadRequestException(`Domain: ${domain} is already added to your account`, 'DomainExistsError');
            }
            if (user.domains.some((userdomain) => userdomain.aliases && userdomain.aliases.some(alias => alias.domain === domain))) {
                throw new common_1.BadRequestException(`Domain: ${domain} is already added to your account as an alias`, 'DomainExistsError');
            }
            if ((yield this.usersService.countByDomain(domain)) > 0) {
                throw new common_1.BadRequestException(`Domain: ${domain} is already claimed by another user`, 'DomainClaimedError');
            }
        });
    }
    checkIfDomainIsAddedToUser(user, domain, includeAliases = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.domains.some((userDomain) => userDomain.domain === domain)) {
                if (!includeAliases ||
                    !user.domains.some((userdomain) => userdomain.aliases && userdomain.aliases.some(alias => alias.domain === domain))) {
                    throw new common_1.NotFoundException(`Domain: ${domain} doesn't exist in your account`, 'DomainNotFoundError');
                }
            }
        });
    }
    addDomain(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfDomainAlreadyExists(user, domain);
            yield this.usersService.pushDomain(user._id, { domain: domain, admin: true });
        });
    }
    deleteDomain(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfDomainIsAddedToUser(user, domain);
            try {
                yield this.dkimService.deleteDkim(user, domain);
            }
            catch (error) {
                if (error.response.error !== 'DkimNotFoundError') {
                    throw error;
                }
            }
            yield this.taskQueue.add('deleteAccounts', {
                user: user,
                domain: domain,
            });
            yield this.taskQueue.add('deleteForwarders', {
                user: user,
                domain: domain,
            });
            yield this.taskQueue.add('deleteAliases', {
                user: user,
                domain: domain,
            });
            yield this.usersService.pullDomain(user._id, domain);
        });
    }
    addAlias(user, domain, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfDomainIsAddedToUser(user, domain);
            yield this.checkIfDomainAlreadyExists(user, alias);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .post(`${this.config.get('WILDDUCK_API_URL')}/domainaliases`, {
                    domain: domain,
                    alias: alias,
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'AliasExists':
                        throw new common_1.BadRequestException(`Alias already exists`, 'AliasExistsError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            this.usersService.pushAlias(user._id, domain, { domain: alias });
        });
    }
    deleteAlias(user, domain, alias) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkIfDomainIsAddedToUser(user, domain);
            yield this.checkIfDomainIsAddedToUser(user, alias, true);
            let resolveResponse;
            try {
                resolveResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/domainaliases/resolve/${alias}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (resolveResponse.data.error || !resolveResponse.data.success) {
                switch (resolveResponse.data.code) {
                    case 'AliasNotFound':
                        throw new common_1.NotFoundException(`No such alias found`, 'AliasNotFoundError');
                    default:
                        this.logger.error(resolveResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            let deleteResponse;
            try {
                deleteResponse = yield this.httpService
                    .delete(`${this.config.get('WILDDUCK_API_URL')}/domainaliases/${resolveResponse.data.id}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (deleteResponse.data.error || !deleteResponse.data.success) {
                switch (deleteResponse.data.code) {
                    default:
                        this.logger.error(deleteResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            try {
                yield this.dkimService.deleteDkim(user, alias);
            }
            catch (error) {
                if (error.response.error !== 'DkimNotFoundError') {
                    throw error;
                }
            }
            this.usersService.pullAlias(user._id, alias);
        });
    }
};
DomainsService = DomainsService_1 = __decorate([
    common_1.Injectable(),
    __param(1, common_1.Inject(common_1.forwardRef(() => dkim_service_1.DkimService))),
    __param(4, bull_1.InjectQueue('deleteForDomain')),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        dkim_service_1.DkimService,
        config_service_1.ConfigService,
        common_1.HttpService, Object])
], DomainsService);
exports.DomainsService = DomainsService;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __webpack_require__(25);
const common_1 = __webpack_require__(1);
const accounts_module_1 = __webpack_require__(16);
const config_module_1 = __webpack_require__(17);
const config_service_1 = __webpack_require__(4);
const dkim_module_1 = __webpack_require__(33);
const forwarders_module_1 = __webpack_require__(29);
const users_module_1 = __webpack_require__(21);
const domains_controller_1 = __webpack_require__(74);
const domains_service_1 = __webpack_require__(12);
let DomainsModule = class DomainsModule {
};
DomainsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule.register({
                timeout: 10000,
            }),
            users_module_1.UsersModule,
            common_1.forwardRef(() => accounts_module_1.AccountsModule),
            common_1.forwardRef(() => dkim_module_1.DkimModule),
            forwarders_module_1.ForwardersModule,
            bull_1.BullModule.registerQueueAsync({
                name: 'deleteForDomain',
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: (config) => ({
                    name: 'deleteForDomain',
                    defaultJobOptions: {
                        attempts: 5,
                        backoff: {
                            delay: 6000,
                            type: 'exponential',
                        },
                        removeOnComplete: 1000,
                    },
                    redis: config.get('REDIS_URL'),
                }),
            }),
        ],
        controllers: [domains_controller_1.DomainsController],
        providers: [domains_service_1.DomainsService],
        exports: [domains_service_1.DomainsService],
    })
], DomainsModule);
exports.DomainsModule = DomainsModule;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const mongodb_1 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(11);
let ApiKey = class ApiKey {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    swagger_1.ApiPropertyOptional({
        example: 'pnx97h6p64t4gau6vbub-',
        description: 'Unique id for this api key',
        readOnly: true,
    }),
    __metadata("design:type", String)
], ApiKey.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], ApiKey.prototype, "userId", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'API key for my script',
        description: 'Name of api key',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], ApiKey.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: '2019-09-01T22:12:08.882Z',
        description: 'Date the api key was issued',
        readOnly: true,
    }),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], ApiKey.prototype, "issuedAt", void 0);
ApiKey = __decorate([
    typeorm_1.Entity('api-keys')
], ApiKey);
exports.ApiKey = ApiKey;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const domains_module_1 = __webpack_require__(13);
const accounts_controller_1 = __webpack_require__(78);
const accounts_service_1 = __webpack_require__(22);
let AccountsModule = class AccountsModule {
};
AccountsModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => domains_module_1.DomainsModule),
            common_1.HttpModule.register({
                timeout: 10000,
            }),
        ],
        controllers: [accounts_controller_1.AccountsController],
        providers: [accounts_service_1.AccountsService],
        exports: [accounts_service_1.AccountsService],
    })
], AccountsModule);
exports.AccountsModule = AccountsModule;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const config_service_1 = __webpack_require__(4);
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            {
                provide: config_service_1.ConfigService,
                useValue: new config_service_1.ConfigService(`config/${"production" || false}.env`),
            },
        ],
        exports: [config_service_1.ConfigService],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("nanoid");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
let Package = class Package {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    swagger_1.ApiPropertyOptional({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Unique id for this package',
        readOnly: true,
    }),
    __metadata("design:type", Object)
], Package.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({
        example: 'Small',
        description: 'Display name to use for this package',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 1073741824,
        description: 'Storage quota in bytes',
    }),
    typeorm_1.Column(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], Package.prototype, "quota", void 0);
Package = __decorate([
    typeorm_1.Entity({
        name: 'packages',
    })
], Package);
exports.Package = Package;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("class-transformer");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const packages_module_1 = __webpack_require__(38);
const user_entity_1 = __webpack_require__(5);
const users_cli_1 = __webpack_require__(68);
const users_controller_1 = __webpack_require__(70);
const users_service_1 = __webpack_require__(9);
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]), common_1.forwardRef(() => packages_module_1.PackagesModule)],
        providers: [users_service_1.UsersService, users_cli_1.UsersCli],
        exports: [users_service_1.UsersService],
        controllers: [users_controller_1.UsersController],
    })
], UsersModule);
exports.UsersModule = UsersModule;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var AccountsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const nanoid_1 = __importDefault(__webpack_require__(18));
const config_service_1 = __webpack_require__(4);
const domains_service_1 = __webpack_require__(12);
let AccountsService = AccountsService_1 = class AccountsService {
    constructor(httpService, config, domainsService) {
        this.httpService = httpService;
        this.config = config;
        this.domainsService = domainsService;
        this.logger = new common_1.Logger(AccountsService_1.name, true);
    }
    getAccounts(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.domains.length === 0) {
                return [];
            }
            let domainTags;
            if (domain) {
                yield this.domainsService.checkIfDomainIsAddedToUser(user, domain);
                domainTags = `domain:${domain}`;
            }
            else {
                domainTags = user.domains.map((domain) => `domain:${domain.domain}`).join();
            }
            let results = [];
            let nextCursor;
            while (true) {
                let apiResponse;
                try {
                    apiResponse = yield this.httpService
                        .get(`${this.config.get('WILDDUCK_API_URL')}/users`, {
                        headers: {
                            'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                        },
                        params: {
                            tags: domainTags,
                            limit: 250,
                            next: nextCursor,
                        },
                    })
                        .toPromise();
                }
                catch (error) {
                    this.logger.error(error.message);
                    throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
                }
                if (apiResponse.data.results.length === 0) {
                    return [];
                }
                results = results.concat(apiResponse.data.results);
                if (apiResponse.data.nextCursor) {
                    nextCursor = apiResponse.data.nextCursor;
                }
                else {
                    break;
                }
            }
            const accounts = [];
            for (const result of results) {
                accounts.push({
                    id: result.id,
                    name: result.name,
                    address: result.address,
                    quota: {
                        allowed: result.quota.allowed,
                        used: result.quota.used,
                    },
                    disabled: result.disabled,
                });
            }
            return accounts;
        });
    }
    getAccountDetails(user, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'UserNotFound':
                        throw new common_1.NotFoundException(`No account found with id: ${accountId}`, 'AccountNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            const addressDomain = apiResponse.data.address.substring(apiResponse.data.address.lastIndexOf('@') + 1);
            if (!user.domains.some((domain) => domain.domain === addressDomain)) {
                throw new common_1.NotFoundException(`No account found with id: ${accountId}`, 'AccountNotFoundError');
            }
            return {
                id: apiResponse.data.id,
                name: apiResponse.data.name,
                address: apiResponse.data.address,
                limits: {
                    quota: {
                        allowed: apiResponse.data.limits.quota.allowed,
                        used: apiResponse.data.limits.quota.used,
                    },
                    send: {
                        allowed: apiResponse.data.limits.recipients.allowed,
                        used: apiResponse.data.limits.recipients.used,
                        ttl: apiResponse.data.limits.recipients.ttl,
                    },
                    receive: {
                        allowed: apiResponse.data.limits.received.allowed,
                        used: apiResponse.data.limits.received.used,
                        ttl: apiResponse.data.limits.received.ttl,
                    },
                    forward: {
                        allowed: apiResponse.data.limits.forwards.allowed,
                        used: apiResponse.data.limits.forwards.used,
                        ttl: apiResponse.data.limits.forwards.ttl,
                    },
                },
                disabled: apiResponse.data.disabled,
                spamLevel: apiResponse.data.spamLevel,
                disabledScopes: apiResponse.data.disabledScopes,
            };
        });
    }
    createAccount(user, createAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const addressDomain = createAccountDto.address.substring(createAccountDto.address.lastIndexOf('@') + 1);
            if (!user.domains.some((domain) => domain.domain === addressDomain)) {
                throw new common_1.BadRequestException(`You don't have permission to add accounts on ${addressDomain}. Add the domain first.`, 'DomainNotFoundError');
            }
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .post(`${this.config.get('WILDDUCK_API_URL')}/users`, {
                    username: nanoid_1.default(),
                    address: createAccountDto.address,
                    name: createAccountDto.name,
                    password: createAccountDto.password,
                    spamLevel: createAccountDto.spamLevel,
                    quota: createAccountDto.limits.quota || this.config.get('MAX_QUOTA'),
                    recipients: createAccountDto.limits.send || this.config.get('MAX_SEND'),
                    receivedMax: createAccountDto.limits.receive || this.config.get('MAX_RECEIVE'),
                    forwards: createAccountDto.limits.forward || this.config.get('MAX_FORWARD'),
                    disabledScopes: createAccountDto.disabledScopes,
                    allowUnsafe: this.config.get('ALLOW_UNSAFE_ACCOUNT_PASSWORDS'),
                    tags: [`domain:${addressDomain}`],
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'AddressExistsError':
                    case 'UserExistsError':
                        throw new common_1.BadRequestException(`Address: ${createAccountDto.address} already exists`, 'AddressExistsError');
                    case 'InsecurePasswordError':
                        throw new common_1.BadRequestException('The provided password has previously appeared in a data breach (https://haveibeenpwned.com/Passwords)', 'InsecurePasswordError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    updateAccount(user, accountId, updateAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .put(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}`, {
                    name: updateAccountDto.name,
                    password: updateAccountDto.password,
                    spamLevel: updateAccountDto.spamLevel,
                    quota: updateAccountDto.limits.quota,
                    recipients: updateAccountDto.limits.send,
                    receivedMax: updateAccountDto.limits.receive,
                    forwards: updateAccountDto.limits.forward,
                    disabledScopes: updateAccountDto.disabledScopes,
                    allowUnsafe: this.config.get('ALLOW_UNSAFE_ACCOUNT_PASSWORDS'),
                    disabled: updateAccountDto.disabled,
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'InsecurePasswordError':
                        throw new common_1.BadRequestException('The provided password has previously appeared in a data breach (https://haveibeenpwned.com/Passwords)', 'InsecurePasswordError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    deleteAccount(user, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .delete(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'UserNotFound':
                        throw new common_1.NotFoundException(`No account found with id: ${accountId}`, 'AccountNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
};
AccountsService = AccountsService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        config_service_1.ConfigService,
        domains_service_1.DomainsService])
], AccountsService);
exports.AccountsService = AccountsService;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(10);
const mongodb_1 = __webpack_require__(14);
const nanoid_1 = __importDefault(__webpack_require__(18));
const typeorm_2 = __webpack_require__(11);
const api_key_entity_1 = __webpack_require__(15);
let ApiKeysService = class ApiKeysService {
    constructor(apiKeyRepository, jwtService) {
        this.apiKeyRepository = apiKeyRepository;
        this.jwtService = jwtService;
    }
    generateApiKey(user, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user._id,
                type: 'api_key',
            };
            const keyId = nanoid_1.default();
            const expireDate = new Date();
            expireDate.setFullYear(expireDate.getFullYear() + 100);
            this.addKey({
                _id: keyId,
                issuedAt: new Date(),
                name: name,
                userId: new mongodb_1.ObjectId(user._id),
            });
            return {
                accessToken: this.jwtService.sign(payload, {
                    expiresIn: `36500d`,
                    jwtid: keyId,
                }),
                details: {
                    _id: keyId,
                    issuedAt: new Date(),
                    name: name,
                },
            };
        });
    }
    addKey(apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            this.apiKeyRepository.insert(apiKey);
        });
    }
    getKey(userId, keyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiKeyRepository.findOne({
                _id: keyId,
                userId: new mongodb_1.ObjectId(userId),
            });
        });
    }
    revokeKey(userId, keyId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.apiKeyRepository.delete({
                _id: keyId,
                userId: new mongodb_1.ObjectId(userId),
            });
        });
    }
    getKeysForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiKeyRepository.find({
                select: ['_id', 'name', 'issuedAt'],
                where: { userId: new mongodb_1.ObjectId(userId) },
            });
        });
    }
};
ApiKeysService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(api_key_entity_1.ApiKey)),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        jwt_1.JwtService])
], ApiKeysService);
exports.ApiKeysService = ApiKeysService;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/bull");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
class DomainAlias {
}
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiProperty({ example: 'example.com', description: 'The domain name' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], DomainAlias.prototype, "domain", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ example: false, readOnly: true, description: 'If DKIM is active for this domain' }),
    __metadata("design:type", Boolean)
], DomainAlias.prototype, "dkim", void 0);
exports.DomainAlias = DomainAlias;
class Domain extends DomainAlias {
}
__decorate([
    typeorm_1.Column(),
    swagger_1.ApiPropertyOptional({
        example: true,
        readOnly: true,
        description: 'If this user is the domain admin, this currently serves no function',
    }),
    __metadata("design:type", Boolean)
], Domain.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column(() => DomainAlias),
    swagger_1.ApiPropertyOptional({
        description: 'Domains aliased to this domain',
        readOnly: true,
        type: DomainAlias,
        isArray: true,
    }),
    __metadata("design:type", Array)
], Domain.prototype, "aliases", void 0);
exports.Domain = Domain;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DkimService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const config_service_1 = __webpack_require__(4);
const domains_service_1 = __webpack_require__(12);
let DkimService = DkimService_1 = class DkimService {
    constructor(httpService, config, domainsService) {
        this.httpService = httpService;
        this.config = config;
        this.domainsService = domainsService;
        this.logger = new common_1.Logger(DkimService_1.name, true);
    }
    resolveDkimId(domain) {
        return __awaiter(this, void 0, void 0, function* () {
            let ApiResponse;
            try {
                ApiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/dkim/resolve/${domain}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (ApiResponse.data.error || !ApiResponse.data.success) {
                switch (ApiResponse.data.code) {
                    case 'DkimNotFound':
                        throw new common_1.NotFoundException(`No DKIM key found for domain: ${domain}`, 'DkimNotFoundError');
                    default:
                        this.logger.error(ApiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            return ApiResponse.data.id;
        });
    }
    deleteDkim(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.domainsService.checkIfDomainIsAddedToUser(user, domain, true);
            const dkimId = yield this.resolveDkimId(domain);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .delete(`${this.config.get('WILDDUCK_API_URL')}/dkim/${dkimId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'DkimNotFound':
                        throw new common_1.NotFoundException(`No DKIM key found for domain: ${domain}`, 'DkimNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    getDKIM(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.domainsService.checkIfDomainIsAddedToUser(user, domain, true);
            const dkimId = yield this.resolveDkimId(domain);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/dkim/${dkimId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'DkimNotFound':
                        throw new common_1.NotFoundException(`No DKIM key found for domain: ${domain}`, 'DkimNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            return {
                id: apiResponse.data.id,
                domain: apiResponse.data.domain,
                selector: apiResponse.data.selector,
                fingerprint: apiResponse.data.fingerprint,
                publicKey: apiResponse.data.publicKey,
                dnsTxt: {
                    name: apiResponse.data.dnsTxt.name,
                    value: apiResponse.data.dnsTxt.value,
                },
                created: apiResponse.data.created,
            };
        });
    }
    updateDkim(user, addDkimDto, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.domainsService.checkIfDomainIsAddedToUser(user, domain, true);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .post(`${this.config.get('WILDDUCK_API_URL')}/dkim`, {
                    domain: domain,
                    selector: addDkimDto.selector,
                    privateKey: addDkimDto.privateKey,
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'DkimNotFound':
                        throw new common_1.NotFoundException(`No DKIM key found for domain: ${domain}`, 'DkimNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            return {
                id: apiResponse.data.id,
                domain: apiResponse.data.domain,
                selector: apiResponse.data.selector,
                fingerprint: apiResponse.data.fingerprint,
                publicKey: apiResponse.data.publicKey,
                dnsTxt: {
                    name: apiResponse.data.dnsTxt.name,
                    value: apiResponse.data.dnsTxt.value,
                },
                created: apiResponse.data.created,
            };
        });
    }
};
DkimService = DkimService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        config_service_1.ConfigService,
        domains_service_1.DomainsService])
], DkimService);
exports.DkimService = DkimService;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const mongodb_1 = __webpack_require__(14);
const users_service_1 = __webpack_require__(9);
const typeorm_2 = __webpack_require__(11);
const package_entity_1 = __webpack_require__(19);
let PackagesService = class PackagesService {
    constructor(packageRepository, usersService) {
        this.packageRepository = packageRepository;
        this.usersService = usersService;
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.find();
        });
    }
    getPackageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packageRepository.findOne(id);
        });
    }
    savePackage(packagep) {
        return __awaiter(this, void 0, void 0, function* () {
            if (packagep._id) {
                packagep._id = new mongodb_1.ObjectId(packagep._id);
            }
            const packageEntity = this.packageRepository.create(packagep);
            return this.packageRepository.save(packageEntity);
        });
    }
    deletePackage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.usersService.countByPackage(id)) > 0) {
                throw new common_1.BadRequestException('Can not delete a package with users assigned to it', 'PackageInUseError');
            }
            this.packageRepository.delete(id);
        });
    }
};
PackagesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(package_entity_1.Package)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.MongoRepository,
        users_service_1.UsersService])
], PackagesService);
exports.PackagesService = PackagesService;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const domains_module_1 = __webpack_require__(13);
const forwarders_controller_1 = __webpack_require__(61);
const forwarders_service_1 = __webpack_require__(30);
let ForwardersModule = class ForwardersModule {
};
ForwardersModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => domains_module_1.DomainsModule),
            common_1.HttpModule.register({
                timeout: 10000,
            }),
        ],
        exports: [forwarders_service_1.ForwardersService],
        providers: [forwarders_service_1.ForwardersService],
        controllers: [forwarders_controller_1.ForwardersController],
    })
], ForwardersModule);
exports.ForwardersModule = ForwardersModule;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ForwardersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const config_service_1 = __webpack_require__(4);
const domains_service_1 = __webpack_require__(12);
let ForwardersService = ForwardersService_1 = class ForwardersService {
    constructor(httpService, config, domainsService) {
        this.httpService = httpService;
        this.config = config;
        this.domainsService = domainsService;
        this.logger = new common_1.Logger(ForwardersService_1.name, true);
    }
    getForwarders(user, domain) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user.domains.length === 0) {
                return [];
            }
            let domainTags;
            if (domain) {
                yield this.domainsService.checkIfDomainIsAddedToUser(user, domain);
                domainTags = `domain:${domain}`;
            }
            else {
                domainTags = user.domains.map((domain) => `domain:${domain.domain}`).join();
            }
            let results = [];
            let nextCursor;
            while (true) {
                let apiResponse;
                try {
                    apiResponse = yield this.httpService
                        .get(`${this.config.get('WILDDUCK_API_URL')}/addresses`, {
                        headers: {
                            'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                        },
                        params: {
                            tags: domainTags,
                            requiredTags: 'forwarder',
                            limit: 250,
                            next: nextCursor,
                        },
                    })
                        .toPromise();
                }
                catch (error) {
                    this.logger.error(error.message);
                    throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
                }
                if (apiResponse.data.results.length === 0) {
                    return [];
                }
                results = results.concat(apiResponse.data.results);
                if (apiResponse.data.nextCursor) {
                    nextCursor = apiResponse.data.nextCursor;
                }
                else {
                    break;
                }
            }
            const forwarders = [];
            for (const result of results) {
                forwarders.push({
                    id: result.id,
                    address: result.address,
                });
            }
            return forwarders;
        });
    }
    getForwarderDetails(user, forwarderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/addresses/forwarded/${forwarderId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                if (error.response.data.error) {
                    switch (error.response.data.code) {
                        case 'AddressNotFound':
                            throw new common_1.NotFoundException(`No forwarder found with id: ${forwarderId}`, 'ForwarderNotFoundError');
                        default:
                            this.logger.error(error.response.data);
                            throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
                    }
                }
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            const addressDomain = apiResponse.data.address.substring(apiResponse.data.address.lastIndexOf('@') + 1);
            if (!user.domains.some((domain) => domain.domain === addressDomain)) {
                throw new common_1.NotFoundException(`No forwarder found with id: ${forwarderId}`, 'ForwarderNotFoundError');
            }
            return {
                id: apiResponse.data.id,
                name: apiResponse.data.name,
                address: apiResponse.data.address,
                targets: apiResponse.data.targets,
                limits: {
                    forward: {
                        allowed: apiResponse.data.limits.forwards.allowed,
                        used: apiResponse.data.limits.forwards.used,
                        ttl: apiResponse.data.limits.forwards.ttl,
                    },
                },
            };
        });
    }
    createForwarder(user, createForwarderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const addressDomain = createForwarderDto.address.substring(createForwarderDto.address.lastIndexOf('@') + 1);
            if (!user.domains.some((domain) => domain.domain === addressDomain)) {
                throw new common_1.BadRequestException(`You don't have permission to add forwarders on ${addressDomain}. Add the domain first.`, 'DomainNotFoundError');
            }
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .post(`${this.config.get('WILDDUCK_API_URL')}/addresses/forwarded`, {
                    address: createForwarderDto.address,
                    name: createForwarderDto.name,
                    targets: createForwarderDto.targets,
                    forwards: createForwarderDto.limits.forward || this.config.get('MAX_FORWARD'),
                    allowWildcard: this.config.get('ALLOW_FORWARDER_WILDCARD'),
                    tags: [`domain:${addressDomain}`, 'forwarder'],
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'AddressExistsError':
                        throw new common_1.BadRequestException(`Address: ${createForwarderDto.address} already exists`, 'AddressExistsError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    updateForwarder(user, forwarderId, updateForwarderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let addressDomain;
            if (updateForwarderDto.address) {
                addressDomain = updateForwarderDto.address.substring(updateForwarderDto.address.lastIndexOf('@') + 1);
                if (!user.domains.some((domain) => domain.domain === addressDomain)) {
                    throw new common_1.BadRequestException(`You don't have permission to add forwarders on ${addressDomain}. Add the domain first.`, 'DomainNotFoundError');
                }
            }
            yield this.getForwarderDetails(user, forwarderId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .put(`${this.config.get('WILDDUCK_API_URL')}/addresses/forwarded/${forwarderId}`, {
                    address: updateForwarderDto.address,
                    name: updateForwarderDto.name,
                    targets: updateForwarderDto.targets,
                    forwards: updateForwarderDto.limits.forward,
                    tags: addressDomain ? [`domain:${addressDomain}`, 'forwarder'] : undefined,
                }, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'AddressExistsError':
                        throw new common_1.BadRequestException(`Address: ${updateForwarderDto.address} already exists`, 'AddressExistsError');
                    case 'ChangeNotAllowed':
                        throw new common_1.BadRequestException(`Update to address: ${updateForwarderDto.address} not allowed. Keep in mind wildcard addresses can not be changed`, 'AddressChangeNotAllowedError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    deleteForwarder(user, forwarderId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getForwarderDetails(user, forwarderId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .delete(`${this.config.get('WILDDUCK_API_URL')}/addresses/forwarded/${forwarderId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'AddressNotFound':
                        throw new common_1.NotFoundException(`No forwarder found with id: ${forwarderId}`, 'ForwarderNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
};
ForwardersService = ForwardersService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        config_service_1.ConfigService,
        domains_service_1.DomainsService])
], ForwardersService);
exports.ForwardersService = ForwardersService;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(23);
const bcrypt_1 = __importDefault(__webpack_require__(34));
const nanoid_1 = __importDefault(__webpack_require__(18));
const users_service_1 = __webpack_require__(9);
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    validateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.findByUsername(username);
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                delete user.password;
                return user;
            }
            else {
                return null;
            }
        });
    }
    getAccessToken(user, rememberMe = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user._id,
                type: 'access_token',
            };
            const expireHours = rememberMe ? 7 * 24 : 8;
            const expireDate = new Date();
            expireDate.setHours(expireDate.getHours() + expireHours);
            return {
                accessToken: this.jwtService.sign(payload, {
                    expiresIn: `${expireHours}h`,
                    jwtid: nanoid_1.default(),
                }),
                expires: expireDate,
            };
        });
    }
    expireTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.usersService.updateMinTokenDate(user._id);
        });
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("nestjs-console");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const domains_module_1 = __webpack_require__(13);
const dkim_controller_1 = __webpack_require__(56);
const dkim_service_1 = __webpack_require__(27);
let DkimModule = class DkimModule {
};
DkimModule = __decorate([
    common_1.Module({
        imports: [
            common_1.forwardRef(() => domains_module_1.DomainsModule),
            common_1.HttpModule.register({
                timeout: 10000,
            }),
        ],
        exports: [dkim_service_1.DkimService],
        controllers: [dkim_controller_1.DkimController],
        providers: [dkim_service_1.DkimService],
    })
], DkimModule);
exports.DkimModule = DkimModule;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
class Forwarder {
}
__decorate([
    swagger_1.ApiProperty({ example: '59cb948ad80a820b68f05230', description: 'The unique id of the forwarder' }),
    __metadata("design:type", String)
], Forwarder.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'john@example.com', description: 'The E-Mail address of the forwarder' }),
    __metadata("design:type", String)
], Forwarder.prototype, "address", void 0);
exports.Forwarder = Forwarder;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_transformer_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(2);
const is_email_or_url_validator_1 = __webpack_require__(37);
class CreateUpdateForwarderCommonDtoLimits {
}
__decorate([
    swagger_1.ApiPropertyOptional({ example: 600, description: 'How many messages can be forwarded per period' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CreateUpdateForwarderCommonDtoLimits.prototype, "forward", void 0);
class CreateUpdateForwarderCommonDto {
}
__decorate([
    swagger_1.ApiPropertyOptional({ example: 'John Doe', description: 'Identity name' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUpdateForwarderCommonDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: ['johndoe@example.com', 'smtp://mx.example.com:25', 'https://example.com'],
        description: 'An array of forwarding targets. The value could either be an email address or a relay url to next MX server ("smtp://mx2.zone.eu:25") or an URL where mail contents are POSTed to',
        type: [String],
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    class_validator_1.ArrayUnique(),
    class_validator_1.Validate(is_email_or_url_validator_1.EachIsEmailOrHttpOrSmtp),
    __metadata("design:type", Array)
], CreateUpdateForwarderCommonDto.prototype, "targets", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Limits for this forwarder' }),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => CreateUpdateForwarderCommonDtoLimits),
    __metadata("design:type", CreateUpdateForwarderCommonDtoLimits)
], CreateUpdateForwarderCommonDto.prototype, "limits", void 0);
exports.CreateUpdateForwarderCommonDto = CreateUpdateForwarderCommonDto;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const class_validator_1 = __webpack_require__(2);
let EachIsEmailOrHttpOrSmtp = class EachIsEmailOrHttpOrSmtp {
    constructor() {
        this.validator = new class_validator_1.Validator();
    }
    validate(input) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const item of input) {
                if (!(this.validator.isEmail(item) ||
                    this.validator.isURL(item, {
                        protocols: ['http', 'https', 'smtp', 'smtps'],
                        require_protocol: true,
                    }))) {
                    return false;
                }
            }
            return true;
        });
    }
    defaultMessage(args) {
        return `Each item in ${args.property} must be either an email, http(s) url, smtp(s) url`;
    }
};
EachIsEmailOrHttpOrSmtp = __decorate([
    class_validator_1.ValidatorConstraint({ async: true })
], EachIsEmailOrHttpOrSmtp);
exports.EachIsEmailOrHttpOrSmtp = EachIsEmailOrHttpOrSmtp;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const users_module_1 = __webpack_require__(21);
const package_entity_1 = __webpack_require__(19);
const packages_controller_1 = __webpack_require__(66);
const packages_service_1 = __webpack_require__(28);
let PackagesModule = class PackagesModule {
};
PackagesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([package_entity_1.Package]), common_1.forwardRef(() => users_module_1.UsersModule)],
        exports: [packages_service_1.PackagesService],
        controllers: [packages_controller_1.PackagesController],
        providers: [packages_service_1.PackagesService],
    })
], PackagesModule);
exports.PackagesModule = PackagesModule;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class UpdateUserDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'johndoe',
        description: 'The username for this user',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsAscii(),
    class_validator_1.NotContains(' ', { message: 'username must not contain spaces' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'supersecret',
        description: 'The password for this user',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
class Account {
}
__decorate([
    swagger_1.ApiProperty({ example: '59cb948ad80a820b68f05230', description: 'The unique id of the email account' }),
    __metadata("design:type", String)
], Account.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'John Doe', description: 'The name of the email account' }),
    __metadata("design:type", String)
], Account.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'john@example.com', description: 'The E-Mail address of the email account' }),
    __metadata("design:type", String)
], Account.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: false,
        description: 'If true then the account can not authenticate or receive any new mail',
    }),
    __metadata("design:type", Boolean)
], Account.prototype, "disabled", void 0);
exports.Account = Account;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_transformer_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(2);
class CreateUpdateAccountLimits {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 1073741824,
        description: 'How many bytes the account is allowed to use',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CreateUpdateAccountLimits.prototype, "quota", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 200,
        description: 'How many emails the account can send in a period',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CreateUpdateAccountLimits.prototype, "send", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 1000,
        description: 'How many emails the account can receive in a period',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CreateUpdateAccountLimits.prototype, "receive", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 100,
        description: 'How many emails the account can forward in a period',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    __metadata("design:type", Number)
], CreateUpdateAccountLimits.prototype, "forward", void 0);
class CreateUpdateAccountCommonDto {
    constructor() {
        this.limits = {};
    }
}
__decorate([
    swagger_1.ApiPropertyOptional({ example: 'John Doe', description: 'The name of the email account' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUpdateAccountCommonDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 50,
        description: 'Relative scale for detecting spam. 0 means that everything is spam, 100 means that nothing is spam',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(100),
    __metadata("design:type", Number)
], CreateUpdateAccountCommonDto.prototype, "spamLevel", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Account limits' }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => CreateUpdateAccountLimits),
    __metadata("design:type", CreateUpdateAccountLimits)
], CreateUpdateAccountCommonDto.prototype, "limits", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: ['imap', 'pop3'],
        description: 'List of scopes that are disabled for this user',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.Matches(new RegExp('^(pop3|imap|smtp)$'), {
        each: true,
        message: 'each value in disabledScopes must be either pop3, imap, smtp',
    }),
    __metadata("design:type", Array)
], CreateUpdateAccountCommonDto.prototype, "disabledScopes", void 0);
exports.CreateUpdateAccountCommonDto = CreateUpdateAccountCommonDto;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class AccountIdParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Unique id of the account' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], AccountIdParams.prototype, "accountId", void 0);
exports.AccountIdParams = AccountIdParams;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(23);
const typeorm_1 = __webpack_require__(10);
const config_module_1 = __webpack_require__(17);
const config_service_1 = __webpack_require__(4);
const api_key_entity_1 = __webpack_require__(15);
const api_keys_controller_1 = __webpack_require__(83);
const api_keys_service_1 = __webpack_require__(24);
let ApiKeysModule = class ApiKeysModule {
};
ApiKeysModule = __decorate([
    common_1.Module({
        controllers: [api_keys_controller_1.ApiKeysController],
        providers: [api_keys_service_1.ApiKeysService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([api_key_entity_1.ApiKey]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('TOKEN_SECRET'),
                }),
            }),
        ],
        exports: [api_keys_service_1.ApiKeysService],
    })
], ApiKeysModule);
exports.ApiKeysModule = ApiKeysModule;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
let ForbidApiKeyGuard = class ForbidApiKeyGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const jwt = request.user.jwt;
        if (jwt.type === 'api_key') {
            throw new common_1.ForbiddenException('This resource is forbidden when using an API key as authorization.', 'ApiKeyForbidden');
        }
        return true;
    }
};
ForbidApiKeyGuard = __decorate([
    common_1.Injectable()
], ForbidApiKeyGuard);
exports.ForbidApiKeyGuard = ForbidApiKeyGuard;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class LoginDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'johndoe', description: 'Username of the user you want to login as' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'supersecret', description: 'Password of the user you want to login as' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ example: false, description: 'Makes the token have a longer expiry time' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);
exports.LoginDto = LoginDto;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_transformer_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(2);
const is_email_or_url_validator_1 = __webpack_require__(37);
const filter_class_1 = __webpack_require__(47);
class Query {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 'John',
        description: 'Partial match for the From: header (case insensitive)',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Query.prototype, "from", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 'John',
        description: 'Partial match for the To:/Cc: headers (case insensitive)',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Query.prototype, "to", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 'You have 1 new notification',
        description: 'Partial match for the Subject: header (case insensitive)',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Query.prototype, "subject", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: "John's list",
        description: 'Partial match for the List-ID: header (case insensitive)',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Query.prototype, "listId", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 'Dedicated servers',
        description: 'Fulltext search against message text',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Query.prototype, "text", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: false,
        description: 'Does a message have to have an attachment or not',
        type: Boolean,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Object)
], Query.prototype, "ha", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 1000,
        description: 'Message size in bytes. If the value is a positive number then message needs to be larger, if negative then message needs to be smaller than abs(size) value',
        type: Number,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsNumber(),
    __metadata("design:type", Object)
], Query.prototype, "size", void 0);
class Action {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        example: true,
        description: 'If true then mark matching messages as Seen',
        type: Boolean,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Object)
], Action.prototype, "seen", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: true,
        description: 'If true then mark matching messages as Flagged',
        type: Boolean,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Object)
], Action.prototype, "flag", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: true,
        description: 'If true then do not store matching messages',
        type: Boolean,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Object)
], Action.prototype, "delete", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: true,
        description: 'If true then store matching messags to Junk Mail folder',
        type: Boolean,
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Object)
], Action.prototype, "spam", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: '5a1c0ee490a34c67e266932c',
        description: 'Mailbox ID to store matching messages to',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], Action.prototype, "mailbox", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: ['johndoe@example.com', 'smtp://mx.example.com:25', 'https://example.com'],
        description: 'An array of forwarding targets. The value could either be an email address or a relay url to next MX server ("smtp://mx2.zone.eu:25") or an URL where mail contents are POSTed to',
        type: [String],
    }),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateIf((object, value) => value !== ''),
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    class_validator_1.ArrayUnique(),
    class_validator_1.Validate(is_email_or_url_validator_1.EachIsEmailOrHttpOrSmtp),
    __metadata("design:type", Object)
], Action.prototype, "targets", void 0);
class CreateUpdateFilterDto extends filter_class_1.Filter {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Rules that a message must match' }),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined({ message: 'query should not be null or undefined. However, it can be empty' }),
    class_transformer_1.Type(() => Query),
    __metadata("design:type", Query)
], CreateUpdateFilterDto.prototype, "query", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Rules that a message must match' }),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined({ message: 'action should not be null or undefined. However, it can be empty' }),
    class_transformer_1.Type(() => Action),
    __metadata("design:type", Action)
], CreateUpdateFilterDto.prototype, "action", void 0);
exports.CreateUpdateFilterDto = CreateUpdateFilterDto;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class Filter {
}
__decorate([
    swagger_1.ApiPropertyOptional({ example: 'Mark as seen from John', description: 'The name of the filter' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Filter.prototype, "name", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ example: false, description: 'If true, then this filter is ignored' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Filter.prototype, "disabled", void 0);
exports.Filter = Filter;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var FiltersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const accounts_service_1 = __webpack_require__(22);
const config_service_1 = __webpack_require__(4);
let FiltersService = FiltersService_1 = class FiltersService {
    constructor(httpService, accountsService, config) {
        this.httpService = httpService;
        this.accountsService = accountsService;
        this.config = config;
        this.logger = new common_1.Logger(FiltersService_1.name, true);
    }
    deleteFilter(user, accountId, filterId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountsService.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .delete(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}/filters/${filterId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                if (error.response.status === 404) {
                    throw new common_1.NotFoundException(`Filter: ${filterId} not found`, 'FilterNotFoundError');
                }
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'FilterNotFound':
                        throw new common_1.NotFoundException(`Filter: ${filterId} not found`, 'FilterNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    getFilters(user, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountsService.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}/filters`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            if (apiResponse.data.results.length === 0) {
                return [];
            }
            const filters = [];
            for (const result of apiResponse.data.results) {
                filters.push({
                    id: result.id,
                    name: result.name,
                    disabled: result.disabled,
                    created: result.created,
                    action: result.action,
                    query: result.query,
                });
            }
            return filters;
        });
    }
    getFilter(user, accountId, filterId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountsService.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .get(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}/filters/${filterId}`, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'FilterNotFound':
                        throw new common_1.NotFoundException(`Filter: ${filterId} not found`, 'FilterNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
            const filter = {
                id: apiResponse.data.id,
                name: apiResponse.data.name,
                disabled: apiResponse.data.disabled,
                action: apiResponse.data.action,
                query: apiResponse.data.query,
            };
            return filter;
        });
    }
    createFilter(user, accountId, createUpdateFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountsService.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .post(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}/filters`, createUpdateFilterDto, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'NoSuchMailbox':
                        throw new common_1.BadRequestException(`The mailbox: ${createUpdateFilterDto.action.mailbox} does not exist on account: ${accountId}`, 'MailboxNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
    updateFilter(user, accountId, filterId, createUpdateFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accountsService.getAccountDetails(user, accountId);
            let apiResponse;
            try {
                apiResponse = yield this.httpService
                    .put(`${this.config.get('WILDDUCK_API_URL')}/users/${accountId}/filters/${filterId}`, createUpdateFilterDto, {
                    headers: {
                        'X-Access-Token': this.config.get('WILDDUCK_API_TOKEN'),
                    },
                })
                    .toPromise();
            }
            catch (error) {
                this.logger.error(error.message);
                throw new common_1.InternalServerErrorException('Backend service not reachable', 'WildduckApiError');
            }
            if (apiResponse.data.error || !apiResponse.data.success) {
                switch (apiResponse.data.code) {
                    case 'FilterNotFound':
                        throw new common_1.NotFoundException(`Filter: ${filterId} not found`, 'FilterNotFoundError');
                    case 'NoSuchMailbox':
                        throw new common_1.BadRequestException(`The mailbox: ${createUpdateFilterDto.action.mailbox} does not exist on account: ${accountId}`, 'MailboxNotFoundError');
                    default:
                        this.logger.error(apiResponse.data);
                        throw new common_1.InternalServerErrorException('Unknown error');
                }
            }
        });
    }
};
FiltersService = FiltersService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        accounts_service_1.AccountsService,
        config_service_1.ConfigService])
], FiltersService);
exports.FiltersService = FiltersService;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(10);
const bull_arena_1 = __importDefault(__webpack_require__(51));
const express_basic_auth_1 = __importDefault(__webpack_require__(52));
const nestjs_console_1 = __webpack_require__(32);
const accounts_module_1 = __webpack_require__(16);
const api_keys_module_1 = __webpack_require__(43);
const auth_module_1 = __webpack_require__(86);
const config_module_1 = __webpack_require__(17);
const config_service_1 = __webpack_require__(4);
const dkim_module_1 = __webpack_require__(33);
const domains_module_1 = __webpack_require__(13);
const filters_module_1 = __webpack_require__(93);
const forwarders_module_1 = __webpack_require__(29);
const packages_module_1 = __webpack_require__(38);
const delete_for_domain_module_1 = __webpack_require__(98);
const users_module_1 = __webpack_require__(21);
const entityContext = __webpack_require__(100);
const migrationContext = __webpack_require__(101);
let AppModule = class AppModule {
    constructor(config) {
        this.config = config;
    }
    configure(consumer) {
        if (this.config.get('ARENA_ENABLED')) {
            if (this.config.get('ARENA_USER')) {
                consumer
                    .apply(express_basic_auth_1.default({
                    challenge: true,
                    users: {
                        [this.config.get('ARENA_USER')]: this.config.get('ARENA_PASSWORD'),
                    },
                }))
                    .forRoutes(`arena`);
            }
            consumer
                .apply(bull_arena_1.default({
                queues: [
                    {
                        name: 'deleteForDomain',
                        hostId: 'DuckyAPI',
                        redis: this.config.get('REDIS_URL'),
                    },
                ],
            }, {
                disableListen: true,
            }))
                .forRoutes(`arena`);
        }
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: (config) => ({
                    type: 'mongodb',
                    url: config.get('MONGODB_URL'),
                    keepConnectionAlive: true,
                    entities: [
                        ...entityContext.keys().map(id => {
                            const entityModule = entityContext(id);
                            const [entity] = Object.values(entityModule);
                            return entity;
                        }),
                    ],
                    migrations: [
                        ...migrationContext.keys().map(id => {
                            const migrationModule = migrationContext(id);
                            const [migration] = Object.values(migrationModule);
                            return migration;
                        }),
                    ],
                    migrationsTransactionMode: 'each',
                    migrationsRun: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    appname: 'ducky-api',
                }),
                inject: [config_service_1.ConfigService],
            }),
            config_module_1.ConfigModule,
            auth_module_1.AuthModule,
            accounts_module_1.AccountsModule,
            users_module_1.UsersModule,
            domains_module_1.DomainsModule,
            filters_module_1.FiltersModule,
            dkim_module_1.DkimModule,
            forwarders_module_1.ForwardersModule,
            delete_for_domain_module_1.TasksModule,
            packages_module_1.PackagesModule,
            nestjs_console_1.ConsoleModule,
            api_keys_module_1.ApiKeysModule,
        ],
    }),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("bull-arena");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("express-basic-auth");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const dkim_key_class_1 = __webpack_require__(57);
const dkim_service_1 = __webpack_require__(27);
const add_dkim_dto_1 = __webpack_require__(59);
const dkim_params_1 = __webpack_require__(60);
let DkimController = class DkimController {
    constructor(dkimService) {
        this.dkimService = dkimService;
    }
    deleteDkim(user, dkimParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dkimService.deleteDkim(user, dkimParams.domainOrAlias);
        });
    }
    getDkim(user, dkimParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dkimService.getDKIM(user, dkimParams.domainOrAlias);
        });
    }
    updateDkim(user, addDkimDto, dkimParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dkimService.updateDkim(user, addDkimDto, dkimParams.domainOrAlias);
        });
    }
};
__decorate([
    common_1.Delete(),
    swagger_1.ApiOperation({ summary: 'Delete DKIM key for a domain' }),
    swagger_1.ApiOkResponse({ description: 'DKIM key successfully deleted' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, dkim_params_1.DkimParams]),
    __metadata("design:returntype", Promise)
], DkimController.prototype, "deleteDkim", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'Get DKIM key info for a domain' }),
    swagger_1.ApiOkResponse({ description: 'DKIM key info', type: dkim_key_class_1.DkimKey }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, dkim_params_1.DkimParams]),
    __metadata("design:returntype", Promise)
], DkimController.prototype, "getDkim", null);
__decorate([
    common_1.Put(),
    swagger_1.ApiOperation({ summary: 'Add or update DKIM key for a domain' }),
    swagger_1.ApiOkResponse({ description: 'DKIM key info', type: dkim_key_class_1.DkimKey }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Body()),
    __param(2, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        add_dkim_dto_1.AddDkimDto,
        dkim_params_1.DkimParams]),
    __metadata("design:returntype", Promise)
], DkimController.prototype, "updateDkim", null);
DkimController = __decorate([
    common_1.Controller('domains/:domainOrAlias/dkim'),
    swagger_1.ApiTags('Dkim'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    swagger_1.ApiNotFoundResponse({ description: 'Domain not found in account' }),
    __metadata("design:paramtypes", [dkim_service_1.DkimService])
], DkimController);
exports.DkimController = DkimController;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
class DnsTxt {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'ducky._domainkey.example.com',
        description: 'Domain name to which the TXT record should be added',
    }),
    __metadata("design:type", String)
], DnsTxt.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'v=DKIM1;t=s;p=MIGfMA0...', description: 'Value of the TXT record' }),
    __metadata("design:type", String)
], DnsTxt.prototype, "value", void 0);
class DkimKey {
}
__decorate([
    swagger_1.ApiProperty({ example: '59ef21aef255ed1d9d790e7a', description: 'Unique id of the DKIM key' }),
    __metadata("design:type", String)
], DkimKey.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'example.com', description: 'The domain this DKIM key applies to' }),
    __metadata("design:type", String)
], DkimKey.prototype, "domain", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'ducky', description: 'DKIM selector' }),
    __metadata("design:type", String)
], DkimKey.prototype, "selector", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '6a:aa:d7:ba:e4:99:b4:12:e0:f3:35:01:71:d4:f1:d6:b4:95:c4:f5',
        description: 'Unique id of the DKIM key',
    }),
    __metadata("design:type", String)
], DkimKey.prototype, "fingerprint", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '-----BEGIN PUBLIC KEY-----\r\nMIGfMA0...',
        description: 'Public key in DNS format (no prefix/suffix, single line)',
    }),
    __metadata("design:type", String)
], DkimKey.prototype, "publicKey", void 0);
__decorate([
    swagger_1.ApiProperty({ type: DnsTxt, description: 'Value for the DNS TXT record' }),
    __metadata("design:type", DnsTxt)
], DkimKey.prototype, "dnsTxt", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2017-10-24T11:19:10.911Z',
        description: 'Datestring of the time the DKIM key was created',
    }),
    __metadata("design:type", String)
], DkimKey.prototype, "created", void 0);
exports.DkimKey = DkimKey;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("dns");

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class AddDkimDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'default', description: 'Selector for dkim key' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], AddDkimDto.prototype, "selector", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: '-----BEGIN RSA PRIVATE KEY-----...',
        description: 'Pem formatted DKIM private key. If not set then a new 2048 bit RSA key is generated, beware though that it can take several seconds to complete',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    class_validator_1.Matches(new RegExp('^-----BEGIN (RSA )?PRIVATE KEY-----'), {
        message: 'privateKey should be a pem formatted private key',
    }),
    __metadata("design:type", String)
], AddDkimDto.prototype, "privateKey", void 0);
exports.AddDkimDto = AddDkimDto;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class DkimParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'example.com' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], DkimParams.prototype, "domainOrAlias", void 0);
exports.DkimParams = DkimParams;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const forwarder_details_class_1 = __webpack_require__(62);
const forwarder_class_1 = __webpack_require__(35);
const create_forwarder_dto_1 = __webpack_require__(63);
const update_forwarder_dto_1 = __webpack_require__(64);
const forwarders_service_1 = __webpack_require__(30);
const forwarder_id_params_1 = __webpack_require__(65);
let ForwardersController = class ForwardersController {
    constructor(forwardersService) {
        this.forwardersService = forwardersService;
    }
    deleteForwarder(user, forwarderIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forwardersService.deleteForwarder(user, forwarderIdParams.forwarderId);
        });
    }
    getForwarders(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forwardersService.getForwarders(user);
        });
    }
    getForwarderDetails(user, forwarderIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forwardersService.getForwarderDetails(user, forwarderIdParams.forwarderId);
        });
    }
    createForwarder(user, createForwarderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forwardersService.createForwarder(user, createForwarderDto);
        });
    }
    updateForwarder(user, forwarderIdParams, updateForwarderDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.forwardersService.updateForwarder(user, forwarderIdParams.forwarderId, updateForwarderDto);
        });
    }
};
__decorate([
    common_1.Delete(':forwarderId'),
    swagger_1.ApiOperation({ summary: 'Delete forwarder' }),
    swagger_1.ApiOkResponse({ description: 'Forwarder deleted successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No forwarder found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, forwarder_id_params_1.ForwarderIdParams]),
    __metadata("design:returntype", Promise)
], ForwardersController.prototype, "deleteForwarder", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'List forwarders' }),
    swagger_1.ApiOkResponse({ description: 'A list of forwarders', type: forwarder_class_1.Forwarder, isArray: true }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ForwardersController.prototype, "getForwarders", null);
__decorate([
    common_1.Get(':forwarderId'),
    swagger_1.ApiOperation({ summary: 'Get forwarder details' }),
    swagger_1.ApiOkResponse({ description: 'Forwarder details', type: forwarder_details_class_1.ForwarderDetails }),
    swagger_1.ApiNotFoundResponse({ description: 'No forwarder found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        forwarder_id_params_1.ForwarderIdParams]),
    __metadata("design:returntype", Promise)
], ForwardersController.prototype, "getForwarderDetails", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create a new forwarder' }),
    swagger_1.ApiCreatedResponse({ description: 'Forwarder created successfully' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_forwarder_dto_1.CreateForwarderDto]),
    __metadata("design:returntype", Promise)
], ForwardersController.prototype, "createForwarder", null);
__decorate([
    common_1.Put(':forwarderId'),
    swagger_1.ApiOperation({ summary: 'Update existing forwarder' }),
    swagger_1.ApiOkResponse({ description: 'Forwarder updated successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No forwarder found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        forwarder_id_params_1.ForwarderIdParams,
        update_forwarder_dto_1.UpdateForwarderDto]),
    __metadata("design:returntype", Promise)
], ForwardersController.prototype, "updateForwarder", null);
ForwardersController = __decorate([
    common_1.Controller('forwarders'),
    swagger_1.ApiTags('Forwarders'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __metadata("design:paramtypes", [forwarders_service_1.ForwardersService])
], ForwardersController);
exports.ForwardersController = ForwardersController;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const forwarder_class_1 = __webpack_require__(35);
class ForwarderDetailsForwards {
}
__decorate([
    swagger_1.ApiProperty({ example: 100, description: 'How many messages can be forwarded per period' }),
    __metadata("design:type", Number)
], ForwarderDetailsForwards.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 56, description: 'How many messages were forwarded in the current period' }),
    __metadata("design:type", Number)
], ForwarderDetailsForwards.prototype, "used", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 3600, description: 'Seconds until the end of the current period' }),
    __metadata("design:type", Number)
], ForwarderDetailsForwards.prototype, "ttl", void 0);
class ForwarderDetailsLimits {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Forwarding quota' }),
    __metadata("design:type", ForwarderDetailsForwards)
], ForwarderDetailsLimits.prototype, "forward", void 0);
class ForwarderDetails extends forwarder_class_1.Forwarder {
}
__decorate([
    swagger_1.ApiProperty({ example: 'John Doe', description: 'Identity name' }),
    __metadata("design:type", String)
], ForwarderDetails.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: ['johndoe@example.com', 'smtp://mx.example.com:25', 'https://example.com'],
        description: 'List of forwarding targets',
    }),
    __metadata("design:type", Array)
], ForwarderDetails.prototype, "targets", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Forwarder limits and usage' }),
    __metadata("design:type", ForwarderDetailsLimits)
], ForwarderDetails.prototype, "limits", void 0);
exports.ForwarderDetails = ForwarderDetails;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const create_update_forwarder_common_dto_1 = __webpack_require__(36);
class CreateForwarderDto extends create_update_forwarder_common_dto_1.CreateUpdateForwarderCommonDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'john@example.com', description: 'The E-Mail address that should be forwarded' }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateForwarderDto.prototype, "address", void 0);
exports.CreateForwarderDto = CreateForwarderDto;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const create_update_forwarder_common_dto_1 = __webpack_require__(36);
class UpdateForwarderDto extends create_update_forwarder_common_dto_1.CreateUpdateForwarderCommonDto {
}
__decorate([
    swagger_1.ApiPropertyOptional({
        example: 'john@example.com',
        description: 'The E-Mail address that should be forwarded',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], UpdateForwarderDto.prototype, "address", void 0);
exports.UpdateForwarderDto = UpdateForwarderDto;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class ForwarderIdParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Unique id of the forwarder' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], ForwarderIdParams.prototype, "forwarderId", void 0);
exports.ForwarderIdParams = ForwarderIdParams;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const users_service_1 = __webpack_require__(9);
const package_id_params_1 = __webpack_require__(67);
const package_entity_1 = __webpack_require__(19);
const packages_service_1 = __webpack_require__(28);
let PackagesController = class PackagesController {
    constructor(packagesService, usersService) {
        this.packagesService = packagesService;
        this.usersService = usersService;
    }
    getPackages() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packagesService.getPackages();
        });
    }
    createPackage(packaget) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packagesService.savePackage(packaget);
        });
    }
    updatePackage(packaget, packageIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldPackage = yield this.packagesService.getPackageById(packageIdParams.id);
            if (oldPackage) {
                packaget._id = packageIdParams.id;
                const savedPackage = yield this.packagesService.savePackage(packaget);
                yield this.usersService.replaceQuotasForPackage(packaget._id, oldPackage.quota, packaget.quota);
                return savedPackage;
            }
            else {
                throw new common_1.NotFoundException(`No package found with id ${packageIdParams.id}`, 'PackageNotFoundError');
            }
        });
    }
    deletePackage(packageIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.packagesService.deletePackage(packageIdParams.id);
        });
    }
};
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: '[Admin only] Get a list of packages' }),
    swagger_1.ApiOkResponse({ description: 'List of packages', type: package_entity_1.Package, isArray: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "getPackages", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: '[Admin only] Create package' }),
    swagger_1.ApiCreatedResponse({ description: 'Successfully created package', type: package_entity_1.Package }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_entity_1.Package]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "createPackage", null);
__decorate([
    common_1.Put(':id'),
    swagger_1.ApiOperation({
        summary: '[Admin only] Update package',
        description: 'Will also update quota for existing users, except if you modified the users quota manually.',
    }),
    swagger_1.ApiOkResponse({ description: 'Successfully updated package', type: package_entity_1.Package }),
    __param(0, common_1.Body()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_entity_1.Package, package_id_params_1.PackageIdParams]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "updatePackage", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({ summary: '[Admin only] Delete package' }),
    swagger_1.ApiOkResponse({ description: 'Successfully deleted package', type: package_entity_1.Package }),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_id_params_1.PackageIdParams]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "deletePackage", null);
PackagesController = __decorate([
    common_1.Controller('packages'),
    swagger_1.ApiTags('Packages'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [packages_service_1.PackagesService,
        users_service_1.UsersService])
], PackagesController);
exports.PackagesController = PackagesController;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class PackageIdParams {
}
__decorate([
    swagger_1.ApiProperty({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Unique id for the package',
    }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], PackageIdParams.prototype, "id", void 0);
exports.PackageIdParams = PackageIdParams;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const generate_password_1 = __importDefault(__webpack_require__(69));
const nestjs_console_1 = __webpack_require__(32);
const users_service_1 = __webpack_require__(9);
let UsersCli = class UsersCli {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createAdmin(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = nestjs_console_1.createSpinner();
            if (!password) {
                spinner.start(`Generating password`);
                password = generate_password_1.default.generate({
                    length: 12,
                    numbers: true,
                    excludeSimilarCharacters: true,
                });
                spinner.succeed('Password generated');
            }
            spinner.start(`Creating admin user with username: "${username}" and password: "${password}"`);
            const user = {
                username: username,
                password: password,
            };
            try {
                yield this.usersService.createUser(user, true);
            }
            catch (error) {
                spinner.fail(`Failed creating admin user with username: "${username}" and password: "${password}":`);
                console.error(error);
                process.exit(1);
            }
            spinner.succeed(`Created admin user with username: "${username}" and password: "${password}"`);
            process.exit(0);
        });
    }
};
__decorate([
    nestjs_console_1.Command({
        command: 'create-admin <username> [password]',
        description: 'Create admin user',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UsersCli.prototype, "createAdmin", null);
UsersCli = __decorate([
    nestjs_console_1.Console(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersCli);
exports.UsersCli = UsersCli;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = require("generate-password");

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const create_user_dto_1 = __webpack_require__(71);
const update_user_admin_dto_1 = __webpack_require__(72);
const update_user_dto_1 = __webpack_require__(39);
const user_id_params_dto_1 = __webpack_require__(73);
const user_entity_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(9);
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    createUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.createUser(createUserDto);
        });
    }
    getMe(user) {
        return __awaiter(this, void 0, void 0, function* () {
            delete user.password;
            delete user.package;
            delete user.minTokenDate;
            return user;
        });
    }
    updateMe(user, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.usersService.updateUsernameOrPassword(user._id, updateUserDto);
        });
    }
    updateUser(updateUserAdminDto, userIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            if (updateUserAdminDto.username || updateUserAdminDto.password) {
                this.usersService.updateUsernameOrPassword(userIdParams.id, updateUserAdminDto);
            }
            if (updateUserAdminDto.packageId) {
                this.usersService.updatePackage(userIdParams.id, updateUserAdminDto.packageId);
            }
        });
    }
};
__decorate([
    common_1.Post(),
    roles_decorator_1.Roles('admin'),
    swagger_1.ApiTags('Users'),
    swagger_1.ApiOperation({ summary: '[Admin only] Create new API user' }),
    swagger_1.ApiCreatedResponse({ description: 'User successfully created' }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    common_1.Get('me'),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiTags('Profile'),
    swagger_1.ApiOperation({ summary: 'Get account info for current access token' }),
    swagger_1.ApiOkResponse({ description: 'User info', type: user_entity_1.User }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getMe", null);
__decorate([
    common_1.Put('me'),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiTags('Profile'),
    swagger_1.ApiOperation({ summary: 'Update username/password' }),
    swagger_1.ApiOkResponse({ description: 'User updated successfully' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateMe", null);
__decorate([
    common_1.Put(':id'),
    roles_decorator_1.Roles('admin'),
    swagger_1.ApiTags('Users'),
    swagger_1.ApiOperation({ summary: '[Admin only] Update API user' }),
    swagger_1.ApiOkResponse(),
    __param(0, common_1.Body()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_admin_dto_1.UpdateUserAdminDto,
        user_id_params_dto_1.UserIdParams]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUser", null);
UsersController = __decorate([
    common_1.Controller('users'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class CreateUserDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'johndoe',
        description: 'The username for this user',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    class_validator_1.IsAscii(),
    class_validator_1.NotContains(' ', { message: 'username must not contain spaces' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'supersecret',
        description: 'The password for this user',
    }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Package id to assign to this user',
        required: true,
    }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "packageId", void 0);
exports.CreateUserDto = CreateUserDto;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const update_user_dto_1 = __webpack_require__(39);
class UpdateUserAdminDto extends update_user_dto_1.UpdateUserDto {
}
__decorate([
    swagger_1.ApiProperty({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Package id to assign to this user',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], UpdateUserAdminDto.prototype, "packageId", void 0);
exports.UpdateUserAdminDto = UpdateUserAdminDto;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class UserIdParams {
}
__decorate([
    swagger_1.ApiProperty({
        example: '5d49e11f600a423ffc0b1297',
        description: 'Unique id for the user',
    }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], UserIdParams.prototype, "id", void 0);
exports.UserIdParams = UserIdParams;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const dns_class_1 = __webpack_require__(75);
const domain_entity_1 = __webpack_require__(26);
const domains_service_1 = __webpack_require__(12);
const alias_params_1 = __webpack_require__(76);
const domain_params_1 = __webpack_require__(77);
let DomainsController = class DomainsController {
    constructor(domainsService) {
        this.domainsService = domainsService;
    }
    deleteDomain(user, domainParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domainsService.deleteDomain(user, domainParams.domain);
        });
    }
    getDomains(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domainsService.getDomains(user);
        });
    }
    addDomain(user, domainDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domainsService.addDomain(user, domainDto.domain);
        });
    }
    checkDNS(user, domainParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.domainsService.checkDns(user, domainParams.domain);
        });
    }
    addAlias(user, domainParams, domainAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.domainsService.addAlias(user, domainParams.domain, domainAlias.domain);
        });
    }
    deleteAlias(user, aliasParams) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.domainsService.deleteAlias(user, aliasParams.domain, aliasParams.alias);
        });
    }
};
__decorate([
    common_1.Delete(':domain'),
    swagger_1.ApiOperation({
        summary: 'Delete a domain',
        description: 'WARNING: This will also delete any email accounts, forwarders, and DKIM keys associated with this domain',
    }),
    swagger_1.ApiOkResponse({ description: 'Domain successfully deleted' }),
    swagger_1.ApiNotFoundResponse({ description: 'Domain not found on account' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, domain_params_1.DomainParams]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "deleteDomain", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'List domains' }),
    swagger_1.ApiOkResponse({ description: 'A list of domains', type: domain_entity_1.Domain, isArray: true }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "getDomains", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Add a domain' }),
    swagger_1.ApiCreatedResponse({ description: 'Domain successfully added' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, domain_entity_1.Domain]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "addDomain", null);
__decorate([
    common_1.Get(':domain/DNS'),
    swagger_1.ApiOperation({ summary: 'Get and check DNS records' }),
    swagger_1.ApiOkResponse({ description: 'The current and the correct DNS records for this domain', type: dns_class_1.DnsCheck }),
    swagger_1.ApiNotFoundResponse({ description: 'Domain not found on account' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, domain_params_1.DomainParams]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "checkDNS", null);
__decorate([
    common_1.Post(':domain/aliases'),
    swagger_1.ApiOperation({ summary: 'Add a domain alias' }),
    swagger_1.ApiCreatedResponse({ description: 'Alias successfully added' }),
    swagger_1.ApiNotFoundResponse({ description: 'Domain not found on account' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        domain_params_1.DomainParams,
        domain_entity_1.DomainAlias]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "addAlias", null);
__decorate([
    common_1.Delete(':domain/aliases/:alias'),
    swagger_1.ApiOperation({ summary: 'Delete a domain alias' }),
    swagger_1.ApiCreatedResponse({ description: 'Alias successfully deleted' }),
    swagger_1.ApiNotFoundResponse({ description: 'Domain not found on account' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, alias_params_1.AliasParams]),
    __metadata("design:returntype", Promise)
], DomainsController.prototype, "deleteAlias", null);
DomainsController = __decorate([
    common_1.Controller('domains'),
    swagger_1.ApiTags('Domains'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __metadata("design:paramtypes", [domains_service_1.DomainsService])
], DomainsController);
exports.DomainsController = DomainsController;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
class DnsCheckMxRecord {
}
__decorate([
    swagger_1.ApiProperty({ example: 'mx.example.com', description: 'MX record server' }),
    __metadata("design:type", String)
], DnsCheckMxRecord.prototype, "exchange", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 1, description: 'MX record priority' }),
    __metadata("design:type", Number)
], DnsCheckMxRecord.prototype, "priority", void 0);
exports.DnsCheckMxRecord = DnsCheckMxRecord;
class DnsCheckDkimRecord {
}
__decorate([
    swagger_1.ApiProperty({ example: 'default', description: 'DKIM record selector' }),
    __metadata("design:type", String)
], DnsCheckDkimRecord.prototype, "selector", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'v=DKIM1;t=s;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAseRvI//jDgRsZ1BtGixcLO16/B8yEzsgVSBvCWgwf39LRAey14eZLoyyolX7wVUe71VN67cEuey7XlYGHzGntDtLh/CmI8vvDaiym0VNv8zrZok2TbYW0I4Ts9YkNtCUC5EKjyrwX7AT97ZjiXVX6JK+oEmdtgwxtrQc9+trYj3udlStEmpH0yluY3kSmUYDe3e4TEdLUX7+x/i4D8+65dIXdw52cRNka9aMpH7ZdsfPvrFd6y+ItOuX1Zsb8uFdQz21/Tf1aVczwbZgpUFfpyt55erLwfFLdlH7aRwBIJGQDMzl4SFkGgxDuSPjUePHO266PiHm2/r8A0515n3ZCwIDAQAB',
        description: 'DKIM record value',
    }),
    __metadata("design:type", String)
], DnsCheckDkimRecord.prototype, "value", void 0);
class DnsCheckCurrentValues {
}
__decorate([
    swagger_1.ApiProperty({ description: 'List of DNS records', type: DnsCheckMxRecord, isArray: true }),
    __metadata("design:type", Array)
], DnsCheckCurrentValues.prototype, "mx", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'v=spf1 include:example.com -all', description: 'Value of the SPF record' }),
    __metadata("design:type", String)
], DnsCheckCurrentValues.prototype, "spf", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({ description: 'DKIM record selector and value' }),
    __metadata("design:type", DnsCheckDkimRecord)
], DnsCheckCurrentValues.prototype, "dkim", void 0);
class DnsCheckError {
}
__decorate([
    swagger_1.ApiProperty({ example: 'dkim', description: 'Type of error/warning. Can be ns, mx, spf, dkim' }),
    __metadata("design:type", String)
], DnsCheckError.prototype, "type", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'DkimNotFound', description: 'Machine readable error/warning string' }),
    __metadata("design:type", String)
], DnsCheckError.prototype, "error", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: 'DKIM is enabled, but no record was found',
        description: 'Human readable error/warning message',
    }),
    __metadata("design:type", String)
], DnsCheckError.prototype, "message", void 0);
class DnsCheckWarning extends DnsCheckError {
}
class DnsCheckCorrectValues extends DnsCheckCurrentValues {
}
class DnsCheck {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Current values of the DNS records' }),
    __metadata("design:type", DnsCheckCurrentValues)
], DnsCheck.prototype, "currentValues", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Correct values of the DNS records' }),
    __metadata("design:type", DnsCheckCorrectValues)
], DnsCheck.prototype, "correctValues", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'List of errors with the DNS records', type: DnsCheckError, isArray: true }),
    __metadata("design:type", Array)
], DnsCheck.prototype, "errors", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'List of warnings with the DNS records', type: DnsCheckError, isArray: true }),
    __metadata("design:type", Array)
], DnsCheck.prototype, "warnings", void 0);
exports.DnsCheck = DnsCheck;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class AliasParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'example.com' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], AliasParams.prototype, "domain", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'example.com' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], AliasParams.prototype, "alias", void 0);
exports.AliasParams = AliasParams;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class DomainParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'example.com' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsFQDN(),
    __metadata("design:type", String)
], DomainParams.prototype, "domain", void 0);
exports.DomainParams = DomainParams;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const accounts_service_1 = __webpack_require__(22);
const account_details_class_1 = __webpack_require__(79);
const account_list_item_class_1 = __webpack_require__(80);
const create_account_dto_1 = __webpack_require__(81);
const update_account_dto_1 = __webpack_require__(82);
const account_id_params_1 = __webpack_require__(42);
let AccountsController = class AccountsController {
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    deleteAccount(user, accountIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsService.deleteAccount(user, accountIdParams.accountId);
        });
    }
    getAccounts(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsService.getAccounts(user);
        });
    }
    getAccountDetails(user, accountIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsService.getAccountDetails(user, accountIdParams.accountId);
        });
    }
    createAccount(user, createAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsService.createAccount(user, createAccountDto);
        });
    }
    updateAccount(user, accountIdParams, updateAccountDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.accountsService.updateAccount(user, accountIdParams.accountId, updateAccountDto);
        });
    }
};
__decorate([
    common_1.Delete(':accountId'),
    swagger_1.ApiOperation({ summary: 'Delete email account' }),
    swagger_1.ApiOkResponse({ description: 'Account deleted successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No account found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, account_id_params_1.AccountIdParams]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "deleteAccount", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'List email accounts' }),
    swagger_1.ApiOkResponse({ description: 'A list of accounts', type: account_list_item_class_1.AccountListItem, isArray: true }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAccounts", null);
__decorate([
    common_1.Get(':accountId'),
    swagger_1.ApiOperation({ summary: 'Get email account details' }),
    swagger_1.ApiOkResponse({ description: 'Account details', type: account_details_class_1.AccountDetails }),
    swagger_1.ApiNotFoundResponse({ description: 'No account found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        account_id_params_1.AccountIdParams]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "getAccountDetails", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create a new email account' }),
    swagger_1.ApiCreatedResponse({ description: 'Account created successfully' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, create_account_dto_1.CreateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "createAccount", null);
__decorate([
    common_1.Put(':accountId'),
    swagger_1.ApiOperation({ summary: 'Update existing email account' }),
    swagger_1.ApiOkResponse({ description: 'Account updated successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No account found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        account_id_params_1.AccountIdParams,
        update_account_dto_1.UpdateAccountDto]),
    __metadata("design:returntype", Promise)
], AccountsController.prototype, "updateAccount", null);
AccountsController = __decorate([
    common_1.Controller('accounts'),
    swagger_1.ApiTags('Email Accounts'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService])
], AccountsController);
exports.AccountsController = AccountsController;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const account_class_1 = __webpack_require__(40);
class AccountDetailsLimitsQuota {
}
__decorate([
    swagger_1.ApiProperty({ example: 1073741824, description: 'How many bytes the account is allowed to use' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsQuota.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 2048, description: 'How many bytes the account is currently using' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsQuota.prototype, "used", void 0);
class AccountDetailsLimitsSend {
}
__decorate([
    swagger_1.ApiProperty({ example: 200, description: 'How many messages can be sent per period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsSend.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 231, description: 'How many messages were sent in the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsSend.prototype, "used", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 3600, description: 'Seconds until the end of the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsSend.prototype, "ttl", void 0);
class AccountDetailsLimitsReceive {
}
__decorate([
    swagger_1.ApiProperty({ example: 1000, description: 'How many messages can be received per period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsReceive.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 574, description: 'How many messages were received in the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsReceive.prototype, "used", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 3600, description: 'Seconds until the end of the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsReceive.prototype, "ttl", void 0);
class AccountDetailsLimitsForward {
}
__decorate([
    swagger_1.ApiProperty({ example: 100, description: 'How many messages can be forwarded per period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsForward.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 56, description: 'How many messages were forwarded in the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsForward.prototype, "used", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 3600, description: 'Seconds until the end of the current period' }),
    __metadata("design:type", Number)
], AccountDetailsLimitsForward.prototype, "ttl", void 0);
class AccountDetailsLimits {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Storage quota limit and usage' }),
    __metadata("design:type", AccountDetailsLimitsQuota)
], AccountDetailsLimits.prototype, "quota", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'How many emails the account can send in a period' }),
    __metadata("design:type", AccountDetailsLimitsSend)
], AccountDetailsLimits.prototype, "send", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'How many emails the account can receive in a period' }),
    __metadata("design:type", AccountDetailsLimitsReceive)
], AccountDetailsLimits.prototype, "receive", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'How many emails the account can forward in a period' }),
    __metadata("design:type", AccountDetailsLimitsForward)
], AccountDetailsLimits.prototype, "forward", void 0);
class AccountDetails extends account_class_1.Account {
}
__decorate([
    swagger_1.ApiProperty({
        example: 50,
        description: 'Relative scale for detecting spam. 0 means that everything is spam, 100 means that nothing is spam',
    }),
    __metadata("design:type", Number)
], AccountDetails.prototype, "spamLevel", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: ['imap', 'pop3'],
        description: 'List of scopes that are disabled for this user',
    }),
    __metadata("design:type", Array)
], AccountDetails.prototype, "disabledScopes", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Account limits' }),
    __metadata("design:type", AccountDetailsLimits)
], AccountDetails.prototype, "limits", void 0);
exports.AccountDetails = AccountDetails;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const account_class_1 = __webpack_require__(40);
class AccountListItemQuota {
}
__decorate([
    swagger_1.ApiProperty({ example: 1073741824, description: 'How many bytes the account is allowed to use' }),
    __metadata("design:type", Number)
], AccountListItemQuota.prototype, "allowed", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 17799833, description: 'How many bytes the account is currently using' }),
    __metadata("design:type", Number)
], AccountListItemQuota.prototype, "used", void 0);
class AccountListItem extends account_class_1.Account {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Account quota usage and limit' }),
    __metadata("design:type", AccountListItemQuota)
], AccountListItem.prototype, "quota", void 0);
exports.AccountListItem = AccountListItem;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const create_update_common_dto_1 = __webpack_require__(41);
class CreateAccountDto extends create_update_common_dto_1.CreateUpdateAccountCommonDto {
}
__decorate([
    swagger_1.ApiProperty({ example: 'john@example.com', description: 'The E-Mail address of the email account' }),
    class_validator_1.IsEmail(),
    class_validator_1.NotContains('*'),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "address", void 0);
__decorate([
    swagger_1.ApiProperty({ example: 'verysecret', description: 'The new password of the email account' }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
exports.CreateAccountDto = CreateAccountDto;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
const create_update_common_dto_1 = __webpack_require__(41);
class UpdateAccountDto extends create_update_common_dto_1.CreateUpdateAccountCommonDto {
}
__decorate([
    swagger_1.ApiPropertyOptional({ example: 'verysecret', description: 'The new password of the email account' }),
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateAccountDto.prototype, "password", void 0);
__decorate([
    swagger_1.ApiPropertyOptional({
        example: false,
        description: 'If true then the account can not authenticate or receive any new mail',
    }),
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateAccountDto.prototype, "disabled", void 0);
exports.UpdateAccountDto = UpdateAccountDto;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const api_key_access_token_1 = __webpack_require__(84);
const api_key_id_params_1 = __webpack_require__(85);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const forbid_api_key_guard_1 = __webpack_require__(44);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const api_key_entity_1 = __webpack_require__(15);
const api_keys_service_1 = __webpack_require__(24);
let ApiKeysController = class ApiKeysController {
    constructor(apiKeysService) {
        this.apiKeysService = apiKeysService;
    }
    createApiKey(user, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiKeysService.generateApiKey(user, apiKey.name);
        });
    }
    getApiKeys(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiKeysService.getKeysForUser(user._id);
        });
    }
    revokeApiKey(user, apiKeyIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apiKeysService.revokeKey(user._id, apiKeyIdParams.id);
        });
    }
};
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({
        summary: 'Create an API key',
        description: 'Note: This resource is forbidden when using an API key as authorization. Use an access token.',
    }),
    common_1.UseGuards(forbid_api_key_guard_1.ForbidApiKeyGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiCreatedResponse({ description: 'API key', type: api_key_access_token_1.ApiKeyAccessToken }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, api_key_entity_1.ApiKey]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "createApiKey", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'List active api keys' }),
    swagger_1.ApiOkResponse({ description: 'List of active api keys', type: api_key_entity_1.ApiKey, isArray: true }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "getApiKeys", null);
__decorate([
    common_1.Delete(':id'),
    swagger_1.ApiOperation({
        summary: 'Revoke api key',
        description: 'Note: This resource is forbidden when using an API key as authorization. Use an access token.',
    }),
    common_1.UseGuards(forbid_api_key_guard_1.ForbidApiKeyGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiOkResponse({ description: 'Api key revoked' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, api_key_id_params_1.ApiKeyIdParams]),
    __metadata("design:returntype", Promise)
], ApiKeysController.prototype, "revokeApiKey", null);
ApiKeysController = __decorate([
    common_1.Controller('apikeys'),
    swagger_1.ApiTags('Api Keys'),
    common_1.UseGuards(passport_1.AuthGuard('jwt')),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    __metadata("design:paramtypes", [api_keys_service_1.ApiKeysService])
], ApiKeysController);
exports.ApiKeysController = ApiKeysController;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_transformer_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(2);
const api_key_entity_1 = __webpack_require__(15);
class ApiKeyAccessToken {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOiI1ZDM1ZDczZmU0YTY3NzVmYjQxZmE0ZjEiLCJpYXQiOjE1NjM5MTU0OTgsImV4cCI6MTU2MzkxNTc5OH0.qYejtBl1Tcv9IWgp9Ax5FiR6uT_W0VwizHkB-3S7_r0',
        description: 'API key that can be used to authenticate against the api',
    }),
    __metadata("design:type", String)
], ApiKeyAccessToken.prototype, "accessToken", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: 'API key details',
    }),
    class_validator_1.ValidateNested(),
    class_transformer_1.Type(() => api_key_entity_1.ApiKey),
    __metadata("design:type", api_key_entity_1.ApiKey)
], ApiKeyAccessToken.prototype, "details", void 0);
exports.ApiKeyAccessToken = ApiKeyAccessToken;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class ApiKeyIdParams {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'pnx97h6p64t4gau6vbub-',
        description: 'Unique id of the api key',
    }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ApiKeyIdParams.prototype, "id", void 0);
exports.ApiKeyIdParams = ApiKeyIdParams;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(23);
const passport_1 = __webpack_require__(3);
const api_keys_module_1 = __webpack_require__(43);
const config_module_1 = __webpack_require__(17);
const config_service_1 = __webpack_require__(4);
const users_module_1 = __webpack_require__(21);
const auth_controller_1 = __webpack_require__(87);
const auth_service_1 = __webpack_require__(31);
const jwt_strategy_1 = __webpack_require__(89);
const local_strategy_1 = __webpack_require__(91);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule,
            api_keys_module_1.ApiKeysModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                inject: [config_service_1.ConfigService],
                useFactory: (config) => ({
                    secret: config.get('TOKEN_SECRET'),
                }),
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const forbid_api_key_guard_1 = __webpack_require__(44);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const api_keys_service_1 = __webpack_require__(24);
const auth_service_1 = __webpack_require__(31);
const access_token_class_1 = __webpack_require__(88);
const login_dto_1 = __webpack_require__(45);
let AuthController = class AuthController {
    constructor(authService, apiKeysService) {
        this.authService = authService;
        this.apiKeysService = apiKeysService;
    }
    revokeAllAccessTokens(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.expireTokens(user);
        });
    }
    getAccessToken(user, loginDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authService.getAccessToken(user, loginDto.rememberMe);
        });
    }
};
__decorate([
    common_1.Delete(),
    swagger_1.ApiOperation({
        summary: 'Revoke previous access tokens',
        description: 'Note: This resource is forbidden when using an API key as authorization. Use an access token.',
    }),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), forbid_api_key_guard_1.ForbidApiKeyGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiOkResponse({ description: 'Successfully expired previous tokens' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "revokeAllAccessTokens", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Get an access token' }),
    common_1.UseGuards(passport_1.AuthGuard('local')),
    swagger_1.ApiCreatedResponse({ description: 'Login successful', type: access_token_class_1.AccessToken }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid username or password' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAccessToken", null);
AuthController = __decorate([
    common_1.Controller('authentication'),
    swagger_1.ApiTags('Authentication'),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, api_keys_service_1.ApiKeysService])
], AuthController);
exports.AuthController = AuthController;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
class AccessToken {
}
__decorate([
    swagger_1.ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UiLCJzdWIiOiI1ZDM1ZDczZmU0YTY3NzVmYjQxZmE0ZjEiLCJpYXQiOjE1NjM5MTU0OTgsImV4cCI6MTU2MzkxNTc5OH0.qYejtBl1Tcv9IWgp9Ax5FiR6uT_W0VwizHkB-3S7_r0',
        description: 'Access token that can be used to authenticate against the api',
    }),
    __metadata("design:type", String)
], AccessToken.prototype, "accessToken", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2019-09-01T22:12:08.882Z',
        description: 'The expiry date of the access token',
    }),
    __metadata("design:type", Date)
], AccessToken.prototype, "expires", void 0);
exports.AccessToken = AccessToken;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const passport_jwt_1 = __webpack_require__(90);
const config_service_1 = __webpack_require__(4);
const users_service_1 = __webpack_require__(9);
const api_keys_service_1 = __webpack_require__(24);
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(usersService, config, apiKeysService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('TOKEN_SECRET'),
        });
        this.usersService = usersService;
        this.config = config;
        this.apiKeysService = apiKeysService;
    }
    validate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (payload.type) {
                case 'access_token':
                    const issuedAt = new Date(payload.iat * 1000);
                    const user = yield this.usersService.findById(payload.sub);
                    if (user && issuedAt > user.minTokenDate) {
                        delete user.password;
                        return {
                            jwt: payload,
                            user: user,
                        };
                    }
                    return null;
                case 'api_key':
                    if (yield this.apiKeysService.getKey(payload.sub, payload.jti)) {
                        const user = yield this.usersService.findById(payload.sub);
                        if (user) {
                            delete user.password;
                            return {
                                jwt: payload,
                                user: user,
                            };
                        }
                    }
                    return null;
                default:
                    return null;
            }
        });
    }
};
JwtStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        config_service_1.ConfigService,
        api_keys_service_1.ApiKeysService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const class_validator_1 = __webpack_require__(2);
const passport_local_1 = __webpack_require__(92);
const auth_service_1 = __webpack_require__(31);
const login_dto_1 = __webpack_require__(45);
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super();
        this.authService = authService;
    }
    validate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginDto = new login_dto_1.LoginDto();
            loginDto.username = username;
            loginDto.password = password;
            try {
                yield class_validator_1.validateOrReject(loginDto);
            }
            catch (errors) {
                throw new common_1.BadRequestException(errors, 'ValidationError');
            }
            const user = yield this.authService.validateUser(loginDto.username, loginDto.password);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return {
                user: user,
            };
        });
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const accounts_module_1 = __webpack_require__(16);
const filters_controller_1 = __webpack_require__(94);
const filters_service_1 = __webpack_require__(48);
let FiltersModule = class FiltersModule {
};
FiltersModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule.register({
                timeout: 10000,
            }),
            accounts_module_1.AccountsModule,
        ],
        controllers: [filters_controller_1.FiltersController],
        providers: [filters_service_1.FiltersService],
    })
], FiltersModule);
exports.FiltersModule = FiltersModule;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const common_1 = __webpack_require__(1);
const passport_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(0);
const account_id_params_1 = __webpack_require__(42);
const req_user_decorator_1 = __webpack_require__(8);
const roles_decorator_1 = __webpack_require__(6);
const roles_guard_1 = __webpack_require__(7);
const user_entity_1 = __webpack_require__(5);
const filter_details_class_1 = __webpack_require__(95);
const filter_list_item_class_1 = __webpack_require__(96);
const create_update_filter_dto_1 = __webpack_require__(46);
const filters_service_1 = __webpack_require__(48);
const filter_id_params_1 = __webpack_require__(97);
let FiltersController = class FiltersController {
    constructor(filtersService) {
        this.filtersService = filtersService;
    }
    deleteFilter(user, filterIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filtersService.deleteFilter(user, filterIdParams.accountId, filterIdParams.filterId);
        });
    }
    getFilters(user, accountIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filtersService.getFilters(user, accountIdParams.accountId);
        });
    }
    getFilterDetails(user, filterIdParams) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filtersService.getFilter(user, filterIdParams.accountId, filterIdParams.filterId);
        });
    }
    createFilter(user, accountIdParams, createUpdateFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filtersService.createFilter(user, accountIdParams.accountId, createUpdateFilterDto);
        });
    }
    updateFilter(user, filterIdParams, createUpdateFilterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.filtersService.updateFilter(user, filterIdParams.accountId, filterIdParams.filterId, createUpdateFilterDto);
        });
    }
};
__decorate([
    common_1.Delete(':filterId'),
    swagger_1.ApiOperation({ summary: 'Delete filter' }),
    swagger_1.ApiOkResponse({ description: 'Filter deleted successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No account or filter found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, filter_id_params_1.FilterIdParams]),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "deleteFilter", null);
__decorate([
    common_1.Get(),
    swagger_1.ApiOperation({ summary: 'List filters' }),
    swagger_1.ApiOkResponse({ description: 'A list of filters', type: filter_list_item_class_1.FilterListItem, isArray: true }),
    swagger_1.ApiNotFoundResponse({ description: 'No account found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()), __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, account_id_params_1.AccountIdParams]),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "getFilters", null);
__decorate([
    common_1.Get(':filterId'),
    swagger_1.ApiOperation({ summary: 'Get filter details' }),
    swagger_1.ApiOkResponse({ description: 'Filter details', type: filter_details_class_1.FilterDetails }),
    swagger_1.ApiNotFoundResponse({ description: 'No account or filter found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        filter_id_params_1.FilterIdParams]),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "getFilterDetails", null);
__decorate([
    common_1.Post(),
    swagger_1.ApiOperation({ summary: 'Create a new filter' }),
    swagger_1.ApiCreatedResponse({ description: 'Filter created successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No account found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        account_id_params_1.AccountIdParams,
        create_update_filter_dto_1.CreateUpdateFilterDto]),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "createFilter", null);
__decorate([
    common_1.Put(':filterId'),
    swagger_1.ApiOperation({ summary: 'Update existing filter' }),
    swagger_1.ApiOkResponse({ description: 'Account updated successfully' }),
    swagger_1.ApiNotFoundResponse({ description: 'No account or filter found with this id' }),
    __param(0, req_user_decorator_1.ReqUser()),
    __param(1, common_1.Param()),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        filter_id_params_1.FilterIdParams,
        create_update_filter_dto_1.CreateUpdateFilterDto]),
    __metadata("design:returntype", Promise)
], FiltersController.prototype, "updateFilter", null);
FiltersController = __decorate([
    common_1.Controller('accounts/:accountId/filters'),
    swagger_1.ApiTags('Filters'),
    common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('user'),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiUnauthorizedResponse({ description: 'Invalid or expired token' }),
    swagger_1.ApiBadRequestResponse({ description: 'Error that is resolvable user side' }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'Server error that is not resolvable user side' }),
    __metadata("design:paramtypes", [filters_service_1.FiltersService])
], FiltersController);
exports.FiltersController = FiltersController;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const create_update_filter_dto_1 = __webpack_require__(46);
class FilterDetails extends create_update_filter_dto_1.CreateUpdateFilterDto {
}
__decorate([
    swagger_1.ApiProperty({ example: '5a1c0ee490a34c67e266931c', description: 'Unique id of the filter' }),
    __metadata("design:type", String)
], FilterDetails.prototype, "id", void 0);
exports.FilterDetails = FilterDetails;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const filter_class_1 = __webpack_require__(47);
class FilterListItem extends filter_class_1.Filter {
}
__decorate([
    swagger_1.ApiProperty({ example: '5a1c0ee490a34c67e266931c', description: 'Unique id of the filter' }),
    __metadata("design:type", String)
], FilterListItem.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [
            ['from', '(John)'],
            ['to', '(John)'],
        ],
        description: 'A list of query descriptions',
    }),
    __metadata("design:type", Array)
], FilterListItem.prototype, "query", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: [['mark it as spam'], ['forward to', 'johndoe@example.com, smtp://mx.example.com:25, example.com']],
        description: 'A list of action descriptions',
    }),
    __metadata("design:type", Array)
], FilterListItem.prototype, "action", void 0);
__decorate([
    swagger_1.ApiProperty({
        example: '2019-08-14T15:14:25.176Z',
        description: 'Datestring of the time the filter was created',
    }),
    __metadata("design:type", String)
], FilterListItem.prototype, "created", void 0);
exports.FilterListItem = FilterListItem;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = __webpack_require__(0);
const class_validator_1 = __webpack_require__(2);
class FilterIdParams {
}
__decorate([
    swagger_1.ApiProperty({ description: 'Unique id of the account' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], FilterIdParams.prototype, "accountId", void 0);
__decorate([
    swagger_1.ApiProperty({ description: 'Unique id of the filter' }),
    class_validator_1.IsMongoId(),
    __metadata("design:type", String)
], FilterIdParams.prototype, "filterId", void 0);
exports.FilterIdParams = FilterIdParams;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const accounts_module_1 = __webpack_require__(16);
const domains_module_1 = __webpack_require__(13);
const forwarders_module_1 = __webpack_require__(29);
const delete_for_domain_processor_1 = __webpack_require__(99);
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    common_1.Module({
        imports: [accounts_module_1.AccountsModule, forwarders_module_1.ForwardersModule, domains_module_1.DomainsModule],
        providers: [delete_for_domain_processor_1.DeleteForDomainProcessor],
    })
], TasksModule);
exports.TasksModule = TasksModule;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var DeleteForDomainProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const bull_1 = __webpack_require__(25);
const common_1 = __webpack_require__(1);
const accounts_service_1 = __webpack_require__(22);
const domains_service_1 = __webpack_require__(12);
const forwarders_service_1 = __webpack_require__(30);
let DeleteForDomainProcessor = DeleteForDomainProcessor_1 = class DeleteForDomainProcessor {
    constructor(accountsService, forwardersService, domainsService) {
        this.accountsService = accountsService;
        this.forwardersService = forwardersService;
        this.domainsService = domainsService;
        this.logger = new common_1.Logger(DeleteForDomainProcessor_1.name, true);
    }
    processDeleteAccounts(job) {
        return __awaiter(this, void 0, void 0, function* () {
            let accounts = [];
            try {
                accounts = yield this.accountsService.getAccounts(job.data.user, job.data.domain);
            }
            catch (error) {
                if (error.response.error === 'AccountNotFoundError') {
                    return;
                }
                else {
                    throw error;
                }
            }
            const accountChunks = [];
            const chunkSize = 10;
            for (let i = 0; i < accounts.length; i += chunkSize) {
                accountChunks.push(accounts.slice(i, i + chunkSize));
            }
            let promises = [];
            for (const [i, accountChunk] of accountChunks.entries()) {
                job.progress(Math.round((i / accountChunks.length) * 100));
                promises = [];
                for (const account of accountChunk) {
                    promises.push(this.accountsService.deleteAccount(job.data.user, account.id));
                }
                yield Promise.all(promises);
            }
            job.progress(100);
        });
    }
    processDeleteForwarders(job) {
        return __awaiter(this, void 0, void 0, function* () {
            let forwarders = [];
            try {
                forwarders = yield this.forwardersService.getForwarders(job.data.user, job.data.domain);
            }
            catch (error) {
                if (error.response.error === 'ForwarderNotFoundError') {
                    return;
                }
                else {
                    throw error;
                }
            }
            const forwarderChunks = [];
            const chunkSize = 10;
            for (let i = 0; i < forwarders.length; i += chunkSize) {
                forwarderChunks.push(forwarders.slice(i, i + chunkSize));
            }
            let promises = [];
            for (const [i, forwarderChunk] of forwarderChunks.entries()) {
                job.progress(Math.round((i / forwarderChunks.length) * 100));
                promises = [];
                for (const forwarder of forwarderChunk) {
                    promises.push(this.forwardersService.deleteForwarder(job.data.user, forwarder.id));
                }
                yield Promise.all(promises);
            }
            job.progress(100);
        });
    }
    processDeleteAliases(job) {
        return __awaiter(this, void 0, void 0, function* () {
            const aliases = job.data.user.domains.find(domain => domain.domain === job.data.domain).aliases;
            if (!aliases || aliases.length === 0) {
                return;
            }
            const aliasChunks = [];
            const chunkSize = 10;
            for (let i = 0; i < aliases.length; i += chunkSize) {
                aliasChunks.push(aliases.slice(i, i + chunkSize));
            }
            let promises = [];
            for (const [i, aliasChunk] of aliasChunks.entries()) {
                job.progress(Math.round((i / aliasChunks.length) * 100));
                promises = [];
                for (const alias of aliasChunk) {
                    promises.push(this.domainsService.deleteAlias(job.data.user, job.data.domain, alias.domain));
                }
                yield Promise.all(promises);
            }
            job.progress(100);
        });
    }
    onActive(job) {
        this.logger.log(`Processing job ${job.id} (${job.name}) for user ${job.data.user._id} and domain ${job.data.domain}`);
    }
    onCompleted(job) {
        this.logger.log(`Completed job ${job.id} (${job.name}) successfully`);
    }
    onError(job) {
        this.logger.error(`Error for job ${job.id} (${job.name}): ${job.stacktrace}`);
    }
    onFailed(job) {
        this.logger.error(`Job ${job.id} (${job.name}) failed!: ${job.stacktrace}`);
    }
};
__decorate([
    bull_1.Process({ name: 'deleteAccounts' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeleteForDomainProcessor.prototype, "processDeleteAccounts", null);
__decorate([
    bull_1.Process({ name: 'deleteForwarders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeleteForDomainProcessor.prototype, "processDeleteForwarders", null);
__decorate([
    bull_1.Process({ name: 'deleteAliases' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DeleteForDomainProcessor.prototype, "processDeleteAliases", null);
__decorate([
    bull_1.OnQueueActive(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeleteForDomainProcessor.prototype, "onActive", null);
__decorate([
    bull_1.OnQueueCompleted(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeleteForDomainProcessor.prototype, "onCompleted", null);
__decorate([
    bull_1.OnQueueError(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeleteForDomainProcessor.prototype, "onError", null);
__decorate([
    bull_1.OnQueueFailed(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DeleteForDomainProcessor.prototype, "onFailed", null);
DeleteForDomainProcessor = DeleteForDomainProcessor_1 = __decorate([
    bull_1.Processor('deleteForDomain'),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        forwarders_service_1.ForwardersService,
        domains_service_1.DomainsService])
], DeleteForDomainProcessor);
exports.DeleteForDomainProcessor = DeleteForDomainProcessor;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api-keys/api-key.entity.ts": 15,
	"./domains/domain.entity.ts": 26,
	"./packages/package.entity.ts": 19,
	"./users/user.entity.ts": 5
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 100;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./migrations/1580519162771-AddIndexes.ts": 102,
	"./migrations/1580520383448-SetDefaultRole.ts": 103
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 101;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

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
class AddIndexes1580519162771 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoRunner = queryRunner;
            mongoRunner.createCollectionIndex('api-keys', 'userId');
            mongoRunner.createCollectionIndex('users', 'username', { unique: true });
            mongoRunner.createCollectionIndexes('users', [
                {
                    key: {
                        'domains.domain': 1,
                    },
                    unique: true,
                    partialFilterExpression: { 'domains.domain': { $exists: true } },
                },
            ]);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoRunner = queryRunner;
            mongoRunner.dropCollectionIndex('api-keys', 'userId');
            mongoRunner.dropCollectionIndex('users', 'username');
            mongoRunner.dropCollectionIndex('users', 'domains.domain');
        });
    }
}
exports.AddIndexes1580519162771 = AddIndexes1580519162771;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

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
class SetDefaultRole1580520383448 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoRunner = queryRunner;
            yield mongoRunner.updateMany('users', {}, {
                $set: {
                    roles: ['user'],
                },
            });
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoRunner = queryRunner;
            yield mongoRunner.updateMany('users', {}, {
                $unset: {
                    roles: '',
                },
            });
        });
    }
}
exports.SetDefaultRole1580520383448 = SetDefaultRole1580520383448;


/***/ }),
/* 104 */,
/* 105 */,
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

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
const nestjs_console_1 = __webpack_require__(32);
const app_module_1 = __webpack_require__(50);
const bootstrap = new nestjs_console_1.BootstrapConsole({
    module: app_module_1.AppModule,
    useDecorators: true,
    contextOptions: {
        logger: ['error'],
    },
});
bootstrap.init().then((app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield app.init();
        yield bootstrap.boot();
        process.exit(0);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}));


/***/ })
/******/ ]);