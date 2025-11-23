import * as React from "react"
import { Controller } from "react-hook-form"
import { cn } from "@/lib/utils" 


interface Option {
  label: string
  value: string
}

interface SelectProps {
  name: string
  control: any
  options: Option[]
  placeholder?: string
  className?: string
  icon?: React.ReactNode
}

export function Select({ name, control, options, placeholder, className, icon }: SelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field , fieldState }) => (
        <div>
        <div className="relative w-full">
          {icon && <div className="absolute top-1/2 left-3 -translate-y-1/2">{icon}</div>}
          <select
            {...field}
            className={cn(
              "",
              className,
              fieldState.error && "border-red-500 focus:ring-red-500"
            )}
          >
            <option value="">{placeholder}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )} 
        </div>
      )}
    />
  )
}
