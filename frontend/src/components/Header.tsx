import React from 'react';
import { FaPizzaSlice, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout, reset } from '../services/auth/authSlice';
type ListProps = {
  /**
   * @type React Element for list items or any React JSX.
   */
  children?: React.ReactNode | null;

  /**
   *
   * @returns Mouse click event handler void.
   */
  onClick?: () => void;

  /**
   * Class name for Element.
   */
  className?: string;
};

export const List: React.FC<ListProps> = function (props) {
  const { children } = props;

  return (
    <ul className='flex gap-2' {...props}>
      {children}
    </ul>
  );
};

type ItemProps = {
  /**
   * @Value Text value that will display.
   */
  children?: string | React.ReactNode;
  className?: string;
};

export const Item: React.FC<ItemProps> = function (props) {
  const { children } = props;

  return (
    <li className='flex items-center gap-1 cursor-pointer' {...props}>
      {children}
    </li>
  );
};

const Header: React.FC = function () {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector((state: any) => state.auth);

  const handleLogout = async function() {
    const userToken: string | null = localStorage.getItem('userToken');
    const token =  userToken ? JSON.parse(userToken) : null;

    dispatch(logout(token));

    if(isError) {
      toast.error(message);
    }
    
    if(isSuccess) {
      toast.success('Logged out');
      dispatch(reset());
      navigator('/login');
    }

     // Whether the user is created or failed to create the user, reset the state.
  }

  return (
    <header className='py-3 px-4'>
      <section className='flex gap-5 py-4'>
        <Link to='/'>
          <div className='w-36 flex items-center justify-between'>
            Bitter Buddies <FaPizzaSlice />
          </div>
        </Link>

        <nav className='w-full flex justify-between'>
          <List>
            <Item>
              <Link to='/'>Home</Link>
            </Item>

            <Item>About</Item>
          </List>

          <List>
            {user ? (
              <>
                <Item>
                  <FaUser /> <Link to='/me'>My Profile</Link>
                </Item>

                <Item>
                  <FaSignOutAlt /> <Link to='/login' onClick={handleLogout}>Logout</Link>
                </Item>
              </>
            ) : (
              <>
                <Item>
                  <FaSignInAlt /> <Link to='/login'>Login</Link>
                </Item>

                <Item>
                  <FaUser /> <Link to='/signin'>Sign up</Link>
                </Item>
              </>
            )}
          </List>
        </nav>
      </section>
      <hr />
    </header>
  );
};

export default Header;
