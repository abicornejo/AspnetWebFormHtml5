var t;

window.onload = function () { initialize(); };

$(function () {
    /*Se agrega funcion para generar la funcionalidad de rango de fechas*/
    var dates = $("#MainContent_txtFechaIni, #MainContent_txtFechaFin").datepicker({
        changeMonth: true,
        numberOfMonths: 1,

        onSelect: function (selectedDate) {
            var option = this.id == "MainContent_txtFechaIni" ? "minDate" : "maxDate",
    					instance = $(this).data("datepicker"),
    					date = $.datepicker.parseDate(
    						instance.settings.dateFormat ||
    						$.datepicker._defaults.dateFormat,
    						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });
    $("#MainContent_txtFechaIni, #MainContent_txtFechaFin").datepicker("setDate", new Date(), dateFormat = "dd M yy");
});


function initialize() {
    $("#MainContent_HDSeg").val("60");

    updateForm();
}

function setTimer() {
    if (t != undefined)
        clearTimeout(t);
    try {
        if (parent.isWindowClosed() != undefined) {
            t = setTimeout("updateForm()", 1000);
        }
    }
    catch (ex) { }
}

function updateForm() {
    if ($("#MainContent_HDSeg").val() == "0") {
        $("#LblSegundosH").text("");
        $("#LblSegundosH").append("60");
        $("#MainContent_HDSeg").val(60);
        $("#MainContent_BntActualizar").click();
    }
    else {
    var seg =  $("#MainContent_HDSeg").val();
    seg = seg - 1;
    $("#LblSegundosH").text("");
    $("#LblSegundosH").append(seg);
    $("#MainContent_HDSeg").val(seg);

    }
    setTimer();
}

function ActualizaDataPicker() {
    var dates = $("#MainContent_txtFechaIni, #MainContent_txtFechaFin").datepicker({
        changeMonth: true,
        numberOfMonths: 1,

        onSelect: function (selectedDate) {
            var option = this.id == "MainContent_txtFechaIni" ? "minDate" : "maxDate",
    					instance = $(this).data("datepicker"),
    					date = $.datepicker.parseDate(
    						instance.settings.dateFormat ||
    						$.datepicker._defaults.dateFormat,
    						selectedDate, instance.settings);
            dates.not(this).datepicker("option", option, date);
        }
    });

}