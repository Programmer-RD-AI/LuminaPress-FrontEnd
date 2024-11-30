export const isImageValid = async (url) => {
  try {
    const response = await fetch(url)
    return response.ok // Returns true if the response is ok (status 200-299)
  } catch (error) {
    return false // In case of any error, return false (image not valid)
  }
}
