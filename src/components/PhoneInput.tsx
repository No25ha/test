import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiPhone } from "react-icons/fi";

interface PhoneInputGroupProps {
  name: string;
  control: any;
  label?: string;
  className?: string;
}

export function PhoneInputGroup({
  name,
  control,
  label,
  className,
}: PhoneInputGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {        
        const phoneNumbers: string[] = Array.isArray(field.value) ? field.value : [""];
        const addPhone = () => field.onChange([...phoneNumbers, ""]);
        const removePhone = (index: number) => {
          const updated = phoneNumbers.filter((_, i) => i !== index);
          field.onChange(updated);
        };
        const updatePhone = (index: number, value: string) => {
          const cleaned = value.replace(/[^0-9]/g, "").slice(0, 15);
          const updated = [...phoneNumbers];
          updated[index] = cleaned;
          field.onChange(updated);
        };        
        const errors: (string | undefined)[] =
          fieldState.error && "message" in fieldState.error
            ? phoneNumbers.map(() => fieldState.error?.message)
            : fieldState.error?.map?.((err: any) => err.message) || [];

        return (
          <div>
            {label && <label className="font-medium text-sm">{label}</label>}

            {phoneNumbers.map((phone, i) => (
              <div key={i} className="flex flex-col gap-1 mb-4 relative">
                <div className="relative w-full">
                  <FiPhone className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                  <Input
                    value={phone}
                    placeholder="Enter phone number"
                    className={`pl-10 ${className} ${errors[i] ? "border-red-500 focus:ring-red-500" : ""}`}
                    onChange={(e) => updatePhone(i, e.target.value)}
                  />
                  {i > 0 && (
                    <Button
                      variant="destructive"
                      type="button"
                      className="absolute right-0 top-1/2 -translate-y-1/2"
                      onClick={() => removePhone(i)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {errors[i] && (
                  <p className="text-red-500 text-sm mt-1">{errors[i]}</p>
                )}
              </div>
            ))}

            <Button type="button" variant="outline" className="mt-2" onClick={addPhone}>
              + Add Phone
            </Button>
          </div>
        );
      }}
    />
  );
}
