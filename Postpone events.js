// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic-wand;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: calendar;
// Fetches upcoming events today and prompts to select an event. Then prompts user to select a number of minutes to postpone the selected event.
let calendarName = "jake"
let cal = await Calendar.forEventsByTitle(calendarName)
let events = await CalendarEvent.today([cal])
events = events.filter(event => {
  return event.startDate > new Date()
})
// Check if we found any events
if (events.length == 0) {
  let alert = new Alert()
  alert.message = "There are no more events today."
  alert.present()
  return
}
// Prompt to choose which event to postpone
let alert = new Alert()
for (event of events) {
  let hours = event.startDate.getHours()
  let mins = event.startDate.getMinutes()
  let title = ""
    + zeroPrefix(hours)
    + ":"
    + zeroPrefix(mins)
    + ": "
    + event.title
  alert.addAction(title)
}
alert.addCancelAction("Cancel")
let eventIdx = await alert.presentSheet()
if (eventIdx == -1) {
  return
}
// Prompt to choose minutes to offset
let minutes = [ 15, 30, 45, 60 ]
alert = new Alert()
for (offset of minutes) {
  alert.addAction(offset + " minutes")
}
alert.addCancelAction("Cancel")
let minsIdx = await alert.presentSheet()
if (minsIdx == -1) {
  return
}
// Update date with offset and save
let offset = minutes[minsIdx] * 60 * 1000
let event = events[eventIdx]
let startTime = event.startDate.getTime()
let endTime = event.endDate.getTime()
event.startDate = new Date(startTime + offset)
event.endDate = new Date(endTime + offset)
event.save()

// Format hours and minutes
function zeroPrefix(num) {
  return (num < 10 ? "0" : "") + num
}