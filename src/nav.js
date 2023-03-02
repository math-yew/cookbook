import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <p>
    <Link to="/">Home</Link> |
    <Link to="/recipes">Recipes</Link> |
    <Link to="/meallists">Meal Lists</Link> |
    <Link to="/counter">COUNTER</Link> |
    <Link to="/table">TABLE</Link> |
    <Link to="/math">MATH</Link>  |
    <Link to="/name">NAME</Link>  |
    <Link to="/taskapp">TASK APP</Link>  |
    </p>
  )
}

export default Nav;
