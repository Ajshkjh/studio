import type { LucideIcon } from 'lucide-react';
import {
  Coins, Wheat, HeartPulse, BookOpenText, UsersRound, Droplets, Zap, TrendingUp, Factory,
  Scale, Building2, Recycle, CloudFog, FishSymbol, TreePine, Landmark, Handshake, Target
} from 'lucide-react';

export interface SDGResource {
  name: string;
  url: string;
}

export interface SDG {
  id: number;
  title: string;
  shortTitle: string;
  color: string; // Official SDG hex color or representative
  icon: LucideIcon;
  resources: SDGResource[];
}

// Placeholder for Target icon if needed for general use
export const DefaultSDGIcon = Target;

export const sdgs: SDG[] = [
  {
    id: 1,
    title: "No Poverty",
    shortTitle: "SDG 1: No Poverty",
    color: "#E5243B",
    icon: Coins,
    resources: [
      { name: "UN Page for SDG 1", url: "https://sdgs.un.org/goals/goal1" },
      { name: "World Bank - Poverty", url: "https://www.worldbank.org/en/topic/poverty" }
    ]
  },
  {
    id: 2,
    title: "Zero Hunger",
    shortTitle: "SDG 2: Zero Hunger",
    color: "#DDA63A",
    icon: Wheat,
    resources: [
      { name: "UN Page for SDG 2", url: "https://sdgs.un.org/goals/goal2" },
      { name: "World Food Programme", url: "https://www.wfp.org/zero-hunger" }
    ]
  },
  {
    id: 3,
    title: "Good Health and Well-being",
    shortTitle: "SDG 3: Good Health",
    color: "#4C9F38",
    icon: HeartPulse,
    resources: [
      { name: "UN Page for SDG 3", url: "https://sdgs.un.org/goals/goal3" },
      { name: "World Health Organization (WHO)", url: "https://www.who.int" }
    ]
  },
  {
    id: 4,
    title: "Quality Education",
    shortTitle: "SDG 4: Quality Education",
    color: "#C5192D",
    icon: BookOpenText,
    resources: [
      { name: "UN Page for SDG 4", url: "https://sdgs.un.org/goals/goal4" },
      { name: "UNESCO - Education", url: "https://www.unesco.org/en/education" }
    ]
  },
  {
    id: 5,
    title: "Gender Equality",
    shortTitle: "SDG 5: Gender Equality",
    color: "#FF3A21",
    icon: UsersRound,
    resources: [
      { name: "UN Page for SDG 5", url: "https://sdgs.un.org/goals/goal5" },
      { name: "UN Women", url: "https://www.unwomen.org/en" }
    ]
  },
  {
    id: 6,
    title: "Clean Water and Sanitation",
    shortTitle: "SDG 6: Clean Water",
    color: "#26BDE2",
    icon: Droplets,
    resources: [
      { name: "UN Page for SDG 6", url: "https://sdgs.un.org/goals/goal6" },
      { name: "UN Water", url: "https://www.unwater.org/" }
    ]
  },
  {
    id: 7,
    title: "Affordable and Clean Energy",
    shortTitle: "SDG 7: Clean Energy",
    color: "#FCC30B",
    icon: Zap,
    resources: [
      { name: "UN Page for SDG 7", url: "https://sdgs.un.org/goals/goal7" },
      { name: "IRENA (Int. Renewable Energy Agency)", url: "https://www.irena.org" }
    ]
  },
  {
    id: 8,
    title: "Decent Work and Economic Growth",
    shortTitle: "SDG 8: Decent Work",
    color: "#A21942",
    icon: TrendingUp,
    resources: [
      { name: "UN Page for SDG 8", url: "https://sdgs.un.org/goals/goal8" },
      { name: "International Labour Organization (ILO)", url: "https://www.ilo.org" }
    ]
  },
  {
    id: 9,
    title: "Industry, Innovation and Infrastructure",
    shortTitle: "SDG 9: Innovation",
    color: "#FD6925",
    icon: Factory,
    resources: [
      { name: "UN Page for SDG 9", url: "https://sdgs.un.org/goals/goal9" },
      { name: "UNIDO (UN Industrial Development Org.)", url: "https://www.unido.org/" }
    ]
  },
  {
    id: 10,
    title: "Reduced Inequality",
    shortTitle: "SDG 10: Reduced Inequality",
    color: "#DD1367",
    icon: Scale,
    resources: [
      { name: "UN Page for SDG 10", url: "https://sdgs.un.org/goals/goal10" },
      { name: "UNDP - Inequality", url: "https://www.undp.org/sustainable-development/inequality-reduced" }
    ]
  },
  {
    id: 11,
    title: "Sustainable Cities and Communities",
    shortTitle: "SDG 11: Sustainable Cities",
    color: "#FD9D24",
    icon: Building2,
    resources: [
      { name: "UN Page for SDG 11", url: "https://sdgs.un.org/goals/goal11" },
      { name: "UN-Habitat", url: "https://unhabitat.org/" }
    ]
  },
  {
    id: 12,
    title: "Responsible Consumption and Production",
    shortTitle: "SDG 12: Resp. Consumption",
    color: "#BF8B2E",
    icon: Recycle,
    resources: [
      { name: "UN Page for SDG 12", url: "https://sdgs.un.org/goals/goal12" },
      { name: "UNEP - Consumption and Production", url: "https://www.unep.org/explore-topics/resource-efficiency/what-we-do/sustainable-consumption-and-production" }
    ]
  },
  {
    id: 13,
    title: "Climate Action",
    shortTitle: "SDG 13: Climate Action",
    color: "#3F7E44",
    icon: CloudFog,
    resources: [
      { name: "UN Page for SDG 13", url: "https://sdgs.un.org/goals/goal13" },
      { name: "UNFCCC (UN Climate Change)", url: "https://unfccc.int/" }
    ]
  },
  {
    id: 14,
    title: "Life Below Water",
    shortTitle: "SDG 14: Life Below Water",
    color: "#0A97D9",
    icon: FishSymbol,
    resources: [
      { name: "UN Page for SDG 14", url: "https://sdgs.un.org/goals/goal14" },
      { name: "IOC-UNESCO (Oceanography)", url: "https://ioc.unesco.org/" }
    ]
  },
  {
    id: 15,
    title: "Life on Land",
    shortTitle: "SDG 15: Life on Land",
    color: "#56C02B",
    icon: TreePine,
    resources: [
      { name: "UN Page for SDG 15", url: "https://sdgs.un.org/goals/goal15" },
      { name: "UNCCD (Desertification)", url: "https://www.unccd.int/" }
    ]
  },
  {
    id: 16,
    title: "Peace, Justice and Strong Institutions",
    shortTitle: "SDG 16: Peace & Justice",
    color: "#00689D",
    icon: Landmark,
    resources: [
      { name: "UN Page for SDG 16", url: "https://sdgs.un.org/goals/goal16" },
      { name: "UNODC (Drugs and Crime)", url: "https://www.unodc.org/" }
    ]
  },
  {
    id: 17,
    title: "Partnerships for the Goals",
    shortTitle: "SDG 17: Partnerships",
    color: "#19486A",
    icon: Handshake,
    resources: [
      { name: "UN Page for SDG 17", url: "https://sdgs.un.org/goals/goal17" },
      { name: "UN Global Compact", url: "https://www.unglobalcompact.org/" }
    ]
  }
];
