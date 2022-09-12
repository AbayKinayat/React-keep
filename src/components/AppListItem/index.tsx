import React from 'react';
import { NavLink } from 'react-router-dom';

import "./AppListItem.scss";

interface AppListItemProps {
  text: string,
  icon?: React.ReactNode,
  to: string,
  style?: React.CSSProperties,
  buttonstyle?: React.CSSProperties
}

/**
 *  Компонент ссылка для сайдбара
*/
const AppListItem = React.forwardRef<HTMLLIElement, AppListItemProps>((props, ref) => {
  const {
    text,
    icon,
    to,
    style = {}
  } = props;

  return (
    <li
      className="app-list-item"
      ref={ref}
    >
      <NavLink
        className="app-list-item__link"
        to={to}
        style={style}
      >
        <div className="app-list-item__icon">
          {icon}
        </div>
        <span className="app-list-item__text">
          {text}
        </span>
      </NavLink>
    </li>
  )
})

export default AppListItem