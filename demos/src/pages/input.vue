<template>
  <vm-page v-nav="{title: 'Input'}">
    <vm-content class="outer-content">

      <vm-list title="Layout">
        <vm-item>
          <vm-label fixed>Fixed Label</vm-label>
          <vm-input type="text"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label>Inline Label：</vm-label>
          <vm-input type="text"></vm-input>
        </vm-item>
        <vm-item>
          <vm-input placeholder="No Label"></vm-input>
        </vm-item>
        <vm-item>
          <vm-label floating>Floating Label</vm-label>
          <vm-input></vm-input>
        </vm-item>
        <vm-item>
          <vm-label stacked>Stacked Label</vm-label>
          <vm-input stacked></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="Clear Input">
        <vm-item>
          <vm-input v-model="normalValue" placeholder="Clear Input" clearInput></vm-input>
        </vm-item>
        <vm-item>
          <vm-label>Value:</vm-label>
          <span slot="item-end">{{normalValue}}</span>
        </vm-item>
      </vm-list>

      <vm-list title="Debounce">
        <vm-item>
          <vm-input v-model="debounceValue" :debounce="1000" placeholder="Debounce 1000ms" clearInput></vm-input>
        </vm-item>
        <vm-item>
          <vm-label>Value:</vm-label>
          <span slot="item-end">{{debounceValue}}</span>
        </vm-item>
      </vm-list>

      <vm-list title="Focus Highlight">
        <vm-item>
          <vm-label color="primary">Username:</vm-label>
          <vm-input :showFocusHighlight="true"  placeholder="Username" clearInput></vm-input>
        </vm-item>
        <vm-item>
          <vm-label color="secondary">Password:</vm-label>
          <vm-input type="password" :showFocusHighlight="true"  placeholder="Password" clearInput></vm-input>
        </vm-item>
      </vm-list>

      <vm-list title="Validator">
          <vm-item>
              <vm-label stacked>昵称 (type: nickName)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      @onInvalid="showInvalidToast('输入的昵称有误, 前检查!')"
                      placeholder="中英文字母、数字、'-'、'_'组成"
                      type="nickName" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>整数 (type: integer)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入整数" type="integer" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>电话 (type: tel)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入电话" type="tel" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>URL (type: url)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入url" type="url" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>手机号 (type: mobile)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入手机号" type="mobile" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>邮箱 (type: email)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入邮箱" type="email" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>密码 (type: password)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="密码需6-18位，以字母开头可含数字" type="password" valid></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>身份证 (type: idCard)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入身份证号码" type="idCard" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>验证码 (type: securityCode)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入至少4位" type="securityCode" valid clearInput></vm-input>
              <span slot="item-right">*验证码*</span>
          </vm-item>
          <vm-item>
              <vm-label stacked>中文 (type: cn)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入中文" type="cn" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>QQ号 (type: qq)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="请输入QQ号" type="qq" valid clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>自定义数字格式 (regex: /\d{2}-\d{2}-\d{3}/)</vm-label>
              <vm-input
                      show-valid-highlight
                      show-invalid-highlight
                      placeholder="XX-XX-XXX格式" type="text" valid :regex="/\d{2}-\d{2}-\d{3}/" clear-input></vm-input>
          </vm-item>
      </vm-list>

      <vm-list title="Limits">
          <vm-item>
              <vm-label stacked>最长10个字符 （type: text, max: 10）</vm-label>
              <vm-input max="10" placeholder="输入文本" type="text" v-model="text" clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>最大数字为10000 （type: number, max: 10000）</vm-label>
              <vm-input max="10000" placeholder="输入数字" type="number" v-model="number" clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>最小数字为3 （type: number, min: 3）</vm-label>
              <vm-input min="3" placeholder="输入数字" type="number" clearInput></vm-input>
          </vm-item>

          <vm-item>
              <vm-label stacked>小数点后最多3位 （type: number, decimal: 3）</vm-label>
              <vm-input decimal="3" placeholder="输入数字" type="number" clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>数字范围0~10 （type: number, min：0, max: 10）</vm-label>
              <vm-input min="0" max="10" placeholder="0~10" type="number" clearInput></vm-input>
          </vm-item>
          <vm-item>
              <vm-label stacked>URL (type: url)</vm-label>
              <vm-input placeholder="Input urls" type="url" clearInput></vm-input>
          </vm-item>
      </vm-list>

      <vm-list title="Events">
          <vm-item>
              <vm-label color="primary">短文本</vm-label>
              <vm-input type="text"
                      show-valid-highlight
                      show-invalid-highlight
                      clearInput
                      :regex="regex"
                      @onKeyup.enter="submit"
                      @onBlur="onBlurtHandler"
                      @onFocus="onFocusHandler"
                      @onInput="onInputHandler"
                      @onValid="onValidHandler"
                      @onInvalid="onInvalidHandler"
                      placeholder="'XX-XX-XXX' 数字格式"></vm-input>
          </vm-item>
          <vm-item>
              <vm-label fixed>验证条件</vm-label>
              <p>{{regex.toString()}}</p>
          </vm-item>
      </vm-list>
      <p class="event__p">
          <strong>触发记录:</strong>
      </p>
      <ul class="event__ul">
          <li class="event__li" v-for="(item,index) in eventListDisplay.reverse()" :key="index">
              <span>{{item.time}}</span>
              <span text-uppercase class="eventType" :class="item.eventType">{{item.eventType}}</span>
              <span>{{item.msg}}</span>
          </li>
          <li v-if="eventListDisplay.length === 0">空</li>
      </ul>

    </vm-content>
  </vm-page>
</template>

<script>
export default {
  data () {
    return {
      normalValue: '',
      debounceValue: '',
      text: null,
      number: null,
      regex: /\d{2}-\d{2}-\d{3}/,
      eventList: []
    }
  },
  computed: {
    // a computed getter
    hasLabel: function () {
      return '有标签: ' + this.username
    },

    noLabel: function () {
      return '无标签: ' + this.tel
    },

    eventListDisplay () {
      let list = JSON.parse(JSON.stringify(this.eventList))
      return list.splice(-15)
    }
  },
  methods: {
    submit () {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'enter',
        msg: ''
      })
    },
    onBlurtHandler () {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'blur',
        msg: ''
      })
    },
    onFocusHandler () {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'focus',
        msg: ''
      })
    },
    onInputHandler (value) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'input',
        msg: value
      })
    },
    onValidHandler (value, type) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'valid',
        msg: `type: ${type} - value: ${value}`
      })
    },
    onInvalidHandler (value, type) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'invalid',
        msg: `type: ${type} - value: ${value}`
      })
    },
    showInvalidToast (msg) {
      this.$toast.present({
        message: msg,
        duration: 1500,
        position: 'middle'
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .event__p {
        padding-left: 20px;
    }

    .event__ul {
        padding-left: 40px;
        .event__li {
            margin-bottom: 5px;
            .eventType {
                padding: 2px 5px;
                border-radius: 2px;
                background: #ddd;
                display: inline-block;
            }

            .blur {
                background: #ddd6ff;

            }

            .focus {
                background: #29a0fd;
            }

            .input {
                background: #ccb020;
            }

            .valid {
                background: #58ea66;
            }

            .invalid {
                background: #d61652;
            }
        }
    }
</style>
