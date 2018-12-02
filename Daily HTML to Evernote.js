// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
let booking = await Calendar.forEventsByTitle("Booking");
let early = await Calendar.forEventsByTitle("EarlyEvent");

let events = await CalendarEvent.today([early, booking]);

// QuickLook.present(createHTMLTable(events))
Pasteboard.copyString(createHTMLTable(events));

function createHTMLTable(events) {
  let options = {  
    hour: "2-digit",
    minute: "2-digit"
  };
  return `<table><tr><th>Time</th><th>Band</th><th>Draw</th><th>Notes</th></tr>${events.map(event => `<tr><td>${event.startDate.toLocaleTimeString("en-us", options)}</td><td>${event.title}</td><td></td><td></td></tr>`).join("")}</table>`;
}