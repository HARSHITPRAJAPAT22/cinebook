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
exports.id = "app/api/Auth/signUp/route";
exports.ids = ["app/api/Auth/signUp/route"];
exports.modules = {

/***/ "(rsc)/./app/api/Auth/signUp/route.ts":
/*!**************************************!*\
  !*** ./app/api/Auth/signUp/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst uri = \"mongodb://localhost:27017/\";\nconst dbName = \"cinebook\";\nconst JWT_SECRET = \"cinebook_secret_key\";\nasync function POST(request) {\n    const { name, email, password } = await request.json();\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const users = db.collection('Users');\n        // Check if user already exists\n        const existingUser = await users.findOne({\n            email\n        });\n        if (existingUser) {\n            if (existingUser.googleId || existingUser.facebookId) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: false,\n                    message: 'User already exists with Google or Facebook account. Please sign in using those methods.'\n                }, {\n                    status: 409\n                });\n            }\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'User already exists'\n            }, {\n                status: 409\n            });\n        }\n        // Hash the password before storing\n        const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_2__[\"default\"].hash(password, 10);\n        // Store user in DB\n        const result = await users.insertOne({\n            name,\n            email,\n            password: hashedPassword\n        });\n        // Generate JWT access token\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default().sign({\n            id: result.insertedId,\n            name,\n            email\n        }, JWT_SECRET, {\n            expiresIn: '7d'\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: {\n                id: result.insertedId,\n                name,\n                email\n            },\n            token\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Server error'\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL0F1dGgvc2lnblVwL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBMkM7QUFDTDtBQUNSO0FBQ0M7QUFFL0IsTUFBTUksTUFBY0MsNEJBQW1DO0FBQ3ZELE1BQU1HLFNBQWlCSCxVQUErQjtBQUN0RCxNQUFNSyxhQUFxQkwscUJBQWtDO0FBRXRELGVBQWVPLEtBQUtDLE9BQWdCO0lBQ3pDLE1BQU0sRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRSxHQUFHLE1BQU1ILFFBQVFJLElBQUk7SUFFcEQsTUFBTUMsU0FBUyxJQUFJakIsZ0RBQVdBLENBQUNHO0lBQy9CLElBQUk7UUFDRixNQUFNYyxPQUFPQyxPQUFPO1FBQ3BCLE1BQU1DLEtBQUtGLE9BQU9FLEVBQUUsQ0FBQ1o7UUFDckIsTUFBTWEsUUFBUUQsR0FBR0UsVUFBVSxDQUFDO1FBRTVCLCtCQUErQjtRQUMvQixNQUFNQyxlQUFlLE1BQU1GLE1BQU1HLE9BQU8sQ0FBQztZQUFFVDtRQUFNO1FBQ2pELElBQUlRLGNBQWM7WUFDaEIsSUFBR0EsYUFBYUUsUUFBUSxJQUFJRixhQUFhRyxVQUFVLEVBQUU7Z0JBQ25ELE9BQU8xQixxREFBWUEsQ0FBQ2lCLElBQUksQ0FBQztvQkFDdkJVLFNBQVM7b0JBQ1RDLFNBQVM7Z0JBQ1gsR0FBRztvQkFBRUMsUUFBUTtnQkFBSTtZQUNuQjtZQUNBLE9BQU83QixxREFBWUEsQ0FBQ2lCLElBQUksQ0FBQztnQkFDdkJVLFNBQVM7Z0JBQ1RDLFNBQVM7WUFDWCxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbkI7UUFFQSxtQ0FBbUM7UUFDbkMsTUFBTUMsaUJBQWlCLE1BQU01QixxREFBVyxDQUFDYyxVQUFVO1FBRW5ELG1CQUFtQjtRQUNuQixNQUFNZ0IsU0FBUyxNQUFNWCxNQUFNWSxTQUFTLENBQUM7WUFDbkNuQjtZQUNBQztZQUNBQyxVQUFVYztRQUNaO1FBRUEsNEJBQTRCO1FBQzVCLE1BQU1JLFFBQVEvQix3REFBUSxDQUNwQjtZQUFFaUMsSUFBSUosT0FBT0ssVUFBVTtZQUFFdkI7WUFBTUM7UUFBTSxHQUNyQ0wsWUFDQTtZQUFFNEIsV0FBVztRQUFLO1FBR3BCLE9BQU90QyxxREFBWUEsQ0FBQ2lCLElBQUksQ0FBQztZQUN2QlUsU0FBUztZQUNUWSxNQUFNO2dCQUNKSCxJQUFJSixPQUFPSyxVQUFVO2dCQUNyQnZCO2dCQUNBQztZQUNGO1lBQ0FtQjtRQUNGO0lBQ0YsRUFBRSxPQUFPTSxPQUFPO1FBQ2QsT0FBT3hDLHFEQUFZQSxDQUFDaUIsSUFBSSxDQUFDO1lBQ3ZCVSxTQUFTO1lBQ1RDLFNBQVM7UUFDWCxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuQixTQUFVO1FBQ1IsTUFBTVgsT0FBT3VCLEtBQUs7SUFDcEI7QUFDRiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxMZW5vdm9cXERlc2t0b3BcXGNpbmVib29rXFxhcHBcXGFwaVxcQXV0aFxcc2lnblVwXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XHJcbmltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xyXG5pbXBvcnQgand0IGZyb20gJ2pzb253ZWJ0b2tlbic7XHJcblxyXG5jb25zdCB1cmk6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX01PTkdPREJfVVJJIGFzIHN0cmluZztcclxuY29uc3QgZGJOYW1lOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19EQl9OQU1FIGFzIHN0cmluZztcclxuY29uc3QgSldUX1NFQ1JFVDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCBhcyBzdHJpbmc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBSZXF1ZXN0KSB7XHJcbiAgY29uc3QgeyBuYW1lLCBlbWFpbCwgcGFzc3dvcmQgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xyXG5cclxuICBjb25zdCBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcclxuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKGRiTmFtZSk7XHJcbiAgICBjb25zdCB1c2VycyA9IGRiLmNvbGxlY3Rpb24oJ1VzZXJzJyk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdXNlciBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdVc2VyID0gYXdhaXQgdXNlcnMuZmluZE9uZSh7IGVtYWlsIH0pO1xyXG4gICAgaWYgKGV4aXN0aW5nVXNlcikge1xyXG4gICAgICBpZihleGlzdGluZ1VzZXIuZ29vZ2xlSWQgfHwgZXhpc3RpbmdVc2VyLmZhY2Vib29rSWQpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnVXNlciBhbHJlYWR5IGV4aXN0cyB3aXRoIEdvb2dsZSBvciBGYWNlYm9vayBhY2NvdW50LiBQbGVhc2Ugc2lnbiBpbiB1c2luZyB0aG9zZSBtZXRob2RzLidcclxuICAgICAgICB9LCB7IHN0YXR1czogNDA5IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbWVzc2FnZTogJ1VzZXIgYWxyZWFkeSBleGlzdHMnXHJcbiAgICAgIH0sIHsgc3RhdHVzOiA0MDkgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFzaCB0aGUgcGFzc3dvcmQgYmVmb3JlIHN0b3JpbmdcclxuICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIDEwKTtcclxuXHJcbiAgICAvLyBTdG9yZSB1c2VyIGluIERCXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1c2Vycy5pbnNlcnRPbmUoe1xyXG4gICAgICBuYW1lLFxyXG4gICAgICBlbWFpbCxcclxuICAgICAgcGFzc3dvcmQ6IGhhc2hlZFBhc3N3b3JkXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBHZW5lcmF0ZSBKV1QgYWNjZXNzIHRva2VuXHJcbiAgICBjb25zdCB0b2tlbiA9IGp3dC5zaWduKFxyXG4gICAgICB7IGlkOiByZXN1bHQuaW5zZXJ0ZWRJZCwgbmFtZSwgZW1haWwgfSxcclxuICAgICAgSldUX1NFQ1JFVCxcclxuICAgICAgeyBleHBpcmVzSW46ICc3ZCcgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICB1c2VyOiB7XHJcbiAgICAgICAgaWQ6IHJlc3VsdC5pbnNlcnRlZElkLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZW1haWxcclxuICAgICAgfSxcclxuICAgICAgdG9rZW5cclxuICAgIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogJ1NlcnZlciBlcnJvcidcclxuICAgIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJNb25nb0NsaWVudCIsImJjcnlwdCIsImp3dCIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19NT05HT0RCX1VSSSIsImRiTmFtZSIsIk5FWFRfUFVCTElDX0RCX05BTUUiLCJKV1RfU0VDUkVUIiwiTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCIsIlBPU1QiLCJyZXF1ZXN0IiwibmFtZSIsImVtYWlsIiwicGFzc3dvcmQiLCJqc29uIiwiY2xpZW50IiwiY29ubmVjdCIsImRiIiwidXNlcnMiLCJjb2xsZWN0aW9uIiwiZXhpc3RpbmdVc2VyIiwiZmluZE9uZSIsImdvb2dsZUlkIiwiZmFjZWJvb2tJZCIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwic3RhdHVzIiwiaGFzaGVkUGFzc3dvcmQiLCJoYXNoIiwicmVzdWx0IiwiaW5zZXJ0T25lIiwidG9rZW4iLCJzaWduIiwiaWQiLCJpbnNlcnRlZElkIiwiZXhwaXJlc0luIiwidXNlciIsImVycm9yIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/Auth/signUp/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignUp%2Froute&page=%2Fapi%2FAuth%2FsignUp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignUp%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignUp%2Froute&page=%2Fapi%2FAuth%2FsignUp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignUp%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_api_Auth_signUp_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/Auth/signUp/route.ts */ \"(rsc)/./app/api/Auth/signUp/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/Auth/signUp/route\",\n        pathname: \"/api/Auth/signUp\",\n        filename: \"route\",\n        bundlePath: \"app/api/Auth/signUp/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\api\\\\Auth\\\\signUp\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_api_Auth_signUp_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZBdXRoJTJGc2lnblVwJTJGcm91dGUmcGFnZT0lMkZhcGklMkZBdXRoJTJGc2lnblVwJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGQXV0aCUyRnNpZ25VcCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGNpbmVib29rXFxcXGFwcFxcXFxhcGlcXFxcQXV0aFxcXFxzaWduVXBcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL0F1dGgvc2lnblVwL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvQXV0aC9zaWduVXBcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL0F1dGgvc2lnblVwL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERlc2t0b3BcXFxcY2luZWJvb2tcXFxcYXBwXFxcXGFwaVxcXFxBdXRoXFxcXHNpZ25VcFxcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignUp%2Froute&page=%2Fapi%2FAuth%2FsignUp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignUp%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bcryptjs"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2FAuth%2FsignUp%2Froute&page=%2Fapi%2FAuth%2FsignUp%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2FAuth%2FsignUp%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();