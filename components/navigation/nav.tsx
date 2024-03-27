"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import ActionTooltip from "../action-tooltip"
import { usePathname } from "next/navigation"

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    
    href?: string
  }[]

}

export function Nav({ links, isCollapsed }: NavProps) {
  const pathname = usePathname()
  const isActive = (href: string) => {
    return pathname === href ? "themeNavActiveBtn" : "themeNavBtn"

  }
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 w-full"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <ActionTooltip
              key={index}
              side="right"
              align="start"
              label={link.title}
            >
              <Link
                href={link.href || "/"}
                className={cn(
                  buttonVariants({ variant: isActive(link.href || ""), size: "icon" }),
                  "h-9 w-9",
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </ActionTooltip>
          ) : (
            <Link
              key={index}
              href={link.href || "/"}
              className={cn(
                buttonVariants({ variant: isActive(link.href || ""), size: "sm" }),
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}