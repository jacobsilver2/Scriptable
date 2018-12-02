// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: paper-plane;

// get the start date
let startDate = new Date();
startDate.setDate(startDate.getDate() + 7)
// set the start time to midnight
startDate.setHours(0,0,0,0);

// get the end date
let endDate = new Date();
endDate.setDate(endDate.getDate() + 8)
endDate.setHours(0,0,0,0);
// get the booking calendar
let cal = await Calendar.forEventsByTitle("Booking")

// get every event from the booking calendar which occurs between the start date and end date
let events = await CalendarEvent.between(startDate, endDate, [cal])

// collection of email addresses
let emails = []
// this is for formatting the time
let options = {  
    hour: "2-digit",
    minute: "2-digit"
};

events.map(event => {
    // push the email address into the emails array
    emails.push(event.notes);
})

let mail = new Mail();
// set the recipients to the array of emails
mail.toRecipients = emails;
mail.subject = "Pete's Candy Store " + startDate.toLocaleDateString();
mail.isBodyHTML=true;
mail.body=mailBody();
mail.send();

function mailBody() {
  return (`
    <p>
      HEY - Time to promote your show! You have probably already started  this, but please remember that it will be YOUR promo that brings   people to your show. Remember to tag @petescandystore in tweets and   Instagram posts, so we might spread the word wider. And, if you create  a FB event, send us a “Co-Hosting Request” through FB so we can put it up on our wall.
    </p>
    <p>
      If this show happens to be an Album Release Show, a band member’s birthday, or some other special occasion, let us know (info@petescandystore.com) and we will do our best to help the promotion.
    </p>
    <p>THANK YOU!</p>
    <p>Jake and the rest of Pete's</p>
  `);
}





