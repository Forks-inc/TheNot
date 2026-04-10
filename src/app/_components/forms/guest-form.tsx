"use client";

import { useState } from "react";
import { useToggleGuestForm } from "../contexts/guest-form-context";
import { useGuestFormActions } from "../hooks/forms/useGuestFormActions";
import { sharedStyles } from "../../utils/shared-styles";
import { X, Plus, UserPlus, Info, Users, Globe, Phone, Mail } from "lucide-react";
import { GuestNameForm } from "./guest/guest-names";
import SidePaneWrapper from "./wrapper";
import DeleteConfirmation from "./delete-confirmation";
import ContactForm from "./guest/contact-form";
import GiftSection from "./guest/gift-section";
import AddFormButtons from "./guest/add-buttons";
import EditFormButtons from "./guest/edit-buttons";
import { motion, AnimatePresence } from "framer-motion";

import { type SyntheticEvent } from "react";
import {
  type FormInvites,
  type Event,
  type HouseholdFormData,
  type Gift,
} from "../../utils/shared-types";

const defaultContactData = {
  address1: undefined,
  address2: undefined,
  city: undefined,
  state: undefined,
  country: undefined,
  zipCode: undefined,
  phone: undefined,
  email: undefined,
  notes: undefined,
};

const defaultHouseholdFormData = (events: Event[]) => {
  const invites: FormInvites = {};
  const gifts: Gift[] = [];
  events.forEach((event: Event) => {
    invites[event.id] = "Not Invited";
    gifts.push({
      eventId: event.id,
      thankyou: false,
      description: undefined,
    });
  });
  return {
    ...defaultContactData,
    householdId: "",
    guestParty: [
      {
        firstName: "",
        lastName: "",
        invites,
      },
    ],
    gifts,
  };
};

type GuestFormProps = {
  events: Event[];
  prefillFormData: HouseholdFormData | undefined;
};

export default function GuestForm({ events, prefillFormData }: GuestFormProps) {
  const isEditMode = !!prefillFormData;
  const toggleGuestForm = useToggleGuestForm();
  const [closeForm, setCloseForm] = useState<boolean>(false);
  const [deletedGuests, setDeletedGuests] = useState<number[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [householdFormData, setHouseholdFormData] = useState<HouseholdFormData>(
    prefillFormData ?? defaultHouseholdFormData(events),
  );

  const resetForm = () => {
    setHouseholdFormData(defaultHouseholdFormData(events));
  };

  const {
    createGuests,
    isCreatingGuests,
    updateHousehold,
    isUpdatingHousehold,
    deleteHousehold,
    isDeletingHousehold,
  } = useGuestFormActions(closeForm, resetForm);

  const getTitle = () => {
    if (!isEditMode || !prefillFormData) return "Nueva Invitación";
    const primaryContact = prefillFormData.guestParty.find(
      (guest) => guest.isPrimaryContact,
    );
    const numGuests = prefillFormData.guestParty.length;
    const primaryContactName = primaryContact ? `${primaryContact.firstName} ${primaryContact.lastName}` : "Invitación sin nombre";

    return numGuests > 1
      ? `${primaryContactName} + ${numGuests - 1}`
      : primaryContactName;
  };

  const handleOnChange = ({
    field,
    inputValue,
  }: {
    field: string;
    inputValue: string;
  }) => {
    setHouseholdFormData((prev) => ({ ...prev, [field]: inputValue }));
  };

  const handleAddGuestToParty = () => {
    const invites: FormInvites = {};
    events.forEach((event: Event) => (invites[event.id] = "Not Invited"));
    setHouseholdFormData((prev) => ({
      ...prev,
      guestParty: [
        ...prev.guestParty,
        { firstName: "", lastName: "", invites },
      ],
    }));
  };

  const handleOnSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as unknown as { submitter: HTMLButtonElement };
    const submitter = nativeEvent.submitter;

    if (submitter.name === "add-button") {
      createGuests(householdFormData);
    } else {
      updateHousehold({ ...householdFormData, deletedGuests });
    }
  };

  if (showDeleteConfirmation) {
    return (
      <DeleteConfirmation
        isProcessing={isDeletingHousehold}
        disclaimerText="¿Estás seguro de que deseas eliminar este grupo y todas sus invitaciones? Esta acción no se puede deshacer."
        noHandler={() => setShowDeleteConfirmation(false)}
        yesHandler={() => deleteHousehold({ householdId: householdFormData.householdId })}
      />
    );
  }

  return (
    <SidePaneWrapper>
      <form
        className="h-full flex flex-col bg-zinc-950"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="flex items-center justify-between px-8 py-10 border-b border-white/5">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Gestión de Invitados</p>
            <h1 className="text-3xl font-black italic text-white tracking-tighter antialiased truncate max-w-[300px]">
              {getTitle()}
            </h1>
          </div>
          <button 
            type="button"
            onClick={() => toggleGuestForm()}
            className="p-3 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white hover:border-white/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12 pb-40">
          {/* Party Members Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-amber-200" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Integrantes del Grupo</h2>
              </div>
              <button
                type="button"
                onClick={() => handleAddGuestToParty()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 text-[10px] font-black uppercase tracking-widest text-amber-200 hover:bg-amber-500/20 transition-all border border-amber-500/20"
              >
                <Plus className="h-3 w-3" />
                Agregar Persona
              </button>
            </div>
            
            <div className="space-y-6">
              {householdFormData?.guestParty.map((guest, i) => (
                <GuestNameForm
                  key={i}
                  events={events}
                  guestIndex={i}
                  guest={guest}
                  setHouseholdFormData={setHouseholdFormData}
                  setDeletedGuests={setDeletedGuests}
                />
              ))}
            </div>
          </section>

          {/* Contact Information Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-amber-200" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Logística y Contacto</h2>
            </div>
            <div className="glass-card p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
              <ContactForm
                householdFormData={householdFormData}
                handleOnChange={handleOnChange}
              />
            </div>
          </section>

          {/* Notes Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-amber-200" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Notas Privadas</h2>
              </div>
            </div>
            <div className="relative group">
              <textarea
                placeholder="Ej: Alergias a nueces, necesita silla alta, se hospeda en el hotel..."
                value={householdFormData.notes ?? ""}
                onChange={(e) => handleOnChange({ field: "notes", inputValue: e.target.value })}
                className="w-full h-32 rounded-[2.5rem] bg-zinc-950/50 border border-white/5 p-6 text-sm text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all outline-none resize-none backdrop-blur-md"
              />
              <div className="absolute right-6 bottom-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                <Info className="h-3 w-3" />
                <span>Solo visible para ti</span>
              </div>
            </div>
          </section>

          {isEditMode && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Plus className="h-4 w-4 text-rose-300" />
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Regalos y Agradecimiento</h2>
              </div>
              <GiftSection
                setHouseholdFormData={setHouseholdFormData}
                householdFormData={householdFormData}
              />
            </section>
          )}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-8 pt-12 bg-gradient-to-t from-zinc-950 via-zinc-950 to-transparent border-t border-white/5">
          {isEditMode ? (
            <EditFormButtons
              isUpdatingHousehold={isUpdatingHousehold}
              setShowDeleteConfirmation={setShowDeleteConfirmation}
            />
          ) : (
            <AddFormButtons
              isCreatingGuests={isCreatingGuests}
              setCloseForm={setCloseForm}
            />
          )}
        </div>
      </form>
    </SidePaneWrapper>
  );
}
