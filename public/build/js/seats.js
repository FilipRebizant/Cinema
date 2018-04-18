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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/seats.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/seats.js":
/*!****************************!*\
  !*** ./assets/js/seats.js ***!
  \****************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

$(document).ready(function () {

    var seats = {

        row_number: 10,
        seats_number: 10,

        init: function init() {
            this.cacheDom();
            this.renderSeats();
            this.bookASeat();
        },

        cacheDom: function cacheDom() {
            this.$seats__container = $('.seats__container');
            this.$row = $('<div class="seats__row"></div>');
            // this.$seat = $('.seats__seat');
        },

        renderSeats: function renderSeats() {

            for (var i = 0; i < this.row_number; i++) {
                var row = $('<ul/>', { 'class': 'seats__row' });

                for (var j = 0; j < this.seats_number; j++) {
                    row.append($('<li/>', {
                        class: 'seats__seat',
                        'data-row': i + 1,
                        'data-seat': j + 1
                    }).append(j + 1));
                }

                this.$seats__container.append(row);
            }
        },

        bookASeat: function bookASeat() {

            $('.seats__seat').delegate(this.$seats__container, 'click', function () {
                var $this = $(this);
                $this.toggleClass('seats__seat-active');
                console.log("rząd " + $(this).data('row'));
                console.log("miejsce " + $(this).data('seat'));
            });
        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzdjN2UwMWExNTdmYjFjOTBmYTkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwic2VhdHNfbnVtYmVyIiwiaW5pdCIsImNhY2hlRG9tIiwicmVuZGVyU2VhdHMiLCJib29rQVNlYXQiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRyb3ciLCJpIiwicm93IiwiaiIsImFwcGVuZCIsImNsYXNzIiwiZGVsZWdhdGUiLCIkdGhpcyIsInRvZ2dsZUNsYXNzIiwiY29uc29sZSIsImxvZyIsImRhdGEiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzdEQUEsRUFBRUMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVk7O0FBRTFCLFFBQUlDLFFBQVE7O0FBRVJDLG9CQUFZLEVBRko7QUFHUkMsc0JBQWMsRUFITjs7QUFLUkMsY0FBTSxnQkFBWTtBQUNkLGlCQUFLQyxRQUFMO0FBQ0EsaUJBQUtDLFdBQUw7QUFDQSxpQkFBS0MsU0FBTDtBQUNILFNBVE87O0FBV1JGLGtCQUFVLG9CQUFZO0FBQ2xCLGlCQUFLRyxpQkFBTCxHQUF5QlYsRUFBRSxtQkFBRixDQUF6QjtBQUNBLGlCQUFLVyxJQUFMLEdBQVlYLEVBQUUsZ0NBQUYsQ0FBWjtBQUNBO0FBQ0gsU0FmTzs7QUFpQlJRLHFCQUFhLHVCQUFZOztBQUVyQixpQkFBSyxJQUFJSSxJQUFJLENBQWIsRUFBZ0JBLElBQUksS0FBS1IsVUFBekIsRUFBcUNRLEdBQXJDLEVBQTBDO0FBQ3RDLG9CQUFJQyxNQUFNYixFQUFFLE9BQUYsRUFBVyxFQUFDLFNBQVMsWUFBVixFQUFYLENBQVY7O0FBRUEscUJBQUssSUFBSWMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtULFlBQXpCLEVBQXVDUyxHQUF2QyxFQUE0QztBQUN4Q0Qsd0JBQUlFLE1BQUosQ0FBV2YsRUFBRSxPQUFGLEVBQVc7QUFDbEJnQiwrQkFBTyxhQURXO0FBRWxCLG9DQUFZSixJQUFJLENBRkU7QUFHbEIscUNBQWFFLElBQUk7QUFIQyxxQkFBWCxFQUlSQyxNQUpRLENBSURELElBQUksQ0FKSCxDQUFYO0FBS0g7O0FBRUQscUJBQUtKLGlCQUFMLENBQXVCSyxNQUF2QixDQUE4QkYsR0FBOUI7QUFDSDtBQUNKLFNBaENPOztBQWtDUkosbUJBQVcscUJBQVk7O0FBRW5CVCxjQUFFLGNBQUYsRUFBa0JpQixRQUFsQixDQUEyQixLQUFLUCxpQkFBaEMsRUFBbUQsT0FBbkQsRUFBNEQsWUFBWTtBQUNwRSxvQkFBSVEsUUFBUWxCLEVBQUUsSUFBRixDQUFaO0FBQ0FrQixzQkFBTUMsV0FBTixDQUFrQixvQkFBbEI7QUFDQUMsd0JBQVFDLEdBQVIsQ0FBWSxVQUFVckIsRUFBRSxJQUFGLEVBQVFzQixJQUFSLENBQWEsS0FBYixDQUF0QjtBQUNBRix3QkFBUUMsR0FBUixDQUFZLGFBQWFyQixFQUFFLElBQUYsRUFBUXNCLElBQVIsQ0FBYSxNQUFiLENBQXpCO0FBQ0gsYUFMRDtBQU1IOztBQTFDTyxLQUFaOztBQStDQW5CLFVBQU1HLElBQU47QUFFSCxDQW5ERCxFIiwiZmlsZSI6ImpzL3NlYXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvc2VhdHMuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzdjN2UwMWExNTdmYjFjOTBmYTkiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNlYXRzID0ge1xyXG5cclxuICAgICAgICByb3dfbnVtYmVyOiAxMCxcclxuICAgICAgICBzZWF0c19udW1iZXI6IDEwLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEb20oKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmJvb2tBU2VhdCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgY2FjaGVEb206IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lciA9ICQoJy5zZWF0c19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHJvdyA9ICQoJzxkaXYgY2xhc3M9XCJzZWF0c19fcm93XCI+PC9kaXY+Jyk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuJHNlYXQgPSAkKCcuc2VhdHNfX3NlYXQnKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd19udW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9ICQoJzx1bC8+JywgeydjbGFzcyc6ICdzZWF0c19fcm93J30pO1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zZWF0c19udW1iZXI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmQoJCgnPGxpLz4nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhdHNfX3NlYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yb3cnOiBpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc2VhdCc6IGogKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSkuYXBwZW5kKGogKyAxKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lci5hcHBlbmQocm93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJvb2tBU2VhdDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCgnLnNlYXRzX19zZWF0JykuZGVsZWdhdGUodGhpcy4kc2VhdHNfX2NvbnRhaW5lciwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICR0aGlzLnRvZ2dsZUNsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicnrEhWQgXCIgKyAkKHRoaXMpLmRhdGEoJ3JvdycpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWllanNjZSBcIiArICQodGhpcykuZGF0YSgnc2VhdCcpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNlYXRzLmluaXQoKTtcclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9zZWF0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=