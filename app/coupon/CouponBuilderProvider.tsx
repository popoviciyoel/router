import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define coupon builder states
export const CouponBuilderStates = {
  CONFIGURE_COUPON: "CONFIGURE_COUPON",
  ADD_TEXT: "ADD_TEXT",
  ADD_IMAGE: "ADD_IMAGE",
  ADD_BUTTON: "ADD_BUTTON",
  APPLY_COUPON: "APPLY_COUPON",
} as const;

type CouponBuilderState = keyof typeof CouponBuilderStates;
type CouponType = "Unique" | "Single" | null;

enum Effects {
  OFF = "Off",
  SNOW = "Snow",
  CONFETTI = "Confetti",
  FIREWORK = "Firework",
}

// Initial state
const initialState = {
  currentState: CouponBuilderStates.CONFIGURE_COUPON,
  backgroundColor: "#ffffff", // Default background color
  backgroundImage: "", // Optional background image URL
  elements: [], // Array of elements (text, input, image, button)
  coupons: [], // List of generated coupons
  couponQuantity: 0,
  name: "",
  couponCodeType: null,
  emailLeadNotification: null,
  effect: Effects.OFF,
};

// Action types
type CouponBuilderAction =
  | { type: "SET_BACKGROUND_COLOR"; payload: string }
  | { type: "SET_BACKGROUND_IMAGE"; payload: string }
  | { type: "REMOVE_BACKGROUND_IMAGE" } // New action type
  | {
      type: "ADD_ELEMENT";
      payload: { type: string; content: string; id: string };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: {
        type: string;
        content: string;
        id: string;
        width: string;
        height: string;
        backgroundColor: string;
        textColor: string
      };
    }
  | { type: "REMOVE_ELEMENT"; payload: string }
  | {
      type: "ADD_COUPON_UNIQUE";
      payload: { coupons: string[]; couponQuantity: number };
    }
  | {
      type: "ADD_SINGLE_COUPON_CODE";
      payload: { coupons: string[] };
    }
  | {
      type: "ADD_SINGLE_COUPON_QUANTITY";
      payload: { couponQuantity: number };
    }
  | {
      type: "ADD_EMAIL_LEAD_NOTIFICATION";
      payload: { emailLeadNotification: boolean };
    }
  | {
      type: "SET_COUPON_EFFECT";
      payload: { effect: Effects };
    }
  | { type: "ADD_COUPON_CODE_TYPE"; payload: CouponType }
  | { type: "REMOVE_COUPON"; payload: string }
  | { type: "CHANGE_STATE"; payload: CouponBuilderState }
  | { type: "SET_COUPON_NAME"; payload: string };

// Reducer
function couponBuilderReducer(
  state: typeof initialState,
  action: CouponBuilderAction
) {
  switch (action.type) {
    case "SET_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "SET_BACKGROUND_IMAGE":
      return { ...state, backgroundImage: action.payload };
    case "REMOVE_BACKGROUND_IMAGE": // Handle removal of background image
      return { ...state, backgroundImage: null };
    case "ADD_ELEMENT":
      return { ...state, elements: [...state.elements, action.payload] };
    case "UPDATE_ELEMENT":
      return {
        ...state,
        elements: [
          ...state.elements.map((existingItem: any) =>
            existingItem.id === action.payload.id
              ? { ...existingItem, ...action.payload }
              : existingItem
          ),
        ],
      };
    case "REMOVE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter(
          (element) => element.id !== action.payload.id
        ),
      };
    case "ADD_COUPON_UNIQUE":
      return {
        ...state,
        coupons: [...action.payload.coupons],
        couponQuantity: action.payload.couponQuantity,
      };
    case "ADD_SINGLE_COUPON_CODE":
      return {
        ...state,
        coupons: [...action.payload.coupons],
      };
    case "ADD_SINGLE_COUPON_QUANTITY":
      return {
        ...state,
        couponQuantity: action.payload.couponQuantity,
      };
    case "ADD_EMAIL_LEAD_NOTIFICATION":
      return {
        ...state,
        emailLeadNotification: action.payload.emailLeadNotification,
      };
    case "SET_COUPON_EFFECT":
      return {
        ...state,
        effect: action.payload.effect,
      };
    case "ADD_COUPON_CODE_TYPE":
      return { ...state, couponCodeType: action.payload };
    case "REMOVE_COUPON":
      return {
        ...state,
        coupons: state.coupons.filter((coupon) => coupon !== action.payload),
      };
    case "CHANGE_STATE":
      return { ...state, currentState: action.payload };
    case "SET_COUPON_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
}

// Context
const CouponBuilderContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<CouponBuilderAction>;
} | null>(null);

// Provider
export const CouponBuilderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(couponBuilderReducer, initialState);

  // Example: Fetch coupons from an API or database on mount
  useEffect(() => {
    // const fetchCoupons = async () => {
    //   try {
    //     const fakeCoupons = ["10OFF", "FREESHIP", "BOGO"]; // Replace with actual API call
    //     fakeCoupons.forEach((coupon) =>
    //       dispatch({ type: "ADD_COUPON", payload: coupon })
    //     );
    //   } catch (error) {
    //     console.error("Error fetching coupons:", error);
    //   }
    // };
    // fetchCoupons();
  }, []);

  console.log("state", state);

  return (
    <CouponBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </CouponBuilderContext.Provider>
  );
};

// Custom hook
export const useCouponBuilder = () => {
  const context = useContext(CouponBuilderContext);
  if (!context) {
    throw new Error(
      "useCouponBuilder must be used within a CouponBuilderProvider"
    );
  }
  return context;
};
