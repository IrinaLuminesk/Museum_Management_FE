import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
// export const tokens = (mode) => ({
//   ...(mode === "dark"
//     ? {
//       grey: {
//         100: "#F8FAFC",
//         200: "#F1F5F9",
//         300: "#E2E8F0",
//         400: "#CBD5E1",
//         500: "#94A3B8",
//         600: "#64748B",
//         700: "#475569",
//         800: "#334155",
//         900: "#1E293B",
//       },
//       primary: {
//         100: "#E3F2FD",
//         200: "#BBDEFB",
//         300: "#90CAF9",
//         400: "#42A5F5",
//         500: "#2196F3",
//         600: "#1E88E5",
//         700: "#1976D2",
//         800: "#1565C0",
//         900: "#0D47A1",
//       },
//       greenAccent: {
//         100: "#E8F5E9",
//         200: "#C8E6C9",
//         300: "#A5D6A7",
//         400: "#81C784",
//         500: "#66BB6A",
//         600: "#4CAF50",
//         700: "#388E3C",
//         800: "#2E7D32",
//         900: "#1B5E20",
//       },
//       redAccent: {
//         100: "#FFEBEE",
//         200: "#FFCDD2",
//         300: "#EF9A9A",
//         400: "#E57373",
//         500: "#EF5350",
//         600: "#E53935",
//         700: "#D32F2F",
//         800: "#C62828",
//         900: "#B71C1C",
//       },
//       blueAccent: {
//         100: "#E8EAF6",
//         200: "#C5CAE9",
//         300: "#9FA8DA",
//         400: "#7986CB",
//         500: "#5C6BC0",
//         600: "#3949AB",
//         700: "#303F9F",
//         800: "#283593",
//         900: "#1A237E",
//       },
//     }
//     : {
//       grey: {
//         100: "#1E293B",
//         200: "#273449",
//         300: "#334155",
//         400: "#475569",
//         500: "#64748B",
//         600: "#94A3B8",
//         700: "#CBD5E1",
//         800: "#E2E8F0",
//         900: "#F8FAFC",
//       },
//       primary: {
//         100: "#0D47A1",
//         200: "#1565C0",
//         300: "#1976D2",
//         400: "#1E88E5",
//         500: "#2196F3",
//         600: "#42A5F5",
//         700: "#64B5F6",
//         800: "#90CAF9",
//         900: "#BBDEFB",
//       },
//       greenAccent: {
//         100: "#1B5E20",
//         200: "#2E7D32",
//         300: "#388E3C",
//         400: "#4CAF50",
//         500: "#66BB6A",
//         600: "#81C784",
//         700: "#A5D6A7",
//         800: "#C8E6C9",
//         900: "#E8F5E9",
//       },
//       redAccent: {
//         100: "#B71C1C",
//         200: "#C62828",
//         300: "#D32F2F",
//         400: "#E53935",
//         500: "#EF5350",
//         600: "#E57373",
//         700: "#EF9A9A",
//         800: "#FFCDD2",
//         900: "#FFEBEE",
//       },
//       blueAccent: {
//         100: "#1A237E",
//         200: "#283593",
//         300: "#303F9F",
//         400: "#3949AB",
//         500: "#5C6BC0",
//         600: "#7986CB",
//         700: "#9FA8DA",
//         800: "#C5CAE9",
//         900: "#E8EAF6",
//       },
//     }),
// });

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      // Deep Charcoal & Stone Warmth (Gallery Night Mood)
      grey: {
        100: "#F9F8F6", // Lightest highlight / contrast text
        200: "#EFECE6",
        300: "#DCD7CE",
        400: "#B3AC9F",
        500: "#8A8275",
        600: "#5F584C",
        700: "#3D372E",
        800: "#24201A", // Card / Surface background
        900: "#14120F", // Base canvas dark background
      },
      // Royal Bronze / Warm Gold (Museum Accent & Brand)
      primary: {
        100: "#FFF8E7",
        200: "#FCE8C3",
        300: "#F7D18C",
        400: "#EEB254",
        500: "#D9932B", // Gold primary action
        600: "#B8751B",
        700: "#915613",
        800: "#6A3B0C",
        900: "#442205",
      },
      // Deep Forest Emerald (Success / Status)
      greenAccent: {
        100: "#EAF4EE",
        200: "#C8E3D2",
        300: "#98CAAA",
        400: "#66AD80",
        500: "#3F8F5C",
        600: "#2B7043",
        700: "#1E5230",
        800: "#13361F",
        900: "#091D10",
      },
      // Antique Terracotta / Crimson (Alerts / Warnings / Archives)
      redAccent: {
        100: "#FDF0ED",
        200: "#F7D6CF",
        300: "#EEAD9E",
        400: "#DD7C6A",
        500: "#C8513E",
        600: "#A63827",
        700: "#7E2517",
        800: "#55140A",
        900: "#300803",
      },
      // Archival Indigo / Dusk (Info / Badges / Secondary)
      blueAccent: {
        100: "#EFF3F8",
        200: "#D5E0ED",
        300: "#A8BDD7",
        400: "#7595BD",
        500: "#4B709E",
        600: "#32537D",
        700: "#203A5C",
        800: "#12233C",
        900: "#07101E",
      },
    }
    : {
      // Alabaster Paper & Rich Warm Slates (Gallery Light Mood)
      grey: {
        100: "#14120F", // Text primary (Dark Charcoal)
        200: "#24201A",
        300: "#3D372E",
        400: "#5F584C",
        500: "#8A8275",
        600: "#B3AC9F",
        700: "#DCD7CE",
        800: "#EFECE6", // Light Card / Container
        900: "#FAF8F5", // Main canvas light background (Warm Parchment/Alabaster)
      },
      // Midnight Navy (High Authority & Curatorial Primary Accent)
      primary: {
        100: "#07101E",
        200: "#12233C",
        300: "#203A5C",
        400: "#32537D",
        500: "#4B709E",
        600: "#7595BD",
        700: "#A8BDD7",
        800: "#D5E0ED",
        900: "#EFF3F8",
      },
      // Sage / Vintage Forest Green
      greenAccent: {
        100: "#091D10",
        200: "#13361F",
        300: "#1E5230",
        400: "#2B7043",
        500: "#3F8F5C",
        600: "#66AD80",
        700: "#98CAAA",
        800: "#C8E3D2",
        900: "#EAF4EE",
      },
      // Tuscan Terracotta Red
      redAccent: {
        100: "#300803",
        200: "#55140A",
        300: "#7E2517",
        400: "#A63827",
        500: "#C8513E",
        600: "#DD7C6A",
        700: "#EEAD9E",
        800: "#F7D6CF",
        900: "#FDF0ED",
      },
      // Warm Bronze / Ochre
      blueAccent: {
        100: "#442205",
        200: "#6A3B0C",
        300: "#915613",
        400: "#B8751B",
        500: "#D9932B",
        600: "#EEB254",
        700: "#F7D18C",
        800: "#FCE8C3",
        900: "#FFF8E7",
      },
    }),
});

