import { ref } from "vue";

type ConfigType = {
  deviceId: string,
  rounded: boolean
}
const initConfig = {
  deviceId: '',
  rounded: true
}
export default () => {
  const cache = localStorage.getItem('desktop_camera_f_config')
  const data = cache ? (JSON.parse(cache) as ConfigType) : initConfig
  const config = ref(data)
  const updateConfig = () => {
    localStorage.setItem('desktop_camera_f_config', JSON.stringify(config.value))
  }
  return {
    config,
    updateConfig
  }
}
