export const getDimensionsFromUrl = (url) => {
  const widthMatch = url.match(/w_(\d+)/)
  const heightMatch = url.match(/h_(\d+)/)

  const width = widthMatch ? parseInt(widthMatch[1]) : 0
  const height = heightMatch ? parseInt(heightMatch[1]) : 0

  return [width, height]
}
