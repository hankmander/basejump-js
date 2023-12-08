'use client'

import AccountSelector from "@/components/basejump/AccountSelector";
import Logo from "@/components/Logo";
import Link from "next/link";
import UserAccountButton from "@/components/basejump/UserAccountButton.tsx";
import {useRouter} from "next/navigation";


interface Props {
    accountId: string;
    navigation?: {
        name: string;
        href: string;
    }[]
}
export default function DashboardHeader({accountId, navigation = []}: Props) {
    const router = useRouter();
    
    return (
        <nav className="w-full p-4 flex justify-between items-center border-b">
            <div className="flex justify-start items-center gap-x-4 lg:gap-x-6">
                <div className="flex items-center gap-x-4">
                    <Logo />
                    <span className="border-l rotate-12 h-6" />
                    <AccountSelector
                        defaultAccountId={accountId}
                        afterTeamCreated={(account) => router.push(`/dashboard/${account.slug}`)}
                        onAccountSelected={(account) => router.push(account.personal_account ? `/dashboard` : `/dashboard/${account.slug}`)}
                    />
                </div>
            {navigation.map((navItem) => (
                    <Link key={navItem.name} href={navItem.href} className="text-sm font-medium transition-colors hover:text-primary">
                        {navItem.name}
                    </Link>
            ))}
            </div>

            <div className="flex items-center gap-x-4">
                <UserAccountButton />
            </div>
        </nav>
    )

}