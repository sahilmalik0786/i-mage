export const verifyUser = async ()=>{
    try {
        const res = fetch('https://i-mage-enwv.onrender.com/api/auth/verify',{
        method:'GET',
        credentials:'include',
    })
    return res
    } catch (error) {
         console.log(error)
    }
}