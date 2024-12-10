import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define game builder states
export const BuilderStates = {
  CONFIGURE_OPTIONS: "CONFIGURE_OPTIONS",
  ADD_EFFECTS: "ADD_EFFECTS",
  SET_MUSIC: "SET_MUSIC",
  APPLY_COUPONS: "APPLY_COUPONS",
} as const;

type BuilderState = keyof typeof BuilderStates;

// Initial state
const initialState = {
  currentState: BuilderStates.CONFIGURE_OPTIONS,
  background:
    "https://res.cloudinary.com/shulgirit/image/upload/v1727007662/vdwafot4lxquwtdksgyx.png", // Default background color
  effects: [], // Array of special effects
  music: null, // Background music file
  soundEffects: {}, // Map of sound effects by action
  coupons: [], // List of available coupons
};

// Action types
type BuilderAction =
  | { type: "SET_BACKGROUND"; payload: string }
  | { type: "ADD_EFFECT"; payload: string }
  | { type: "REMOVE_EFFECT"; payload: string }
  | { type: "SET_MUSIC"; payload: string | null }
  | { type: "ADD_SOUND_EFFECT"; payload: { action: string; sound: string } }
  | { type: "ADD_COUPON"; payload: string }
  | { type: "REMOVE_COUPON"; payload: string }
  | { type: "CHANGE_STATE"; payload: BuilderState };

// Reducer
function builderReducer(state: typeof initialState, action: BuilderAction) {
  switch (action.type) {
    case "SET_BACKGROUND":
      return { ...state, background: action.payload };
    case "ADD_EFFECT":
      return { ...state, effects: [...state.effects, action.payload] };
    case "REMOVE_EFFECT":
      return {
        ...state,
        effects: state.effects.filter((effect) => effect !== action.payload),
      };
    case "SET_MUSIC":
      return { ...state, music: action.payload };
    case "ADD_SOUND_EFFECT":
      return {
        ...state,
        soundEffects: {
          ...state.soundEffects,
          [action.payload.action]: action.payload.sound,
        },
      };
    case "ADD_COUPON":
      return { ...state, coupons: [...state.coupons, action.payload] };
    case "REMOVE_COUPON":
      return {
        ...state,
        coupons: state.coupons.filter((coupon) => coupon !== action.payload),
      };
    case "CHANGE_STATE":
      return { ...state, currentState: action.payload };
    default:
      return state;
  }
}

// Context
const BuilderContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<BuilderAction>;
} | null>(null);

// Provider
export const GameBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  // Example: Fetch coupons from an API or database on mount
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const fakeCoupons = ["10OFF", "FREESHIP", "BOGO"]; // Replace with actual API call
        fakeCoupons.forEach((coupon) =>
          dispatch({ type: "ADD_COUPON", payload: coupon })
        );
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
};

// Custom hook
export const useGameBuilder = () => {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useGameBuilder must be used within a GameBuilderProvider");
  }
  return context;
};
