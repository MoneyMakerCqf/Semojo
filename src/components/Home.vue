<template>
  <div style="display: flex; margin-left: 50px; margin-top: 50px" >
    <div style="width: 50%" class="demo-image">
      <el-image style="width: 100%; height: 100%" :src="require('../assets/illustration.png')" :fit='fit'></el-image>
    </div>
    <div style="width: 39%; margin-left: 100px">
      <h1>Welcome to SEMojo!</h1><br>
      <p>SEMojo is a platform for creators to share their advanced software techniques
        and for customers to explore mature techniques supporting the implementation
        of their ideas.</p>
      <br>
      <p>If you are a geek who are keen on creating or developing useful techniques to
        solve difficult problem, and are willing to share with others. We are glad to
        invite you to join us to turn techniques into wealth.</p>
      <br>
      <p>If you are a dreamer who has lots of excellent ideas, but are stuck with the
        techniques to achieve your great ideas. We are proud to introduce our SEMojo
        platform where you are likely to find what you want to support your geate ideas.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data (){
    return {
      fit: 'fill'
    }
  }
}
</script>

<style scoped>

</style>
