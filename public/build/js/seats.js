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
            // console.log(this.currently_booked_seats);
            var row_number = this.row_number,
                seats_number = this.seats_number,
                seats_container = this.$seats__container,
                reservations = this.getReservations();

            $(document).ajaxComplete(function (data) {
                var currently_booked_seats = JSON.parse(reservations.responseJSON);
                // var currently_booked_seats = $.parseJSON(JSON.stringify(reservations));
                // console.log(currently_booked_seats);
                // console.log(row_number);
                console.log(currently_booked_seats);
                for (var i = 0; i < row_number; i++) {
                    var row = $('<ul/>', { 'class': 'seats__row' });
                    for (var j = 0; j < seats_number; j++) {

                        for (var k = 0; k < currently_booked_seats.length; k++) {

                            // if (j == (currently_booked_seats[k].seat - 1) && i == currently_booked_seats[k].row - 1) {
                            row.append($('<li/>', {
                                class: 'seats__seat seats__seat-active disabled',
                                'data-row': i + 1,
                                'data-seat': j + 1
                            }).append(j + 1));

                            // } else {
                            row.append($('<li/>', {
                                class: 'seats__seat',
                                'data-row': i + 1,
                                'data-seat': j + 1
                            }).append(j + 1));
                            // }
                        }
                    }

                    seats_container.append(row);
                }
                console.log('tu');
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
            console.log(reserved_seats);
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
            var url = $('#reservation_url').val(),
                renderSeats = this.renderSeats,
                tmp = null;
            //
            // $.ajax({
            //     url: url,
            //     type: 'post'
            // }).promise().done(function (data) {
            //     // this.currently_booked_seats = data.current_reservations;
            //     tmp = data.current_reservations;
            //     // console.log(tmp);
            // });
            // // console.log(tmp);

            var result = $.ajax({
                url: url,
                type: 'POST'
            });

            result.done(function (value) {
                // alert('success with result: ' + value);
                this.currently_booked_seats = value.current_reservations;
            });
            return result;
            // $(document).ajaxComplete(function (data) {
            // //     // console.log(data.result);
            // //     // this.currently_booked_seats = data.current_reservations;
            // //     // renderSeats();
            // //     // console.log(tmp);
            //     this.currently_booked_seats = tmp;
            // //     renderSeats();
            //     return tmp;
            //     return result;
            // });
            // $(document).ajaxComplete(function () {
            //     renderSeats();
            // });

        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDNlZDZkYjFhZDQ3OGU3OTU4MzciLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwidmFsIiwic2VhdHNfbnVtYmVyIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJzZWF0c19jb250YWluZXIiLCJyZXNlcnZhdGlvbnMiLCJnZXRSZXNlcnZhdGlvbnMiLCJhamF4Q29tcGxldGUiLCJkYXRhIiwiY3VycmVudGx5X2Jvb2tlZF9zZWF0cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlSlNPTiIsImNvbnNvbGUiLCJsb2ciLCJpIiwicm93IiwiaiIsImsiLCJsZW5ndGgiLCJhcHBlbmQiLCJjbGFzcyIsImUiLCJ0YXJnZXQiLCJzZWF0X251bWJlciIsInBhcmVudE5vZGUiLCJkZWxlZ2F0ZVRhcmdldCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJwdXNoIiwiZWFjaCIsInByb3h5IiwiaW5kZXgiLCJ2YWx1ZSIsInNlYXQiLCJzcGxpY2UiLCJyZW1vdmVDbGFzcyIsInByZXZlbnREZWZhdWx0IiwiYWpheCIsInVybCIsImF0dHIiLCJ0eXBlIiwiZG9uZSIsImh0bWwiLCJpbmZvIiwiZmFkZUluIiwidG1wIiwicmVzdWx0IiwiY3VycmVudF9yZXNlcnZhdGlvbnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNB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bnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2J1aWxkL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9hc3NldHMvanMvc2VhdHMuanNcIik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDNlZDZkYjFhZDQ3OGU3OTU4MzciLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIHNlYXRzID0ge1xyXG5cclxuICAgICAgICByb3dfbnVtYmVyOiAkKCcjcm93c19udW1iZXInKS52YWwoKSxcclxuICAgICAgICBzZWF0c19udW1iZXI6ICQoJyNzZWF0c19udW1iZXInKS52YWwoKSxcclxuICAgICAgICByZXNlcnZlZF9zZWF0czogW10sXHJcbiAgICAgICAgLy8gY3VycmVudGx5X2Jvb2tlZF9zZWF0czogW1xyXG4gICAgICAgIC8vICAgICB7J3Jvdyc6IDMsICdzZWF0JzogNX1cclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIC8vIGN1cnJlbnRseV9ib29rZWRfc2VhdHM6IHRoaXMuZ2V0UmVzZXJ2YXRpb25zLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEb20oKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5nZXRSZXNlcnZhdGlvbnMoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYWNoZURvbTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lciA9ICQoJy5zZWF0c19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXQgPSB0aGlzLiRzZWF0c19fY29udGFpbmVyLmZpbmQoJy5zZWF0c19fc2VhdCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJCgnI3Jlc2VydmF0aW9uX19mb3JtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJGZvcm0uZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmRlbGVnYXRlKHRoaXMuJHNlYXQsICdjbGljaycsIHRoaXMuYm9va0FTZWF0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLiRidG4uY2xpY2sodGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRseV9ib29rZWRfc2VhdHMpO1xyXG4gICAgICAgICAgICB2YXIgcm93X251bWJlciA9IHRoaXMucm93X251bWJlcixcclxuICAgICAgICAgICAgICAgIHNlYXRzX251bWJlciA9IHRoaXMuc2VhdHNfbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgc2VhdHNfY29udGFpbmVyID0gdGhpcy4kc2VhdHNfX2NvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgIHJlc2VydmF0aW9ucyA9IHRoaXMuZ2V0UmVzZXJ2YXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5hamF4Q29tcGxldGUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50bHlfYm9va2VkX3NlYXRzID0gSlNPTi5wYXJzZShyZXNlcnZhdGlvbnMucmVzcG9uc2VKU09OKTtcclxuICAgICAgICAgICAgICAgIC8vIHZhciBjdXJyZW50bHlfYm9va2VkX3NlYXRzID0gJC5wYXJzZUpTT04oSlNPTi5zdHJpbmdpZnkocmVzZXJ2YXRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhjdXJyZW50bHlfYm9va2VkX3NlYXRzKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJvd19udW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRseV9ib29rZWRfc2VhdHMpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dfbnVtYmVyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJCgnPHVsLz4nLCB7J2NsYXNzJzogJ3NlYXRzX19yb3cnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWF0c19udW1iZXI7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBjdXJyZW50bHlfYm9va2VkX3NlYXRzLmxlbmd0aDsgaysrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGogPT0gKGN1cnJlbnRseV9ib29rZWRfc2VhdHNba10uc2VhdCAtIDEpICYmIGkgPT0gY3VycmVudGx5X2Jvb2tlZF9zZWF0c1trXS5yb3cgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZCgkKCc8bGkvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCBzZWF0c19fc2VhdC1hY3RpdmUgZGlzYWJsZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yb3cnOiBpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc2VhdCc6IGogKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuYXBwZW5kKGogKyAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kKCQoJzxsaS8+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJ3NlYXRzX19zZWF0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcm93JzogaSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXNlYXQnOiBqICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmFwcGVuZChqICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhdHNfY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3R1Jyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGJvb2tBU2VhdDogZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciAkc2VhdCA9ICgkKGUudGFyZ2V0KSksXHJcbiAgICAgICAgICAgICAgICByb3dfbnVtYmVyID0gJHNlYXQuZGF0YSgncm93JyksXHJcbiAgICAgICAgICAgICAgICBzZWF0X251bWJlciA9ICRzZWF0LmRhdGEoJ3NlYXQnKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUgPT09IGUuZGVsZWdhdGVUYXJnZXQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoISRzZWF0Lmhhc0NsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRzZWF0LmFkZENsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAncm93Jzogcm93X251bWJlcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NlYXQnOiBzZWF0X251bWJlclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKHRoaXMucmVzZXJ2ZWRfc2VhdHMsICQucHJveHkoZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUucm93ID09IHJvd19udW1iZXIgJiYgdmFsdWUuc2VhdCA9PSBzZWF0X251bWJlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNlcnZlZF9zZWF0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcykpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkc2VhdC5yZW1vdmVDbGFzcygnc2VhdHNfX3NlYXQtYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNlbmREYXRhOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciByZXNlcnZlZF9zZWF0cyA9IHRoaXMucmVzZXJ2ZWRfc2VhdHM7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc2VydmVkX3NlYXRzKTtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuJGZvcm0uYXR0cignYWN0aW9uJyksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7c2VhdHM6IHJlc2VydmVkX3NlYXRzfSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0J1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYWxlcnQtc3VjY2VzcycpLmh0bWwoZGF0YS5pbmZvKTtcclxuICAgICAgICAgICAgICAgICQoJy5oaWRlJykuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0UmVzZXJ2YXRpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciB1cmwgPSAkKCcjcmVzZXJ2YXRpb25fdXJsJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICByZW5kZXJTZWF0cyA9IHRoaXMucmVuZGVyU2VhdHMsXHJcbiAgICAgICAgICAgICAgICB0bXAgPSBudWxsO1xyXG4gICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAvLyAkLmFqYXgoe1xyXG4gICAgICAgICAgICAvLyAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIC8vICAgICB0eXBlOiAncG9zdCdcclxuICAgICAgICAgICAgLy8gfSkucHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gICAgIC8vIHRoaXMuY3VycmVudGx5X2Jvb2tlZF9zZWF0cyA9IGRhdGEuY3VycmVudF9yZXNlcnZhdGlvbnM7XHJcbiAgICAgICAgICAgIC8vICAgICB0bXAgPSBkYXRhLmN1cnJlbnRfcmVzZXJ2YXRpb25zO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2codG1wKTtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vIC8vIGNvbnNvbGUubG9nKHRtcCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0LmRvbmUoZnVuY3Rpb24gKHZhbHVlKXtcclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KCdzdWNjZXNzIHdpdGggcmVzdWx0OiAnICsgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50bHlfYm9va2VkX3NlYXRzID0gdmFsdWUuY3VycmVudF9yZXNlcnZhdGlvbnM7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAvLyAkKGRvY3VtZW50KS5hamF4Q29tcGxldGUoZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gLy8gICAgIC8vIGNvbnNvbGUubG9nKGRhdGEucmVzdWx0KTtcclxuICAgICAgICAgICAgLy8gLy8gICAgIC8vIHRoaXMuY3VycmVudGx5X2Jvb2tlZF9zZWF0cyA9IGRhdGEuY3VycmVudF9yZXNlcnZhdGlvbnM7XHJcbiAgICAgICAgICAgIC8vIC8vICAgICAvLyByZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICAvLyAvLyAgICAgLy8gY29uc29sZS5sb2codG1wKTtcclxuICAgICAgICAgICAgLy8gICAgIHRoaXMuY3VycmVudGx5X2Jvb2tlZF9zZWF0cyA9IHRtcDtcclxuICAgICAgICAgICAgLy8gLy8gICAgIHJlbmRlclNlYXRzKCk7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gdG1wO1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgIC8vICQoZG9jdW1lbnQpLmFqYXhDb21wbGV0ZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VhdHMuaW5pdCgpO1xyXG5cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==