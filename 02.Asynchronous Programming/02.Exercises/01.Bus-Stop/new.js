function timeConversion(s) {
    let [h, m, sec] = s.split(':');
    h = Number(h);
    sec = sec.split('');
    const time = sec[sec.length - 2] +  sec[sec.length - 1];
    sec.splice(sec.length - 2, 2);
    sec = sec.join('');

    if(time === 'AM') {
        if(h === 12) {
            h = 0;
        }
    } else {
        if(h < 12) {
            h = h + 12;
        }
    }

    if(h < 10) {
        return `0${h}:${m}:${sec}`;
    } else {
       return `${h}:${m}:${sec}`;
    }
}

console.log(timeConversion('12:40:22AM'));