import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/FormInput"
import {Select} from "@/components/Select"
import { FiUser } from "react-icons/fi"
import { FormRadio } from "./FormRadio"
import { useState } from "react"
import { MdCreditCard } from "react-icons/md"
import { FileInput } from "./FileInput"
const formSchema = z
  .object({     
    FirstName: z.string().min(3, "First Name must be at least 3 characters"),
    MiddleName: z.string().optional(),
    LastName: z.string().min(1, "Last Name is required"),
    SocialSecurityNumber: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "SSN must be 456-67-9997 format"),
    DateOfBirth: z.string().min(1, "Date of Birth is required"),
    DoDIDNumber: z.string().min(8, "DoD ID Number must contain 8 numbers"),
    VAFileNumber: z.string().regex(/^[A-Za-z]{1}\d{7}$/, "Must be 1 letter followed by 7 digits"),
    MilitaryBranch: z.string().min(1, "Military Branch is required"),
    MedicalRecords: z.string().min(1, "Please select an option"), 
    CardHolderName: z.string().nonempty("Card Name is required"),
    CardNumber: z.string().regex(/^\d{16}$/, "Card Number must be 16 digits"),
    ExpirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration date must be in MM/YY format").refine((val) => {
      const [monthStr, yearStr] = val.split("/");
      const month = Number(monthStr);
      const year = Number(yearStr);
      const today = new Date();
      const currentYear = today.getFullYear() % 100;
      const currentMonth = today.getMonth() + 1;
      return !(year < currentYear || (year === currentYear && month < currentMonth));
    }, "Card expired"),
    CVV: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
    ZipCode: z.string().regex(/^\d{5}$/, "Zip Code must be 5 digits"),  
  })  
export function Form2() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), 
    defaultValues:{
        FirstName:"",
        MiddleName:"",
        LastName:"",
        SocialSecurityNumber: "",
        DateOfBirth: "",
        DoDIDNumber: "",
        VAFileNumber: "",
        MilitaryBranch: "",
        MedicalRecords: "yes",
        CardHolderName:"",
        CardNumber:"",
        ExpirationDate:"",
        CVV:"",
        ZipCode:"",   
    }   
  })
  const watchMedicalRecords = form.watch("MedicalRecords")
  const watchDateOfBirth = form.watch("DateOfBirth")
   const [currentStep, setCurrentStep] = useState(1);  
  
  function Age(date:string){    
      const today = new Date();
      const birthDate = new Date(date);  
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth(); 
      const dayDiff = today.getDate() - birthDate.getDate();
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
          age--;
      }
      return age;
  }
  const age = Age(watchDateOfBirth);
  async function handleNextStep() {
    if (currentStep === 1) {
      const isValid = await form.trigger([
        "FirstName",
        "MiddleName",
        "LastName",
        "SocialSecurityNumber",
        "DateOfBirth",
      ]);
      if (!isValid) return;
      setCurrentStep(age >= 18 ? 2 : 3);
    } else if (currentStep === 2) {
      const isValid = await form.trigger([
        "CardHolderName",
        "CardNumber",
        "ExpirationDate",
        "CVV",
        "ZipCode",
      ]);
      if (!isValid) return;
      setCurrentStep(3);
    }
  }
  function handleBackStep() {
    if (currentStep === 2) setCurrentStep(1);
    else if (currentStep === 3) setCurrentStep(age >= 18 ? 2 : 1);
  }
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    //form.reset();
  }  
  console.log(form.getValues())
  console.log(form.formState.errors)
  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-100  ">
    <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4  mx-auto " > 
    {currentStep === 1 &&( 
      < >    
        <FormInput
          name="FirstName"
          type="text"                         
          control={form.control}
          label="First Name"
          placeholder="User Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
          
        />
        <FormInput
          name="MiddleName" 
          type="text"         
          control={form.control}
          label="Middle Name"
          placeholder="User Name"
          Icon={<FiUser size={"20"} className="text-gray-500 " />}
          className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
          
        />
        <FormInput
          name="LastName" 
          type="text"         
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
              onchange={(e) => {
                let value = e.target.value.replace(/[^0-9-]/g, "");    
                value = value
                  .replace(/^(\d{3})(\d)/, "$1-$2")
                  .replace(/^(\d{3}-\d{2})(\d)/, "$1-$2")
                  .slice(0, 11); 
                form.setValue("SocialSecurityNumber", value);
              }}
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
        <div className="col-span-2 flex justify-center mt-4">
              <Button className="py-6 px-50 rounded-2xl" onClick={handleNextStep}>
                Next
              </Button>              
            </div>
        </>
)}
        {currentStep === 2 &&( 
              < >    
                <FormInput
                    name="CardHolderName"
                    type="text"
                    control={form.control}
                    label="Card Holder Name"
                    placeholder="John Doe"
                    Icon={<FiUser size={20} className="text-gray-500" />}
                    className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />
                <FormInput
                    name="CardNumber"
                    type="Number"
                    control={form.control}
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    Icon={<MdCreditCard size={20} className="text-gray-500" />}
                    className="w-full py-4 pl-10 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />
                
                <div className="col-span-3 ">
                  <FormInput
                    name="ExpirationDate"
                    type="text"
                    control={form.control}
                    label="Expiration Date"                    
                    placeholder="MM/YY"
                    onchange={(e) => {     
                      let value = e.target.value.replace(/[^0-9/]/g, "");   
                      if (value.length === 2 && !value.includes("/")) {
                        value = value + "/";
                      }                         
                      form.setValue("ExpirationDate", value);
                    }}
                    className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />

                  <FormInput
                    name="CVV"
                    type="Number"
                    control={form.control}
                    label="CVV"
                    placeholder="123"
                    className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />
                </div>
                <div className="col-span-3 ">
                <FormInput
                    name="ZipCode"
                    type="Number"
                    control={form.control}
                    label="ZIP Code"
                    placeholder="12345"
                    className="w-full py-4 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />
                  </div>
                  <div className="col-span-3 ">
                <FileInput
                    name="Image"
                    control={form.control}                    
                    placeholder="Upload Image"
                    className="w-full py-2 pl-4 border border-gray-200 bg-white rounded-2xl placeholder-gray-500"
                  />
                  </div>
                <div className="col-span-3 flex gap-3 mt-4">
                    <Button className="py-6 px-40 rounded-2xl" onClick={handleBackStep}>              
                      Bake                
                    </Button>
                    <Button className="py-6 px-40 rounded-2xl" onClick={handleNextStep}>
                      Next
                    </Button>
                </div>
                </>
        )}
        {currentStep === 3 &&(
          <>
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
              name="VAFileNumber"            
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
            <div className="col-span-3 flex gap-3 mt-4">
              <Button className="py-6 px-40 rounded-2xl"onClick={handleBackStep}>              
                Back                
              </Button>
              <Button type="submit" className="py-6 px-40 rounded-2xl">
                Signup
              </Button>
            </div>
            </> 
      )}       
</form>         
</div>
  )
}
