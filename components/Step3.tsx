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
      <div className="space-y-4">
        <p>
          <strong>Full Name:</strong> {formData.fullName}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {formData.phoneNumber}
        </p>
        <p>
          <strong>Location:</strong> {formData.location}
        </p>
        <p>
          <strong>Date and Time:</strong> {formData.dateTime}
        </p>
        {formData.avatarUrl && (
          <div className="mt-4 flex justify-between flex-wrap items-center">
            <p>
              <strong>Avatar</strong>
            </p>
            <Image
              width={100}
              height={100}
              src={formData.avatarUrl || "/placeholder.svg"}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
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
