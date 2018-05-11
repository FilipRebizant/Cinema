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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2QzYWQ5OTczNGE4MTM0NzgxNmEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwic2VhdHNfbnVtYmVyIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJpIiwicm93IiwiaiIsImFwcGVuZCIsImNsYXNzIiwiZSIsInRhcmdldCIsImRhdGEiLCJzZWF0X251bWJlciIsInBhcmVudE5vZGUiLCJkZWxlZ2F0ZVRhcmdldCIsImhhc0NsYXNzIiwiYWRkQ2xhc3MiLCJwdXNoIiwiZWFjaCIsInByb3h5IiwiaW5kZXgiLCJ2YWx1ZSIsInNlYXQiLCJzcGxpY2UiLCJyZW1vdmVDbGFzcyIsInByZXZlbnREZWZhdWx0IiwiYWpheCIsInVybCIsImF0dHIiLCJkb25lIiwiaHRtbCIsImluZm8iLCJmYWRlSW4iXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJI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eUIsQ0FBNUI7O0FBT0F6QiwwQkFBTTZCLFdBQU4sQ0FBa0Isb0JBQWxCO0FBRUg7QUFDSjtBQUVKLFNBdEVPOztBQXdFUnJCLGtCQUFVLGtCQUFVTSxDQUFWLEVBQWE7QUFDbkJBLGNBQUVnQixjQUFGO0FBQ0EsZ0JBQUl2QyxRQUFRLEtBQUtHLGNBQWpCOztBQUVBTixjQUFFMkMsSUFBRixDQUFPOztBQUVIQyxxQkFBSyxLQUFLOUIsS0FBTCxDQUFXK0IsSUFBWCxDQUFnQixRQUFoQixDQUZGO0FBR0hqQixzQkFBTSxFQUFDekIsT0FBT0EsS0FBUjs7QUFISCxhQUFQLEVBS0cyQyxJQUxILENBS1EsVUFBVWxCLElBQVYsRUFBZ0I7O0FBRXBCNUIsa0JBQUUsZ0JBQUYsRUFBb0IrQyxJQUFwQixDQUF5Qm5CLEtBQUtvQixJQUE5QjtBQUNBaEQsa0JBQUUsT0FBRixFQUFXaUQsTUFBWDtBQUVILGFBVkQ7QUFZSDs7QUF4Rk8sS0FBWjs7QUE2RkE5QyxVQUFNSSxJQUFOO0FBRUgsQ0FqR0QsRSIsImZpbGUiOiJqcy9zZWF0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL3NlYXRzLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGNkM2FkOTk3MzRhODEzNDc4MTZhIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzZWF0cyA9IHtcclxuXHJcbiAgICAgICAgcm93X251bWJlcjogMTAsXHJcbiAgICAgICAgc2VhdHNfbnVtYmVyOiAxMCxcclxuICAgICAgICByZXNlcnZlZF9zZWF0czogW10sXHJcblxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWNoZURvbSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclNlYXRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNhY2hlRG9tOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyID0gJCgnLnNlYXRzX19jb250YWluZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kc2VhdCA9IHRoaXMuJHNlYXRzX19jb250YWluZXIuZmluZCgnLnNlYXRzX19zZWF0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSAkKCcjcmVzZXJ2YXRpb25fX2Zvcm0nKTtcclxuICAgICAgICAgICAgdGhpcy4kYnRuID0gdGhpcy4kZm9ybS5maW5kKCdidXR0b24nKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXRzX19jb250YWluZXIuZGVsZWdhdGUodGhpcy4kc2VhdCwgJ2NsaWNrJywgdGhpcy5ib29rQVNlYXQuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0bi5jbGljayh0aGlzLnNlbmREYXRhLmJpbmQodGhpcykpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlbmRlclNlYXRzOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93X251bWJlcjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gJCgnPHVsLz4nLCB7J2NsYXNzJzogJ3NlYXRzX19yb3cnfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnNlYXRzX251bWJlcjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93LmFwcGVuZCgkKCc8bGkvPicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXJvdyc6IGkgKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1zZWF0JzogaiArIDFcclxuICAgICAgICAgICAgICAgICAgICB9KS5hcHBlbmQoaiArIDEpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmFwcGVuZChyb3cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYm9va0FTZWF0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyICRzZWF0ID0gKCQoZS50YXJnZXQpKSxcclxuICAgICAgICAgICAgICAgIHJvd19udW1iZXIgPSAkc2VhdC5kYXRhKCdyb3cnKSxcclxuICAgICAgICAgICAgICAgIHNlYXRfbnVtYmVyID0gJHNlYXQuZGF0YSgnc2VhdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJHNlYXQuaGFzQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlYXQuYWRkQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdyb3cnOiByb3dfbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VhdCc6IHNlYXRfbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5yZXNlcnZlZF9zZWF0cywgJC5wcm94eShmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5yb3cgPT0gcm93X251bWJlciAmJiB2YWx1ZS5zZWF0ID09IHNlYXRfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWF0LnJlbW92ZUNsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZERhdGE6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdmFyIHNlYXRzID0gdGhpcy5yZXNlcnZlZF9zZWF0cztcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgdXJsOiB0aGlzLiRmb3JtLmF0dHIoJ2FjdGlvbicpLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge3NlYXRzOiBzZWF0c31cclxuXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYWxlcnQtc3VjY2VzcycpLmh0bWwoZGF0YS5pbmZvKTtcclxuICAgICAgICAgICAgICAgICQoJy5oaWRlJykuZmFkZUluKCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuICAgIHNlYXRzLmluaXQoKTtcclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9zZWF0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=