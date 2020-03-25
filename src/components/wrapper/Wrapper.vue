<template>
  <div class="container">
      <div class="top"></div>
      <div class="bottom">
          <slot></slot>
      </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
    height: 100%;
    display: flex;
    flex-direction: column;
    .top
        flex-grow: 1;
        flex-shrink: 1;
        background-color: rgba(157,157,157,0.3);
    .bottom
        flex-grow: 0;
        flex-shrink: 0;
</style>