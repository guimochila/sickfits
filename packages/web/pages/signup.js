import styled from 'styled-components';
import Signup from '../components/Signup';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2;
`;

function SingupPage() {
  return (
    <Columns>
      <Signup />
    </Columns>
  );
}

export default SingupPage;
