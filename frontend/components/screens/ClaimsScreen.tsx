import { ErrorRetry } from '@/components/ErrorRetry';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Avatar, Card, Chip, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import React from 'react';
import { useClaims } from '@/hooks/useClaims';
import { formatDistanceToNow } from 'date-fns';

export const ClaimsScreen = () => {
  const { data, isLoading, error, refetch } = useClaims();

  if (error) {
    return <ErrorRetry refetch={refetch} />;
  }

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  if (!data || data?.length === 0) {
    return (
      <View>
        <Text>No claims found</Text>
        <Button onPress={() => refetch()} title="Retry" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(claim) => claim.id}
      renderItem={({ item }) => (
        <Link key={item.id} asChild href={`/${item.id}`}>
          <Pressable>
            <Card style={styles.card}>
              <Card.Title
                title={item.title}
                titleNumberOfLines={3}
                titleVariant={'titleLarge'}
                subtitle={
                  <View>
                    <Text>
                      {formatDistanceToNow(item.createdAt, {
                        addSuffix: true,
                      })}
                    </Text>
                    <View style={styles.chipsContainer}>
                      {item.tags.map((tag, index) => (
                        <Chip compact key={index} style={styles.chip}>
                          {tag}
                        </Chip>
                      ))}
                    </View>
                  </View>
                }
                right={() => (
                  <Avatar.Text label="UA" size={36} style={styles.cardAvatar} />
                )}
              />
            </Card>
          </Pressable>
        </Link>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    paddingVertical: 16,
  },
  cardAvatar: {
    marginRight: 16,
    marginBottom: 36,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitleText: {
    marginLeft: 10,
  },
  chipsContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginTop: 10,
    marginRight: 5,
  },
});
