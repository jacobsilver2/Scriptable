// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: paper-plane;

// get the start date
let startDate = new Date();
startDate.setDate(startDate.getDate() + 21)
// set the start time to midnight
startDate.setHours(0,0,0,0);

// get the end date
let endDate = new Date();
endDate.setDate(endDate.getDate() + 22)
endDate.setHours(0,0,0,0);
// get the booking calendar
let cal = await Calendar.forEventsByTitle("Booking")

// get every event from the booking calendar which occurs between the start date and end date
let events = await CalendarEvent.between(startDate, endDate, [cal]);
let emails = [];
events.map(event => {
  // push the email address into the emails array
  emails.push(event.notes);
});

let mail = new Mail();
// set the recipients to the array of emails
mail.toRecipients = emails;
mail.subject = "Important Information for your show at Pete's Candy Store on " + startDate.toLocaleDateString();
mail.isBodyHTML=true;
mail.body=mailBody();
mail.send();

function mailBody() {
  return `
    <h4>ACTION NEEDED: If you have not already filled out this form, please do so right away. </h4>
    <a href="http://www.petescandystore.com/media-request-form">http://www.petescandystore.com/media-request-form</a>
    <p>Pete’s must have your information to list you on our site.</p>
    <p>If this show happens to be an Album Release Show, a band member’s birthday, or some other special occasion, <a href="mailto: info@petescandystore.com">let us know</a> and we will do our best to help the promotion.</p>
    <p>THANK YOU!</p>
    <p>Jake and the rest of Pete's</p>
  `
}