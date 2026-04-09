import AnimatedInputLabel from "../animated-input-label";
import { type HouseholdFormData } from "~/app/utils/shared-types";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

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
      <div className="grid grid-cols-1 gap-4">
        <div className="relative group">
          <AnimatedInputLabel
            id="household-address1"
            inputValue={householdFormData.address1 ?? ""}
            fieldName="address1"
            labelText="Street Address"
            handleOnChange={handleOnChange}
          />
        </div>
        <AnimatedInputLabel
          id="household-address2"
          inputValue={householdFormData.address2 ?? ""}
          fieldName="address2"
          labelText="Apt/Suite/Other (Optional)"
          handleOnChange={handleOnChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-1">
          <AnimatedInputLabel
            id="household-city"
            inputValue={householdFormData.city ?? ""}
            fieldName="city"
            labelText="City"
            handleOnChange={handleOnChange}
          />
        </div>
        <div className="relative">
          <select
            value={householdFormData.state}
            onChange={(e) =>
              handleOnChange({ field: "state", inputValue: e.target.value })
            }
            className="w-full h-[52px] rounded-2xl bg-zinc-900/50 border border-zinc-800 px-4 text-sm text-zinc-400 focus:text-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none"
          >
            <option value="" disabled>State</option>
            <option value="AL">AL</option>
            <option value="AR">AR</option>
            <option value="WY">WY</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
            <MapPin className="h-4 w-4" />
          </div>
        </div>
        <div>
          <AnimatedInputLabel
            id="household-zipCode"
            inputValue={householdFormData.zipCode ?? ""}
            fieldName="zipCode"
            labelText="Zip Code"
            handleOnChange={handleOnChange}
          />
        </div>
      </div>

      <div className="relative">
        <select
          className="w-full h-[52px] rounded-2xl bg-zinc-900/50 border border-zinc-800 px-4 text-sm text-zinc-400 focus:text-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none appearance-none"
          value={householdFormData.country}
          onChange={(e) =>
            handleOnChange({ field: "country", inputValue: e.target.value })
          }
        >
          <option value="" disabled>Country</option>
          <option>United States</option>
          <option>Mexico</option>
          <option>Canada</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
          <Globe className="h-4 w-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative group">
          <AnimatedInputLabel
            id="household-phone"
            type="tel"
            pattern="([+]\d{2})?\d{10}"
            title="Please enter valid phone number"
            inputValue={householdFormData.phone ?? ""}
            fieldName="phone"
            labelText="Phone Number"
            required={(householdFormData?.phone?.length ?? 0) > 0}
            handleOnChange={handleOnChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-primary/50 transition-colors">
            <Phone className="h-4 w-4" />
          </div>
        </div>
        <div className="relative group">
          <AnimatedInputLabel
            id="household-email"
            type="email"
            inputValue={householdFormData.email ?? ""}
            fieldName="email"
            labelText="Email Address"
            required={(householdFormData?.email?.length ?? 0) > 0}
            handleOnChange={handleOnChange}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-700 group-focus-within:text-primary/50 transition-colors">
            <Mail className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
