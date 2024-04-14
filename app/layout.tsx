import { Inter } from "next/font/google";
import {
  Button,
  DarkThemeToggle,
  TextInput,
  ThemeModeScript,
  Toast,
  ToastToggle,
} from "flowbite-react";
import "./globals.css";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Logo from "@/lib/component/logo";
import CreateRoom from "@/lib/component/JoinRoom";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <body className={inter.className}>
        <Navbar fluid>
          <NavbarBrand as={Link} href="/">
            <Logo />
            <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Poddle Poker
            </span>
          </NavbarBrand>
          <NavbarToggle />
          <NavbarCollapse>
            <NavbarLink href="#" active>
              <CreateRoom />
            </NavbarLink>
            <NavbarLink>
              {" "}
              <DarkThemeToggle />
            </NavbarLink>
            <NavbarLink href="/">Sign up</NavbarLink>
            <NavbarLink href="/">Login</NavbarLink>
            <NavbarLink href="/contact">Language</NavbarLink>
          </NavbarCollapse>
        </Navbar>
        <div className="absolute hidden">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
              {" "}
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-3 text-sm font-normal">Set yourself free.</div>
            <ToastToggle />
          </Toast>
        </div>
        <main className="flex min-h-screen justify-center gap-2 dark:bg-gray-800">
          {children}
        </main>
      </body>
    </html>
  );
}
