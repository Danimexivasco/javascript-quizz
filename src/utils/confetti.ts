import confetti from "canvas-confetti";

export const fireConfetti = () => confetti({
  particleCount: 100,
  spread:        70,
  origin:        {
    y: 0.6
  }
});

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const fireWorks = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread:        360,
    ticks:         60,
    zIndex:        0
  };

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.1, 0.3),
        y: Math.random() - 0.2
      }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: {
        x: randomInRange(0.7, 0.9),
        y: Math.random() - 0.2
      }
    });
  }, 250);
};

export const emojiConfetti = (text: string) => {
  const scalar = 2;
  const unicorn = confetti.shapeFromText({
    text,
    scalar
  });

  const defaults = {
    spread:        360,
    ticks:         60,
    gravity:       0,
    decay:         0.96,
    startVelocity: 20,
    shapes:        [unicorn],
    scalar
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 30
    });

    confetti({
      ...defaults,
      particleCount: 5,
      flat:          true
    });

    confetti({
      ...defaults,
      particleCount: 15,
      scalar:        scalar / 2,
      shapes:        ["circle"]
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
};