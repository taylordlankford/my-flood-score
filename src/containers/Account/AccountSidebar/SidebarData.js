import * as ROUTES from '../../../routes/constants/routes'
import {
  FaTachometerAlt,
  FaList,
  FaShoppingBasket,
  FaSyncAlt,
  FaAddressBook,
  FaCreditCard,
  FaUserAlt,
  FaHistory,
} from 'react-icons/fa'

export const SIDEBAR_LINKS = [
  {
    id: 1,
    routePath: ROUTES.ACCOUNT_DASHBOARD,
    sidebarIcon: FaTachometerAlt,
    sidebarLink: 'Dashboard'
  },
  {
    id: 2,
    routePath: ROUTES.ACCOUNT_INVENTORY,
    sidebarIcon: FaList,
    sidebarLink: 'Inventory'
  },
  {
    id: 3,
    routePath: ROUTES.ACCOUNT_ORDERS,
    sidebarIcon: FaShoppingBasket,
    sidebarLink: 'Orders'
  },
  {
    id: 4,
    routePath: ROUTES.ACCOUNT_REPORTS,
    sidebarIcon: FaHistory,
    sidebarLink: 'Reports'
  },
  {
    id: 5,
    routePath: ROUTES.ACCOUNT_SUBSCRIPTIONS,
    sidebarIcon: FaSyncAlt,
    sidebarLink: 'Subscriptions'
  },
  {
    id: 6,
    routePath: ROUTES.ACCOUNT_PAYMENT_METHODS,
    sidebarIcon: FaCreditCard,
    sidebarLink: 'Payment Methods'
  },
  {
    id: 7,
    routePath: ROUTES.ACCOUNT_SETTINGS,
    sidebarIcon: FaUserAlt,
    sidebarLink: 'Account Settings'
  }
]