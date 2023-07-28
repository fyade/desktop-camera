<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import useConfig from '../composables/useConfig'

// const devices = await navigator.mediaDevices.enumerateDevices()
// const cameras = devices.filter(({kind}) => kind.includes('videoinput'))
const {config} = useConfig()

onMounted(() => {
  const constraints = {
    audio: false,
    video: {
      deviceId: config.value.deviceId
    }
  } as MediaStreamConstraints
  const video = document.querySelector('video')!
  navigator.mediaDevices.getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream
      video.play()
    })
})
</script>

<template>
  <main class="camera-container w-screen h-screen flex overflow-hidden" :class="{'rounded-full':config.rounded}">
    <video class="object-cover h-full" :class="{'rounded-full':config.rounded}"></video>
  </main>
</template>

<style scoped lang="scss">
</style>
