<template>
    <vm-page v-nav="{title: 'Radio'}">
        <vm-content class="outer-content">

            <vm-radio-group title="请选择性别" :options="genderOptions" v-model="gender" @onChange="change"></vm-radio-group>

            <p class="padding">
                option gender: {{ gender }}<br>
                option selected: {{ selected }}
                option selected: {{ selected2 }}
            </p>

            <vm-radio-group title="设置整个Radio的颜色" :options="list" v-model="selected" color="danger" @onChange="change"></vm-radio-group>
            <vm-radio-group title="设置每个Option的颜色" :options="list2" v-model="selected2" @onChange="change"></vm-radio-group>

            <vm-list radio-group v-model="language">
                <vm-list-header>
                    Language
                </vm-list-header>

                <vm-item>
                    <vm-label>Python</vm-label>
                    <vm-radio slot="item-end" value="Python" checked="true" color="danger"></vm-radio>
                </vm-item>

                <vm-item>
                    <vm-label>Ruby</vm-label>
                    <vm-radio slot="item-end" value="Ruby" disabled color="secondary"></vm-radio>
                </vm-item>

                <vm-item>
                    <vm-label>Java</vm-label>
                    <vm-radio slot="item-end" value="Java"></vm-radio>
                </vm-item>

                <vm-item>
                    <vm-label>PHP</vm-label>
                    <vm-radio slot="item-end" value="PHP"></vm-radio>
                </vm-item>
            </vm-list>
            <p class="padding">
                Language : {{ language }}<br>
            </p>

        </vm-content>
    </vm-page>
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
