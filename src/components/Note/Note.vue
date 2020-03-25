<template>
  <div class="Note" @click.stop="stop">
      <header class="header-wrapper">
          <div class="left-header" @click="cancel">取消</div>
          <div class="right-header" @click="complete">完成</div>
      </header>
      <section class="footer-wrapper" >
          <div class="note-wrapper">
              <textarea placeholder="无接触配送，将商品挂家门口或放前台，地址封闭管理时请电话联系" class="note-text" maxlength="50" v-model="note"></textarea>
              <p class="note-text-length">0/50</p>
          </div>
          <p class="note-tittle">快捷备注</p>
          <section class="note-list-wrapper">
              <dl class="note-parent">
                  <dd class="note-content" v-for="note of noteList" :key="note" @click="clickNote(note)">{{note}}</dd>
              </dl>
          </section>
      </section>
  </div>
</template>

<script>
export default {
    props:['data'],
    data(){
        return {
            note: this.data,
            noteList: [
                '请挂门把手上',
                '请放门口',
                '请放前台桌上',
                '如地址封闭管理，请电话与我联系',
                '不吃辣。 多加点饭，多加点饭，多加点饭',
                '多加点饭，多加点饭，多加点饭'
            ]
        }
    },
    methods:{
        stop(){},
        complete(){
            this.sendNote(this.note)
        },
        cancel(){
            this.sendNote('')
        },
        clickNote(val){
            this.note += val + ' '
        },
        sendNote(val){
            this.$emit('sendNote', val)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import './Note.styl'
</style>