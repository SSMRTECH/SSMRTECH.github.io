/**
 * All page copy and placeholders live here. Edit this file to update the site.
 */

// Official contact address. Override with NEXT_PUBLIC_CONTACT_EMAIL.
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "cto@ssmrtech.co.in";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ssmrtech.co.in";

export const site = {
  name: "SSMR Tech",
  tagline: "Engineering the Connected Future.",
  description:
    "SSMR Tech builds end-to-end IoT solutions, from concept and hardware integration to software, connectivity, cloud and deployment.",
};

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Customers", href: "#customers" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  eyebrow: "IoT · Robotics · Connectivity",
  title: ["Engineering the", "Connected Future."],
  body: "From intelligent IoT devices to robotics and cloud-connected solutions, we bring your ideas to life, from concept to deployment.",
  primary: { label: "Explore Our Solutions", href: "#services" },
  secondary: { label: "Get in Touch", href: "#contact" },
  stages: ["Concept", "Hardware", "Firmware", "Connectivity", "Cloud", "Deployment"],
};

export type ServiceIcon = "iot" | "robotics" | "ble" | "custom";

export const services: { title: string; body: string; icon: ServiceIcon }[] = [
  {
    title: "IoT Solutions",
    body: "End-to-end connected device ecosystems, from sensors and embedded systems to intelligent cloud platforms.",
    icon: "iot",
  },
  {
    title: "Robotics & Automation",
    body: "Smart automation and robotics integrations for real-world business applications.",
    icon: "robotics",
  },
  {
    title: "BLE & Wireless Connectivity",
    body: "Reliable wireless communication, device integration, and Bluetooth Low Energy solutions.",
    icon: "ble",
  },
  {
    title: "Custom Engineering",
    body: "Tailored hardware, software, and cloud solutions built around unique business requirements.",
    icon: "custom",
  },
];

export const customersSection = {
  title: "Trusted by Innovative Teams.",
  body: "Working with businesses to bring connected technology solutions into the real world.",
};

/**
 * Clients. Logos live in /public/customers. `logo` and `href` are optional;
 * without a logo the name renders as a wordmark.
 */
export const customers: { name: string; logo?: string; href?: string }[] = [
  { name: "bEarly Technovations", logo: "/customers/bearly.png", href: "https://bearlytech.com/" },
  { name: "NWarehouse", logo: "/customers/nwarehouse.png", href: "http://n-warehouse.com/" },
  { name: "Crobot Technologies", logo: "/customers/crobot.png", href: "https://crobottech.com/" },
  { name: "CookInCloud", logo: "/customers/cookincloud.jpg", href: "https://www.cookincloud.com/" },
];

/**
 * DRAFT: confirm the wording with the client and fill in the real person's name
 * before deploying. Set `name` to show it above the role; leave empty to show role only.
 */
export const testimonial = {
  quote:
    "SSMR Tech took our idea from a rough concept to a working connected product. Their team understood the hardware, the firmware and the cloud side equally well, and they were a genuine engineering partner throughout.",
  name: "",
  role: "CEO",
  company: "bEarly Technovations",
  logo: "/customers/bearly.png",
};

export const about = {
  title: "Built for Ideas That Connect.",
  body: "At SSMR Tech, we combine engineering, connectivity, and software expertise to build practical, scalable IoT solutions. Whether you're developing a new connected product or modernizing an existing system, we help turn complex technology into reliable real-world solutions.",
  pillars: ["Engineering", "Connectivity", "Software"],
};

export const contact = {
  title: "Have an Idea? Let's Build It.",
  body: "From an early concept to a production-ready solution, we're ready to collaborate.",
  cta: "Start a Conversation",
};
