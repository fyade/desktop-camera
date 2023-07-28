<script setup lang="ts">
import Camera from './components/Camera.vue'
import Setting from './components/Setting.vue'
import { Setting as SettingIcon, CameraFive, InnerShadowTopLeft } from '@icon-park/vue-next'
import { ref } from 'vue'
import useConfig from "./composables/useConfig";

const {config, updateConfig} = useConfig()
const page = ref('camera')

const updateRounded = () => {
  config.value.rounded = !config.value.rounded
  updateConfig()
}
</script>

<template>
  <Suspense>
    <!--<main class="w-screen h-screen">-->
    <main class="reactive">
      <section>
        <SettingIcon
          v-if="page === 'camera'"
          class="hghb no-drag absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer z-10"
          theme="outline"
          size="24"
          @click="page='setting'"
        />
        <!--<InnerShadowTopLeft-->
        <!--  v-if="page === 'camera'"-->
        <!--  class="no-drag absolute left-1/2 -translate-x-1/2 mt-3 bottom-3 text-white opacity-80 cursor-pointer z-10"-->
        <!--  theme="outline"-->
        <!--  size="24"-->
        <!--  @click="updateRounded"-->
        <!--/>-->
        <CameraFive
          v-if="page === 'setting'"
          class="no-drag absolute left-1/2 -translate-x-1/2 mt-3 text-white opacity-80 cursor-pointer z-10"
          theme="outline"
          size="24"
          @click="page='camera'"
        />
      </section>
      <section>
        <Camera v-if="page === 'camera'"/>
        <Setting v-else-if="page === 'setting'"/>
      </section>
    </main>
    <!--</main>-->
  </Suspense>
</template>

<style lang="less" scoped></style>
