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
        screening_id: $('#screening_id').val(),
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
            this.$firstName = $('#firstname');
            this.$surname = $('#surname');
            this.$alert_container = $('.alert');
        },

        bindEvents: function bindEvents() {
            this.$seats__container.delegate(this.$seat, 'click', this.bookASeat.bind(this));
            this.$btn.click(this.sendData.bind(this));
        },

        renderSeats: function renderSeats() {

            var row_number = this.row_number,
                seats_number = this.seats_number,
                seats_container = this.$seats__container;

            var url = $('#reservation_url').val();

            $.ajax({
                dataType: 'json',
                url: url,
                type: 'POST'
            }).done(function (data) {
                var currently_booked_seats = data.current_reservations;

                seats_container.html('');

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
                                row[0].children[j].classList.add('seats__seat-booked', 'disabled');
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

            var reserved_seats = this.reserved_seats,
                screening_id = this.screening_id,
                renderSeats = this.renderSeats.bind(this),
                alert_container = this.$alert_container,
                $firstname = this.$firstName,
                $surname = this.$surname;

            if (this.validateData()) {

                $.ajax({

                    url: this.$form.attr('action'),
                    data: {
                        seats: reserved_seats,
                        screeningId: screening_id,
                        firstname: $firstname.val(),
                        surname: $surname.val()
                    },
                    type: 'post'

                }).done(function (data) {

                    alert_container.addClass('alert-success').html(data.info);
                    alert_container.fadeIn().delay(3000).fadeOut();
                    renderSeats();
                    $firstname.val("");
                    $surname.val("");
                });
                this.reserved_seats = [];
            }
        },

        validateData: function validateData() {
            var reserved_seats = this.reserved_seats,
                $firstname = this.$firstName,
                $surname = this.$surname;

            if (reserved_seats.length == 0) {
                this.checkField('Zaznacz miejsca do zarezerwowania');
                return;
            }

            if ($firstname.val() == "") {
                this.checkField('Podaj imię');
                return;
            }

            if ($surname.val() == "") {
                this.checkField("Podaj nazwisko");
                return;
            }

            this.$alert_container.removeClass('alert-danger');

            return true;
        },

        checkField: function checkField(info) {
            this.$alert_container.addClass('alert-danger').html(info);
            this.$alert_container.fadeIn().delay(3000).fadeOut();
        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzA1YTgxMWZkZmRhYjAxYmViYjgiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwidmFsIiwic2VhdHNfbnVtYmVyIiwic2NyZWVuaW5nX2lkIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsIiRmaXJzdE5hbWUiLCIkc3VybmFtZSIsIiRhbGVydF9jb250YWluZXIiLCJkZWxlZ2F0ZSIsImJvb2tBU2VhdCIsImJpbmQiLCJjbGljayIsInNlbmREYXRhIiwic2VhdHNfY29udGFpbmVyIiwidXJsIiwiYWpheCIsImRhdGFUeXBlIiwidHlwZSIsImRvbmUiLCJkYXRhIiwiY3VycmVudGx5X2Jvb2tlZF9zZWF0cyIsImN1cnJlbnRfcmVzZXJ2YXRpb25zIiwiaHRtbCIsImkiLCJyb3ciLCJqIiwiYXBwZW5kIiwiY2xhc3MiLCJrIiwibGVuZ3RoIiwic2VhdCIsImNoaWxkcmVuIiwiY2xhc3NMaXN0IiwiYWRkIiwiZSIsInRhcmdldCIsInNlYXRfbnVtYmVyIiwicGFyZW50Tm9kZSIsImRlbGVnYXRlVGFyZ2V0IiwiaGFzQ2xhc3MiLCJhZGRDbGFzcyIsInB1c2giLCJlYWNoIiwicHJveHkiLCJpbmRleCIsInZhbHVlIiwic3BsaWNlIiwicmVtb3ZlQ2xhc3MiLCJwcmV2ZW50RGVmYXVsdCIsImFsZXJ0X2NvbnRhaW5lciIsIiRmaXJzdG5hbWUiLCJ2YWxpZGF0ZURhdGEiLCJhdHRyIiwic2NyZWVuaW5nSWQiLCJmaXJzdG5hbWUiLCJzdXJuYW1lIiwiaW5mbyIsImZhZGVJbiIsImRlbGF5IiwiZmFkZU91dCIsImNoZWNrRmllbGQiXSwibWFw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ZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL3NlYXRzLmpzXCIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMwNWE4MTFmZGZkYWIwMWJlYmI4IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBzZWF0cyA9IHtcclxuXHJcbiAgICAgICAgcm93X251bWJlcjogJCgnI3Jvd3NfbnVtYmVyJykudmFsKCksXHJcbiAgICAgICAgc2VhdHNfbnVtYmVyOiAkKCcjc2VhdHNfbnVtYmVyJykudmFsKCksXHJcbiAgICAgICAgc2NyZWVuaW5nX2lkOiAkKCcjc2NyZWVuaW5nX2lkJykudmFsKCksXHJcbiAgICAgICAgcmVzZXJ2ZWRfc2VhdHM6IFtdLFxyXG5cclxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FjaGVEb20oKTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTZWF0cygpO1xyXG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjYWNoZURvbTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyID0gJCgnLnNlYXRzX19jb250YWluZXInKTtcclxuICAgICAgICAgICAgdGhpcy4kc2VhdCA9IHRoaXMuJHNlYXRzX19jb250YWluZXIuZmluZCgnLnNlYXRzX19zZWF0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvcm0gPSAkKCcjcmVzZXJ2YXRpb25fX2Zvcm0nKTtcclxuICAgICAgICAgICAgdGhpcy4kYnRuID0gdGhpcy4kZm9ybS5maW5kKCdidXR0b24nKTtcclxuICAgICAgICAgICAgdGhpcy4kZmlyc3ROYW1lID0gJCgnI2ZpcnN0bmFtZScpO1xyXG4gICAgICAgICAgICB0aGlzLiRzdXJuYW1lID0gJCgnI3N1cm5hbWUnKTtcclxuICAgICAgICAgICAgdGhpcy4kYWxlcnRfY29udGFpbmVyID0gJCgnLmFsZXJ0Jyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmRlbGVnYXRlKHRoaXMuJHNlYXQsICdjbGljaycsIHRoaXMuYm9va0FTZWF0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLiRidG4uY2xpY2sodGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvd19udW1iZXIgPSB0aGlzLnJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzZWF0c19udW1iZXIgPSB0aGlzLnNlYXRzX251bWJlcixcclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lciA9IHRoaXMuJHNlYXRzX19jb250YWluZXI7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHVybCA9ICQoJyNyZXNlcnZhdGlvbl91cmwnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRseV9ib29rZWRfc2VhdHMgPSBkYXRhLmN1cnJlbnRfcmVzZXJ2YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lci5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd19udW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAkKCc8dWwvPicsIHsnY2xhc3MnOiAnc2VhdHNfX3Jvdyd9KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlYXRzX251bWJlcjsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kKCQoJzxsaS8+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yb3cnOiBpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXNlYXQnOiBqICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hcHBlbmQoaiArIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY3VycmVudGx5X2Jvb2tlZF9zZWF0cy5sZW5ndGg7IGsrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IChjdXJyZW50bHlfYm9va2VkX3NlYXRzW2tdLnNlYXQgLSAxKSAmJiBpID09IGN1cnJlbnRseV9ib29rZWRfc2VhdHNba10ucm93IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1swXS5jaGlsZHJlbltqXS5jbGFzc0xpc3QuYWRkKCdzZWF0c19fc2VhdC1ib29rZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lci5hcHBlbmQocm93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBib29rQVNlYXQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRzZWF0ID0gKCQoZS50YXJnZXQpKSxcclxuICAgICAgICAgICAgICAgIHJvd19udW1iZXIgPSAkc2VhdC5kYXRhKCdyb3cnKSxcclxuICAgICAgICAgICAgICAgIHNlYXRfbnVtYmVyID0gJHNlYXQuZGF0YSgnc2VhdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJHNlYXQuaGFzQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlYXQuYWRkQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdyb3cnOiByb3dfbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VhdCc6IHNlYXRfbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5yZXNlcnZlZF9zZWF0cywgJC5wcm94eShmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5yb3cgPT0gcm93X251bWJlciAmJiB2YWx1ZS5zZWF0ID09IHNlYXRfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWF0LnJlbW92ZUNsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZERhdGE6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgcmVzZXJ2ZWRfc2VhdHMgPSB0aGlzLnJlc2VydmVkX3NlYXRzLFxyXG4gICAgICAgICAgICAgICAgc2NyZWVuaW5nX2lkID0gdGhpcy5zY3JlZW5pbmdfaWQsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJTZWF0cyA9IHRoaXMucmVuZGVyU2VhdHMuYmluZCh0aGlzKSxcclxuICAgICAgICAgICAgICAgIGFsZXJ0X2NvbnRhaW5lciA9IHRoaXMuJGFsZXJ0X2NvbnRhaW5lcixcclxuICAgICAgICAgICAgICAgICRmaXJzdG5hbWUgPSB0aGlzLiRmaXJzdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAkc3VybmFtZSA9IHRoaXMuJHN1cm5hbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZURhdGEoKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdGhpcy4kZm9ybS5hdHRyKCdhY3Rpb24nKSxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXRzOiByZXNlcnZlZF9zZWF0cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NyZWVuaW5nSWQ6IHNjcmVlbmluZ19pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RuYW1lOiAkZmlyc3RuYW1lLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdXJuYW1lOiAkc3VybmFtZS52YWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfY29udGFpbmVyLmFkZENsYXNzKCdhbGVydC1zdWNjZXNzJykuaHRtbChkYXRhLmluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X2NvbnRhaW5lci5mYWRlSW4oKS5kZWxheSgzMDAwKS5mYWRlT3V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyU2VhdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAkZmlyc3RuYW1lLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkc3VybmFtZS52YWwoXCJcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdmFsaWRhdGVEYXRhOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXNlcnZlZF9zZWF0cyA9IHRoaXMucmVzZXJ2ZWRfc2VhdHMsXHJcbiAgICAgICAgICAgICAgICAkZmlyc3RuYW1lID0gdGhpcy4kZmlyc3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgJHN1cm5hbWUgPSB0aGlzLiRzdXJuYW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc2VydmVkX3NlYXRzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmllbGQoJ1phem5hY3ogbWllanNjYSBkbyB6YXJlemVyd293YW5pYScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoJGZpcnN0bmFtZS52YWwoKSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmllbGQoJ1BvZGFqIGltacSZJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgkc3VybmFtZS52YWwoKSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrRmllbGQoXCJQb2RhaiBuYXp3aXNrb1wiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy4kYWxlcnRfY29udGFpbmVyLnJlbW92ZUNsYXNzKCdhbGVydC1kYW5nZXInKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNoZWNrRmllbGQ6IGZ1bmN0aW9uIChpbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGFsZXJ0X2NvbnRhaW5lci5hZGRDbGFzcygnYWxlcnQtZGFuZ2VyJykuaHRtbChpbmZvKTtcclxuICAgICAgICAgICAgdGhpcy4kYWxlcnRfY29udGFpbmVyLmZhZGVJbigpLmRlbGF5KDMwMDApLmZhZGVPdXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfTtcclxuXHJcbiAgICBzZWF0cy5pbml0KCk7XHJcblxyXG5cclxufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==