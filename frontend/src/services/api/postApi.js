export const upload = async(data)=>{
  // https://i-mage-enwv.onrender.com
  try {
      const res = await fetch('https://i-mage-enwv.onrender.com/api/generate',{
        method:'POST',
        credentials:'include',
        body: data

    })

    return res
  } catch (error) {
    return error
  }
}