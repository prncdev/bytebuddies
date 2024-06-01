import { Box, Button, InputAdornment } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { FaRegUserCircle, FaSignInAlt } from 'react-icons/fa';
import { MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md';
import { Input } from '../components';
import { login, reset } from '../services/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Login: FC = function () {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, message } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(user) {
      if(isSuccess && user) {
        toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      }
      navigator('/');
    }

    dispatch(reset());

  }, [user, isError, isSuccess, message, navigator, dispatch])

  const handlerFromData = function (e: any) {
    const { name, value }: any = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async function(event: any) {
    event.preventDefault();
    await dispatch(login(formData));
  }
  return (
    <>
      {isLoading && <p>loading...</p>}
      <Box
        onSubmit={handleLogin}
        component='form'
        autoComplete='off'
        sx={{
          boxShadow: '3px 3px 32px -10px rgba(0,0,0,0.75)',
          paddingInline: 2,
          paddingBlock: 2,
          borderRadius: 2,
        }}
      >
        <h1 className='w-full flex gap-8 my-1 justify-center items-center font-semibold text-4xl'>
          <FaSignInAlt size={36}/>
          Log in
        </h1>
        <p className='text-xl text-center my-2 font-semibold text-gray-500'>
          Log in start using the service.
        </p>
        <section className='flex flex-col gap-3 py-2'>
          <div>
            <Input
              fullWidth
              label='Email'
              placeholder='Enter Email address or phone'
              name='email'
              value={formData.email}
              onChange={handlerFromData}
              type='text'
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <FaRegUserCircle size={22} />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <Input
              fullWidth
              label='Password'
              placeholder='Enter Password'
              name='password'
              value={formData.password}
              onChange={handlerFromData}
              type={isPasswordVisible ? 'text' : 'password'}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    className='cursor-pointer'
                    position='end'
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? (
                      <MdOutlineVisibility size={22} />
                    ) : (
                      <MdOutlineVisibilityOff size={22} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <div className='w-2/5 mx-auto'>
            <Button
              variant='contained'
              className='w-full !py-3'
              disabled={!formData.email || !formData.password}
              type='submit'
            >
              Login
            </Button>
          </div>
        </section>
      </Box>
    </>
  );
};

export default Login;
