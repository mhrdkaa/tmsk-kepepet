import { clerkMiddleware } from "@clerk/tanstack-react-start/server"
import { createMiddleware, createStart } from "@tanstack/react-start"

const errorLogger = createMiddleware().server(async ({ next }) => {
  try {
    return await next()
  } catch (err: unknown) {
    const e = err as Error & { cause?: unknown; status?: number; response?: unknown }
    console.error(
      "UNHANDLED SERVER ERROR",
      JSON.stringify({
        name: e?.name,
        message: e?.message,
        stack: e?.stack,
        cause: e?.cause,
        status: e?.status,
      }),
    )
    throw err
  }
})

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [
      errorLogger,
      clerkMiddleware({
        authorizedParties: ["https://tmsk-kepepet.utakuliah.workers.dev"],
      }),
    ],
  }
})
