import * as React from "react"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils" 
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

interface FormInputProps {
  name: string
  control: any
  type?: string
  label?: string  
  placeholder?: string
  className?: string
  Icon?: React.ReactNode
  countryCode?:string
  Icon2?:React.ReactNode
}

export function FormInput({ name, control, type = "text", placeholder, label,  className, Icon,countryCode,Icon2 }: FormInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === "password"
  const inputId = `${name}-input`
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          {label && (
            <label 
            htmlFor={inputId}             
              className="block mb-1 text-gray-700 font-medium"
            >
              {label}
            </label>
          )}
          <div className="relative w-full">
            
            {Icon && (
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                {Icon}
              </span>
            )}

            {countryCode && (
              <span className={`absolute ${Icon ? "left-11" : "left-2"} top-1/2 transform -translate-y-1/2 text-gray-500 font-medium border-r-3 border-gray-400 pr-3`}>
                {countryCode}
              </span>
            )}

            <input
              {...field}
              type={isPassword ? (showPassword ? "text" : "password") : type}
              placeholder={placeholder} 
              value={field.value ?? ""}            
              className={cn(
                "",
                className,
                fieldState.error && "border-red-500 focus:ring-red-500"
              )}
            />

            {isPassword && Icon2 && (
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <FiEye size={20} className="text-gray-600" />
                ) : (
                  <FiEyeOff size={20} className="text-gray-600" />
                )}
              </span>
            )}
          </div>

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  )
}
