import { Controller } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface FormRadioProps {
  name: string
  control: any
  label?: string
  options: { label: string; value: string }[]
  className?: string
}

export function FormRadio({ name, control, label, options, className }: FormRadioProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={className}>
          {label && (
            <label className="block mb-1 text-gray-700 font-medium">
              {label}
            </label>
          )}

          <RadioGroup
            onValueChange={field.onChange}
            value={field.value}
            className="flex gap-6"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}
