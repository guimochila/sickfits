import styled from 'styled-components';
import Signup from '../components/Signup';
import Signin from '../components/Signin';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2;
`;

function SingupPage() {
  return (
    <Columns>
      <Signup />
      <Signin />
    </Columns>
  );
}

export default SingupPage;
