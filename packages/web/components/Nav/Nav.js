import Link from 'next/link';

function Nav() {
  return (
    <div>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
}

export default Nav;
