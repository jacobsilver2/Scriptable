// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: paper-plane;

// get the start date
let startDate = new Date();
startDate.setDate(startDate.getDate() + 14)
// set the start time to midnight
startDate.setHours(0,0,0,0);

// get the end date
let endDate = new Date();
endDate.setDate(endDate.getDate() + 15)
endDate.setHours(0,0,0,0);
// get the booking calendar
let booking = await Calendar.forEventsByTitle("PineBoxBooking");


// get every event from the booking calendar which occurs between the start date and end date
let events = await CalendarEvent.between(startDate, endDate, [booking]);

// collection of email addresses
let emails = []
// collection of bands playing
let acts = []
// this is for formatting the time
let options = {  
    hour: "2-digit",
    minute: "2-digit"
};

events.map(event => {
    // push the email address into the emails array
    if (event.notes) {
      emails.push(event.notes);
    }
    // format the time
    const formattedDate = event.startDate.toLocaleTimeString("en-us", options)
    // format the string
    let str = `${formattedDate} - ${event.title}`
    // push the string into the acts array
    acts.push(str);
})

// new mail instance
let mail = new Mail();
// set the recipients to the array of emails
mail.toRecipients = emails;
mail.subject = "Pine Box Rock Shop " + startDate.toLocaleDateString()
mail.isBodyHTML=true;
mail.body=mailBody(acts, startDate)


mail.send()

function mailBody(acts, date) {
  let bands = acts.map(act => "<li>" + act + "</li>").join("");
  
  const d = date.toLocaleDateString()
  
  return (` 
    <h1>Hey Everybody,</h1>
    <h1>This email is confirming that you are playing at Pine Box Rock Shop on ${d}</h1>
    <hr>
    <h2>Here is the lineup for the night:</h2>
    <ul style="list-style: none;">${bands}</ul>
    <p>Please show up 30-45 minutes before your set starts to load in and soundcheck.</p>
    <h3>IF YOU HAVEN&#39;T ALREADY DONE SO, PLEASE CLICK THE LINK BELOW AND FILL OUT THE REQUIRED INFORMATION:</h3>
    <p><a href="http://www.pineboxrockshop.com/band-Info">http://www.pineboxrockshop.com/band-Info</a></p>
    <hr>
    <p>Your day-of point of contact will be the sound person working the night you are playing.  He/she will be able to get you your drink tickets and anything else you might need.</p>
    <p>Pine Box Rock Shop is a 21+ venue.  No exceptions can be made</p>
    <p>We are located at 12 Grattan Street in Bushwick.  We are right off the Morgan Stop on the L Train</p>

    <h2>HOSPITALITY</h2>
    <p>Pine Box offers all performers two drink tickets each with a maximum of ten tickets per band.  These are good for a well cocktail, shot, can or draft beer.</p>
    <hr>
    <h2>COMPENSATION</h2>
    <p>Pine Box is proud to host free live music five nights a week. In order to supply you with high quality audio assistance and a well-maintained backline, while not charging a cover, we do not financially compensate performers. All acts are welcome to “pass the hat” during their set.</p>
    <p>In the event you have organized an entire bill, you are welcome to collect a cover charge upon entry to the show room. You will be responsible for setting and collecting the fee and will keep 100% of the proceeds. If needed, Pine Box can supply you with a down bank, change and bracelets. Please notify us in advance if you will require that assistance.</p>
    <hr>
    <h2>BACKLINE</h2>
    <p>Our backline consists of 2 Traynor guitar cabs and Blackstar HT heads. Our bass cab is a TC with an Orange head. Our keyboard amp is a Behringer Ultratone K3000FX. We have a complete Gretsch Catalina Club Series drum kit with stands for a crash, ride and high hat (supply your own pedal, cymbals, snare and additional stands), a two-tier keyboard stand, half a dozen mics, cables, mic stands and DI inputs.</p>
    <p>It’s house policy that bands use our in-house amplification. It's what our engineer works with the most, what the room was designed to handle and really what sounds best. It also keeps our next door neighbors happy. Obviously, bring anything you need in regards to instrumentation, we just ask that you NOT bring in outside cabs.</p>
    <hr>
    <h2>SOUNDPERSON AND SETUP</h2>
    <p>Please treat the sound staff with respect.  It will be beneficial for bands and venue alike if you are organized, punctual, and able to help effectively in the set up process. Please handle any of our equipment with care, as it is the means by which all bands are able to perform here.</p>
    <hr>
    <h2>PROMOTION</h2>
    <p>Our Twitter handle is @pineboxrockshop. Our Instagram handle is pineboxrockshop.  The more online coverage, the better.  Your own Facebook/Twitter posts and event pages are key to turnout as well.  Please make sure you send us links to your Facebook, Twitter, and Instagram. We do check to see if you promote your show on your social media, and if we find you are not promoting, we likely won't be having you back.</p>
    <hr>
    <h2>THE HIT LIST!</h2>
    <p>If your show goes well, we'll definitely be asking you to come back.</p>
    <p>If you are local and would like to be added to our list of performers who are able to fill-in last minute, please let us know!  Cancellations are a reality and we're always looking for people to play with short notice.</p>
    <hr>
    <p>Thanks for making Pine Box Rock Shop a great place to hear music!</p>
    <p>Jacob Silver</p>
`)}