import { onMounted, reactive, onBeforeUnmount } from 'vue'
export interface IPoint {
  x: Number,
  y: Number
}
export const usePoint = (): IPoint => {
  const point = reactive<IPoint>({
    x: 0,
    y: 0
  })
  const getPointLocation = (event: MouseEvent): void => {
    point.x = event.pageX
    point.y = event.pageY
  }
  onMounted(() => {
    document.addEventListener('click', getPointLocation)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', getPointLocation)
  })
  return point
}
