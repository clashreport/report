const express = require('express');
const request = require('request');
const sendgrid = require('@sendgrid/mail');
const SENDGRID_API_KEY = "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"
sendgrid.setApiKey(SENDGRID_API_KEY)
const port = 8080

let msg = {
  from: 'rorystandley@gmail.com',
  to: ['rorystandley@gmail.com','watson.jake1996@gmail.com'],
  subject: 'War Day Results',
}

const app = express()

// const activeDays = ["Friday", "Saturday", "Sunday", "Monday"]

// function getDayOfWeek(date) {
//   const dayOfWeek = new Date(date).getDay();
//   return isNaN(dayOfWeek) ? null :
//     ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
// }

function getRequestStuff(url) {
  return options = {
    'method': 'GET',
    'url': `https://proxy.royaleapi.dev/v1/${url}`,
    'headers': {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjllNDRjZDJjLWMzMzEtNDk4ZC1hZWVjLTNiODhmODllZmEyOCIsImlhdCI6MTY1OTk2ODEwMCwic3ViIjoiZGV2ZWxvcGVyLzFlMTExZWJlLWRmZjYtMjEwYy0zYWI0LTBhMjNiY2U4NTQyZCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.LsVuAZNI0JHfOVbBldPw7cMTcMne0Ggu06-RRuwGCovCuyg8xN7naQVkqH4h_aDFnBQM2vgc1vMHv-R1HybgWg'
    }
  };
}

app.get('/', (req, res) => {
  request(getRequestStuff('clans/%232L8CYUP/currentriverrace'), function (error, response, body) {
    if (!error && response.statusCode == 200) {

        let data = JSON.parse((body)).clan.participants;
        let html = "<table border='1' style='width:100%; border-collapse: collapse;'>";
        html += "<tr><th>Position</th><th>Name</th><th>Fame</th><th>Repair Points</th><th>Boat Attacks</th><th>Decks Used</th><th>Decks Used Today</th></tr>"
        let counter = 0;
        data.forEach((element) => {
          console.log(`players/${element.tag}`)
          //check to see if they're current members
          // request(getRequestStuff(`players/${encodeURIComponent(element.tag)}`), function (errorTwo, responseTwo, bodyTwo) {
          // let check = JSON.parse((bodyTwo)).clan;
          // console.log(check,'#2L8CYUP' )
          // if (check && check.tag == '#2L8CYUP') {
          html += "<tr>";
          html += "<td style='text-align:center'>";
          html += parseInt(data.length) - parseInt(counter);
          html += "</td>";
          html += "<td style='padding-left: 10px;'>";
          html += element.name;
          html += "</td>";
          html += "<td style='text-align:center'>";
          html += element.fame;
          html += "</td>";
          html += "<td style='text-align:center'>";
          html += element.repairPoints;
          html += "</td>";
          html += "<td style='text-align:center'>";
          html += element.boatAttacks;
          html += "</td>";
          html += "<td style='text-align:center'>";
          html += element.decksUsed;
          html += "</td>";
          html += "<td style='text-align:center'>";
          html += element.decksUsedToday;
          html += "</td>";
          html += "</tr>";
          counter++;
        });
        html += "</table>"
        msg.html = html;
        // sendgrid.send(msg).then((resp) => {
        //   console.log('Email sent\n', resp)
        // }).catch((error) => {
        //   console.error(JSON.stringify(error))
        // })
        res.json("This has run fine")
      }
  })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})