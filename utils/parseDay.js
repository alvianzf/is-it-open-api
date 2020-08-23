// const parseDay = (raw, time) => {
//     let dayList = [{day: "Mon", time}, {day: "Tue", time}, {day: "Wed", time}, {day: "Thu", time}, {day: "Fri", time}, {day: "Sat", time}, {day: "Sun", time}]

//     switch (raw) {
//         case "Mon-Sun": return dayList
//                         break;
//         case "Mon-Sat": return dayList.pop().pop()
//                         break;
//         case "Mon-Fri": return dayList.pop().pop()
//                         break;
//         case "Mon-Thu": return dayList.pop().pop().pop()
//                         break;
//         default: return {day: raw, time}
//     }
// }

module.exports = {
    parseDay: (raw, time) => {
        let dayList = {
            Mon: time,
            Tue: time,
            Wed: time,
            Thu: time,
            Fri: time,
            Sat: time,
            Sun: time,
        }
    
        switch (raw) {
            case "Mon-Sun": return dayList
                            break;
            case "Mon-Sat": delete dayList.Sun
                            return dayList
                            break;
            case "Mon-Fri": delete dayList.Sun
                            delete dayList.Sat
                            return dayList
                            break;
            case "Mon-Thu": delete dayList.Sun
                            delete dayList.Sat
                            delete dayList.Fri
                            return dayList
                            break;
            case "Fri-Sat": return {Fri: time, Sat: time}
                            break;
            case "Mon-Thu/Sun": delete dayList.Sat
                            delete dayList.Fri
                            return dayList
                            break;
            default: return {day: raw, time}
        }
    }
} 