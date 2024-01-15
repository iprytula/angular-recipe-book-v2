import { MenuItem } from "../interfaces/menu-item.interface";

export const menu: MenuItem[] = [
  { name: 'Recipes', path: '/recipes', id: 1, showIfAuthenticated: true },
  { name: 'Shopping List', path: '/shopping-list', id: 2, showIfAuthenticated: true },
  { name: 'Authenticate', path: '/auth', id: 3, showIfAuthenticated: false },
]
