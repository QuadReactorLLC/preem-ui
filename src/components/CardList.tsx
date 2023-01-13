import React, { useMemo } from 'react'
import { FlatList, FlatListProps, ListRenderItem, ListRenderItemInfo, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import Card from './Card'
import Loading from './Loading'

const cardMargin = 6

interface CardListItemProps {
  cardWidth: number
  children: React.ReactElement
  onItemLongPress?(): void
  onItemPress?(): void
}

function CardListItem(props: CardListItemProps) {
  return (
    <TouchableOpacity
      style={{ width: props.cardWidth, margin: cardMargin }}
      onPress={props.onItemPress}
      onLongPress={props.onItemLongPress}
      disabled={!props.onItemPress}
    >
      <Card style={{ padding: 0 }}>{props.children}</Card>
    </TouchableOpacity>
  )
}

interface CardListProps<T> extends FlatListProps<T> {
  cardWidth: number
  numColumns?: number
  onItemPress?(info: ListRenderItemInfo<T>): void
  onItemLongPress?(info: ListRenderItemInfo<T>): void
}

export default function CardList<T>(props: CardListProps<T>) {
  const window = useWindowDimensions()

  const numColumns = useMemo(() => {
    if (!!props.numColumns) {
      return props.numColumns
    }
    return !!window?.width ? Math.floor(window.width / (props.cardWidth + cardMargin * 2)) : 1
  }, [window, props.cardWidth, props.numColumns])

  const renderItem: ListRenderItem<T> = (info: ListRenderItemInfo<T>) => {
    const onItemPress = () => props.onItemPress?.(info)
    const onItemLongPress = () => props.onItemLongPress?.(info)
    const item = props.renderItem?.(info)
    if (!!item) {
      return (
        <CardListItem cardWidth={numColumns === 1 ? window.width : props.cardWidth} onItemPress={onItemPress} onItemLongPress={onItemLongPress}>
          {item}
        </CardListItem>
      )
    }
    return null
  }

  const keyExtractor = (_: T, i: number) => `item-${i}`

  if (props.refreshing || !numColumns) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <FlatList<T>
        {...props}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        key={numColumns}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
        initialNumToRender={12}
        renderItem={renderItem}
      />
    </View>
  )
}
