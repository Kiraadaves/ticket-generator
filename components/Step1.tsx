import { useFormContext } from "react-hook-form";

interface Step1Props {
  nextStep: () => void;
}

const Step1 = ({ nextStep }: Step1Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Personal Information</h2>
      <div>
        <label htmlFor="fullName" className="block mb-2">
          Full Name
        </label>
        <input
          id="fullName"
          {...register("fullName", { required: "Full name is required" })}
          className="w-full p-2 border rounded"
          aria-invalid={errors.fullName ? "true" : "false"}
        />
        {errors.fullName && (
          <p role="alert" className="text-red-500">
            {errors.fullName.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block mb-2">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          className="w-full p-2 border rounded"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p role="alert" className="text-red-500">
            {errors.email.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block mb-2">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          {...register("phoneNumber", { required: "Phone number is required" })}
          className="w-full p-2 border rounded"
          aria-invalid={errors.phoneNumber ? "true" : "false"}
        />
        {errors.phoneNumber && (
          <p role="alert" className="text-red-500">
            {errors.phoneNumber.message as string}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={nextStep}
        className="ml-auto bg-[#4b45f0] px-4 py-2 rounded-lg text-[#ffffff] hover:opacity-90"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
