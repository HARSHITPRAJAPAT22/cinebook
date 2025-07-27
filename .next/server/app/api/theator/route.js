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
exports.id = "app/api/theator/route";
exports.ids = ["app/api/theator/route"];
exports.modules = {

/***/ "(rsc)/./app/api/theator/route.ts":
/*!**********************************!*\
  !*** ./app/api/theator/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n\n\n// Helper function to check if a show date/time is in the past\n// function isPast(showDate: string, showTime: string): boolean {\n//   const showDateTime = new Date(`${showDate}T${showTime}:00`);\n//   return showDateTime < new Date();\n// }\nconst uri = \"mongodb://localhost:27017/\";\nconst dbName = \"cinebook\";\nasync function GET(request) {\n    const { searchParams } = new URL(request.url);\n    const theaterId = searchParams.get('theatorId');\n    if (!theaterId) {\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'theatorId is required'\n        }, {\n            status: 400\n        });\n    }\n    // Use secure environment variables for MongoDB\n    const client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri);\n    try {\n        await client.connect();\n        const db = client.db(dbName);\n        const theatersCollection = db.collection('Theaters');\n        let theater = await theatersCollection.findOne({\n            id: theaterId\n        });\n        // If theater not found, create a new entry\n        if (!theater) {\n            const newTheater = {\n                id: theaterId,\n                showDate: [],\n                bookedSeats: {}\n            };\n            await theatersCollection.insertOne(newTheater);\n            return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n                message: 'Theater created',\n                theater: newTheater\n            }, {\n                status: 201\n            });\n        }\n        // Remove past bookings from the database\n        // let bookingsToKeep = Array.isArray(theater.bookings)\n        //   ? theater.bookings.filter((booking: any) => !isPast(booking.showDate, booking.showTime))\n        //   : [];\n        // if (bookingsToKeep.length < (theater.bookings?.length || 0)) {\n        //   await theatersCollection.updateOne(\n        //     { id: theaterId },\n        //     { $set: { bookings: bookingsToKeep } }\n        //   );\n        //   theater.bookings = bookingsToKeep;\n        // }\n        // Format showDate and bookedSeats for response\n        // const formattedShowDates: { date: string, time: string[] }[] = [];\n        // const bookedSeats: Record<string, Record<string, string[]>> = {};\n        // if (Array.isArray(theater.bookings)) {\n        //   theater.bookings.forEach((booking: any) => {\n        //     if (booking.showDate && booking.showTime && booking.seats) {\n        //       let showDateObj = formattedShowDates.find(sd => sd.date === booking.showDate);\n        //       if (showDateObj) {\n        //         if (!showDateObj.time.includes(booking.showTime)) {\n        //           showDateObj.time.push(booking.showTime);\n        //         }\n        //       } else {\n        //         formattedShowDates.push({\n        //           date: booking.showDate,\n        //           time: [booking.showTime]\n        //         });\n        //       }\n        //       if (!bookedSeats[booking.showDate]) bookedSeats[booking.showDate] = {};\n        //       if (!bookedSeats[booking.showDate][booking.showTime]) bookedSeats[booking.showDate][booking.showTime] = [];\n        //       bookedSeats[booking.showDate][booking.showTime].push(...booking.seats);\n        //     }\n        //   });\n        // }\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            theater: {\n                ...theater\n            }\n        });\n    } catch (error) {\n        console.error('Database error in GET /api/theators/[theatorId]:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_1__.NextResponse.json({\n            error: 'Database error',\n            details: error?.message\n        }, {\n            status: 500\n        });\n    } finally{\n        await client.close();\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3RoZWF0b3Ivcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFzQztBQUNLO0FBRTNDLDhEQUE4RDtBQUM5RCxpRUFBaUU7QUFDakUsaUVBQWlFO0FBQ2pFLHNDQUFzQztBQUN0QyxJQUFJO0FBQ0osTUFBTUUsTUFBY0MsNEJBQW1DO0FBQ3ZELE1BQU1HLFNBQWlCSCxVQUErQjtBQUUvQyxlQUFlSyxJQUFJQyxPQUFnQjtJQUN4QyxNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7SUFDNUMsTUFBTUMsWUFBWUgsYUFBYUksR0FBRyxDQUFDO0lBRW5DLElBQUksQ0FBQ0QsV0FBVztRQUNkLE9BQU9aLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRUMsT0FBTztRQUF3QixHQUFHO1lBQUVDLFFBQVE7UUFBSTtJQUM3RTtJQUVBLCtDQUErQztJQUMvQyxNQUFNQyxTQUFTLElBQUlsQixnREFBV0EsQ0FBQ0U7SUFFL0IsSUFBSTtRQUNGLE1BQU1nQixPQUFPQyxPQUFPO1FBQ3BCLE1BQU1DLEtBQUtGLE9BQU9FLEVBQUUsQ0FBQ2Q7UUFDckIsTUFBTWUscUJBQXFCRCxHQUFHRSxVQUFVLENBQUM7UUFFekMsSUFBSUMsVUFBVSxNQUFNRixtQkFBbUJHLE9BQU8sQ0FBQztZQUFFQyxJQUFJWjtRQUFVO1FBRS9ELDJDQUEyQztRQUMzQyxJQUFJLENBQUNVLFNBQVM7WUFDWixNQUFNRyxhQUFhO2dCQUNqQkQsSUFBSVo7Z0JBQ0pjLFVBQVUsRUFBRTtnQkFDWkMsYUFBYSxDQUFDO1lBQ2hCO1lBQ0EsTUFBTVAsbUJBQW1CUSxTQUFTLENBQUNIO1lBQ25DLE9BQU96QixxREFBWUEsQ0FBQ2MsSUFBSSxDQUFDO2dCQUFFZSxTQUFTO2dCQUFtQlAsU0FBU0c7WUFBVyxHQUFHO2dCQUFFVCxRQUFRO1lBQUk7UUFDOUY7UUFFQSx5Q0FBeUM7UUFDekMsdURBQXVEO1FBQ3ZELDZGQUE2RjtRQUM3RixVQUFVO1FBRVYsaUVBQWlFO1FBQ2pFLHdDQUF3QztRQUN4Qyx5QkFBeUI7UUFDekIsNkNBQTZDO1FBQzdDLE9BQU87UUFDUCx1Q0FBdUM7UUFDdkMsSUFBSTtRQUVKLCtDQUErQztRQUMvQyxxRUFBcUU7UUFDckUsb0VBQW9FO1FBRXBFLHlDQUF5QztRQUN6QyxpREFBaUQ7UUFDakQsbUVBQW1FO1FBQ25FLHVGQUF1RjtRQUN2RiwyQkFBMkI7UUFDM0IsOERBQThEO1FBQzlELHFEQUFxRDtRQUNyRCxZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLG9DQUFvQztRQUNwQyxvQ0FBb0M7UUFDcEMscUNBQXFDO1FBQ3JDLGNBQWM7UUFDZCxVQUFVO1FBQ1YsZ0ZBQWdGO1FBQ2hGLG9IQUFvSDtRQUNwSCxnRkFBZ0Y7UUFDaEYsUUFBUTtRQUNSLFFBQVE7UUFDUixJQUFJO1FBRUosT0FBT2hCLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFDdkJRLFNBQVM7Z0JBQ1AsR0FBR0EsT0FBTztZQUdaO1FBQ0Y7SUFDRixFQUFFLE9BQU9QLE9BQVk7UUFDbkJlLFFBQVFmLEtBQUssQ0FBQyxvREFBb0RBO1FBQ2xFLE9BQU9mLHFEQUFZQSxDQUFDYyxJQUFJLENBQUM7WUFBRUMsT0FBTztZQUFrQmdCLFNBQVNoQixPQUFPYztRQUFRLEdBQUc7WUFBRWIsUUFBUTtRQUFJO0lBQy9GLFNBQVU7UUFDUixNQUFNQyxPQUFPZSxLQUFLO0lBQ3BCO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTGVub3ZvXFxEZXNrdG9wXFxjaW5lYm9va1xcYXBwXFxhcGlcXHRoZWF0b3JcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XHJcbmltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBjaGVjayBpZiBhIHNob3cgZGF0ZS90aW1lIGlzIGluIHRoZSBwYXN0XHJcbi8vIGZ1bmN0aW9uIGlzUGFzdChzaG93RGF0ZTogc3RyaW5nLCBzaG93VGltZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbi8vICAgY29uc3Qgc2hvd0RhdGVUaW1lID0gbmV3IERhdGUoYCR7c2hvd0RhdGV9VCR7c2hvd1RpbWV9OjAwYCk7XHJcbi8vICAgcmV0dXJuIHNob3dEYXRlVGltZSA8IG5ldyBEYXRlKCk7XHJcbi8vIH1cclxuY29uc3QgdXJpOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19NT05HT0RCX1VSSSBhcyBzdHJpbmc7XHJcbmNvbnN0IGRiTmFtZTogc3RyaW5nID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfREJfTkFNRSBhcyBzdHJpbmc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcclxuICBjb25zdCB7IHNlYXJjaFBhcmFtcyB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybCk7XHJcbiAgY29uc3QgdGhlYXRlcklkID0gc2VhcmNoUGFyYW1zLmdldCgndGhlYXRvcklkJyk7XHJcblxyXG4gIGlmICghdGhlYXRlcklkKSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ3RoZWF0b3JJZCBpcyByZXF1aXJlZCcgfSwgeyBzdGF0dXM6IDQwMCB9KTtcclxuICB9XHJcblxyXG4gIC8vIFVzZSBzZWN1cmUgZW52aXJvbm1lbnQgdmFyaWFibGVzIGZvciBNb25nb0RCXHJcbiAgY29uc3QgY2xpZW50ID0gbmV3IE1vbmdvQ2xpZW50KHVyaSk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBjbGllbnQuY29ubmVjdCgpO1xyXG4gICAgY29uc3QgZGIgPSBjbGllbnQuZGIoZGJOYW1lKTtcclxuICAgIGNvbnN0IHRoZWF0ZXJzQ29sbGVjdGlvbiA9IGRiLmNvbGxlY3Rpb24oJ1RoZWF0ZXJzJyk7XHJcblxyXG4gICAgbGV0IHRoZWF0ZXIgPSBhd2FpdCB0aGVhdGVyc0NvbGxlY3Rpb24uZmluZE9uZSh7IGlkOiB0aGVhdGVySWQgfSk7XHJcblxyXG4gICAgLy8gSWYgdGhlYXRlciBub3QgZm91bmQsIGNyZWF0ZSBhIG5ldyBlbnRyeVxyXG4gICAgaWYgKCF0aGVhdGVyKSB7XHJcbiAgICAgIGNvbnN0IG5ld1RoZWF0ZXIgPSB7XHJcbiAgICAgICAgaWQ6IHRoZWF0ZXJJZCxcclxuICAgICAgICBzaG93RGF0ZTogW10sXHJcbiAgICAgICAgYm9va2VkU2VhdHM6IHt9XHJcbiAgICAgIH07XHJcbiAgICAgIGF3YWl0IHRoZWF0ZXJzQ29sbGVjdGlvbi5pbnNlcnRPbmUobmV3VGhlYXRlcik7XHJcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IG1lc3NhZ2U6ICdUaGVhdGVyIGNyZWF0ZWQnLCB0aGVhdGVyOiBuZXdUaGVhdGVyIH0sIHsgc3RhdHVzOiAyMDEgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVtb3ZlIHBhc3QgYm9va2luZ3MgZnJvbSB0aGUgZGF0YWJhc2VcclxuICAgIC8vIGxldCBib29raW5nc1RvS2VlcCA9IEFycmF5LmlzQXJyYXkodGhlYXRlci5ib29raW5ncylcclxuICAgIC8vICAgPyB0aGVhdGVyLmJvb2tpbmdzLmZpbHRlcigoYm9va2luZzogYW55KSA9PiAhaXNQYXN0KGJvb2tpbmcuc2hvd0RhdGUsIGJvb2tpbmcuc2hvd1RpbWUpKVxyXG4gICAgLy8gICA6IFtdO1xyXG5cclxuICAgIC8vIGlmIChib29raW5nc1RvS2VlcC5sZW5ndGggPCAodGhlYXRlci5ib29raW5ncz8ubGVuZ3RoIHx8IDApKSB7XHJcbiAgICAvLyAgIGF3YWl0IHRoZWF0ZXJzQ29sbGVjdGlvbi51cGRhdGVPbmUoXHJcbiAgICAvLyAgICAgeyBpZDogdGhlYXRlcklkIH0sXHJcbiAgICAvLyAgICAgeyAkc2V0OiB7IGJvb2tpbmdzOiBib29raW5nc1RvS2VlcCB9IH1cclxuICAgIC8vICAgKTtcclxuICAgIC8vICAgdGhlYXRlci5ib29raW5ncyA9IGJvb2tpbmdzVG9LZWVwO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIEZvcm1hdCBzaG93RGF0ZSBhbmQgYm9va2VkU2VhdHMgZm9yIHJlc3BvbnNlXHJcbiAgICAvLyBjb25zdCBmb3JtYXR0ZWRTaG93RGF0ZXM6IHsgZGF0ZTogc3RyaW5nLCB0aW1lOiBzdHJpbmdbXSB9W10gPSBbXTtcclxuICAgIC8vIGNvbnN0IGJvb2tlZFNlYXRzOiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4+ID0ge307XHJcblxyXG4gICAgLy8gaWYgKEFycmF5LmlzQXJyYXkodGhlYXRlci5ib29raW5ncykpIHtcclxuICAgIC8vICAgdGhlYXRlci5ib29raW5ncy5mb3JFYWNoKChib29raW5nOiBhbnkpID0+IHtcclxuICAgIC8vICAgICBpZiAoYm9va2luZy5zaG93RGF0ZSAmJiBib29raW5nLnNob3dUaW1lICYmIGJvb2tpbmcuc2VhdHMpIHtcclxuICAgIC8vICAgICAgIGxldCBzaG93RGF0ZU9iaiA9IGZvcm1hdHRlZFNob3dEYXRlcy5maW5kKHNkID0+IHNkLmRhdGUgPT09IGJvb2tpbmcuc2hvd0RhdGUpO1xyXG4gICAgLy8gICAgICAgaWYgKHNob3dEYXRlT2JqKSB7XHJcbiAgICAvLyAgICAgICAgIGlmICghc2hvd0RhdGVPYmoudGltZS5pbmNsdWRlcyhib29raW5nLnNob3dUaW1lKSkge1xyXG4gICAgLy8gICAgICAgICAgIHNob3dEYXRlT2JqLnRpbWUucHVzaChib29raW5nLnNob3dUaW1lKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgICAgfSBlbHNlIHtcclxuICAgIC8vICAgICAgICAgZm9ybWF0dGVkU2hvd0RhdGVzLnB1c2goe1xyXG4gICAgLy8gICAgICAgICAgIGRhdGU6IGJvb2tpbmcuc2hvd0RhdGUsXHJcbiAgICAvLyAgICAgICAgICAgdGltZTogW2Jvb2tpbmcuc2hvd1RpbWVdXHJcbiAgICAvLyAgICAgICAgIH0pO1xyXG4gICAgLy8gICAgICAgfVxyXG4gICAgLy8gICAgICAgaWYgKCFib29rZWRTZWF0c1tib29raW5nLnNob3dEYXRlXSkgYm9va2VkU2VhdHNbYm9va2luZy5zaG93RGF0ZV0gPSB7fTtcclxuICAgIC8vICAgICAgIGlmICghYm9va2VkU2VhdHNbYm9va2luZy5zaG93RGF0ZV1bYm9va2luZy5zaG93VGltZV0pIGJvb2tlZFNlYXRzW2Jvb2tpbmcuc2hvd0RhdGVdW2Jvb2tpbmcuc2hvd1RpbWVdID0gW107XHJcbiAgICAvLyAgICAgICBib29rZWRTZWF0c1tib29raW5nLnNob3dEYXRlXVtib29raW5nLnNob3dUaW1lXS5wdXNoKC4uLmJvb2tpbmcuc2VhdHMpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcclxuICAgICAgdGhlYXRlcjoge1xyXG4gICAgICAgIC4uLnRoZWF0ZXIsXHJcbiAgICAgICAgLy8gc2hvd0RhdGU6IGZvcm1hdHRlZFNob3dEYXRlcyxcclxuICAgICAgICAvLyBib29rZWRTZWF0c1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdEYXRhYmFzZSBlcnJvciBpbiBHRVQgL2FwaS90aGVhdG9ycy9bdGhlYXRvcklkXTonLCBlcnJvcik7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogJ0RhdGFiYXNlIGVycm9yJywgZGV0YWlsczogZXJyb3I/Lm1lc3NhZ2UgfSwgeyBzdGF0dXM6IDUwMCB9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgYXdhaXQgY2xpZW50LmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJNb25nb0NsaWVudCIsIk5leHRSZXNwb25zZSIsInVyaSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19NT05HT0RCX1VSSSIsImRiTmFtZSIsIk5FWFRfUFVCTElDX0RCX05BTUUiLCJHRVQiLCJyZXF1ZXN0Iiwic2VhcmNoUGFyYW1zIiwiVVJMIiwidXJsIiwidGhlYXRlcklkIiwiZ2V0IiwianNvbiIsImVycm9yIiwic3RhdHVzIiwiY2xpZW50IiwiY29ubmVjdCIsImRiIiwidGhlYXRlcnNDb2xsZWN0aW9uIiwiY29sbGVjdGlvbiIsInRoZWF0ZXIiLCJmaW5kT25lIiwiaWQiLCJuZXdUaGVhdGVyIiwic2hvd0RhdGUiLCJib29rZWRTZWF0cyIsImluc2VydE9uZSIsIm1lc3NhZ2UiLCJjb25zb2xlIiwiZGV0YWlscyIsImNsb3NlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/theator/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftheator%2Froute&page=%2Fapi%2Ftheator%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftheator%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftheator%2Froute&page=%2Fapi%2Ftheator%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftheator%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_Lenovo_Desktop_cinebook_app_api_theator_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/theator/route.ts */ \"(rsc)/./app/api/theator/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/theator/route\",\n        pathname: \"/api/theator\",\n        filename: \"route\",\n        bundlePath: \"app/api/theator/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Lenovo\\\\Desktop\\\\cinebook\\\\app\\\\api\\\\theator\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_Lenovo_Desktop_cinebook_app_api_theator_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0aGVhdG9yJTJGcm91dGUmcGFnZT0lMkZhcGklMkZ0aGVhdG9yJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGdGhlYXRvciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMZW5vdm8lNUNEZXNrdG9wJTVDY2luZWJvb2slNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q0xlbm92byU1Q0Rlc2t0b3AlNUNjaW5lYm9vayZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDaUI7QUFDOUY7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXExlbm92b1xcXFxEZXNrdG9wXFxcXGNpbmVib29rXFxcXGFwcFxcXFxhcGlcXFxcdGhlYXRvclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGhlYXRvci9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL3RoZWF0b3JcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL3RoZWF0b3Ivcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxMZW5vdm9cXFxcRGVza3RvcFxcXFxjaW5lYm9va1xcXFxhcHBcXFxcYXBpXFxcXHRoZWF0b3JcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftheator%2Froute&page=%2Fapi%2Ftheator%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftheator%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftheator%2Froute&page=%2Fapi%2Ftheator%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftheator%2Froute.ts&appDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CLenovo%5CDesktop%5Ccinebook&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();