//refreshes time every second
function displayC() {
  var refresh = 1000; // Refresh rate in milli seconds
  mytime = setTimeout('displayCT()', refresh)
}

//displays the time
function displayCT() {
  var x3 = getTime();
  document.getElementById('ct').innerHTML = x3;
  displayC();
}

var clickCount = 0; //number of times the start/end event and start next one button has been pressed
//puts the starting time in the table the first time the button is clicked, then, each subsequent time, puts in the end time, which becomes the next start time
function startTime(){
  clickCount++;
  var x3 = getTime();
  var table = document.getElementById('time_table');
  if (clickCount == 1){
    var row = table.insertRow(1);
    var cell = row.insertCell(0);
    cell.innerHTML = x3;
    document.getElementById('start').innerHTML = "End Event and Start Next Event";
  }
  else{
    var row = table.rows[table.rows.length - 1];
    var cell = row.insertCell(1);
    cell.innerHTML = x3;
    var this_event = prompt("Please enter a name for the event that just ended", "");
    var cell = row.insertCell(2);
    cell.innerHTML = this_event;
    var row = table.insertRow(table.rows.length);
    var cell = row.insertCell(0);
    cell.innerHTML = x3;
  }
}

//Logs the final end time and saves the table as a pdf
function endAndSave(){
  var x3 = getTime();
  var table = document.getElementById('time_table');
  var row = table.rows[table.rows.length - 1];
  var cell = row.insertCell(1);
  cell.innerHTML = x3;
  var this_event = prompt("Please enter a name for the event that just ended", "");
  var cell = row.insertCell(2);
  cell.innerHTML = this_event;

  html2canvas(document.getElementById('time_table'), {
    onrendered: function (canvas) {
      var data = canvas.toDataURL();
      var docDefinition = {
        content: [{
          image: data,
          width: 500
        }]
      };
      pdfMake.createPdf(docDefinition).download("Table.pdf");
    }
  });
}

//fetches the current time
function getTime(){
  var x = new Date()
  var month = x.getMonth() + 1;
  var day = x.getDate();
  var year = x.getFullYear();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  var x3 = month + '-' + day + '-' + year;

  var hour = x.getHours();
  var minute = x.getMinutes();
  var second = x.getSeconds();
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  var x3 = x3 + ' ' + hour + ':' + minute + ':' + second
  return x3;
}

//clears the table except for the top row
function emptyTable(){
  var table = document.getElementById('time_table');
  var i;
  for (i = (table.rows.length - 1); i>0; i--){
    table.deleteRow(i);
  }
  clickCount = 0;
  document.getElementById('start').innerHTML = "Start";
}
