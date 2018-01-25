<template>
    <vm-page v-nav="{title: 'Textarea'}">

        <vm-content class="outer-content">

            <vm-list title="Textarea">
                <vm-item>
                    <vm-label color="primary">Inline Label</vm-label>
                    <vm-textarea placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label color="primary" fixed>Fixed Label</vm-label>
                    <vm-textarea placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-textarea placeholder="Textarea with no label"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label color="primary" stacked>Stacked Label</vm-label>
                    <vm-textarea placeholder="Textarea"></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-label color="primary" floating>Floating Label</vm-label>
                    <vm-textarea></vm-textarea>
                </vm-item>
            </vm-list>

            <vm-list title="Limits">
                <vm-item>
                    <vm-label color="primary" stacked>计数 (count=100)</vm-label>
                    <vm-textarea :count="100"  placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>聚焦高亮 (showFocusHighlight=true)</vm-label>
                    <vm-textarea showFocusHighlight placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>自动高度 (autosize=true)</vm-label>
                    <vm-textarea autosize placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>禁用 (disabled)</vm-label>
                    <vm-textarea :rows="1" disabled placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>最长20个字符 (maxlength=20)</vm-label>
                    <vm-textarea :rows="1" :maxlength="20" placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>只读 (readonly)</vm-label>
                    <vm-textarea :rows="1" readonly placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>必填 (required)</vm-label>
                    <vm-textarea required placeholder="输入文本"></vm-textarea>
                </vm-item>
            </vm-list>

            <vm-list title="Events">
              <vm-item>
                  <vm-label color="primary">短文本</vm-label>
                  <vm-textarea autosize
                              @onKeyup.enter="submit"
                              @onBlur="onBlurtHandler"
                              @onFocus="onFocusHandler"
                              @onInput="onInputHandler"
                              placeholder="请输入..."></vm-textarea>
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
<script type="text/javascript">
export default {
  name: 'TextareaEventDemo',
  data () {
    return {
      eventList: []
    }
  },
  computed: {
    eventListDisplay () {
      let list = JSON.parse(JSON.stringify(this.eventList))
      return list.splice(-15)
    }
  },
  methods: {
    submit ($event) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'enter',
        msg: $event
      })
    },
    onBlurtHandler ($event) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'blur',
        msg: $event
      })
    },
    onFocusHandler ($event) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'focus',
        msg: $event
      })
    },
    onInputHandler ($event) {
      this.eventList.push({
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        eventType: 'input',
        msg: $event
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
