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

const parseDay = day => {
    let days = fixDay(day)
    switch (days) {
        case "Mon-Sun" : return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        case "Mon-Sat" : return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        case "Mon-Fri" : return ["Mon", "Tue", "Wed", "Thu", "Fri"]
        case "Mon-Thu" : return ["Mon", "Tue", "Wed", "Thu"]
        case "Mon-Wed" : return ["Mon", "Tue", "Wed"]
        case "Mon-Tue" : return ["Mon", "Tue"]
        case "Tue-Fri" : return ["Tue", "Wed", "Thu", "Fri"]
        case "Tue-Thu" : return ["Tue", "Wed", "Thu"]
        case "Wed-Sun" : return ["Wed", "Thu", "Fri", "Sat", "Sun"]
        case "Wed-Sat" : return ["Wed", "Thu", "Fri", "Sat"]
        case "Wed-Fri" : return ["Wed", "Thu", "Fri"]
        case "Wed-Thu" : return ["Wed", "Thu"]
        case "Wed-Sat" : return ["Wed", "Thu", "Fri", "Sat"]
        case "Thu-Sun" : return ["Thu", "Fri", "Sat", "Sun"]
        case "Thu-Sat" : return ["Thu", "Fri", "Sat"]
        case "Thu-Fri" : return ["Thu", "Fri"]
        case "Fri-Sun" : return ["Fri", "Sat", "Sun"]
        case "Fri-Sat" : return ["Fri", "Sat"]
        case "Sat-Sun" : return ["Sat", "Sun"]
        default: return [day.substring(0,3)]
    }
}

const fixDay = (raw) => {
    return raw.replace("Tues", "Tue").replace("Weds", "Wed").replace("Thurs", "Thu").replace(/ /g, "")
}