// mui theme settings
// export const themeSettings = (mode) => {
//   const colors = tokens(mode);
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//           primary: {
//             main: colors.primary[400],
//             light: colors.primary[300],
//             dark: colors.primary[600],
//             contrastText: "#FFFFFF",
//           },
//           secondary: {
//             main: colors.greenAccent[500],
//           },
//           neutral: {
//             dark: colors.grey[700],
//             main: colors.grey[500],
//             light: colors.grey[100],
//           },
//           background: {
//             default: "#1E293B",
//             paper: "#273449",
//           },
//           text: {
//             primary: "#F8FAFC",
//             secondary: "#CBD5E1",
//           },
//         }
//         : {
//           primary: {
//             main: colors.primary[500],
//             light: colors.primary[300],
//             dark: colors.primary[700],
//             contrastText: "#FFFFFF",
//           },
//           secondary: {
//             main: colors.greenAccent[600],
//           },
//           neutral: {
//             dark: colors.grey[700],
//             main: colors.grey[500],
//             light: colors.grey[100],
//           },
//           background: {
//             default: "#F8FAFC",
//             paper: "#FFFFFF",
//           },
//           text: {
//             primary: "#1E293B",
//             secondary: "#64748B",
//           },
//         }),
//     },
//     typography: {
//       fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//       fontSize: 12,
//       h1: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 40,
//       },
//       h2: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 32,
//       },
//       h3: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 24,
//       },
//       h4: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 20,
//       },
//       h5: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 16,
//       },
//       h6: {
//         fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
//         fontSize: 14,
//       },
//     },
//   };
// };

