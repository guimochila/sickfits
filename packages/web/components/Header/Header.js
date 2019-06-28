import Nav from '../Nav';

function Header() {
  return (
    <div>
      <div className="bar">
        <a href="">Sickfits</a>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
}

export default Header;
