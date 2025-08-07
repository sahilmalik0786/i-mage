export const login = async (data) => {
  // https://i-mage-enwv.onrender.com
 console.log(data)
  try {
    const res = await fetch("https://i-mage-enwv.onrender.com/api/auth/login", {
      method: "POST",
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(res)
        return res
   
  } catch (error) {
     return error
  }
};
