import { sharedStyles } from "~/app/utils/shared-styles";
import { Gift, CheckCircle2 } from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { type HouseholdFormData } from "~/app/utils/shared-types";

type GiftSectionProps = {
  setHouseholdFormData: Dispatch<SetStateAction<HouseholdFormData>>;
  householdFormData: HouseholdFormData;
};

export default function GiftSection({
  householdFormData,
  setHouseholdFormData,
}: GiftSectionProps) {
  const handleOnChange = (
    key: string,
    value: boolean | string,
    updatedEvent: string,
  ) => {
    setHouseholdFormData((prev) => ({
      ...prev,
      gifts: prev.gifts?.map((gift) => {
        if (gift.eventId === updatedEvent) {
          return { ...gift, [key]: value };
        }
        return gift;
      }),
    }));
  };

  return (
    <div className="space-y-6">
      {householdFormData.gifts?.map((gift) => (
        <div key={gift.eventId} className="glass-card p-6 rounded-3xl bg-white/[0.02] border border-zinc-900 group">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-8 rounded-xl bg-zinc-900 flex items-center justify-center">
              <Gift className="h-4 w-4 text-primary" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white">
              {gift.event?.name}
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative group/input">
              <input
                placeholder="Description of the gift received..."
                className="w-full h-[52px] rounded-2xl bg-zinc-900/50 border border-zinc-800 px-4 text-sm text-white placeholder:text-zinc-600 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none"
                value={gift.description ?? ""}
                onChange={(e) => handleOnChange("description", e.target.value, gift.eventId)}
              />
            </div>

            <label
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer ${
                gift.thankyou
                  ? "bg-emerald-500/5 border-emerald-500/20 text-white"
                  : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800"
              }`}
              htmlFor={`thank-you-event-${gift.eventId}`}
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`thank-you-event-${gift.eventId}`}
                  className="peer h-5 w-5 rounded-md border-zinc-800 bg-zinc-900 text-emerald-500 focus:ring-emerald-500/20 cursor-pointer"
                  checked={gift.thankyou}
                  onChange={(e) => handleOnChange("thankyou", e.target.checked, gift.eventId)}
                />
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`h-3 w-3 ${gift.thankyou ? "text-emerald-400" : "text-zinc-700"}`} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Thank You Card Sent
                </span>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}
