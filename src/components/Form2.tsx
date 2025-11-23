import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/FormInput"
import {Select} from "@/components/Select"
import { FiUser } from "react-icons/fi"
import { FormRadio } from "./FormRadio"

const formSchema = z
  .object({  
    
    FirstName: z.string().min(3, "First Name must be at least 3 characters"),
    MiddleName: z.string().optional(),
    LastName: z.string().min(1, "Last Name is required"),
    SocialSecurityNumber: z.string().min(5, "SSN is required").regex(/^[0-9-]+$/, "DoD ID Number must contain only numbers and '-'"),
    DateOfBirth: z.string().min(1, "Date of Birth is required"),
    DoDIDNumber: z.string().min(8, "DoD ID Number is required").regex(/^\d+$/, "DoD ID Number must contain 8 numbers"),
    VAFileNumber: z.string().min(8, "VA File Number is required"),
    MilitaryBranch: z.string().min(1, "Military Branch is required"),
    MedicalRecords: z.string().min(1, "Please select an option"),
    
  })  

export function Form2() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), 
    defaultValues:{
        FirstName:"FirstName",
        MiddleName:"MiddleName",
        LastName:"LastName",
        SocialSecurityNumber: "123-45-6789",
        DateOfBirth: "1995-01-25",
        DoDIDNumber: "12345678",
        VAFileNumber: "C1234567",
        MilitaryBranch: "x",
        MedicalRecords: "yes",
    }   
  })
  const watchMedicalRecords = form.watch("MedicalRecords")

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }  
  console.log(form.getValues())
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100  ">
    <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 mx-auto " >       
        <FormInput
          name="FirstName"          
          control={form.control}
          label="First Name"
          placeholder="User Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
          
        />
        <FormInput
          name="MiddleName"          
          control={form.control}
          label="Middle Name"
          placeholder="User Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
          
        />
        <FormInput
          name="LastName"          
          control={form.control}
          label="Last Name"
          placeholder="User Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
          
        />
        <div className="col-span-3 grid grid-cols-2 gap-6 w-full">
            <FormInput
            name="SocialSecurityNumber"
            label="Social Security Number"            
            control={form.control}            
            placeholder="456-67-9997"
            className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />

            <FormInput
            name="DateOfBirth"
            type="date"
            label="Date of Birth"
            control={form.control}
            placeholder="YYYY-MM-DD"                        
            className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
        </div>
        <div className="col-span-3 grid grid-cols-2 gap-6 w-full">
            <FormInput
            name="DoDIDNumber"
            type="Number"
            label="DoD ID Number"
            control={form.control}                                
            placeholder="12345690"
            className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />

            <FormInput
            name="VAFileNumber "
            label="VA File Number "
            control={form.control}
            placeholder="C1234567"                        
            className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
        </div>    
        <div className="col-span-3">
          <Select
            name="MilitaryBranch"
            control={form.control}
            label="Military Branch"
            className="w-full py-4 pl-5 border border-gray-200 bg-white text-gray-500 rounded-2xl"
            placeholder="Select"
            options={[
              { label: "x", value: "x" },
              { label: "y", value: "y" },
              { label: "z", value: "z" },
            ]}
          />
        </div> 
        <div className="col-span-3">
            <FormRadio
                name="MedicalRecords"
                control={form.control}
                label="Do you have your medical records"
                options={[
                    { label: "yes", value: "yes" },
                    { label: "No", value: "No" },
                    
                ]}
                className="col-span-3"
            />            
        </div>
        {watchMedicalRecords === "No" && (
          <div className="col-span-3 mt-2">
            <FormInput
              name="ReasonForNo"
              control={form.control}
              label="Please explain why"
              placeholder="Type reason here"
              className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
          </div>
        )}          
        <div className="col-span-2 flex justify-center mt-4">
          <Button type="submit" className="py-6 px-50 rounded-2xl">
            Signup
          </Button>
        </div>       
</form>
         
</div>
  )
}
