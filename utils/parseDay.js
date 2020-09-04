var moment = require("moment")

module.exports = {
    days: (raw) => {
        if(/,/.test(raw)) {
            let parsed = []
            split = raw.split(", ")
            for(var i = 0; i < split.length; i++) {
                const _ = parseDay(split[i])
                parsed = parsed.concat(_)
            }
    
            return parsed
        } else if (/-/.test(raw)) {
            return parseDay(raw)
        }

        return raw.substring(0, 3)
    },

    changeToTime: s => {
        var d = new Date()
        parts = s.match(/(\d+):(\d+) (\w+)/)
        parts1 = s.match(/(\d+) (\w+)/)
    
        return parts ? parts[0] : parts1 ? parts1[0] : false
    },
}

const list = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const parseDay = day => {
    let days = fixDay(day)
    let data = []
    
    if (/-/.test(days)) {
        _ = days.split("-")
        let size = list.indexOf(_[1]) - list.indexOf(_[0])
        let start = list.indexOf(_[0])
        if (size < 0) {
            size = size + 7
        }
        for (var i = 0; i <= size; i++) {
            console.log(size, days)
            data = [...data, list[start]]
            start++;
        }
        return data
    } else {
        return [day.substring(0,3)]
    }
}

const fixDay = (raw) => {
    return raw.replace("Tues", "Tue").replace("Weds", "Wed").replace("Thurs", "Thu").replace(/ /g, "")
}