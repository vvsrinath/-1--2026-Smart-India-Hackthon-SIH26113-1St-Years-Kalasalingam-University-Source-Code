import { Route, Routes } from 'react-router-dom';
import {
  BellIcon,
  ClipboardListIcon,
  FileTextIcon,
  FolderOpenIcon,
  HeartPulseIcon,
  HelpCircleIcon,
  HomeIcon,
  MapPinIcon,
  MessageSquareIcon,
  PillIcon,
  RepeatIcon,
  SettingsIcon,
  ShieldCheckIcon,
  UsersIcon,
  VideoIcon } from
'lucide-react';

import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PatientLayout } from '../layouts/PatientLayout';
import { DoctorLayout } from '../layouts/DoctorLayout';
import { SpecialistLayout } from '../layouts/SpecialistLayout';
import { WorkerLayout } from '../layouts/WorkerLayout';
import { PHCLayout } from '../layouts/PHCLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { Home } from '../pages/public/Home';
import { About } from '../pages/public/About';
import { Services } from '../pages/public/Services';
import { HowItWorks } from '../pages/public/HowItWorks';
import { HealthInformation } from '../pages/public/HealthInformation';
import { Contact } from '../pages/public/Contact';
import { NotFound } from '../pages/public/NotFound';
import { Login } from '../pages/auth/Login';

import { PatientDashboard } from '../pages/patient/PatientDashboard';
import { FindHealthcare } from '../pages/patient/FindHealthcare';
import { PatientAppointments } from '../pages/patient/PatientAppointments';
import { HealthRecords } from '../pages/patient/HealthRecords';
import { PatientReferrals } from '../pages/patient/PatientReferrals';
import { FollowUps } from '../pages/patient/FollowUps';
import { Medicines } from '../pages/patient/Medicines';

import { DoctorDashboard } from '../pages/doctor/DoctorDashboard';
import { DoctorAppointments } from '../pages/doctor/DoctorAppointments';
import { DoctorPatients } from '../pages/doctor/DoctorPatients';
import { PatientConsultation } from '../pages/doctor/PatientConsultation';
import { DoctorReferrals } from '../pages/doctor/DoctorReferrals';

import { SpecialistDashboard } from '../pages/specialist/SpecialistDashboard';
import { SpecialistAppointments } from '../pages/specialist/SpecialistAppointments';
import { SpecialistPatients } from '../pages/specialist/SpecialistPatients';
import { SpecialistReferrals } from '../pages/specialist/SpecialistReferrals';

import { WorkspacePlaceholder } from '../components/common/WorkspacePlaceholder';

const messages =
<WorkspacePlaceholder
  title="Messages"
  subtitle="Secure conversations between patients and care teams."
  icon={MessageSquareIcon}
  emptyTitle="No messages yet"
  emptyDescription="Messaging is outlined in this prototype so navigation stays complete. Conversations will appear here in a full build." />;



const notifications =
<WorkspacePlaceholder
  title="Notifications"
  subtitle="Appointment, referral and follow-up alerts."
  icon={BellIcon}
  emptyTitle="You're all caught up"
  emptyDescription="Alerts about appointments, referral responses and follow-up reminders will be listed here." />;



const profile =
<WorkspacePlaceholder
  title="Profile Settings"
  subtitle="Personal details, language preference and consent settings."
  icon={SettingsIcon}
  emptyTitle="Settings not part of this prototype"
  emptyDescription="Profile, language and consent preferences would be managed from this screen." />;



