$(document).ready(function () {

    var seats = {

        row_number: 10,
        seats_number: 10,

        init: function () {
            this.cacheDom();
            this.renderSeats();
            this.bookASeat();
        },
        
        cacheDom: function () {
            this.$seats__container = $('.seats__container');
            this.$row = $('<div class="seats__row"></div>');
            // this.$seat = $('.seats__seat');
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

        bookASeat: function () {

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