export const themeSettings = (mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colors.primary[500], // Gold / Warm Bronze accent
            light: colors.primary[400],
            dark: colors.primary[600],
            contrastText: "#14120F",
          },
          secondary: {
            main: colors.blueAccent[400], // Archival Indigo / Dusk
            light: colors.blueAccent[300],
            dark: colors.blueAccent[600],
          },
          info: {
            main: colors.blueAccent[500],
          },
          success: {
            main: colors.greenAccent[500],
          },
          error: {
            main: colors.redAccent[500],
          },
          neutral: {
            dark: colors.grey[300],
            main: colors.grey[500],
            light: colors.grey[800],
          },
          background: {
            default: colors.grey[900], // Dark Charcoal Base (#14120F)
            paper: colors.grey[800],   // Surface / Card (#24201A)
          },
          text: {
            primary: colors.grey[100],   // Warm Alabaster (#F9F8F6)
            secondary: colors.grey[400], // Muted Stone
          },
          divider: "rgba(220, 215, 206, 0.12)",
        }
        : {
          primary: {
            main: colors.primary[300], // Deep Curatorial Navy (#203A5C)
            light: colors.primary[400],
            dark: colors.primary[200],
            contrastText: "#FFFFFF",
          },
          secondary: {
            main: colors.blueAccent[500], // Warm Bronze / Ochre
            light: colors.blueAccent[600],
            dark: colors.blueAccent[400],
          },
          info: {
            main: colors.primary[400],
          },
          success: {
            main: colors.greenAccent[500],
          },
          error: {
            main: colors.redAccent[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[200],
          },
          background: {
            default: colors.grey[900], // Warm Alabaster Canvas (#FAF8F5)
            paper: "#FFFFFF",          // Crisp Gallery Wall White
          },
          text: {
            primary: colors.grey[100],   // Deep Charcoal Text (#14120F)
            secondary: colors.grey[500], // Subtle Warm Slate
          },
          divider: "rgba(61, 55, 46, 0.08)",
        }),
    },
    shape: {
      borderRadius: 6, // Refined, clean corners
    },
    typography: {
      fontFamily: ["Plus Jakarta Sans", "Inter", "sans-serif"].join(","),
      // fontSize: 13,
      h1: {
        fontFamily: ["Playfair Display", "Cinzel", "serif"].join(","),
        // fontSize: 36,
        fontWeight: 600,
        letterSpacing: "-0.02em",
      },
      h2: {
        fontFamily: ["Playfair Display", "Cinzel", "serif"].join(","),
        // fontSize: 28,
        fontWeight: 600,
        letterSpacing: "-0.01em",
      },
      h3: {
        fontFamily: ["Playfair Display", "Cinzel", "serif"].join(","),
        // fontSize: 22,
        fontWeight: 600,
      },
      h4: {
        fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
        // fontSize: 18,
        fontWeight: 600,
      },
      h5: {
        fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
        fontSize: 15,
        fontWeight: 600,
      },
      h6: {
        fontFamily: ["Plus Jakarta Sans", "sans-serif"].join(","),
        fontSize: 13,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
      subtitle1: {
        fontSize: 14,
        fontWeight: 500,
      },
      body1: {
        fontSize: 13,
        lineHeight: 1.6,
      },
      button: {
        fontWeight: 600,
        letterSpacing: "0.02em",
      },
    },
    // Optional Component Style Overrides for Material UI
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            boxShadow:
              mode === "dark"
                ? "0px 4px 20px rgba(0, 0, 0, 0.35)"
                : "0px 4px 20px rgba(0, 0, 0, 0.04)",
            border: `1px solid ${mode === "dark" ? "rgba(220, 215, 206, 0.08)" : "rgba(61, 55, 46, 0.08)"
              }`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 900,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 6,
              backgroundColor: mode === "dark" ? colors.grey[800] : "#FFFFFF",
              transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

              // Default archival border
              "& fieldset": {
                borderColor: mode === "dark"
                  ? "rgba(220, 215, 206, 0.15)"
                  : "rgba(61, 55, 46, 0.15)",
              },
              // Hover state
              "&:hover fieldset": {
                borderColor: mode === "dark"
                  ? "rgba(220, 215, 206, 0.35)"
                  : "rgba(61, 55, 46, 0.35)",
              },
              // Active/Focus state using your primary accent color
              "&.Mui-focused fieldset": {
                borderColor: colors.primary[500],
                borderWidth: "1px",
                boxShadow: `0 0 0 3px ${mode === "dark" ? "rgba(217, 147, 43, 0.15)" : "rgba(32, 58, 92, 0.1)"}`,
              },
            },
            // Input text styling
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              padding: "12px 14px",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.85rem",
            transform: "translate(14px, 14px) scale(1)",
            "&.Mui-focused": {
              color: colors.primary[500],
            },
            "&.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(0.75)",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: "12px 14px",
          },
        },
      },
      // MuiTableCell: {
      //   styleOverrides: {
      //     head: {
      //       fontWeight: 900,
      //       textTransform: "uppercase",
      //       fontSize: "0.75rem",
      //       letterSpacing: "0.05em",
      //     },
      //   },
      // },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};