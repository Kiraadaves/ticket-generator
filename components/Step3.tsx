import Image from "next/image";
import { useFormContext } from "react-hook-form";



const Step3 = () => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="space-y-4">
      <h2 className="md:text-2xl font-bold text-center text-[#c375ac] text-xl">Summary</h2>
      <div>
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
          <div className="mt-4">
            <p>
              <strong>Avatar:</strong>
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
    </div>
  );
};

export default Step3;
