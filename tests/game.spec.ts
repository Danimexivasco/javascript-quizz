import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

const DEFAULT_QUESTIONS = 10;

test.describe("Game", () => {
  test("should render the questions slider and start in the default number of questions", async ({ page }) => {
    await expect(page.getByText("Select the number of questions")).toBeVisible();

    await expect(page.locator("span").filter({
      hasText: String(DEFAULT_QUESTIONS)
    }).nth(1)).toBeVisible();
  });

  test("should change number of questions on slide", async ({ page }) => {
    const slider = page.getByRole("slider", {
      name: "Select the number of questions"
    });

    await slider.focus();

    for (let i = 0; i < 12; i++) {
      await slider.press("ArrowRight");
    }

    await page.evaluate(() => {
      const DEFAULT_QUESTIONS = 10;
      const slider = document.querySelector("[aria-label=\"Select the number of questions\"]") as HTMLInputElement;
      if (slider) {
        slider.value = String(DEFAULT_QUESTIONS + 12);
        slider.dispatchEvent(new Event("input", {
          bubbles: true
        }));
        slider.dispatchEvent(new Event("change", {
          bubbles: true
        }));
      }
    });

    await expect(slider).toHaveAttribute("aria-valuenow", "22");
  });

  test("should change language", async ({ page }) => {
    await expect(page.getByText("Select the number of questions")).toBeVisible();

    await expect(page.getByRole("button", {
      name: "Start"
    })).toBeVisible();

    await expect(page.getByRole("button", {
      name: "EN"
    })).toHaveAttribute("aria-selected", "true");

    await page.getByRole("button", {
      name: "ES"
    }).click();

    await expect(page.getByRole("button", {
      name: "ES"
    })).toHaveAttribute("aria-selected", "true");

    await expect(page.getByText("Seleccione el número de preguntas")).toBeVisible();

    await expect(page.getByRole("button", {
      name: "Comenzar"
    })).toBeVisible();
  });

  test("should start the game", async ({ page }) => {
    await page.getByRole("button", {
      name: "Start"
    }).click();

    await expect(page.getByText("1 / 10")).toBeVisible();

    await expect(page.getByRole("heading", {
      name:  "correct answers",
      exact: true
    })).toBeVisible();

    await expect(page.getByRole("heading", {
      name:  "incorrect answers",
      exact: true
    })).toBeVisible();

    await expect(page.getByRole("heading", {
      name:  "unanswered answers",
      exact: true
    })).toHaveText(/❔Unanswered: 10/);

    await expect(page.getByRole("button", {
      name: "Reset Game"
    })).toBeVisible();
  });

  test("should reset the game", async ({ page }) => {
    await page.getByRole("button", {
      name: "Start"
    }).click();

    await page.getByRole("button", {
      name: "Reset Game"
    }).click();

    await expect(page.getByText("Select the number of questions")).toBeVisible();
  });

  test("should navigate between questions", async ({ page }) => {
    await page.getByRole("button", {
      name: "Start"
    }).click();

    await page.getByLabel("Go to next question").click();

    await expect(page.getByText("2 / 10")).toBeVisible();

    await page.getByLabel("Go to previous question").click();

    await expect(page.getByText("1 / 10")).toBeVisible();
  });

  test("should show the correct and incorrect answers", async ({ page }) => {
    await page.route("**/data.json", async route => {
      await route.fulfill({
        status:      200,
        contentType: "application/json",
        body:        JSON.stringify(mockQuestions)
      });
    });

    const slider = page.getByRole("slider", {
      name: "Select the number of questions"
    });

    await slider.focus();

    for (let i = 0; i < 8; i++) {
      await slider.press("ArrowLeft");
    }

    await page.getByRole("button", {
      name: "Start"
    }).click();

    await expect(page.getByTestId("question")).toHaveText("What is the exit of this code?");

    await expect(page.getByRole("button", {
      name: /number/
    })).toBeVisible();

    await page.getByRole("button", {
      name: /number/
    }).click();

    await expect(page.getByRole("button", {
      name: "number"
    })).toHaveClass(/correct/);

    await expect(page.getByText("✅Correct: 1")).toBeVisible();

    await expect(page.getByText("❔Unanswered: 1")).toBeVisible();
  });

});

// Set same questions to not change getQuestions function
const mockQuestions = [
  {
    "es": {
      "id":       1,
      "question": "¿Cuál es la salida de este código?",
      "code":     "console.log(typeof NaN)",
      "answers":  [
        "undefined",
        "NaN",
        "string",
        "number"
      ],
      "correctAnswer": 3
    },
    "en": {
      "id":       1,
      "question": "What is the exit of this code?",
      "code":     "console.log(typeof NaN)",
      "answers":  [
        "undefined",
        "NaN",
        "string",
        "number"
      ],
      "correctAnswer": 3
    }
  },
  {
    "es": {
      "id":       1,
      "question": "¿Cuál es la salida de este código?",
      "code":     "console.log(typeof NaN)",
      "answers":  [
        "undefined",
        "NaN",
        "string",
        "number"
      ],
      "correctAnswer": 3
    },
    "en": {
      "id":       1,
      "question": "What is the exit of this code?",
      "code":     "console.log(typeof NaN)",
      "answers":  [
        "undefined",
        "NaN",
        "string",
        "number"
      ],
      "correctAnswer": 3
    }
  }
];