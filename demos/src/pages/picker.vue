<template>
  <vm-page v-nav="{title: 'Picker'}">
    <vm-content>

      <vm-list title="Datetime">
        <vm-item>
          <vm-label slot="item-label">Time</vm-label>
          <vm-datetime slot="item-content" displayFormat="HH:mm" v-model="time"
                        placeholder="time"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label slot="item-label">Time</vm-label>
          <vm-datetime slot="item-content" displayFormat="hh:mm A" v-model="time"
                        placeholder="time"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label slot="item-label">Birthday</vm-label>
          <vm-datetime slot="item-content" v-model="birthday" placeholder="birthday" minDate="2002-02-01"
                        displayFormat="YYYY-MM-DD"></vm-datetime>
        </vm-item>

        <vm-item>
          <vm-label slot="item-label">Birthday</vm-label>
          <vm-datetime slot="item-content" v-model="birthday" placeholder="birthday" minDate="2002-02-01"
                        displayFormat="DD/MM/YY"></vm-datetime>
        </vm-item>
      </vm-list>
      <div padding-horizontal>
        <vm-button block @click.native="setDate()" color="secondary">设置日期为 2012-06-25</vm-button>
      </div>
      <br>
      <br>
      <p><span>当前日期为：{{birthday}} 当前时间为：{{time}}</span></p>
      <br>
      <vm-list title="Address">
        <vm-item>
          <vm-label slot="item-label">Value</vm-label>
          <vm-note slot="item-content">{{areaValue}}</vm-note>
        </vm-item>

        <vm-item>
          <vm-label slot="item-label">Text</vm-label>
          <vm-address slot="item-content" :level="2" v-model="areaValue" placeholder="Select Address"></vm-address>
        </vm-item>

        <vm-item>
        </vm-item>
        <vm-item>
          <vm-label slot="item-label">Value</vm-label>
          <vm-note slot="item-content">{{areaValue1}}</vm-note>
        </vm-item>

        <vm-item>
          <vm-label slot="item-label">Text</vm-label>
          <vm-address slot="item-content" :level="3" v-model="areaValue1" placeholder="Select Address"></vm-address>
        </vm-item>
      </vm-list>

      <div padding-horizontal>
        <vm-button block @click.native="setAddress()" color="secondary">设置地址为 ['广东省', '深圳市', '南山区']</vm-button>
        <br>
        <br>
        <br>
        <vm-button block @click.native="normal()">点我弹出</vm-button>
        <br>
        <vm-button block @click.native="chain()">地址联动</vm-button>
        <br>
        <br>
        <br>
      </div>

    </vm-content>
  </vm-page>
</template>
<script>
  const buttonItems = [
    {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'callccc',
      handler: () => {
        console.log('Delete clicked')
      }
    },
    {
      text: 'OK',
      role: 'ok',
      cssClass: 'adasdasd',
      handler: () => {
        console.log('Share clicked')
      }
    },
    {
      text: 'Submit',
      role: 'submit',
      handler: () => {
        console.log('Share clicked')
        return false // 不关闭对话框
      }
    }
  ]

  const columnItems = [
    {
      name: 'Year',
      align: 'left',
      selectedIndex: 30,
      options: [],
      onChange: (option) => {
        console.log('Year onChange', option)
      }
    },
    {
      name: 'Month',
      align: 'left',
      selectedIndex: 5,
      options: [],
      onChange: (option) => {
        console.log('Month onChange', option)
      }
    }
  ]

  for (var i = 1970; i <= 2017; i++) {
    columnItems[0].options.push({text: i, value: i})
  }

  for (var j = 1; j <= 12; j++) {
    columnItems[1].options.push({text: j, value: j})
  }

  const areas = [{
    text: '中国',
    value: 'china',
    parent: 0
  }, {
    text: '美国',
    value: 'USA',
    parent: 0
  }, {
    text: '广东',
    value: 'china001',
    parent: 'china'
  }, {
    text: '广西',
    value: 'china002',
    parent: 'china'
  }, {
    text: '美国001',
    value: 'usa001',
    parent: 'USA'
  }, {
    text: '美国002',
    value: 'usa002',
    parent: 'USA'
  }, {
    text: '广州',
    value: 'gz',
    parent: 'china001'
  }, {
    text: '深圳',
    value: 'sz',
    parent: 'china001'
  }, {
    text: '广西001',
    value: 'gz',
    parent: 'china002'
  }, {
    text: '广西002',
    value: 'sz',
    parent: 'china002'
  }, {
    text: '美国001_001',
    value: '0003',
    parent: 'usa001'
  }, {
    text: '美国001_002',
    value: '0004',
    parent: 'usa001'
  }, {
    text: '美国002_001',
    value: '0005',
    parent: 'usa002'
  }, {
    text: '美国002_002',
    value: '0006',
    parent: 'usa002'
  }]

  export default {
    data () {
      return {
        time: '18:05',
        birthday: '2012-06-26',

        areaValue: ['天津市', '市辖区', '和平区'],
        areaValue1: ['430000', '430400', '430407']

      }
    },
    methods: {
      normal () {
        this.$picker.present({
          cssClass: 'a b',
          buttons: buttonItems,
          columns: columnItems
        }).then((res) => {
          console.log('button clicked: ', res)
        })
      },

      chain () {
        this.$picker.present({
          buttons: buttonItems,
          columns: areas,
          isChain: true,
          deep: 3
        }).then((res) => {
          console.log('button clicked: ', res)
        })
      },

      setAddress () {
        this.areaValue1 = ['广东省', '深圳市', '南山区']
      },

      setDate () {
        this.birthday = '2012-06-25'
      }

    }
  }
</script>
