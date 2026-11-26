"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  const input =
    "mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Contact us</h1>
      <p className="mt-2 text-slate-500">Questions or feedback? We usually reply within a day.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-3">
        <div className="space-y-5 text-sm text-slate-600">
          <div>
            <p className="font-semibold text-slate-900">Email</p>
            <p>support@jobhub.com</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Phone</p>
            <p>+880 1XXX-XXXXXX</p>
          </div>
          <div>
            <p className="font-semibold text-slate-900">Office</p>
            <p>Dhaka, Bangladesh</p>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 md:col-span-2"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-800">
              Name
              <input required name="name" className={input} />
            </label>
            <label className="text-sm font-medium text-slate-800">
              Email
              <input required type="email" name="email" className={input} />
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-800">
            Message
            <textarea required name="message" rows={5} className={input} />
          </label>

          {sent && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Thanks! Your message has been sent.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}