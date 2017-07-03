const zeroFill = (num) => {
  if (typeof num !== 'number') {
    throw new TypeError('Argument must be a number');
  }
  return (num < 10 && num >= 0) ? `0${num}` : num;
};

new Vue({
  el: '#app',
  data: {
    isWork: true,
    maxSessions: 4,
    restingSeconds: 300,
    seconds: null,
    sessions: 1,
    timerState: 'stopped',
    timestamp: 0,
    workingSeconds: 1500,
  },
  mounted: function() {
    this.seconds = this.workingSeconds;
  },
  methods: {
    start: function () {
      this.timerState = 'started';
      this.tick();
      this.intervalId = setInterval(this.tick, 1000);
    },
    pause: function () {
      this.timerState = 'paused';
      clearInterval(this.intervalId);
    },
    stop: function () {
      this.timerState = 'stopped';
      clearInterval(this.intervalId);

      this.isWork = true;
      this.seconds = this.workingSeconds;
    },
    tick: function () {
      if (this.seconds !== 0) {
        this.seconds--;
        return;
      }

      this.isWork = !this.isWork;

      if (this.isWork && this.sessions >= this.maxSessions) {
        this.stop();
        this.sessions = 1;
      } else if (this.isWork) {
        this.seconds = this.workingSeconds;
        this.sessions += 1;
      } else {
        this.seconds = this.restingSeconds;
      }
    },
  },
  watch: {
    workingSeconds: function() {
      if (this.isWork) {
        this.seconds = this.workingSeconds;
      }
    },
    restingSeconds: function() {
      if (!this.isWork) {
        this.seconds = this.restingSeconds;
      }
    },
  },
  computed: {
    title: function () {
      return this.isWork ? 'Work' : 'Rest';
    },
    min: function () {
      return zeroFill(Math.floor(this.seconds / 60));
    },
    sec: function () {
      return zeroFill(this.seconds % 60);
    },
  },
});
