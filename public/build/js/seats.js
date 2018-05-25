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
                renderSeats = this.renderSeats.bind(this);

            $.ajax({

                url: this.$form.attr('action'),
                data: { seats: reserved_seats, screeningId: screening_id },
                type: 'post'

            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();
                renderSeats();
            });
            this.reserved_seats = [];
        }

    };

    seats.init();
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjUwZmI4YmMzMWU5ZGUyOTJmZmIiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL3NlYXRzLmpzIl0sIm5hbWVzIjpbIiQiLCJkb2N1bWVudCIsInJlYWR5Iiwic2VhdHMiLCJyb3dfbnVtYmVyIiwidmFsIiwic2VhdHNfbnVtYmVyIiwic2NyZWVuaW5nX2lkIiwicmVzZXJ2ZWRfc2VhdHMiLCJpbml0IiwiY2FjaGVEb20iLCJyZW5kZXJTZWF0cyIsImJpbmRFdmVudHMiLCIkc2VhdHNfX2NvbnRhaW5lciIsIiRzZWF0IiwiZmluZCIsIiRmb3JtIiwiJGJ0biIsImRlbGVnYXRlIiwiYm9va0FTZWF0IiwiYmluZCIsImNsaWNrIiwic2VuZERhdGEiLCJzZWF0c19jb250YWluZXIiLCJ1cmwiLCJhamF4IiwiZGF0YVR5cGUiLCJ0eXBlIiwiZG9uZSIsImRhdGEiLCJjdXJyZW50bHlfYm9va2VkX3NlYXRzIiwiY3VycmVudF9yZXNlcnZhdGlvbnMiLCJodG1sIiwiaSIsInJvdyIsImoiLCJhcHBlbmQiLCJjbGFzcyIsImsiLCJsZW5ndGgiLCJzZWF0IiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJlIiwidGFyZ2V0Iiwic2VhdF9udW1iZXIiLCJwYXJlbnROb2RlIiwiZGVsZWdhdGVUYXJnZXQiLCJoYXNDbGFzcyIsImFkZENsYXNzIiwicHVzaCIsImVhY2giLCJwcm94eSIsImluZGV4IiwidmFsdWUiLCJzcGxpY2UiLCJyZW1vdmVDbGFzcyIsInByZXZlbnREZWZhdWx0IiwiYXR0ciIsInNjcmVlbmluZ0lkIiwiaW5mbyIsImZhZGVJbiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7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QjtBQUVIO0FBQ0o7QUFFSixTQWxHTzs7QUFvR1JuQyxrQkFBVSxrQkFBVXNCLENBQVYsRUFBYTs7QUFFbkJBLGNBQUVjLGNBQUY7QUFDQSxnQkFBSWxELGlCQUFpQixLQUFLQSxjQUExQjtBQUFBLGdCQUNJRCxlQUFlLEtBQUtBLFlBRHhCO0FBQUEsZ0JBRUlJLGNBQWMsS0FBS0EsV0FBTCxDQUFpQlMsSUFBakIsQ0FBc0IsSUFBdEIsQ0FGbEI7O0FBSUFwQixjQUFFeUIsSUFBRixDQUFPOztBQUVIRCxxQkFBSyxLQUFLUixLQUFMLENBQVcyQyxJQUFYLENBQWdCLFFBQWhCLENBRkY7QUFHSDlCLHNCQUFNLEVBQUMxQixPQUFPSyxjQUFSLEVBQXdCb0QsYUFBYXJELFlBQXJDLEVBSEg7QUFJSG9CLHNCQUFNOztBQUpILGFBQVAsRUFPR0MsSUFQSCxDQU9RLFVBQVVDLElBQVYsRUFBZ0I7O0FBRXBCN0Isa0JBQUUsZ0JBQUYsRUFBb0JnQyxJQUFwQixDQUF5QkgsS0FBS2dDLElBQTlCO0FBQ0E3RCxrQkFBRSxPQUFGLEVBQVc4RCxNQUFYO0FBQ0FuRDtBQUVILGFBYkQ7QUFjQSxpQkFBS0gsY0FBTCxHQUFzQixFQUF0QjtBQUVIOztBQTNITyxLQUFaOztBQStIQUwsVUFBTU0sSUFBTjtBQUdILENBcElELEUiLCJmaWxlIjoianMvc2VhdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Fzc2V0cy9qcy9zZWF0cy5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTBmYjhiYzMxZTlkZTI5MmZmYiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgc2VhdHMgPSB7XHJcblxyXG4gICAgICAgIHJvd19udW1iZXI6ICQoJyNyb3dzX251bWJlcicpLnZhbCgpLFxyXG4gICAgICAgIHNlYXRzX251bWJlcjogJCgnI3NlYXRzX251bWJlcicpLnZhbCgpLFxyXG4gICAgICAgIHNjcmVlbmluZ19pZDogJCgnI3NjcmVlbmluZ19pZCcpLnZhbCgpLFxyXG4gICAgICAgIHJlc2VydmVkX3NlYXRzOiBbXSxcclxuXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhY2hlRG9tKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2VhdHMoKTtcclxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY2FjaGVEb206IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy4kc2VhdHNfX2NvbnRhaW5lciA9ICQoJy5zZWF0c19fY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHNlYXQgPSB0aGlzLiRzZWF0c19fY29udGFpbmVyLmZpbmQoJy5zZWF0c19fc2VhdCcpO1xyXG4gICAgICAgICAgICB0aGlzLiRmb3JtID0gJCgnI3Jlc2VydmF0aW9uX19mb3JtJyk7XHJcbiAgICAgICAgICAgIHRoaXMuJGJ0biA9IHRoaXMuJGZvcm0uZmluZCgnYnV0dG9uJyk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYmluZEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLiRzZWF0c19fY29udGFpbmVyLmRlbGVnYXRlKHRoaXMuJHNlYXQsICdjbGljaycsIHRoaXMuYm9va0FTZWF0LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB0aGlzLiRidG4uY2xpY2sodGhpcy5zZW5kRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICByZW5kZXJTZWF0czogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvd19udW1iZXIgPSB0aGlzLnJvd19udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBzZWF0c19udW1iZXIgPSB0aGlzLnNlYXRzX251bWJlcixcclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lciA9IHRoaXMuJHNlYXRzX19jb250YWluZXI7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyIHVybCA9ICQoJyNyZXNlcnZhdGlvbl91cmwnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRseV9ib29rZWRfc2VhdHMgPSBkYXRhLmN1cnJlbnRfcmVzZXJ2YXRpb25zO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lci5odG1sKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd19udW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSAkKCc8dWwvPicsIHsnY2xhc3MnOiAnc2VhdHNfX3Jvdyd9KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlYXRzX251bWJlcjsgaisrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3cuYXBwZW5kKCQoJzxsaS8+Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICdzZWF0c19fc2VhdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YS1yb3cnOiBpICsgMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLXNlYXQnOiBqICsgMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5hcHBlbmQoaiArIDEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY3VycmVudGx5X2Jvb2tlZF9zZWF0cy5sZW5ndGg7IGsrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChqID09IChjdXJyZW50bHlfYm9va2VkX3NlYXRzW2tdLnNlYXQgLSAxKSAmJiBpID09IGN1cnJlbnRseV9ib29rZWRfc2VhdHNba10ucm93IC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd1swXS5jaGlsZHJlbltqXS5jbGFzc0xpc3QuYWRkKCdzZWF0c19fc2VhdC1ib29rZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXRzX2NvbnRhaW5lci5hcHBlbmQocm93KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBib29rQVNlYXQ6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdmFyICRzZWF0ID0gKCQoZS50YXJnZXQpKSxcclxuICAgICAgICAgICAgICAgIHJvd19udW1iZXIgPSAkc2VhdC5kYXRhKCdyb3cnKSxcclxuICAgICAgICAgICAgICAgIHNlYXRfbnVtYmVyID0gJHNlYXQuZGF0YSgnc2VhdCcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUucGFyZW50Tm9kZSA9PT0gZS5kZWxlZ2F0ZVRhcmdldCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghJHNlYXQuaGFzQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJHNlYXQuYWRkQ2xhc3MoJ3NlYXRzX19zZWF0LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdyb3cnOiByb3dfbnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VhdCc6IHNlYXRfbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2godGhpcy5yZXNlcnZlZF9zZWF0cywgJC5wcm94eShmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5yb3cgPT0gcm93X251bWJlciAmJiB2YWx1ZS5zZWF0ID09IHNlYXRfbnVtYmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2VydmVkX3NlYXRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzZWF0LnJlbW92ZUNsYXNzKCdzZWF0c19fc2VhdC1hY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2VuZERhdGE6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHZhciByZXNlcnZlZF9zZWF0cyA9IHRoaXMucmVzZXJ2ZWRfc2VhdHMsXHJcbiAgICAgICAgICAgICAgICBzY3JlZW5pbmdfaWQgPSB0aGlzLnNjcmVlbmluZ19pZCxcclxuICAgICAgICAgICAgICAgIHJlbmRlclNlYXRzID0gdGhpcy5yZW5kZXJTZWF0cy5iaW5kKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuXHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMuJGZvcm0uYXR0cignYWN0aW9uJyksXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7c2VhdHM6IHJlc2VydmVkX3NlYXRzLCBzY3JlZW5pbmdJZDogc2NyZWVuaW5nX2lkfSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0J1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKCcuYWxlcnQtc3VjY2VzcycpLmh0bWwoZGF0YS5pbmZvKTtcclxuICAgICAgICAgICAgICAgICQoJy5oaWRlJykuZmFkZUluKCk7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJTZWF0cygpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVzZXJ2ZWRfc2VhdHMgPSBbXTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH07XHJcblxyXG4gICAgc2VhdHMuaW5pdCgpO1xyXG5cclxuXHJcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2Fzc2V0cy9qcy9zZWF0cy5qcyJdLCJzb3VyY2VSb290IjoiIn0=