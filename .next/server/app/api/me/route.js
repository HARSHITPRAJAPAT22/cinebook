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
exports.id = "app/api/me/route";
exports.ids = ["app/api/me/route"];
exports.modules = {

/***/ "(rsc)/./app/api/me/route.ts":
/*!*****************************!*\
  !*** ./app/api/me/route.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst uri = \"mongodb+srv://aditivyasw:ZxE67PES9RTUJQEF@cinebook.9dfgnar.mongodb.net/\";\nconst dbName = \"cinebook\";\nconst JWT_SECRET = \"cinebook_secret_key\";\nasync function POST(request) {\n    const token = request.headers.get('authorization')?.replace(/^Bearer\\s/, '');\n    if (!token) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Access token required'\n        }, {\n            status: 400\n        });\n    }\n    let payload;\n    try {\n        payload = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().verify(token, JWT_SECRET);\n    } catch (err) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Invalid or expired token'\n        }, {\n            status: 401\n        });\n    }\n    const userId = typeof payload === 'object' && payload !== null && 'id' in payload ? payload.id : undefined;\n    if (!userId || typeof userId !== 'string' || !mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId.isValid(userId)) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Invalid token payload'\n        }, {\n            status: 400\n        });\n    }\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const users = db.collection('Users');\n        const user = await users.findOne({\n            _id: new mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId(userId)\n        });\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: false,\n                message: 'User not found'\n            }, {\n                status: 404\n            });\n        }\n        // Don't send password\n        const { password, ...userInfo } = user;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: userInfo\n        });\n    } catch (error) {\n        console.error('API /me error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Server error'\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL21lL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUEyQztBQUNLO0FBQ2pCO0FBRS9CLE1BQU1JLE1BQU1DLHlFQUFtQztBQUMvQyxNQUFNRyxTQUFTSCxVQUErQjtBQUM5QyxNQUFNSyxhQUFhTCxxQkFBa0M7QUFFOUMsZUFBZU8sS0FBS0MsT0FBZ0I7SUFDM0MsTUFBTUMsUUFBUUQsUUFBUUUsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCQyxRQUFRLGFBQWE7SUFDdkUsSUFBSSxDQUFDSCxPQUFPO1FBQ1YsT0FBT2QscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEMsU0FBUztRQUNYLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25CO0lBRUEsSUFBSUM7SUFDSixJQUFJO1FBQ0ZBLFVBQVVuQiwwREFBVSxDQUFDVyxPQUFPSjtJQUM5QixFQUFFLE9BQU9jLEtBQUs7UUFDWixPQUFPeEIscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFDdkJDLFNBQVM7WUFDVEMsU0FBUztRQUNYLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ25CO0lBRUEsTUFBTUksU0FBUyxPQUFPSCxZQUFZLFlBQVlBLFlBQVksUUFBUSxRQUFRQSxVQUFVLFFBQTRCSSxFQUFFLEdBQUdDO0lBQ3JILElBQUksQ0FBQ0YsVUFBVSxPQUFPQSxXQUFXLFlBQVksQ0FBQ3ZCLDZDQUFRQSxDQUFDMEIsT0FBTyxDQUFDSCxTQUFTO1FBQ3RFLE9BQU96QixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUN2QkMsU0FBUztZQUNUQyxTQUFTO1FBQ1gsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbkI7SUFFQSxNQUFNUSxTQUFTLElBQUk1QixnREFBV0EsQ0FBQ0c7SUFDL0IsSUFBSTtRQUNGLE1BQU15QixPQUFPQyxPQUFPO1FBQ3BCLE1BQU1DLEtBQUtGLE9BQU9FLEVBQUUsQ0FBQ3ZCO1FBQ3JCLE1BQU13QixRQUFRRCxHQUFHRSxVQUFVLENBQUM7UUFFNUIsTUFBTUMsT0FBTyxNQUFNRixNQUFNRyxPQUFPLENBQUM7WUFBRUMsS0FBSyxJQUFJbEMsNkNBQVFBLENBQUN1QjtRQUFRO1FBQzdELElBQUksQ0FBQ1MsTUFBTTtZQUNULE9BQU9sQyxxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztnQkFDdkJDLFNBQVM7Z0JBQ1RDLFNBQVM7WUFDWCxHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDbkI7UUFFQSxzQkFBc0I7UUFDdEIsTUFBTSxFQUFFZ0IsUUFBUSxFQUFFLEdBQUdDLFVBQVUsR0FBR0o7UUFFbEMsT0FBT2xDLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RlLE1BQU1JO1FBQ1I7SUFDRixFQUFFLE9BQU9DLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLGtCQUFrQkE7UUFDaEMsT0FBT3ZDLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQ3ZCQyxTQUFTO1lBQ1RDLFNBQVM7UUFDWCxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuQixTQUFVO1FBQ1IsTUFBTVEsT0FBT1ksS0FBSztJQUNwQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXExlbm92b1xcRGVza3RvcFxcY2luZWJvb2tcXGFwcFxcYXBpXFxtZVxccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBNb25nb0NsaWVudCwgT2JqZWN0SWQgfSBmcm9tICdtb25nb2RiJztcclxuaW1wb3J0IGp3dCBmcm9tICdqc29ud2VidG9rZW4nO1xyXG5cclxuY29uc3QgdXJpID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTU9OR09EQl9VUkkgYXMgc3RyaW5nO1xyXG5jb25zdCBkYk5hbWUgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19EQl9OQU1FIGFzIHN0cmluZztcclxuY29uc3QgSldUX1NFQ1JFVCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0pXVF9TRUNSRVQgYXMgc3RyaW5nO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG5jb25zdCB0b2tlbiA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ2F1dGhvcml6YXRpb24nKT8ucmVwbGFjZSgvXkJlYXJlclxccy8sICcnKTtcclxuICBpZiAoIXRva2VuKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogJ0FjY2VzcyB0b2tlbiByZXF1aXJlZCdcclxuICAgIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgfVxyXG5cclxuICBsZXQgcGF5bG9hZDogand0Lkp3dFBheWxvYWQgfCBzdHJpbmc7XHJcbiAgdHJ5IHtcclxuICAgIHBheWxvYWQgPSBqd3QudmVyaWZ5KHRva2VuLCBKV1RfU0VDUkVUKTtcclxuICB9IGNhdGNoIChlcnIpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiAnSW52YWxpZCBvciBleHBpcmVkIHRva2VuJ1xyXG4gICAgfSwgeyBzdGF0dXM6IDQwMSB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVzZXJJZCA9IHR5cGVvZiBwYXlsb2FkID09PSAnb2JqZWN0JyAmJiBwYXlsb2FkICE9PSBudWxsICYmICdpZCcgaW4gcGF5bG9hZCA/IChwYXlsb2FkIGFzIGp3dC5Kd3RQYXlsb2FkKS5pZCA6IHVuZGVmaW5lZDtcclxuICBpZiAoIXVzZXJJZCB8fCB0eXBlb2YgdXNlcklkICE9PSAnc3RyaW5nJyB8fCAhT2JqZWN0SWQuaXNWYWxpZCh1c2VySWQpKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICBzdWNjZXNzOiBmYWxzZSxcclxuICAgICAgbWVzc2FnZTogJ0ludmFsaWQgdG9rZW4gcGF5bG9hZCdcclxuICAgIH0sIHsgc3RhdHVzOiA0MDAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGllbnQgPSBuZXcgTW9uZ29DbGllbnQodXJpKTtcclxuICB0cnkge1xyXG4gICAgYXdhaXQgY2xpZW50LmNvbm5lY3QoKTtcclxuICAgIGNvbnN0IGRiID0gY2xpZW50LmRiKGRiTmFtZSk7XHJcbiAgICBjb25zdCB1c2VycyA9IGRiLmNvbGxlY3Rpb24oJ1VzZXJzJyk7XHJcblxyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHVzZXJzLmZpbmRPbmUoeyBfaWQ6IG5ldyBPYmplY3RJZCh1c2VySWQpIH0pO1xyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgbWVzc2FnZTogJ1VzZXIgbm90IGZvdW5kJ1xyXG4gICAgICB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERvbid0IHNlbmQgcGFzc3dvcmRcclxuICAgIGNvbnN0IHsgcGFzc3dvcmQsIC4uLnVzZXJJbmZvIH0gPSB1c2VyO1xyXG5cclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgIHVzZXI6IHVzZXJJbmZvLFxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ0FQSSAvbWUgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgIG1lc3NhZ2U6ICdTZXJ2ZXIgZXJyb3InXHJcbiAgICB9LCB7IHN0YXR1czogNTAwIH0pO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBhd2FpdCBjbGllbnQuY2xvc2UoKTtcclxuICB9XHJcbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiTW9uZ29DbGllbnQiLCJPYmplY3RJZCIsImp3dCIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19NT05HT0RCX1VSSSIsImRiTmFtZSIsIk5FWFRfUFVCTElDX0RCX05BTUUiLCJKV1RfU0VDUkVUIiwiTkVYVF9QVUJMSUNfSldUX1NFQ1JFVCIsIlBPU1QiLCJyZXF1ZXN0IiwidG9rZW4iLCJoZWFkZXJzIiwiZ2V0IiwicmVwbGFjZSIsImpzb24iLCJzdWNjZXNzIiwibWVzc2FnZSIsInN0YXR1cyIsInBheWxvYWQiLCJ2ZXJpZnkiLCJlcnIiLCJ1c2VySWQiLCJpZCIsInVuZGVmaW5lZCIsImlzVmFsaWQiLCJjbGllbnQiLCJjb25uZWN0IiwiZGIiLCJ1c2VycyIsImNvbGxlY3Rpb24iLCJ1c2VyIiwiZmluZE9uZSIsIl9pZCIsInBhc3N3b3JkIiwidXNlckluZm8iLCJlcnJvciIsImNvbnNvbGUiLCJjbG9zZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/me/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_api_me_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/me/route.ts */ \"(rsc)/./app/api/me/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/me/route\",\n        pathname: \"/api/me\",\n        filename: \"route\",\n        bundlePath: \"app/api/me/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\api\\\\me\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_api_me_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZtZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGbWUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZtZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDWTtBQUN6RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERlc2t0b3BcXFxcY2luZWJvb2tcXFxcYXBwXFxcXGFwaVxcXFxtZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvbWUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9tZVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvbWUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxjaW5lYm9va1xcXFxhcHBcXFxcYXBpXFxcXG1lXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fme%2Froute&page=%2Fapi%2Fme%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fme%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();