import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir:       "./tests",
  fullyParallel: true,
  forbidOnly:    !!process.env.CI,
  retries:       process.env.CI ? 2 : 0,
  workers:       process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:      process.env.CI ? "dot" : "list",
  webServer:     {
    command:             "pnpm run dev",
    url:                 "http://localhost:5173/",
    reuseExistingServer: !process.env.CI,
    timeout:             30 * 1000
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "http://localhost:5173/",
    trace:   "on-first-retry"
  },

  projects: [
    {
      name: "chromium",
      use:  {
        ...devices["Desktop Chrome"]
      }
    },

    {
      name: "firefox",
      use:  {
        ...devices["Desktop Firefox"]
      }
    },

    {
      name: "webkit",
      use:  {
        ...devices["Desktop Safari"]
      }
    }

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use:  {
    //     ...devices["Pixel 5"]
    //   }
    // },
    // {
    //   name: "Mobile Safari",
    //   use:  {
    //     ...devices["iPhone 12"]
    //   }
    // }
  ]

});
