import { useClerk, useSignIn, useSignUp } from "@clerk/tanstack-react-start"
import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useCallback, useEffect, useRef } from "react"

export const Route = createFileRoute("/sso-callback")({
  component: SSOCallbackPage,
})

function SSOCallbackPage() {
  const clerk = useClerk()
  const { signIn } = useSignIn()
  const { signUp } = useSignUp()
  const router = useRouter()
  const hasRun = useRef(false)

  const navigateToSignIn = useCallback(() => router.navigate({ to: "/" }), [router])

  const navigateWithDecorateUrl = useCallback(
    async ({ decorateUrl }: { session: unknown; decorateUrl: (url: string) => string }) => {
      const url = decorateUrl("/")
      if (url.startsWith("http")) {
        window.location.href = url
      } else {
        void router.navigate({ to: url })
      }
    },
    [router],
  )

  const finalizeSignIn = useCallback(async () => {
    await signIn.finalize({
      navigate: async (args) => {
        await navigateWithDecorateUrl(args)
      },
    })
  }, [signIn, navigateWithDecorateUrl])

  const finalizeSignUp = useCallback(async () => {
    await signUp.finalize({
      navigate: async (args) => {
        await navigateWithDecorateUrl(args)
      },
    })
  }, [signUp, navigateWithDecorateUrl])

  useEffect(() => {
    void (async () => {
      if (!clerk.loaded || hasRun.current) return
      hasRun.current = true

      if (signIn.status === "complete") {
        await finalizeSignIn()
        return
      }

      // Handle new Client Trust status (Clerk update): user is signing in from a
      // new/untrusted client and needs to be challenged for a second factor.
      // Redirect back to sign-in so the user can complete the challenge.
      if ((signIn.status as string) === "needs_client_trust") {
        return navigateToSignIn()
      }

      if (signUp.isTransferable) {
        await signIn.create({ transfer: true })
        const status = signIn.status as typeof signIn.status | "complete"
        if (status === "complete") {
          await finalizeSignIn()
          return
        }
        // Also handle needs_client_trust after transfer
        if ((status as string) === "needs_client_trust") {
          return navigateToSignIn()
        }
        return navigateToSignIn()
      }

      if (signIn.isTransferable) {
        await signUp.create({ transfer: true })
        if (signUp.status === "complete") {
          await finalizeSignUp()
          return
        }
        return router.navigate({ to: "/" })
      }

      if (signUp.status === "complete") {
        await finalizeSignUp()
        return
      }

      const existingSessionId =
        signIn.existingSession?.sessionId ?? signUp.existingSession?.sessionId

      if (existingSessionId) {
        await clerk.setActive({
          session: existingSessionId,
          navigate: async (args) => {
            await navigateWithDecorateUrl(args)
          },
        })
        return
      }
    })()
  }, [
    clerk,
    signIn,
    signUp,
    finalizeSignIn,
    finalizeSignUp,
    navigateToSignIn,
    navigateWithDecorateUrl,
    router,
  ])

  return (
    <div id="clerk-captcha">
      <p>Completing sign-in…</p>
    </div>
  )
}
