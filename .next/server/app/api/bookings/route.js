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
exports.id = "app/api/bookings/route";
exports.ids = ["app/api/bookings/route"];
exports.modules = {

/***/ "(rsc)/./app/api/bookings/route.ts":
/*!***********************************!*\
  !*** ./app/api/bookings/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst uri = \"mongodb://localhost:27017/\";\nconst dbName = \"cinebook\";\nasync function POST(request) {\n    const { userId, booking } = await request.json();\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const users = db.collection('Users');\n        const theaters = db.collection('Theaters');\n        // 1. Save booking in user's bookings\n        await users.updateOne({\n            _id: new mongodb__WEBPACK_IMPORTED_MODULE_1__.ObjectId(userId)\n        }, {\n            $push: {\n                bookings: booking\n            }\n        });\n        // 2. Update theater showDate and booked seats\n        await theaters.updateOne({\n            id: booking.theaterId\n        }, {\n            $addToSet: {\n                // Add showDate if not present\n                showDate: {\n                    date: booking.showDate,\n                    time: [\n                        booking.showTime\n                    ]\n                },\n                // Add booked seats for this show\n                [`bookedSeats.${booking.showDate}.${booking.showTime}`]: {\n                    $each: booking.seats\n                }\n            }\n        }, {\n            upsert: true\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true\n        });\n    } catch (error) {\n        console.error('Save booking error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Server error'\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2Jvb2tpbmdzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDSztBQUdoRCxNQUFNRyxNQUFjQyw0QkFBbUM7QUFDdkQsTUFBTUcsU0FBaUJILFVBQStCO0FBRS9DLGVBQWVLLEtBQUtDLE9BQWdCO0lBQ3pDLE1BQU0sRUFBRUMsTUFBTSxFQUFFQyxPQUFPLEVBQUUsR0FBRyxNQUFNRixRQUFRRyxJQUFJO0lBRTlDLE1BQU1DLFNBQVMsSUFBSWIsZ0RBQVdBLENBQUNFO0lBQy9CLElBQUk7UUFDRixNQUFNVyxPQUFPQyxPQUFPO1FBQ3BCLE1BQU1DLEtBQUtGLE9BQU9FLEVBQUUsQ0FBQ1Q7UUFDckIsTUFBTVUsUUFBUUQsR0FBR0UsVUFBVSxDQUFPO1FBQ2xDLE1BQU1DLFdBQVdILEdBQUdFLFVBQVUsQ0FBVTtRQUV4QyxxQ0FBcUM7UUFDckMsTUFBTUQsTUFBTUcsU0FBUyxDQUNuQjtZQUFFQyxLQUFLLElBQUluQiw2Q0FBUUEsQ0FBQ1M7UUFBUSxHQUM1QjtZQUFFVyxPQUFPO2dCQUFFQyxVQUFVWDtZQUFRO1FBQUU7UUFHakMsOENBQThDO1FBQzlDLE1BQU1PLFNBQVNDLFNBQVMsQ0FDdEI7WUFBRUksSUFBSVosUUFBUWEsU0FBUztRQUFDLEdBQ3hCO1lBQ0VDLFdBQVc7Z0JBQ1QsOEJBQThCO2dCQUM5QkMsVUFBVTtvQkFDUkMsTUFBTWhCLFFBQVFlLFFBQVE7b0JBQ3RCRSxNQUFNO3dCQUFDakIsUUFBUWtCLFFBQVE7cUJBQUM7Z0JBQzFCO2dCQUNBLGlDQUFpQztnQkFDakMsQ0FBQyxDQUFDLFlBQVksRUFBRWxCLFFBQVFlLFFBQVEsQ0FBQyxDQUFDLEVBQUVmLFFBQVFrQixRQUFRLEVBQUUsQ0FBQyxFQUFFO29CQUFFQyxPQUFPbkIsUUFBUW9CLEtBQUs7Z0JBQUM7WUFDbEY7UUFDRixHQUNBO1lBQUVDLFFBQVE7UUFBSztRQUdqQixPQUFPakMscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFcUIsU0FBUztRQUFLO0lBQzNDLEVBQUUsT0FBT0MsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsdUJBQXVCQTtRQUNyQyxPQUFPbkMscURBQVlBLENBQUNhLElBQUksQ0FBQztZQUFFcUIsU0FBUztZQUFPRyxTQUFTO1FBQWUsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDdEYsU0FBVTtRQUNSLE1BQU14QixPQUFPeUIsS0FBSztJQUNwQjtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXExlbm92b1xcRGVza3RvcFxcY2luZWJvb2tcXGFwcFxcYXBpXFxib29raW5nc1xccm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlc3BvbnNlIH0gZnJvbSAnbmV4dC9zZXJ2ZXInO1xyXG5pbXBvcnQgeyBNb25nb0NsaWVudCwgT2JqZWN0SWQgfSBmcm9tIFwibW9uZ29kYlwiO1xyXG5pbXBvcnQgeyAgVGhlYXRlciwgVXNlciB9IGZyb20gXCJAL2xpYi9tb2RlbHMvbW9kZWxcIjtcclxuXHJcbmNvbnN0IHVyaTogc3RyaW5nID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTU9OR09EQl9VUkkgYXMgc3RyaW5nO1xyXG5jb25zdCBkYk5hbWU6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0RCX05BTUUgYXMgc3RyaW5nO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdDogUmVxdWVzdCkge1xyXG4gIGNvbnN0IHsgdXNlcklkLCBib29raW5nIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgY29uc3QgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYihkYk5hbWUpO1xyXG4gICAgY29uc3QgdXNlcnMgPSBkYi5jb2xsZWN0aW9uPFVzZXI+KCdVc2VycycpO1xyXG4gICAgY29uc3QgdGhlYXRlcnMgPSBkYi5jb2xsZWN0aW9uPFRoZWF0ZXI+KCdUaGVhdGVycycpO1xyXG5cclxuICAgIC8vIDEuIFNhdmUgYm9va2luZyBpbiB1c2VyJ3MgYm9va2luZ3NcclxuICAgIGF3YWl0IHVzZXJzLnVwZGF0ZU9uZShcclxuICAgICAgeyBfaWQ6IG5ldyBPYmplY3RJZCh1c2VySWQpIH0sXHJcbiAgICAgIHsgJHB1c2g6IHsgYm9va2luZ3M6IGJvb2tpbmcgfSB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIDIuIFVwZGF0ZSB0aGVhdGVyIHNob3dEYXRlIGFuZCBib29rZWQgc2VhdHNcclxuICAgIGF3YWl0IHRoZWF0ZXJzLnVwZGF0ZU9uZShcclxuICAgICAgeyBpZDogYm9va2luZy50aGVhdGVySWQgfSxcclxuICAgICAge1xyXG4gICAgICAgICRhZGRUb1NldDoge1xyXG4gICAgICAgICAgLy8gQWRkIHNob3dEYXRlIGlmIG5vdCBwcmVzZW50XHJcbiAgICAgICAgICBzaG93RGF0ZToge1xyXG4gICAgICAgICAgICBkYXRlOiBib29raW5nLnNob3dEYXRlLFxyXG4gICAgICAgICAgICB0aW1lOiBbYm9va2luZy5zaG93VGltZV1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAvLyBBZGQgYm9va2VkIHNlYXRzIGZvciB0aGlzIHNob3dcclxuICAgICAgICAgIFtgYm9va2VkU2VhdHMuJHtib29raW5nLnNob3dEYXRlfS4ke2Jvb2tpbmcuc2hvd1RpbWV9YF06IHsgJGVhY2g6IGJvb2tpbmcuc2VhdHMgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgeyB1cHNlcnQ6IHRydWUgfVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdTYXZlIGJvb2tpbmcgZXJyb3I6JywgZXJyb3IpO1xyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6ICdTZXJ2ZXIgZXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGF3YWl0IGNsaWVudC5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIk1vbmdvQ2xpZW50IiwiT2JqZWN0SWQiLCJ1cmkiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfTU9OR09EQl9VUkkiLCJkYk5hbWUiLCJORVhUX1BVQkxJQ19EQl9OQU1FIiwiUE9TVCIsInJlcXVlc3QiLCJ1c2VySWQiLCJib29raW5nIiwianNvbiIsImNsaWVudCIsImNvbm5lY3QiLCJkYiIsInVzZXJzIiwiY29sbGVjdGlvbiIsInRoZWF0ZXJzIiwidXBkYXRlT25lIiwiX2lkIiwiJHB1c2giLCJib29raW5ncyIsImlkIiwidGhlYXRlcklkIiwiJGFkZFRvU2V0Iiwic2hvd0RhdGUiLCJkYXRlIiwidGltZSIsInNob3dUaW1lIiwiJGVhY2giLCJzZWF0cyIsInVwc2VydCIsInN1Y2Nlc3MiLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwic3RhdHVzIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/bookings/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbookings%2Froute&page=%2Fapi%2Fbookings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbookings%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbookings%2Froute&page=%2Fapi%2Fbookings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbookings%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_api_bookings_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/bookings/route.ts */ \"(rsc)/./app/api/bookings/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/bookings/route\",\n        pathname: \"/api/bookings\",\n        filename: \"route\",\n        bundlePath: \"app/api/bookings/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\api\\\\bookings\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_api_bookings_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZib29raW5ncyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYm9va2luZ3MlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZib29raW5ncyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDa0I7QUFDL0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGNpbmVib29rXFxcXGFwcFxcXFxhcGlcXFxcYm9va2luZ3NcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2Jvb2tpbmdzL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYm9va2luZ3NcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2Jvb2tpbmdzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcTGVub3ZvXFxcXERlc2t0b3BcXFxcY2luZWJvb2tcXFxcYXBwXFxcXGFwaVxcXFxib29raW5nc1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbookings%2Froute&page=%2Fapi%2Fbookings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbookings%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fbookings%2Froute&page=%2Fapi%2Fbookings%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fbookings%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();