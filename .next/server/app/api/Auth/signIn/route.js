/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/Auth/signIn/route";
exports.ids = ["app/api/Auth/signIn/route"];
exports.modules = {

/***/ "(rsc)/./app/api/Auth/signIn/route.ts":
/*!**************************************!*\
  !*** ./app/api/Auth/signIn/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst uri = \"mongodb://localhost:27017/\";\nconst dbName = \"cinebook\";\nconst JWT_SECRET = \"cinebook_secret_key\";\nif (!uri || !dbName || !JWT_SECRET) {\n    throw new Error('Missing required environment variables');\n}\nasync function POST(request) {\n    const { email, password } = await request.json();\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const users = db.collection('Users');\n        // Find user by email\n        const user = await users.findOne({\n            email\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'Invalid email or password'\n            }, {\n                status: 401\n            });\n        }\n        if (user.googleId || user.facebookId) {\n            if (user.password) {\n                const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.password);\n                if (!isMatch) {\n                    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                        success: false,\n                        message: 'Invalid email or password'\n                    }, {\n                        status: 401\n                    });\n                }\n                const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n                    id: user._id,\n                    name: user.name,\n                    email: user.email\n                }, JWT_SECRET, {\n                    expiresIn: '7d'\n                });\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: true,\n                    user: {\n                        id: user._id,\n                        name: user.name,\n                        email: user.email\n                    },\n                    token\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'User already exists with Google or Facebook account. Please sign in using those methods.'\n            }, {\n                status: 409\n            });\n        }\n        // Compare hashed password\n        const isMatch = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].compare(password, user.password);\n        if (!isMatch) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'Invalid email or password'\n            }, {\n                status: 401\n            });\n        }\n        // Generate JWT token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            id: user._id,\n            name: user.name,\n            email: user.email\n        }, JWT_SECRET, {\n            expiresIn: '7d'\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: {\n                id: user._id,\n                name: user.name,\n                email: user.email\n            },\n            token\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Server error'\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZCxPQUFPdEMscURBQVlBLENBQUNpQixJQUFJLENBQUM7WUFDdkJRLFNBQVM7WUFDVEMsU0FBUztRQUNYLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25CLFNBQVU7UUFDUixNQUFNVCxPQUFPcUIsS0FBSztJQUNwQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXExlbm92b1xcRGVza3RvcFxcY2luZWJvb2tcXGFwcFxcYXBpXFxBdXRoXFxzaWduSW5cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuXHJcbmNvbnN0IHVyaTogc3RyaW5nID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTU9OR09EQl9VUkkgYXMgc3RyaW5nO1xyXG5jb25zdCBkYk5hbWU6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0RCX05BTUUgYXMgc3RyaW5nO1xyXG5jb25zdCBKV1RfU0VDUkVUOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19KV1RfU0VDUkVUIGFzIHN0cmluZztcclxuXHJcbmlmICghdXJpIHx8ICFkYk5hbWUgfHwgIUpXVF9TRUNSRVQpIHtcclxuICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgZW52aXJvbm1lbnQgdmFyaWFibGVzJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCB9ID0gYXdhaXQgcmVxdWVzdC5qc29uKCk7XHJcblxyXG4gIGNvbnN0IGNsaWVudCA9IG5ldyBNb25nb0NsaWVudCh1cmkpO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xyXG4gICAgY29uc3QgZGIgPSBjbGllbnQuZGIoZGJOYW1lKTtcclxuICAgIGNvbnN0IHVzZXJzID0gZGIuY29sbGVjdGlvbignVXNlcnMnKTtcclxuXHJcbiAgICAvLyBGaW5kIHVzZXIgYnkgZW1haWxcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2Vycy5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCdcclxuICAgICAgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuICAgIGlmICh1c2VyLmdvb2dsZUlkIHx8IHVzZXIuZmFjZWJvb2tJZCkge1xyXG4gICAgICBpZih1c2VyLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgY29uc3QgaXNNYXRjaCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKTtcclxuICAgICAgICBpZiAoIWlzTWF0Y2gpIHtcclxuICAgICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCdcclxuICAgICAgICAgIH0sIHsgc3RhdHVzOiA0MDEgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgICAgICB7IGlkOiB1c2VyLl9pZCwgbmFtZTogdXNlci5uYW1lLCBlbWFpbDogdXNlci5lbWFpbCB9LFxyXG4gICAgICAgICAgSldUX1NFQ1JFVCxcclxuICAgICAgICAgIHsgZXhwaXJlc0luOiAnN2QnIH1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgICBpZDogdXNlci5faWQsXHJcbiAgICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcclxuICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0b2tlblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbWVzc2FnZTogJ1VzZXIgYWxyZWFkeSBleGlzdHMgd2l0aCBHb29nbGUgb3IgRmFjZWJvb2sgYWNjb3VudC4gUGxlYXNlIHNpZ24gaW4gdXNpbmcgdGhvc2UgbWV0aG9kcy4nXHJcbiAgICAgIH0sIHsgc3RhdHVzOiA0MDkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ29tcGFyZSBoYXNoZWQgcGFzc3dvcmRcclxuICAgIGNvbnN0IGlzTWF0Y2ggPSBhd2FpdCBiY3J5cHQuY29tcGFyZShwYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICBpZiAoIWlzTWF0Y2gpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgICBtZXNzYWdlOiAnSW52YWxpZCBlbWFpbCBvciBwYXNzd29yZCdcclxuICAgICAgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBKV1QgdG9rZW5cclxuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgIHsgaWQ6IHVzZXIuX2lkLCBuYW1lOiB1c2VyLm5hbWUsIGVtYWlsOiB1c2VyLmVtYWlsIH0sXHJcbiAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgIHsgZXhwaXJlc0luOiAnN2QnIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiB1c2VyLl9pZCxcclxuICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXHJcbiAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcclxuICAgICAgfSxcclxuICAgICAgdG9rZW5cclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogJ1NlcnZlciBlcnJvcidcclxuICAgIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJNb25nb0NsaWVudCIsImJjcnlwdCIsImp3dCIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19NT05HT0RCX1VSSSIsImRiTmFtZSIsIk5FWFRfUFVCTElDX0RCX05BTUUiLCJKV1RfU0VDUkVUIiwiTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCIsIkVycm9yIiwiUE9TVCIsInJlcXVlc3QiLCJlbWFpbCIsInBhc3N3b3JkIiwianNvbiIsImNsaWVudCIsImNvbm5lY3QiLCJkYiIsInVzZXJzIiwiY29sbGVjdGlvbiIsInVzZXIiLCJmaW5kT25lIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJzdGF0dXMiLCJnb29nbGVJZCIsImZhY2Vib29rSWQiLCJpc01hdGNoIiwiY29tcGFyZSIsInRva2VuIiwic2lnbiIsImlkIiwiX2lkIiwibmFtZSIsImV4cGlyZXNJbiIsImVycm9yIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/Auth/signIn/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignIn%2Froute&page=%2Fapi%2FAuth%2FsignIn%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignIn%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignIn%2Froute&page=%2Fapi%2FAuth%2FsignIn%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignIn%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_api_Auth_signIn_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/Auth/signIn/route.ts */ \"(rsc)/./app/api/Auth/signIn/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/Auth/signIn/route\",\n        pathname: \"/api/Auth/signIn\",\n        filename: \"route\",\n        bundlePath: \"app/api/Auth/signIn/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\api\\\\Auth\\\\signIn\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_api_Auth_signIn_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZBdXRoJTJGc2lnbkluJTJGcm91dGUmcGFnZT0lMkZhcGklMkZBdXRoJTJGc2lnbkluJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGQXV0aCUyRnNpZ25JbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGNpbmVib29rXFxcXGFwcFxcXFxhcGlcXFxcQXV0aFxcXFxzaWduSW5cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL0F1dGgvc2lnbkluL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvQXV0aC9zaWduSW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL0F1dGgvc2lnbkluL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERlc2t0b3BcXFxcY2luZWJvb2tcXFxcYXBwXFxcXGFwaVxcXFxBdXRoXFxcXHNpZ25JblxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignIn%2Froute&page=%2Fapi%2FAuth%2FsignIn%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignIn%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignIn%2Froute&page=%2Fapi%2FAuth%2FsignIn%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignIn%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();