// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const date = new Date().toLocaleString("en-us", options);
const enCalendar = "c2aa3e47-5ae4-431c-b653-c45c5b5f166b";
const booking = await Calendar.forEventsByTitle("Booking");
const early = await Calendar.forEventsByTitle("EarlyEvent");
const events = await CalendarEvent.today([early, booking]);
const bandTable = createHTMLTable(events);
const refrigTable = createRefrigeratorTable();
const url = new CallbackURL(`evernote://x-callback-url/new-note`);
url.addParameter("type", "html");
url.addParameter("title", date);
url.addParameter("notebookGuid", enCalendar);
url.addParameter("text", bandTable+refrigTable);
url.getURL()
url.open();


function createHTMLTable(events) {
  let options = {  
    hour: "2-digit",
    minute: "2-digit"
  };
  return `<table border="1"><tr><th>Time</th><th>Band</th><th>Draw</th><th>Notes</th></tr>${events.map(event => `<tr><td>${event.startDate.toLocaleTimeString("en-us", options)}</td><td>${event.title}</td><td></td><td></td></tr>`).join("")}</table>`;
}

function createRefrigeratorTable() {
  return `
    <table border="1">
      <tr>
        <th>Refrigerator</th>
        <th>Open Temp</th>
        <th>Close Temp</th>
      </tr>
      <tr>
        <td>Reach In (bar)</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Red Fridge</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Low Boy (kitchen)</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>Walk In</td>
        <td></td>
        <td></td>
      </tr>
    </table>
  `
}

