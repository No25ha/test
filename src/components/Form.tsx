import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/FormInput"
import {Select} from "@/components/Select"
import { FiUser } from "react-icons/fi"
import { MdOutlineEmail } from "react-icons/md"
import { FiPhoneCall } from "react-icons/fi"
import { LuMapPinned } from "react-icons/lu"
import { RxLockClosed } from "react-icons/rx"
import { FiEyeOff } from "react-icons/fi";
import SocialAuth from "@/components/SocialAuth"

const formSchema = z
  .object({
    OfficeName: z.string().min(3, "Office Name must be at least 3 characters").max(50, "Office Name must be at most 50 characters").regex(/^[^\d].*$/, "Office Name cannot start with a number"),
    EmailAddress: z.string().email("Invalid email address"),
    phoneNumber: z.string().regex(/^\?\d{10,15}$/, "Phone number must be 10-15 digits"),
    Location: z.string().min(1),
    Specialists: z.string().min(1),
    Password: z.string().min(8, "Password must be at least 8 characters"),
    ConfirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ["ConfirmPassword"],
  });

export function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),    
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <div className="min-h-screen flex justify-center items-center  ">
    <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 max-w-[636px]  gap-4  mx-auto " >  
        <div className="col-span-2 text-center flex flex-col gap-2 mb-2">
          <h2 className="text-gray-700 font-bold text-2xl">Create Account</h2>
          <p className="text-gray-500">Sign up to get started!</p>
        </div>

      
        <FormInput
          name="OfficeName"
          control={form.control}
          placeholder="Office Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        <FormInput
          name="EmailAddress"
          type="email"
          control={form.control}
          Icon={<MdOutlineEmail size={"20"} className="text-gray-500 " />}
          placeholder="Email Address"
          className="w-full py-4 pl-10 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        
        <FormInput
          name="phoneNumber"
          control={form.control}
          placeholder="Phone Number"
          Icon={<FiPhoneCall size={"20"} className="text-gray-500 mt-0.5" />}
          countryCode="+228"
          className="w-full py-4 pl-26 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        <Select
          name="Location"
          control={form.control}
          className="w-full py-4 pl-10 border border-gray-200 rounded-2xl text-gray-500"
          placeholder="Location"
          icon={<LuMapPinned size={"20"} className="text-gray-500" />}
          options={[
            { label: "Egypt", value: "egypt" },
            { label: "USA", value: "usa" },
            { label: "Germany", value: "germany" },
          ]}
        />

        
        <div className="col-span-2">
          <Select
            name="Specialists"
            control={form.control}
            className="w-full py-4 pl-5 border border-gray-200 text-gray-500 rounded-2xl"
            placeholder="Specialists"
            options={[
              { label: "x", value: "x" },
              { label: "y", value: "y" },
              { label: "z", value: "z" },
            ]}
          />
        </div>

        
        <FormInput
          name="Password"
          type="password"
          control={form.control}
          placeholder="Password"
          Icon={<RxLockClosed size={"20"} className="text-gray-500" />}
          Icon2={<FiEyeOff   size={"20"} className="text-gray-500" />}
          className="w-full py-4 pl-10 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        <FormInput
          name="ConfirmPassword"
          type="password"
          control={form.control}
          Icon={<RxLockClosed size={"20"} className="text-gray-500" />}
          Icon2={<FiEyeOff  size={"20"} className="text-gray-500" />}
          placeholder="Confirm Password"
          className="w-full py-4 pl-10 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        
        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" className="py-6 px-50 rounded-2xl">
            Signup
          </Button>
        </div>

       <div className="col-span-2">
        <SocialAuth/>
       </div>
</form>
         
</div>
  )
}
