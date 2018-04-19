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

        reserved_seats: [],

        init: function init() {
            this.cacheDom();
            this.renderSeats();
            this.bindEvents();
        },

        cacheDom: function cacheDom() {

            this.$seats__container = $('.seats__container');
            this.$seat = this.$seats__container.find('.seats__seat');
            this.$form = $('#reservation__form');
            this.$btn = this.$form.find('button');
        },

        bindEvents: function bindEvents() {
            this.$seats__container.delegate(this.$seat, 'click', this.bookASeat.bind(this));
            this.$btn.click(this.sendData.bind(this));
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

        bookASeat: function bookASeat(e) {

            var $seat = $(e.target),
                row_number = $seat.data('row'),
                seat_number = $seat.data('seat');

            if (!$seat.hasClass('seats__seat-active')) {
                $seat.addClass('seats__seat-active');
                this.reserved_seats.push({
                    'row': row_number,
                    'seat': seat_number
                });
            } else {

                $.each(this.reserved_seats, $.proxy(function (index, value) {
                    if (value.row == row_number && value.seat == seat_number) {
                        this.reserved_seats.splice(index, 1);
                        return false;
                    }
                }, this));

                $seat.removeClass('seats__seat-active');
            }
        },

        sendData: function sendData(e) {
            e.preventDefault();
            var seats = this.reserved_seats;

            $.ajax({

                url: this.$form.attr('action'),
                data: { seats: seats }

            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();
            });
        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDFiNjdmY2Q3OGFiYmQ4ZjI1MGEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwic2VhdHNfbnVtYmVyIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJpIiwicm93IiwiaiIsImFwcGVuZCIsImNsYXNzIiwiZSIsInRhcmdldCIsImRhdGEiLCJzZWF0X251bWJlciIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJwdXNoIiwiZWFjaCIsInByb3h5IiwiaW5kZXgiLCJ2YWx1ZSIsInNlYXQiLCJzcGxpY2UiLCJyZW1vdmVDbGFzcyIsInByZXZlbnREZWZhdWx0IiwiYWpheCIsInVybCIsImF0dHIiLCJkb25lIiwiaHRtbCIsImluZm8iLCJmYWRlSW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztB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QUFGO0FBQ0EsZ0JBQUlyQyxRQUFRLEtBQUtHLGNBQWpCOztBQUVBTixjQUFFeUMsSUFBRixDQUFPOztBQUVIQyxxQkFBSyxLQUFLNUIsS0FBTCxDQUFXNkIsSUFBWCxDQUFnQixRQUFoQixDQUZGO0FBR0hmLHNCQUFNLEVBQUN6QixPQUFPQSxLQUFSOztBQUhILGFBQVAsRUFLR3lDLElBTEgsQ0FLUSxVQUFVaEIsSUFBVixFQUFnQjs7QUFFcEI1QixrQkFBRSxnQkFBRixFQUFvQjZDLElBQXBCLENBQXlCakIsS0FBS2tCLElBQTlCO0FBQ0E5QyxrQkFBRSxPQUFGLEVBQVcrQyxNQUFYO0FBRUgsYUFWRDtBQVlIOztBQXRGTyxLQUFaOztBQTJGQTVDLFVBQU1JLElBQU47QUFFSCxDQS9GRCxFIiwiZmlsZSI6ImpzL3NlYXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvc2VhdHMuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDFiNjdmY2Q3OGFiYmQ4ZjI1MGEiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNlYXRzID0ge1xyXG5cclxuICAgICAgICByb3dfbnVtYmVyOiAxMCxcclxuICAgICAgICBzZWF0c19udW1iZXI6IDEwLFxyXG5cclxuICAgICAgICByZXNlcnZlZF9zZWF0czogW10sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURvbSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclNlYXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhY2hlRG9tOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyID0gJCgnLnNlYXRzX19jb250YWluZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kc2VhdCA9IHRoaXMuJHNlYXRzX19jb250YWluZXIuZmluZCgnLnNlYXRzX19zZWF0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSAkKCcjcmVzZXJ2YXRpb25fX2Zvcm0nKTtcclxuICAgICAgICAgICAgdGhpcy4kYnRuID0gdGhpcy4kZm9ybS5maW5kKCdidXR0b24nKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXRzX19jb250YWluZXIuZGVsZWdhdGUodGhpcy4kc2VhdCwgJ2NsaWNrJywgdGhpcy5ib29rQVNlYXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0bi5jbGljayh0aGlzLnNlbmREYXRhLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlclNlYXRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93X251bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gJCgnPHVsLz4nLCB7J2NsYXNzJzogJ3NlYXRzX19yb3cnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNlYXRzX251bWJlcjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZCgkKCc8bGkvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJvdyc6IGkgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1zZWF0JzogaiArIDFcclxuICAgICAgICAgICAgICAgICAgICB9KS5hcHBlbmQoaiArIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYm9va0FTZWF0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRzZWF0ID0gKCQoZS50YXJnZXQpKSxcclxuICAgICAgICAgICAgICAgIHJvd19udW1iZXIgPSAkc2VhdC5kYXRhKCdyb3cnKSxcclxuICAgICAgICAgICAgICAgIHNlYXRfbnVtYmVyID0gJHNlYXQuZGF0YSgnc2VhdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCEkc2VhdC5oYXNDbGFzcygnc2VhdHNfX3NlYXQtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICRzZWF0LmFkZENsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3Jvdyc6IHJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3NlYXQnOiBzZWF0X251bWJlclxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMucmVzZXJ2ZWRfc2VhdHMsICQucHJveHkoZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5yb3cgPT0gcm93X251bWJlciAmJiB2YWx1ZS5zZWF0ID09IHNlYXRfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2VhdC5yZW1vdmVDbGFzcygnc2VhdHNfX3NlYXQtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmREYXRhOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciBzZWF0cyA9IHRoaXMucmVzZXJ2ZWRfc2VhdHM7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy4kZm9ybS5hdHRyKCdhY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtzZWF0czogc2VhdHN9XHJcblxyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLmFsZXJ0LXN1Y2Nlc3MnKS5odG1sKGRhdGEuaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuaGlkZScpLmZhZGVJbigpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzZWF0cy5pbml0KCk7XHJcblxyXG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hc3NldHMvanMvc2VhdHMuanMiXSwic291cmNlUm9vdCI6IiJ9