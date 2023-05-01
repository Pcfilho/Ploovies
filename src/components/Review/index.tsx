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

interface IReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface IProps {
  item: IReview;
}

export const Review = ({ item } : IProps) => {
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