<template>
    <ion-page v-nav="{title: '单选框'}">
        <ion-content>

            <ion-radio-group title="请选择性别" :options="genderOptions" v-model="gender" @onChange="change"></ion-radio-group>

            <p class="padding">
                option gender: {{ gender }}<br>
                option selected: {{ selected }}
                option selected: {{ selected2 }}
            </p>

            <ion-radio-group title="设置整个Radio的颜色" :options="list" v-model="selected" color="danger" @onChange="change"></ion-radio-group>
            <ion-radio-group title="设置每个Option的颜色" :options="list2" v-model="selected2" @onChange="change"></ion-radio-group>


            <ion-list radio-group v-model="language">
                <ion-list-header>
                    Language
                </ion-list-header>

                <ion-item>
                    <ion-label slot="item-label">Python</ion-label>
                    <ion-radio slot="item-content" value="Python" checked="true" color="danger"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Ruby</ion-label>
                    <ion-radio slot="item-content" value="Ruby" disabled color="secondary"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">Java</ion-label>
                    <ion-radio slot="item-content" value="Java"></ion-radio>
                </ion-item>

                <ion-item>
                    <ion-label slot="item-label">PHP</ion-label>
                    <ion-radio slot="item-content" value="PHP"></ion-radio>
                </ion-item>
            </ion-list>
            <p class="padding">
                Language : {{ language }}<br>
            </p>

        </ion-content>
    </ion-page>
</template>
<script>
    export default{
      data () {
        return {
          gender: '女',
          genderOptions: ['男', '女', '保密'],
          selected: false,
          selected2: false,
          language: 'Ruby',
          list: [{value: true, label: '是'}, {value: false, label: '否'}, {value: 'true1', label: '是1', disabled: true}, {value: 'gfgfgf', label: '否2-RED'}],
          list2: [{value: true, label: 'secondary', color: 'secondary'}, {value: false, label: 'dark', color: 'dark'}, {value: 'true1', label: 'disabled', disabled: true}, {value: 'gfgfgf', label: 'danger', color: 'danger'}]
        }
      },
      methods: {
        change (value) {
          console.log('change:', value)
        }
      }
    }
</script>
