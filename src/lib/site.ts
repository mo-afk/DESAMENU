/**
 * Central place for brand + contact details.
 * Replace the placeholder contact values before launch.
 */
export const site = {
  brand: "DESA Menu",
  agency: "DESA Agency",
  tagline: "Premium digital menu ecosystems for hospitality",
  email: "hello@desamenu.com",
  /* TODO: replace with the live DESA Agency handles. */
  whatsapp: "https://wa.me/971400000000",
  instagram: "https://instagram.com/desamenu",
} as const;

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Demos", href: "#demos" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
] as const;

export const VENUE_TYPES = [
  "Fine Dining Restaurant",
  "Cafe / Coffee Shop",
  "Lounge / Bar",
  "Hotel / Hospitality Concept",
  "Beach Club / Rooftop",
  "Other",
] as const;
