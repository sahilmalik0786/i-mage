import { themeToggler } from "../store/features/themeSlice"

export const toggleTheme = () =>(dispatch,getState)=>{
    console.log(getState)
    document.documentElement.classList.toggle(
    "dark")
    dispatch(themeToggler())
    
//   localStorage.theme === "dark" ||
//     (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
//   );
// Whenever the user explicitly chooses light mode
//     localStorage.theme = "light";
// // Whenever the user explicitly chooses dark mode
//    localStorage.theme = "dark";
}