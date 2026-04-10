import AnimatedInputLabel from "../animated-input-label";
import { type HouseholdFormData } from "~/app/utils/shared-types";
import { MapPin, Phone, Mail, Globe, Map } from "lucide-react";

type ContactFormProps = {
  householdFormData: HouseholdFormData;
  handleOnChange: ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => void;
};

export default function ContactForm({
  householdFormData,
  handleOnChange,
}: ContactFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5">
        <div className="relative group">
          <AnimatedInputLabel
            id="household-address1"
            inputValue={householdFormData.address1 ?? ""}
            fieldName="address1"
            labelText="Dirección / Calle y Número"
            handleOnChange={handleOnChange}
          />
        </div>
        <AnimatedInputLabel
          id="household-address2"
          inputValue={householdFormData.address2 ?? ""}
          fieldName="address2"
          labelText="Depto / Suite / Edificio (Opcional)"
          handleOnChange={handleOnChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AnimatedInputLabel
          id="household-city"
          inputValue={householdFormData.city ?? ""}
          fieldName="city"
          labelText="Ciudad"
          handleOnChange={handleOnChange}
        />
        <div className="relative group">
          <AnimatedInputLabel
            id="household-state"
            inputValue={householdFormData.state ?? ""}
            fieldName="state"
            labelText="Estado / Provincia"
            handleOnChange={handleOnChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-amber-500/50 transition-colors">
            <Map className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <AnimatedInputLabel
          id="household-zipCode"
          inputValue={householdFormData.zipCode ?? ""}
          fieldName="zipCode"
          labelText="Código Postal"
          handleOnChange={handleOnChange}
        />
        <div className="relative group">
          <select
            className="w-full h-14 rounded-2xl bg-zinc-950/50 border border-white/5 px-4 pt-4 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-0 transition-all backdrop-blur-md appearance-none"
            value={householdFormData.country ?? ""}
            onChange={(e) =>
              handleOnChange({ field: "country", inputValue: e.target.value })
            }
          >
            <option value="" disabled className="bg-zinc-950">País</option>
            <option value="Mexico" className="bg-zinc-950">México</option>
            <option value="United States" className="bg-zinc-950">Estados Unidos</option>
            <option value="Canada" className="bg-zinc-950">Canadá</option>
            <option value="Other" className="bg-zinc-950">Otro</option>
          </select>
          <label className="absolute left-4 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform text-[10px] font-black uppercase tracking-widest text-zinc-500">
            País
          </label>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-amber-500/50 transition-colors">
            <Globe className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative group">
          <AnimatedInputLabel
            id="household-phone"
            type="tel"
            inputValue={householdFormData.phone ?? ""}
            fieldName="phone"
            labelText="Teléfono"
            handleOnChange={handleOnChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-amber-500/50 transition-colors">
            <Phone className="h-4 w-4" />
          </div>
        </div>
        <div className="relative group">
          <AnimatedInputLabel
            id="household-email"
            type="email"
            inputValue={householdFormData.email ?? ""}
            fieldName="email"
            labelText="Correo Electrónico"
            handleOnChange={handleOnChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-amber-500/50 transition-colors">
            <Mail className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
