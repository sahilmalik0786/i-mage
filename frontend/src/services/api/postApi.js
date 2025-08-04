export const upload = async(data)=>{
  try {
      const res = await fetch('https://i-mage-enwv.onrender.com/api/generate',{
        method:'POST',
        credentials:'include',
        body: data

    }).then(res => res.json())
    .catch(console.error())

    return res
  } catch (error) {
    return error
  }
}