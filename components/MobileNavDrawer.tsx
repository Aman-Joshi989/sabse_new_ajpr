'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { logout } from '@/app/actions'
import { trackBookCall } from '@/lib/analytics'

interface NavSubItem {
  name: string
  href: string
  icon_name?: string
  icon?: any
  desc?: string
}

interface NavItem {
  name: string
  href: string
  dropdown?: NavSubItem[]
}

interface MobileNavDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  logoSrc: string
  navigation: NavItem[]
  iconRegistry: Record<string, any>
  isActive: (href: string) => boolean
  user: any
}

/**
 * Dynamically imported mobile navigation sheet (Radix Dialog + Accordion)
 * so desktop and initial mobile page loads avoid parsing drawer code upfront.
 */
export default function MobileNavDrawer({
  open,
  onOpenChange,
  logoSrc,
  navigation,
  iconRegistry,
  isActive,
  user,
}: MobileNavDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 p-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Image
              src={logoSrc}
              alt="AJPR World"
              width={120}
              height={40}
              className="object-contain"
              key={logoSrc + '-mobile'}
            />
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col mt-8 space-y-4">
          {navigation.map((item) =>
            item.dropdown ? (
              <Accordion type="single" collapsible key={item.name} className="w-full">
                <AccordionItem value={item.name}>
                  <AccordionTrigger
                    className={`text-lg font-medium ${
                      isActive(item.href) ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-600'
                    }`}
                  >
                    {item.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-2 space-y-2">
                      {item.dropdown.map((subItem) => {
                        const IconComponent = subItem.icon_name
                          ? iconRegistry[subItem.icon_name] || Briefcase
                          : subItem.icon || Briefcase
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={() => onOpenChange(false)}
                            className={`flex items-center py-2 transition-colors ${
                              isActive(subItem.href)
                                ? 'text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
                            }`}
                          >
                            <IconComponent className="w-4 h-4 mr-2 text-blue-500" />
                            {subItem.name}
                          </Link>
                        )
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={`text-lg font-medium transition-colors ${
                  isActive(item.href) ? 'text-blue-600 dark:text-blue-400' : 'hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            )
          )}

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3 px-2 py-2">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border overflow-hidden">
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-lg">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                  </div>
                </div>

                <Link
                  href={
                    user.role === 'admin'
                      ? '/dashboard/admin'
                      : user.role === 'client'
                      ? '/dashboard/client'
                      : '/dashboard/developer'
                  }
                  onClick={() => onOpenChange(false)}
                  className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
                >
                  Dashboard
                </Link>

                <form action={logout}>
                  <button className="w-full flex items-center text-lg font-medium text-red-600 hover:text-red-700 text-left">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => onOpenChange(false)}
                className="flex items-center text-lg font-medium transition-colors hover:text-blue-600"
              >
                Log In
              </Link>
            )}
          </div>

          <div className="pt-2 space-y-2.5">
            <Button
              className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold shadow-md transition-all text-sm"
              asChild
            >
              <Link
                href="/book-call"
                onClick={() => {
                  trackBookCall('header_mobile')
                  onOpenChange(false)
                }}
              >
                Book Strategy Call
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full h-11 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white text-sm"
              asChild
            >
              <Link href="/contact" onClick={() => onOpenChange(false)}>
                Contact & Inquiry
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
