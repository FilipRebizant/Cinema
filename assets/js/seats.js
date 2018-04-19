$(document).ready(function () {

    var seats = {

        row_number: 10,
        seats_number: 10,
        reserved_seats: [],

        init: function () {
            this.cacheDom();
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

            for (var i = 0; i < this.row_number; i++) {
                var row = $('<ul/>', {'class': 'seats__row'});

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
            var seats = this.reserved_seats;

            $.ajax({

                url: this.$form.attr('action'),
                data: {seats: seats}

            }).done(function (data) {

                $('.alert-success').html(data.info);
                $('.hide').fadeIn();

            });

        }


    };

    seats.init();

});