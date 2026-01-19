import { getIronSession, IronSession } from "iron-session";

export interface SessionData {
  address?: string;
  nonce?: string;
  isAuthenticated: boolean;
}

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  "my-super-secret-session-key-must-be-at-least-32-characters-long";

export const sessionOptions = {
  password: SESSION_SECRET,
  cookieName: "web3_session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  },
};

export async function getSession(
  req: Request,
  res: Response,
): Promise<IronSession<SessionData>> {
  return await getIronSession<SessionData>(req, res, sessionOptions);
}
