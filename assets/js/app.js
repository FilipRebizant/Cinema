$(document).ready(function () {

    var renderSeats = function () {
        var row_number = 10,
            seats_number = 10,
            $seats__container = $('.seats__container'),
            $row = $('<div class="seats__row"></div>');

        for (var j = 0; j < row_number; j++) {
            $row.append('<div class="seats__seat">' + (j + 1) + '</div>');
        }

        for (var i = 0; i < row_number; i++) {
            var row = $('<div/>', {'class': 'seats__row'});

            for (var j = 0; j < seats_number; j++) {
                row.append($('<div/>', {class: 'seats__seat',  'data-row': i+1 , 'data-seat':j+1}).append(j + 1));
            }

            $seats__container.append(row);
        }

    };
    renderSeats();

    $('.seats__seat').delegate($('.seats__container'), 'click', function () {
        var $this = $(this);
        $this.toggleClass('seats__seat-active');



        // console.log("rząd " + $(this).data('row'));
        // console.log("miejsce " + $(this).data('seat'));
    });


});