import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/features/userSlice";
import { toast } from 'react-toastify';


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {user,loading,error} = useSelector((state)=>state.user)
  
  
  const SubmitHandler = async(data)=>{
    console.log(data)
       try {
       await dispatch(loginUser(data)).unwrap(); // Unwrap to properly handle errors
       navigate('/dashboard');
       toast('loggged in successfully')
       
    } catch (err) {
      console.log(err)
      toast(error)
    }
  

  }
console.log(user)
  return (
    <div className="h-full xl:w-5xl  p-2 mx-auto "> <h1 className="text-center text-accent-light dark:text-accent-dark mt-10 text-3xl">
      Hola amigo!
    </h1>
      <form className="flex flex-col h-fit mt-15 w-10/11  gap-5 mx-auto items-center justify-center">
       <div className="flex flex-col gap-2 w-3/6 not-md:w-3/4">
          <label htmlFor="emailInp"> Email </label> 
        <input id="emailInp" className="p-3 outline-none bg-secondary-light dark:bg-secondary-dark shadow-lg/10 shadow-balck rounded-md " {...register("email", { required: true  })} />
        {errors.email && <span>This field is required</span>}
      </div>
      <div className="flex flex-col gap-2 w-3/6 not-md:w-3/4">
          <label htmlFor="usernameInp"> UserName </label> 
        <input id="usernameInp" className="p-3 outline-none bg-secondary-light dark:bg-secondary-dark shadow-lg/10 shadow-balck rounded-md " {...register("username", { required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
       <div className="flex flex-col gap-2 w-3/6 not-md:w-3/4">
             <label htmlFor="passWordInp">Password</label>
        <input id="passWordInp" className="p-3 outline-none bg-secondary-light dark:bg-secondary-dark rounded-md shadow-lg/10 shadow-black"  {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

       
       </div>
       <button onClick={handleSubmit(SubmitHandler)} className="px-4 py-1 bg-accent-light text-primary-light font-semibold tracking-wider dark:text-secondary-dark text-md dark:bg-accent-dark rounded mt-5 cursor-pointer active:scale-95 shadow-lg/10 ">
       {loading ? 'Signing up':'Sign Up'}
       </button>
       

      </form>
      <h2 className="text-center mt-5 not-md:mt-8">Already have an Account ? <span>
          <Link className="text-accent-light" to={'/auth/login'}>
          Login here
          </Link>
        </span> </h2>
    </div>
  );
};

export default SignUp;
