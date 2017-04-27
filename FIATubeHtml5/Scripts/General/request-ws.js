

function executeRequest(requestUrl, inputData, successEvent, errorEvent) {
   
    if ((isSessionActive == true) && (sessionStorage.numUsuario != "undefined" && sessionStorage.numUsuario != "null")) {
        
        $.ajax({
            cache: false,
            type: "POST",
            url: requestUrl,
            data: inputData,
            contentType: "application/json; charset=utf-8;",
            dataType: "json",
            success: successEvent,
            error: errorEvent
        });
    } else {
   
        if ((isSessionActive == true) && (sessionStorage.numUsuario == "undefined" || sessionStorage.numUsuario == "null")) {
            alert('Su sesion ha caducado para volver a entrar necesita logearse de nuevo1.');
            isSessionActive = false; 
            parent.isClosedWindow();
        }
    }
}

function Error(request, status, error) {
    alertModal('Ocurrio un problema al ejecutar la solicitud: ' + request.statusText);
}

function executeSyncRequest(requestUrl, inputData, successEvent, errorEvent) {
    if ((isSessionActive == true) && (sessionStorage.numUsuario != "undefined" && sessionStorage.numUsuario != "null")) {
        $.ajax({
            async: false,
            cache: false,
            type: "POST",
            url: requestUrl,
            data: inputData,
            contentType: "application/json; charset=utf-8;",
            dataType: "json",
            success: successEvent,
            error: errorEvent
        });
    } else {
        if ((isSessionActive == true) && (sessionStorage.numUsuario == undefined || sessionStorage.numUsuario == "null")) {
            alert('Su sesion ha caducado para volver a entrar necesita logearse de nuevo.');
            isSessionActive = false;
            parent.isClosedWindow();
        }

    }
}