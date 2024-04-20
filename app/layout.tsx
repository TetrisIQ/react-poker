import { Inter } from "next/font/google";
import { DarkThemeToggle, ThemeModeScript } from "flowbite-react";
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
            {/* <NavbarLink href="/">Sign up</NavbarLink>
            <NavbarLink href="/">Login</NavbarLink>
            <NavbarLink href="/contact">Language</NavbarLink> */}
          </NavbarCollapse>
        </Navbar>
        <main className="flex min-h-screen justify-center gap-2 dark:bg-gray-800">
          {children}
        </main>
      </body>
    </html>
  );
}
