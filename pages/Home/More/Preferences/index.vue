<template>
  <div class="preferences-page">
    <div class="navbar">
      <a href="#"> Back</a>
    </div>

    <div class="different options">
      <div>
        <div class="icon">create</div>
        <a href="#option"> Edit profile </a>
      </div>

      <div>
        <div class="icon">Delete filled</div>
        <a href="#option"> Delete profile </a>
      </div>

      <label for="message">Message:</label>

      <select id="message" name="message">
        <option value="choose one">Choose one</option>
        <option value="Only Followers">Only Followers</option>
        <option value="Everyone">Everyone</option>
        <option value="Only me">Only me</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Preferences',
}
</script>
