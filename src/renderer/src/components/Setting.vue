<script setup lang="ts">
import useConfig from '../composables/useConfig'

const {config, updateConfig} = useConfig()
const devices = await navigator.mediaDevices.enumerateDevices()
const cameras = devices.filter((item) => item.kind.includes('videoinput'))

const onSubmit = () => {
  updateConfig()
}
</script>

<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5 flex flex-col gap-5 py-10 overflow-auto scroll-auto">
    <h2 class="text-gray-50 text-center text-sm mb-5 opacity-80">参数设置</h2>
    <el-select v-model="config.deviceId" placeholder="选择摄像头" clearable filterable>
      <el-option
        v-for="item in cameras"
        :key="item.deviceId"
        :label="item.label"
        :value="item.deviceId"
        size="large"
      ></el-option>
    </el-select>
    <el-button type="success" size="large" @click="onSubmit">保存</el-button>
  </main>
</template>

<style scoped lang="scss">
main {
  -webkit-app-region: no-drag;
}
</style>
