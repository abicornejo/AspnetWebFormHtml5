
$(function () {
    $('#dtFechaIni').datetimepicker({
        minDate: 0,
        onClose: function (dateText, inst) {
            var endDateTextBox = $('#dtFechaFin');
            if (endDateTextBox.val() != '') {
                var testStartDate = new Date(dateText);
                var testEndDate = new Date(endDateTextBox.val());
                if (testStartDate > testEndDate)
                    endDateTextBox.val(dateText);
            }
            else {
                endDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            var start = $(this).datetimepicker('getDate');
            $('#dtFechaFin').datetimepicker('option', 'minDate', new Date(start.getTime()));
        }
    });
    $('#dtFechaFin').datetimepicker({
        minDate: 0,
        onClose: function (dateText, inst) {
            var startDateTextBox = $('#dtFechaIni');
            if (startDateTextBox.val() != '') {
                var testStartDate = new Date(startDateTextBox.val());
                var testEndDate = new Date(dateText);
                if (testStartDate > testEndDate)
                    startDateTextBox.val(dateText);
            }
            else {
                startDateTextBox.val(dateText);
            }
        },
        onSelect: function (selectedDateTime) {
            var end = $(this).datetimepicker('getDate');
            $('#dtFechaIni').datetimepicker('option', 'maxDate', new Date(end.getTime()));
        }
    });
});
