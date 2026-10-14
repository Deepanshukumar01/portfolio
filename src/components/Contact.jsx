import { useState } from "react";
import { Mail, Copy, Check, Send, Loader2, CircleCheck, CircleAlert, MapPin, ArrowUpRight, Phone } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import "./Contact.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const initialValues = { name: "", email: "", message: "" };

function validate({ name, email, message }) {
  const errors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Please enter a valid email address.";
  if (message.trim().length < 10) errors.message = "Please write a message of at least 10 characters.";
  return errors;
}

/**
 * Sends the message. If `profile.contactFormEndpoint` is set (e.g. Formspree),
 * it POSTs there; otherwise it opens the visitor's email client as a fallback.
 */
async function sendMessage(values) {
  if (profile.contactFormEndpoint) {
    const res = await fetch(profile.contactFormEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Form submission failed");
    return "sent";
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
  const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  return "mailto";
}

const statusMessages = {
  sent: "Thanks! Your message has been sent — I'll get back to you soon.",
  mailto: "Your email app should open with the message ready to send.",
  error: `Something went wrong. Please email me directly at ${profile.email}.`,
};

export default function Contact() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    setStatus("sending");
    try {
      const result = await sendMessage(values);
      setStatus(result);
      if (result === "sent") setValues(initialValues);
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — the address is still visible to copy manually.
    }
  }

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? "true" : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact card">
          <div className="contact__intro">
            <SectionHeading
              section="contact"
              id="contact-title"
              eyebrow="Contact"
              stacked
              title={
                <>
                  Let&apos;s build something <span className="gradient-text">together</span>
                </>
              }
              lead="I'm currently open to internship opportunities, collaborative projects, and interesting software development work."
            />

            <ul role="list" className="contact__channels">
              <li className="contact-channel">
                <span className="contact-channel__icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span className="contact-channel__text">
                  <span className="contact-channel__label">Email</span>
                  <a href={`mailto:${profile.email}`} className="contact-channel__value">
                    {profile.email}
                  </a>
                </span>
                <button
                  type="button"
                  className="icon-btn contact-channel__copy"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                >
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                </button>
                <span className="visually-hidden" role="status">
                  {copied ? "Email address copied" : ""}
                </span>
              </li>
              {profile.phone && (
                <li>
                  <a className="contact-channel contact-channel--link" href={`tel:${profile.phoneHref}`}>
                    <span className="contact-channel__icon" aria-hidden="true">
                      <Phone size={18} />
                    </span>
                    <span className="contact-channel__text">
                      <span className="contact-channel__label">Phone</span>
                      <span className="contact-channel__value">{profile.phone}</span>
                    </span>
                    <ArrowUpRight className="contact-channel__arrow" size={16} aria-hidden="true" />
                  </a>
                </li>
              )}
              <li>
                <a
                  className="contact-channel contact-channel--link"
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel__icon" aria-hidden="true">
                    <FaGithub size={18} />
                  </span>
                  <span className="contact-channel__text">
                    <span className="contact-channel__label">GitHub</span>
                    <span className="contact-channel__value">@{profile.githubUsername}</span>
                  </span>
                  <ArrowUpRight className="contact-channel__arrow" size={16} aria-hidden="true" />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  className="contact-channel contact-channel--link"
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact-channel__icon" aria-hidden="true">
                    <FaLinkedinIn size={18} />
                  </span>
                  <span className="contact-channel__text">
                    <span className="contact-channel__label">LinkedIn</span>
                    <span className="contact-channel__value">in/deepanshukumar0001</span>
                  </span>
                  <ArrowUpRight className="contact-channel__arrow" size={16} aria-hidden="true" />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>

            <p className="contact__location">
              <MapPin size={15} aria-hidden="true" />
              Based in {profile.location}
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <p className="kicker">Send a message</p>
            <div className="contact-form__row">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps("name")} />
                {errors.name && (
                  <p className="field__error" id="contact-name-error">
                    <CircleAlert size={14} aria-hidden="true" />
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input type="email" autoComplete="email" placeholder="you@company.com" {...fieldProps("email")} />
                {errors.email && (
                  <p className="field__error" id="contact-email-error">
                    <CircleAlert size={14} aria-hidden="true" />
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea rows="6" placeholder="Tell me about the opportunity or project…" {...fieldProps("message")} />
              {errors.message && (
                <p className="field__error" id="contact-message-error">
                  <CircleAlert size={14} aria-hidden="true" />
                  {errors.message}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn--primary contact-form__submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <Loader2 className="spin" size={17} aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} aria-hidden="true" />
                </>
              )}
            </button>

            <div role="status" aria-live="polite">
              {statusMessages[status] && (
                <p className={`contact-form__status contact-form__status--${status === "error" ? "error" : "ok"}`}>
                  {status === "error" ? (
                    <CircleAlert size={16} aria-hidden="true" />
                  ) : (
                    <CircleCheck size={16} aria-hidden="true" />
                  )}
                  {statusMessages[status]}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
