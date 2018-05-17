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

        row_number: $('#rows_number').val(),
        seats_number: $('#seats_number').val(),
        reserved_seats: [],
        // currently_booked_seats: [
        //     {'row': 3, 'seat': 5}
        // ],
        // currently_booked_seats: this.getReservations,

        init: function init() {
            this.cacheDom();
            // this.getReservations();
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

            var row_number = this.row_number,
                seats_number = this.seats_number,
                seats_container = this.$seats__container,
                reservations = this.getReservations();

            $(document).ajaxComplete(function (data) {
                var currently_booked_seats = reservations.responseJSON.current_reservations;

                console.log(currently_booked_seats);
                for (var i = 0; i < row_number; i++) {
                    var row = $('<ul/>', { 'class': 'seats__row' });
                    for (var j = 0; j < seats_number; j++) {

                        for (var k = 0; k < currently_booked_seats.length; k++) {

                            if (j == currently_booked_seats[k].seat - 1 && i == currently_booked_seats[k].row - 1) {
                                row.append($('<li/>', {
                                    class: 'seats__seat seats__seat-active disabled',
                                    'data-row': i + 1,
                                    'data-seat': j + 1
                                }).append(j + 1));
                            } else {
                                row.append($('<li/>', {
                                    class: 'seats__seat',
                                    'data-row': i + 1,
                                    'data-seat': j + 1
                                }).append(j + 1));
                            }
                        }
                    }

                    seats_container.append(row);
                }
            });
        },

        bookASeat: function bookASeat(e) {

            var $seat = $(e.target),
                row_number = $seat.data('row'),
                seat_number = $seat.data('seat');

            if (e.target.parentNode.parentNode === e.delegateTarget) {

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
            }
        },

        sendData: function sendData(e) {
            e.preventDefault();
            var reserved_seats = this.reserved_seats;
            // console.log(reserved_seats);
            $.ajax({

                url: this.$form.attr('action'),
                data: { seats: reserved_seats },
                type: 'post'

            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();
            });
        },

        getReservations: function getReservations() {
            var url = $('#reservation_url').val();

            var result = $.ajax({
                dataType: 'json',
                url: url,
                type: 'POST'
            });

            return result;
        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTIyMWQ3YmE3ODIzOWU1ZTExMzgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwidmFsIiwic2VhdHNfbnVtYmVyIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJzZWF0c19jb250YWluZXIiLCJyZXNlcnZhdGlvbnMiLCJnZXRSZXNlcnZhdGlvbnMiLCJhamF4Q29tcGxldGUiLCJkYXRhIiwiY3VycmVudGx5X2Jvb2tlZF9zZWF0cyIsInJlc3BvbnNlSlNPTiIsImN1cnJlbnRfcmVzZXJ2YXRpb25zIiwiY29uc29sZSIsImxvZyIsImkiLCJyb3ciLCJqIiwiayIsImxlbmd0aCIsInNlYXQiLCJhcHBlbmQiLCJjbGFzcyIsImUiLCJ0YXJnZXQiLCJzZWF0X251bWJlciIsInBhcmVudE5vZGUiLCJkZWxlZ2F0ZVRhcmdldCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJwdXNoIiwiZWFjaCIsInByb3h5IiwiaW5kZXgiLCJ2YWx1ZSIsInNwbGljZSIsInJlbW92ZUNsYXNzIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidXJsIiwiYXR0ciIsInR5cGUiLCJkb25lIiwiaHRtbCIsImluZm8iLCJmYWRlSW4iLCJyZXN1bHQiLCJkYXRhVHlwZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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LFdBQU4sQ0FBa0Isb0JBQWxCO0FBRUg7QUFDSjtBQUVKLFNBcEdPOztBQXNHUmhDLGtCQUFVLGtCQUFVbUIsQ0FBVixFQUFhO0FBQ25CQSxjQUFFYyxjQUFGO0FBQ0EsZ0JBQUkvQyxpQkFBaUIsS0FBS0EsY0FBMUI7QUFDQTtBQUNBUCxjQUFFdUQsSUFBRixDQUFPOztBQUVIQyxxQkFBSyxLQUFLekMsS0FBTCxDQUFXMEMsSUFBWCxDQUFnQixRQUFoQixDQUZGO0FBR0gvQixzQkFBTSxFQUFDdkIsT0FBT0ksY0FBUixFQUhIO0FBSUhtRCxzQkFBTTs7QUFKSCxhQUFQLEVBT0dDLElBUEgsQ0FPUSxVQUFVakMsSUFBVixFQUFnQjs7QUFFcEIxQixrQkFBRSxnQkFBRixFQUFvQjRELElBQXBCLENBQXlCbEMsS0FBS21DLElBQTlCO0FBQ0E3RCxrQkFBRSxPQUFGLEVBQVc4RCxNQUFYO0FBRUgsYUFaRDtBQWNILFNBeEhPOztBQTBIUnRDLHlCQUFpQiwyQkFBWTtBQUN6QixnQkFBSWdDLE1BQU14RCxFQUFFLGtCQUFGLEVBQXNCSyxHQUF0QixFQUFWOztBQUVBLGdCQUFJMEQsU0FBUy9ELEVBQUV1RCxJQUFGLENBQU87QUFDaEJTLDBCQUFVLE1BRE07QUFFaEJSLHFCQUFLQSxHQUZXO0FBR2hCRSxzQkFBTTtBQUhVLGFBQVAsQ0FBYjs7QUFNQSxtQkFBT0ssTUFBUDtBQUVIOztBQXJJTyxLQUFaOztBQXlJQTVELFVBQU1LLElBQU47QUFFSCxDQTdJRCxFIiwiZmlsZSI6ImpzL3NlYXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvc2VhdHMuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTIyMWQ3YmE3ODIzOWU1ZTExMzgiLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNlYXRzID0ge1xyXG5cclxuICAgICAgICByb3dfbnVtYmVyOiAkKCcjcm93c19udW1iZXInKS52YWwoKSxcclxuICAgICAgICBzZWF0c19udW1iZXI6ICQoJyNzZWF0c19udW1iZXInKS52YWwoKSxcclxuICAgICAgICByZXNlcnZlZF9zZWF0czogW10sXHJcbiAgICAgICAgLy8gY3VycmVudGx5X2Jvb2tlZF9zZWF0czogW1xyXG4gICAgICAgIC8vICAgICB7J3Jvdyc6IDMsICdzZWF0JzogNX1cclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIC8vIGN1cnJlbnRseV9ib29rZWRfc2VhdHM6IHRoaXMuZ2V0UmVzZXJ2YXRpb25zLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEb20oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5nZXRSZXNlcnZhdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYWNoZURvbTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lciA9ICQoJy5zZWF0c19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXQgPSB0aGlzLiRzZWF0c19fY29udGFpbmVyLmZpbmQoJy5zZWF0c19fc2VhdCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJCgnI3Jlc2VydmF0aW9uX19mb3JtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJGZvcm0uZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmRlbGVnYXRlKHRoaXMuJHNlYXQsICdjbGljaycsIHRoaXMuYm9va0FTZWF0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLiRidG4uY2xpY2sodGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvd19udW1iZXIgPSB0aGlzLnJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzZWF0c19udW1iZXIgPSB0aGlzLnNlYXRzX251bWJlcixcclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lciA9IHRoaXMuJHNlYXRzX19jb250YWluZXIsXHJcbiAgICAgICAgICAgICAgICByZXNlcnZhdGlvbnMgPSB0aGlzLmdldFJlc2VydmF0aW9ucygpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmFqYXhDb21wbGV0ZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRseV9ib29rZWRfc2VhdHMgPSByZXNlcnZhdGlvbnMucmVzcG9uc2VKU09OLmN1cnJlbnRfcmVzZXJ2YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRseV9ib29rZWRfc2VhdHMpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dfbnVtYmVyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJCgnPHVsLz4nLCB7J2NsYXNzJzogJ3NlYXRzX19yb3cnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWF0c19udW1iZXI7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjdXJyZW50bHlfYm9va2VkX3NlYXRzLmxlbmd0aDsgaysrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGogPT0gKGN1cnJlbnRseV9ib29rZWRfc2VhdHNba10uc2VhdCAtIDEpICYmIGkgPT0gY3VycmVudGx5X2Jvb2tlZF9zZWF0c1trXS5yb3cgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZCgkKCc8bGkvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCBzZWF0c19fc2VhdC1hY3RpdmUgZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yb3cnOiBpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc2VhdCc6IGogKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYXBwZW5kKGogKyAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kKCQoJzxsaS8+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXRzX19zZWF0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcm93JzogaSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXNlYXQnOiBqICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFwcGVuZChqICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdHNfY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYm9va0FTZWF0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRzZWF0ID0gKCQoZS50YXJnZXQpKSxcclxuICAgICAgICAgICAgICAgIHJvd19udW1iZXIgPSAkc2VhdC5kYXRhKCdyb3cnKSxcclxuICAgICAgICAgICAgICAgIHNlYXRfbnVtYmVyID0gJHNlYXQuZGF0YSgnc2VhdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJHNlYXQuaGFzQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlYXQuYWRkQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdyb3cnOiByb3dfbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VhdCc6IHNlYXRfbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5yZXNlcnZlZF9zZWF0cywgJC5wcm94eShmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5yb3cgPT0gcm93X251bWJlciAmJiB2YWx1ZS5zZWF0ID09IHNlYXRfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWF0LnJlbW92ZUNsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZERhdGE6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIHJlc2VydmVkX3NlYXRzID0gdGhpcy5yZXNlcnZlZF9zZWF0cztcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzZXJ2ZWRfc2VhdHMpO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG5cclxuICAgICAgICAgICAgICAgIHVybDogdGhpcy4kZm9ybS5hdHRyKCdhY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtzZWF0czogcmVzZXJ2ZWRfc2VhdHN9LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnXHJcblxyXG5cclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQoJy5hbGVydC1zdWNjZXNzJykuaHRtbChkYXRhLmluZm8pO1xyXG4gICAgICAgICAgICAgICAgJCgnLmhpZGUnKS5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNlcnZhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9ICQoJyNyZXNlcnZhdGlvbl91cmwnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VhdHMuaW5pdCgpO1xyXG5cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==