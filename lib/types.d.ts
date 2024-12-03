/**
 * Prop type for navigation
 */
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  icon: Icon;
};

/**
 * Prop type for header
 */
type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

/**
 * Represents a general schema.
 *
 * An array of objects, each containing a key and its corresponding ValidationType.
 */
type GeneralSchema = {
  key: string;
  value: ValidationType;
  required?: boolean;
};

/**
 * Validation types
 *
 * These can be extended
 * * See instructions in @/lib/validation/index.ts
 */
type ValidationType =
  | "phone"
  | "email"
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "url"
  | "zip_code";

/**
 * Row type for the main dashboard data on /dashboard route
 */
type LeadAndErrorCountResults = {
  date: string;
  leads: number;
  errors: number;
}[];

/**
 * Represents a mapping between keys of type `GeneralSchema["key"]`
 * and the return types of the corresponding validation functions
 * from the `validations` object.
 */
type SchemaToZodMap = {
  [P in GeneralSchema["key"]]: ReturnType<
    (typeof validations)[GeneralSchema["value"]]
  >;
};

/**
 * Type for fetched logs
 *
 * includes attributes of the 'endpoint' db model
 */
type LogRow = {
  id: string;
  type: "success" | "error";
  message: Record<string, any> | unknown;
  endpoint: string;
  endpointId: string;
  createdAt: Date;
};

/**
 * Type for fetched leads
 *
 * includes attributes of the 'endpoint' db model
 */
type LeadRow = {
  id: string;
  data: { [key: string]: any };
  schema?: { key: string; value: ValidationType }[];
  createdAt: Date;
  updatedAt: Date;
  endpointId: string;
  endpoint?: string;
};

/**
 * Represents a log message.
 *
 * This type can have two possible shapes:
 * - If the log message is successfully parsed, it will have a shape defined by the `SafeParseReturnType` type.
 * - If the log message is not successfully parsed, it will have a shape of `{ success: string }`.
 */
type LogMessage =
  | z.SafeParseReturnType<
      {
        [x: string]: any;
      },
      {
        [x: string]: any;
      }
    >
  | { success: string };

/**
 * Represents a function that handles server actions.
 *
 * @param formData - The form data to be processed by the server action.
 * @returns A promise that resolves to an object containing an error message, or undefined if there is no error.
 */
type ServerActionFunction = (
  formData: FormData
) => Promise<{ error: string } | undefined>;

type LogPostType = "http" | "form" | "webhook" | "email";

enum Source {
  WEB = "web", // just typing the domain in the web
  SHARED = "shared", // friend invites friend through link, link has generated code from referrer
  SOCIAL_MEDIA = "social_media", // comes from social media marketing campaigns
  ONLINE_STORE = "online_store", // players who navigate to their online store
}

// Merchants can decide to give points or discount for their players
type Player = {
  lastPlayed: Date;
  email: string;
  firstName: string;
  lastName: string;
  points: number;
  moneySpent: number;
  pointsSpent: number;
  couponsWon: number;
  source: Source;
  phone: string;
  location: string;
  invitesLimitedTo: number; // max number of invites per player
  invited: string[]; // unique id
  referredBy: string[]; // unique id
  registeredInMarketingList: boolean
};

type TopSpenders = {
  players: Player[];
};

type PlayerIsBuyer = boolean; 

type Game = {
  numLeads: number;
  campaignEarnings: number;
  views: number; // awareness
  uniquePlayers: number; // awareness
  averageDuration: number; // engagement
  clicks: number; // engagement (any type of interaction with the game )
  numShares: number; // engagement
  players: Player[];
  emailLeadsTo: string[]; // list of emails
};
