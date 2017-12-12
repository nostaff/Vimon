<template>
  <ion-page v-nav="{title: 'Datetime'}">
    <ion-header>

      <ion-navbar>
        <ion-title>DateTime</ion-title>
      </ion-navbar>

    </ion-header>

    <ion-content class="outer-content">

      <ion-list>
        <ion-list-header>Web Release Dates</ion-list-header>

        <ion-item>
          <ion-label slot="item-label">World Wide Web</ion-label>
          <ion-datetime slot="item-content" displayFormat="YYYY" min="1981" max="2002" v-model="wwwReleased"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Netscape</ion-label>
          <ion-datetime slot="item-content" displayFormat="MMMM YY" min="1989" max="2004" v-model="netscapeReleased"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Opera</ion-label>
          <ion-datetime slot="item-content" displayFormat="DDD DD.MM.YY" min="1990" max="2000" :dayShortNames="operaShortDay" v-model="operaReleased"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Webkit</ion-label>
          <ion-datetime slot="item-content" displayFormat="D MMM YYYY" min="1990-02" max="2010-10" v-model="webkitReleased"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Firefox</ion-label>
          <ion-datetime slot="item-content" displayFormat="MMM DD, YYYY" min="1994-03-14" max="2012-12-09" v-model="firefoxReleased"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Chrome</ion-label>
          <ion-datetime slot="item-content" displayFormat="DDDD MMM D, YYYY" min="2005" max="2016" v-model="chromeReleased"></ion-datetime>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>World Times</ion-list-header>

        <ion-item>
          <ion-label slot="item-label">Tokyo</ion-label>
          <ion-datetime slot="item-content" displayFormat="hh:mm A" v-model="tokyoTime"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Paris</ion-label>
          <ion-datetime slot="item-content" displayFormat="HH:mm" v-model="parisTime"></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label slot="item-label">Madison</ion-label>
          <ion-datetime slot="item-content" displayFormat="h:mm a" v-model="madisonTime"></ion-datetime>
        </ion-item>

      </ion-list>

      <ion-list>
        <ion-list-header>Set Alarm</ion-list-header>

        <ion-item>
          <ion-label slot="item-label">Alert</ion-label>
          <ion-datetime slot="item-content" displayFormat="mm" minuteValues="0,15,30,45" v-model="alertTime"></ion-datetime>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
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
