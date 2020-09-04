var express = require('express');
var router = express.Router();
var request = require("request");
var parseDay = require("../utils/parseDay")

const url = "https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv"

/* Parse the data to be seeded. */
router.get('/seed', function(req, res){
  // res.setHeader('Content-Type', 'application/json');
  request({
      url: url,
      json: true
  }, function(error, response, body){
      var data = []
      var raw = body.replace(/"/g, "").split(/\n/g)
      for (let i = 0; i < raw.length; i++) {
        const tmp = raw[i].replace(",", "&&").split("&&")
        const time = tmp[1].split(" / ")

        let _ = []
        let alternateEndTime;
        let endTime;
        let day;

        for (var j = 0; j < time.length; j++) {
          let startTime = parseDay.changeToTime(time[j])
          let splitTime = time[j].split(startTime)

          if (alternateEndTime = parseDay.changeToTime(splitTime[0])) {
            day = splitTime[0].split(alternateEndTime)[0].trim()
            
            endTime = startTime
            startTime = alternateEndTime
          } else {
            day = splitTime[0].trim()
            endTime = splitTime[1].replace(" - ", "")
          }
          const days = parseDay.days(day)
          const formatted = formatTime(days, startTime.trim(), endTime.trim())
          _ = [..._, ...formatted]
        }

        data.push({name: tmp[0], time: _})
      }

      if(!error && response.statusCode === 200){
          return res.status(200).json({message: "default raw data", success:true, data});
      }
  })
});

const formatTime = (day, start, end) => {
  let _ = []
  if (day.length === 3) {
    _ = [..._, {day, start, end}]
  } else {
    for (var i = 0; i < day.length; i++) {
        const __ = {day: day[i], start, end}
        _ = [..._ , __]
    }
  }

  return _
}

module.exports = router;
