"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useEventForm } from "../contexts/event-form-context";
import { useEditRsvpSettingsForm } from "../contexts/edit-rsvp-settings-form-context";
import DashboardHeader from "./header";
import RegistrySetup from "./registry-setup";
import PageSectionsTemplate from "./page-section-template";
import RsvpContent from "./section-content/rsvp";
import DashboardControls from "./controls";
import SidebarPanel from "./sidebar-panel";
import HomeContent from "./section-content/home";
import EventForm from "../forms/event-form";
import DashboardSettingsForm from "../forms/dashboard-settings-form";
import RsvpFormSettings from "../forms/rsvp-form-settings";
import EditRsvpSettingsForm from "../forms/rsvp/edit-rsvp-settings";
import StatsWidget from "./widgets/stats-widget";
import CountdownWidget from "./widgets/countdown-widget";

import {
  type DashboardData,
  type EventFormData,
} from "~/app/utils/shared-types";

export default function Dashboard({
  dashboardData,
  uploadImage,
  deleteImage,
}: {
  dashboardData: DashboardData;
  uploadImage: (formData: FormData) => Promise<{ ok: boolean }>;
  deleteImage: (imageKey: string) => Promise<{ ok: boolean }>;
}) {
  const isEventFormOpen = useEventForm();
  const showEditRsvpSettings = useEditRsvpSettingsForm();
  const [showRegistrySetup, setShowRegistrySetup] = useState<boolean>(true);
  const [events, setEvents] = useState(dashboardData?.events);
  const [prefillEvent, setPrefillEvent] = useState<EventFormData | undefined>();
  const [collapseSections, setCollapseSections] = useState<boolean>(false);
  const [showRsvpSettings, setShowRsvpSettings] = useState<boolean>(false);
  const [showWebsiteSettings, setShowWebsiteSettings] =
    useState<boolean>(false);

  useEffect(() => {
    setEvents(dashboardData?.events ?? []);
  }, [dashboardData]);

  useEffect(() => {
    setShowRegistrySetup(
      localStorage.getItem("registrySectionStatus") !== "hidden",
    );
  }, []);

  if (showRsvpSettings) {
    return (
      <RsvpFormSettings
        dashboardData={dashboardData}
        setShowRsvpSettings={setShowRsvpSettings}
      />
    );
  }

  // Calculate aggregation for stats
  const aggregateStats = dashboardData?.events?.reduce(
    (acc, event) => {
      acc.attending += event.guestResponses.attending;
      acc.declined += event.guestResponses.declined;
      acc.invited += event.guestResponses.invited;
      return acc;
    },
    { attending: 0, declined: 0, invited: 0 }
  ) || { attending: 0, declined: 0, invited: 0 };

  const coupleNames = `${dashboardData?.weddingData?.brideFirstName} & ${dashboardData?.weddingData?.groomFirstName}`;

  return (
    <div className="space-y-12 pb-20 pt-32">
      {isEventFormOpen && <EventForm prefillFormData={prefillEvent} />}
      {showWebsiteSettings && (
        <DashboardSettingsForm
          setShowWebsiteSettings={setShowWebsiteSettings}
          website={dashboardData?.weddingData?.website}
        />
      )}
      {showEditRsvpSettings && (
        <EditRsvpSettingsForm website={dashboardData?.weddingData.website} />
      )}

      {/* Header & Quick Actions */}
      <DashboardHeader
        websiteUrl={dashboardData?.weddingData?.website?.url}
        setShowWebsiteSettings={setShowWebsiteSettings}
      />

      {/* Main Widgets Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CountdownWidget 
            daysRemaining={dashboardData?.weddingData?.daysRemaining ?? 0} 
            coupleNames={coupleNames}
          />
        </div>
        <div className="lg:col-span-2 space-y-8">
          <StatsWidget 
            totalGuests={dashboardData?.totalGuests ?? 0}
            attending={aggregateStats.attending}
            declined={aggregateStats.declined}
            invited={aggregateStats.invited}
          />
          
          {showRegistrySetup && (
            <RegistrySetup setShowRegistrySetup={setShowRegistrySetup} />
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-12 pt-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
            <h2 className="text-2xl font-black italic text-white tracking-tight">Website Sections</h2>
            <DashboardControls
              collapseSections={collapseSections}
              setCollapseSections={setCollapseSections}
            />
          </div>

          <div className="space-y-4">
            <PageSectionsTemplate title={"Home"} collapse={collapseSections}>
              <HomeContent
                dashboardData={dashboardData}
                events={events}
                setPrefillEvent={setPrefillEvent}
                uploadImage={uploadImage}
                deleteImage={deleteImage}
              />
            </PageSectionsTemplate>

            <PageSectionsTemplate title={"RSVP"} collapse={collapseSections} setShowRsvpSettings={setShowRsvpSettings}>
              <RsvpContent
                events={dashboardData?.events}
                totalGuests={dashboardData?.totalGuests ?? 0}
                generalQuestions={dashboardData?.weddingData.website?.generalQuestions ?? []}
              />
            </PageSectionsTemplate>
            
            {/* Other sections can be implemented similarly */}
            <PageSectionsTemplate title={"Our Story"} collapse={collapseSections} />
            <PageSectionsTemplate title={"Wedding Party"} collapse={collapseSections} />
            <PageSectionsTemplate title={"Photos"} collapse={collapseSections} />
          </div>
        </div>

        <aside className="space-y-8">
          <SidebarPanel setShowWebsiteSettings={setShowWebsiteSettings} />
        </aside>
      </div>
    </div>
  );
}
