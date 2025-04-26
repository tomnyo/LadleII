import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface AddViaLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (link: string) => void;
}

export default function AddViaLinkModal({
  isOpen,
  onClose,
  onSubmit,
}: AddViaLinkModalProps) {
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    onSubmit(link);
    setLink("");
  };

  const handleClose = () => {
    setLink("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-black/30">
      <DialogContent className="sm:max-w-md mx-auto max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Add recipe via link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Paste a link to a recipe. Import from anwhere, including social
              media.
            </p>
            <Input
              placeholder="https://example.com/recipe"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full focus:outline-none focus:border-[#7D4CDB] focus:border-[1px] focus:ring-0 focus:shadow-none"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleClose}
            className="bg-[#F0F0F0] border border-[#D1D5DB] font-[Inter]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#3B81F6] text-white font-[Inter] hover:bg-[#3B81F6]/90"
          >
            Import Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
