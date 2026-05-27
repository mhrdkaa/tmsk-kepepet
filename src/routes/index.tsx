import { SignInButton } from "@clerk/tanstack-react-start"
import { auth } from "@clerk/tanstack-react-start/server"
import { CheckSquareIcon, ArrowRight, Columns, Folders } from "@phosphor-icons/react"
import { redirect, isRedirect, createFileRoute } from "@tanstack/react-router"

import { Button } from "#/components/ui/button"
import siteConfig from "#/config/site"

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      const { userId, orgId } = await auth()

      if (userId) {
        if (orgId) {
          throw redirect({
            to: "/organization/$orgId",
            params: { orgId },
          })
        } else {
          throw redirect({
            to: "/select-org",
          })
        }
      }
    } catch (error) {
      if (isRedirect(error)) throw error
      // redirect to home
    }
  },
  component: MainApp,
})

function MainApp() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-border/40 bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-primary">
          <CheckSquareIcon weight="fill" className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <SignInButton mode="modal" forceRedirectUrl="/select-org">
            <Button variant="ghost" className="hidden text-base sm:inline-flex">
              Log in
            </Button>
          </SignInButton>
          <SignInButton mode="modal" forceRedirectUrl="/select-org">
            <Button size="default" className="text-base">
              Get {siteConfig.name} for free
            </Button>
          </SignInButton>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background px-6 pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="container mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
                    {siteConfig.name} brings all your tasks, teammates, and tools together
                  </h1>
                  <p className="mx-auto max-w-[42rem] text-lg leading-relaxed font-normal text-muted-foreground sm:text-xl lg:mx-0">
                    Keep everything in the same place—even if your team isn't.{" "}
                    {siteConfig.mainDescription}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                  <SignInButton mode="modal" forceRedirectUrl="/select-org">
                    <Button size="lg" className="h-14 w-full rounded-md px-8 text-lg sm:w-auto">
                      Sign up - it's free!
                      <ArrowRight className="ml-2 h-5 w-5" weight="bold" />
                    </Button>
                  </SignInButton>
                </div>
              </div>
              <div className="relative mx-auto flex w-full max-w-[500px] items-center justify-center lg:max-w-none">
                <div className="relative grid aspect-[4/3] w-full grid-cols-3 gap-4 overflow-hidden rounded-xl border border-border/50 bg-background/50 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
                  <div className="flex flex-col gap-3">
                    <div className="h-6 w-20 animate-pulse rounded-md bg-muted" />
                    <div className="h-24 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                    <div className="h-32 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                    <div className="h-20 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="h-6 w-24 animate-pulse rounded-md bg-muted" />
                    <div className="h-20 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                    <div className="h-40 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="h-6 w-16 animate-pulse rounded-md bg-muted" />
                    <div className="h-32 w-full rounded-lg border border-border/50 bg-card shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Productivity Section */}
        <section className="bg-background px-6 py-20 md:py-32">
          <div className="container mx-auto max-w-6xl">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                A productivity powerhouse
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a
                clear view of who's doing what and what needs to get done.
              </p>
            </div>

            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-start rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary">
                  <Columns weight="duotone" className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Boards</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {siteConfig.name} boards keep tasks organized and work moving forward. In a
                  glance, see everything from "things to do" to "aww yeah, we did it!"
                </p>
              </div>
              <div className="flex flex-col items-start rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary">
                  <Folders weight="duotone" className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Lists</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The different stages of a task. Start simple with To Do, Doing or Done—or build a
                  workflow custom fit to your team's needs. There's no wrong way to{" "}
                  {siteConfig.name}.
                </p>
              </div>
              <div className="flex flex-col items-start rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary">
                  <CheckSquareIcon weight="duotone" className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Cards</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Cards represent tasks and ideas and hold all the information to get the job done.
                  As you make progress, move cards across lists to show their status.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20 px-6 py-12">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center space-y-4 text-center">
          <div className="flex items-center gap-2 text-primary opacity-80">
            <CheckSquareIcon weight="fill" className="h-6 w-6" />
            <span className="text-lg font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
