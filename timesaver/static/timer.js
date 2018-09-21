var app = new Vue({
    el: "#app",
    data: {
        dateStr: weekday + ", " + month + " " + day + ", " + year,
        priorElapsedMs: startTime,
        elapsedMsSinceStart: 0,
        lastStartDate: 0,
        isPlaying: false,
        clearID: undefined
    },
    computed: {
        hours: function () {
            let n = Math.floor((this.priorElapsedMs + this.elapsedMsSinceStart) / (1000 * 60 * 60));
            return n > 9 ? "" + n : "0" + n;
        },
        minutes: function () {
            let n = Math.floor((this.priorElapsedMs + this.elapsedMsSinceStart) / (1000 * 60)) % 60;
            return n > 9 ? "" + n : "0" + n;
        },
        seconds: function () {
            let n = Math.floor((this.priorElapsedMs + this.elapsedMsSinceStart) / 1000) % 60;
            return n > 9 ? "" + n : "0" + n;
        },
        sevenDay: function() {
            let hours = Math.floor(sevenDay / (1000 * 60 * 60));
            let minutes = Math.floor(sevenDay / (1000 * 60)) % 60; 
            return "Seven-day total: " + hours + " hours and " + minutes + " minutes"
        }
    },
    methods: {
        onPlayClick: function () {
            this.lastStartDate = Date.now();
            this.clearID = setInterval(() => {
                this.elapsedMsSinceStart = Date.now() - this.lastStartDate;
                document.title = this.hours + ":" + this.minutes + ":" + this.seconds;
            }, 250);
            this.isPlaying = true;
        },
        onPauseClick: function () {
            clearInterval(this.clearID);
            this.priorElapsedMs += this.elapsedMsSinceStart;
            this.elapsedMsSinceStart = 0;
            this.isPlaying = false;
            fetch('api/elapsed_time/', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                body: JSON.stringify({priorElapsedMs: this.priorElapsedMs, day: day, month_num: month_num, year: year})
            }).then(function (res) {
                return res.json();
            }).then(function(data) {
                //Debug line:
                console.log(JSON.stringify(data));
            });
        }
    },
    beforeMount() {
        document.title = this.hours + ":" + this.minutes + ":" + this.seconds;
    }
});
