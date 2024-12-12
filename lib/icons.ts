import { Crown, Coins, Timer, TrafficCone } from "@phosphor-icons/react";

export const labelIcons = {
  "MVP": {
    icon: Crown,
    color: "rgba(242, 46, 118, 0.08)",
    textColor: "rgba(242, 46, 118, 1)",
    description: "Build a minimum viable product with core features."
  },
  "Bounty": {
    icon: Coins,
    color: "rgba(4, 164, 110, 0.08)",
    textColor: "rgba(4, 164, 110, 1)",
    description: "Complete tasks for token rewards and incentives."
  },
  "Quick Start": {
    icon: Timer,
    color: "rgba(241, 238, 254, 1)",
    textColor: "rgba(109, 57, 228, 1)",
    description: "Get started quickly with simple, focused tasks."
  },
  "A small build": {
    icon: TrafficCone,
    color: "rgba(254, 246, 238, 1)",
    textColor: "rgba(255, 122, 0, 1)",
    description: "Develop focused solutions to address specific challenges."
  }
};

export type LabelType = keyof typeof labelIcons; 