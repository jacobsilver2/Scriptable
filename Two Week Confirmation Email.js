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
let cal = await Calendar.forEventsByTitle("Booking")

// get every event from the booking calendar which occurs between the start date and end date
let events = await CalendarEvent.between(startDate, endDate, [cal])

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
    emails.push(event.notes);
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
mail.subject = "Pete's Candy Store " + startDate.toLocaleDateString()
mail.isBodyHTML=true;
mail.body=mailBody(acts, startDate)


mail.send()

function mailBody(acts, date) {
  let bands = acts.map(act => "<li>" + act + "</li>").join("");
  
  const d = date.toLocaleDateString()
  
  return (` 
    <h1>Hey Everybody,</h1>
    <h1>This email is confirming that you are playing at Pete&#39;s Candy Store on ${d}</h1>
    <hr>
    <h2>Here is the lineup for the night:</h2>
    <ul style="list-style: none;">${bands}</ul>
    <p>Please show up 30-45 minutes before your set starts to load in and soundcheck.</p>
    <h3>IF YOU HAVEN&#39;T ALREADY DONE SO, PLEASE CLICK THE LINK BELOW AND FILL OUT THE REQUIRED INFORMATION:</h3>
    <p><a href="http://www.petescandystore.com/media-request-form">http://www.petescandystore.com/media-request-form</a></p>
    <hr>
    <h2>IMPORTANT: PLEASE READ CAREFULLY</h2>
    <h2>SHOW UP EARLY AND START ON TIME</h2>
    <p>Pete&#39;s is located in a residential neighborhood, and it is crucial that that music end at midnight, to respect our neighbors. Therefore, it is important that your start and finishing times are strictly adhered to. We sometimes have issues with people starting late and/or overplaying. Such delay is not fair to the later bands, as they must cut their time short. The sets are 45 minutes long, UNLESS OTHERWISE NOTED. Please show up 30-45 minutes before your set starts to load in and sound check. If your set time is 9pm, that means <strong>9pm</strong> start and 9:45 you should end your set, so the 10pm band can start on time, etc.</p>
    <hr>
    <h2>HERE’S A LITTLE INFO ABOUT PLAYING AT PETE&#39;S</h2>
    <p>We are located at 709 Lorimer Street in Williamsburg, Brooklyn, between Frost and Richardson Streets. You can take the L or G trains to the Lorimer stop. If coming by cab or car take the Williamsburg bridge to the first (sharp) right exit called Broadway West, then take a right on Bedford, then a right on North 11th St. follow N. 11 until it turns into Richardson. After it turns into Richardson you will go one more block, then take a right onto Lorimer. We are 1 house in. There is also a map on our website: 
        <a href="http://www.petescandystore.com">http://www.petescandystore.com</a>.
    </p>
    <hr>
    <h2>HOSPITALITY &amp; SUGGESTED DONATION</h2>
    <p>We give 2 drink tickets to all band members (up to a maximum of 10 tickets).  Tickets are good for most beers, wine, and well drinks. Everyone who plays here is offered one of our sandwiches for $5.00.
Pete’s now pushes hard for a suggested donation of $5, with the sound person working the tip bucket through the room for each band. This has led to greater audience contribution.The first $10 of those tips will go to the sound engineer. (To understand this policy in brief, please consider the following. Pete’s is a free venue with 25-30 seats. Yet, as a quality venue, we maintain (like a bigger venue) a booking staff, a website, a sound crew, a full compliment of sound gear, and of course all of the other expenses that go with running a business in NYC. We are about as close to a non-profit as a tax paying live music venue can get. As such, our sound staff receives compensation considerably lower than that paid at a bigger venue. In order to have a sound engineer at all, we need the audience contributions to support the ‘man (or woman) behind the band’ as well.)</p>
    <hr>
    <h2>FULL BAND?</h2>
    <p>If we booked you as a full band, please show up as a full band.</p>
    <hr>
    <h2>BACKLINE</h2>
    <ul>
        <li><a href="http://ashdownmusic.com/products/1/Bass-Amplification/18/Legacy/20/ABM-500-EVO-III/">Ashdown Engineering ABM-500-EVO111 bass head.</a></li>
        <li><a href="http://ashdownmusic.com/products/1/Bass-Amplification/2/ABM/155/ABM210HEVOIV-/">Ashdown Engineering ABM-210H-EVO-IV bass speaker cabinet.</a></li>
        <li><a href="https://www.music123.com/amplifiers-effects/fender-acoustasonic-30-dsp-combo-amp-with-effects/480728000000000">Fender Acoustasonic 30 DSP Acoustic Guitar Combo Amp</a></li>
        <li>Fender Blues Junior combo guitar amp.</li>
        <li>We have a floor tom, rack tom, kick drum, kick pedal, snare drum, 1 hi-hat stand, 2 snare stands, 1 cymbal stand, and 1 drum throne.</li>
        <li>Drummers will need to bring cymbals, sticks, a drum key. and a second cymbal stand if they need it.  They will also need to bring their own hi-hat clutch.</li>
        <li>Mackie PROFX16 mixer with 12 microphone inputs and 12 1/4 inch inputs.</li>
        <li>JBL EON 610 monitor.</li>
        <li>6 Shure SM 58’s, 1 Shure Beta 58A, and 1 Shure SM57</li>
        <li>We have 2 Mono DI’s and 1 Stereo DI</li>
        <li>2 Music Stands</li>
        <li>3 Guitar Stands</li>
        <li>1 Keyboard Stand</li>
    </ul>
    <hr>
    <h2>SOUNDPERSON AND SETUP</h2>
    <p>The hallway bench is a good place for case storage. Please do not store your cases on stage and around the room.Pete&#39;s does not always have a sound person for the 8pm slots.  Be prepared to test your own sound if you have an 8pm slot or earlier. If you have a problem, please contact our bar staff, as they may be able to help you.  Please treat the sound staff with respect.  It will be beneficial for bands and venue alike if you are organized, punctual, and able to help effectively in the set up process.  Please handle any of our equipment with care, as it is the means by which all bands are able to perform here.</p>
    <p>We rely on everyone who plays here to please be responsible and start your set on time, regardless of how many people are here to see you. It is important because if you start late and play late, then everyone after you goes on late.  If you do start late, please be considerate to the following acts and trim your set accordingly.  We need all sets to end at midnight. We have solid and long running understandings with our neighbors regarding noise, and we choose to maintain good relations.</p>
    <hr>
    <h2>Live Multi-track Recording</h2>
    <p>Pete&#39;s now offers live, multi-track recordings of sets for $125. The recordings are recorded using a mobile, 28-input recording rig with balanced microphone splitters and not a feed from the board. Artists will receive the unprocessed, multi-track stems as well as rough mixes. For more info, including examples of previous recordings and a list of frequently asked questions, visit igrecording.com/petes-info. If you&#39;d like to schedule your set to be recorded email the recording engineer, Irving Gadoury at <a href = "mailto: irvinggadoury@gmail.com">irvinggadoury@gmail.com</a></p>
    <hr>
    <h2>PROMOTION</h2>
    <p>In addition to e-mailing to your list, please use all of your social media outlets to promote your show. Poster hanging around Williamsburg and other neighborhoods can be very effective. If you make posters, bring or send 3 posters to Pete’s a few weeks before your show so we can hang them at the door and bar. You should understand that, though we do list all of our shows, it is YOUR promotion that will bring people out to your show.  We do check to see if you promote your show on your social media, and if we find you are not promoting, we likely won&#39;t be having you back.</p>
    <hr>
    <h2>AGE POLICY</h2>
    <p>Any band with any members under the age of 21 must state the ages of all band members when first submitting materials to our booking process.Any booked band with any members under the age of 21 must notify all fans and social media followers that attendees at their Pete’s show must all be 21+ and have ID. This band with underage members must also have the underage members present themselves at the bar so that the bartender may mark their hand or put on a wristband.</p>
    <hr>
    <h2>SOCIAL MEDIA</h2>
    <p>We have a Pete&#39;s Candy Store facebook page at <a href="https://www.facebook.com/petescandystore">https://www.facebook.com/petescandystore</a>. Our Twitter handle is @petescandystore.  Our Instagram account is ‘petescandystore’. Please become fans, follow us,’ like’ us, and post your show info on our wall.  The more online coverage, the better.  Your own Facebook/Twitter posts and event pages are key to turnout as well.
It is important for Pete&#39;s performers to understand that the music room has no residual draw.  The audience consists entirely of your own followers.  As such, it is important to make the effort to reach out.</p>
    <hr>
    <h2>THE HIT LIST!</h2>
    <p>If your show goes well, we&#39;ll definitely be asking you to come back. If you are local and would like to be added to our list of performers who are able to fill-in last minute, please let us know!  Cancellations are a reality and we&#39;re always looking for people to play with short notice.</p>
    <hr>
    <p>Thanks for making Pete’s a great place to hear music!</p>
    <p>Jacob Silver</p>
`)}