"use client";

import { useState } from "react";
import { useToggleGuestForm } from "../contexts/guest-form-context";
import { useGuestFormActions } from "../hooks/forms/useGuestFormActions";
import { sharedStyles } from "../../utils/shared-styles";
import { X, Plus, UserPlus, Info } from "lucide-react";
import { GuestNameForm } from "./guest/guest-names";
import SidePaneWrapper from "./wrapper";
import DeleteConfirmation from "./delete-confirmation";
import ContactForm from "./guest/contact-form";
import GiftSection from "./guest/gift-section";
import AddFormButtons from "./guest/add-buttons";
import EditFormButtons from "./guest/edit-buttons";
import { motion } from "framer-motion";

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
    if (!isEditMode || !prefillFormData) return "New Party Invitation";
    const primaryContact = prefillFormData.guestParty.find(
      (guest) => guest.isPrimaryContact,
    );
    const numGuests = prefillFormData.guestParty.length;
    const primaryContactName = primaryContact ? `${primaryContact.firstName} ${primaryContact.lastName}` : "Unnamed Party";

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
        disclaimerText="Are you sure you want to delete this group and all its invitations? This action cannot be undone."
        noHandler={() => setShowDeleteConfirmation(false)}
        yesHandler={() => deleteHousehold({ householdId: householdFormData.householdId })}
      />
    );
  }

  return (
    <SidePaneWrapper>
      <form
        className="flex flex-col min-h-screen pb-32"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-6 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Guest Management</span>
            <h1 className="text-xl md:text-2xl font-black italic text-white tracking-tighter">{getTitle()}</h1>
          </div>
          <button 
            type="button"
            onClick={() => toggleGuestForm()}
            className="p-2.5 rounded-full bg-zinc-900 text-zinc-500 hover:text-white transition-all active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 px-8 py-8 space-y-12">
          {/* Party Members Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Party Members</h2>
              <button
                type="button"
                onClick={() => handleAddGuestToParty()}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:brightness-110 transition-all"
              >
                <UserPlus className="h-3 w-3" />
                Add Person
              </button>
            </div>
            
            <div className="space-y-4">
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
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Logistics & Contact</h2>
            <div className="glass-card p-6 rounded-3xl bg-white/[0.02]">
              <ContactForm
                householdFormData={householdFormData}
                handleOnChange={handleOnChange}
              />
            </div>
          </section>

          {/* Notes Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Private Notes</h2>
              <div className="group relative">
                <Info className="h-3 w-3 text-zinc-600" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 invisible group-hover:visible">
                  Include dietary requirements, allergies, or anything else helpful for planning.
                </span>
              </div>
            </div>
            <textarea
              placeholder="e.g. Nut allergies, needs a high chair, staying at the venue..."
              value={householdFormData.notes}
              onChange={(e) => handleOnChange({ field: "notes", inputValue: e.target.value })}
              className="w-full h-32 rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all outline-none resize-none"
            />
          </section>

          {isEditMode && (
            <section className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Gifts & Gratitude</h2>
              <GiftSection
                setHouseholdFormData={setHouseholdFormData}
                householdFormData={householdFormData}
              />
            </section>
          )}
        </div>

        <div className="sticky bottom-0 z-20 px-8 py-6 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800">
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
