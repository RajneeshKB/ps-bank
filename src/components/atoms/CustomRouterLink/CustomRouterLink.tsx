import React from 'react'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

const CustomRouterLink = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <RouterLink ref={ref} to={href} {...other} />
})

export default CustomRouterLink
