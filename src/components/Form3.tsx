import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { PhoneInputGroup } from "./PhoneInput";
const formSchema = z.object({
  phones: z
    .array(
      z
        .string()
        .nonempty("Phone number is required")
        .regex(/^01[0-9]{9}$/, "Phone must be 11 digits and start with 01")
    )
    .min(1, "At least one phone number is required"),
});
export function Form3() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phones: [""],
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 max-w-md gap-4 w-full"
      >
        <h2 className="text-center text-2xl font-bold text-gray-700">
          Add Phone Numbers
        </h2>

        <PhoneInputGroup
          name="phones"
          control={form.control}
          label="Phone Numbers"
          className="w-full py-6 pl-10 border border-gray-200 rounded-2xl placeholder-gray-500"
        />

        <div className="flex justify-center mt-4">
          <Button type="submit" className="py-3 px-10 rounded-2xl">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
