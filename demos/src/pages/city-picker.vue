<template>
      <vm-page v-nav="{title: 'City Picker'}">
        <vm-content padding>

            <h5>简介</h5>
            <p>
                城市选择器使用的是本地数据库进行地址匹配, 使用的是Picker组件.
            </p>
            <h5>Picker组件</h5>
            <p><strong>初始值: </strong>{{selectedCity}}</p>
            <p><strong>当前选择的值</strong>: {{province}}-{{city}}-{{district}}</p>
            <vm-button block @click="openCityPicker">城市选择（本地数据）</vm-button>
            <vm-button block outline @click="openCityPicker2">城市选择（远程数据）</vm-button>
        </vm-content>
    </vm-page>
</template>

<script type="text/javascript">
import axios from 'axios'
import { Button, CityPicker, Indicator } from 'vimon'

export default {
  name: 'name',
  components: {
    'vm-button': Button
  },
  data () {
    return {
      selectedCity: ['140000', '140100', '140106'],
      province: '山西省',
      city: '太原市',
      district: '迎泽区'
    }
  },
  methods: {
    /**
     * 打开由Picker组件实现的城市选择器
     */
    openCityPicker () {
      console.log('openCityPicker')
      const _this = this
      CityPicker.present({
        onSelect (data) {
          let tmp = []
          if (data.province) { _this.province = data.province.text; tmp.push(data.province.value.toString()) }
          if (data.city) { _this.city = data.city.text; tmp.push(data.city.value.toString()) }
          if (data.district) { _this.district = data.district.text; tmp.push(data.district.value.toString()) }
          _this.selectedCity = tmp
        },
        onCancel () {
          console.log('onCancel')
        },
        selectedCity: this.selectedCity
      })
    },
    openCityPicker2 () {
      console.log('openCityPicker')
      const _this = this
      CityPicker.present({
        onSelect (data) {
          let tmp = []
          if (data.province) { _this.province = data.province.text; tmp.push(data.province.value.toString()) }
          if (data.city) { _this.city = data.city.text; tmp.push(data.city.value.toString()) }
          if (data.district) { _this.district = data.district.text; tmp.push(data.district.value.toString()) }
          _this.selectedCity = tmp
        },
        onCancel () {
          console.log('onCancel')
        },
        selectedCity: this.selectedCity,
        fetchData (code) {
          Indicator.present()
          return new Promise((resolve) => {
            if (code) {
              axios(`https://raw.githubusercontent.com/vm-component/vm-address-json/master/data/${code}.json`)
                .then((response) => {
                  response.data.forEach((item) => {
                    item.text = item.divisionName
                    item.value = item.divisionCode
                    item.disabled = false
                  })
                  resolve(response.data)
                  Indicator.dismiss()
                })
                .catch(() => {
                  resolve([])
                  console.error('无法获取数据')
                  Indicator.dismiss()
                })
            } else {
              resolve([])
              console.error('没有查询的code值')
              Indicator.dismiss()
            }
          })
        }
      })
    }
  }
}
</script>
