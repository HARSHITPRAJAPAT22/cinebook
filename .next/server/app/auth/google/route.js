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
exports.id = "app/auth/google/route";
exports.ids = ["app/auth/google/route"];
exports.modules = {

/***/ "(rsc)/./app/auth/google/route.ts":
/*!**********************************!*\
  !*** ./app/auth/google/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ \"(rsc)/./node_modules/jsonwebtoken/index.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst uri = \"mongodb+srv://aditivyasw:ZxE67PES9RTUJQEF@cinebook.9dfgnar.mongodb.net/\";\nconst dbName = \"cinebook\";\nconst JWT_SECRET = \"cinebook_secret_key\";\nasync function POST(request) {\n    const { name, email, googleId, facebookId, authProvider } = await request.json();\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_1__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const users = db.collection('Users');\n        // 1. Check if user exists by googleId\n        if (googleId) {\n            const existingGoogleUser = await users.findOne({\n                googleId\n            });\n            if (existingGoogleUser) {\n                // User exists, just return token\n                const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n                    id: existingGoogleUser._id.toString(),\n                    name: existingGoogleUser.name,\n                    email: existingGoogleUser.email\n                }, JWT_SECRET, {\n                    expiresIn: '7d'\n                });\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: true,\n                    user: {\n                        id: existingGoogleUser._id,\n                        name: existingGoogleUser.name,\n                        email: existingGoogleUser.email,\n                        googleId: existingGoogleUser.googleId,\n                        facebookId: existingGoogleUser.facebookId || null,\n                        authProvider: existingGoogleUser.authProvider || 'google'\n                    },\n                    token\n                });\n            }\n        }\n        // 2. If googleId not present, check if user exists by email\n        const existingEmailUser = await users.findOne({\n            email\n        });\n        if (existingEmailUser) {\n            // Update user to add googleId and authProvider\n            await users.updateOne({\n                email\n            }, {\n                $set: {\n                    googleId: googleId || null,\n                    authProvider: 'google'\n                }\n            });\n            const updatedUser = await users.findOne({\n                email\n            });\n            if (!updatedUser) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                    success: false,\n                    message: 'User not found after update.'\n                }, {\n                    status: 404\n                });\n            }\n            const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n                id: updatedUser._id.toString(),\n                name: updatedUser.name,\n                email: updatedUser.email\n            }, JWT_SECRET, {\n                expiresIn: '7d'\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true,\n                user: {\n                    id: updatedUser._id,\n                    name: updatedUser.name,\n                    email: updatedUser.email,\n                    googleId: updatedUser.googleId,\n                    facebookId: updatedUser.facebookId || null,\n                    authProvider: updatedUser.authProvider || 'google'\n                },\n                token\n            });\n        }\n        // 3. If not, create new user and return token\n        const result = await users.insertOne({\n            name,\n            email,\n            password: '',\n            googleId: googleId || null,\n            facebookId: facebookId || null,\n            authProvider: authProvider || 'google'\n        });\n        const token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default().sign({\n            id: result.insertedId.toString(),\n            name,\n            email\n        }, JWT_SECRET, {\n            expiresIn: '7d'\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: true,\n            user: {\n                id: result.insertedId,\n                name,\n                email,\n                googleId: googleId || null,\n                facebookId: facebookId || null,\n                authProvider: authProvider || 'google'\n            },\n            token\n        });\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            success: false,\n            message: 'Server error'\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFDbkM1QjtZQUNBQztZQUNBNEIsVUFBVTtZQUNWM0IsVUFBVUEsWUFBWTtZQUN0QkMsWUFBWUEsY0FBYztZQUMxQkMsY0FBY0EsZ0JBQWdCO1FBQ2hDO1FBRUEsTUFBTVMsUUFBUXhCLHdEQUFRLENBQ3BCO1lBQUUwQixJQUFJWSxPQUFPRyxVQUFVLENBQUNiLFFBQVE7WUFBSWpCO1lBQU1DO1FBQU0sR0FDaERMLFlBQ0E7WUFBRXNCLFdBQVc7UUFBSztRQUdwQixPQUFPL0IscURBQVlBLENBQUNrQixJQUFJLENBQUM7WUFDdkJjLFNBQVM7WUFDVEMsTUFBTTtnQkFDSkwsSUFBSVksT0FBT0csVUFBVTtnQkFDckI5QjtnQkFDQUM7Z0JBQ0FDLFVBQVVBLFlBQVk7Z0JBQ3RCQyxZQUFZQSxjQUFjO2dCQUMxQkMsY0FBY0EsZ0JBQWdCO1lBQ2hDO1lBQ0FTO1FBQ0Y7SUFDRixFQUFFLE9BQU9rQixPQUFPO1FBQ2QsT0FBTzVDLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQ3ZCYyxTQUFTO1lBQ1RNLFNBQVM7UUFDWCxHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUNuQixTQUFVO1FBQ1IsTUFBTXBCLE9BQU8wQixLQUFLO0lBQ3BCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTGVub3ZvXFxEZXNrdG9wXFxjaW5lYm9va1xcYXBwXFxhdXRoXFxnb29nbGVcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuaW1wb3J0IHsgTW9uZ29DbGllbnQgfSBmcm9tICdtb25nb2RiJztcclxuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHRqcyc7XHJcbmltcG9ydCBqd3QgZnJvbSAnanNvbndlYnRva2VuJztcclxuXHJcbmNvbnN0IHVyaTogc3RyaW5nID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfTU9OR09EQl9VUkkgYXMgc3RyaW5nO1xyXG5jb25zdCBkYk5hbWU6IHN0cmluZyA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0RCX05BTUUgYXMgc3RyaW5nO1xyXG5jb25zdCBKV1RfU0VDUkVUOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19KV1RfU0VDUkVUIGFzIHN0cmluZztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCB7IG5hbWUsIGVtYWlsLCBnb29nbGVJZCwgZmFjZWJvb2tJZCwgYXV0aFByb3ZpZGVyIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcclxuXHJcbiAgY29uc3QgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSk7XHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IGNsaWVudC5jb25uZWN0KCk7XHJcbiAgICBjb25zdCBkYiA9IGNsaWVudC5kYihkYk5hbWUpO1xyXG4gICAgY29uc3QgdXNlcnMgPSBkYi5jb2xsZWN0aW9uKCdVc2VycycpO1xyXG5cclxuICAgIC8vIDEuIENoZWNrIGlmIHVzZXIgZXhpc3RzIGJ5IGdvb2dsZUlkXHJcbiAgICBpZiAoZ29vZ2xlSWQpIHtcclxuICAgICAgY29uc3QgZXhpc3RpbmdHb29nbGVVc2VyID0gYXdhaXQgdXNlcnMuZmluZE9uZSh7IGdvb2dsZUlkIH0pO1xyXG4gICAgICBpZiAoZXhpc3RpbmdHb29nbGVVc2VyKSB7XHJcbiAgICAgICAgLy8gVXNlciBleGlzdHMsIGp1c3QgcmV0dXJuIHRva2VuXHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSBqd3Quc2lnbihcclxuICAgICAgICAgIHsgaWQ6IGV4aXN0aW5nR29vZ2xlVXNlci5faWQudG9TdHJpbmcoKSwgbmFtZTogZXhpc3RpbmdHb29nbGVVc2VyLm5hbWUsIGVtYWlsOiBleGlzdGluZ0dvb2dsZVVzZXIuZW1haWwgfSxcclxuICAgICAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgICAgICB7IGV4cGlyZXNJbjogJzdkJyB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgICAgIHVzZXI6IHtcclxuICAgICAgICAgICAgaWQ6IGV4aXN0aW5nR29vZ2xlVXNlci5faWQsXHJcbiAgICAgICAgICAgIG5hbWU6IGV4aXN0aW5nR29vZ2xlVXNlci5uYW1lLFxyXG4gICAgICAgICAgICBlbWFpbDogZXhpc3RpbmdHb29nbGVVc2VyLmVtYWlsLFxyXG4gICAgICAgICAgICBnb29nbGVJZDogZXhpc3RpbmdHb29nbGVVc2VyLmdvb2dsZUlkLFxyXG4gICAgICAgICAgICBmYWNlYm9va0lkOiBleGlzdGluZ0dvb2dsZVVzZXIuZmFjZWJvb2tJZCB8fCBudWxsLFxyXG4gICAgICAgICAgICBhdXRoUHJvdmlkZXI6IGV4aXN0aW5nR29vZ2xlVXNlci5hdXRoUHJvdmlkZXIgfHwgJ2dvb2dsZSdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB0b2tlblxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMi4gSWYgZ29vZ2xlSWQgbm90IHByZXNlbnQsIGNoZWNrIGlmIHVzZXIgZXhpc3RzIGJ5IGVtYWlsXHJcbiAgICBjb25zdCBleGlzdGluZ0VtYWlsVXNlciA9IGF3YWl0IHVzZXJzLmZpbmRPbmUoeyBlbWFpbCB9KTtcclxuICAgIGlmIChleGlzdGluZ0VtYWlsVXNlcikge1xyXG4gICAgICAvLyBVcGRhdGUgdXNlciB0byBhZGQgZ29vZ2xlSWQgYW5kIGF1dGhQcm92aWRlclxyXG4gICAgICBhd2FpdCB1c2Vycy51cGRhdGVPbmUoXHJcbiAgICAgICAgeyBlbWFpbCB9LFxyXG4gICAgICAgIHsgJHNldDogeyBnb29nbGVJZDogZ29vZ2xlSWQgfHwgbnVsbCwgYXV0aFByb3ZpZGVyOiAnZ29vZ2xlJyB9IH1cclxuICAgICAgKTtcclxuICAgICAgY29uc3QgdXBkYXRlZFVzZXIgPSBhd2FpdCB1c2Vycy5maW5kT25lKHsgZW1haWwgfSk7XHJcbiAgICAgIGlmICghdXBkYXRlZFVzZXIpIHtcclxuICAgICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgICAgc3VjY2VzczogZmFsc2UsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnVXNlciBub3QgZm91bmQgYWZ0ZXIgdXBkYXRlLidcclxuICAgICAgICB9LCB7IHN0YXR1czogNDA0IH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgICAgeyBpZDogdXBkYXRlZFVzZXIuX2lkLnRvU3RyaW5nKCksIG5hbWU6IHVwZGF0ZWRVc2VyLm5hbWUsIGVtYWlsOiB1cGRhdGVkVXNlci5lbWFpbCB9LFxyXG4gICAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgICAgeyBleHBpcmVzSW46ICc3ZCcgfVxyXG4gICAgICApO1xyXG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oe1xyXG4gICAgICAgIHN1Y2Nlc3M6IHRydWUsXHJcbiAgICAgICAgdXNlcjoge1xyXG4gICAgICAgICAgaWQ6IHVwZGF0ZWRVc2VyLl9pZCxcclxuICAgICAgICAgIG5hbWU6IHVwZGF0ZWRVc2VyLm5hbWUsXHJcbiAgICAgICAgICBlbWFpbDogdXBkYXRlZFVzZXIuZW1haWwsXHJcbiAgICAgICAgICBnb29nbGVJZDogdXBkYXRlZFVzZXIuZ29vZ2xlSWQsXHJcbiAgICAgICAgICBmYWNlYm9va0lkOiB1cGRhdGVkVXNlci5mYWNlYm9va0lkIHx8IG51bGwsXHJcbiAgICAgICAgICBhdXRoUHJvdmlkZXI6IHVwZGF0ZWRVc2VyLmF1dGhQcm92aWRlciB8fCAnZ29vZ2xlJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdG9rZW5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMy4gSWYgbm90LCBjcmVhdGUgbmV3IHVzZXIgYW5kIHJldHVybiB0b2tlblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXNlcnMuaW5zZXJ0T25lKHtcclxuICAgICAgbmFtZSxcclxuICAgICAgZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkOiAnJyxcclxuICAgICAgZ29vZ2xlSWQ6IGdvb2dsZUlkIHx8IG51bGwsXHJcbiAgICAgIGZhY2Vib29rSWQ6IGZhY2Vib29rSWQgfHwgbnVsbCxcclxuICAgICAgYXV0aFByb3ZpZGVyOiBhdXRoUHJvdmlkZXIgfHwgJ2dvb2dsZSdcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRva2VuID0gand0LnNpZ24oXHJcbiAgICAgIHsgaWQ6IHJlc3VsdC5pbnNlcnRlZElkLnRvU3RyaW5nKCksIG5hbWUsIGVtYWlsIH0sXHJcbiAgICAgIEpXVF9TRUNSRVQsXHJcbiAgICAgIHsgZXhwaXJlc0luOiAnN2QnIH1cclxuICAgICk7XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgc3VjY2VzczogdHJ1ZSxcclxuICAgICAgdXNlcjoge1xyXG4gICAgICAgIGlkOiByZXN1bHQuaW5zZXJ0ZWRJZCxcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIGVtYWlsLFxyXG4gICAgICAgIGdvb2dsZUlkOiBnb29nbGVJZCB8fCBudWxsLFxyXG4gICAgICAgIGZhY2Vib29rSWQ6IGZhY2Vib29rSWQgfHwgbnVsbCxcclxuICAgICAgICBhdXRoUHJvdmlkZXI6IGF1dGhQcm92aWRlciB8fCAnZ29vZ2xlJ1xyXG4gICAgICB9LFxyXG4gICAgICB0b2tlblxyXG4gICAgfSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7XHJcbiAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxyXG4gICAgICBtZXNzYWdlOiAnU2VydmVyIGVycm9yJ1xyXG4gICAgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgYXdhaXQgY2xpZW50LmNsb3NlKCk7XHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIk1vbmdvQ2xpZW50Iiwiand0IiwidXJpIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX01PTkdPREJfVVJJIiwiZGJOYW1lIiwiTkVYVF9QVUJMSUNfREJfTkFNRSIsIkpXVF9TRUNSRVQiLCJORVhUX1BVQkxJQ19KV1RfU0VDUkVUIiwiUE9TVCIsInJlcXVlc3QiLCJuYW1lIiwiZW1haWwiLCJnb29nbGVJZCIsImZhY2Vib29rSWQiLCJhdXRoUHJvdmlkZXIiLCJqc29uIiwiY2xpZW50IiwiY29ubmVjdCIsImRiIiwidXNlcnMiLCJjb2xsZWN0aW9uIiwiZXhpc3RpbmdHb29nbGVVc2VyIiwiZmluZE9uZSIsInRva2VuIiwic2lnbiIsImlkIiwiX2lkIiwidG9TdHJpbmciLCJleHBpcmVzSW4iLCJzdWNjZXNzIiwidXNlciIsImV4aXN0aW5nRW1haWxVc2VyIiwidXBkYXRlT25lIiwiJHNldCIsInVwZGF0ZWRVc2VyIiwibWVzc2FnZSIsInN0YXR1cyIsInJlc3VsdCIsImluc2VydE9uZSIsInBhc3N3b3JkIiwiaW5zZXJ0ZWRJZCIsImVycm9yIiwiY2xvc2UiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/auth/google/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fgoogle%2Froute&page=%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fgoogle%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fgoogle%2Froute&page=%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fgoogle%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_auth_google_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/auth/google/route.ts */ \"(rsc)/./app/auth/google/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/auth/google/route\",\n        pathname: \"/auth/google\",\n        filename: \"route\",\n        bundlePath: \"app/auth/google/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\auth\\\\google\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_auth_google_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhdXRoJTJGZ29vZ2xlJTJGcm91dGUmcGFnZT0lMkZhdXRoJTJGZ29vZ2xlJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXV0aCUyRmdvb2dsZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUI7QUFDOUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGNpbmVib29rXFxcXGFwcFxcXFxhdXRoXFxcXGdvb2dsZVxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hdXRoL2dvb2dsZS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXV0aC9nb29nbGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXV0aC9nb29nbGUvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxjaW5lYm9va1xcXFxhcHBcXFxcYXV0aFxcXFxnb29nbGVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fgoogle%2Froute&page=%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fgoogle%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/semver","vendor-chunks/jsonwebtoken","vendor-chunks/lodash.includes","vendor-chunks/jws","vendor-chunks/lodash.once","vendor-chunks/jwa","vendor-chunks/lodash.isinteger","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/lodash.isplainobject","vendor-chunks/ms","vendor-chunks/lodash.isstring","vendor-chunks/lodash.isnumber","vendor-chunks/lodash.isboolean","vendor-chunks/safe-buffer","vendor-chunks/buffer-equal-constant-time"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fauth%2Fgoogle%2Froute&page=%2Fauth%2Fgoogle%2Froute&appPaths=&pagePath=private-next-app-dir%2Fauth%2Fgoogle%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();