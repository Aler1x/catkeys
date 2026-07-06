import type { ReactElement } from "react";

export const colors = {
  paper: "#f2f0e3",
  card: "#f7f5eb",
  dark: "#2e2e2e",
  muted: "rgba(46, 46, 46, 0.62)",
  theme: "#da755b",
  coral: "#f76f53",
  border: "rgba(46, 46, 46, 0.12)",
};

const catPaths = [
  {
    d: "M19.0993 10.6602C20.2113 11.9744 19.98 13.5815 19.9801 15C19.9801 18.9062 14.7132 20 12 20C9.28677 20 4.01994 18.9062 4.01994 15C4.01995 13.5815 3.78875 11.9744 4.90066 10.6602M19.0993 10.6602C18.9048 10.4303 18.6692 10.2094 18.384 10M19.0993 10.6602C19.7993 11.0634 19.9781 9.55469 19.9801 9.0625V7.18761C19.9801 5.56261 18.8629 5.00011 17.9053 5.00011C16.9477 5.00011 15.0324 6.5625 14.394 6.5625C13.6279 6.5625 13.4804 6.40636 12 6.40636C10.5197 6.40636 10.3721 6.5625 9.60601 6.5625C8.9676 6.5625 7.05236 5 6.09476 5C5.13715 5 4.01995 5.5625 4.01995 7.1875V9.0625C4.02188 9.55469 4.20072 11.0634 4.90066 10.6602M4.90066 10.6602C5.09519 10.4303 5.33082 10.2094 5.61599 10",
    strokeLinecap: "round",
  },
  {
    d: "M12.8258 16C12.8258 16.1726 12.4647 16.3125 12.0193 16.3125C11.574 16.3125 11.2129 16.1726 11.2129 16C11.2129 15.8274 11.574 15.6875 12.0193 15.6875C12.4647 15.6875 12.8258 15.8274 12.8258 16Z",
    fill: true,
  },
  {
    d: "M15.5 13.5938C15.5 14.0252 15.2834 14.375 15.0161 14.375C14.7489 14.375 14.5323 14.0252 14.5323 13.5938C14.5323 13.1623 14.7489 12.8125 15.0161 12.8125C15.2834 12.8125 15.5 13.1623 15.5 13.5938Z",
    fill: true,
  },
  {
    d: "M9.5 13.5938C9.5 14.0252 9.28336 14.375 9.01613 14.375C8.74889 14.375 8.53226 14.0252 8.53226 13.5938C8.53226 13.1623 8.74889 12.8125 9.01613 12.8125C9.28336 12.8125 9.5 13.1623 9.5 13.5938Z",
    fill: true,
  },
  {
    d: "M22.0004 15.4688C21.5165 15.1562 19.4197 14.375 18.6133 14.375",
    strokeLinecap: "round",
  },
  {
    d: "M20.3871 17.9688C19.9033 17.6562 18.7742 16.875 17.9678 16.875",
    strokeLinecap: "round",
  },
  {
    d: "M2 15.4688C2.48387 15.1562 4.58065 14.375 5.3871 14.375",
    strokeLinecap: "round",
  },
  {
    d: "M3.61279 17.9688C4.09667 17.6562 5.2257 16.875 6.03215 16.875",
    strokeLinecap: "round",
  },
];

type SatoriElement = {
  type: string;
  props: Record<string, unknown>;
};

export function catIcon(size: number): SatoriElement {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      children: catPaths.map((path) => ({
        type: "path",
        props: {
          d: path.d,
          fill: path.fill ? colors.dark : "none",
          stroke: colors.dark,
          strokeWidth: 1.75,
          strokeLinecap: path.strokeLinecap ?? "round",
          strokeLinejoin: "round",
        },
      })),
    },
  };
}

export function commandIcon(size: number): SatoriElement {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      children: [
        {
          type: "path",
          props: {
            d: "M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3",
            stroke: colors.dark,
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
  };
}

export function optionIcon(size: number): SatoriElement {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      children: [
        {
          type: "path",
          props: {
            d: "M3 3h6l6 18h6",
            stroke: colors.dark,
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
        {
          type: "path",
          props: {
            d: "M14 3h7",
            stroke: colors.dark,
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
  };
}

export function shiftIcon(size: number): SatoriElement {
  return {
    type: "svg",
    props: {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "none",
      children: [
        {
          type: "path",
          props: {
            d: "M9 19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-6a1 1 0 0 1 1-1h3.293a.707.707 0 0 0 .5-1.207l-7.086-7.086a1 1 0 0 0-1.414 0l-7.086 7.086a.707.707 0 0 0 .5 1.207H8a1 1 0 0 1 1 1z",
            stroke: colors.dark,
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
        },
      ],
    },
  };
}

export function iconBadge(options: {
  badgeSize: number;
  catSize: number;
  badgeRadius: number;
  accentWidth: number;
  accentHeight: number;
  accentTop: number;
}): SatoriElement {
  const { badgeSize, catSize, badgeRadius, accentWidth, accentHeight, accentTop } =
    options;

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: badgeSize,
        height: badgeSize,
        borderRadius: badgeRadius,
        border: `2px solid ${colors.border}`,
        background: colors.card,
        boxShadow:
          "0 2px 4px rgba(46, 46, 46, 0.05), 0 8px 20px rgba(46, 46, 46, 0.08)",
        position: "relative",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: accentTop,
              left: "50%",
              transform: "translateX(-50%)",
              width: accentWidth,
              height: accentHeight,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${colors.coral}, ${colors.theme})`,
              opacity: 0.85,
            },
          },
        },
        catIcon(catSize),
      ],
    },
  };
}

export const backgroundGlow = {
  background:
    "radial-gradient(circle at 82% 18%, rgba(247, 111, 83, 0.22), transparent 52%), radial-gradient(circle at 14% 86%, rgba(218, 117, 91, 0.14), transparent 46%)",
};

export function asReactElement(element: SatoriElement): ReactElement {
  return element as ReactElement;
}
