import type { Access } from 'payload'

export const anyone: Access = () => true

export const isAdmin: Access = ({ req: { user } }) =>
  user?.collection === 'users'

export const isCustomer: Access = ({ req: { user } }) =>
  user?.collection === 'customers'

export const adminOrCustomer =
  (field = 'id'): Access =>
  ({ req: { user } }) => {
    if (user?.collection === 'users') {
      return true
    }

    if (user?.collection === 'customers') {
      return {
        [field]: {
          equals: user.id,
        },
      }
    }
    
    return false
  }
