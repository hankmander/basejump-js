"use client";

import {
  AccountSelector,
  BasejumpUserSession,
  ProfileButton,
  ProfileButtonItem,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@usebasejump/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignUpButton } from "@usebasejump/react/src/components/sign-up-button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const invitationUrlTemplate =
  process.env.NEXT_PUBLIC_BASEJUMP_INVITATION_URL_TEMPLATE;

export default function Header() {
  const supabaseClient = createClientComponentClient();
  const redirectTo = `${window?.location?.origin}/auth/callback`;
  const router = useRouter();
  const { accountSlug } = useParams();

  return (
    <BasejumpUserSession
      supabaseClient={supabaseClient}
      invitationUrlTemplate={invitationUrlTemplate}
    >
      <nav className="flex justify-between p-6 max-w-screen-xl mx-auto">
        <div className="flex gap-x-4">
          <h1 className="text-2xl font-bold">Basejump</h1>
          <SignedIn>
            <AccountSelector
              currentAccountSlug={accountSlug}
              defaultPersonalAccount={true}
              afterCreate={(account) =>
                router.push(`/dashboard/${account.slug}`)
              }
              onAccountChange={(account) =>
                router.push(`/dashboard/${account.slug}`)
              }
            />
          </SignedIn>
        </div>
        <ul className="flex gap-x-4">
          <SignedOut>
            <li>
              <SignInButton
                redirectTo={redirectTo}
                supabaseClient={supabaseClient}
              />
            </li>
            <li>
              <SignUpButton
                redirectTo={redirectTo}
                supabaseClient={supabaseClient}
              />
            </li>
          </SignedOut>
          <SignedIn>
            <li>
              <ProfileButton supabaseClient={supabaseClient}>
                <ProfileButtonItem>
                  <Link href="/">Whatever</Link>
                </ProfileButtonItem>
              </ProfileButton>
            </li>
          </SignedIn>
        </ul>
      </nav>
    </BasejumpUserSession>
  );
}
