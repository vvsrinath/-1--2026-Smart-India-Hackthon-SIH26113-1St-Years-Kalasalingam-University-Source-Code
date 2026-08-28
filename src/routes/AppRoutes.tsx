import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  BellIcon,
  ClipboardListIcon,
  FileTextIcon,
  HelpCircleIcon,
  MessageSquareIcon,
  PillIcon,
  SettingsIcon,
  VideoIcon } from
'lucide-react';

import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { PatientLayout } from '../layouts/PatientLayout';
import { DoctorLayout } from '../layouts/DoctorLayout';
import { SpecialistLayout } from '../layouts/SpecialistLayout';

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
      </Route>

      {/* Patient workspace */}
      <Route path="/patient" element={<PatientLayout />}>
        <Route index element={<PatientDashboard />} />
        <Route path="find-healthcare" element={<FindHealthcare />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="records" element={<HealthRecords />} />
        <Route path="referrals" element={<PatientReferrals />} />
        <Route path="follow-up" element={<FollowUps />} />
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
    </Routes>);

}