export const upload = async(data)=>{
  try {
      const res = await fetch('http://localhost:3000/api/generate',{
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