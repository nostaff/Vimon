<template>
  <vm-page v-nav="{title: 'Datetime'}">
    <vm-header>

      <vm-navbar>
        <vm-title>DateTime</vm-title>
      </vm-navbar>

    </vm-header>

    <vm-content class="outer-content">

      <vm-list>
        <vm-list-header>Web Release Dates</vm-list-header>

        <vm-item>
          <vm-label>World Wide Web</vm-label>
          <vm-datetime displayFormat="YYYY" min="1981" max="2002" v-model="wwwReleased"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Netscape</vm-label>
          <vm-datetime displayFormat="MMMM YY" min="1989" max="2004" v-model="netscapeReleased"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Opera</vm-label>
          <vm-datetime displayFormat="DDD DD.MM.YY" min="1990" max="2000" :dayShortNames="operaShortDay" v-model="operaReleased"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Webkit</vm-label>
          <vm-datetime displayFormat="D MMM YYYY" min="1990-02" max="2010-10" v-model="webkitReleased"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Firefox</vm-label>
          <vm-datetime displayFormat="MMM DD, YYYY" min="1994-03-14" max="2012-12-09" v-model="firefoxReleased"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Chrome</vm-label>
          <vm-datetime displayFormat="DDDD MMM D, YYYY" min="2005" max="2016" v-model="chromeReleased"></vm-datetime>
        </vm-item>
      </vm-list>

      <vm-list>
        <vm-list-header>World Times</vm-list-header>

        <vm-item>
          <vm-label>Tokyo</vm-label>
          <vm-datetime displayFormat="hh:mm A" v-model="tokyoTime"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Paris</vm-label>
          <vm-datetime displayFormat="HH:mm" v-model="parisTime"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label>Madison</vm-label>
          <vm-datetime displayFormat="h:mm a" v-model="madisonTime"></vm-datetime>
        </vm-item>

      </vm-list>

      <vm-list>
        <vm-list-header>Set Alarm</vm-list-header>

        <vm-item>
          <vm-label>Alert</vm-label>
          <vm-datetime displayFormat="mm" minuteValues="0,15,30,45" v-model="alertTime"></vm-datetime>
        </vm-item>
      </vm-list>

    </vm-content>
  </vm-page>
</template>
<script>
  export default {
    data () {
      return {
        wwwReleased: '1991',
        netscapeReleased: '1994-12-15T13:47:20.789',
        operaReleased: '1995-04-15',
        webkitReleased: '1998-11-04T11:06Z',
        firefoxReleased: '2002-09-23T15:03:46.789',
        chromeReleased: '2008-09-02',

        tokyoTime: '',
        parisTime: '',
        madisonTime: '',
        alertTime: '10:15',

        operaShortDay: [
          's\u00f8n',
          'man',
          'tir',
          'ons',
          'tor',
          'fre',
          'l\u00f8r'
        ]
      }
    },
    created () {
      this.tokyoTime = this.calculateTime('+9')
      this.parisTime = this.calculateTime('+1')
      this.madisonTime = this.calculateTime('-6')

      // If it is Daylight Savings Time
      if (this.dst(new Date())) {
        this.parisTime = this.calculateTime('+2')
        this.madisonTime = this.calculateTime('-5')
      }
    },
    methods: {
      change (value) {
        console.log('change:', value)
      },
      calculateTime (offset) {
        // create Date object for current location
        let d = new Date()

        // create new Date object for different city
        // using supplied offset
        let nd = new Date(d.getTime() + (3600000 * offset))

        return nd.toISOString()
      },

      // Determine if the client uses DST
      stdTimezoneOffset (today) {
        let jan = new Date(today.getFullYear(), 0, 1)
        let jul = new Date(today.getFullYear(), 6, 1)
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
      },

      dst (today) {
        return today.getTimezoneOffset() < this.stdTimezoneOffset(today)
      }
    }
  }
</script>
