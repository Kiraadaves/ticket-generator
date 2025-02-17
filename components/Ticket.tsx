import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface ModalProps {
  onClose: () => void;
}

const Ticket = ({ onClose }: ModalProps) => {
  const { watch } = useFormContext();
  const formData = watch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Conference Ticket</h2>
        <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="flex justify-center items-center">
            {formData.avatarUrl && (
              <Image
                width={100}
                height={100}
                src={formData.avatarUrl || "/placeholder.svg"}
                alt="Avatar"
                className="w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-[#4b45f0] px-4 py-2 rounded-lg text-white hover:opacity-90"
        >
          Close Ticket
        </button>
      </div>
    </div>
  );
};

export default Ticket;
