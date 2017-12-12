<template>
    <ion-page v-nav="{title: 'Select'}">
        <ion-content>

            <ion-list>
                <ion-list-header>Single Value Select</ion-list-header>
                <ion-item>
                    <ion-label slot="item-label">Gender</ion-label>
                    <ion-select slot="item-content" v-model="gender" @onChange="onChange">
                        <ion-option value="f">Female</ion-option>
                        <ion-option value="m">Male</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Hair Color</ion-label>
                    <ion-select slot="item-content" v-model="hairColor" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <ion-option v-for="o in hairColorData" :key="o.value" :value="o.value">{{o.text}}</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Gaming</ion-label>
                    <ion-select slot="item-content" v-model="gaming" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <ion-option value="nes">NES</ion-option>
                        <ion-option value="n64">Nintendo64</ion-option>
                        <ion-option value="ps" disabled="true">PlayStation</ion-option>
                        <ion-option value="genesis">Sega Genesis</ion-option>
                        <ion-option value="saturn">Sega Saturn</ion-option>
                        <ion-option value="snes">SNES</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Date</ion-label>
                    <ion-select slot="item-content" @onChange="monthChange($event)">
                        <ion-option value="01">January</ion-option>
                        <ion-option value="02">February</ion-option>
                        <ion-option value="03" selected="true">March</ion-option>
                        <ion-option value="04">April</ion-option>
                        <ion-option value="05">May</ion-option>
                        <ion-option value="06">June</ion-option>
                        <ion-option value="07">July</ion-option>
                        <ion-option value="08">August</ion-option>
                        <ion-option value="09">September</ion-option>
                        <ion-option value="10">October</ion-option>
                        <ion-option value="11">November</ion-option>
                        <ion-option value="12">December</ion-option>
                    </ion-select>
                    <ion-select slot="item-content" @onChange="yearChange($event)">
                        <ion-option>1989</ion-option>
                        <ion-option>1990</ion-option>
                        <ion-option>1991</ion-option>
                        <ion-option>1992</ion-option>
                        <ion-option>1993</ion-option>
                        <ion-option selected="true">1994</ion-option>
                        <ion-option>1995</ion-option>
                        <ion-option>1996</ion-option>
                        <ion-option>1997</ion-option>
                        <ion-option>1998</ion-option>
                        <ion-option>1999</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Disabled</ion-label>
                    <ion-select slot="item-content" disabled="true" @onChange="onChange">
                        <ion-option>I'm not disabled</ion-option>
                        <ion-option selected="true">I'm disabled</ion-option>
                        <ion-option>I'm not disabled, either</ion-option>
                    </ion-select>
                </ion-item>
            </ion-list>

            <ion-list>
                <ion-list-header>Popover Interface Select</ion-list-header>

                <ion-item>
                    <ion-label slot="item-label">Gender</ion-label>
                    <ion-select slot="item-content" v-model="gender" interface="popover" @onChange="onChange">
                        <ion-option value="f">Female</ion-option>
                        <ion-option value="m">Male</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Gaming</ion-label>
                    <ion-select slot="item-content" v-model="gaming" okText="Okay" cancelText="Dismiss" interface="popover" @onChange="onChange">
                        <ion-option value="nes">NES</ion-option>
                        <ion-option value="n64">Nintendo64</ion-option>
                        <ion-option value="ps">PlayStation</ion-option>
                        <ion-option value="genesis">Sega Genesis</ion-option>
                        <ion-option value="saturn">Sega Saturn</ion-option>
                        <ion-option value="snes">SNES</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Date</ion-label>
                    <ion-select slot="item-content" @onChange="monthChange($event)" interface="popover">
                        <ion-option value="01">January</ion-option>
                        <ion-option value="02">February</ion-option>
                        <ion-option value="03" selected="true">March</ion-option>
                        <ion-option value="04">April</ion-option>
                        <ion-option value="05">May</ion-option>
                        <ion-option value="06">June</ion-option>
                        <ion-option value="07">July</ion-option>
                        <ion-option value="08">August</ion-option>
                        <ion-option value="09">September</ion-option>
                        <ion-option value="10">October</ion-option>
                        <ion-option value="11">November</ion-option>
                        <ion-option value="12">December</ion-option>
                    </ion-select>
                    <ion-select slot="item-content" @onChange="yearChange($event)" interface="popover">
                        <ion-option>1989</ion-option>
                        <ion-option>1990</ion-option>
                        <ion-option>1991</ion-option>
                        <ion-option>1992</ion-option>
                        <ion-option>1993</ion-option>
                        <ion-option selected="true">1994</ion-option>
                        <ion-option>1995</ion-option>
                        <ion-option>1996</ion-option>
                        <ion-option>1997</ion-option>
                        <ion-option>1998</ion-option>
                        <ion-option>1999</ion-option>
                    </ion-select>
                </ion-item>

            </ion-list>

            <ion-list>
                <ion-list-header>Multiple Value Select</ion-list-header>

                <ion-item>
                    <ion-label slot="item-label">Toppings</ion-label>
                    <ion-select slot="item-content" v-model="toppings" multiple="true" cancelText="Nah" okText="Okay!" @onChange="onChange">
                        <ion-option value="bacon">Bacon</ion-option>
                        <ion-option value="olives">Black Olives</ion-option>
                        <ion-option value="xcheese">Extra Cheese</ion-option>
                        <ion-option value="peppers">Green Peppers</ion-option>
                        <ion-option value="mushrooms">Mushrooms</ion-option>
                        <ion-option value="onions">Onions</ion-option>
                        <ion-option value="pepperoni">Pepperoni</ion-option>
                        <ion-option value="pineapple">Pineapple</ion-option>
                        <ion-option value="sausage">Sausage</ion-option>
                        <ion-option value="Spinach">Spinach</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Pets</ion-label>
                    <ion-select slot="item-content" v-model="pets" multiple="true" :selectOptions="petAlertOpts" @onChange="onChange">
                        <ion-option v-for="o in petData" :key="o.value" :value="o.value">{{o.text}}</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Skittles</ion-label>
                    <ion-select slot="item-content" v-model="skittles" multiple="true" okText="Okay" cancelText="Dismiss" @onChange="onChange">
                        <ion-option v-for="o in skittlesData" :key="o.value" :value="o.value">{{o.text}}</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Disabled</ion-label>
                    <ion-select slot="item-content"  disabled="true" multiple="true" @onChange="onChange">
                        <ion-option>disabled0</ion-option>
                        <ion-option selected="true">disabled1 ad</ion-option>
                        <ion-option>disabled2</ion-option>
                    </ion-select>
                </ion-item>

            </ion-list>

            <ion-list>
                <ion-list-header>Action Sheet Interface Select</ion-list-header>

                <ion-item>
                    <ion-label slot="item-label">Mute Notifications</ion-label>
                    <ion-select slot="item-content" v-model="notifications" interface="action-sheet" @onChange="onChange">
                        <ion-option value="mute_15">For 15 Minutes</ion-option>
                        <ion-option value="mute_1">For 1 Hour</ion-option>
                        <ion-option value="mute_23">For 24 Hours</ion-option>
                        <ion-option value="mute_inf">Until I turn it back on</ion-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Rating</ion-label>
                    <ion-select slot="item-content" v-model="rating" interface="action-sheet" @onChange="onChange">
                        <ion-option value="1">1 Star</ion-option>
                        <ion-option value="2">2 Stars</ion-option>
                        <ion-option value="3">3 Stars</ion-option>
                        <ion-option value="4">4 Stars</ion-option>
                        <ion-option value="5">5 Stars</ion-option>
                    </ion-select>
                </ion-item>

            </ion-list>
        </ion-content>
    </ion-page>
</template>
<script>
    export default {
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
