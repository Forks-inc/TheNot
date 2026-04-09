import { sharedStyles } from "~/app/utils/shared-styles";
import { useToggleGuestForm } from "../../contexts/guest-form-context";
import { Save, Trash2, X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

type EditFormButtonsProps = {
  isUpdatingHousehold: boolean;
  setShowDeleteConfirmation: Dispatch<SetStateAction<boolean>>;
};

export default function EditFormButtons({
  isUpdatingHousehold,
  setShowDeleteConfirmation,
}: EditFormButtonsProps) {
  const toggleGuestForm = useToggleGuestForm();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          disabled={isUpdatingHousehold}
          onClick={() => toggleGuestForm()}
          className={`flex-1 ${sharedStyles.secondaryButton({
            isLoading: isUpdatingHousehold,
          })}`}
        >
          <div className="flex items-center justify-center gap-2">
            <X className="h-4 w-4" />
            <span>Cancel</span>
          </div>
        </button>
        
        <button
          id="edit-save"
          name="edit-button"
          type="submit"
          disabled={isUpdatingHousehold}
          className={`flex-1 ${sharedStyles.primaryButton({
            isLoading: isUpdatingHousehold,
          })}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Save className="h-4 w-4" />
            <span>{isUpdatingHousehold ? "Saving..." : "Save Changes"}</span>
          </div>
        </button>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setShowDeleteConfirmation(true);
        }}
        className="w-full py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
        disabled={isUpdatingHousehold}
      >
        <Trash2 className="h-3 w-3" />
        <span>{isUpdatingHousehold ? "Processing..." : "Delete Party"}</span>
      </button>
    </div>
  );
}
