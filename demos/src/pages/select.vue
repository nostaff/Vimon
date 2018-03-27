<template>
    <vm-page v-nav="{title: 'Select'}">
        <vm-content class="outer-content">

            <vm-list>
                <vm-list-header>Single Value Select</vm-list-header>
                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select v-model="gender" @onChange="onChange">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Hair Color</vm-label>
                    <vm-select v-model="hairColor" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <vm-option v-for="o in hairColorData" :key="o.value" :value="o.value">{{o.text}}</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Gaming</vm-label>
                    <vm-select v-model="gaming" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <vm-option value="nes">NES</vm-option>
                        <vm-option value="n64">Nintendo64</vm-option>
                        <vm-option value="ps" disabled="true">PlayStation</vm-option>
                        <vm-option value="genesis">Sega Genesis</vm-option>
                        <vm-option value="saturn">Sega Saturn</vm-option>
                        <vm-option value="snes">SNES</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Date</vm-label>
                    <vm-select @onChange="monthChange($event)">
                        <vm-option value="01">January</vm-option>
                        <vm-option value="02">February</vm-option>
                        <vm-option value="03" selected="true">March</vm-option>
                        <vm-option value="04">April</vm-option>
                        <vm-option value="05">May</vm-option>
                        <vm-option value="06">June</vm-option>
                        <vm-option value="07">July</vm-option>
                        <vm-option value="08">August</vm-option>
                        <vm-option value="09">September</vm-option>
                        <vm-option value="10">October</vm-option>
                        <vm-option value="11">November</vm-option>
                        <vm-option value="12">December</vm-option>
                    </vm-select>
                    <vm-select @onChange="yearChange($event)">
                        <vm-option>1989</vm-option>
                        <vm-option>1990</vm-option>
                        <vm-option>1991</vm-option>
                        <vm-option>1992</vm-option>
                        <vm-option>1993</vm-option>
                        <vm-option selected="true">1994</vm-option>
                        <vm-option>1995</vm-option>
                        <vm-option>1996</vm-option>
                        <vm-option>1997</vm-option>
                        <vm-option>1998</vm-option>
                        <vm-option>1999</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Disabled</vm-label>
                    <vm-select disabled="true" @onChange="onChange">
                        <vm-option>I'm not disabled</vm-option>
                        <vm-option selected="true">I'm disabled</vm-option>
                        <vm-option>I'm not disabled, either</vm-option>
                    </vm-select>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>Popover Interface Select</vm-list-header>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select v-model="gender" interface="popover" @onChange="onChange">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Gaming</vm-label>
                    <vm-select v-model="gaming" okText="Okay" cancelText="Dismiss" interface="popover" @onChange="onChange">
                        <vm-option value="nes">NES</vm-option>
                        <vm-option value="n64">Nintendo64</vm-option>
                        <vm-option value="ps">PlayStation</vm-option>
                        <vm-option value="genesis">Sega Genesis</vm-option>
                        <vm-option value="saturn">Sega Saturn</vm-option>
                        <vm-option value="snes">SNES</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Date</vm-label>
                    <vm-select @onChange="monthChange($event)" interface="popover">
                        <vm-option value="01">January</vm-option>
                        <vm-option value="02">February</vm-option>
                        <vm-option value="03" selected="true">March</vm-option>
                        <vm-option value="04">April</vm-option>
                        <vm-option value="05">May</vm-option>
                        <vm-option value="06">June</vm-option>
                        <vm-option value="07">July</vm-option>
                        <vm-option value="08">August</vm-option>
                        <vm-option value="09">September</vm-option>
                        <vm-option value="10">October</vm-option>
                        <vm-option value="11">November</vm-option>
                        <vm-option value="12">December</vm-option>
                    </vm-select>
                    <vm-select @onChange="yearChange($event)" interface="popover">
                        <vm-option>1989</vm-option>
                        <vm-option>1990</vm-option>
                        <vm-option>1991</vm-option>
                        <vm-option>1992</vm-option>
                        <vm-option>1993</vm-option>
                        <vm-option selected="true">1994</vm-option>
                        <vm-option>1995</vm-option>
                        <vm-option>1996</vm-option>
                        <vm-option>1997</vm-option>
                        <vm-option>1998</vm-option>
                        <vm-option>1999</vm-option>
                    </vm-select>
                </vm-item>

            </vm-list>

            <vm-list>
                <vm-list-header>Multiple Value Select</vm-list-header>

                <vm-item>
                    <vm-label>Toppings</vm-label>
                    <vm-select v-model="toppings" multiple="true" cancelText="Nah" okText="Okay!" @onChange="onChange">
                        <vm-option value="bacon">Bacon</vm-option>
                        <vm-option value="olives">Black Olives</vm-option>
                        <vm-option value="xcheese">Extra Cheese</vm-option>
                        <vm-option value="peppers">Green Peppers</vm-option>
                        <vm-option value="mushrooms">Mushrooms</vm-option>
                        <vm-option value="onions">Onions</vm-option>
                        <vm-option value="pepperoni">Pepperoni</vm-option>
                        <vm-option value="pineapple">Pineapple</vm-option>
                        <vm-option value="sausage">Sausage</vm-option>
                        <vm-option value="Spinach">Spinach</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Pets</vm-label>
                    <vm-select v-model="pets" multiple="true" :selectOptions="petAlertOpts" @onChange="onChange">
                        <vm-option v-for="o in petData" :key="o.value" :value="o.value">{{o.text}}</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Skittles</vm-label>
                    <vm-select v-model="skittles" multiple="true" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <vm-option v-for="o in skittlesData" :key="o.value" :value="o.value">{{o.text}}</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Disabled</vm-label>
                    <vm-select  disabled="true" multiple="true" @onChange="onChange">
                        <vm-option>disabled0</vm-option>
                        <vm-option selected="true">disabled1 ad</vm-option>
                        <vm-option>disabled2</vm-option>
                    </vm-select>
                </vm-item>

            </vm-list>

            <vm-list>
                <vm-list-header>Action Sheet Interface Select</vm-list-header>

                <vm-item>
                    <vm-label>Mute Notifications</vm-label>
                    <vm-select v-model="notifications" interface="action-sheet" @onChange="onChange">
                        <vm-option value="mute_15">For 15 Minutes</vm-option>
                        <vm-option value="mute_1">For 1 Hour</vm-option>
                        <vm-option value="mute_23">For 24 Hours</vm-option>
                        <vm-option value="mute_inf">Until I turn it back on</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Rating</vm-label>
                    <vm-select v-model="rating" interface="action-sheet" @onChange="onChange">
                        <vm-option value="1">1 Star</vm-option>
                        <vm-option value="2">2 Stars</vm-option>
                        <vm-option value="3">3 Stars</vm-option>
                        <vm-option value="4">4 Stars</vm-option>
                        <vm-option value="5">5 Stars</vm-option>
                    </vm-select>
                </vm-item>

            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
