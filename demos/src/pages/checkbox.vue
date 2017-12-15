<template>
    <vm-page v-nav="{title: 'Checkbox'}">
        <vm-content class="outer-content">

            <vm-checkbox-group title="选择感兴趣的板块:" :options="topics" v-model="chosenTopics" @onChange="change"></vm-checkbox-group>

            <p class="padding">
                chosen Topics: {{ chosenTopics }}
            </p>

            <vm-checkbox-group title="去过的省份:" label-position="left" color="secondary" :options="lists" v-model="chosenAreas" @onChange="change"></vm-checkbox-group>

            <p class="padding">
                chosen Areas: {{ chosenAreas }}
            </p>

            <vm-checkbox-group title="设置选项的颜色:" :options="lists2" v-model="chosenAreas2" @onChange="change"></vm-checkbox-group>

            <p class="padding">
                chosen Areas: {{ chosenAreas2 }}
            </p>

            <vm-list title="Data">

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.jon"></vm-checkbox>
                    <vm-label>Jon Snow</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.daenerys" color="danger"></vm-checkbox>
                    <vm-label>Daenerys Targaryen</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.arya" disabled></vm-checkbox>
                    <vm-label>Arya Stark</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.tyroin" color="secondary"></vm-checkbox>
                    <vm-label>Tyrion Lannister</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.sansa" color="danger"></vm-checkbox>
                    <vm-label>Sansa Stark</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.khal"></vm-checkbox>
                    <vm-label>Khal Drogo</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.cersei" color="dark"></vm-checkbox>
                    <vm-label>Cersei Lannister</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.stannis"></vm-checkbox>
                    <vm-label>Stannis Baratheon</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.petyr" disabled></vm-checkbox>
                    <vm-label>Petyr Baelish</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.hodor" color="dark"></vm-checkbox>
                    <vm-label>Hodor</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.catelyn" color="secondary"></vm-checkbox>
                    <vm-label>Catelyn Stark</vm-label>
                </vm-item>

                <vm-item>
                    <vm-checkbox slot="item-start" v-model="data.bronn" color="danger"></vm-checkbox>
                    <vm-label>Bronn</vm-label>
                </vm-item>

            </vm-list>

            <p class="padding">
                chosen Data: {{ data }}
            </p>

        </vm-content>
    </vm-page>
</template>
<script>
    export default{
      data () {
        return {
          chosenTopics: ['电影', '科技'],
          chosenAreas: ['gd', 'sd'],
          chosenAreas2: ['bj', 'gd', 'sd'],
          topics: ['娱乐', '电影', '减肥', '搞笑', '科技'],
          lists: [{value: 'gd', label: '广东'}, {value: 'gx', label: '广西'}, {value: 'sd', label: '山东'}, {value: 'sx', label: '山西'}],
          lists2: [{value: 'bj', label: '北京', color: 'dark'}, {value: 'gd', label: '广东', color: 'primary'}, {value: 'gx', label: '广西', color: 'secondary'}, {value: 'sd', label: '山东', color: 'light', disabled: true}, {value: 'sx', label: '山西', color: 'danger'}],
          data: {
            jon: true,
            daenerys: true,
            arya: false,
            tyroin: false,
            sansa: true,
            khal: false,
            cersei: true,
            stannis: true,
            petyr: false,
            hodor: true,
            catelyn: true,
            bronn: false
          }
        }
      },
      methods: {
        change (value) {
          console.log('change:', value)
        }
      }
    }
</script>
