import Link from "next/link";
import React from "react";
import Image from "next/image";
import { auth, signOut } from "@/auth";
import { Button } from "./ui/button";
import { LoginDialog } from "./LoginOptions";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-6 py-4 bg-white border-b border-slate-100">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-1 md:gap-2 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/chefRobot.png"
            alt="TeachChef Logo"
            width={40}
            height={40}
            className="rounded-lg md:w-[60px] md:h-[60px]"
          />
          <span className="font-bold text-lg md:text-2xl text-primary-500">
            TeachChef
          </span>
        </Link>

        {/* User actions */}
        <div className="flex items-center gap-2 md:gap-6">
          {session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="hidden md:block text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                Create Recipe
              </Link>
              <div className="hidden md:block h-5 w-px bg-slate-200" />
              <Link
                href={`/user/${session.user.id}`}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                <span className="font-medium">{session.user.name}</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button
                  variant="ghost"
                  type="submit"
                  className="text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                >
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <LoginDialog />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
