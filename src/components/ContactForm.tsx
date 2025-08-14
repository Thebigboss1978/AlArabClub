"use client";

import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! (Placeholder)");
    // In a real application, you would send this data to a backend.
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-b from-card-bg to-card-bg2 border border-green-400/20 rounded-2xl p-4 shadow-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-ink mb-1">الاسم</label>
        <Input id="name" required type="text" className="w-full px-3 py-2 rounded-lg border border-green-600/50 bg-gray-950 text-green-200 focus:ring-green-500 focus:border-green-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">البريد</label>
        <Input id="email" required type="email" className="w-full px-3 py-2 rounded-lg border border-green-600/50 bg-gray-950 text-green-200 focus:ring-green-500 focus:border-green-500" />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1">الرسالة</label>
        <Textarea id="message" required rows={5} className="w-full px-3 py-2 rounded-lg border border-green-600/50 bg-gray-950 text-green-200 focus:ring-green-500 focus:border-green-500" />
      </div>
      <Button type="submit" className="mt-2 px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/20 hover:bg-green-400/20 transition-colors text-ink">
        إرسال
      </Button>
    </form>
  );
};

export default ContactForm;