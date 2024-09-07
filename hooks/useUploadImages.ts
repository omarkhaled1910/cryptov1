import { deleteUploadedImage } from "@/lib/utils";
import { useCallback, useState } from "react";

const isNotLocal = (src: string) => src.includes("firebasestorage");

export const useUploadImages = (productId?: string, product?: any) => {
  const [files, setFiles] = useState<any>([]);

  const [items, setItems] = useState(product?.images || []);
  const handleDrag = useCallback((e: any) => {
    const first = e.active.data.current.sortable.index;
    const second = e.over.data.current.sortable.index;

    setItems((old: any) => {
      const oldArr = [...old];
      oldArr[first] = old[second];
      oldArr[second] = old[first];
      return [...oldArr];
    });
  }, []);
  const handleDeleteImage = useCallback(
    async (src: string) => {
      console.log(src, "delete image ");
      setItems((old: string[]) => old.filter((img: string) => img !== src));
      if (isNotLocal(src) && productId) {
        //handle firebase dlete]
        await deleteUploadedImage(src);
        return;
      }
      setFiles((old: string[]) => old.filter((img: string) => img !== src));
    },
    [productId]
  );

  return {
    handleDrag,
    items,
    files,
    setFiles,
    setItems,
    handleDeleteImage,
  };
};

export interface UseUploadImagesResult {
  handleDrag: (e: any) => void;
  items: string[];
  files: string[];
  setFiles: React.Dispatch<React.SetStateAction<string[]>>;
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  handleDeleteImage: (src: string) => Promise<void>;
}
