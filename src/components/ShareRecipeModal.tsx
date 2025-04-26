import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useEffect, useRef } from "react";

interface ShareRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeUrl: string;
}

export default function ShareRecipeModal({
  isOpen,
  onClose,
  recipeUrl,
}: ShareRecipeModalProps) {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.select();
      }, 100);
    }

    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recipeUrl);
      setCopied(true);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-black/30">
      <DialogContent className="sm:max-w-md mx-auto max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Share this recipe</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-muted-foreground">
              Share this recipe with friends and family.
            </p>
            <Input
              ref={inputRef}
              value={recipeUrl}
              readOnly
              className="w-full focus:outline-none focus:border-[#7D4CDB] focus:border-[1px] focus:ring-0 focus:shadow-none"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between flex flex-col-reverse sm:flex-row gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-[#F0F0F0] border border-[#D1D5DB] font-[Inter]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCopy}
            className="bg-[#3B81F6] text-white font-[Inter] hover:bg-[#3B81F6]/90"
          >
            {copied ? "Copied!" : "Copy link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