export function AppRoutes() {
  return (
    <Routes>
      {/* Public website */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/health-information" element={<HealthInformation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
      </Route>

      {/* Patient workspace */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientDashboard />} />
        <Route path="find-healthcare" element={<FindHealthcare />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="records" element={<HealthRecords />} />
        <Route path="referrals" element={<PatientReferrals />} />
        <Route path="follow-up" element={<FollowUps />} />
        <Route path="medicines" element={<Medicines />} />
        <Route
          path="consult-online"
          element={
          <WorkspacePlaceholder
            title="Consult Online"
            subtitle="Audio and video consultations with doctors."
            icon={VideoIcon}
            emptyTitle="No online consultation scheduled"
            emptyDescription="Book an appointment and choose the online mode to start a consultation from here."
            actionLabel="Book appointment"
            actionTo="/patient/appointments" />

          } />
        
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
        <Route
          path="help"
          element={
          <WorkspacePlaceholder
            title="Help & Support"
            subtitle="Guides and assistance for using Swastya Sathi."
            icon={HelpCircleIcon}
            emptyTitle="Support centre coming soon"
            emptyDescription="Help articles and a contact route to the support team would live here."
            actionLabel="Contact us"
            actionTo="/contact" />

          } />
        
      </Route>

      {/* Doctor workspace */}
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatients />} />
        <Route path="patients/:id" element={<PatientConsultation />} />
        <Route path="referrals" element={<DoctorReferrals />} />
        <Route
          path="prescriptions"
          element={
          <WorkspacePlaceholder
            title="Prescriptions"
            subtitle="Prescriptions issued from consultations."
            icon={PillIcon}
            emptyTitle="No prescriptions listed"
            emptyDescription="Prescriptions are recorded inside each consultation in this prototype."
            actionLabel="Open patients"
            actionTo="/doctor/patients" />

          } />
        
        <Route
          path="reports"
          element={
          <WorkspacePlaceholder
            title="Reports"
            subtitle="Lab and imaging reports shared with you."
            icon={FileTextIcon}
            emptyTitle="No reports to review"
            emptyDescription="Reports uploaded by diagnostic centres would be queued here for review." />

          } />
        
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
      </Route>

      {/* Specialist workspace */}
      <Route path="/specialist" element={<SpecialistLayout />}>
        <Route index element={<SpecialistDashboard />} />
        <Route path="appointments" element={<SpecialistAppointments />} />
        <Route path="patients" element={<SpecialistPatients />} />
        <Route path="referrals" element={<SpecialistReferrals />} />
        <Route
          path="prescriptions"
          element={
          <WorkspacePlaceholder
            title="Prescriptions"
            subtitle="Prescriptions issued after specialist review."
            icon={PillIcon}
            emptyTitle="No prescriptions listed"
            emptyDescription="Prescriptions are recorded inside each consultation in this prototype." />

          } />
        
        <Route
          path="records"
          element={
          <WorkspacePlaceholder
            title="Records"
            subtitle="Records shared along with incoming referrals."
            icon={ClipboardListIcon}
            emptyTitle="No shared records open"
            emptyDescription="Referred patient records would be listed here for specialist review."
            actionLabel="View referrals"
            actionTo="/specialist/referrals" />

          } />
        
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
      </Route>

      {/* Health worker workspace */}
      <Route path="/worker" element={<WorkerLayout />}>
        <Route index element={<WorkspacePlaceholder title="Field dashboard" subtitle="Community care tasks and patient follow-ups for the current village cluster." icon={HomeIcon} emptyTitle="No outreach tasks today" emptyDescription="Daily triage and home visits would populate this overview." />} />
        <Route path="patients" element={<WorkspacePlaceholder title="Patient visits" subtitle="List of patients assigned for home visits and screening." icon={UsersIcon} emptyTitle="No patient visits assigned" emptyDescription="Assigned households and ward-based outreach cases would appear here." />} />
        <Route path="triage" element={<WorkspacePlaceholder title="Triage" subtitle="Symptoms, risk flags and referral notes captured in the field." icon={ClipboardListIcon} emptyTitle="No triage notes captured" emptyDescription="Triage checklists and patient risk scoring would be stored here." />} />
        <Route path="referrals" element={<WorkspacePlaceholder title="Referrals" subtitle="Community referrals to PHCs, doctors and specialists." icon={RepeatIcon} emptyTitle="No referral requests" emptyDescription="Outbound referrals and follow-up status would be managed in this screen." />} />
        <Route path="followups" element={<WorkspacePlaceholder title="Follow-ups" subtitle="Home visits and treatment adherence checks." icon={HeartPulseIcon} emptyTitle="No follow-ups scheduled" emptyDescription="Scheduled follow-ups and home-monitoring reminders would appear here." />} />
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
      </Route>

      {/* PHC workspace */}
      <Route path="/phc" element={<PHCLayout />}>
        <Route index element={<WorkspacePlaceholder title="PHC operations" subtitle="Capacity, patient queue and referral tracking for the health centre." icon={ClipboardListIcon} emptyTitle="No shift summary available" emptyDescription="Queue load, medicine stock and diagnostics status would be visible here." />} />
        <Route path="queue" element={<WorkspacePlaceholder title="Patient queue" subtitle="Current check-in and consultation queue by urgency." icon={UsersIcon} emptyTitle="Queue is clear" emptyDescription="Queued patients for the current shift would be displayed here." />} />
        <Route path="patients" element={<WorkspacePlaceholder title="PHC patients" subtitle="Clinic register and active patient lists." icon={FolderOpenIcon} emptyTitle="No active registrations" emptyDescription="Registered patients and recent visits would be tracked here." />} />
        <Route path="referrals" element={<WorkspacePlaceholder title="Referrals" subtitle="Incoming and outgoing referrals managed by the PHC team." icon={RepeatIcon} emptyTitle="No referrals in flow" emptyDescription="Inter-hospital and specialist referral status would be tracked here." />} />
        <Route path="medicines" element={<WorkspacePlaceholder title="Medicines" subtitle="Local stock, restocking thresholds and usage trends." icon={PillIcon} emptyTitle="No medicine inventory loaded" emptyDescription="Stock summaries and replenishment triggers would be shown here." />} />
        <Route path="diagnostics" element={<WorkspacePlaceholder title="Diagnostics" subtitle="Lab reports, imaging references and test follow-up." icon={FileTextIcon} emptyTitle="No diagnostics pending" emptyDescription="Diagnostic centre results and pending review tasks would be listed here." />} />
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
      </Route>

      {/* Admin workspace */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<WorkspacePlaceholder title="System overview" subtitle="Network visibility across villages, facilities and care teams." icon={ShieldCheckIcon} emptyTitle="No operational summary" emptyDescription="Regional performance metrics and intervention status would appear here." />} />
        <Route path="analytics" element={<WorkspacePlaceholder title="Analytics" subtitle="Coverage, utilization and referral performance dashboards." icon={FileTextIcon} emptyTitle="No analytics available" emptyDescription="Service trends and facility-level insights would be shown here." />} />
        <Route path="facilities" element={<WorkspacePlaceholder title="Facilities" subtitle="PHCs, clinics, wellness centres and community access points." icon={MapPinIcon} emptyTitle="No facilities linked" emptyDescription="Facility directory and service availability would be tracked here." />} />
        <Route path="referrals" element={<WorkspacePlaceholder title="Referral oversight" subtitle="Cross-facility referral coordination and issue tracking." icon={RepeatIcon} emptyTitle="No referral escalations" emptyDescription="Referral queues and delayed cases would be visible to administrators." />} />
        <Route path="reports" element={<WorkspacePlaceholder title="Reports" subtitle="Operational snapshots, compliance reports and quality metrics." icon={FileTextIcon} emptyTitle="No reports generated" emptyDescription="PDF and summary reports for districts and facilities would be listed here." />} />
        <Route path="settings" element={<WorkspacePlaceholder title="Settings" subtitle="Role permissions, templates and system configuration." icon={SettingsIcon} emptyTitle="No system settings configured" emptyDescription="Configuration options for the care network and compliance rules would be managed here." />} />
        <Route path="messages" element={messages} />
        <Route path="notifications" element={notifications} />
        <Route path="profile" element={profile} />
      </Route>
    </Routes>);

}