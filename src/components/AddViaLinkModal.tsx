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
import { triggerRecipeExtraction } from "../api/recipeApi";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // Reset error state
    setError(null);

    // Validate URL
    if (!link) {
      setError("Please enter a URL");
      return;
    }

    // Simple URL validation
    try {
      new URL(link);
    } catch (e) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      // Call the API to extract recipe from the link
      const response = await triggerRecipeExtraction(link);
      console.log("Recipe extraction triggered:", response);

      // Call the onSubmit callback with the link
      onSubmit(link);

      // Reset form
      setLink("");
    } catch (err) {
      console.error("Error extracting recipe:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to import recipe. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setLink("");
    setError(null);
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
              Paste a link to a recipe. Import from anywhere, including social
              media.
            </p>
            <Input
              placeholder="https://example.com/recipe"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="w-full focus:outline-none focus:border-[#7D4CDB] focus:border-[1px] focus:ring-0 focus:shadow-none"
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
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
            type="button"
            onClick={handleSubmit}
            className="bg-[#3B81F6] text-white font-[Inter] hover:bg-[#3B81F6]/90"
            disabled={isLoading}
          >
            {isLoading ? "Importing..." : "Import Recipe"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
