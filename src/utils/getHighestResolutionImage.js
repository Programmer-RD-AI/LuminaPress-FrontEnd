import { getDimensionsFromUrl } from './getDimensionsFromUrl'

export const getHighestResolutionImage = (images) => {
  if (!images || images.length === 0) return null

  return images.reduce((highest, current) => {
    const [currentWidth, currentHeight] = getDimensionsFromUrl(current)
    const [highestWidth, highestHeight] = getDimensionsFromUrl(highest)

    const currentResolution = currentWidth * currentHeight
    const highestResolution = highestWidth * highestHeight

    return currentResolution > highestResolution ? current : highest
  })
}
