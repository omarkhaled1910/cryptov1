import { ArrowUpAZIcon, UploadCloudIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Accept, useDropzone } from "react-dropzone";

function ImageUploader({ files, setFiles, onChange }: any) {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*" as unknown as Accept,
    onDrop: (acceptedFiles: any) => {
      onChange((old: any) => [
        ...old,
        ...acceptedFiles.map((file: any) => URL.createObjectURL(file)),
      ]);

      setFiles((old: any) => [...old, ...acceptedFiles]);
    },
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    return () =>
      files?.forEach((file: any) => URL.revokeObjectURL(file?.preview));
  }, [files]);

  return (
    <section className="border-blue container mt-5 cursor-pointer border p-10">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className=" flex !flex-col items-center justify-center gap-3">
          <div>Drag 'n' drop some Images here, or click to select files </div>
          <UploadCloudIcon width={64} height={64} style={{ width: "100px" }} />
        </div>
      </div>
      {/* <div className='flex h-auto items-center gap-3 pt-5'>{thumbs}</div> */}
    </section>
  );
}

export default ImageUploader;