import { Button, List, ListHeader, Item, Icon, Label, Select, Option } from 'vimon'
export default {
  name: 'DemoSelect',
  components: {
    'vm-button': Button,
    'vm-list': List,
    'vm-list-header': ListHeader,
    'vm-item': Item,
    'vm-icon': Icon,
    'vm-label': Label,
    'vm-select': Select,
    'vm-option': Option
  },
  data () {
    return {
      gender: '',
      gaming: '',
      toppings: [],
      petAlertOpts: null,
      petData: null,
      pets: '',
      hairColorData: null,
      hairColor: null,
      skittlesData: null,
      skittles: '',
      notifications: 'mute_1',
      rating: 2
    }
  },

  created () {
    this.gender = 'f'
    this.gaming = 'ps'

    this.petAlertOpts = {
      title: 'Like Pets?',
      subTitle: 'Select your favorite'
    }

    this.toppings = ['bacon', 'xcheese']

    this.petData = [
      {text: 'Bird', value: 'bird'},
      {text: 'Cat', value: 'cat'},
      {text: 'Dog', value: 'dog'},
      {text: 'Honey Badger', value: 'honeybadger'}
    ]

    this.hairColorData = [
      {text: 'Brown', value: 'brown'},
      {text: 'Blonde', value: 'blonde'},
      {text: 'Black', value: 'black'},
      {text: 'Red', value: 'red'}
    ]

    // Pre-selected object with different object reference
    this.hairColor = ['brown']

    this.skittlesData = [
      {text: 'Red', value: 'red'},
      {text: 'Orange', value: 'orange'},
      {text: 'Yellow', value: 'yellow'},
      {text: 'Green', value: 'green'},
      {text: 'Purple', value: 'purple'}
    ]

    this.skittles = ['red', 'purple']

    this.pets = ['cat', 'dog']
  },

  methods: {
    compareFn (option1, option2) {
      return option1.value === option2.value
    },

    monthChange (val) {
      console.log('Month Change:', val)
    },

    yearChange (val) {
      console.log('Year Change:', val)
    },
    onChange (val) {
      console.log('onChange:', val)
    }
  }
}
</script>
