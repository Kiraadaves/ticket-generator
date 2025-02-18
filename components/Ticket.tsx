import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface ModalProps {
  onClose: () => void;
  generateNew: () => void;
}

const Ticket = ({ onClose, generateNew }: ModalProps) => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg px-6 pb-8 w-full max-w-lg space-y-4">
        <div className="flex  justify-end">
          <button
            onClick={onClose}
            className="mt-4 bg-[#4b45f0] px-4 py-2 text-white text-xl font-bold rounded-full"
          >
            x
          </button>
        </div>
        <h2 className="text-2xl text-center font-bold text-[#4b45f0]">
          Conference Ticket
        </h2>

        <div className="flex justify-center items-center mt-8">
          {formData.avatarUrl && (
            <Image
              width={100}
              height={100}
              src={formData.avatarUrl || "/placeholder.svg"}
              alt="Avatar"
              className="w-36 h-36 border-2 shadow-md object-cover rounded-full"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-center space-y-4">
            <p>
              <strong className="text-[#e77682]">Full Name:</strong>{" "}
              {formData.fullName}
            </p>
            <p>
              <strong className="text-[#e77682]">Email:</strong>{" "}
              {formData.email}
            </p>
            <p>
              <strong className="text-[#e77682]">Phone Number:</strong>{" "}
              {formData.phoneNumber}
            </p>
            <p>
              <strong className="text-[#e77682]">Location:</strong>{" "}
              {formData.location}
            </p>
            <p>
              <strong className="text-[#e77682]">Date and Time:</strong>{" "}
              {formData.dateTime}
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={generateNew}
            className="mt-4  bg-[#4b45f0] px-4 py-3 rounded-lg text-white hover:opacity-90"
          >
            Generate Another Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
