export const getHistory = async ()=>{
    try {
        const res = fetch('https://i-mage-enwv.onrender.com/api/generate/history',{
            method:'GET',
            credentials:'include'
        })
        return res
    } catch (error) {
        return error
    }
}