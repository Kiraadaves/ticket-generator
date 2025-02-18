import { useFormContext } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface Step2Props {
  nextStep: () => void;
  prevStep: () => void;
}

const Step2 = ({ nextStep, prevStep }: Step2Props) => {
  const {
    register,
    formState: { errors, isValid },
    trigger,
    setValue,
    watch,
  } = useFormContext();
  const avatarUrl = watch("avatarUrl");
  console.log(avatarUrl);
  const handleNext = async () => {
    const isStepValid = await trigger(["location", "dateTime", "avatarUrl"]);
    if (isStepValid) {
      nextStep();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-[#4b45f0]">Event Details</h2>
      <p className="text-slate-500">
        Please provide your location, select a date and add an avatar or photo.
      </p>
      <div>
        <label htmlFor="location" className="block mb-2 text-[#27247e]">
          Location
        </label>
        <input
          id="location"
          {...register("location", { required: "Location is required" })}
          className="w-full p-3 border rounded outline-[#4b45f096]"
          aria-invalid={errors.location ? "true" : "false"}
        />
        {errors.location && (
          <p role="alert" className="text-red-500 mt-2">
            {errors.location.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="dateTime" className="block mb-2 text-[#27247e]">
          Date and Time
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          {...register("dateTime", { required: "Date and time is required" })}
          className="w-full p-3 border rounded outline-[#4b45f096]"
          aria-invalid={errors.dateTime ? "true" : "false"}
        />
        {errors.dateTime && (
          <p role="alert" className="text-red-500 mt-2">
            {errors.dateTime.message as string}
          </p>
        )}
      </div>
      <ImageUpload onUpload={(dataUrl) => setValue("avatarUrl", dataUrl)} />
      <div className="flex justify-between mt-8 items-center">
        {" "}
        <button
          type="button"
          onClick={prevStep}
          className="bg-[#4b45f0] px-4 py-3 rounded-lg text-[#ffffff] w-36"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          className="ml-auto bg-[#4b45f0] px-4 py-3 rounded-lg text-[#ffffff] w-36 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
