import React, { useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { upload } from '../../services/api/postApi';
import { useDispatch, useSelector } from 'react-redux';
import { generate, setNew } from '../../store/features/postSlice';
import { toast } from 'react-toastify';
import styles from './fileInp.module.css'

const roleOptions = ['caption', 'study', 'admin'];
const platformOptions = ['instagram', 'twitter'];
const Types = ['dark humour', 'serious'];

const FileUpload = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const {loading , initialized} = useSelector((state)=>state.post)
  const dispatch = useDispatch()
  const [imageUploaded, setImageUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const selectedRole = watch('role');
  const inputRef = useRef()
 
const handleClick =()=>{
      inputRef.current.click()
    }
    const handlefetch = async(formData)=>{
       try {
        await  dispatch(generate(formData)).unwrap()
        toast('generated successfully')
     } catch (error) {
        console.log(error)
        toast(error)
     }
    }
    const handleSubmitNew = ()=>{
      dispatch(setNew())
    }
  const handleImageChange = (e) => {
    
    const file = e.target.files[0];
    if (file) {
      setValue('image', file);
      setPreviewUrl(URL.createObjectURL(file));
      setImageUploaded(true);
    }
  };

  const onSubmit = async (data) => {

    const formData = new FormData();
    formData.append('image', data.image);

    const roleData = {
      name: data.role,
      ...(data.platform && { platform: data.platform }),
      ...(data.type && { type: data.type }),
    };

    formData.append('role', JSON.stringify(roleData));
    !initialized &&  handlefetch(formData)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* Step 1: Upload Image */}
      <div className="space-y-2">
        <label className="block font-medium">Upload Image</label>
       {!imageUploaded &&    <div
        onClick={handleClick}
        className="cursor-pointer border border-dashed border-purple-500 rounded-xl p-6 text-center text-purple-700 hover:bg-purple-50 transition"
      >
        <p className="text-sm">Click to upload or drag and drop</p>
        <p className="text-xs text-gray-400">PNG, JPG, JPEG up to 5MB</p>
      </div>}
        <input
        ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          // className="bg-accent-light p-1 fileInp rounded cursor-pointer h-20 w-full"
          className='hidden'
          
        />  
        <input type="hidden" {...register('image', { required: true })} />
        {errors.image && <p className="text-red-500 text-sm">Image is required.</p>}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover mt-2 rounded shadow"
          />
        )}
      </div>

      {/* Step 2: Custom Role Selection */}
      {imageUploaded && (
        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Select Role</label>
            <Controller
              control={control}
              name="role"
              rules={{ required: true }}
              render={({ field }) => (
                <div className="flex flex-wrap gap-2">
                  {roleOptions.map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`px-4 py-2 rounded border transition text-sm ${
                        field.value === role
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                      onClick={() => field.onChange(role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.role && <p className="text-red-500 text-sm">Please select a role</p>}
          </div>

          {/* Platform selector for 'caption' */}
          {selectedRole === 'caption' && (
            <>
              <div>
                <label className="block font-medium mb-1">Select Platform</label>
                <Controller
                  control={control}
                  name="platform"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {platformOptions.map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`px-4 py-2 rounded border transition text-sm ${
                            field.value === p
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          onClick={() => field.onChange(p)}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.platform && (
                  <p className="text-red-500 text-sm">Platform is required for caption</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Caption Type</label>
                <Controller
                  control={control}
                  name="type"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex flex-wrap gap-2">
                      {Types.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`px-4 py-2 rounded border transition text-sm ${
                            field.value === t
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                          onClick={() => field.onChange(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">Type is required for caption</p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Submit */}
      {imageUploaded && selectedRole && (
         <button type="submit" className="bg-accent-light dark:bg-accent-dark dark:text-black text-white px-4 py-2 rounded">
          {loading ? 'Analyzing...' : 'Submit'}
         </button>
      )}
      {/* {
        imageUploaded && selectedRole && initialized (
         <button className='' onClick={handleSubmitNew}>
          submit new 
         </button>
        ) 
      } */}

      {/* Result Display */}
      {/* {res && (
        <div className="mt-4 bg-gray-100 dark:bg-gray-800 p-2 rounded">
          <p className="text-sm font-medium">Response:</p>
          <pre className="whitespace-pre-wrap break-words text-xs">{res?.response}</pre>
        </div>
      )} */}
    </form>
  );
};

export default FileUpload;
