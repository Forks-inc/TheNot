import { sharedStyles } from "~/app/utils/shared-styles";
import { useToggleGuestForm } from "../../contexts/guest-form-context";
import { Check, UserPlus, X, Save } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="flex items-center justify-center gap-3">
            {isCreatingGuests ? (
              <div className="h-3 w-3 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
            <span>{isCreatingGuests ? "Guardando..." : "Guardar y Cerrar"}</span>
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
          <div className="flex items-center justify-center gap-3">
            {isCreatingGuests ? (
              <div className="h-3 w-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <UserPlus className="h-3.5 w-3.5" />
            )}
            <span>{isCreatingGuests ? "Guardando..." : "Agregar Otro"}</span>
          </div>
        </button>
      </div>

      <button
        type="button"
        onClick={() => toggleGuestForm()}
        className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-rose-500 transition-all flex items-center justify-center gap-2 group"
        disabled={isCreatingGuests}
      >
        <X className="h-3 w-3 group-hover:scale-110 transition-transform" />
        <span>Cancelar cambios</span>
      </button>
    </div>
  );
}
