import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface Step3Props {
  prevStep: () => void;
}

const Step3 = ({ prevStep }: Step3Props) => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="space-y-4">
      <h2 className="md:text-2xl font-bold text-center text-[#4b45f0] text-xl">
        Summary
      </h2>
      <p className="text-slate-500 text-center mb-4">
        Kindly confirm your details before generating ticket
      </p>
      {formData.avatarUrl && (
        <div className="mt-4 flex justify-center flex-wrap items-center">
          <Image
            width={100}
            height={100}
            src={formData.avatarUrl || "/placeholder.svg"}
            alt="Avatar"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        </div>
      )}
      <div className="space-y-4 text-center">
        <p className="text-[#e77682]">
          <strong>Full Name:</strong>{" "}
          <span className="text-slate-500"> {formData.fullName}</span>{" "}
        </p>
        <p className="text-[#e77682]">
          <strong>Email:</strong>{" "}
          <span className="text-slate-500">{formData.email}</span>
        </p>
        <p className="text-[#e77682]">
          <strong>Phone Number:</strong>{" "}
          <span className="text-slate-500">{formData.phoneNumber}</span>
        </p>
        <p className="text-[#e77682]">
          <strong>Location:</strong>{" "}
          <span className="text-slate-500">{formData.location}</span>{" "}
        </p>
        <p className="text-[#e77682]">
          <strong>Date and Time:</strong>{" "}
          <span className="text-slate-500">{formData.dateTime}</span>
        </p>
      </div>
      <div className="flex justify-between mt-12">
        {" "}
        <button
          type="button"
          onClick={prevStep}
          className="bg-[#4b45f0] px-4 py-3 w-36 rounded-lg text-[#ffffff]"
        >
          Previous
        </button>
        <button
          type="submit"
          className="ml-auto bg-[#4b45f0] px-4 py-3 w-36 rounded-lg text-[#ffffff] hover:opacity-90"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Step3;
