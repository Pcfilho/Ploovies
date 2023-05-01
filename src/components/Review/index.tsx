import React, { memo } from 'react';

import { 
  Container,
  Header,
  AuthorTitle,
  CreatedTitle,
  Content,
  ReviewContent,
  ReviewUrl,
} from './styles';
import { Linking } from 'react-native';
import { useLanguage } from '../../hooks/locale/useLanguage';
import { ReviewModel } from '../../models/review';

interface Props {
  item: ReviewModel;
}

export const Review = ({ item } : Props) => {
  const createdAt = new Date(item.created_at).toLocaleDateString();
  const { getMessage } = useLanguage();

  return (
    <Container>
      <Header>
        <AuthorTitle>{getMessage('author')}: {item.author}</AuthorTitle>
        <CreatedTitle>{createdAt}</CreatedTitle>
      </Header>
      <Content>
        <ReviewContent>{item.content}</ReviewContent>
        <ReviewUrl onPress={() => Linking.openURL(item.url)}>{item.url}</ReviewUrl>
      </Content>
    </Container>
  );
}

export const ReviewMemo = memo(Review);