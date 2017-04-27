
jQuery(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '&#x3c;Ant',
        nextText: 'Sig&#x3e;',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: '',
        changeMonth: true,
		changeYear: true,
		showOn: "both",
		buttonImageOnly: true, 
        buttonText: 'Abrir Calendario',
        buttonImage: "/FiaTubeHtml5/Images/iconos/calendario.png"
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});

$.timepicker.regional['es'] = {
    timeOnlyTitle: 'Seleccione una hora',
    timeText: 'Hora',
    hourText: 'Hora:',
    minuteText: 'Minutos:',
    secondText: 'Segundos:',
    millisecText: 'Milisegundos:',
    currentText: 'Actual',
    closeText: 'Listo',
    ampm: false,
    buttonText: 'Abrir Horarios',
    buttonImage: "/FiaTubeHtml5/Styles/images/icoRELOJ.png"
};
$.timepicker.setDefaults($.timepicker.regional['es']);

Date.prototype.defaultView = function () {
    var dd = this.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = this.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = this.getFullYear();
    return String(mm + "\/" + dd + "\/" + yyyy)
}

Date.prototype.esMXFormat = function () {
    var dd = this.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = this.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = this.getFullYear();
    return String(dd + "\/" + mm + "\/" + yyyy)
}

Date.prototype.esMXFormatLarge = function () {
    var dd = this.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = this.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = this.getFullYear();
    var hours = this.getHours();
    var mins = this.getMinutes();
    var seconds = this.getSeconds();

    return String(dd + "\/" + mm + "\/" + yyyy + "   " + ((hours > 9) ? hours : "0" + hours) + ":" + ((mins > 9) ? mins : "0" + mins) + ":" + ((seconds > 9) ? seconds : "0" + seconds))
}


