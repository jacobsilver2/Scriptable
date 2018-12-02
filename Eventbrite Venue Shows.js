// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: music-playlist;
//Upcoming shows

let url = "http://www.eventbrite.com/venue/api/feeds/organization/142.json"
let req = new Request(url)
let html = await req.load()
let json = html
// .split("<script type='application/ld+json'>")[1]
// .split("</script>")[0]
 let concerts = JSON.parse(json)

let today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate()+1);
console.log(tomorrow)
let table = new UITable();

for (concert of concerts) {
let date = new Date(concert.starts_at);
if (date < today) continue;
if (date >= tomorrow) break;
let row = new UITableRow();
row.cellSpacing = 10;
// let country = concert.location.address.addressCountry;
// if (country == "UK") country = "GB";
let columnOptions = [
{value: date, format: {weekday: "short"}, align: "left", weight: 1},
{value: date, format: {day: "numeric"}, align: "right", weight: 1},
{value: date, format: {month: "short"}, align: "left", weight: 1},
// {value: country.toUpperCase().replace(/./g, char => String.fromCodePoint(char.charCodeAt(0)+127397)), align: "center", weight: 1},
{value: concert.title, align: "left", weight: 5},
{value: concert.venue_name, align: "right", weight: 1},
// {value: concert.location.address.addressLocality, align: "left", weight: 3},
];
for (options of columnOptions) {
let cell = createCell(options);
row.addCell(cell);
}
table.addRow(row);
};
QuickLook.present(table);

function createCell(options) {
let value = options["value"];
let format = options["format"];
let text = format ? value.toLocaleDateString("en-US", format) : value;
let cell = UITableCell.text(text);
cell.widthWeight = options["weight"];
cell[options["align"] + "Aligned"]();
return cell;
}