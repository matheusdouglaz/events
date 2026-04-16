import { NavItem } from "./header.types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { 
    label: "Eventos", 
    href: "/eventos",
    subItems: [
      { label: "Próximos Eventos", href: "/eventos/proximos" },
      { label: "Workshops", href: "/eventos/workshops" },
      { label: "Hackathons", href: "/eventos/hackathons" },
    ]
  },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];