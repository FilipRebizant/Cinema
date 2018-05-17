$(document).ready(function () {

    var seats = {

        row_number: $('#rows_number').val(),
        seats_number: $('#seats_number').val(),
        reserved_seats: [],
        // currently_booked_seats: [
        //     {'row': 3, 'seat': 5}
        // ],
        // currently_booked_seats: this.getReservations,

        init: function () {
            this.cacheDom();
            // this.getReservations();
            this.renderSeats();
            this.bindEvents();
        },

        cacheDom: function () {

            this.$seats__container = $('.seats__container');
            this.$seat = this.$seats__container.find('.seats__seat');
            this.$form = $('#reservation__form');
            this.$btn = this.$form.find('button');
        },

        bindEvents: function () {
            this.$seats__container.delegate(this.$seat, 'click', this.bookASeat.bind(this));
            this.$btn.click(this.sendData.bind(this));
        },

        renderSeats: function () {

            var row_number = this.row_number,
                seats_number = this.seats_number,
                seats_container = this.$seats__container,
                reservations = this.getReservations();


            $(document).ajaxComplete(function (data) {
                var currently_booked_seats = reservations.responseJSON.current_reservations;

                console.log(currently_booked_seats);
                for (var i = 0; i < row_number; i++) {
                    var row = $('<ul/>', {'class': 'seats__row'});
                    for (var j = 0; j < seats_number; j++) {

                        for (var k = 0; k < currently_booked_seats.length; k++) {

                            if (j == (currently_booked_seats[k].seat - 1) && i == currently_booked_seats[k].row - 1) {
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

        bookASeat: function (e) {

            var $seat = ($(e.target)),
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

        sendData: function (e) {
            e.preventDefault();
            var reserved_seats = this.reserved_seats;
            // console.log(reserved_seats);
            $.ajax({

                url: this.$form.attr('action'),
                data: {seats: reserved_seats},
                type: 'post'


            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();

            });

        },

        getReservations: function () {
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