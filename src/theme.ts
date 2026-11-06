import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

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
            primary: "#000000",
            secondary: "#000000",
            disabled: "#000000",
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
       fontFamily: '"Open Sans", sans-serif',

      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 700,

      body1: {
        fontSize: 15,
        lineHeight: 1.6,
        fontWeight: 600,
      },

      body2: {
        fontSize: 15,
        fontWeight: 600,
      },

      subtitle1: {
        fontSize: 15,
        fontWeight: 600,
      },

      button: {
        fontWeight: 900,
        letterSpacing: "0.02em",
      },

    },
    // Optional Component Style Overrides for Material UI
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            color: "#000000",
          },
        },
      },

      MuiCardHeader: {
        styleOverrides: {
          title: {
            color: "inherit",
          },
          subheader: {
            color: "inherit",
          },
        },
      },
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