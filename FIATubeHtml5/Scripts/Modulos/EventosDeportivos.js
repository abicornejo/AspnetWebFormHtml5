

$(function () {
    /*Se agrega funcion para generar la funcionalidad de rango de fechas*/
    var dates = $("#dtFechaInicio, #dtFechaFin").datepicker({
        changeMonth: true,
        numberOfMonths: 1,
        onSelect: function (selectedDate) {
            var option = this.id == "dtFechaInicio" ? "minDate" : "maxDate",
    					instance = $(this).data("datepicker"),
    					date = $.datepicker.parseDate(
    						instance.settings.dateFormat ||
    						$.datepicker._defaults.dateFormat,
    						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });

    /*Se asignan los campos de hora con su correspondiente formato*/
    $("#txtHoraInicio, #txtHoraFin").timepicker({
        timeFormat: 'hh:mm'
    });

    /*Se genera el acordion de la pagina*/
    $("#acdAcordion").accordion({
        collapsible: true
    });
});
