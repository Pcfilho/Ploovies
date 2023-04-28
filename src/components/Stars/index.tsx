import { Container, Star } from './styles';

interface Props {
  vote_average: number;
}


export const Stars = ({ vote_average } : Props) => {
  return (
    <Container>
      {[...Array(5).keys()].map((value) => {
          const valueToCompare = value * 2;
          const isSelected = vote_average > valueToCompare;
          return <Star
            key={value}
            name={isSelected ? 'star' : 'star-border'}
            size={16}
          />
      })}
    </Container>
  );
}
