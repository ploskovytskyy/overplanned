import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

export const Highlight = ({
  data,
  rounded = "default",
}: {
  data?: { name: string; color: string };
  rounded?: "default" | "xl";
}) => {
  return (
    <div
      style={{ borderColor: data?.color }}
      className={cn(
        "border-2 absolute inset-0",
        "transition-opacity opacity-0 invisible pointer-events-none",
        {
          "opacity-100 visible": !!data,
          "rounded-2xl rounded-tl-none": rounded === "xl",
          "rounded rounded-tl-none": rounded === "default",
        },
      )}
    >
      <span
        className="flex items-center gap-1 text-xs font-medium absolute bottom-full -left-0.5 px-1 py-0.5 rounded-t-sm"
        style={{ backgroundColor: data?.color }}
      >
        {data?.name}
        <Pencil className="size-3" />
      </span>
    </div>
  );
};
