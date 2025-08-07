// Example logout handler

export const handleLogout = async()=>{
      try {
            const res = await fetch('https://i-mage-enwv.onrender.com/api/auth/logout',{
                method:'POST',
                credentials:'include'
            })        
            return res 
      } catch (error) {
         return error
      }



}