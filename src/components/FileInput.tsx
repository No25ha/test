
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { useRef } from "react";

interface FileInputProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  className?: string;
  accept?: string;
}

export function FileInput({
  name,
  control,
  label,
  className,
  accept = "image/png, image/jpeg",
  placeholder,
}: FileInputProps) {

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: any) => void
  ) => {
    const selectedFile = e.target.files?.[0];
    const MAX_SIZE = 2 * 1024 * 1024;
    const ImageTypes = ["image/jpeg", "image/png"];

    if (selectedFile) {
      if (selectedFile.size > MAX_SIZE) {
        alert("File size exceeds 2MB");
        return;
      }
      if (!ImageTypes.includes(selectedFile.type)) {
        alert("Invalid file type. Only JPG and PNG are allowed.");
        return;
      }
      onChange(selectedFile); 
    }
  };

  const handleReset = (onChange: (value: any) => void) => {
    onChange(null);         
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <div className="w-full">
          {label && (
            <label className="block mb-2 text-gray-700 font-medium">
              {label}
            </label>
          )}
          <Input
            ref={inputRef}         
            type="file"
            accept={accept}
            placeholder={placeholder}
            onChange={(e) => handleFileChange(e, onChange)}
            className={cn(className, fieldState.error && "border-red-500")}
          />

          {value && (
            <div className="mt-4 w-40 h-40 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative">
              <img
                src={URL.createObjectURL(value)}
                alt="preview"
                className="w-full h-full object-cover"
              />

              <button
                type="button"
                onClick={() => handleReset(onChange)}
                className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded"
              >
                Reset
              </button>
            </div>
          )}

          {fieldState.error && (
            <p className="text-red-500 text-sm mt-2">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
