import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { useFormStatus as useFormStatus } from "react-dom";

const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus();
  return (
    <div className="w-full rounded-md relative flex items-center">
      <Button className="w-full" disabled={pending} type="submit" variant={"themeButton"}>
        {title}
      </Button>
      {pending ? (
        <Truck className="text-white w-20 h-5 absolute right-0 animate-spin items-end" />
      ) : (
        ""
      )}
    </div>
  );
};

export default SubmitButton;
