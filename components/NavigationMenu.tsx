"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { ArrowRight, Menu, Moon, Sun, XIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ui/mood-switcher";
import { Switch } from "./ui/local-switcher";
import { IconBurger } from "@tabler/icons-react";
import { Button } from "./ui/button";
import CartIcon from "./CartIcon";
import UserAvatar from "./UserAvatar";
import { useAuthContext } from "@/providers/auth-provider";
import PromoBanner from "./PromoBanner";
import Logo from "./Logo";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Contact US",
    href: "/contact-us",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Products",
    href: "/products",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Search",
    href: "/search",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function CustomNavigationMenu() {
  const [showOverlay, setShowOverlay] = React.useState(false);

  return (
    <>
      <NavigationMenu
        style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.4)" }}
        className="w-full bg-[hsl(var(--background))]  fixed top-0 dark:bg justify-between px-5 py-3 border-b-[1px] border-b-slate-200 dark:border-b-slate-600"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <Logo />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className=" hidden md:flex">
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent className=" z-auto ">
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <Moon className="h-6 w-6" />
                      <div className="mb-2 mt-4 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components that you can copy and
                        paste into your apps. Accessible. Customizable. Open
                        Source.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent className=" z-auto  ">
              <ul
                style={{ zIndex: 9999999999 }}
                className="grid w-[400px] z-30 gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] "
              >
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <Link href="/products" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Products
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/contact-us" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about-us" passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          <NavigationMenuItem>
            <div className="w-full items-center space-x-2 hidden md:flex">
              <UserAvatar />
              <ModeToggle />
              <CartIcon />
            </div>
            <div className="  items-center space-x-2 flex md:hidden">
              <UserAvatar />
              <CartIcon />

              <ModeToggle />
              <Button
                size="icon"
                onClick={() => setShowOverlay(!showOverlay)}
                variant={"outline"}
              >
                <Menu />
              </Button>
            </div>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <MobileOverLay setShowOverlay={setShowOverlay} show={showOverlay} />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block z-30 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={props.href || ""}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
const MobileOverLay = ({
  show,
  setShowOverlay,
}: {
  show: boolean;
  setShowOverlay: (state: boolean) => void;
}) => {
  return (
    <div
      style={{ height: show ? "100%" : 0 }}
      className="overlay overflow-hidden "
    >
      <div className="flex sm:justify-center justify-start items-center mb-8  mt-16  p-8">
        {/* <NavToolBar showCart={false} /> */}
      </div>
      <div>
        <ul className="grid  gap-3   ">
          {components.map((component) => (
            <Link
              key={component.title}
              title={component.title}
              href={component.href}
              onClick={() => setShowOverlay(false)}
            >
              <div className="flex sm:justify-center justify-start items-center gap-1  p-8">
                {component.title}

                <ArrowRight />
              </div>
            </Link>
          ))}
        </ul>
      </div>
      <Button
        onClick={() => setShowOverlay(false)}
        className=" absolute right-10 top-10"
        variant={"outline"}
      >
        <XIcon />
      </Button>
    </div>
  );
};