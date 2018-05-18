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

            var row_number = this.row_number,
                seats_number = this.seats_number,
                seats_container = this.$seats__container,
                reservations = this.getReservations();

            $(document).ajaxComplete(function (data) {
                var currently_booked_seats = reservations.responseJSON.current_reservations;

                for (var i = 0; i < row_number; i++) {
                    var row = $('<ul/>', { 'class': 'seats__row' });
                    for (var j = 0; j < seats_number; j++) {

                        row.append($('<li/>', {
                            class: 'seats__seat',
                            'data-row': i + 1,
                            'data-seat': j + 1
                        }).append(j + 1));

                        for (var k = 0; k < currently_booked_seats.length; k++) {

                            if (j == currently_booked_seats[k].seat - 1 && i == currently_booked_seats[k].row - 1) {
                                row[0].children[j].classList.add('seats__seat-active', 'disabled');
                            }
                        }
                    }
                    seats_container.append(row);
                }
            });

            $(document).ajaxStop(function () {
                $(document).unbind('ajaxComplete');
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

            $.ajax({

                url: this.$form.attr('action'),
                data: { seats: reserved_seats },
                type: 'post'

            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();
            });
            this.reserved_seats = [];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWVjZWQxOWE1Zjc2NGU5Yzc4MjYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwidmFsIiwic2VhdHNfbnVtYmVyIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJzZWF0c19jb250YWluZXIiLCJyZXNlcnZhdGlvbnMiLCJnZXRSZXNlcnZhdGlvbnMiLCJhamF4Q29tcGxldGUiLCJkYXRhIiwiY3VycmVudGx5X2Jvb2tlZF9zZWF0cyIsInJlc3BvbnNlSlNPTiIsImN1cnJlbnRfcmVzZXJ2YXRpb25zIiwiaSIsInJvdyIsImoiLCJhcHBlbmQiLCJjbGFzcyIsImsiLCJsZW5ndGgiLCJzZWF0IiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJhamF4U3RvcCIsInVuYmluZCIsImUiLCJ0YXJnZXQiLCJzZWF0X251bWJlciIsInBhcmVudE5vZGUiLCJkZWxlZ2F0ZVRhcmdldCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJwdXNoIiwiZWFjaCIsInByb3h5IiwiaW5kZXgiLCJ2YWx1ZSIsInNwbGljZSIsInJlbW92ZUNsYXNzIiwicHJldmVudERlZmF1bHQiLCJhamF4IiwidXJsIiwiYXR0ciIsInR5cGUiLCJkb25lIiwiaHRtbCIsImluZm8iLCJmYWRlSW4iLCJyZXN1bHQiLCJkYXRhVHlwZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBQSxFQUFFQyxRQUFGLEVBQVlDLEtBQVosQ0FBa0IsWUFBWTs7QUFFMUIsUUFBSUMsUUFBUTs7QUFFUkMsb0JBQVlKLEVBQUUsY0FBRixFQUFrQkssR0FBbEIsRUFGSjtBQUdSQyxzQkFBY04sRUFBRSxlQUFGLEVBQW1CSyxHQUFuQixFQUhOO0FBSVJFLHdCQUFnQixFQUpSOztBQU1SQyxjQUFNLGdCQUFZO0FBQ2QsaUJBQUtDLFFBQUw7QUFDQSxpQkFBS0MsV0FBTDtBQUNBLGlCQUFLQyxVQUFMO0FBQ0gsU0FWTzs7QUFZUkYsa0JBQVUsb0JBQVk7O0FBRWxCLGlCQUFLRyxpQkFBTCxHQUF5QlosRUFBRSxtQkFBRixDQUF6QjtBQUNBLGlCQUFLYSxLQUFMLEdBQWEsS0FBS0QsaUJBQUwsQ0FBdUJFLElBQXZCLENBQTRCLGNBQTVCLENBQWI7QUFDQSxpQkFBS0MsS0FBTCxHQUFhZixFQUFFLG9CQUFGLENBQWI7QUFDQSxpQkFBS2dCLElBQUwsR0FBWSxLQUFLRCxLQUFMLENBQVdELElBQVgsQ0FBZ0IsUUFBaEIsQ0FBWjtBQUNILFNBbEJPOztBQW9CUkgsb0JBQVksc0JBQVk7QUFDcEIsaUJBQUtDLGlCQUFMLENBQXVCSyxRQUF2QixDQUFnQyxLQUFLSixLQUFyQyxFQUE0QyxPQUE1QyxFQUFxRCxLQUFLSyxTQUFMLENBQWVDLElBQWYsQ0FBb0IsSUFBcEIsQ0FBckQ7QUFDQSxpQkFBS0gsSUFBTCxDQUFVSSxLQUFWLENBQWdCLEtBQUtDLFFBQUwsQ0FBY0YsSUFBZCxDQUFtQixJQUFuQixDQUFoQjtBQUNILFNBdkJPOztBQXlCUlQscUJBQWEsdUJBQVk7O0FBRXJCLGdCQUFJTixhQUFhLEtBQUtBLFVBQXRCO0FBQUEsZ0JBQ0lFLGVBQWUsS0FBS0EsWUFEeEI7QUFBQSxnQkFFSWdCLGtCQUFrQixLQUFLVixpQkFGM0I7QUFBQSxnQkFHSVcsZUFBZSxLQUFLQyxlQUFMLEVBSG5COztBQUtBeEIsY0FBRUMsUUFBRixFQUFZd0IsWUFBWixDQUF5QixVQUFVQyxJQUFWLEVBQWdCO0FBQ3JDLG9CQUFJQyx5QkFBeUJKLGFBQWFLLFlBQWIsQ0FBMEJDLG9CQUF2RDs7QUFFQSxxQkFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUkxQixVQUFwQixFQUFnQzBCLEdBQWhDLEVBQXFDO0FBQ2pDLHdCQUFJQyxNQUFNL0IsRUFBRSxPQUFGLEVBQVcsRUFBQyxTQUFTLFlBQVYsRUFBWCxDQUFWO0FBQ0EseUJBQUssSUFBSWdDLElBQUksQ0FBYixFQUFnQkEsSUFBSTFCLFlBQXBCLEVBQWtDMEIsR0FBbEMsRUFBdUM7O0FBRW5DRCw0QkFBSUUsTUFBSixDQUFXakMsRUFBRSxPQUFGLEVBQVc7QUFDbEJrQyxtQ0FBTyxhQURXO0FBRWxCLHdDQUFZSixJQUFJLENBRkU7QUFHbEIseUNBQWFFLElBQUk7QUFIQyx5QkFBWCxFQUlSQyxNQUpRLENBSURELElBQUksQ0FKSCxDQUFYOztBQU1BLDZCQUFLLElBQUlHLElBQUksQ0FBYixFQUFnQkEsSUFBSVIsdUJBQXVCUyxNQUEzQyxFQUFtREQsR0FBbkQsRUFBd0Q7O0FBRXBELGdDQUFJSCxLQUFNTCx1QkFBdUJRLENBQXZCLEVBQTBCRSxJQUExQixHQUFpQyxDQUF2QyxJQUE2Q1AsS0FBS0gsdUJBQXVCUSxDQUF2QixFQUEwQkosR0FBMUIsR0FBZ0MsQ0FBdEYsRUFBeUY7QUFDckZBLG9DQUFJLENBQUosRUFBT08sUUFBUCxDQUFnQk4sQ0FBaEIsRUFBbUJPLFNBQW5CLENBQTZCQyxHQUE3QixDQUFpQyxvQkFBakMsRUFBdUQsVUFBdkQ7QUFDSDtBQUVKO0FBRUo7QUFDRGxCLG9DQUFnQlcsTUFBaEIsQ0FBdUJGLEdBQXZCO0FBQ0g7QUFFSixhQXpCRDs7QUEyQkEvQixjQUFFQyxRQUFGLEVBQVl3QyxRQUFaLENBQXFCLFlBQVk7QUFDN0J6QyxrQkFBRUMsUUFBRixFQUFZeUMsTUFBWixDQUFtQixjQUFuQjtBQUNILGFBRkQ7QUFJSCxTQS9ETzs7QUFpRVJ4QixtQkFBVyxtQkFBVXlCLENBQVYsRUFBYTs7QUFFcEIsZ0JBQUk5QixRQUFTYixFQUFFMkMsRUFBRUMsTUFBSixDQUFiO0FBQUEsZ0JBQ0l4QyxhQUFhUyxNQUFNYSxJQUFOLENBQVcsS0FBWCxDQURqQjtBQUFBLGdCQUVJbUIsY0FBY2hDLE1BQU1hLElBQU4sQ0FBVyxNQUFYLENBRmxCOztBQUlBLGdCQUFJaUIsRUFBRUMsTUFBRixDQUFTRSxVQUFULENBQW9CQSxVQUFwQixLQUFtQ0gsRUFBRUksY0FBekMsRUFBeUQ7O0FBRXJELG9CQUFJLENBQUNsQyxNQUFNbUMsUUFBTixDQUFlLG9CQUFmLENBQUwsRUFBMkM7QUFDdkNuQywwQkFBTW9DLFFBQU4sQ0FBZSxvQkFBZjtBQUNBLHlCQUFLMUMsY0FBTCxDQUFvQjJDLElBQXBCLENBQXlCO0FBQ3JCLCtCQUFPOUMsVUFEYztBQUVyQixnQ0FBUXlDO0FBRmEscUJBQXpCO0FBSUgsaUJBTkQsTUFNTzs7QUFFSDdDLHNCQUFFbUQsSUFBRixDQUFPLEtBQUs1QyxjQUFaLEVBQTRCUCxFQUFFb0QsS0FBRixDQUFRLFVBQVVDLEtBQVYsRUFBaUJDLEtBQWpCLEVBQXdCO0FBQ3hELDRCQUFJQSxNQUFNdkIsR0FBTixJQUFhM0IsVUFBYixJQUEyQmtELE1BQU1qQixJQUFOLElBQWNRLFdBQTdDLEVBQTBEO0FBQ3RELGlDQUFLdEMsY0FBTCxDQUFvQmdELE1BQXBCLENBQTJCRixLQUEzQixFQUFrQyxDQUFsQztBQUNBLG1DQUFPLEtBQVA7QUFDSDtBQUNKLHFCQUwyQixFQUt6QixJQUx5QixDQUE1Qjs7QUFPQXhDLDBCQUFNMkMsV0FBTixDQUFrQixvQkFBbEI7QUFFSDtBQUNKO0FBRUosU0E3Rk87O0FBK0ZSbkMsa0JBQVUsa0JBQVVzQixDQUFWLEVBQWE7QUFDbkJBLGNBQUVjLGNBQUY7QUFDQSxnQkFBSWxELGlCQUFpQixLQUFLQSxjQUExQjs7QUFFQVAsY0FBRTBELElBQUYsQ0FBTzs7QUFFSEMscUJBQUssS0FBSzVDLEtBQUwsQ0FBVzZDLElBQVgsQ0FBZ0IsUUFBaEIsQ0FGRjtBQUdIbEMsc0JBQU0sRUFBQ3ZCLE9BQU9JLGNBQVIsRUFISDtBQUlIc0Qsc0JBQU07O0FBSkgsYUFBUCxFQU9HQyxJQVBILENBT1EsVUFBVXBDLElBQVYsRUFBZ0I7O0FBRXBCMUIsa0JBQUUsZ0JBQUYsRUFBb0IrRCxJQUFwQixDQUF5QnJDLEtBQUtzQyxJQUE5QjtBQUNBaEUsa0JBQUUsT0FBRixFQUFXaUUsTUFBWDtBQUVILGFBWkQ7QUFhQSxpQkFBSzFELGNBQUwsR0FBc0IsRUFBdEI7QUFFSCxTQWxITzs7QUFvSFJpQix5QkFBaUIsMkJBQVk7QUFDekIsZ0JBQUltQyxNQUFNM0QsRUFBRSxrQkFBRixFQUFzQkssR0FBdEIsRUFBVjs7QUFFQSxnQkFBSTZELFNBQVNsRSxFQUFFMEQsSUFBRixDQUFPO0FBQ2hCUywwQkFBVSxNQURNO0FBRWhCUixxQkFBS0EsR0FGVztBQUdoQkUsc0JBQU07QUFIVSxhQUFQLENBQWI7O0FBTUEsbUJBQU9LLE1BQVA7QUFFSDs7QUEvSE8sS0FBWjs7QUFtSUEvRCxVQUFNSyxJQUFOO0FBRUgsQ0F2SUQsRSIsImZpbGUiOiJqcy9zZWF0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL3NlYXRzLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGFlY2VkMTlhNWY3NjRlOWM3ODI2IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzZWF0cyA9IHtcclxuXHJcbiAgICAgICAgcm93X251bWJlcjogJCgnI3Jvd3NfbnVtYmVyJykudmFsKCksXHJcbiAgICAgICAgc2VhdHNfbnVtYmVyOiAkKCcjc2VhdHNfbnVtYmVyJykudmFsKCksXHJcbiAgICAgICAgcmVzZXJ2ZWRfc2VhdHM6IFtdLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEb20oKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYWNoZURvbTogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lciA9ICQoJy5zZWF0c19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXQgPSB0aGlzLiRzZWF0c19fY29udGFpbmVyLmZpbmQoJy5zZWF0c19fc2VhdCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJCgnI3Jlc2VydmF0aW9uX19mb3JtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJGZvcm0uZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmRlbGVnYXRlKHRoaXMuJHNlYXQsICdjbGljaycsIHRoaXMuYm9va0FTZWF0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLiRidG4uY2xpY2sodGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvd19udW1iZXIgPSB0aGlzLnJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzZWF0c19udW1iZXIgPSB0aGlzLnNlYXRzX251bWJlcixcclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lciA9IHRoaXMuJHNlYXRzX19jb250YWluZXIsXHJcbiAgICAgICAgICAgICAgICByZXNlcnZhdGlvbnMgPSB0aGlzLmdldFJlc2VydmF0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgJChkb2N1bWVudCkuYWpheENvbXBsZXRlKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudGx5X2Jvb2tlZF9zZWF0cyA9IHJlc2VydmF0aW9ucy5yZXNwb25zZUpTT04uY3VycmVudF9yZXNlcnZhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dfbnVtYmVyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gJCgnPHVsLz4nLCB7J2NsYXNzJzogJ3NlYXRzX19yb3cnfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzZWF0c19udW1iZXI7IGorKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZCgkKCc8bGkvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiAnc2VhdHNfX3NlYXQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtcm93JzogaSArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1zZWF0JzogaiArIDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuYXBwZW5kKGogKyAxKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGN1cnJlbnRseV9ib29rZWRfc2VhdHMubGVuZ3RoOyBrKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PSAoY3VycmVudGx5X2Jvb2tlZF9zZWF0c1trXS5zZWF0IC0gMSkgJiYgaSA9PSBjdXJyZW50bHlfYm9va2VkX3NlYXRzW2tdLnJvdyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dbMF0uY2hpbGRyZW5bal0uY2xhc3NMaXN0LmFkZCgnc2VhdHNfX3NlYXQtYWN0aXZlJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWF0c19jb250YWluZXIuYXBwZW5kKHJvdyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLmFqYXhTdG9wKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnVuYmluZCgnYWpheENvbXBsZXRlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBib29rQVNlYXQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgJHNlYXQgPSAoJChlLnRhcmdldCkpLFxyXG4gICAgICAgICAgICAgICAgcm93X251bWJlciA9ICRzZWF0LmRhdGEoJ3JvdycpLFxyXG4gICAgICAgICAgICAgICAgc2VhdF9udW1iZXIgPSAkc2VhdC5kYXRhKCdzZWF0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlID09PSBlLmRlbGVnYXRlVGFyZ2V0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCEkc2VhdC5oYXNDbGFzcygnc2VhdHNfX3NlYXQtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2VhdC5hZGRDbGFzcygnc2VhdHNfX3NlYXQtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNlcnZlZF9zZWF0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Jvdyc6IHJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWF0Jzogc2VhdF9udW1iZXJcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaCh0aGlzLnJlc2VydmVkX3NlYXRzLCAkLnByb3h5KGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnJvdyA9PSByb3dfbnVtYmVyICYmIHZhbHVlLnNlYXQgPT0gc2VhdF9udW1iZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHNlYXQucmVtb3ZlQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzZW5kRGF0YTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgcmVzZXJ2ZWRfc2VhdHMgPSB0aGlzLnJlc2VydmVkX3NlYXRzO1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuJGZvcm0uYXR0cignYWN0aW9uJyksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7c2VhdHM6IHJlc2VydmVkX3NlYXRzfSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0J1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYWxlcnQtc3VjY2VzcycpLmh0bWwoZGF0YS5pbmZvKTtcclxuICAgICAgICAgICAgICAgICQoJy5oaWRlJykuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5yZXNlcnZlZF9zZWF0cyA9IFtdO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRSZXNlcnZhdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHVybCA9ICQoJyNyZXNlcnZhdGlvbl91cmwnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VhdHMuaW5pdCgpO1xyXG5cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==