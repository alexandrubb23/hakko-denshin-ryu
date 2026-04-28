import { create } from 'zustand';

type MenuStore = {
  isOpen: boolean;
  toggleMenu: () => void;
};

const useMenuStore = create<MenuStore>()(set => ({
  isOpen: false,
  toggleMenu: () => set(state => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;
