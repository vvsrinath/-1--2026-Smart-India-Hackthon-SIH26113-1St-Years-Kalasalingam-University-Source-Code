import React, { useState } from 'react';
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Panel } from '../../components/common/Panel';

const details = [
{ icon: MailIcon, label: 'Email', value: 'support@swastyasathi.demo' },
{ icon: PhoneIcon, label: 'Helpline', value: '+91 90000 00000 (demo)' },
{ icon: MapPinIcon, label: 'Office', value: 'Patna, Bihar, India' }];


export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-shell px-6 py-12">
      <SectionHeading
        as="h1"
        title="Contact Us"
        subtitle="Questions about Swastya Sathi? Send us a message." />
      

      <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Send a message" subtitle="We usually reply within two working days.">
          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}>
            
            <Input label="Full name" name="name" placeholder="Your name" required />
            <Input
              label="Email or mobile"
              name="contact"
              placeholder="you@example.com"
              required />
            
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-1.5 block text-2xs font-medium text-ink-500">
                
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="How can we help?"
                className="w-full rounded-chip border border-line bg-white px-3 py-2.5 text-xs text-navy placeholder:text-ink-400 transition-colors duration-150 ease-out focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/15" />
              
            </div>
            <div className="flex items-center gap-3 sm:col-span-2">
              <Button type="submit">Send message</Button>
              {sent &&
              <p className="text-2xs text-brand">
                  Message captured in this prototype — nothing is actually sent.
                </p>
              }
            </div>
          </form>
        </Panel>

        <Panel title="Reach us">
          <ul className="space-y-4">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <li key={detail.label} className="flex items-start gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-brand-tint text-brand">
                    <Icon className="h-[15px] w-[15px]" />
                  </span>
                  <span>
                    <span className="block text-2xs text-ink-400">{detail.label}</span>
                    <span className="block text-xs font-medium text-navy">
                      {detail.value}
                    </span>
                  </span>
                </li>);

            })}
          </ul>
          <p className="mt-5 text-2xs leading-5 text-ink-400">
            Contact details shown are placeholders for this prototype.
          </p>
        </Panel>
      </div>
    </div>);

}