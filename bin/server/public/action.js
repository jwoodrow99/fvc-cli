let logFile = {};
let logs = {};

function dateToReadable(date){
    date = Number(date);
    let newDate = new Date(date);
    return `${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`;
}

$.get('/json', (data, status) => {
    logFile = data;
    keys = Object.keys(data.logs).sort((a, b) => {
        return b-a;
    });

    $('#project').text(logFile.project);
    $('#author').text(logFile.author);
    $('#created_at').text(dateToReadable(logFile.created_at));

    keys.forEach((key) => {
        let log = logFile.logs[key];
        $(`<tr><td>${log.created_at}</td><td>${dateToReadable(log.created_at)}</td><td>${log.message}</td></tr>`).appendTo( "#archive_logs" );
    });
});