const fs = require('fs');
const json_data = JSON.parse(fs.readFileSync('2077.json'));  // file_feed_name < file source path respective to this script >
data_dart = []
var glob = require('glob');
var replace = require('replace');


for (var i in json_data) {
    var days_set_dart = {}
    for(var j in json_data[i].days) {
        days_set_dart[[json_data[i].days[j].dayInEn]] = {
            day: json_data[i].days[j].day,
            isHoliday: json_data[i].days[j].isHoliday,
            tithi: json_data[i].days[j].tithi,
            eventsNp: json_data[i].days[j].event.split('/')
        }
    }
    
    data_dart.push(days_set_dart);
}
fs.writeFileSync('year.dart', JSON.stringify(data_dart,undefined, 4)); // file_feed_output_name
  // Find file(s)
glob('year.dart', function(err, files) {
    if (err) { throw err; }
    files.forEach(function(item, index, array) {
          console.log(item + ' found');
          number = 0;
          // Read file
          // Find and Replace string
          while (number <= 32) { 
            var x = "\"" + number.toString() + "\"";
            console.log(x);
          replace({
              regex: x,
              replacement: number,
              paths: [item],
              recursive: false,
              silent: true
          });
          number++;
        }
          // Read file
      });
});