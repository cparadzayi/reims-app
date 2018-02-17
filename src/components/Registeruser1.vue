<template>
  <div>
        <div slot="form-header">
          <h3>Welcome!</h3>
          <p>Register to use MunicipalGIS</p>
        </div>
        <div slot="form-fields">
          <input type="text" placeholder="username" required/>
          <input type="password" placeholder="password" required/>
          <input type="password" placeholder="Confirm password" required/>
        </div>


  </div>
</template>
<<script>
export default {
    methods: {
    handleSubmit () {
      alert('Registration credentials have been submitted')
    }
  }
}
</script>
