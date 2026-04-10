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
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          disabled={isUpdatingHousehold}
          onClick={() => toggleGuestForm()}
          className={`flex-1 ${sharedStyles.secondaryButton({
            isLoading: isUpdatingHousehold,
          })}`}
        >
          <div className="flex items-center justify-center gap-3">
            <X className="h-3.5 w-3.5" />
            <span>Cancelar</span>
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
          <div className="flex items-center justify-center gap-3">
            {isUpdatingHousehold ? (
              <div className="h-3 w-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <Save className="h-3.5 w-3.5" />
            )}
            <span>{isUpdatingHousehold ? "Guardando..." : "Guardar Cambios"}</span>
          </div>
        </button>
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          setShowDeleteConfirmation(true);
        }}
        className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:text-rose-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        disabled={isUpdatingHousehold}
      >
        <Trash2 className="h-3 w-3 group-hover:scale-110 transition-transform" />
        <span>{isUpdatingHousehold ? "Procesando..." : "Eliminar este grupo e invitaciones"}</span>
      </button>
    </div>
  );
}
