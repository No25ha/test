import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { Select } from "@/components/Select";
import { FormRadio } from "./FormRadio";
import { FiUser } from "react-icons/fi";


const formSchema = z.object({
  FirstName: z.string().min(3, "First Name must be at least 3 characters"),
  MiddleName: z.string().optional(),
  LastName: z.string().min(1, "Last Name is required"),
  SocialSecurityNumber: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be 456-67-9997 format"),
  DateOfBirth: z.string().min(1, "Date of Birth is required"),
  DoDIDNumber: z.string().min(8, "DoD ID Number must contain 8 numbers"),  
  MilitaryBranch: z.string().min(1, "Military Branch is required"),
  MedicalRecords: z.string().min(1, "Please select an option"),  
});

export function Form4() {  
  const savedData = localStorage.getItem("formData");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: savedData
      ? JSON.parse(savedData)
      : {
          FirstName: "",
          MiddleName: "",
          LastName: "",
          SocialSecurityNumber: "",
          DateOfBirth: "",
          DoDIDNumber: "",         
          MilitaryBranch: "",
          MedicalRecords: "",
          ReasonForNo: "",
        },
  });
    
  const watchMedicalRecords = form.watch("MedicalRecords");

  
  useEffect(() => {
    const subscription = form.watch(() => {
      localStorage.setItem("formData", JSON.stringify(form.getValues()));
    });
    return () => subscription.unsubscribe();
  }, [form]);
  

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", data);     
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100">
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 mx-auto w-full max-w-5xl">        
          <>
            <FormInput
              name="FirstName"
              type="text"
              control={form.control}
              label="First Name"
              placeholder="User Name"
              Icon={<FiUser size={20} />}
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
            <FormInput
              name="MiddleName"
              type="text"
              control={form.control}
              label="Middle Name"
              placeholder="Middle Name"
              Icon={<FiUser size={20} />}
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
            <FormInput
              name="LastName"
              type="text"
              control={form.control}
              label="Last Name"
              placeholder="Last Name"
              Icon={<FiUser size={20} />}
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
            />
            <div className="col-span-3 grid grid-cols-2 gap-6">
              <FormInput
                name="SocialSecurityNumber"
                label="Social Security Number"
                control={form.control}
                placeholder="456-67-9997"
                className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                onchange={(e) => {
                  let value = e.target.value.replace(/[^0-9-]/g, "");
                  value = value
                    .replace(/^(\d{3})(\d)/, "$1-$2")
                    .replace(/^(\d{3}-\d{2})(\d)/, "$1-$2")
                    .slice(0, 11);
                  form.setValue("SocialSecurityNumber", value);
                }}
              />
              <FormInput
                name="DateOfBirth"
                type="date"
                label="Date of Birth"
                control={form.control}
                className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
              />
            </div>            
          </> 
        
          <>
            <FormInput
              name="DoDIDNumber"
              type="number"
              control={form.control}
              label="DoD ID Number"
              placeholder="12345678"
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
              onchange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
                form.setValue("DoDIDNumber", value);
              }}
            />
            
            <Select
              name="MilitaryBranch"
              control={form.control}
              label="Military Branch"
              placeholder="Select"
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
              options={[
                { label: "x", value: "x" },
                { label: "y", value: "y" },
                { label: "z", value: "z" },
              ]}
            />
            <FormRadio
              name="MedicalRecords"
              control={form.control}
              label="Do you have your medical records?"
              className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
              options={[
                { label: "yes", value: "yes" },
                { label: "No", value: "No" },
              ]}
            />
            {watchMedicalRecords === "No" && (
              <FormInput
                name="ReasonForNo"
                control={form.control}
                label="Please explain why"
                placeholder="Type reason here"
                className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
              />
            )}
            <div className="col-span-3 flex gap-3 mt-4">              
              <Button type="submit">Submit</Button>
            </div>
          </>
        
      </form>
    </div>
  );
}
