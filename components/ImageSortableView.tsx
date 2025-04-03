import React from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { TrashIcon } from "lucide-react";

interface ImageSortableViewProps {
  onDragEnd: (event: any) => void; // You might want to specify a more precise type based on the drag end event
  images: string[];
  handleDeleteImage: (id: string) => Promise<void>;
}
interface SortableItemProps {
  id: string;
  handleDeleteImage: (id: string) => Promise<void>;
}

function SortableItem(props: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative  h-36 w-full border border-blue-gray-300 "
      >
        <Image src={props.id} alt={props.id} width={200} height={250} />
      </div>
      <div
        onClick={(e) => {
          console.log(props.id, props);
          e.stopPropagation();
          props.handleDeleteImage(props.id);
        }}
        className="absolute  top-3 right-2 z-50 cursor-pointer"
      >
        <TrashIcon height={22} width={22} color="red" path="red" />
      </div>
    </div>
  );
}

const ImageSortableView = ({
  onDragEnd,
  images = [],
  handleDeleteImage,
}: ImageSortableViewProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="grid h-full w-full grid-cols-3 gap-4 overflow-x-auto border border-gray-600  p-4">
        <SortableContext items={images} strategy={verticalListSortingStrategy}>
          {images.map((id: string) => (
            <SortableItem
              handleDeleteImage={handleDeleteImage}
              key={id}
              id={id}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default ImageSortableView;
