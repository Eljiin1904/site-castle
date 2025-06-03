export default {
  _id: "U0fPYybqV2r4iKd0UMkLmzcH",
  completed: false,
  syncIndex: 2,
  dealer: {
    hands: [
      {
        stand: false,
        cards: [
          {
            value: 3,
            suit: "clubs",
            orderIndex: 1,
          },
          {
            value: 4,
            suit: "hearts",
            orderIndex: 3,
          },
        ],
      },
    ],
  },
  players: [
    {
      userId: "9RHOVLH11M9IGGHLTY",
      betAmounts: {
        "lucky-ladies": 5000000,
        "blackjack-15x": 5000000,
        "21+3": 5000000,
        "perfect-pairs": 5000000,
        "main-bet": 5000000,
      },
      insurance: "not available",
      sidebetPayouts: [
        {
          type: "perfect-pairs",
          title: "Red/Black Pair",
          multiplier: 6,
          amount: 30000000,
          fromData: true,
        },
      ],
      mainPayout: null,
      statusTitle: null,
      hands: [
        {
          stand: false,
          cards: [
            {
              value: 8,
              suit: "clubs",
              orderIndex: 0,
            },
            {
              value: "A",
              suit: "diamonds",
              orderIndex: 4,
            },
            {
              value: 6,
              suit: "hearts",
              orderIndex: 6,
            },
          ],
          betAmounts: {
            "lucky-ladies": 5000000,
            "blackjack-15x": 5000000,
            "21+3": 5000000,
            "perfect-pairs": 5000000,
            "main-bet": 5000000,
          },
          split: true,
          double: true,
        },
        {
          stand: false,
          cards: [
            {
              value: 8,
              suit: "diamonds",
              orderIndex: 2,
            },
            {
              value: "A",
              suit: "spades",
              orderIndex: 5,
            },
          ],
          betAmounts: {
            "lucky-ladies": 5000000,
            "blackjack-15x": 5000000,
            "21+3": 5000000,
            "perfect-pairs": 5000000,
            "main-bet": 5000000,
          },
          split: true,
          double: false,
        },
      ],
    },
  ],
  timestamp: {
    $date: "2025-04-02T04:32:26.081Z",
  },
  history: [
    {
      action: "split",
      buyInsurance: null,
      createdAt: {
        $date: "2025-04-02T04:32:29.693Z",
      },
    },
    {
      action: "double",
      buyInsurance: null,
      createdAt: {
        $date: "2025-04-02T04:32:32.484Z",
      },
    },
  ],
};
