import { getSession } from 'next-auth/react';

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

export default function Dashboard(props) {
  return (
    <div>
      <h1>Top secret</h1>
    </div>
  );
}
