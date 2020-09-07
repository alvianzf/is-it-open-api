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

    toSeconds: s => {
        if (s == 1) {
            return s
        }
        if (/:/.test(s) && s.length) {
            parts = s.match(/(\d+):(\d+) (\w+)/)
            c = parts[3] == 'pm' ? 12 * 60 * 60 : 0
            seconds = (Number(parts[1]) * 60 * 60) + (Number(parts[2]) * 60) + c
            return seconds
        } else if (s.length) {
            parts = s.match(/(\d+) (\w+)/)
            c = parts[2] == 'pm' ? 12 * 60 * 60 : 0
            seconds = (Number(parts[1]) * 60 * 60) + c
            return seconds
        }
    }
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