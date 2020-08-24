module.exports = {
    parseDay: (raw, rawTime) => {

        let _ = rawTime.split(" - ")

        const min = changeToTime(_[0])
        const max = changeToTime(_[1])
        const time = {min, max}
        // time = _

        let dayList = {
            Mon: time,
            Tue: time,
            Wed: time,
            Thu: time,
            Fri: time,
            Sat: time,
            Sun: time,
        }

        raw = raw.split("/")
    
        switch (raw[0]) {
            case "Mon-Sun": return dayList
                            break;
            case "Mon-Sat": delete dayList.Sun
                            break;
            case "Mon-Fri": delete dayList.Sun
                            delete dayList.Sat
                            break;
            case "Mon-Thu": delete dayList.Sun
                            delete dayList.Sat
                            delete dayList.Fri
                            break;
            case "Fri-Sat": return {Fri: time, Sat: time}
                            break;
            case "Mon-Thu": delete dayList.Sat
                            delete dayList.Fri
                            break;
            default: dayList = {day: raw[0].substring(0, 3), time}
        }
        // raw[1] != undefined && (dayList.raw[1].substring(0, 3) = time)
        const additional = raw[1] !== undefined ? raw[1].substring(0, 3) : null

        additional && (dayList.additional = time)
        return dayList
    }
} 

const changeToTime = s => {
    var d = new Date()
    parts = s.match(/(\d+)\:(\d+) (\w+)/)
    // !parts && console.log(s)
    // parts.length === 2 && parts.push(":").push("00")
    // console.log(parts, parts[0], parts[1], parts[2], parts[3])
    // hours = /am/i.test(parts[3]) ? parseInt(parts[1], 10) : parseInt(parts[1], 10) + 12
    // minutes = parseInt(parts[2], 10);

    // d.setHours(hours, minutes,0,0);

    return d
}