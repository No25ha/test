import * as React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

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

  const [file, setFile] = React.useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
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
      setFile(selectedFile);
      onChange(selectedFile); 
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState }) => (
        <div className="w-full">          
          {label && (
            <label className="block mb-2 text-gray-700 font-medium">
              {label}
            </label>
          )}

          <div className="relative">
            <Input
              type="file"
              accept={accept}
              placeholder={placeholder}
              onChange={(e) => handleFileChange(e, onChange)}
              className={cn(
                "",
                className,
                fieldState.error && "border-red-500"
              )}
            />
          </div>

          
          {file && (
            <div className="mt-4 w-40 h-40 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover"
              />
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
