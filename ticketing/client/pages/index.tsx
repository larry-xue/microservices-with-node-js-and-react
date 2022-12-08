import axios from 'axios';
import { CurrentUser } from './auth/models';

const Home = ({ currentUser }: { currentUser: CurrentUser }) => {
  console.log('on client, color is: ', currentUser);
  return (
    <section className='overflow-hidden bg-[url(https://images.unsplash.com/photo-1667501270403-31dc26f7d2ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1616&q=80)] w-full h-screen bg-cover bg-center bg-no-repeat'>
      <div className='bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24 w-full h-screen'>
        <div className='max-w-lg text-center sm:text-left'>
          <h2 className='text-2xl font-bold text-white sm:text-3xl md:text-5xl'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo!
          </h2>

          <p className='hidden max-w-md text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            officia corporis quasi doloribus iure architecto quae voluptatum
            beatae excepturi dolores.
          </p>

          <div className='mt-4 sm:mt-8'>
            <a
              href='/auth/signup'
              className='inline-flex items-center rounded-full bg-white px-8 py-3 text-gray-900 shadow-lg transition hover:bg-gray-300 focus:outline-none focus:ring'>
              Sign up
              <svg
                className='ml-3 h-5 w-5'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

Home.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    // ssr
    let response = { data: {} };
    try {
      response = await axios.get(
        // http://NAMESPACE.NAMEOFSERVICE.svc.cluster.local
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
        {
          headers: {
            Host: 'ticketing.dev',
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
    return response.data || {};
  } else {
    // browser
    const response = await axios.get('/api/users/currentuser');
    return response.data;
  }
};

export default Home;
