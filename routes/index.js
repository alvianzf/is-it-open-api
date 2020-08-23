var express = require('express');
var router = express.Router();
var request = require("request");
var parseDay = require("../utils/parseDay")

const url = "https://gist.githubusercontent.com/seahyc/7ee4da8a3fb75a13739bdf5549172b1f/raw/f1c3084250b1cb263198e433ae36ba8d7a0d9ea9/hours.csv"

/* GET home page. */
router.get('/', function(req, res){
  // res.setHeader('Content-Type', 'application/json');
  request({
      url: url,
      json: true
  }, function(error, response, body){
     var data = []
    var raw = body.replace(/"/g, "").split(/\n/g)

    for (var i = 0; i < raw.length; i++) {
      const modified =raw[i].replace(",", "^").split("^")
      const time = modified[1].split("  / ")
      let timeModified = {}

      for (var j = 0; j < time.length; j++) {
        const splitTime = time[j].replace(", ", "/").replace(" ", "^").split("^")
        const datas = parseDay.parseDay(splitTime[0], splitTime[1])
        timeModified = {...timeModified, ...datas}

      }
      data.push({name: modified[0], time: timeModified})
    }
      if(!error && response.statusCode === 200){
          return res.status(200).json({message: "default raw data", success:true, data});
      }
  })
});


module.exports = router;
