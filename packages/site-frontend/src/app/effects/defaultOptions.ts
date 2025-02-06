export const defaultOptions = {
  autoPlay: false,
  preset: "confetti",
  emitters: {
    position: {
      x: 0,
      y: 0,
    },
    life: {
      count: 1,
      duration: 0.1,
      delay: 0.4,
    },
    rate: {
      delay: 0.1,
      quantity: 50,
    },
    size: {
      width: 0,
      height: 0,
    },
  },
  particles: {
    size: {
      value: 4,
    },
    life: {
      duration: {
        value: 1.25,
      },
    },
    move: {
      speed: 30,
    },
  },
};
