export const emailVerify = async (data) => {
    console.log(data)
  try {
     const res = await fetch("https://i-mage-enwv.onrender.com/api/auth/verifyEmail", {
      method: "POST",
      credentials:'include',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
  });
  
  return res
  } catch (error) {
    return error
  }
};
