import { useFormContext } from "react-hook-form";
import ImageUpload from "./ImageUpload";


const Step2 = () => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const avatarUrl = watch("avatarUrl");
  console.log(avatarUrl);
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Event Details</h2>
      <div>
        <label htmlFor="location" className="block mb-2">
          Location
        </label>
        <input
          id="location"
          {...register("location", { required: "Location is required" })}
          className="w-full p-2 border rounded"
          aria-invalid={errors.location ? "true" : "false"}
        />
        {errors.location && (
          <p role="alert" className="text-red-500">
            {errors.location.message as string}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="dateTime" className="block mb-2">
          Date and Time
        </label>
        <input
          id="dateTime"
          type="datetime-local"
          {...register("dateTime", { required: "Date and time is required" })}
          className="w-full p-2 border rounded"
          aria-invalid={errors.dateTime ? "true" : "false"}
        />
        {errors.dateTime && (
          <p role="alert" className="text-red-500">
            {errors.dateTime.message as string}
          </p>
        )}
      </div>
      <ImageUpload onUpload={(dataUrl) => setValue("avatarUrl", dataUrl)} />
      
    </div>
  );
};

export default Step2;
