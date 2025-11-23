import { FaFacebookF } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";



export default function SocialAuth() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 ">      
      <div className="w-full flex items-center gap-4">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-500 whitespace-nowrap">
          Or continue with
        </span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      
      <div className="flex gap-28">        
        <a href="#" className="py-4 px-8 rounded-4xl border border-gray-200 flex items-center justify-center ">
          <FaFacebookF className="text-xl" />
        </a>

        
        <a href="#" className="py-4 px-8 rounded-4xl border border-gray-200 flex items-center  justify-center ">
          <FaApple className="text-2xl" />
        </a>

        
        <a href="#" className="py-4 px-8 rounded-full border border-gray-200 flex items-center justify-center ">
          <FcGoogle className="text-2xl" />
        </a>
      </div>

      
      <p className="text-gray-500">
        Not a member?{" "}
        <a href="#" className="text-blue-500 ">
          Login now
        </a>
      </p>

    </div>
  );
}
