<template>
  <div class="modal-component">
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot name="main" />
    </main>

    <footer>
      <slot name="footer" />
      <button @click="toggle">Hide</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    toggle: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-component {
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  color: #ff9090;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  z-index: 100000;
  flex-direction: column;
  left: 0;
  box-shadow: 0 0 4px black;
  border-radius: 16px 0 16px 0;
  backdrop-filter: blur(8px);

  button {
    min-width: auto;
    width: auto;
  }
}
</style>
