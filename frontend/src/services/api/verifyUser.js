export const verifyUser = async ()=>{
    try {
        const res = fetch('http://localhost:3000/api/auth/verify',{
        method:'GET',
        credentials:'include',
    })
    return res
    } catch (error) {
         console.log(error)
    }
}