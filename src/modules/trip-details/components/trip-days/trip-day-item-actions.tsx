import {
  Copy,
  ExternalLink,
  MoreHorizontalIcon,
  Pencil,
  Trash2Icon,
} from "lucide-react";

import { useOpenTripItemRemoveAlert } from "../../hooks/use-open-trip-item-remove-alert";
import { useOpenTripItemEditDialog } from "../../hooks/use-open-trip-item-edit-dialog";
import type { TripItem } from "../../hooks/use-days-with-items";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const TripDayItemActions = ({ itemData }: { itemData: TripItem }) => {
  const openRemoveAlert = useOpenTripItemRemoveAlert(
    (store) => store.openTripItemRemoveAlert,
  );

  const openUpdateAlert = useOpenTripItemEditDialog(
    (store) => store.openTripItemEditDialog,
  );

  return (
    <>
      <ButtonGroup className="ml-auto">
        {!!itemData.url && itemData.url.startsWith("http") && (
          <Button asChild variant="outline" size="sm">
            <a
              aria-label="Open link in a new tab"
              href={itemData.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink />
            </a>
          </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon-sm" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => openUpdateAlert(itemData)}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy />
                Duplicate
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onSelect={() => openRemoveAlert(itemData._id)}
              >
                <Trash2Icon />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </>
  );
};
