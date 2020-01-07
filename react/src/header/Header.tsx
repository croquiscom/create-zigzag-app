import React from 'react';
import { Link } from 'react-router-dom';
import spaces from 'one-spaces';

const styles = require('./Header.scss');
const MENUS = [{
  name: 'Menu1',
  link: 'menu1'
}, {
  name: 'Menu2',
  link: 'menu2'
}, {
  name: 'Menu3',
  link: 'menu3'
}, {
  name: 'Menu4',
  link: 'menu4'
}];

export default () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.home_link}>
        <figure className={styles.logo} />
      </Link>
      <div className={styles.btn_set}>
        <button className={styles.btn_menu} onClick={() => setMenuOpen(true)} />
      </div>
      <nav className={spaces(styles.menu_container, isMenuOpen && styles.active)} onClick={() => setMenuOpen(false)}>
        <ul className={styles.menus} onClick={(e) => e.stopPropagation()}>
          {MENUS.map((menu) => (
            <li key={menu.link} className={styles.menu}>
              <Link className={styles.link} to={menu.link}>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
