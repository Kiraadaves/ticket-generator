import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type ImageUploadProps = {
  onUpload: (dataUrl: string) => void;
};

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { watch } = useFormContext();
  const avatarUrl = watch("avatarUrl");

  useEffect(() => {
    setPreview(avatarUrl || null);
  }, [avatarUrl]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      onUpload(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <label htmlFor="avatar" className="block mb-2">
        Avatar
      </label>
      <input
        id="avatar"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="w-full p-2 border rounded"
      />
      {preview && (
        <div className="mt-4">
          <p>Preview:</p>
          <Image
            width={100}
            height={100}
            src={preview || "/placeholder.svg"}
            alt="Avatar preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
