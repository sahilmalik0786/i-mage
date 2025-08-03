export const login = async (data) => {
  try {
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    
        return res
   
  } catch (error) {
     return error
  }
};
