import { sharedStyles } from "~/app/utils/shared-styles";
import { useToggleGuestForm } from "../../contexts/guest-form-context";
import { Check, UserPlus, X } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";

type AddFormButtonsProps = {
  isCreatingGuests: boolean;
  setCloseForm: Dispatch<SetStateAction<boolean>>;
};

export default function AddFormButtons({
  isCreatingGuests,
  setCloseForm,
}: AddFormButtonsProps) {
  const toggleGuestForm = useToggleGuestForm();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          id="save-household-close"
          type="submit"
          name="add-button"
          disabled={isCreatingGuests}
          onClick={() => setCloseForm(true)}
          className={`flex-1 ${sharedStyles.secondaryButton({
            isLoading: isCreatingGuests,
          })}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4" />
            <span>{isCreatingGuests ? "Saving..." : "Save & Close"}</span>
          </div>
        </button>
        
        <button
          id="save-household-another"
          type="submit"
          name="add-button"
          disabled={isCreatingGuests}
          className={`flex-1 ${sharedStyles.primaryButton({
            isLoading: isCreatingGuests,
          })}`}
          onClick={() => setCloseForm(false)}
        >
          <div className="flex items-center justify-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>{isCreatingGuests ? "Saving..." : "Add Another"}</span>
          </div>
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleGuestForm()}
        className="w-full py-2 text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-rose-500 transition-colors flex items-center justify-center gap-2"
        disabled={isCreatingGuests}
      >
        <X className="h-3 w-3" />
        <span>Cancel Changes</span>
      </button>
    </div>
  );
}
