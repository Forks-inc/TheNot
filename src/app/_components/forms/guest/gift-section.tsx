import { sharedStyles } from "~/app/utils/shared-styles";
import { Gift, CheckCircle2, Heart } from "lucide-react";
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
        <div key={gift.eventId} className="glass-card p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group relative overflow-hidden">
          <div className="absolute top-0 right-0 h-24 w-24 bg-rose-500/5 blur-3xl -mr-12 -mt-12 rounded-full" />
          
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center">
              <Gift className="h-4 w-4 text-rose-300" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Regalo para</span>
              <h3 className="text-sm font-black italic text-white tracking-tighter">
                {gift.event?.name}
              </h3>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="relative group/input">
              <textarea
                placeholder="Descripción del regalo recibido..."
                className="w-full min-h-[100px] rounded-2xl bg-zinc-950/50 border border-white/5 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-rose-500/50 focus:outline-none focus:ring-0 transition-all backdrop-blur-md resize-none"
                value={gift.description ?? ""}
                onChange={(e) => handleOnChange("description", e.target.value, gift.eventId)}
              />
            </div>

            <button
              type="button"
              onClick={() => handleOnChange("thankyou", !gift.thankyou, gift.eventId)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                gift.thankyou
                  ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                  : "bg-zinc-950/50 border-white/5 text-zinc-500 hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`h-6 w-6 rounded-lg border flex items-center justify-center transition-all ${gift.thankyou ? "bg-emerald-400 border-emerald-400 text-black" : "border-zinc-800 bg-zinc-900 group-hover:border-zinc-700"}`}>
                  {gift.thankyou && <CheckCircle2 className="h-3.5 w-3.5" />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${gift.thankyou ? "text-emerald-200" : "text-zinc-600"}`}>
                  Tarjeta de agradecimiento enviada
                </span>
              </div>
              {gift.thankyou && (
                <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
