import { create } from "zustand";

export const useStore = create((set) => ({
  mode: {
    darkMode: false,
  },

  cart: {
    dishes: [],
  },

  darkModeOn: () =>
    set(() => ({
      mode: {
        darkMode: true,
      },
    })),

  darkModeOff: () =>
    set(() => ({
      mode: {
        darkMode: false,
      },
    })),

  addDish: (data) =>
    set((state) => ({
      cart: {
        dishes: [...state.cart.dishes, data],
      },
    })),

  removeDish: (index) =>
    set((state) => ({
      cart: {
        dishes: state.cart.dishes.filter((_, i) => i != index),
      },
    })),

  resetCart: () =>
    set(() => ({
      cart: {
        dishes: [],
      },
    })),
}));
