
function getVideosRecientesLogin() {
    var data = "{}";
    executeSyncRequest(wsObtieneVideosRecientes, data, successSeccEmpl, Error);
}

var successVideosRecientesLogin = function (data, status) {
    alertModal(data);
}
