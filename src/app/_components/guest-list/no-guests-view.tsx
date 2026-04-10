import { useToggleGuestForm } from "../contexts/guest-form-context";
import { sharedStyles } from "~/app/utils/shared-styles";
import ExampleTable from "./example-table";
import { UserPlus, Download } from "lucide-react";
import { motion } from "framer-motion";

import { type Dispatch, type SetStateAction } from "react";
import { type HouseholdFormData } from "~/app/utils/shared-types";

type NoGuestsViewProps = {
  setPrefillHousehold: Dispatch<SetStateAction<HouseholdFormData | undefined>>;
};

export default function NoGuestsView({
  setPrefillHousehold,
}: NoGuestsViewProps) {
  const toggleGuestForm = useToggleGuestForm();
  
  return (
    <section className="flex flex-col items-center justify-center py-20 px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-xl w-full p-12 rounded-[2.5rem] text-center space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        <div className="space-y-3">
          <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
            <UserPlus className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter text-white">Tu lista de invitados está vacía</h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            Comienza a agregar invitados para tu gran día. Puedes importar desde otros eventos o crear invitaciones manualmente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className={sharedStyles.secondaryButton()}>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span>Importar Invitados</span>
            </div>
          </button>
          <button
            className={sharedStyles.primaryButton()}
            onClick={() => {
              setPrefillHousehold(undefined);
              toggleGuestForm();
            }}
          >
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Agregar primer invitado</span>
            </div>
          </button>
        </div>
      </motion.div>

      <div className="mt-20 w-full max-w-5xl opacity-30 grayscale pointer-events-none">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-8">Vista de Ejemplo</p>
        <ExampleTable />
      </div>
    </section>
  );
}
