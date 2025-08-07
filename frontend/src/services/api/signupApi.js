export const signup = async (data) => {
  
  try {
    const res = await fetch("https://i-mage-enwv.onrender.com/api/auth/register", {
      method: "POST",
      //   credentials:'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return res;
  } catch (error) {
    return error?.message;
  }
};
